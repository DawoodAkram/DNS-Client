import bufferManipulator from './buffer';
import { DNSFlags } from './DNSFlags';

class Header{

    static headerEncode(){
        const buffer = Buffer.alloc(12);

        buffer.writeUInt16BE(Math.floor(Math.random()*65535)); 

        // Flags
        buffer.writeUInt16BE(0x0120, 2);

        // Questions
        buffer.writeUInt16BE(1, 4);

        // Answer RRs, Authority RRs, Additional RRs
        buffer.writeUInt16BE(0, 6);
        buffer.writeUInt16BE(0, 8);
        buffer.writeUInt16BE(0, 10);

        return buffer
    }

    parseId(buff: bufferManipulator){
        let idd=buff.sendint(4)
        console.log('Request ID = ', idd)
    }
    
    parseFlag(buff: bufferManipulator){

        let flag = new DNSFlags(buff.sendint(2),buff.sendint(2))    // Left byte , Right Byte
        
        const flag_Data={
            QR: flag.qr,
            OPCode:flag.opCode,
            AA:flag.aa,
            TC:flag.tc,
            RD:flag.rd,
            RA:flag.ra,
            Z:flag.z,
            RCODE:flag.rCode
        }
        console.log(flag_Data)
    }

    decodeHeader(buff: bufferManipulator){
        console.log('-------------')
        console.log("Header Part")
        console.log('-------------')
        this.parseId(buff)
        this.parseFlag(buff)
    }

}

export default Header