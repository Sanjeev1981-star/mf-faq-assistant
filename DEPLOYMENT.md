# Deployment Guide

This guide covers how to deploy the Facts-Only MF Assistant using GitHub Actions, Docker, and GHCR.

## GitHub Actions + GHCR (Automated Docker Builds)

The workflow at `.github/workflows/deploy-railway.yml` automatically:
1. Builds and tests the app on every push to `main`.
2. Builds a Docker image and publishes to GitHub Container Registry (GHCR).
3. (Optional) Creates a GitHub Release if you tag a commit.

### Setup

#### Option A: Use GITHUB_TOKEN (default, no extra setup)
- No action needed. The workflow uses the built-in `GITHUB_TOKEN` which has package write permissions.
- Images will be published to `ghcr.io/<your-username>/mf-assistant`.

#### Option B: Use Personal Access Token (recommended for fine-grained control)

1. **Create a Personal Access Token (PAT):**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic).
   - Click "Generate new token (classic)".
   - Give it a name (e.g., `GHCR_PAT`).
   - Select scopes:
     - `write:packages` (required)
     - `delete:packages` (optional, if you want to delete old images)
     - `repo` (if your repo is private)
   - Click "Generate token" and copy it.

2. **Add the PAT as a repository secret:**
   - Go to your GitHub repo → Settings → Secrets and variables → Actions.
   - Click "New repository secret".
   - Name: `GHCR_PAT`
   - Value: paste your PAT.
   - Click "Add secret".

3. **Verify workflow permissions:**
   - In your repo, go to Settings → Actions → General.
   - Under "Workflow permissions", select "Read and write permissions".
   - Click "Save".

The workflow will now use your PAT when available, falling back to `GITHUB_TOKEN` if not set.

### Pull and Run the Docker Image

Once the workflow completes successfully:

```bash
# Pull the image
docker pull ghcr.io/<your-username>/mf-assistant:latest

# Run it
docker run -d -p 3000:3000 \
  --name mf-assistant \
  ghcr.io/<your-username>/mf-assistant:latest

# Check logs
docker logs -f mf-assistant

# Stop it
docker stop mf-assistant
docker rm mf-assistant
```

If the image is private, you need to authenticate first:

```bash
# Using GHCR_PAT
echo "<your-pat>" | docker login ghcr.io -u <your-username> --password-stdin

# Then pull and run as above
```

### Create a GitHub Release with Docker Image

To create a release (which triggers a Release creation step):

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow will:
1. Build and test the code.
2. Push Docker images tagged with the commit SHA and `latest`.
3. Create a GitHub Release with release notes mentioning the GHCR images.

The Release can be accessed at `https://github.com/<owner>/<repo>/releases`.

## Local Docker Build (Without GitHub Actions)

If you want to build and push manually:

```bash
# Build the image locally
docker build -t mf-assistant:latest .

# Tag it for GHCR
docker tag mf-assistant:latest ghcr.io/<your-username>/mf-assistant:latest

# Log in to GHCR
echo "<your-pat>" | docker login ghcr.io -u <your-username> --password-stdin

# Push it
docker push ghcr.io/<your-username>/mf-assistant:latest
```

## Production Node.js (Without Docker)

If you prefer to run the app directly on a server:

```bash
cd mf-faq-assistant

# Install and build
npm ci
npm run build

# Start the production server
npm run start:prod

# (Optional) Use PM2 to daemonize
npm install -g pm2
pm2 start dist/index.js --name mf-assistant
pm2 startup
pm2 save
```

Set the `PORT` environment variable as needed:

```bash
PORT=3000 npm run start:prod
```

## Troubleshooting

### Image push fails with "unauthorized"
- Ensure your PAT or GITHUB_TOKEN has `write:packages` scope.
- Check that repo Actions permissions allow "Read and write".

### Workflow does not create Release
- The Release step only runs if the pushed ref is a Git tag (starts with `refs/tags/`).
- To trigger it, create and push a tag: `git tag v1.0.0 && git push origin v1.0.0`.

### Can't pull image (403 Forbidden)
- Image may be private. Log in with your PAT: `docker login ghcr.io`.
- Or make the GHCR package public (in package settings on GitHub).

## References

- [GitHub Container Registry documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Creating a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [Docker documentation](https://docs.docker.com/get-started/)
