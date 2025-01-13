const ratingButtons = document.querySelectorAll(".ratingButton");
const submitButton = document.querySelector(".submitButton");
const thankYouMessage = document.querySelector(".thankYouForVote");

let selectedRating = null;

ratingButtons.forEach((button) => {
    button.addEventListener("click", () => {
        ratingButtons.forEach((btn) => btn.classList.remove("selected"));

        button.classList.add("selected");

        selectedRating = button.textContent;
    });
});

submitButton.addEventListener("click", () => {
    if (selectedRating) {
        document.querySelector(".ratingCard").style.display = "none";
        thankYouMessage.style.display = "block";
    } else {
        alert("¡Por favor, selecciona una calificación antes de enviar!");
    }
});
