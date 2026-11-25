# Setup Guide — AbhijeetDhokne GitHub Profile

## 1. Repository

Create or use the special profile repository:

`AbhijeetDhokne/AbhijeetDhokne`

The repository name must exactly match your GitHub username. Set it to **Public** so the profile README and its public assets can render.

## 2. Folder structure

Copy the files while preserving this structure:

```text
AbhijeetDhokne/
├── README.md
├── assets/
│   ├── hero-banner.svg
│   ├── section-divider.svg
│   ├── terminal-window.svg
│   ├── status-panel.svg
│   └── footer-signal.svg
└── .github/
    └── workflows/
        └── snake.yml
```

Commit and push the files to the repository's default branch (usually `main`).

## 3. Enable GitHub Actions permissions

1. Open the repository on GitHub.
2. Go to **Settings → Actions → General**.
3. Under **Workflow permissions**, select **Read and write permissions**.
4. Save the setting.
5. Open the **Actions** tab.
6. Select **Generate contribution snake**.
7. Click **Run workflow**.

The workflow requests `contents: write` and uses the repository-provided `GITHUB_TOKEN` to publish the generated SVGs to the `output` branch.

If your organization or repository policy blocks write permissions, the workflow may need an administrator to allow them.

## 4. Snake output

The workflow generates:

- `github-contribution-grid-snake.svg`
- `github-contribution-grid-snake-dark.svg`

It publishes both files to the `output` branch. The README reads them from:

`https://raw.githubusercontent.com/AbhijeetDhokne/AbhijeetDhokne/output/`

The workflow runs daily at 00:17 UTC and can also be run manually.

Note: The workflow produces SVG output, not a GIF. The README therefore uses the light/dark SVG variants rather than referencing a GIF that is not generated.

## 5. Verify assets

After pushing:
- Open each file in the repository to confirm it exists.
- Open the Actions run and confirm it completed successfully.
- Open the profile README and check that the hero, dividers, status panel, and footer render.
- If the snake is missing, confirm the `output` branch exists and contains the two generated SVG files.

## 6. External widgets and limitations

GitHub README images are rendered from external services. Availability, rate limits, private contribution visibility, and theme behavior depend on those providers. A third-party statistics card can occasionally fail even when your README is correct.

SVG animation support can vary by browser and GitHub's sanitization. Keep static content readable if animation is not displayed.

## 7. Before publishing

The project repository URLs in the README were retained from the supplied draft. Confirm that each repository exists and that the capitalization/slug is correct. Update any incorrect link before publishing.

The README intentionally avoids inventing technology stacks for Spotify Clone and CatchHive where a confirmed stack was not supplied.
