import { toysRequested } from './data.js'

/*
The run up to Christmas is quite a data-intensive time for Santa. In order to understand market trends, Santa's Data Elves have collated sample children’s wish list data from 4 locations and now need to know which was the most popular toy requested overall. This will help with procurement for next year. 

**Task**
- Your task is to find the most requested toy from the array of objects “toysRequested”. But remember: some toys appear in more than one location!

Expected output: "The most popular toy is 🎲 board games with 9000 requests.""

**Stretch Goal**
- Complete this challenge using the .flatMap() method to work with the various "toys" arrays.

*/ 

// Create an array of all toy entries using flatMap
const allToys = toysRequested.flatMap(location => location.toys);

// Create an object to store the total counts
const toyTotals = allToys.reduce((acc, toy) => {
    const [name, count] = Object.entries(toy)[0];
    acc[name] = (acc[name] || 0) + count;
    return acc;
}, {});

// Find the toy with the highest count
const [mostPopularToy, highestCount] = Object.entries(toyTotals)
    .reduce((highest, [toy, count]) => 
        count > highest[1] ? [toy, count] : highest, 
        ['', 0]
    );

console.log(`The most popular toy is ${mostPopularToy} with ${highestCount} requests.`);