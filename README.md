# Getting started

Getting started with this Eztrak component UI library.

#### Familiar with Git?

```
git clone git@github.com:thisisirfan/eztrak-ui.git
cd eztrak-ui
yarn install
```

yarn install

Alternatively, you can use npm:

```
git clone git@github.com:thisisirfan/eztrak-ui.git
cd eztrak-ui
npm install
```

npm install
```

## Developing

To start the developing run :

```
yarn start
```

or

```
npm start
```

This will build a version of your library, run the watcher and also run Storybook.
To open Storybook manually open your Browser and navigate to [http://localhost:6060](http://localhost:6060).
Start developing your components in `src/components` folder and update the `src/index.js` file accordingly.
Always provide an `YourComponent.story.tsx` file, so your component will show up in Storybook.

You can refer to example `Button` component, but I think you'll get the idea.

## Styling your components

`SCSS` and `CSS` are supported out of the box, just import your styles into your component like you normally would do.
For the use of  `CSS Modules` refer to [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss)

## Linting and Code formating for Styles
Linting `SCSS` and `CSS` is suported out of the box following BEM by using [stylelint](https://stylelint.io/)


## Linting and Code formating for Typescript

Linting and code formating is done via [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) using [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) and
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier).
You can modify linting rules by overriding them in the `eslint.config.js` file.

```
yarn lint
```
or (if automatic fixing is possible)
```
yarn lint:fix
```

or

```
npm run lint
```
or (if automatic fixing is possible)
```
npm run lint:fix
```

## Testing

Testing is done with [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
You can refer to `Button.test.js` as an example.
```
yarn test
```

or

```
npm test
```

## Publishing your library to NPM

To release your library to NPM or your private Registry, make sure you have an active account at [NPM](https://www.npmjs.com/), your `.npmrc` file is correctly setup and the registry url at publishConfig in `package.json` file is set to your repository url, then:

```
yarn release
```

or

```
npm run release
```

## Storybook

For custom layouts, styling and more information about Storybook, please refer to [Storybook](https://storybook.js.org/basics/writing-stories/) documentation.

#### Deploy Storybook to GitHub Pages

Make sure the homepage url in `package.json` file is set to your githup pages url, then:

```
yarn deploy
```

or

```
npm run deploy
```

## Scripts

- `yarn start` : Only serves Storybook.
- `npm start` : Only serves Storybook.
- `yarn build` : Builds your library (build can be found in `dist` folder).
- `npm run build` : Builds your library (build can be found in `dist` folder).
- `yarn storybook:build` : Builds the static Storybook in case you want to deploy it.
- `npm run storybook:build` : Builds the static Storybook in case you want to deploy it.
- `yarn test` : Runs the tests.
- `npm test` : Runs the tests.
- `yarn test:coverage`: Runs the test and shows the coverage.
- `npm run test:coverage`: Runs the test and shows the coverage.
- `yarn lint` : Runs the linter, Typescript typecheck and stylelint.
- `npm run lint` : Runs the linter, Typescript typecheck and stylelint.
- `yarn lint:fix` : Runs the linter, Typescript typecheck and stylelint and fixes automatic fixable issues.
- `npm run lint:fix` : Runs the linter, Typescript typecheck and stylelint and fixes automatic fixable issues.
- `yarn eslint`: Runs only the JavaScript linter.
- `npm run eslint`: Runs only the JavaScript linter.
- `yarn eslint:fix`: Runs only the JavaScript linter and fixes automatic fixable issues.
- `npm run eslint:fix`: Runs only the JavaScript linter and fixes automatic fixable issues.
- `yarn stylelint`: Runs only the style linter.
- `npm run stylelint`: Runs only the style linter.
- `yarn stylelint:fix`: Runs only the style linter and fixes automatic fixable issues.
- `npm run stylelint:fix`: Runs only the style linter and fixes automatic fixable issues.
- `yarn check-types`: Runs typescript type checker.
- `npm run check-types`: Runs typescript type checker.
- `yarn ci`: Runs Linting, tests and type checker all together.
- `npm run ci`: Runs Linting, tests and type checker all together.
- `yarn release` : Publishes your Library on NPM or your private Registry (depending on your config in your `.npmrc` file).
- `npm run release` : Publishes your Library on NPM or your private Registry (depending on your config in your `.npmrc` file).
- `yarn storybook`: Same as yarn start, to serve storybook.
- `npm run storybook`: Same as npm start, to serve storybook.
- `yarn storybook:build`: Generates the build for storybook in `storybook-static` folder, that can be deployed wherever you need.
- `npm run storybook:build`: Generates the build for storybook in `storybook-static` folder, that can be deployed wherever you need.
- `yarn storybook:deploy`: Builds and deploys Storybook to GitHub Pages.
- `npm run storybook:deploy`: Builds and deploys Storybook to GitHub Pages.

## Resources

### Bundler
- [Rollup.js](https://rollupjs.org/guide/en)

### Code Formatter
- [Prettier](https://prettier.io/)

### Storybook
- [Storybook](https://storybook.js.org/)

### Testing
- [Vitest](https://vitest.dev/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)

### Linting
- [ESLint](https://eslint.org/)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [stylelint-prettier](https://github.com/prettier/stylelint-prettier)
- [stylelint-scss](https://github.com/kristerkari/stylelint-scss)

### Compiler
- [Typescript](https://www.typescriptlang.org/)
