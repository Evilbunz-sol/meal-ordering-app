import {menuArray} from '/data.js';

// Event Listener
document.addEventListener("click", function(e){
    if(e.target.dataset.menu){
        handleAddClick(e.target.dataset.menu)
    } 
    else if (e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
})


let checkoutCart = []

function handleAddClick(menuId){
    const menuItem = menuArray.filter(function(menu){
        return menuId == menu.id
    })[0]
    
    checkoutCart.push(menuItem)
    checkout()

    document.getElementById("order").style.display = "block"
}


function handleRemoveClick(menuId){
    checkoutCart = checkoutCart.filter(function(menu){
        return menu.id != menuId
    })
    
    const removeItem = document.querySelector(`[data-summary-id="${menuId}"]`)
    
    if (removeItem) {
        removeItem.remove()
    }
    
    if (checkoutCart.length === 0) {
        document.getElementById("order").style.display = "none";
    }
}


// Menu Options
function getMenu(){
    let menuList = ""
    
    menuArray.forEach(function(menu){
        menuList += `
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
</section>
        `
    })
    return menuList
}


// Checkout Cart
function checkout(){
    
    let orderSummary = 
`<section id="order">
    <div class="order">
    <h3 class="order-section">Your Order</h3>`

    let total = 0
    
    checkoutCart.forEach(function(menu){
        orderSummary += `
        <div class="order-summary" data-summary-id="${menu.id}"> 
            <h3> ${menu.name} </h3>
            <button class="remove-order-btn" id="remove-order-btn" data-remove="${menu.id}"> Remove </button>
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
    
    
    
// Form
    const paymentForm = document.getElementById('payment-form')
    const paymentFormData = document.getElementById("payment-form-data")
    const orderConfirmation = document.getElementById("order-confirmation")


        const completeOrderBtn = document.getElementById ("complete-order-btn")
        completeOrderBtn.addEventListener("click", function(){
            paymentForm.style.display = "block"
        })

        paymentFormData.addEventListener("submit", function(e){
            e.preventDefault()
            
            const paymentFormInfo = new FormData(paymentFormData)
            const name = paymentFormInfo.get("name")
            
            paymentForm.style.display = "none"
            orderConfirmation.style.display = "block"
            order.style.display = "none"

            orderConfirmation.innerHTML = `
                Thanks, ${name}! Your order is on its way!` 
        })  
}


// Render Menu
function render(){
    document.getElementById("menu").innerHTML = getMenu()
}

render()









