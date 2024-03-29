<p align="center">
  <a href="https://github.com/miguelcarvalho13/quick-timesheet/actions/workflows/cd.yml"><img src="https://github.com/miguelcarvalho13/quick-timesheet/actions/workflows/cd.yml/badge.svg" alt="Deploy status"></a>
  <a href="https://github.com/miguelcarvalho13/quick-timesheet/actions/workflows/ci.yml"><img src="https://github.com/miguelcarvalho13/quick-timesheet/actions/workflows/ci.yml/badge.svg" alt="CI status"></a>
  <a href="https://github.com/miguelcarvalho13/quick-timesheet/blob/main/LICENSE"><img src="https://img.shields.io/github/license/miguelcarvalho13/quick-timesheet" alt="GitHub license"></a>
</p>

# Quick Timesheet

An easy way to parse a text to a timesheet table so that it is easier to check how many hours and extra hours a given timesheet have.

## Installation

To run this on your local environment you will need to [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository and then proceed with the following installations:

### Dependencies

- [NVM](https://github.com/nvm-sh/nvm)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

With all of that installed you can proceed to run on your terminal:

```bash
yarn && yarn dev
```

Then the app should now be running at [http://localhost:5173](http://localhost:5173).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner using [vitest](https://vitest.dev).

### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.

### `yarn lint`

Runs all linting scripts defined in the `package.json` (through `lint:...`).

---

**Note**: This project was previously bootstrapped with [Create React App](https://github.com/facebook/create-react-app) but right now it migrated to use [Vite](https://vitejs.dev).
