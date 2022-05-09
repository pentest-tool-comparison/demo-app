const itemsDiv = document.getElementById('items');
const cartItemsDiv = document.getElementById('cart-items');
const searchInput = document.getElementById('searchInput');
const searchTextHeader = document.getElementById('searchTextHeader');
const searchTextElement = document.getElementById('searchText');

function rest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(body));
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
        const urlParams = new URLSearchParams(window.location.search);
        const searchText = urlParams.get('search');

        searchInput.value = searchText;
        searchTextElement.innerHTML = searchText;
        searchTextHeader.style.display = searchText == null || searchText.length === 0 ? 'none' : 'block';

        const searchData = {
            search: searchText
        }


        const items = searchText == null || searchText.length === 0 ? await rest('GET', '/api/items') : await rest('POST', '/api/items/search', searchData);

        items.forEach(item => {
            addItem(item.name, item.price, item.imgurl, item.item_id)
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

async function buy(name, price) {
    const data = {
        name: name,
        price: price
    }
    const response = await rest('POST', '/api/checkout', data);
    window.location.href = response.redirect;
}

function addItem(name, price, imgurl, id) {
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
    cartButton.innerText = "Show Details";
    cartButton.onclick = () => window.location.href = `details.html?id=${id}`;

    const buyButton = document.createElement('A')
    buyButton.classList = "btn btn-primary mt-auto";
    buyButton.innerText = "Buy";
    buyButton.onclick = () => buy(name, price);




    cardText.append(itemName);
    cardText.append(itemPrice)
    cardBody.append(cardText);
    cardDiv.append(cardImg);
    cardDiv.append(cardBody)
    footerText.append(buyButton);
    footerText.append(" ")
    footerText.append(cartButton);
    cardFooter.append(footerText);
    cardDiv.append(cardFooter);
    colDiv.append(cardDiv);
    itemsDiv.append(colDiv);
}