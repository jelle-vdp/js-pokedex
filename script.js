const btnGetPokemon = document.querySelector(".btn-findpokemon");
const inputGetPokemon = document.querySelector(".input-findpokemon");

const pokedexContainer = document.querySelector(".pokedex");
const pokedexNameEl = document.querySelector(".pokedex__img-container-content h3");
const pokedexImgEl = document.querySelector(".pokedex__img-container-content img");
const pokedexMovesUl = document.querySelector(".pokedex__moves ul");
const pokedexPreviousEvolutionContainer = document.querySelector(".pokedex__previous-evolution");
const pokedexPreviousEvolutionNameEl = document.querySelector(".pokedex__previous-evolution h4");
const pokedexPreviousEvolutionImgEl = document.querySelector(".pokedex__previous-evolution img");
const pokedexIndexEl = document.querySelector(".pokedex__index");

const idErrorEl = document.querySelector(".pokedex-search__error-id");
const nameErrorEl = document.querySelector(".pokedex-search__error-name");

// let count = 0

btnGetPokemon.addEventListener("click", () => {

    let searchValue;

    if (isNaN(+inputGetPokemon.value)){
        searchValue = inputGetPokemon.value.replaceAll(" ", "-").toLowerCase();
    } else {
        searchValue = inputGetPokemon.value
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`)
        .then(res => res.json())
        .then(data => {
            
            let pokemonData = data;

            inputGetPokemon.value = "";

            pokedexContainer.style.display = "flex";
            pokedexNameEl.innerText = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1).replaceAll("-", " ");
            pokedexImgEl.src = pokemonData.sprites.front_default;
            pokedexIndexEl.innerText = `#${pokemonData.id}`; 

            let currentPokemonSprites = [pokemonData.sprites.front_default, pokemonData.sprites.back_default, pokemonData.sprites.front_shiny, pokemonData.sprites.back_shiny, pokemonData.sprites.front_default];
            

            const spriteMove = () => {
                currentPokemonSprites.forEach((sprite, i) => {
                setTimeout(() => pokedexImgEl.src = sprite, 1000 * i)
                });
            };

            
            // if (count > 0){
            //     clearInterval(window.setInterval(spriteMove, 4000));
            // }
            // count++;

            spriteMove();
            // window.setInterval(spriteMove, 4000);


            pokedexMovesUl.innerHTML = "";
            for (let i = 0; i <5; i++){
                let pokemonMove = pokemonData.moves[i].move.name.replaceAll("-", " ");
                pokedexMovesUl.innerHTML = `${pokedexMovesUl.innerHTML}<li>${pokemonMove.charAt(0).toUpperCase() + pokemonMove.slice(1)}</li>`;
            }

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchValue}/`)
                .then(res => res.json())
                .then(data => {
                    let familyData = data;

                    if(familyData.evolves_from_species){

                        fetch(`https://pokeapi.co/api/v2/pokemon/${familyData.evolves_from_species.name}/`)
                            .then(res => res.json())
                            .then(data => {
                                let previousEvolution = data;
                    
                                pokedexPreviousEvolutionContainer.style.display = "flex";
                                pokedexPreviousEvolutionNameEl.innerText = previousEvolution.name.charAt(0).toUpperCase() + previousEvolution.name.slice(1);
                                pokedexPreviousEvolutionImgEl.src = previousEvolution.sprites.front_default;

                            });
                            
                    } else {
                        pokedexPreviousEvolutionContainer.style.display = "none";
                    }
                });
        })
        .catch(err => {
            if (isNaN(+inputGetPokemon.value )){
                nameErrorEl.style.display = "block";
                setTimeout(() => nameErrorEl.style.display = "none", 5000);
            } else {
                idErrorEl.style.display = "block"
                setTimeout(() => idErrorEl.style.display = "none", 5000);
            }
        });
})