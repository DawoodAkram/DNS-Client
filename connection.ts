import dgram from 'node:dgram';

class Connection{
    socket:dgram.Socket;
    constructor(){
        
    }
    async socketCreation(): Promise<dgram.Socket>{
        this.socket=dgram.createSocket('udp4');
        return this.socket
    }
    
    async socketClose(){
        this.socket.close();
    }
    
}

export default Connection
    