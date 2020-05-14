const serialize = require("serialize-javascript");

module.exports = ({ bundle_file, title = "Farm to Table", initialState }) => {
  return `
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=0.75, maximum-scale=1">
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <script>window.__INITIAL_STATE__ = ${serialize(
                  initialState
                )}</script>
                <title>${title}</title>
            </head>
            <body>
                <div id="root"></div>
                <script src="${bundle_file}"></script>
            </body>
        </html>
`;
};
