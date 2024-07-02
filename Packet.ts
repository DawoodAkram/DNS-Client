import Answer from "./answer";
import Header from "./header";
import Question from "./question";

export class DNSPacket{
    packet : Buffer
    constructor(name:string,qType:string){
        let header=Header.headerEncode()
        let question=Question.questionEncode(name,qType)
        this.packet=Buffer.concat([header,question])
    }
}