'use strict'
const fs = require('fs')
const anagrammer = require('../anagrammer/anagrammer.js')

let mirabelle = anagrammer('mirabelle', false)

let filtered = mirabelle.length;
mirabelle = mirabelle.filter(val => !(val[0] == 'l' && val[1] == 'l'))
console.log(`Filtering out ${filtered - mirabelle.length} results due to starting with 'll'`); 

filtered = mirabelle.length
// remove incidents of 3 consecutive vowels

mirabelle = mirabelle.filter(name => !name.match(/[aeiou]{3}/g))
console.log(`Filtering out ${filtered - mirabelle.length} results due to three or more consecutive vowels`); 
filtered = mirabelle.length;

mirabelle = mirabelle.filter(name => !name.match(/[bcdfghjklmnpqrstvwxyz]{4}/g))
console.log(`Filtering out ${filtered - mirabelle.length} results due to four or more consecutive vowels`); 
filtered = mirabelle.length;


console.log(filtered)

mirabelle = mirabelle.map(word => `'${word}'`)
fs.writeFileSync('./mirabellList.js', `module.exports = [${mirabelle}]`)