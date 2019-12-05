'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const masterTree = require('./autocomplete/wordTree.js');
const newBelle = require('./mirabelle/randMirabelle.js')

const jsonObject = { hello: 'world' };
const userObj = require('./userObj.json');

function reply(req, res) {
  res.send(jsonObject);
}

function peopleHandler(req, res) {
  res.send(userObj);
}

function autocomplete(req,res){
  console.log('hit the autocomplete route')
  let partialWord = req.params.partial;
  let limit = req.params.limit;
  let wordList = masterTree.returnWordsFromPartial(partialWord, limit)
  res.send({partialWord, limit, wordList})
}

function belleRoute(req,res){
  let randBelle = newBelle();
  console.log(`returning ${randBelle} to /newBelle`)
  res.send({randBelle})
}

function bellePartialRoute(req,res){
  let count = 0
  let partial = req.params.partial;
  let randBelle = newBelle();
  while(!randBelle.match(partial) && count < 100000){
    count -=-1
    randBelle = newBelle()
  }
  if(count >= 10000){res.send('no matches found in quick search')}
  console.log(`returning ${randBelle} to /newBelle`)
  res.send({randBelle})
}

app.get('/', reply);
app.get('/peopleObject', peopleHandler);
app.post('/peopleObject', peopleHandler);
app.get('/autocomplete/:partial', autocomplete)
app.get('/autocomplete/:partial/:limit', autocomplete);
app.get('/newBelle', belleRoute)
app.get('/newBelle/:partial', bellePartialRoute)
app.listen(PORT);
