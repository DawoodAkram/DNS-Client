import dgram from 'node:dgram';
import { DNSPacket } from './Packet';
import Connection from './connection';

export class Transport{

    async generatePacket(name:string,qtype:string){
        let Packet = new DNSPacket(name,qtype)
        return Packet
    }

    async sendPacket(packet: Buffer, socket: dgram.Socket, DNS_PORT: number, DNS_SERVER: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            socket.send(packet, DNS_PORT, DNS_SERVER, (error,resolve) => {
                if (error) {
                    reject(error);
                }
            });
    
            socket.on('message', (message) => {
                resolve(message);
            });
    
            socket.on('error', (err) => {
                reject(err);
            });
        });
    }

    async helper(name:string,qtype:string){
        let s:Connection=new Connection()
        let socket:dgram.Socket=await s.socketCreation()
        let Packet = await this.generatePacket(name,qtype)
        let response = await this.sendPacket(Packet.packet ,socket,53,'8.8.8.8')
        
        socket.close() 
        return response
    }

}