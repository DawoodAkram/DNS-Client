import Answer from './answer';
import bufferManipulator from './buffer';
import Header from './header';
import Question from './question';

function parser(response: Buffer) {
    const buff = new bufferManipulator(response)

    const head = Header.decodeHeader(buff)
    const ques = new Question()
    const ans = new Answer()
    ques.quesDecode(buff)
    console.log('-------------')
    console.log("Answer Part")
    console.log('-------------')
    for (let i = 0; i < head.ANCOUNT; i++) {
        console.log('\n--> Answer (', i + 1, ')')
        ans.answerDecode(buff, head.ANCOUNT)
    }
}

export default parser