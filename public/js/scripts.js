const itemsDiv = document.getElementById('items');
const cartItemsDiv = document.getElementById('cart-items');

async function login(username, password) {
    const userdata = await getUsers();

    if(userdata.find(value => value.username === username) == null){
        alert("User does not exist");
        return
    }

    if(userdata.find(value => value.username === username && value.password === password) == null){
        alert("Password is wrong");
        return
    }

}

function getUsers() {
    return get('/api/users');
}

function get(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        request.addEventListener('load', () => {
            if(request.readyState === 4 && request.status === 200){
                resolve(JSON.parse(request.responseText))
            }
        });
        request.addEventListener('error', () => {
            reject(request.responseText)
        })
    })
}

main().then()

async function main() {
    if(itemsDiv != null){
        const items = await get('/api/items')
        items.forEach(v => {
            addItem(v.name, v.price, v.imgurl)
        })
    }

    if(cartItemsDiv != null){
        console.log(localStorage.getItem('cart'))
        const items = JSON.parse(localStorage.getItem('cart'))
        items.forEach((v, i) => {
            addCartItem(i+1, v.name, v.price, v.quantity)
        })
    }
}

function addCartItem(idx, name, price, quantity) {
    const row = document.createElement('TR');

    const noEntry = document.createElement('TH')
    noEntry.innerText = idx;

    const nameEntry = document.createElement('TD')
    nameEntry.innerText = name;

    const priceEntry = document.createElement('TD')
    priceEntry.innerText = price;

    const quantityEntry = document.createElement('TD')
    quantityEntry.innerText = quantity;

    row.append(noEntry);
    row.append(nameEntry);
    row.append(priceEntry);
    row.append(quantityEntry);

    cartItemsDiv.append(row)
}

function addItem(name, price, imgurl) {
    const colDiv = document.createElement('DIV');
    colDiv.classList = "col mb-5";

    const cardDiv = document.createElement('DIV');
    cardDiv.classList = "card h-100";

    const cardImg = document.createElement('IMG')
    cardImg.classList = "card-img-top item-img";
    cardImg.src = imgurl

    const cardBody = document.createElement('DIV');
    cardBody.classList = "card-body p-4";

    const cardText = document.createElement('DIV')
    cardText.classList = "text-center";

    const itemName = document.createElement('H5')
    itemName.classList = "fw-bolder";
    itemName.innerText = name;

    const itemPrice = document.createElement('SPAN')
    itemPrice.innerText = `${price.toFixed(2)} €`

    const cardFooter = document.createElement('DIV')
    cardFooter.classList = "card-footer p-4 pt-0 border-top-0 bg-transparent";

    const footerText = document.createElement('DIV')
    footerText.classList = "text-center";

    const cartButton = document.createElement('A')
    cartButton.classList = "btn btn-outline-dark mt-auto";
    cartButton.innerText = "Add to cart"




    cardText.append(itemName);
    cardText.append(itemPrice)
    cardBody.append(cardText);
    cardDiv.append(cardImg);
    cardDiv.append(cardBody)
    footerText.append(cartButton);
    cardFooter.append(footerText);
    cardDiv.append(cardFooter);
    colDiv.append(cardDiv);
    itemsDiv.append(colDiv);
}