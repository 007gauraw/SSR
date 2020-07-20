import { join } from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import algoliasearch from 'algoliasearch';
import { App, findResultsState } from './app';
import template from './template';

const server = express();

server.use('/assets', express.static(join(__dirname, 'assets')));

server.get('/', async (req, res) => {
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );

  searchClient.setExtraHeader('X-Forwarded-For', 'xxx');

  const resultsState = await findResultsState(App, {
    searchClient,
  });
  const initialState = { resultsState };
  const appString = renderToString(
    <App {...initialState} searchClient={searchClient} />
  );

  res.send(
    template({
      body: appString,
      title: 'Hello World from the server',
      initialState: JSON.stringify(initialState),
    })
  );
});

server.listen(8080);

/* eslint-disable no-console */
console.log('listening on 8080');
/* eslint-enable no-console */
