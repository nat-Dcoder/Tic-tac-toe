const App = () => {
    // Initialize game state
    const state = {
        currentPlayer: 1,
        moves: []
    };
    const getGameStatus = (moves) => {
        const pl1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId);
        const pl2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId);
        // Check for a winner or tie (implement this logic)
        const winningPattern = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9]
        ];
        let winner = null;
        winningPattern.forEach(pattern => {
            const p1wins = pattern.every(val => pl1Moves.includes(val));
            const p2wins = pattern.every(val => pl2Moves.includes(val)); 

            if (p1wins) winner = 1;
            if (p2wins) winner = 2;
        })
        return {
            status: moves.length === 9 || winner != null ? 'complete' : 'In-progress',
            winner
        }
    }
    // DOM elements
    const menuBtn = $('.menuBtn');
    const menuItems = $('.items');
    const squares = document.querySelectorAll('[data-id="square"]');

    // Function to get the next player
    const getNextPlayer = (playerId) => (playerId === 1 ? 2 : 1);

    // Initialize game
    const init = () => {
        // Toggle menu on button click
        menuBtn.on('click', (e) => {
            e.preventDefault();
            menuItems.slideToggle();
        });

        // Handle new game button click (add your logic here)

        // Handle reset button click (add your logic here)

        // Handle square clicks
        squares.forEach((square) => {
            square.addEventListener('click', () => {
                // Check if a play has already been made in this square
                if (square.hasChildNodes()) return;
                
                // Determine the current player
                const lastMove = state.moves.at(-1);
                const currentPlayer = state.moves.length === 0 ? 1 : getNextPlayer(lastMove.playerId);
                if (currentPlayer === 1) {
                    $('#indicator').text('Player 2, Your turn!');
                    $('#player').addClass('fa fa-circle-o')
                } else {
                    $('#indicator').text('Player 1, Your turn!');
                    $('#player').removeClass('fa fa-circle-o')
                    $('#player').addClass('fa fa-times')
                }
                // Create player icon
                const playerIcon = document.createElement('i');
                playerIcon.classList.add('fa', currentPlayer === 1 ? 'fa-times' : 'fa-circle-o');

                // Update state with the move
                state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                });

                console.log(state);

                // Change the current player
                state.currentPlayer = getNextPlayer(currentPlayer);

                // Append the player icon to the square
                square.appendChild(playerIcon);

                const game = getGameStatus(state.moves);
                if (game.status === 'complete') {
                    $('#modal').toggleClass('hidden')
                    if (game.winner) {
                        $('#modal-contents').text(`Player ${game.winner} wins!`)
                    } else {
                        alert('Tie')
                    }
                }
            });
        });
    };

    return { init };
};

$(() => {
    App().init(); // Initialize the App
});
