const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=";
const apiKey = "C0JKrfecBv+KRuO4vJLUyA==34vYZWBJlqLJ4U1D";

const getQuote = () => {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Request failure status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const quoteElement = document.getElementById('quote');
        if (quoteElement) {
            quoteElement.textContent = data[0]?.quote || "No quotes available.";
        }
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
}

getQuote();