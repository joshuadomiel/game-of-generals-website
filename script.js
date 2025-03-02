let selectedPiece = null;
let currentSide = null;

// Show confirmation pop-up when a piece is selected
document.querySelectorAll('.piece-selector').forEach(select => {
    select.addEventListener('change', function () {
        const pieceName = this.options[this.selectedIndex].text;
        selectedPiece = this.value;
        currentSide = this.id;

        // Show the selected piece in the pop-up
        document.getElementById('selected-piece').textContent = pieceName;
        document.getElementById('confirmation-popup').style.display = 'flex';
    });
});

// Handle confirmation pop-up buttons
document.getElementById('confirm-yes').addEventListener('click', function () {
    // Hide the dropdown and show the placeholder
    document.getElementById(currentSide).style.display = 'none';
    const placeholder = document.getElementById(`${currentSide}-placeholder`);
    placeholder.textContent = 'Piece Selected';
    placeholder.classList.add('selected'); // Add class to change color to green

    // Hide the pop-up
    document.getElementById('confirmation-popup').style.display = 'none';
});

document.getElementById('confirm-no').addEventListener('click', function () {
    // Reset the dropdown and hide the pop-up
    document.getElementById(currentSide).selectedIndex = 0;
    document.getElementById('confirmation-popup').style.display = 'none';
});

// Arbitration logic
document.getElementById('arbitrate').addEventListener('click', function () {
    const whiteValue = parseInt(document.getElementById('white').value);
    const blackValue = parseInt(document.getElementById('black').value);

    // Determine the winner
    let winner = '';
    if (whiteValue === blackValue) {
        winner = 'draw';
    } else if (whiteValue === 12 && blackValue === -1) { // Spy (👀) can only be beaten by Private (Λ)
        winner = 'black';
    } else if (blackValue === 12 && whiteValue === -1) { // Spy (👀) can only be beaten by Private (Λ)
        winner = 'white';
    } else if (whiteValue > blackValue) {
        winner = 'white';
    } else {
        winner = 'black';
    }

    // Show the winning overlay
    const overlay = document.getElementById('winner-overlay');
    overlay.classList.add('visible');

    if (winner === 'white') {
        overlay.classList.add('white-wins');
        document.getElementById('winner-text').textContent = 'White Wins!';
    } else if (winner === 'black') {
        overlay.classList.add('black-wins');
        document.getElementById('winner-text').textContent = 'Black Wins!';
    } else {
        overlay.classList.add('draw');
        document.getElementById('winner-text').textContent = 'Draw!';
    }
});

// Refresh button logic
document.getElementById('refresh-button').addEventListener('click', function () {
    location.reload(); // Reload the page
});