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
                        return {...entry, timesClicked: 0, sprite: data.sprites.other.dream_world.front_default, cry: data.cries.latest};
                    } catch (error) {
                        console.error("Error:", error);
                        return {...entry, timesClicked: 0, sprite: null, cry: null};
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
                const cached = JSON.parse(cachedData) 
                setPokemon(cached.map(entry => {
                    return {...entry, timesClicked : 0}
                }));
            } else {
                fetchPokemonData();
            }
        }, []);

        //Handle state changes of pokemon
        useEffect(() => {
            const clicked = pokemon.filter(entry => entry.timesClicked > 0);

            //Check for gameover
            if(clicked.length === 151 || clicked.find((entry) => entry.timesClicked > 1 )) {
                console.log("Game Over")
                setBestScore(prev => clicked.length > prev ? clicked.length : prev);
                setPokemon(prev => prev.map(entry => {
                    return {...entry, timesClicked:0}
                }))
                setCurrentScore(0)
            }

            setCurrentScore(clicked.length)

        }, [pokemon])

        function handleCardSelect(pokedexNumber) {
            setPokemon(prev => {
                return prev.map(entry => {
                    return entry.number === pokedexNumber ? 
                        {...entry, timesClicked: entry.timesClicked + 1} :
                        entry
                })
            })            
        }

        function reset() {
            setPokemon(prev => {
                 return prev.map(entry => {
                    return {...entry, timesClicked: 0}
                 })
            })

            setCurrentScore(0);
        }

        function restart() {
            reset()
            setBestScore(0)
        }


  return (
    <>
        <h1>Pokémon Memory Game</h1>
        <p>Click on a Pokémon to gain points. But don't click on the same one twice!</p>
        <ScoreDisplay  currentScore={currentScore} bestScore={bestScore}/>
        <button className="btn btn--reset" onClick={reset}>Reset Round</button>
        <button className="btn btn--restart" onClick={restart}>Restart</button>
        <CardWrapper pokemon={pokemon} handleCardSelect={handleCardSelect} />
    </>
  )
}

export default App