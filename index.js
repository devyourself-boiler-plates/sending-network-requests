import axios from "axios";

async function pokemon() {
  for (let i = 1; i <= 150; i++) {
    // creating an img tag
    const sprite = document.createElement("img");
    
    // requesting the `i`-th pokemon's data
    const pokemonData = await axios.get("https://pokeapi.co/api/v2/pokemon/" + i);

    // setting the src attribute to the sprite url even though the img tag isn't being attached to the DOM yet
    sprite.src = pokemonData.data.sprites.front_default;

    document.body.appendChild(sprite);
  }
}

pokemon();