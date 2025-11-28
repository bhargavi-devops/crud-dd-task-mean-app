# Crud DD Task - MEAN App (DevOps submission)

## What this repo contains
- Full-stack MEAN app (frontend/ and backend/)
- Dockerfiles for both frontend and backend
- `docker-compose.yml` to run MongoDB + backend + frontend + nginx
- GitHub Actions workflow `.github/workflows/ci-cd.yml` to build/push images and deploy to VM via SSH
- `nginx/nginx.conf` reverse proxy config
- `deploy.sh` helper script

## Quick steps (summary)
1. Create Docker Hub repos:
   - `YOUR_DOCKERHUB_USERNAME/dd-task-backend`
   - `YOUR_DOCKERHUB_USERNAME/dd-task-frontend`

2. Push code to GitHub (this repo) on `main`.

3. Add GitHub Secrets (Settings → Secrets → Actions):
   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN` (use access token)
   - `SERVER_IP`
   - `SERVER_USER`
   - `SERVER_SSH_KEY` (private key)
   - `SERVER_SSH_PORT` (optional)

4. Prepare VM (Ubuntu 22.04+):
```bash
# on VM
sudo apt update -y
sudo apt install -y ca-certificates curl gnupg lsb-release
# install docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt update -y
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER
# clone repo and run compose
git clone https://github.com/YOUR_GITHUB_USER/YOUR_REPO.git ~/ddtask
cd ~/ddtask
docker compose up -d
