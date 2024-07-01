import bufferManipulator from "./buffer"

class Answer{

    parseDomain(buff: bufferManipulator) {
        // To get the offset
        let str:string=buff.peek(4)
        if((parseInt(str[0],2)==1) && (parseInt(str[1],2)==1)){
            let new_str=str.slice(2,)
            let decimalNumber = parseInt(new_str, 2);
            let len=buff.peekint(decimalNumber*2)
            console.log('Domain Name = ',buff.getbytes(decimalNumber*2,len))
            buff.add()
            buff.add()
        }
        else{
            let idd=buff.sendint(2)
            for(let i:number=0;i<2;i++){
                let length=buff.sendint(2)
                let name=buff.sendstr(idd)
                console.log(name)
            }
            buff.add()
        }

    }

    parseRecord(buff: bufferManipulator):number{

        let idd=buff.sendint(4)
        console.log('Record Type =',idd)
        let type=idd

        idd= buff.sendint(4)
        console.log('Class =',idd)

        idd= buff.sendint(8)
        console.log('TTL =',idd)

        idd= buff.sendint(4)
        console.log('Length =',idd)
        
        return type
    }

    parseIp(buff: bufferManipulator, a_count: number, type: number) {
        
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

        } else if (type === 28) {
            for (let i = 0; i < 8; i++) {
                let part = buff.sendint(4).toString(16); // Get each 16-bit part
                IP += part;
                if (i != 7) {
                    IP += ':';
                }
            }
            console.log("IP = ", IP);

        }
        else if(type===6 || type===2){
            let str:string=buff.peek(4)
            if((parseInt(str[0],2)==1) && (parseInt(str[1],2)==1)){
                let new_str=str.slice(2,)
                let decimalNumber = parseInt(new_str, 2);
                let len=buff.peekint(decimalNumber*2)
                console.log('Domain Name = ',buff.getbytes(decimalNumber*2,len))
                buff.add()
                buff.add()
            }
            else{
                console.log('Not a Pointer')
                //let idd=buff.sendint(2)
                //console.log("LENGTH = ",idd)
                for(let i=0;i<5;i++){
                    let length=buff.sendint(2)
                    console.log('Length = ',length)
                    if(length===0){
                        console.log('Inside ' )
                        break;
                    }
                    let name=buff.sendstr(length)
                    console.log(name)
                }
                buff.add()
            }
        }
    

    }

    answerDecode(buff: bufferManipulator, a_count: number){
        console.log('-------------')
        console.log("Answer Part")
        console.log('-------------')
        if(a_count===0){
            console.log('No Answers returned')
        }        
        for(let i:number=0;i<a_count;i++){
            console.log('\n--> Answer (',i+1,')')
            this.parseDomain(buff)
            let type=this.parseRecord(buff)
            this.parseIp(buff,a_count,type)
        }
        return
    }
}

export default Answer