# Break-Even Calculator

A focused, browser-local calculator for small service businesses. Calculate the jobs, revenue, or billable hours needed to cover monthly costs or reach a target profit.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. No secrets or environment variables are required.

## Quality checks

```bash
npm run lint
npm test
npm run build
```

All business and pricing inputs stay in browser local storage. There is no API, database, authentication, analytics, or cloud sync.
