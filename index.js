const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");
const inputEl = document.getElementById("input");

async function fetchImage() {
    const inputValue = parseInt(inputEl.value, 10);

    // Error handling for invalid number input
    if (isNaN(inputValue) || inputValue < 1 || inputValue > 10) {
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "Number should be between 1 and 10";
        return; 
    }

    errorMessageEl.style.display = "none";  // Hide error message
    btnEl.disabled = true;  // Disable button to prevent multiple clicks
    galleryEl.innerHTML = `<img src="spinner.svg" alt="Loading..." />`;  // Show loading spinner

    try {
        const response = await fetch(
          `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.floor(
            Math.random() * 1000
          )}&client_id=B8S3zB8gCPVCvzpAhCRdfXg_aki8PZM_q5pAyzDUvlc`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch images");
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error("No images found");
        }

        // Populate gallery with images
        galleryEl.innerHTML = data.map((pic) => {
            return `<img src="${pic.urls.small}" alt="Random Image" />`;  
        }).join("");  
    } catch (error) {
        console.error(error);
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "An error occurred, please try again later.";
        galleryEl.innerHTML = "";
    } finally {
        btnEl.disabled = false;  // Re-enable the button
    }
}

btnEl.addEventListener("click", fetchImage);
