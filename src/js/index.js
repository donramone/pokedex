console.log("JS is Working!");
const inicio =1;
const fin =10;
let paginacion = 0;

function mostrarPokemon(pokemon){
    console.log(pokemon.name)
    console.log(pokemon.abilities)
}

function obtenerPokemonPorId(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((respuesta) => respuesta.json())
    .then((pokemon) =>
     mostrarPokemon(pokemon));
   
}

function obtenerTodosLosPokemon(paginacion = 0 ){
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${paginacion}&limit=10`
    fetch(url).then((r) => r.json()).then((r) =>
    crearDockPokemones(r,paginacion));
}



function crearDockPokemones(pokemones,paginacion){

    const indiceImagen = paginacion + 1;
    const $pokemonDock = document.querySelector(".pokemon-dock");


    if ( $pokemonDock.childElementCount !== 0 ){
        $pokemonDock.textContent = '';
    } 

    console.log(pokemones);
    for(i=0;i < pokemones.results.length; i++){
      //  console.log("el poke es :" + pokemones.results[i].name + "su imagen es: " + `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`);

        const $liElement = document.createElement("li");
        const $spanElement = document.createElement("span");
        const $aElement = document.createElement("a");
        const $imgElement = document.createElement("img");

        $imgElement.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indiceImagen+i}.png`;
        $imgElement.id = indiceImagen + i;

        $aElement.setAttribute('href', '#');
        $spanElement.textContent=pokemones.results[i].name;
        $aElement.appendChild($imgElement);
        $liElement.appendChild($spanElement);

        $liElement.appendChild($aElement);

        $pokemonDock.appendChild($liElement);
        // $imgElement.addEventListener('click', () => funcion(parametro));
    }
}


//iniciar();
//obtenerPokemonPorId(25);
obtenerTodosLosPokemon();

const $pokemon = document.querySelector(".pokemon-dock");
const $btnRight = document.querySelector(".btn-right");
const $btnLeft = document.querySelector(".btn-left");

$pokemon.addEventListener("click", (evento) => {
    const idPokemon = event.target.id;
    obtenerPokemonPorId(idPokemon);
    
   
});



$btnRight.addEventListener("click", changeText);

$btnLeft.onclick = function() {
    const MIN_PG =10;
    if(paginacion >= MIN_PG){
        paginacion = paginacion - 10;
        obtenerTodosLosPokemon(paginacion);
    }
}

function changeText() {
    const MAX_PG =960;
    if(paginacion <= MAX_PG){
        paginacion = paginacion + 10;
        obtenerTodosLosPokemon(paginacion);
    }
}