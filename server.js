const express = require('express');
const app = express();
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const program = require('commander');
const webpackConfig = require('./webpack.config');
const _ = require('lodash');

program
  .version('0.1.0')
  .option('-d, --development', 'Development mode')
  .parse(process.argv);

const DEVELOPMENT = program.development;

const compiler = webpack(webpackConfig(DEVELOPMENT));

const htmlStart = (jsFile) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Ideal Response</title>

  <style>
    body {
      background: ivory;
    }
  </style>
</head>

<body>
  <h1>Ideal Response</h1>

  <h2>Data</h2>
  <div id="data"></div>

  <script src="${jsFile}"></script>
`;

const htmlEnd = (data) => {
  data = JSON.stringify(data);
  return `
    <script>
      window.preLoad = ${data};
    </script>
  </body>
  </html>
`};

if (DEVELOPMENT) {
  app.use(middleware(compiler, {
    serverSideRender: true
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

app.get('/', (req, res) => {
  let assetsByChunkName;
  if (DEVELOPMENT) {
    assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
  } else {
    assetsByChunkName = require('./app/stats').assetsByChunkName;
  }

  const mainChunk = assetsByChunkName.main;
  const mainJs = _.isArray(mainChunk) ? mainChunk[0] : mainChunk;


  res.type('text/html; charset=utf-8');
  res.write(htmlStart(mainJs));

  setTimeout(() => {
    const data = { a: 1, b: 2 };
    res.write(htmlEnd(data));
    res.end();
  }, 2000);
});

app.use(express.static('app'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))