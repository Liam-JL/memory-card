export default function ScoreDisplay ({currentScore, bestScore}) {
    return (
        <div className="score-display" aria-labelledby="score-display-header">
            <h2 id="score-display-header">Score</h2>
            <span className="current-score" aria-label="current-score">{`Current Score: ${currentScore}`}</span>
            <span className="best-score" aria-label="best-score">{`Best Score: ${bestScore}`}</span>
        </div>
    )
}