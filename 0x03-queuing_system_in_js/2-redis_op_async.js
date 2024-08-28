// import { createClient, print } from 'redis';
const {createClient, print} = require('redis');
// import { promisify } from 'util';
 const {promisify} = require('util');

const client = createClient();

client.on('connect', function() {
    console.log('Redis client connected to the server');
});

client.on('error', function (err) {
    console.log(`Redis client not connected to the server: ${err}`);
});

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, print);
};

const get = promisify(client.get).bind(client);

async function displaySchoolValue(schoolName) {
    const result = await get(schoolName).catch((error) => {
        if (error) {
            console.log(error);
            throw error;
        }
    });
    console.log(result);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
