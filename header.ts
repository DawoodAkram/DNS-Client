import bufferManipulator from './buffer';
import { DNSFlags } from './DNSFlags';

class Header{

    private constructor(
        private readonly id:number,
        private readonly flags:DNSFlags,
        private readonly QDCount:number,
        private readonly ANCount:number,
        private readonly NSCount:number,
        private readonly ARCount:number
    ){}

    get ID(){
        return this.ID
    }

    get FLAGS(){
        return this.flags
    }

    get QDCOUNT(){
        return this.QDCOUNT
    }

    get ANCOUNT(){
        return this.ANCount
    }
    
    get NSCOUNT(){
        return this.NSCount
    }

    get ARCOUNT(){
        return this.ARCount
    }


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

    static parseId(buff: bufferManipulator){
        let idd=buff.sendint(4)
        console.log('Request ID = ', idd)
        return idd;
    }
    
    static parseFlag(buff: bufferManipulator){

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
        return flag
    }

    static parseMeta(response: bufferManipulator){

        let q_count=response.sendint(4)
        console.log('Questions Asked',q_count)
  
        let a_count=response.sendint(4)
        console.log('Answer Count =',a_count)

        let auth_count=response.sendint(4)
        console.log('Authority Count =',auth_count)

        let add_count=response.sendint(4)
        console.log('Additional Count =',add_count)

        return {q_count,a_count,auth_count,add_count}
    }

    static decodeHeader(buff: bufferManipulator){
        console.log('-------------')
        console.log("Header Part")
        console.log('-------------')
        let id = this.parseId(buff)
        let flags = this.parseFlag(buff)
        const {q_count,a_count,auth_count,add_count} =this.parseMeta(buff)
        
        return new Header(id,flags,q_count,a_count,auth_count,add_count)
    }

}

export default Header