# Car Dealer App

A web application that allows users to select a car manufacturer and a specific year to view the available car models from that manufacturer in that year.

It uses an API to fetch the list of cars manufacturer and the models from that manufacturer.

It uses the power of Next.JS to pre-generate all dynamic pages at build time, improving page load times and search engine optimization, while also reducing the load on the server.

## Getting Started

### Running the project in development mode

If you want to change something or see the application running on your own machine, run the command

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

After running the command, the app will be running on [localhost:3000](localhost:3000)

### Building

If you want to build your application to be ready to deploy, run the following command

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

The application will be available at the .next folder on your local repository.
