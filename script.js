//IMAGE FETCH
const signs = [
    { name: "Aries", element: "fire"},
    { name: "Taurus", element: "earth" },
    { name: "Gemini", element: "air" },
    { name: "Cancer", element: "water" },
    { name: "Leo", element: "fire" },
    { name: "Virgo", element: "earth" },
    { name: "Libra", element: "air" },
    { name: "Scorpio", element: "water" },
    { name: "Sagittarius", element: "fire" },
    { name: "Capricorn", element: "earth" },
    { name: "Aquarius", element: "air" },
    { name: "Pisces", element: "water" }
];

const buttons = () => {
    const buttonContainer = document.getElementById("button-Container"); 
    signs.forEach((sign) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.dataset.toggle = 'modal';
        button.dataset.target = '#exampleModalCenter'

        button.dataset.element = sign.element
        
        button.textContent = sign.name.toUpperCase();
        console.log(buttonContainer)
        buttonContainer.append(button);
    });
}


buttons();

const categories = ["","Love", "Happiness", "Beauty", "Art", "Dreams", "Design", "Love", "Life", "Money", "Success", "Future", "Friendship", "Change", "Anger", "Knowledge", "Inspirational"]
const selectLibrary = document.getElementById("quote-selection")
const submitButton = document.getElementById("submit")
const options = () => {
    categories.forEach((category) => {
        let option = document.createElement("option")
        let name = option.setAttribute("name", "category")
        let value = option.setAttribute("value", category.toLowerCase())
        option.textContent = category
        selectLibrary.append(option)
    })
}
options();

let selectValue = ""
document.getElementById("quote-form").addEventListener('submit', (e) => {
  e.preventDefault();
  selectValue = selectLibrary.value
  console.log(selectValue)
  let selection = document.getElementById("selection-p");
  if(selectValue.length === 0){
      selection.textContent = "You have selected random quote."
  }else{
      selection.textContent = `You have selected ${selectValue}.`;
  }
  e.target.reset();
});

const getImage = (keyword) => {
    
    const url1 = `https://api.artic.edu/api/v1/artworks/search?q=${keyword}&fields=id,title,image_id&limit=100`
    fetch(url1)
    .then(response => {
        // console.log(response);
        return response.json()
    })
    .then(data => {
        console.log('here:', data);
        let correctData = data.data.filter(elem => {
            console.log('im id', elem.image_id)
            return elem.image_id
        })
        console.log('hihihihi', correctData)
        let currentImage = correctData[Math.floor(Math.random() * correctData.length - 1)]//this generates a random image, we might have to create four for each dialogue (i have an idea for this)
        console.log('image:', currentImage) //to check if i am fetching correct info
        //creating new image on document
        let imageLink = `https://www.artic.edu/iiif/2/${currentImage.image_id}/full/843,/0/default.jpg`//we have to add the search feature to this link, not sure how?
   
        let img = document.querySelector('.modalImg');
        console.log(img)
        img.setAttribute("src",imageLink)
    })
    .catch(error => {
        console.log('hihihih')
        console.error("Error:", error.message)
    })
}




//QUOTE FETCH

const getQuote = () => {
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${selectValue}` 
    const apiKey = "C0JKrfecBv+KRuO4vJLUyA==34vYZWBJlqLJ4U1D";

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
      console.log(apiUrl)
      console.log(current.category)
      console.log(selectValue)
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


const buttonContainer = document.getElementById("button-Container"); 
buttonContainer.addEventListener("click", (e) => {
    if(!e.target.matches("button")) return;
    console.log(e.target.dataset)
    const keyword = e.target.dataset.element
    getQuote();
    // getImage(e.target.dataSet[""]);
    getImage(keyword);
});