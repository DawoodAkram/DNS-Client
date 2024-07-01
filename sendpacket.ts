import dgram from 'node:dgram';

async function sendPacket(packet: Buffer, socket: dgram.Socket, DNS_PORT: number, DNS_SERVER: string): Promise<Buffer> {
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

export default sendPacket