function searchFunction() {
    let searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    let warningMessage = document.getElementById('warningMessage');
    let pokemonResult = document.getElementById('pokemonResult');

   

    if (searchValue === "") {
        warningMessage.textContent = "Please enter a Pokémon name.";
        warningMessage.style.display = "block";
        pokemonResult.innerHTML = "";
    } else {
        warningMessage.style.display = "none";

        fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon not found');
                }
                return response.json();
            })
            .then(data => {
                let abilities = data.abilities.map(ability => ability.ability.name).join(', ');
                let stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');

                pokemonResult.innerHTML = `
                    <h1>Name:${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p><strong>Abilities:</strong>  ${abilities}</p>
                    <p><strong>Stats:</strong><br>${stats}</p>
                `;
            })
            .catch(error => {
                pokemonResult.innerHTML = `<p class="error">Pokémon not found. Please try again.</p>`;
            });
    }
    pokemonResult.style.backgroundColor = 'white';
}

document.getElementById('searchButton').addEventListener('click', searchFunction);
