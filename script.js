//IMAGE FETCH

const getImage = () => {
    
    const url1 = `https://api.artic.edu/api/v1/artworks/search?q=stars&fields=id,title,image_id&limit=100`
    fetch(url1)
    .then(response => {
        // console.log(response);
        return response.json()
    })
    .then(data => {
        console.log('here:', data);
        let correctData = data.data.filter(elem => {
            return elem.image_id
        })
        let currentImage = correctData[Math.floor(Math.random() * correctData.length - 1)]//this generates a random image, we might have to create four for each dialogue (i have an idea for this)
        console.log('image:', currentImage) //to check if i am fetching correct info
        //creating new image on document
        let imageLink = `https://www.artic.edu/iiif/2/${currentImage.image_id}/full/843,/0/default.jpg`//we have to add the search feature to this link, not sure how?
   
        let img = document.querySelector('.modalImg');
        console.log(img)
        img.setAttribute("src",imageLink)
    })
    .catch(error => {
        console.error("Error:", error.message)
    })
}
getImage()




//QUOTE FETCH
const apiUrl = "https://api.api-ninjas.com/v1/quotes?category="
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
      let current = data[0];
      let quote = current.quote;
      console.log(quote);
      let author = current.author
      console.log(author)
      let quoteTag = document.querySelector(`.modalP`);
      let authorTag= document.querySelector(`.modalH4`);
      quoteTag.textContent = quote;
      authorTag.textContent = author;
  })
  .catch(error => {
      console.error("Error:", error.message);
  });
}

getQuote();

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Scorpio", "Sagittarius","Capricorn", "Aquarius", "Pisces"];
const buttons = () => {
    const buttonContainer = document.getElementById("button-Container"); 
    signs.forEach((sign) => {
        let button = document.createElement("button");
        button.textContent = sign.toUpperCase();
        console.log(buttonContainer)
        buttonContainer.append(button);
    });
}

buttons();
const buttonContainer = document.getElementById("button-Container"); 
buttonContainer.addEventListener("click", (e) => {
    if(!e.target.matches("button")) return;
    getQuote();
    getImage();
})
