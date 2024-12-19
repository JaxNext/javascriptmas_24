import shoppingList from "./shoppingList.js";

function sortProducts(list){
    return list.toSorted((a, b) => a.price - b.price);
}

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    products.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <div class="product-emoji">${item.product}</div>
            <div>$${item.price.toFixed(2)}</div>
        `;
        productList.appendChild(productDiv);
    });
}

// Initial display
displayProducts(shoppingList);

// Sort button functionality
document.getElementById('sortBtn').addEventListener('click', () => {
    const sortedList = sortProducts(shoppingList);
    displayProducts(sortedList);
});

// Console logging for verification
const listByCheapest = sortProducts(shoppingList);
console.log('Sorted list:');
listByCheapest.forEach(item => {
    console.log(`${item.product}: $${item.price}`);
});