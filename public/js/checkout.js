const titleElement = document.getElementById('title');
const priceElement = document.getElementById('price');

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

main().then()

async function main(){
    const response = await rest('GET', '/api/checkout')
    titleElement.innerText = response.name;
    priceElement.innerText = `Total price: ${response.price.toFixed(2)} €`;
}