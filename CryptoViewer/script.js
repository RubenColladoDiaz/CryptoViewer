const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10';

function fetchCryptoData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            processCryptoData(data);
        } else {
            console.error('Error con la API:', xhr.statusText);
        }
    };
    xhr.send();
}

function processCryptoData(data) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    data.forEach(crypto => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${crypto.name} ${crypto.symbol}</td>
        <td>$${crypto.current_price}</td>
        <td>${crypto.price_change_percentage_24h}%</td>
        <td>${crypto.market_cap}</td><br>
        <hr style="border: 1px solid #0a0b0c" />
      `;
        tableBody.appendChild(row);
    });
}

setInterval(fetchCryptoData, 10000); // Para que se recarguen los datos automaticamente