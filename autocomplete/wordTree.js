'use strict'
const fs = require('fs');

// pathing on this is strange because of meteorjs, its located in the private folder
const list = fs.readFileSync('./autocomplete/wordlist.txt');

const listArray = list.toString().toLowerCase().split('\n');
const wordTree = {};
const wordInsert = function (word) {
  const wordArr = word.split('');
  let current = wordTree;
  for (let i = 0; i < wordArr.length; i++) {
    if (!current[wordArr[i]]) {
      current[wordArr[i]] = {}
    }
    current = current[wordArr[i]]
    if (i === wordArr.length - 1) { current.word = word }
    if (wordArr[i + 1 === '/']) {
      // mark this as a complete word
      current.word = true
      // remove slash

    }
  }
}
listArray.forEach(word => {
  wordInsert(word);
})

function findResultTree(string) {
  // break up the string
  const strArr = string.split('');

  // iterate through string as long as values exist
  let current = wordTree;
  for (let i = 0; i < strArr.length; i++) {
    let check = current[strArr[i]];
    if (check) { current = check }
    else {
      console.log('No matches found');
      break
    }
  }
  return current
}

function searchForWordsInTree(tree, limit = 50) {
  let results = [];
  // first enumerate the possible paths
  let paths = Object.keys(tree);
  for (let i = 0; i < paths.length; i++) {
    if (results.length >= limit) {
      break
    }
    // this will add a found word to the word list 
    if (paths[i] === 'word' && (results.length <= limit)) {
      results.push(tree.word)
    }
    // this should create a depth first search of the data
    // one of the paths could be 'word' but that shouldn't be a problem since it has no properties
    else if (tree[paths[i]] && (results.length <= limit)) {
      searchForWordsInTree(tree[paths[i]]).forEach(word => results.push(word))
    };

  }
  return results;
}

function returnWordsFromPartial(partial, limit) {
  return searchForWordsInTree(findResultTree(partial), limit)
}
const masterTree = {
  wordTree, findResultTree, searchForWordsInTree, returnWordsFromPartial
}

module.exports = masterTree;