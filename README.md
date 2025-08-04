# Cluster Monitoring UI

A modern dashboard for monitoring cluster performance and managing snapshot policies. Built with **Next.js**, **React**, **Tailwind CSS**, and **Recharts**.

---

## Features

- 📊 **Performance Metrics:** Visualize IOPS and Throughput with interactive time series graphs.
- 🗓️ **Snapshot Policy Editor:** Easily configure snapshot schedules, retention, and locking.
- 🖥️ **Responsive UI:** Clean, modern interface with dark mode styling.
- 👤 **User Selection:** Switch between users (AD accounts) from the sidebar.
- ⚡ **Fast & Modular:** Built with Next.js App Router and Tailwind CSS for rapid development.

---

## Screenshots

_Add screenshots or GIFs of the dashboard and forms here!_

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Backend API running at `http://127.0.0.1:3333` (see API section below)

### Installation

```bash
git clone https://github.com/Ronny019/cluster-monitoring-ui.git
cd cluster-monitoring-ui
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Running Tests

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and integration tests.

### To run all tests:

```bash
npm test
# or
yarn test
```

---

## API Endpoints

The UI expects the following backend API endpoints to be available at `http://127.0.0.1:3333`:

- `GET /data/timeseries?cluster_id=...&type=...`  
  Fetches time series data for performance graphs (IOPS, Throughput).
- `GET /data/snapshot?cluster_id=...`  
  Fetches snapshot policy for a cluster.
- `PUT /data/snapshot`  
  Updates snapshot policy for a cluster.

---

## Project Structure

```
app/
  components/      # Navbar, Divider, Icons, etc.
  performance/     # Performance metrics page
  snapshot/        # Snapshot policy editor page
  context/         # React context providers
  ...
public/
  ...
```

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
