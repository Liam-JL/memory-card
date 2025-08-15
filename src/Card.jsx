export default function Card({ entry, handleCardSelect }) {
    return (
        <li className="card" onClick={() => handleCardSelect(entry.number)}>
            <div className="card__img-wrapper">
                <img className="card__img" src={entry.sprite} alt={entry.name} />
            </div>
            <p className="card__name">{entry.name.slice(0,1).toUpperCase() + entry.name.slice(1)}</p>
        </li>
    )
}

