import React, { useState, useEffect, useRef } from 'react'
import EncodeForm from './components/EncodeForm'
import DecodeForm from './components/DecodeForm'
import Results from './components/Results'
import './App.css'

const defaultProbabilities = [
  { letter: 'Z', probability: 0.0007 },
  { letter: 'J', probability: 0.001 },
  { letter: 'Q', probability: 0.0011 },
  { letter: 'X', probability: 0.0017 },
  { letter: 'K', probability: 0.0069 },
  { letter: 'V', probability: 0.0111 },
  { letter: 'B', probability: 0.0149 },
  { letter: 'P', probability: 0.0182 },
  { letter: 'G', probability: 0.0203 },
  { letter: 'W', probability: 0.0209 },
  { letter: 'Y', probability: 0.0211 },
  { letter: 'F', probability: 0.023 },
  { letter: 'M', probability: 0.0261 },
  { letter: 'C', probability: 0.0271 },
  { letter: 'U', probability: 0.0288 },
  { letter: 'L', probability: 0.0398 },
  { letter: 'D', probability: 0.0432 },
  { letter: 'H', probability: 0.0592 },
  { letter: 'R', probability: 0.0602 },
  { letter: 'S', probability: 0.0628 },
  { letter: 'N', probability: 0.0695 },
  { letter: 'I', probability: 0.0731 },
  { letter: 'O', probability: 0.0768 },
  { letter: 'A', probability: 0.0812 },
  { letter: 'T', probability: 0.091 },
  { letter: 'E', probability: 0.1203 },
  { letter: ' ', probability: 0.02 },
]

const App = () => {
  const [probabilities, setProbabilities] = useState(defaultProbabilities)
  const [result, setResult] = useState(null)
  const inputRefs = useRef([]) 

  
  useEffect(() => {
    const savedProbabilities = localStorage.getItem('probabilities')
    if (savedProbabilities) {
      try {
        const parsedProbabilities = JSON.parse(savedProbabilities)

        
        if (
          Array.isArray(parsedProbabilities) &&
          parsedProbabilities.length === defaultProbabilities.length &&
          parsedProbabilities.every(
            (item, index) => item.letter === defaultProbabilities[index].letter && typeof item.probability === 'number',
          )
        ) {
          setProbabilities(parsedProbabilities)
        } else {
          
          setProbabilities(defaultProbabilities)
        }
      } catch (error) {
        
        setProbabilities(defaultProbabilities)
      }
    }
  }, [])

  const updateProbability = (index, newProbability) => {
    const updatedProbabilities = [...probabilities]
    updatedProbabilities[index].probability = parseFloat(newProbability) || 0
    setProbabilities(updatedProbabilities)
  }

  const saveProbabilities = () => {
    localStorage.setItem('probabilities', JSON.stringify(probabilities))
    alert('Probabilities saved successfully!')
  }

  const useDefaultProbabilities = () => {
    setProbabilities(defaultProbabilities)
    localStorage.setItem('probabilities', JSON.stringify(defaultProbabilities))
  }

  const handleEncode = data => {
    setResult(data)
  }

  const focusInput = index => {
    inputRefs.current[index].focus() 
  }

  return (
    <div className="app-container">
      <div className="probabilities-section">
        <h2>Letter Probabilities</h2>
        <table className="probabilities-table">
          <thead>
            <tr>
              <th>Letter</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>
            {probabilities.map((item, index) => (
              <tr key={item.letter}>
                <td>{item.letter}</td>
                <td className="editable-cell">
                  <input
                    ref={el => (inputRefs.current[index] = el)} 
                    type="number"
                    step="0.0001"
                    value={item.probability}
                    onChange={e => updateProbability(index, e.target.value)}
                  />
                  <button className="edit-button" onClick={() => focusInput(index)} title="Edit">
                    🖋️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={saveProbabilities}>Save Probabilities</button>
        <button onClick={useDefaultProbabilities}>Use Default Probabilities</button>
      </div>
      <div className="encoding-section">
        <EncodeForm onEncode={handleEncode} probabilities={probabilities} />
        {result && <Results result={result} />}
        <DecodeForm />
      </div>
    </div>
  )
}

export default App
