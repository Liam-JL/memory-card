import Card from "./Card"

export default function CardWrapper({ pokemon, handleCardSelect}) {

    //Fisher Yates Shuffle
    function shuffle(array) {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function getRandomPokeEntries(n) {
        //Render at least 1 pokemon that is unchosen by user
        const unchosen = pokemon.filter(entry => entry.timesClicked < 1);
        if (unchosen.length === 0) return []; //Perfect score

        const firstPick = unchosen[Math.floor(Math.random() * unchosen.length)];
        const restPool = pokemon.filter(entry => entry !== firstPick);

        const shuffledPool = shuffle([...restPool]);
        const finalShuffle = [firstPick, ...shuffledPool.slice(0, n -1)];
        
        return finalShuffle;
    }

    // Guard for empty array
    if (pokemon.length === 0) {
        return <div>Loading cards...</div>;
    }

    const selected = getRandomPokeEntries(8);
    //if selected is empty user has perfect score
    if (selected.length === 0) return <>Perfect</>

    return (
        <div className="card-wrapper">
            <ul className="card-wrapper__list">
                {selected.map((entry) => (
                    <Card key={entry.number} entry={entry} handleCardSelect={handleCardSelect} />
                ))}
            </ul>
        </div>
    );
}
