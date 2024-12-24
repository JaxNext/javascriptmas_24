import { codedMessage } from './codedMessage.js'

function calcOffset() {
  const source = 'abc'
  const target = 'klm'
  return target.codePointAt(0) - source.codePointAt(0)
}

function decodeBinary(binaryString) {
    const offset = calcOffset()
    const decoded = parseInt(binaryString, 2)
    const num = decoded - offset
    const char = String.fromCodePoint(num)
    return char
}

function decodeMessage(codedMessage) {
    return codedMessage.map(decodeBinary).join('')
}

const result = decodeMessage(codedMessage)

console.log(result)

/*
codedMessage.js holds a coded message (well, the name makes it obvious, huh?).

**Task**
- Decode the message!

key.md will help!

**Stretch Goal**
No stretch goal for the final day. Just stretch your legs!
*/ 