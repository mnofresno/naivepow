"use strict";

var libpow = require('./libpow');

var pow = new libpow();

var output = pow.generate("additional_hash_data", "00000");

console.log(output);

console.log("verified: " + pow.verify(output.indexNumber, "additional_hash_data", "00000"));