import { useEffect, useState } from "react";
import { kanto151 } from "./pokemon";

export default function Controller() {
    const [pokemon, setPokemon] = useState([])
    
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

    return (
        <pre>{JSON.stringify(pokemon, null, 2)}</pre>
    )
}