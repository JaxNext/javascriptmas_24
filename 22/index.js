import { addresses } from './addresses.js'

// Array of festive icon filenames
const icons = ['bell.png', 'candy-cane.png', 'christmas-tree.png', 'gift.png', 'holly.png', 'reindeer.png', 'santa.png', 'star.png']

function getRandomIcon(usedIcon = '') {
    let icon;
    do {
        icon = icons[Math.floor(Math.random() * icons.length)];
    } while (icon === usedIcon);
    return icon;
}

function createLabel(person) {
    const icon1 = getRandomIcon();
    const icon2 = getRandomIcon(icon1);
    
    return `
        <div class="label">
            <div class="label-icons">
                <img src="./icons/${icon1}" alt="Festive icon" class="festive-icon">
                <img src="./icons/${icon2}" alt="Festive icon" class="festive-icon">
            </div>
            <div class="label-content">
                <h2>${person.name}</h2>
                <p>${person["address line 1"]}</p>
                <p>${person.town}</p>
                <p>${person.state}</p>
                <p>${person.country}</p>
            </div>
        </div>
    `;
}

const labelsContainer = document.querySelector('.labels-container')

// Filter and render only people on Christmas list
const christmasLabels = addresses
    .filter(person => person.isOnChristmasList)
    .map(person => createLabel(person))
    .join('');

labelsContainer.innerHTML = christmasLabels;