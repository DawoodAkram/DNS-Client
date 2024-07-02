class outOfBoundAccess extends Error{
    constructor(n:number){
        super(`Less than ${n} bytes remaining`)
    }
}

class bufferManipulator{
    
    response:Buffer
    offset:number

    constructor(res:Buffer) {
        this.response=res;
        this.offset=0
    }

    private verifyHasBytesRemaining(n:number){
        if((this.response.byteLength - this.offset/2)<n){
            throw new outOfBoundAccess(n)
        }
    }

    sendint(length:number):number{
        this.verifyHasBytesRemaining(length/2)
        let str=this.response.toString('hex')
        let idd= str.slice(this.offset,this.offset+length)
        this.offset+=length
        return parseInt(idd,16)
    }

    sendstr(length:number):string{
        this.verifyHasBytesRemaining(length/2)

        let str=this.response.toString('hex')
        let name:string=""
        for(let j:number=0 ;j<length;j++){
            let ch:string = str.slice(this.offset,this.offset+2)
            let ascii=parseInt(ch,16)
            name+=String.fromCharCode(ascii);
            this.offset+=2
        }
        return name
    }

    peek(length: number): string {
        this.verifyHasBytesRemaining(length/2)
        let str=this.response.toString('hex')
        let flag=str.slice(this.offset,this.offset+length)
        let b_string:string=''
        for (let i = 0; i < flag.length; i += 2) {
            const hexPair = flag.substr(i, 2);
            
            const decimalValue = parseInt(hexPair, 16);
            const binaryValue = decimalValue.toString(2).padStart(8, '0');
            
            b_string += binaryValue;
        }
        return b_string
    }

    peekint(index:number){
        this.verifyHasBytesRemaining(index/2)
        let str=this.response.toString('hex')
        let idd= str[index]
        idd+=str[index+1]
        return parseInt(idd,16)
    }

    getbytes(decimalNumber: number, len: number) {
        let str=this.response.toString('hex')
        let name:string=""
        let num:number=0
        for(let j:number=decimalNumber+2 ;j<this.offset;j+=2){
            let ch:string = str.slice(j,j+2)
            if(ch=='00'){
                break;
            }
            let ascii=parseInt(ch,16)
            if(num==len){
                name+='.'
            }
            num++;
            name+=String.fromCharCode(ascii);
        }
        return name
    }

    add() {
        console.log(this.offset)
        this.offset+=2
    }

}
export default bufferManipulator