import Character from "./Character.js"
import { getRandomPokemon } from "./utils.js"

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

        const teamPokemon = new Character(pokeData)
        playerTeam < 6 && playerTeam.push(teamPokemon)
        document.getElementById("playerTeam").innerHTML = teamPokemon.getCharacterHtml()
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
        document.getElementById("enemyTeam").innerHTML = enemyPokemon.getCharacterHtml()

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
                document.getElementById("playerTeam").innerHTML = playerTeam[0].getCharacterHtml()
                document.getElementById("enemyTeam").innerHTML = enemyTeam[0].getCharacterHtml() 
                if(playerTeam[0].dead){
                    endGame()
                }
                else if(enemyTeam[0].dead){
                    endGame()
                }    
            }
        }        

    function endGame() {
        isWaiting = true
        const endMessage = playerTeam[0].health === 0 && enemyTeam[0].health === 0 ?
            "It's a tie!" :
            playerTeam[0].health > 0 ? 
                `${playerTeam[0].name.charAt(0).toUpperCase() + playerTeam[0].name.slice(1)} wins!` :
                `${enemyTeam[0].name.charAt(0).toUpperCase() + enemyTeam[0].name.slice(1)} wins!`
            
            setTimeout(()=>{
                var modal = document.getElementById("myModal")
                var modalContent = document.getElementById("modalContent")
                modal.style.display="block"
                modalContent.innerHTML = `
                    <div class="end-game">
                        <p class="end-message">
                            ${endMessage}
                            <button id="attack-button" onclick="window.location.reload()">Play Again</button>                    
                        </p>
                    </div>
                `                
            }, 1500)
    }
    document.getElementById("attack-button").addEventListener("click", attack)                
})