const btnGetById = document.querySelector(".btn-findbyid");
const btnGetByName = document.querySelector(".btn-findbyname");

const inputPokemonId = document.querySelector(".input-findbyid");
const inputPokemonName = document.querySelector(".input-findbynames");

const pokedexContainer = document.querySelector(".pokedex");
const pokedexNameEl = document.querySelector(".pokedex__img-container-content h3");
const pokedexImgEl = document.querySelector(".pokedex__img-container-content img");
const pokedexMovesUl = document.querySelector(".pokedex__moves ul");
const pokedexPreviousEvolutionContainer = document.querySelector(".pokedex__previous-evolution");
const pokedexPreviousEvolutionNameEl = document.querySelector(".pokedex__previous-evolution h4");
const pokedexPreviousEvolutionImgEl = document.querySelector(".pokedex__previous-evolution img");
const pokedexIndexEl = document.querySelector(".pokedex__index")

btnGetById.addEventListener("click", () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputPokemonId.value}/`)
        .then(res => res.json())
        .then(data => {
            
            let pokemonData = data;

            pokedexContainer.style.display = "flex";
            pokedexNameEl.innerText = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
            pokedexImgEl.src = pokemonData.sprites.front_default;
            pokedexIndexEl.innerText = `#${pokemonData.id}`; 

            pokedexMovesUl.innerHTML = "";
            for (let i = 0; i <5; i++){
                let pokemonMove = pokemonData.moves[i].move.name;
                pokedexMovesUl.innerHTML = `${pokedexMovesUl.innerHTML}<li>${pokemonMove}</li>`;
            }

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${inputPokemonId.value}/`)
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
                        }
                });
        });
})