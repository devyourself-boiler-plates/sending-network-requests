import axios from "axios";

async function pokemon() {
  let currentRow;
  for (let i = 1; i <= 150; i++) {
    // add a new row of sprites if current row is full
    if ((i-1)%10 === 0) {
      currentRow = document.createElement("div");
      document.body.appendChild(currentRow);
    }

    // add a sprite to the current row
    const sprite = document.createElement("img");
    currentRow.appendChild(sprite);

    // finally, set the src for this sprite, once the API responds to us, whenever that happens

    // Concurrent version
    axios.get("https://pokeapi.co/api/v2/pokemon/" + i).then(response => {
      sprite.src = response.data.sprites.front_default;
    });
    
    // Sequential version
    const pokemonData = await axios.get("https://pokeapi.co/api/v2/pokemon/" + i);
    sprite.src = pokemonData.data.sprites.front_default;
  }
}

pokemon();