export default function Card({ entry }) {
    return <li onClick={() => console.log(`${entry.name} clicked`)}>
        <label>
            <img src={entry.sprite} alt="" />
            {entry.name}
        </label>
    </li>
}