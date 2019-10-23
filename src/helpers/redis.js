/**
* class redis helper to create redis client and export it  
*/

const redis = require('redis')

var client = redis.createClient()
    
client.on('connect', () => {
    console.log('Redis client connected')
})
    
client.on('error', (err) => {
    console.log('Redis ERROR = ' + err)
    client.quit();
})


module.exports = {
    client,

    //function to check if key already exist in redis memory, return = {0,1}
    isKeyExist: (key) => {
        return new Promise((resolve, reject) => {
            client.exists(key, (err, reply) => {
                if(!err) {
                    resolve(reply);
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}



