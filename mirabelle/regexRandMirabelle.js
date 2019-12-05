'use strict'

const mirabelle = require('./mirabelleList.js')

function randomWithMatch(regex) {
  let count = 0
  let tempMirabelle = [...mirabelle];
  let randomMirb = ''
  while (!randomMirb.match(regex) && tempMirabelle.length) {
    count -= -1
    let randInt = Math.floor(Math.random()* tempMirabelle.length);
    [tempMirabelle[randInt], tempMirabelle[tempMirabelle.length -1]] = [tempMirabelle[tempMirabelle.length -1] ,tempMirabelle[randInt] ]
    randomMirb = tempMirabelle.pop()
  }
  console.log(count,'tries to find one')
  return randomMirb.match(regex) ? randomMirb : 'No match found';

}
module.exports = randomWithMatch