import bufferManipulator from "./buffer";

class Question{

    parseName(response: bufferManipulator){
        for(let i:number=0;i<2;i++){
            let length=response.sendint(2)
            let name=response.sendstr(length)
            console.log(name)
        }
        response.add()
    }
    
    parseType(buff: bufferManipulator){
        let idd=buff.sendint(4) 
        console.log('Record Type =',idd)
        
        idd= buff.sendint(4)
        console.log('Class =',idd)
    }

    quesDecode(buff:bufferManipulator){
        console.log('-------------')
        console.log("Question Part")
        console.log('-------------')
        this.parseName(buff)
        this.parseType(buff)
    }

    static questionEncode(hostname: string, qtype:string):Buffer{
        let labelSequence = this.getLabelSequence(hostname)
        const QTYPE = this.getQTYPE(qtype)
        
        const QCLASS = Buffer.alloc(2);
        QCLASS.writeUInt16BE(0x0001, 0); // QCLASS: IN (Internet)
        return Buffer.concat([labelSequence, QTYPE, QCLASS]);
    }
    
    static getLabelSequence(hostname:string):Buffer{
        const parts = hostname.split('.');
        const qnameBuffers = parts.map(part => {
            const length = Buffer.alloc(1);
            length.writeUInt8(part.length, 0);
            const namePart = Buffer.from(part);
            return Buffer.concat([length, namePart]);
        });
        const qname = Buffer.concat([...qnameBuffers, Buffer.from([0])]);
        return qname;
    }

    static getQTYPE(type:string){
        const QTYPE = Buffer.alloc(2); // Allocate a buffer of 2 bytes

        switch (type.toLowerCase()) {
            case 'ipv4':
                QTYPE.writeUInt16BE(0x0001, 0); // QTYPE: A record
                break;
            case 'ipv6':
                QTYPE.writeUInt16BE(0x001C, 0); // QTYPE: AAAA record
                break;
            case 'cname':
                QTYPE.writeUInt16BE(0x0005, 0); // QTYPE: CNAME record
                break;
            case 'ns':
                QTYPE.writeUInt16BE(0x0002, 0); // QTYPE: NS record
                break;
            case 'mx':
                QTYPE.writeUInt16BE(0x000f, 0); // QTYPE: MX record
                break;
            default:
                throw new Error('Unsupported query type');
        }
        return QTYPE
    }
}

export default Question