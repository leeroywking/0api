'use strict';

const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const app = express();
const masterTree = require('./autocomplete/wordTree.js');
const newBelle = require('./mirabelle/randMirabelle.js')
const newBelleWithMatch = require('./mirabelle/regexRandMirabelle.js');
const brambleBotReply = require('./mirabelle/bramblebotreply.js')
const cors = require('cors')
app.use(cors())
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


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
  let randBelle = newBelleWithMatch(partial);
  res.status(200).send({randBelle})
}

function brambleBot(req, res){
  if(req.body.challenge){
    res.send({"challenge":req.body.challenge})
  }
  console.log(req.body)
  brambleBotReply(`hey! ${newBelle()}`)
  res.send('You are good mate')
}

app.get('/', reply);
app.get('/peopleObject', peopleHandler);
app.post('/peopleObject', peopleHandler);
app.get('/autocomplete/:partial', autocomplete)
app.get('/autocomplete/:partial/:limit', autocomplete);
app.get('/newBelle', belleRoute);
app.get('/newBelle/:partial', bellePartialRoute);
app.post('/bramblebot', brambleBot);
app.listen(PORT);
