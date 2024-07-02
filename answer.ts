import bufferManipulator from "./buffer"

class Answer {


    parseDomain(buff: bufferManipulator) {
        // To get the offset
        let str: string = buff.peek(4)
        if ((parseInt(str[0], 2) == 1) && (parseInt(str[1], 2) == 1)) {
            let new_str = str.slice(2,)
            let decimalNumber = parseInt(new_str, 2);
            let len = buff.peekint(decimalNumber * 2)
            console.log('Domain Name = ', buff.getbytes(decimalNumber * 2, len))
            buff.add()
            buff.add()
        }
        else {
            let idd = buff.sendint(2)
            for (let i: number = 0; i < 2; i++) {
                let length = buff.sendint(2)
                let name = buff.sendstr(idd)
                console.log(name)
            }
            buff.add()
        }

    }

    parseRecord(buff: bufferManipulator): number {

        let idd = buff.sendint(4)
        console.log('Record Type =', idd)
        let type = idd

        idd = buff.sendint(4)
        console.log('Class =', idd)

        idd = buff.sendint(8)
        console.log('TTL =', idd)

        idd = buff.sendint(4)
        console.log('Length =', idd)

        return type
    }

    parseResult(buff: bufferManipulator, a_count: number, type: number) {

        let IP: string = "";

        if (type === 1) { // IPv4
            for (let i = 0; i < 4; i++) {
                let idd = buff.sendint(2);
                IP += idd;
                if (i != 3) {
                    IP += '.';
                }
            }
            console.log("IP = ", IP);

        } else if (type === 28) {   // IPv6
            for (let i = 0; i < 8; i++) {
                let part = buff.sendint(4).toString(16);
                IP += part;
                if (i != 7) {
                    IP += ':';
                }
            }
            console.log("IP = ", IP);

        }
        else if (type === 6 || type === 2) {
            console.log('NS = ',this.recursiveAnswer(buff))          
        }
    }

    recursiveAnswer(buff: bufferManipulator) {
        let str: string = buff.peek(2)
        let name:string=""
        if (str == '00000000') {
            buff.add()
            return ""
        }
        else if ((str[0] == '1') && (str[1] == '1')) {
            str = buff.peek(4)
            buff.add()
            buff.add()
            let new_str=str.slice(2)
            let offset = parseInt(new_str, 2)
            
            let domainNameBuffer: Buffer = buff.readBufferFrom(offset)
            let dnsBuffer = new bufferManipulator(domainNameBuffer);
            name += this.recursiveAnswer(dnsBuffer)
        }
        else {
            let length = buff.sendint(2)
            let a = buff.sendstr2(length*2);

            name += a + "." + this.recursiveAnswer(buff)
        }
        return name
    }

    answerDecode(buff: bufferManipulator, a_count: number) {
        
        if (a_count === 0) {
            console.log('No Answers returned')
        }
        this.parseDomain(buff)
        let type = this.parseRecord(buff)
        console.log(this.parseResult(buff, a_count, type))

        return
    }
}

export default Answer




