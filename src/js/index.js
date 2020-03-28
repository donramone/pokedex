console.log("JS is Working!");

function listarPokemones(pokemones){
    
    console.log(pokemones);

}

function iniciar(){
    fetch("https://pokeapi.co/api/v2/evolution-chain/1/").then((r) => r.json()).then((r) =>
    
    console.log(r));
    // listarPokemones(pokemones);
}

 iniciar();


const $pokemon = document.querySelector(".pokemon-dock");
const $btnRight = document.querySelector(".btn-right");
const $btnLeft = document.querySelector(".btn-left");

$pokemon.addEventListener("click", (evento) => {
    const element = evento.target.parentElement.id;
    console.log("elemento: " + element);
    console.log("current target: " + evento.currentTarget);
   
});



$btnRight.addEventListener("click", changeText);
$btnLeft.onclick = function() {
    alert("Click izquierdo");
}

function changeText() {
    alert("click derecho");
}