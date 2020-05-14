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
                <link rel="apple-touch-icon" sizes="180x180" href="/public/assets/favicon/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/public/assets/favicon/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/public/assets/favicon/favicon-16x16.png">
                <link rel="manifest" href="/public/assets/favicon/site.webmanifest">
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
