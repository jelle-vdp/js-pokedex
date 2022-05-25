const btnGetPokemon = document.querySelector(".btn-findpokemon");
const inputGetPokemon = document.querySelector(".input-findpokemon");

const pokedexContainer = document.querySelector(".pokedex");
const pokedexNameEl = document.querySelector(".pokedex__img-container-content h3");
const pokedexImgEl = document.querySelector(".pokedex__img-container-content img");
const pokedexMovesTitle = document.querySelector(".pokedex__moves h3");
const pokedexMovesUl = document.querySelector(".pokedex__moves ul");
const pokedexPreviousEvolutionContainer = document.querySelector(".pokedex__previous-evolution");
const pokedexPreviousEvolutionNameEl = document.querySelector(".pokedex__previous-evolution h4");
const pokedexPreviousEvolutionImgEl = document.querySelector(".pokedex__previous-evolution img");
const pokedexIndexEl = document.querySelector(".pokedex__index");

const idErrorEl = document.querySelector(".pokedex-search__error-id");
const nameErrorEl = document.querySelector(".pokedex-search__error-name");

let spriteInterval;

btnGetPokemon.addEventListener("click", () => {

    let searchValue;

    if (isNaN(+inputGetPokemon.value)){
        searchValue = inputGetPokemon.value.replaceAll(" ", "-").toLowerCase();
    } else {
        searchValue = inputGetPokemon.value;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`)
        .then(res => res.json())
        .then(data => {

            clearInterval(spriteInterval);
            
            let pokemonData = data;

            inputGetPokemon.value = "";

            pokedexContainer.style.display = "flex";
            pokedexNameEl.innerText = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1).replaceAll("-", " ");
            pokedexImgEl.src = pokemonData.sprites.front_default;
            pokedexIndexEl.innerText = `#${pokemonData.id}`; 

            let currentPokemonSprites = [pokemonData.sprites.front_default, pokemonData.sprites.back_default, pokemonData.sprites.front_shiny, pokemonData.sprites.back_shiny];

            currentPokemonSprites.forEach((sprite, i) => {
                let index = `sprite-${i + 1}`;
                pokedexImgEl.dataset[index] = sprite;
            });

            let count = 0;
            spriteInterval = setInterval(() => {
                count++;
                let index = `sprite-${count}`;
                pokedexImgEl.src = pokedexImgEl.dataset[index];
                if (count === 4){
                    count = 0;
                };

            }, 1000);

            if (pokemonData.moves.length === 1){
                pokedexMovesTitle.innerText = "Your pokemon's move"
            } else if (pokemonData.moves.length < 6) {
                pokedexMovesTitle.innerText = `The ${pokemonData.moves.length} moves of your pokemon are`
            };

            pokedexMovesUl.innerHTML = "";
            for (let i = 0; i < 5; i++){
                let pokemonMove = pokemonData.moves[i].move.name.replaceAll("-", " ");
                if (i === 0){
                    pokedexMovesUl.innerHTML = `${pokedexMovesUl.innerHTML}<li class=\"selected\">${pokemonMove.charAt(0).toUpperCase() + pokemonMove.slice(1)}</li>`;
                } else {
                    pokedexMovesUl.innerHTML = `${pokedexMovesUl.innerHTML}<li>${pokemonMove.charAt(0).toUpperCase() + pokemonMove.slice(1)}</li>`;
                };
            };

            movesArr = document.querySelectorAll(".pokedex__moves li");

            document.addEventListener("keydown", e => {
                if (e.keyCode === 38) {
                    let indexSelectedMove;
                    movesArr.forEach((move, index) => {
                        if (move.classList.value === "selected"){
                            indexSelectedMove = index;
                        };
                    });
                    console.log(movesArr[indexSelectedMove]);
                    movesArr[indexSelectedMove].classList.remove("selected");
                    if (indexSelectedMove !== 0){
                        indexSelectedMove--;
                    } else {
                        indexSelectedMove = movesArr.length - 1;
                    }
                    movesArr[indexSelectedMove].classList.add("selected");
                    
                } else if (e.keyCode === 40) {
                    
                    let indexSelectedMove;
                    movesArr.forEach((move, index) => {
                        if (move.classList.value === "selected"){
                            indexSelectedMove = index;
                        };
                    });
                    console.log(movesArr[indexSelectedMove]);
                    movesArr[indexSelectedMove].classList.remove("selected");
                    if (indexSelectedMove !== movesArr.length - 1){
                        indexSelectedMove++;
                    } else {
                        indexSelectedMove = 0;
                    }
                    movesArr[indexSelectedMove].classList.add("selected");
                };
            });

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
                    };
                });
        })
        .catch(err => {
            if (isNaN(+inputGetPokemon.value )){
                nameErrorEl.style.display = "block";
                setTimeout(() => nameErrorEl.style.display = "none", 5000);
            } else {
                idErrorEl.style.display = "block";
                setTimeout(() => idErrorEl.style.display = "none", 5000);
            };
        });
});