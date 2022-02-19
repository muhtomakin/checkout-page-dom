let currentData = [
    {
        id:1,
        title: 'Vintage Backbag',
        price: 25.98,
        realPrice: 34.99,
        amount: 1,
        img: './img/vintageBag.png'
    },
    {
        id:2,
        title: 'Levi Shoes',
        price: 45.99,
        realPrice: 54.99,
        amount: 1,
        img: './img/leviShoe.png'
    },
    {
        id:3,
        title: 'Antique Clock',
        price: 74.99,
        realPrice: 94.99,
        amount: 1,
        img: './img/clock.jpg'
    },
];

//let currentData = Data;

let container = document.querySelector('.container');
let subtotal = document.querySelector('.result-subtotal');
let tax = document.querySelector('.result-tax');
let total = document.querySelector('.result-total');

currentData.map((product) => {
    let productContainer = document.createElement('div')
    let image = document.createElement('img')
    let productInfo = document.createElement('div')
    let titleHtwo = document.createElement('h2')
    let prices = document.createElement('p')
    let price = document.createElement('span')
    let realPrice = document.createElement('span')
    let amountContainer = document.createElement('div')
    let minusBtn = document.createElement('button')
    let amountShow = document.createElement('span')
    let plusBtn = document.createElement('button')
    let removeBtn = document.createElement('button')
    let totalPrice = document.createElement('p')
    let totalPriceShow = document.createElement('span')

    productContainer.className = 'product-container';
    productContainer.id = product.id
    image.src = product.img;
    productInfo.className = 'product-info';
    titleHtwo.innerText = product.title;
    price.innerText = '$' + product.price + ' ';
    price.className = 'current-price'
    realPrice.innerText = '$' + product.realPrice;
    amountContainer.className = 'amount-container';
    minusBtn.className = 'minus';
    minusBtn.innerText = '-';
    minusBtn.id = product.id;
    amountShow.className = 'amount';
    amountShow.id = product.id;
    amountShow.innerText = product.amount;
    plusBtn.className = 'plus';
    plusBtn.innerText = '+';
    plusBtn.id = product.id;
    removeBtn.className = 'remove';
    removeBtn.innerText = 'Remove';
    removeBtn.id = product.id;
    totalPrice.innerText = 'Product Total: $';
    totalPriceShow.className = 'total-price';
    totalPriceShow.innerText = (product.price * product.amount);

    container.appendChild(productContainer);
    productContainer.appendChild(image);
    productContainer.appendChild(productInfo);
    productInfo.appendChild(titleHtwo);
    productInfo.appendChild(prices);
    productInfo.appendChild(amountContainer);
    productInfo.appendChild(removeBtn);
    productInfo.appendChild(totalPrice);
    prices.appendChild(price);
    prices.appendChild(realPrice);
    amountContainer.appendChild(minusBtn);
    amountContainer.appendChild(amountShow);
    amountContainer.appendChild(plusBtn);
    totalPrice.appendChild(totalPriceShow);

    removeBtn.addEventListener('click', () => {
        let newAmountId = document.getElementById(`${product.id}`);
        let newAmount = newAmountId.querySelector('.amount')
        //removeItem(productContainer)
        currentData = removeItem(product.id, productContainer);
        console.log(currentData)
    })

    plusBtn.addEventListener('click', () => {
        let newAmountId = document.getElementById(`${product.id}`);
        let newAmount = newAmountId.querySelector('.amount')
        currentData = increaseAmount(product.id);
        console.log(currentData)
        let currentAmount = currentData.filter(x => x.id === product.id)
        console.log(currentData)
        newAmount.innerText = currentAmount.map(x => x.amount);
        totalPriceShow.innerText = newAmount.innerText * product.price;
        checkout(container, newAmountId);
    })

    minusBtn.addEventListener('click', () => {
        let newAmountId = document.getElementById(`${product.id}`);
        let newAmount = newAmountId.querySelector('.amount')
        currentData = decreaseAmount(product.id);
        let currentAmount = currentData.filter(x => x.id === product.id)
        newAmount.innerText = currentAmount.map(x => x.amount);
        totalPriceShow.innerText = newAmount.innerText * product.price;
        checkout(container, newAmountId);
    })

    subtotal.innerText = (currentData.map(item => item.price*item.amount)).reduce(getSum, 0)
    tax.innerText = subtotal.innerText*18 / 100;
    total.innerText = parseFloat(subtotal.innerText) + parseFloat(tax.innerText);

    console.log(productContainer)
})

function removeItem(num, item) {
    console.log('remove')
    let x = item.parentNode;
    x.removeChild(item)
    let newItems = currentData.filter((x) => x.id !== num)
    return newItems
}

function increaseAmount(num) {
    //console.log(typeof num)
    let newItems = currentData.map((item) => {
        if (num === item.id) {
            return {...item, amount: item.amount+1}
        }
        return item
    })
    return newItems;
}

function decreaseAmount(num) {
    //console.log('decrease')
    let newItems = currentData.map((item) => {
        if (num === item.id) {
            return {...item, amount: item.amount-1}
        }
        return item
    }).filter((x) => x.id !== 0)
    /*if (newItems.filter(x => x.amount <= 0)) {
        return removeItem(num, newItems)
    }*/
    return newItems;
    
}

function checkout(container, newAmountId) {
    subtotal.innerText = (currentData.map(item => item.price*item.amount)).reduce(getSum, 0)
    tax.innerText = subtotal.innerText*18 / 100;
    total.innerText = parseFloat(subtotal.innerText) + parseFloat(tax.innerText);
}

function getSum(total, num) {
    return total + Math.round(num)
}
