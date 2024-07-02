import parser from './parse';
import * as fs from 'fs';
import { Transport } from './transport';

const DNS_SERVER = '8.8.8.8';
const DNS_PORT = 53;

async function main(){
    let domain = process.argv[2];
    let queryType = process.argv[3];

    try {
        if (domain.startsWith("www.")) {
            domain = domain.slice(4); // Remove "www."
        }

        let send = new Transport()
        let response = await send.helper(domain,queryType)
        console.log('Response from Server = ',response)
        fs.writeFile('abc.bin', response, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('File written successfully');
            }
        });
        parser(response)
    } catch (error) {
        console.error('Error:', error.message);
    }
    
}

main();


