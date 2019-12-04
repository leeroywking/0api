'use strict'

const mirabelle = require('./mirabelleList.js')


Array.prototype.random = function(){
  const position = Math.floor(Math.random() * this.length)
  return this[position]
}


module.exports = () => mirabelle.random()