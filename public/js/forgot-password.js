const usernameInput = document.getElementById('usernameInput');

async function forgot() {
    const data = {
        username: usernameInput.value
    };

    const response = await rest('POST', '/api/user/forgot-password', data)
    alert(response.message);
}

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