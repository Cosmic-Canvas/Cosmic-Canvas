//DOM CALLS:
let dialogs = document."dialog")
console.log(dialogs)
let image = document.createElement('img')
//IMAGE FETCH

const getImage = () => {
    const url1 = `https://api.artic.edu/api/v1/artworks/`
    fetch(url1)
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(data => {
        console.log(data);
        let currentImage = data.data[Math.floor(Math.random() * 10)]//this generates a random image, we might have to create four for each dialogue (i have an idea for this)
        console.log(currentImage) //to check if i am fetching correct info
        //creating new image on document
        let imageLink = `https://www.artic.edu/iiif/2/${currentImage.image_id}/full/843,/0/default.jpg`//we have to add the search feature to this link, not sure how?
        image.setAttribute("src", imageLink)
        dialogs.append(image)
    })
    .catch(error => {
        console.error("Error:", error.message)
    })
}
getImage()



//QUOTE FETCH
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
      let current = data[0];
      let quote = current.quote;
      let author = current.author;
      console.log(author, quote)
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

//dialogue click trigger

const dialogOpener = (dialogID) => {
    let currentDialog = document.getElementById(dialogID)
    currentDialog.open()
    console.log("green")
}

const ariesButton = document.getElementById("Aries button")
ariesButton.addEventListener("click", dialogOpener("ariesSelection"))