This is a demo for Locus' SmartText chart description text generator. In the demo you can change data to see how the SmartText will change in response.

Currently, the data input shape is:
```
For barcharts (point in time):
[{index: int, name: str, val: float}]

For linecharts (time series):
[{index: int, label: str, series: Array<float>}]
```

[Live demo here](https://chart-smart-text-locus.netlify.app/)

## TL;DR setup instructions
You need to have Node.js installed.
Clone this repo & run `npm i`, then start the dev server with `npm start`.

## SmartText development workflow
You can add a chart to App.js with new data.
If you need your data to look a certain way, define the data in `exampleData/exampleData.js`, exporting it as a constant which App.js can import. Otherwise, make use of `generateLinechartData` or `generateBarcharData` functions.

Note that these will regenerate data each time you reload the component!

 `<Linechart/>` or `<Barchart/>` components come with data manipulation and a SmartText field included. `src/components/Text.js` is the component that calls on SmartText module to get back the SmartText. A `chartType` props is expected. Most of the time a `chartProperties` props is required for SmartText to work properly.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
