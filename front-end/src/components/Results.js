import React from 'react'
import '../Results.css'

const Results = ({ result }) => {
  if (!result) return null

  const { encodedText, decodedText, encodingMap, tree } = result

  return (
    <div className="results-container">
      <h2>Results</h2>
      <div className="result-section">
        <strong>Encoded Text:</strong>
        <p className="result-value">{encodedText}</p>
      </div>
      {decodedText && (
        <div className="result-section">
          <strong>Decoded Text:</strong>
          <p className="result-value">{decodedText}</p>
        </div>
      )}
      <div className="result-section">
        <strong>Encoding Map:</strong>
        <ul className="encoding-map">
          {Object.entries(encodingMap).map(([letter, code]) => (
            <li key={letter}>
              <span className="map-letter">{letter}:</span> {code}
            </li>
          ))}
        </ul>
      </div>
      <div className="result-section">
        <strong>Huffman Tree (Preview):</strong>
        <pre className="tree-preview">{JSON.stringify(tree, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Results
