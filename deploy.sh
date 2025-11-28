#!/bin/bash
set -e
cd "$(dirname "$0")"
if [ -d ~/ddtask ]; then
  cd ~/ddtask
  git pull origin main || true
else
  mkdir -p ~/ddtask
  cd ~/ddtask
  git clone https://github.com/YOUR_GITHUB_USER/YOUR_REPO.git . || true
fi
docker compose pull
docker compose up -d --remove-orphans
