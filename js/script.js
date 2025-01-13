const ratingButtons = document.querySelectorAll('.rating-button');
const submitButton = document.querySelector('.submit-button');

let selectedRating = null;

ratingButtons.forEach((button) => {
    button.addEventListener('click', () => {
        ratingButtons.forEach((btn) => btn.classList.remove('selected'));

        button.classList.add('selected');

        selectedRating = button.textContent;
    });
});

submitButton.addEventListener('click', () => {
    if (selectedRating) {
        alert(`Thank you for your feedback! You rated us ${selectedRating}/5.`);
    } else {
        alert('Please select a rating before submitting!');
    }
});
