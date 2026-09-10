#!/bin/zsh
set -e
PACKAGE_ROOT="$(cd "$(dirname "$0")" && pwd)"
read -s "SECRET_VALUE?Paste your Zhihu Access Secret: "
echo
if [[ -z "$SECRET_VALUE" ]]; then
  echo "Access Secret cannot be empty." >&2
  exit 1
fi
export ZHIHU_ACCESS_SECRET="$SECRET_VALUE"
unset SECRET_VALUE
trap 'unset ZHIHU_ACCESS_SECRET' EXIT
echo "Starting live mode. The secret is not saved to disk."
python3 "$PACKAGE_ROOT/runtime/zhihu_knowledge.py" serve \
  --project-key ZHIHU-DEMO-001 --open
