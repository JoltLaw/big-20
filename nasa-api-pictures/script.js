const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader")

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;


let resultsArray = [];
let favorites = {};

function showContent(page) {
    window.scrollTo({top: 0, behavior: "instant"});
    if (page === "results") {
        resultsNav.classList.remove("hidden");
        favoritesNav.classList.add("hidden");
    } else {
        resultsNav.classList.add("hidden");
        favoritesNav.classList.remove("hidden");
    }
    loader.classList.add("hidden");
}

function createDOMNodes (page) {
    
    const currentArray = page  === "results" ? resultsArray : Object.values(favorites);
    currentArray.forEach((result) => {
        
        // card container
        const card = document.createElement("div");
        card.classList.add("card");
        // link
        const link = document.createElement("a");
        link.href = result.hdurl;
        link.title = "View Full Image";
        link.target = "_blank";
        // Image
        const image = document.createElement("img");
        image.src = result.url;
        image.alt = "Nasa Picture of the day";
        image.loading = "lazy";
        image.classList.add("card-image-top");
        //  card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        // card title
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = result.title;
        // save text
        const saveText = document.createElement("p");
        saveText.classList.add("clickable");
        if (page === "results"){
    
        saveText.textContent = "Add To Favorites";
        saveText.setAttribute("onclick", `saveFavorite("${result.url}")`);}
        else {
            saveText.textContent = "Remove Favorite";
            saveText.setAttribute("onclick", `removeFavorite("${result.url}")`);}
        
        // card text
        const cardText = document.createElement("p");
        cardText.textContent = result.explanation;
        // Footer container
        const footer = document.createElement("small");
        footer.classList.add("text-muted");
        // date
        const date = document.createElement("strong");
        date.textContent = result.date;
        // Copyright
        const copyrightResult = result.copyright === undefined ? "" : result.copyright;
        const copyright = document.createElement("span");
        copyright.textContent = ` ${copyrightResult}`;
        // Append
        
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.append(card);

    });
}

function updateDOM(page) {
    // get favorites from local storage
    if (localStorage.getItem("NASAFavorites")) {
        favorites = JSON.parse(localStorage.getItem("NASAFavorites"));
    }
    imagesContainer.textContent = "";
    createDOMNodes(page);
    showContent(page);
}

// get ten images from NASA api
async function getNasaPictures() {
    // show loader
    loader.classList.remove("hidden");
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM("results");
    } catch (error) {
        // catch error here
    }
}

// Add result to favorites
function saveFavorite(itemUrl) {
// loop through results array to select Favorites
resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
        favorites[itemUrl] = item;
        // show save confirmation for two seconds
        saveConfirmed.hidden = false;
        setTimeout(() => {
            saveConfirmed.hidden = true;
        }, 2000);
        // set favorites in local storage
        localStorage.setItem("NASAFavorites", JSON.stringify(favorites));
    }
})
}

function removeFavorite(itemUrl) {
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        localStorage.setItem("NASAFavorites", JSON.stringify(favorites));
        updateDOM("favorites")
    }
}

// on load 
getNasaPictures();