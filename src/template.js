export default ({ body, title, initialState }) =>
  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      
      <script src="/assets/bundle.js"></script>
    </html>
  `;
