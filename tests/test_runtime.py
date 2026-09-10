import json
import sys
import tempfile
import threading
import unittest
import urllib.request
from contextlib import closing
from http.server import ThreadingHTTPServer
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "runtime"))
import zhihu_knowledge as zk  # noqa: E402


class RuntimeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.db_path = Path(self.temp.name) / "test.db"

    def tearDown(self):
        self.temp.cleanup()

    def test_demo_loads_complete_project(self):
        with closing(zk.connect(self.db_path)) as conn:
            bundle = zk.load_demo(conn)
        self.assertEqual(5, len(bundle["sources"]))
        self.assertEqual(4, len(bundle["artifacts"]))
        self.assertEqual(12, bundle["project"]["current_stage"])
        self.assertEqual("demo_ready", bundle["project"]["status"])

    def test_official_search_fields_are_normalized_and_cached(self):
        official_response = {
            "Code": 0,
            "Data": {
                "Items": [{
                    "Title": "怎样理解强化学习",
                    "ContentType": "answer",
                    "ContentID": "42",
                    "ContentText": "强化学习通过奖励信号优化策略。",
                    "Url": "https://www.zhihu.com/question/1/answer/42",
                    "CommentCount": 7,
                    "VoteUpCount": 31,
                    "AuthorName": "测试作者",
                }]
            },
        }
        with closing(zk.connect(self.db_path)) as conn, patch.object(zk, "api_request", return_value=official_response) as request:
            first, first_cached = zk.search_zhihu(conn, "强化学习", 8)
            second, second_cached = zk.search_zhihu(conn, "强化学习", 8)
        self.assertFalse(first_cached)
        self.assertTrue(second_cached)
        self.assertEqual(first, second)
        self.assertEqual("42", first[0]["id"])
        self.assertEqual(31, first[0]["metadata"]["voteup_count"])
        self.assertEqual(1, request.call_count)
        with closing(zk.connect(self.db_path)) as conn:
            self.assertEqual(1, zk.usage_today(conn, "zhihu_search"))

    def test_daily_soft_limit_allows_cache_but_blocks_new_external_call(self):
        official_response = {"Code": 0, "Data": {"Items": [{
            "Title": "结果",
            "ContentID": "1",
            "ContentText": "内容",
        }]}}
        with closing(zk.connect(self.db_path)) as conn, \
                patch.dict("os.environ", {"ZHIHU_DAILY_LIMIT_ZHIHU_SEARCH": "1"}), \
                patch.object(zk, "api_request", return_value=official_response) as request:
            zk.search_zhihu(conn, "同一问题", 3)
            _, cached = zk.search_zhihu(conn, "同一问题", 3)
            self.assertTrue(cached)
            with self.assertRaisesRegex(RuntimeError, "今日软限额"):
                zk.search_zhihu(conn, "新问题", 3)
        self.assertEqual(1, request.call_count)

    def test_api_request_sends_timestamp_and_surfaces_business_error(self):
        class FakeResponse:
            def __enter__(self):
                return self

            def __exit__(self, *_):
                return False

            def read(self):
                return json.dumps({
                    "error": {"message": "模型未授权", "code": "model_not_found"}
                }, ensure_ascii=False).encode()

        with patch.dict("os.environ", {"ZHIHU_ACCESS_SECRET": "test-only-secret"}), \
                patch.object(zk.urllib.request, "urlopen", return_value=FakeResponse()) as urlopen:
            with self.assertRaisesRegex(RuntimeError, "model_not_found"):
                zk.api_request("POST", "/v1/chat/completions", payload={"model": "x"})
        request = urlopen.call_args.args[0]
        self.assertEqual("Bearer test-only-secret", request.get_header("Authorization"))
        self.assertRegex(request.get_header("X-request-timestamp"), r"^\d{10}$")

    def test_alchemy_creates_four_structured_artifacts(self):
        sources = [{
            "kind": "answer",
            "id": "1",
            "author": "作者",
            "title": "标题",
            "url": "https://www.zhihu.com/question/1/answer/1",
            "content": "材料",
            "metadata": {"voteup_count": 3},
        }]
        answer = json.dumps({
            "knowledge_brief": {"summary": "概览", "key_points": ["要点"], "unknowns": []},
            "viewpoint_matrix": {"consensus": ["共识"], "differences": [], "source_notes": []},
            "learning_cards": {"cards": [{"question": "什么？", "answer": "回答", "source_refs": [1]}]},
            "innovation_roadmap": {"opportunities": ["机会"], "next_steps": ["验证"], "evaluation": ["指标"]},
        }, ensure_ascii=False)
        with closing(zk.connect(self.db_path)) as conn, \
                patch.object(zk, "search_zhihu", return_value=(sources, False)), \
                patch.object(zk, "direct_answer", return_value=(answer, False)):
            result = zk.run_alchemy(conn, "LIVE", "测试主题")
        bundle = result["project"]
        self.assertEqual("complete", bundle["project"]["status"])
        self.assertEqual(4, len(bundle["artifacts"]))
        self.assertEqual(
            {"viewpoint_matrix", "knowledge_brief", "learning_cards", "innovation_roadmap"},
            {item["artifact_type"] for item in bundle["artifacts"]},
        )

    def test_web_health_and_demo_endpoints(self):
        handler = type("TestHandler", (zk.DashboardHandler,), {})
        handler.db_path = self.db_path
        handler.default_project_key = "WEB-DEMO"
        server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        base = f"http://127.0.0.1:{server.server_address[1]}"
        try:
            with urllib.request.urlopen(base + "/api/health") as response:
                health = json.loads(response.read())
            self.assertTrue(health["ok"])
            self.assertIn("direct_answer", health["local_daily_usage"])
            request = urllib.request.Request(
                base + "/api/demo/reset",
                data=json.dumps({"project_key": "WEB-DEMO"}).encode(),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(request) as response:
                demo = json.loads(response.read())
            self.assertEqual(5, len(demo["sources"]))
            with urllib.request.urlopen(base + "/api/project?key=WEB-DEMO") as response:
                project = json.loads(response.read())
            self.assertEqual("WEB-DEMO", project["project"]["project_key"])
            with urllib.request.urlopen(base + "/api/export?key=WEB-DEMO") as response:
                exported = response.read().decode("utf-8")
                disposition = response.headers["Content-Disposition"]
            self.assertIn("# 小户型里怎样设计更可靠", exported)
            self.assertIn("attachment", disposition)
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)


if __name__ == "__main__":
    unittest.main()
