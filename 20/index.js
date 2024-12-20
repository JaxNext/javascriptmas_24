const elfFirstNames = [
  "Aurora", "Blitzen", "Crispin", "Dazzle", "Evergreen", "Frost", "Glimmer",
  "Holly", "Icicle", "Joyful", "Kringle", "Luna", "Merry", "Nutmeg",
  "Olwen", "Pine", "Quill", "Razzle", "Sparkle", "Tinsel", "Umbra",
  "Vixen", "Whisk", "Xylo", "Yule", "Zippy"
];

const elfLastNames = [
  "Applecheeks", "Bells", "Candycane", "Dazzlebright", "Everbright", "Frostwhisk",
  "Gingersnap", "Hollyberry", "Icestorm", "Jovial", "Kindleflame", "Lightwhisper",
  "Merrysprout", "Nutcracker", "Oakenleaf", "Peppermint", "Quicksilver", "Raindrop",
  "Snowdust", "Twinkletoes", "Underwood", "Velvet", "Winterberry", "Xylospark",
  "Yuletide", "Zestwind"
];

// Store generated names
const generatedNames = [];

// Get DOM elements
const form = document.getElementById('form');
const generateBtn = document.getElementById('generate-btn');
const elfNameDisplay = document.getElementById('elf-name-display');
const elfNamesList = document.getElementById('elf-names-list');

function generateElfName(firstName, lastName) {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    
    const matchingFirstNames = elfFirstNames.filter(name => 
        name.charAt(0) === firstInitial
    );
    const matchingLastNames = elfLastNames.filter(name => 
        name.charAt(0) === lastInitial
    );
    
    if (matchingFirstNames.length === 0 || matchingLastNames.length === 0) {
        return null;
    }
    
    const randomFirst = matchingFirstNames[Math.floor(Math.random() * matchingFirstNames.length)];
    const randomLast = matchingLastNames[Math.floor(Math.random() * matchingLastNames.length)];
    
    return `${randomFirst} ${randomLast}`;
}

function renderElfNames() {
    if (generatedNames.length === 0) {
        elfNamesList.innerHTML = '<li>Seems empty...</li>';
        return;
    }
    
    elfNamesList.innerHTML = generatedNames
        .map(name => `<li>${name}</li>`)
        .join('');
}

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const firstNameInput = form.querySelector('[name="first-name"]');
    const lastNameInput = form.querySelector('[name="last-name"]');
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    
    if (!firstName || !lastName) {
        alert('Please enter both first and last names!');
        return;
    }
    
    const elfName = generateElfName(firstName, lastName);
    
    if (!elfName) {
        alert('Sorry, no matching elf names found for these initials!');
        return;
    }
    
    elfNameDisplay.textContent = elfName;
    generatedNames.push(elfName);
    renderElfNames();
    
    // Clear the form
    firstNameInput.value = '';
    lastNameInput.value = '';
});
