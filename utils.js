function getDiceRollArray(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        Math.floor(Math.random() * 6) + 1
    )
}

const getPercentage = (remainingHealth, maximumHealth) => 
    (100 * remainingHealth) / maximumHealth

function getDicePlaceholderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        `<div class="placeholder-dice">  <i id="dice" class="fas fa-solid fa-dice-five"></i></div>`
    ).join("")
}

function getRandomPokemon() {
    return Math.floor((Math.random() * 898) + 1)
}

export { getDiceRollArray, getDicePlaceholderHtml, getPercentage, getRandomPokemon }