const calendarContainer = document.getElementById('calendar');
const christmasEmojis = ['🎁', '🎄', '⛄', '🦌', '🎅', '🤶', '🔔', '🎉', '❄️', '⭐'];

const initialDateList = []
const today = new Date().getDate();
console.log('today', today);
for (let i = 1; i <= 24; i++) {
  const obj = {
    index: i,
    gift: '',
    canOpen: i <= today,
    isOpen: false
  }
  initialDateList.push(obj)
}

const storeKey = 'js-mas-2024-calendar';
let storedDateList = JSON.parse(localStorage.getItem(storeKey))
if (!storedDateList?.length) {
  storedDateList = initialDateList;
  localStorage.setItem(storeKey, JSON.stringify(storedDateList))
}

console.log('storedDateList', storedDateList);


for (let i = 0; i < storedDateList.length; i++) {
  const date = storedDateList[i];
  let box = document.createElement('li')
  box.classList.add('calendar-box')
  box.dataset.index = date.index;
  if (date.canOpen) {
    box.classList.add('can-open');
  }
  let number = document.createElement('p');
  number.classList.add('num')
  number.innerHTML = date.index;
  if (date.isOpen) {
    number.innerHTML = date.gift;
  }
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-gift');
  let description = document.createElement('p');
  description.classList.add('text')
  description.innerHTML = 'Open me!';
  const infoElement = document.createElement('div')
  infoElement.classList.add('info-row')
  infoElement.appendChild(icon);
  infoElement.appendChild(description);
  
  box.appendChild(number);
  box.appendChild(infoElement);
  
  // Add click handler
  box.addEventListener('click', e => {
    if (!box.classList.contains('flipped') && date.canOpen && !date.isOpen) {
      infoElement.style.display = 'none';
      box.classList.add('flipped');
      // Get random emoji
      const randomEmoji = christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)];
      // Replace content after flip animation
      setTimeout(() => {
        number.innerHTML = randomEmoji;
        const d = date.index;
        storedDateList[d - 1].isOpen = true;
        storedDateList[d - 1].gift = randomEmoji;
        localStorage.setItem(storeKey, JSON.stringify(storedDateList))
      }, 250); // Half of animation duration
    }
  });
  
  calendarContainer.appendChild(box);
}
