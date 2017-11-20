"use strict";

var sha256 = require('js-sha256');        
        
module.exports = function()
{
    var self = this;
    
    self.generate = function(salt, challenge)
    {
        
        var index     = 0;
        var lastIndex = 0;
        var output    = "";
        var challenge = challenge || "00000";
        var input     = "";
        var salt      = salt || "additional_hash_data";
        var interval  = null;
        
        while(true)
        {
            input = salt + index;
            output = sha256(input);
            if(index % 50000 === 0)
            {
                process.stdout.clearLine();  // clear current text
                process.stdout.cursorTo(0);
                process.stdout.write(output);
            }
            
            if(output.startsWith(challenge)) break;
            
            index++;
        }
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        return { hash:        output,
                 indexNumber: index,
                 input:       input };
    };
    
    self.verify = function(value, salt, challenge)
    {
        var input = salt + value;
        var hash = sha256(input);
        return hash.startsWith(challenge);
    };
};