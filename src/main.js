document.getElementById("submitButton").addEventListener("click", fetchCatFacts);
document.getElementById("submitButtonTwo").addEventListener("click", fetchCatPhotos);
document.getElementById("outcomesArea")

const outcomesArea = document.getElementById("outcomesArea");


async function fetchCatFacts() {
    const factsInput = document.getElementById("catFacts").value;
    const numFacts = parseInt(factsInput);

    if (isNaN(numFacts) || numFacts <= 0 || numFacts > 50) {
        displayError("Enter a valid number!");
        return;
    }

    try {
        const response = await fetch(`https://meowfacts.herokuapp.com/?count=${numFacts}`);
        const data = await response.json();
        
        if (data && data.data) {
            const factsList = `<ol>` + data.data.map(fact => `<li>${fact}</li>`).join("") + `</ol>`;
            outcomesArea.innerHTML = factsList;
        }
    } catch (error) {
        displayError("Error! Try again later.");
    }
}


async function fetchCatPhotos() {
    const photosInput = document.getElementById("catPhotos").value;
    const numPhotos = parseInt(photosInput);

    if (isNaN(numPhotos) || numPhotos <= 0 || numPhotos > 10) {
        displayError("Enter a valid number!");
        return;
    }

    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${numPhotos}`);
        const data = await response.json();
        
        if (data) {
            outcomesArea.innerHTML = data.map(cat => `<img src="${cat.url}" alt="Cat Photo" style="width: 30rem; height: 31.5rem; margin: 1rem;">`).join("");
        }
    } catch (error) {
        displayError("Error! Try again later.");
    }
}


function displayError(message) {
    outcomesArea.innerHTML = `<p  style="color: red;  text-align: center;font-size: 3rem;">${message}</p>`;
}
