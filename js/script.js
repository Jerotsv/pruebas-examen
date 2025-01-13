const ratingButtons = document.querySelectorAll(".ratingButton");
const submitButton = document.querySelector(".submitButton");
const thankYouMessage = document.querySelector(".thankyouForVote");
const selectedRatingText = document.querySelector(".selectedRatingText");

let selectedRating = null;

ratingButtons.forEach((button) => {
    button.addEventListener("click", () => {
        ratingButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedRating = button.textContent;
        submitButton.disabled = false;
    });
});

submitButton.addEventListener("click", () => {
    if (selectedRating) {
        document.querySelector(".ratingCard").style.display = "none";
        selectedRatingText.textContent = `Seleccionaste ${selectedRating} de 5`;
        thankYouMessage.style.display = "block";
    } else {
        alert("¡Por favor, selecciona una calificación antes de enviar!");
    }
});
