/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.
 
**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
   - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
   - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words. 

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input')
const addItemButton = document.getElementById('add-item-button')
const shoppingList = document.getElementById('shopping-list')
let listArr = []

function removeUnwantedSpaces(value) {
    const trimedValue = value?.trim?.()
    const itemText = trimedValue.replaceAll(/\s+/g, ' ')
    return itemText
}
// Function to check item is not duplicate
function checkDuplicate(value) {
    
    /* ⚠️ You need to add code to this function! ⚠️*/
    const lowerCaseList = listArr.map(item => item.toLowerCase())
    const lowerCaseValue = value.toLowerCase()

    const isDuplicate = lowerCaseList.includes(lowerCaseValue)
    if (isDuplicate) {
        alert(`The item "${value}" already exists`)
        itemInput.value = ''
        return true
    }
    return false
}

function deleteGift(gift) {
    listArr = listArr.filter(item => item !== gift)
    const listItem = document.querySelector(`[data-key="${gift}"]`)
    if (listItem) {
        listItem.remove()
    }
}

function editGift(oldGiftText, newGiftText) {
    const washedNewGiftText = removeUnwantedSpaces(newGiftText)
    const listItem = document.querySelector(`[data-key="${oldGiftText}"]`)
    const giftElement = listItem.querySelector('.gift-item')
    if (oldGiftText === washedNewGiftText) {
        giftElement.textContent = oldGiftText
        return
    }

    let isDuplicate = checkDuplicate(washedNewGiftText)
    if (isDuplicate) {
        giftElement.textContent = oldGiftText
        return
    }
    if (!washedNewGiftText) {
        deleteGift(oldGiftText)
        return
    }
    listArr = listArr.map(item => item === oldGiftText ? washedNewGiftText : item)
    giftElement.textContent = washedNewGiftText
    listItem.dataset.key = washedNewGiftText
    const closeBtn = listItem.querySelector('.close-btn')
    closeBtn.removeEventListener('click', handleDelete)
    closeBtn.addEventListener('click', handleDelete)
}

function addGift() {
    const washedValue = removeUnwantedSpaces(itemInput.value)
    if (!washedValue) return
    const isDuplicate = checkDuplicate(washedValue)
    if (isDuplicate) return
    listArr.push(washedValue)
    
    const listItem = document.createElement('li')
    const giftElement = document.createElement('span')
    giftElement.textContent = washedValue
    listItem.dataset.key = washedValue
    giftElement.contentEditable = true
    giftElement.classList.add('gift-item')
    giftElement.addEventListener('blur', handleEdit)

    // Add gift element to the list item
    listItem.appendChild(giftElement)
    // Add close button
    const closeBtn = document.createElement('span')
    closeBtn.textContent = 'X'
    closeBtn.classList.add('close-btn')
    closeBtn.addEventListener('click', handleDelete)
    // Add close button to the list item
    listItem.appendChild(closeBtn)
    shoppingList.appendChild(listItem)
    itemInput.value = ''
}

function handleEdit(event) {
    const oldGiftText = event.target.parentElement.dataset.key
    const newGiftText = event.target.textContent
    editGift(oldGiftText, newGiftText)
}

function handleDelete(event) {
    const giftText = event.target.parentElement.dataset.key
    deleteGift(giftText)
}

// Add event listener to button
addItemButton.addEventListener('click', addGift)

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addGift()
    }
})
