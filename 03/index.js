/*  Santas Emoji Hack!

During Christmas, Santa wants to ban negative emojis, so when people
use negative emoji shortcodes, he wants positive emojis to appear instead.

In other words, :angry: should result in 🎁 instead of 😠.


*/

const hackedEmojis = {
    "angry":            "🎁",   // 😠
    "thumbsdown":       "👏",   // 👎  
    "man_facepalming":  "🎅",   // 🤦‍♂️
    "cry":              "‍😄",   // 😭
    "puke":             "🤩"    // 🤮
}

const input = document.getElementById('input')
const resBox = document.getElementById('res-box')


/* 1. Write a function that checks if a lowercase word starts and 
ends with a colon. If it does, check if it exists in the hackedEmojis object, 
and replace it with the corresponding emoji. If not, return the original word.


Example input: ":cry:"
Example output: ‍😄

*/ 
function emojifyWord(word){
    if (!word) return
    const reg = /:(\S+):/g
    const res = word.replaceAll(reg, (a, b, c) => {
        const emoji = hackedEmojis[b]
        if (!emoji) return a
        return emoji
    })
    return res
}


/* 2. Write a function to find any emoji shortcodes in a phrase.
Use your emojify function from the previous exercise!

Example input: "Just read your article :thumbsdown:"
Example output: "Just read your article 👏"
*/ 

function emojifyPhrase(phrase){
    return emojifyWord(phrase)
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        resBox.innerHTML = emojifyPhrase(input.value)
    }
})


// Stretch goal: don't just replace the shortcodes, but also 
// any emojis are added directly to the text.



