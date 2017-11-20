"use strict";

var sha256 = require('js-sha256');

var index     = 0;
var lastIndex = 0;
var output    = "";
var challenge = "00000";
var input     = "";
var salt      = "additional_hash_data";
var interval  = null;

for(index = 0; !output.startsWith(challenge); index++)
{
    input = salt + index;
    output = sha256(input);
    if(index % 50000 === 0)
    {
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write(output);
    }
}

console.log({ hash: output, indexNumber: index, input: input });