export default function Card({ entry, handleCardSelect }) {
    return <li onClick={() => handleCardSelect(entry.number)}>
        <label>
            <img src={entry.sprite} alt="" />
            {entry.name}
        </label>
    </li>
}