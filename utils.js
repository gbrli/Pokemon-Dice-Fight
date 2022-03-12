function getDiceRollArray(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        Math.floor(Math.random() * 6) + 1
    )
}

const getPercentage = (remainingHealth, maximumHealth) => 
    (100 * remainingHealth) / maximumHealth

function getDicePlaceholderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        `<div class="placeholder-dice"></div>`
    ).join("")
}

function getBestPokemon() {
    return Math.floor((Math.random() * 3) + 1)
}

function getRandomPokemon() {
    return Math.floor((Math.random() * 905) + 1)
}

export { getDiceRollArray, getDicePlaceholderHtml, getPercentage, getBestPokemon, getRandomPokemon }