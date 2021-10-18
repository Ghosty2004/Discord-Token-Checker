const axios = require("axios");
const fs = require("fs");
require("colors");

const token = {
    Validate: function(token) {
        return new Promise((resolve, reject) => {
            axios.default.post(`https://discord.com/api/v6/invite/${getRandomInt(1, 9999999)}`, {}, {
                headers: { 
                    "Authorization": token 
                }
            }).catch((result) => { 
                if(result.response.data.message == "401: Unauthorized") {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

fs.readFile("tokens.txt", 'utf8', async function(err, data) {
    if(!err) {
        data = data.replace(/\r/g, "");
        let array = data.split("\n");
        let good_tokens = 0;

        console.log("\n");
        console.log("Token checher has started...");

        for(let i = 0; i < array.length; i++) {
            if(await token.Validate(array[i])) {
                console.log(`[TOKEN]: `.green + `${array[i]}`);
                good_tokens++;
            }
            else {
                console.log(`[TOKEN]: `.red + `${array[i]}`);
            }
        }

        console.log("Found " + `${good_tokens}`.yellow + " valid tokens.");
        console.log("\n");
    }
});
