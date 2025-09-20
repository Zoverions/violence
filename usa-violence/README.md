# Violence Statistics Dashboard

This project is a production-ready, fully static dashboard visualizing violence statistics in the USA. It uses Next.js, TypeScript, Tailwind CSS, and Plotly.js for interactive charts.

## Features
- Interactive charts for hate crime trends, NCVS vs FBI, LEOKA, gun violence, and contextual scale
- Automated data update scripts (see `scripts/update_data.py`)
- Static export for easy deployment to basic shared hosting (e.g., Rebel.ca)
- No backend or database required for deployment

## Getting Started

### Development
Run the development server:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Static Export & Deployment
1. Build and export the site:
   ```bash
   npm run build
   ```
   The static files will be in the `out/` directory.
2. Upload all files from `out/` to your web host's public directory (e.g., `public_html`).
3. No server-side code or database setup is required.

### Data Updates
- To update data, modify the dashboard code or use scripts in `scripts/` to generate new data, then rebuild and export.

## Directory Structure
- `out/` — Static site files for deployment
- `src/` — Source code for the dashboard
- `scripts/` — Data automation scripts

## Documentation
- See `DEPLOYMENT.md` for full deployment instructions.

## License
MIT
