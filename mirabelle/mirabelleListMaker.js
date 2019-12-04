'use strict'
const fs = require('fs')
const anagrammer = require('../anagrammer/anagrammer.js')

let mirabelle = anagrammer('mirabelle', false)
mirabelle.filter(val => !(val[0] == 'l' && val[1] == 'l'))


mirabelle = mirabelle.map(word => `'${word}'`)
fs.writeFileSync('./mirabellList.js', `module.exports = [${mirabelle}]`)