#!/bin/zsh
set -e
PACKAGE_ROOT="$(cd "$(dirname "$0")" && pwd)"
python3 "$PACKAGE_ROOT/runtime/zhihu_knowledge.py" demo \
  --project-key ZHIHU-DEMO-001
python3 "$PACKAGE_ROOT/runtime/zhihu_knowledge.py" serve \
  --project-key ZHIHU-DEMO-001 --open
