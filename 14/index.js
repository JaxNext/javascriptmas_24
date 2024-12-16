/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

import { feedData } from './data.js'

// Get DOM elements
const feedAvatarsSection = document.querySelector('.feed-avatars')
const feedImagesSection = document.querySelector('.feed-images')

function renderAvatars() {
    feedData.forEach(friend => {
        feedAvatarsSection.innerHTML += `
            <img 
                src="images/${friend.avatarUrl}" 
                alt="${friend.handle}'s avatar" 
                class="avatar"
                data-handle="${friend.handle}"
            >
        `
    })
}

function renderAvatarHighlight(handle, highlight = true) {
    const avatar = document.querySelector(`[data-handle="${handle}"]`)
    if (highlight) {
        avatar.classList.add('highlight')
    } else {
        avatar.classList.remove('highlight')
    }
}

function renderImage(imageData) {
    feedImagesSection.innerHTML = `
        <img 
            src="images/${imageData.imageUrl}" 
            alt="${imageData.alt}" 
            class="feature-image"
        >
    `
}

async function handleTimer() {
    // Remove loading animation
    feedImagesSection.innerHTML = ''
    
    for (let friend of feedData) {
        // Highlight current friend's avatar
        renderAvatarHighlight(friend.handle)
        
        // Display each of their images
        for (let feature of friend.features) {
            renderImage(feature)
            // Wait 1.5 seconds before showing next image
            await new Promise(resolve => setTimeout(resolve, 1500))
        }
        
        // Remove highlight after friend's images are done
        renderAvatarHighlight(friend.handle, false)
    }
    
    // Show refresh message when all images have been displayed
    feedImagesSection.innerHTML = `
        <p class="ux-message">Refresh to load latest images</p>
    `
}

// Initialize the app
function init() {
    renderAvatars()
    // Start the image slideshow after a short delay
    setTimeout(handleTimer, 1500)
}

init()