import {menuArray} from '/data.js';

const order = document.getElementById("order")
const paymentForm = document.getElementById('payment-form')
const paymentFormData = document.getElementById("payment-form-data")

// Event Listeners
document.addEventListener("click", e => {
    if (e.target.dataset.menu) handleAddClick(e.target.dataset.menu)
    else if (e.target.dataset.remove) handleRemoveClick(e.target.dataset.remove)
    else if (e.target.id === "complete-order-btn") handlePaymentClick()  
})


let checkoutCart = []

function handleAddClick(menuId) {
    const menuItem = menuArray.filter(menu => menuId === menu.id.toString())[0]
    checkoutCart.push(menuItem)
    checkout()
}

function handleRemoveClick(menuId){
    checkoutCart.splice(menuId, 1)
    checkout()
}

function handlePaymentClick(){
    paymentForm.style.display = "block"
}

//Form
paymentFormData.addEventListener("submit", function(e){
    const orderConfirmation = document.getElementById("order-confirmation")

    e.preventDefault()
    
    const paymentFormInfo = new FormData(paymentFormData)
    const name = paymentFormInfo.get("name")
            
    paymentForm.style.display = "none"
    orderConfirmation.style.display = "block"
    order.style.display = "none"

    orderConfirmation.innerHTML = `Thanks, ${name}! Your order is on its way!`
    })  


// Menu Options
function getMenu(){
    return menuArray.map(menu => {
        const {
            name,
            ingredients,
            price,
            emoji,
            id
        } = menu
        
    return `
<section id="menu">
    <div class="menu">
        <img src="${menu.emoji}" class="food-image">
            <div class="menu-items">
                <h3>${menu.name}</h3>
                <p class="menu-item-description">${menu.ingredients}</p>
                <p class="menu-item-price">$${menu.price}</p>
            </div>
            <button class="add-to-cart-btn" id="add-to-cart-btn" data-menu="${menu.id}">+</button>
    </div>
</section>`      
    }).join("")

    return menuList
}


// Checkout Cart
function checkout(){  
    if (checkoutCart.length){
       let orderSummary = 
            `<section id="order">
            <div class="order">
            <h3 class="order-section">Your Order</h3>`

    let total = 0
    
    checkoutCart.forEach((menu, index) => {
        orderSummary += `
        <div class="order-summary""> 
            <h3> ${menu.name} </h3>
            <button class="remove-order-btn" id="remove-order-btn" data-remove="${index}"> Remove </button>
            <p>  $${menu.price} </p>
        </div>`
        
        total += menu.price
        })
        
        orderSummary +=`    
        <div class="order-total"> 
            <h3> Total Price: </h3>
            <p> $${total} </p>
        </div>
        <button class="complete-order" id="complete-order-btn"> Compelte Order </button>
        </div>
        </section>`

    document.getElementById("order").innerHTML = orderSummary

    } else {
        order.innerHTML = ''
    }
}


// Render Menu
document.getElementById("menu").innerHTML = getMenu()