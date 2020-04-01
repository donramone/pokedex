console.log("JS is Working!");
const inicio =1;
const fin =10;
let paginacion = 0;


const $pokemon = document.querySelector(".pokemon-dock");
const $btnRight = document.querySelector(".btn-right");
const $btnLeft = document.querySelector(".btn-left");

//iniciar();
obtenerTodosLosPokemon();

function mostrarPokemon(pokemon){
    
    const $pockemonImagen = document.querySelector(".pokemon-img");
    const $pockemonInfo = document.querySelector(".pokemon-info");  
    
    if ( $pockemonImagen.childElementCount !== 0 || $pockemonInfo.childElementCount !== 0 ){
        $pockemonImagen.textContent = "";
        $pockemonInfo.textContent = "";
    } 
    
 
    let pokeContainer = document.createElement("div");
    let nombrePokemon = document.createElement('h1');
    nombrePokemon.innerText = pokemon.name;
    let idPokemon = document.createElement('p');
    let pEspecie = document.createElement('p');
    let pHabilidades = document.createElement('p');

    idPokemon.innerText = `ID: ${pokemon.id}`;
    pEspecie.innerText ="Especie";
    pHabilidades.innerText = "Habilidades:";

    let especiePokemon = document.createElement('ul')
    let habilidadPokemon = document.createElement('ul')  

    
    crearImagenPokemon(pokemon.id,$pockemonImagen);
    crearEspecies(pokemon.types, especiePokemon) 
    crearHabilidades(pokemon.abilities,habilidadPokemon);
 
 
    pokeContainer.append(idPokemon,nombrePokemon, pEspecie, especiePokemon,pHabilidades,habilidadPokemon);   
    $pockemonInfo.appendChild(pokeContainer);

}

function crearHabilidades(habilidad, ul){
    habilidad.forEach(function(a){ 
       
        let habilidadLi = document.createElement('li');
        habilidadLi.innerText = a['ability']['name'];
        ul.append(habilidadLi)  
    })
}

function crearImagenPokemon(Id, elementoImagen){
 
    let imagenPokemon = document.createElement('img')  
    imagenPokemon.id="pokeImg";
    imagenPokemon.srcset =`https://pokeres.bastionbot.org/images/pokemon/${Id}.png`
    elementoImagen.append(imagenPokemon);

}

function crearEspecies(types, ul){
    types.forEach(function(type){ 
        let especieLi = document.createElement('li');
        especieLi.innerText = type['type']['name'];
        ul.append(especieLi)  
    })
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
    crearDockPokemones(r));
}



function crearDockPokemones(pokemones){

    const indiceImagen = paginacion + 1;
    const $pokemonDock = document.querySelector(".pokemon-dock");


    if ( $pokemonDock.childElementCount !== 0 ){
        $pokemonDock.textContent = "";
    } 

    for(i=0;i < pokemones.results.length; i++){
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
        
    }
}


$pokemon.addEventListener("click", (evento) => {
    const idPokemon = event.target.id;
    obtenerPokemonPorId(idPokemon);
   
});

$btnRight.onclick = function() {
    const MAX_PG =960;
    if(paginacion <= MAX_PG){
        paginacion = paginacion + 10;
        obtenerTodosLosPokemon(paginacion);
    }
}

$btnLeft.onclick = function() {
    const MIN_PG =10;
    if(paginacion >= MIN_PG){
        paginacion = paginacion - 10;
        obtenerTodosLosPokemon(paginacion);
    }
}
