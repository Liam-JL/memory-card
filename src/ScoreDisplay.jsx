export default function ScoreDisplay ({currentScore, bestScore}) {
    return (
        <div className="score-display" aria-label="score-display">
            <span className="current-score" aria-label="current-score">{`Score: ${currentScore}`}</span>
            <span className="best-score" aria-label="best-score">{`Best Score: ${bestScore}`}</span>
        </div>
    )
}