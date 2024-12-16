// Santa needs your help to figure out if he has enough money to give everyone change!
// Your goal will be to return true if everyone gets their correct change, and false if at least one person does not receive their correct change! Use the function below to get started!

// Good luck and happy coding!!
function correctChangeFromSanta(bills) {
    // Keep track of available bills
    let fives = 0;
    let tens = 0;
    
    // Process each payment
    for (let bill of bills) {
        if (bill === 5) {
            // If they pay with $5, no change needed
            fives++;
        }
        else if (bill === 10) {
            // Need to give $5 change
            if (fives === 0) return false;
            fives--;
            tens++;
        }
        else if (bill === 20) {
            // Need to give $15 change
            // Can give either three $5 bills or one $10 and one $5
            if (tens > 0 && fives > 0) {
                tens--;
                fives--;
            } else if (fives >= 3) {
                fives -= 3;
            } else {
                return false;
            }
        }
    }
    
    return true;
}





// You can leave this code as is, this will simply console.log() different text depending on if the test case returns true or false. Feel free to add additional test cases if you would like!

// Should return true
if (correctChangeFromSanta([5,5,5,10,20])) {
    console.log("Nice job Santa, everyone got their correct change!")
}else {
    console.log("Looks like you have some work to do Santa, and bring some money next time!")
}

// Should return false
if (correctChangeFromSanta([5,5,10,10,20])) {
    console.log("Nice job Santa, everyone got their correct change!")
}else {
    console.log("Looks like you have some work to do Santa, and bring some money next time!")
}