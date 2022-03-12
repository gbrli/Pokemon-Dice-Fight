import Character from './Character.js'
import { getRandomPokemon } from './utils.js'

const placeholder = {
    name: "Jumpluff",
    avatar: "https://img.pokemondb.net/artwork/vector/large/jumpluff.png",
    health: 100,
    diceCount: 3,
    currentDiceScore: []
}

const baby = new Character(placeholder)

let monstersArray = [baby, baby, baby, baby, baby]
let playerTeam = []
let enemyTeam = []
let isWaiting = false

let getPokemonData = fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemon()}/`)
    .then(res => res.json())
    .then(data => {
        let pokeData = {
            name: data.name,
            avatar: data.sprites.front_default,
            health: 100,
            diceCount: 3,
            currentDiceScore: []
        }
        // while team is less than 6
        // fetch again from api and add to array

        const teamPokemon = new Character(pokeData)
        playerTeam < 6 && playerTeam.push(teamPokemon)
        document.getElementById('playerTeam').innerHTML = teamPokemon.getCharacterHtml()
        return fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemon()}/`)
        }
    )
    .then(res => res.json())
    getPokemonData.then(data => {
        let pokeData = {
            name: data.name,
            avatar: data.sprites.front_default,
            health: 100,
            diceCount: 3,
            currentDiceScore: []
        }
        const enemyPokemon = new Character(pokeData)
        enemyTeam.length < 6 && enemyTeam.push(enemyPokemon)
        document.getElementById('enemyTeam').innerHTML = enemyPokemon.getCharacterHtml()

        return fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemon()}/`)
        }
    )
    .then(res => res.json())
    getPokemonData.then(() => {
    function attack() {
        if(!isWaiting){
            playerTeam[0].setDiceHtml()
            enemyTeam[0].setDiceHtml()
            playerTeam[0].takeDamage(enemyTeam[0].currentDiceScore)
            enemyTeam[0].takeDamage(playerTeam[0].currentDiceScore)
            document.getElementById('playerTeam').innerHTML = playerTeam[0].getCharacterHtml()
            document.getElementById('enemyTeam').innerHTML = enemyTeam[0].getCharacterHtml() 
            if(playerTeam[0].dead){
                endGame()
            }
            else if(enemyTeam[0].dead){
                isWaiting = true
                if(monstersArray.length > 0){
                    setTimeout(()=>{
                        enemyTeam[0] = getNewMonster()
                        render()
                        isWaiting = false
                    },1500)
                }
                else{
                    endGame()
                }
            }    
        }
    }

    function endGame() {
        isWaiting = true
        const endMessage = playerTeam[0].health === 0 && enemyTeam[0].health === 0 ?
            "No victors - all creatures are dead" :
            playerTeam[0].health > 0 ? "The teamPokemon Wins" :
                "The monsters are Victorious"

        const endEmoji = playerTeam[0].health > 0 ? "🔮" : "☠️"
            setTimeout(()=>{
                document.body.innerHTML = `
                    <div class="end-game">
                        <h2>Game Over</h2> 
                        <h3>${endMessage}</h3>
                        <p class="end-emoji">${endEmoji}</p>
                    </div>
                    `
            }, 1500)
    }

    function getNewMonster() {
        const nextMonsterData = characterData[monstersArray.shift()]
        return nextMonsterData ? new Character(nextMonsterData) : {}
    }
    
    document.getElementById("attack-button").addEventListener('click', attack)



})