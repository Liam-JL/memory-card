import { useEffect, useState } from "react";
import { kanto151 } from "./pokemon";
import CardWrapper from "./CardWrapper";
import ScoreDisplay from "./ScoreDisplay";

function App() {
        const [pokemon, setPokemon] = useState([]);
        const [currentScore, setCurrentScore] = useState(0);
        const [bestScore, setBestScore] = useState(0);

        useEffect(() => {
            const fetchPokemonData = async () => {
                const pokemonPromises = kanto151.map(async (entry) => {
                    try {
                        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry.name}`);
                        const data = await response.json();
                        return {...entry, chosen: false, sprite: data.sprites.other.dream_world.front_default, cry: data.cries.latest};
                    } catch (error) {
                        console.error("Error:", error);
                        return {...entry, chosen: false, sprite: null, cry: null};
                    };
                });
    
                const resolvedPokemon = await Promise.all(pokemonPromises);
                localStorage.setItem("POKEMON", JSON.stringify(resolvedPokemon))
                setPokemon(resolvedPokemon);
            };
    
            //Check local storage for cached data first
            const cachedData = localStorage.getItem("POKEMON");
            if (cachedData) {
                console.log("Using cached data")
                setPokemon(JSON.parse(cachedData));
            } else {
                fetchPokemonData();
            }
        }, []);

        function handleCardSelection () {

        }


  return (
    <>
        <h1>Pokémon Memory Game</h1>
        <p>Click on a Pokémon to gain points. But don't click on the same one twice!</p>
        <ScoreDisplay  currentScore={currentScore} bestScore={bestScore}/>
        <CardWrapper pokemon={pokemon}/>
    </>
  )
}

export default App
