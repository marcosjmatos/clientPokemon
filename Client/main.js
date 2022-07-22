"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// aqui el front end interactua con el backend a traves de los diferentes metodos document, window
let pkmnFound = [];
//take the form element and store his string value
const pkmnForm = document.querySelector("#form");
const docFrag = document.createDocumentFragment();
const fotoPkmn = document.getElementById("pokemondiv");
//brings the array of all Pkmn TCG
function leePokemon(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`, {
                headers: {
                    "X-Api-Key": "b2e95d11-1d67-43eb-ad9c-72ee1f0df5be"
                }
            });
            const data = yield response.json();
            return data;
        }
        catch (err) {
            alert("Pokemon no existe!");
            return err;
        }
    });
}
function createImg(url) {
    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.setAttribute("id", "pokm");
    docFrag.appendChild(img);
}
function creaDivHijo() {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "hijo");
    fotoPkmn.appendChild(newDiv);
}
pkmnForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const pkmnName = document.getElementById("pokemon_name").value;
    const { data: pkmnList } = yield leePokemon(pkmnName.toLowerCase());
    const pkmnImg = pkmnList.map((pokemon) => {
        return pokemon.images.small;
    });
    //verify if the pokemon exist
    if (pkmnImg.length === 0) {
        console.log("error!");
        alert("Pokemon no Existe!");
        return;
    }
    //verifica si ya hay imagenes y las borra de ser así
    if (fotoPkmn.hasChildNodes()) {
        fotoPkmn.removeChild(fotoPkmn.childNodes[0]);
    }
    creaDivHijo();
    const fotoPkmnNew = document.querySelector(".hijo");
    for (const img of pkmnImg) {
        createImg(img);
    }
    fotoPkmnNew.appendChild(docFrag);
}));
