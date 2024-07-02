//import Answer from './answer';
import Answer from './answer';
import bufferManipulator from './buffer';
import Header from './header';
import Question from './question';

function parser(response: Buffer){
    const buff=new bufferManipulator(response)
        
    const head=new Header()
    const ques=new Question()
    const ans=new Answer()
    head.decodeHeader(buff)
    ans.answerDecode(buff,ques.quesDecode(buff))
}

export default parser