import bufferManipulator from './buffer';

class Header{

    parseId(buff: bufferManipulator){
        let idd=buff.sendint(4)
        console.log('Request ID = ', idd)
    }
    
    parseFlag(buff: bufferManipulator){

        let flag=buff.sendbin(4)
        const flag_Data={
            QR: parseInt(flag[0],2),
            OPCode:parseInt(flag.slice(1,5),2),
            AA:parseInt(flag[5],2),
            TC:parseInt(flag[6],2),
            RD:parseInt(flag[7],2),
            RA:parseInt(flag[8],2),
            Z:parseInt(flag.slice(9,12),2),
            RCODE:parseInt(flag.slice(12,),2)
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