import React from 'react';
import { hydrate } from 'react-dom';
import { App } from './index';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

hydrate(
  <App {...window.__APP_INITIAL_STATE__} searchClient={searchClient} />,
  document.getElementById('root')
);
