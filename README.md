# My Portfolio

This is a Vite + React portfolio site. The project is configured for easy deployment to static hosts (Vercel, Netlify, GitHub Pages).

## Build

Install dependencies and build:

```bash
npm ci
npm run build
```

The build output will be in the `dist` folder.

## Environment variables

The contact form uses EmailJS. Set these in a local `.env` (ignored by git):

```
VITE_SERVICE_ID=your_service_id
VITE_TEMPLATE_ID=your_template_id
VITE_PUBLIC_KEY=your_public_key
```

## Local preview

```bash
npm run preview
```

## Deploy

- Vercel: connect the repo and set the build command to `npm run build` and output directory to `dist`.
- Netlify: set build command `npm run build` and publish directory `dist`. Alternatively use the Netlify CLI.
- GitHub Pages: this repo includes a GitHub Actions workflow that builds and deploys `dist` to Pages on pushes to `main`.

## Helpful Git commands

If you added files that should be ignored, stop tracking them and remove from the repo with:

```bash
git rm --cached path/to/file
git commit -m "chore: remove ignored files from tracking"
```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
