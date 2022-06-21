# 🎨 E-Sektionen frontend starter template

This template is used for creating a new frontend/fullstack application.

It uses the following technologies:

- [Yarn](https://yarnpkg.com/)
- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [SCSS](https://sass-lang.com/)

It also adds the [Tailwind prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) to format the classnames in the code.

## Development

The development server can be started by running:

```bash
yarn dev
```

## Deployment

A deployment build can be created by running:

```bash
yarn build
```

This builds the application and creates a folder called `build` in the root directory.

The application can then be ran by running:

```bash
node build/index.js
```

> You can run both the build and the start by running:
>
> ```bash
> yarn start
> ```

### Docker

Adds a boilerplate dockerfile to the project.

It builds the project using the [Node Adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-node).

To build the dockerfile run:

```bash
yarn docker:build
```

Then to run it:

```bash
yarn docker:run
```
