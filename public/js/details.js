const commentsDiv = document.getElementById('comments');
const titleElement = document.getElementById('title');
const priceElement = document.getElementById('price');
const imgElement = document.getElementById('img');

const insertCommentTitle = document.getElementById('titleInput');
const insertCommentBody = document.getElementById('bodyInput');

let details;

function rest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(body));
        request.addEventListener('load', () => {
            if(request.readyState === 4 && request.status === 200){
                resolve(JSON.parse(request.responseText))
            }else{
                window.location.replace('index.html')
            }
        });
        request.addEventListener('error', () => {
            reject(request.responseText)
        })
    })
}

async function buy() {
    const data = {
        name: details.name,
        price: details.price
    }
    const response = await rest('POST', '/api/checkout', data);
    window.location.href = response.redirect;
}

main().then()

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    if(itemId == null){
        window.location.href = 'index.html'
    }

    details = await rest('GET', `/api/item/${itemId}`)
    const comments = await rest('GET', `/api/item/${itemId}/comments`)

    titleElement.innerText = details.name;
    priceElement.innerText = `${details.price.toFixed(2)} €`
    imgElement.src = details.imgurl;

    for (const comment of comments) {
        addComment(comment.title, comment.body)
    }

}

function addComment(title, body) {
    const colDiv = document.createElement('DIV');

    const cardDiv = document.createElement('DIV');
    cardDiv.classList = "card";

    const cardBody = document.createElement('DIV');
    cardBody.classList = "card-body";

    const cardText = document.createElement('DIV')
    cardText.classList = "text-center";

    const itemName = document.createElement('H5')
    itemName.classList = "fw-bolder";
    itemName.innerHTML = title;

    const itemPrice = document.createElement('SPAN')
    itemPrice.innerHTML = body;

    const cardFooter = document.createElement('DIV')
    cardFooter.classList = "card-footer p-4 pt-0 border-top-0 bg-transparent";

    const footerText = document.createElement('DIV')
    footerText.classList = "text-center";




    cardText.append(itemName);
    cardText.append(itemPrice)
    cardBody.append(cardText);
    cardDiv.append(cardBody)
    cardFooter.append(footerText);
    cardDiv.append(cardFooter);
    colDiv.append(cardDiv);
    commentsDiv.append(colDiv);
}

async function submitComment() {
    const urlParams = new URLSearchParams(window.location.search);

    const data = {
        title: insertCommentTitle.value,
        body: insertCommentBody.value
    }

    const res = await rest('POST', `/api/item/${urlParams.get('id')}/comment`, data);
    window.location.reload();


}