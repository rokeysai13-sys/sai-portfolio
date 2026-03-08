

## Plan: Trigger GitHub Sync and Verify

The `portfolio.html` in Lovable already has the correct `navigateToProject()` function and `onclick` handlers. The problem is the GitHub repo still has the old version.

### Action
Make a trivial comment change in `portfolio.html` (e.g., update the `<title>` or add a build timestamp comment) to trigger Lovable's GitHub auto-sync. This will push all pending changes to the repo and trigger the GitHub Actions deploy workflow.

### Specific Change
Add a small HTML comment at the top of `portfolio.html`:
```html
<!-- Last synced: 2026-03-08 -->
```

### After Sync
Once deployed (~2-3 min), verify:
1. `rokeysai13-sys.github.io/sai-portfolio/portfolio.html` loads
2. Project cards have working `onclick` handlers calling `navigateToProject()`
3. Clicking a card navigates to e.g. `/sai-portfolio/projects/spam-detector`

