#!/bin/zsh
set -e
PACKAGE_ROOT="$(cd "$(dirname "$0")" && pwd)"
SKILLS_TARGET="$HOME/.codex/skills"
INSTALL_TARGET="$HOME/.agents/zhihu-knowledge-alchemist"
RUNTIME_TARGET="$INSTALL_TARGET/runtime"
DEMO_TARGET="$INSTALL_TARGET/demo"
mkdir -p "$SKILLS_TARGET" "$RUNTIME_TARGET" "$DEMO_TARGET"
for skill in "$PACKAGE_ROOT"/skills/*; do
  cp -R "$skill" "$SKILLS_TARGET/"
done
if [[ ! -d "$PACKAGE_ROOT/.codex/skills/zhihu" || ! -d "$PACKAGE_ROOT/.codex/skills/zhihu-hackathon" ]]; then
  echo "Package is missing one or more official Zhihu skills." >&2
  exit 1
fi
cp -R "$PACKAGE_ROOT/.codex/skills/zhihu" "$SKILLS_TARGET/"
cp -R "$PACKAGE_ROOT/.codex/skills/zhihu-hackathon" "$SKILLS_TARGET/"
cp -R "$PACKAGE_ROOT/runtime/"* "$RUNTIME_TARGET/"
cp -R "$PACKAGE_ROOT/demo/"* "$DEMO_TARGET/"
echo "Installed 12 Knowledge Alchemist skills and 2 official Zhihu skills. Restart Codex."
