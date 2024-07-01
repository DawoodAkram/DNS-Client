import Connection from './connection';
import dgram from 'node:dgram';
import parser from './parse';
import sendPacket from './sendpacket';
import encodeDnsQuery from './encode';
import * as fs from 'fs'

const DNS_SERVER = '8.8.8.8';
const DNS_PORT = 53;

async function main(){
    const domain = process.argv[2];
    const queryType = process.argv[3];

    let s:Connection=new Connection()
    let socket:dgram.Socket=await s.socketCreation()

    try {
        const queryPacket = await encodeDnsQuery(domain, queryType);
        console.log('Encoded DNS query packet:', queryPacket);
        const response = await sendPacket(queryPacket,socket,DNS_PORT,DNS_SERVER);
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
    finally {
        socket.close();
    }
}

main();


