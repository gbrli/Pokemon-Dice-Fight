let getPokemonData = pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then(res => res.json())
    .then(data => {
        let pokeData = {
            name: data.name,
            avatar: data.sprites.front_default,
            health: 100,
            diceCount: 3,
            currentDiceScore: []
        }
        const poke = new Character(pokeData)
        document.getElementById('hero').innerHTML = poke.getCharacterHtml()

        }
    )

export default getPokemonData