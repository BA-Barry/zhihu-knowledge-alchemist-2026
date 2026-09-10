FROM python:3.12-slim

WORKDIR /app
COPY runtime ./runtime
COPY demo ./demo

ENV HOST=0.0.0.0
ENV PORT=8765
ENV ZHIHU_KNOWLEDGE_HOME=/data

VOLUME ["/data"]
EXPOSE 8765

CMD ["python", "runtime/zhihu_knowledge.py", "serve", "--project-key", "ZHIHU-DEMO-001"]
