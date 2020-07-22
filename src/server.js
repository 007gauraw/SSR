import { join } from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {App}  from './app';
import template from './template';
const axios = require('axios');

const server = express();

server.use('/assets', express.static(join(__dirname, 'assets')));

async function loadApp(req, res, pageNumber = 1){
  try {
    let response = await axios.get(`https://hn.algolia.com/api/v1/search?page=${pageNumber}`)
    const initialState = {
      "name": "gaurav", columns: [
        {
          label: 'author',
          field: 'author',
          sort: 'asc',
          width: 150
        },
        {

          label: 'comment_text',
          field: 'comment_text',
          sort: 'asc',
          width: 270
        },
        {

          label: 'Vote',
          field: 'upVote',
          sort: 'asc',
          width: 270
        },
     {

          label: 'title',
          field: 'title',
          sort: 'asc',
          width: 270
        }

      ],
      rows: response.data.hits,
      pageNumber: pageNumber,
      
    };
    const appString = renderToString(
      <App {...initialState} />
    );

    res.send(
      template({
        body: appString,
        title: 'Hello World from the server',
        initialState: JSON.stringify(initialState)
      }));
  }
  catch (error) {
    console.log(error);
  }
}

server.get('/', async (req, res) => {
  loadApp(req, res);

});


server.get('/:pageNumber', async (req, res) => {
  let pageNumber = parseInt(req.params.pageNumber)
  if (!isNaN(pageNumber)){
    loadApp(req, res, pageNumber);
  }else{
    loadApp(req, res);
  }
  

});

server.get('/upVote', async (req, res) => {
  console.log("voted")
  res.send("done");
})

var port = process.env.PORT || 8080;
server.listen(port);

/* eslint-disable no-console */
console.log('listening on 8080');
/* eslint-enable no-console */
