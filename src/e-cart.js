document.addEventListener('DOMContentLoaded', ()=>{
    const products = [
        {
            id: 1,
            name: "Product 1",
            price: 19.99,
        },
        {
            id: 2,
            name: "Product 2",
            price: 29.99,
        },
        {
            id: 3,
            name: "Product 3",
            price: 45.99,
        },
        {
            id: 4,
            name: "Product 4",
            price: 50.99,
        }
    ]
    
    let cart= localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [];
    let total = 0;
    
    
    const productList = document.getElementById('productList')
    const shoppingCartEmpty = document.getElementById('shoppingCartEmpty')
    const cartItems = document.getElementById('cartItems');
    const totalValue = document.getElementById('totalValue');
    const checkOut = document.getElementById('checkout')
    const checkOutBtn = document.getElementById('checkOutBtn');
    
    renderCart();

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <div><h2>${product.name}</h2></div>
        <div><h4>$${product.price.toFixed(2)}</h4></div>
        <button data-id = "${product.id}" class="add">Add To Cart</button>
        `
        productList.appendChild(productDiv)
    })
    
    function saveCart(){
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    productList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const productId = parseInt(e.target.getAttribute('data-id'))
            const product = products.find(p => p.id === productId)
            addToCart(product)
        }
    })

    function addToCart(product){
        cart.push(product);
        renderCart();
        saveCart();
    }

    function calculateTotal(){
        return cart.reduce((acc, itemValue)=>{
            console.log(acc)
            return acc + itemValue.price;
        },0)
    }

    function updateTotal(){
        total = calculateTotal();
        totalValue.classList.remove('hideIt')
        totalValue.innerHTML = `Total Value : $${total.toFixed(2)}`
    }

    function renderCart(){
        cartItems.classList.remove('hideIt')
        cartItems.innerHTML = ''
        cart.forEach(item => {
            const li = document.createElement('li')
            li.innerHTML = `<span>${item.name} : $${item.price}</span><button class="delete" data-id="${item.id}">delete</button>`
            li.classList.add('addedItem')
            cartItems.appendChild(li);
        })
        updateTotal();
        saveCart();
    }

    cartItems.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const pId = parseInt(e.target.getAttribute('data-id'))
            cart = cart.filter(product => {
                return product.id !== pId;
            })
            renderCart();
            saveCart();
        }
    })
})