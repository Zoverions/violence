# Violence Statistics Dashboard Deployment Guide

## How to Deploy on Rebel.ca or Any Basic Shared Hosting

1. **Build and Export the Site**
   - The site is already built and exported as static HTML.
   - The exported files are in the `out/` directory.

2. **Upload Files to Hosting**
   - Use FTP, SFTP, or your hosting control panel to upload all files from the `out/` directory to your web root (e.g., `public_html`).
   - Make sure to include all subfolders and files.

3. **No Server-Side Code Needed**
   - All data and charts are rendered client-side.
   - No backend or database setup is required for the static site.

4. **Automated Data Updates**
   - To update data, modify the dashboard code and re-export the site.
   - For advanced automation, use scripts to generate new static JSON/data files and update the dashboard before export.

5. **Preview Locally**
   - You can preview the static export by running:
     ```bash
     npx serve out
     ```
   - Then visit `http://localhost:5000` in your browser.

## Directory Structure
- `out/` — Static site files for deployment
- `src/` — Source code for the dashboard
- `scripts/` — Data automation scripts (optional)

## Customization
- To add new charts or update data, edit `src/app/page.tsx` and re-run the build/export process.
- For more advanced features, consider using a VPS or cloud host with backend support.

## Support
- For help, contact your hosting provider or refer to Next.js documentation: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

---

**Your site is now ready for production deployment!**
