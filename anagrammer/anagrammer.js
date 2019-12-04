'use strict';

const masterTree = require('../autocomplete/wordTree.js')

const anagrammer = function (word, filter = true) {
  let wordList = new Set();
  const splitWord = word.split('');

  const recurse = function (splitWord, partial = []) {
    for (let idx = 0; idx < splitWord.length; idx++) {
      const savePartial = [...partial]
      partial.push(splitWord[idx])
      const newSplitWord = [...splitWord.slice(0, idx), ...splitWord.slice(idx + 1)];
      if (newSplitWord.length) { recurse(newSplitWord, partial); }
      else {
        wordList.add(partial.join(''));
      }
      partial = [...savePartial]
    }
  }
  recurse(splitWord)
  if(filter){wordList = Array.from(wordList).filter(word => masterTree.isWord(word))}
  else(wordList = Array.from(wordList))
  return wordList
}

module.exports = anagrammer