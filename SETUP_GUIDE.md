# Setup Guide

Everything needed to take this profile live. Estimated time: 10 minutes.

## 1. File layout

Your repository must look exactly like this:

```text
YOUR_USERNAME/                      <- repository name MUST equal your username
├── README.md
├── SETUP_GUIDE.md                  <- optional, can be deleted after setup
├── .github/
│   └── workflows/
│       └── snake.yml
└── assets/
    ├── banner.svg
    ├── status.svg
    ├── divider.svg
    ├── diagnostics.svg
    ├── footer.svg
    ├── header-about.svg
    ├── header-arsenal.svg
    ├── header-telemetry.svg
    ├── header-snake.svg
    ├── header-projects.svg
    ├── header-footer.svg
    ├── chips-sql.svg
    ├── chips-backend.svg
    ├── chips-devops.svg
    ├── chips-ai.svg
    ├── project-canvora.svg
    ├── project-hostmate.svg
    ├── project-weatherapp.svg
    ├── project-spotify-clone.svg
    └── project-catchhive.svg
```

The three snake files (`github-contribution-grid-snake.svg`, `-dark.svg`, `.gif`) are NOT created by you. The workflow generates them and publishes them to a branch called `output`.

## 2. Create the special profile repository

1. Go to https://github.com/new
2. Repository name: exactly your GitHub username (for example `abhijeetdhokne` if that is your username). GitHub shows a note that this is a special repository.
3. Set visibility to **Public**. A private repository will not show on your profile.
4. Tick **Add a README file** (you will overwrite it), then click **Create repository**.

## 3. Add the files

**Option A: command line (recommended)**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_USERNAME.git
cd YOUR_USERNAME
# copy the contents of profile-repo/ into this folder, including the hidden .github folder
git add .
git commit -m "feat: cyberpunk terminal profile"
git push origin main
```

**Option B: web upload**

Drag the `assets` folder and `README.md` into the repository using **Add file > Upload files**. Create `.github/workflows/snake.yml` with **Add file > Create new file**, typing the full path `.github/workflows/snake.yml` in the filename box.

## 4. Replace the placeholders

Run this from the repository root (replace the values):

```bash
sed -i 's/YOUR_USERNAME/your-real-username/g' README.md assets/*.svg
```

On macOS use `sed -i '' ...` instead of `sed -i ...`.

Then edit these by hand in `README.md`:

| Placeholder | Replace with |
| --- | --- |
| `YOUR_EMAIL@example.com` | your contact email (appears twice) |
| `YOUR_LINKEDIN_HANDLE` | your LinkedIn handle (appears twice) |
| `YOUR_CANVORA_REPO` | the real Canvora repository name |
| `YOUR_HOSTMATE_REPO` | the real Hostmate repository name |
| `YOUR_WEATHERAPP_REPO` | the real WeatherApp repository name |
| `YOUR_SPOTIFY_CLONE_REPO` | the real Spotify Clone repository name |
| `YOUR_CATCHHIVE_REPO` | the real CatchHive repository name |

Project card text lives in `assets/project-*.svg`. If you want a card to show the real repo name, edit the line starting with `repo:` near the bottom of each file. The Spotify Clone and CatchHive cards intentionally say "see repository for details": update their `STACK` line once you decide what to list.

## 5. Enable GitHub Actions permissions

The workflow already declares `permissions: contents: write`, but your repository setting must allow it.

1. Repository **Settings > Actions > General**
2. Under **Actions permissions**, choose **Allow all actions and reusable workflows** (the workflow uses `Platane/snk` and `crazy-max/ghaction-github-pages`).
3. Under **Workflow permissions**, select **Read and write permissions**.
4. Click **Save**.

No personal access token is required. The built-in `GITHUB_TOKEN` is enough.

## 6. Run the snake workflow and publish assets

1. Open the **Actions** tab.
2. Select **Generate Contribution Snake** in the left sidebar.
3. Click **Run workflow > Run workflow** (this is the `workflow_dispatch` trigger).
4. Wait for the run to turn green (usually 1 to 3 minutes; GIF generation is the slow part).

The first successful run creates the `output` branch automatically, containing:

- `github-contribution-grid-snake.svg`
- `github-contribution-grid-snake-dark.svg`
- `github-contribution-grid-snake.gif`

After that it re-runs daily at 00:00 UTC.

## 7. Verify everything works

1. **Snake assets:** open
   `https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_USERNAME/output/github-contribution-grid-snake-dark.svg`
   in a browser. You should see an animated snake. Repeat for the `.gif` and the light `.svg`.
2. **Profile page:** open `https://github.com/YOUR_USERNAME`. Hard refresh (Ctrl+Shift+R).
3. **Local SVGs:** the banner should show a boot sequence, a glitching name and a moving scanline. Section headers should have a sweeping underline.
4. **External cards:** stats, languages, streak and activity graph should load within a few seconds.
5. **Mobile:** open the profile in the GitHub mobile app or a narrow browser window. The tables collapse and images scale to width.

## 8. Troubleshooting

**Snake images are broken (404)**
- The workflow has not completed successfully yet. Check the Actions tab.
- The `output` branch does not exist yet. It is created on the first green run.
- The URL contains the wrong username. URLs are case-sensitive in the path.
- Open the failing step's logs. A "Resource not accessible by integration" error means step 5 (Read and write permissions) was missed.

**Snake works but does not animate**
- The `<picture>` element serves the SVG on most browsers and the GIF as the fallback. Open the raw URLs directly (step 7.1) to confirm each asset animates by itself.
- Some email or RSS previews and a few mobile webviews freeze SVG animation. The GIF fallback covers that.

**Local SVGs (banner, headers, cards) are broken**
- Paths are relative to the repository root. Make sure the `assets/` folder is committed, not just on your machine.
- File names are case-sensitive on GitHub.
- If animations appear frozen, open the SVG file on github.com and check that it renders. If it does, the problem is caching (see below).

**Stats cards show an error or a blank box**
- `github-readme-stats.vercel.app` is a free public instance that periodically hits GitHub API rate limits. Wait a few minutes, or self-host it on your own Vercel account (the project README documents a one-click deploy) and replace the domain in the three affected URLs.
- Private contributions do not count unless you enable **Profile > Contribution settings > Private contributions** and the card uses `count_private=true` (already set).
- The streak card is hosted at `streak-stats.demolab.com`. If it is down, the community-maintained alternative is self-hosting `DenverCoder1/github-readme-streak-stats`.

**Images look stale after edits**
- GitHub proxies images through its Camo cache. Append a version string to force a refresh, for example `...snake.gif?v=2` or `banner.svg?v=2`.

**README does not appear on the profile**
- The repository must be public, its name must exactly equal your username, and the file must be named `README.md` at the root of the default branch.

**Changing the card theme**
- The `github-profile-summary-cards` row uses the `dracula` theme to stay dark with a purple accent. Swap `theme=dracula` for any theme listed in that project's documentation. All `github-readme-stats` cards are already custom-coloured with hex values (`bg_color`, `title_color`, `icon_color`, and so on).

**Workflow runs but the GIF step fails**
- The `Platane/snk@v3` action generates the GIF inside a container. If you only need SVGs, replace `Platane/snk@v3` with `Platane/snk/svg-only@v3` and remove the `.gif` output line. The README `<img>` fallback would then need to point to an SVG instead.

## 9. Maintenance notes

- Daily schedule: edit the cron line in `snake.yml` (`0 0 * * *` is 00:00 UTC).
- GitHub disables scheduled workflows after 60 days of repository inactivity. A manual run or any commit re-enables it.
- Colours live in plain hex values inside each SVG: terminal green `#39ff14`, purple `#8a5cff`, muted grey `#5a665a`, background `#070a07`. Search and replace to retheme.
