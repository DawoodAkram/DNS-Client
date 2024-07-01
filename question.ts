import bufferManipulator from "./buffer";

class Question{

    parseMeta(response: bufferManipulator){

        let idd=response.sendint(4)
        console.log('Questions Asked',idd)
  
        idd=response.sendint(4)
        let a_count=idd;
        console.log('Answer Count =',idd)

        idd=response.sendint(4)
        console.log('Authority Count =',idd)

        idd=response.sendint(4)
        console.log('Additional Count =',idd)

        return a_count
    }

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
        let a_count=this.parseMeta(buff)
        this.parseName(buff)
        this.parseType(buff)
        return a_count
    }
}

export default Question