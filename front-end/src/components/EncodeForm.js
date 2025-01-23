import React, { useState } from 'react'
import '../EncodeForm.css'

const EncodeForm = ({ onEncode, probabilities }) => {
  const [input, setInput] = useState('') 
  const [usePredefined, setUsePredefined] = useState(true) 
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if (!/^[A-Z\s]+$/.test(input)) {
      setErrorMessage('Input must only contain uppercase letters and spaces.')
      return
    }

    const endpoint = usePredefined
      ? 'http://localhost:8080/api/huffman/encode/predefined'
      : 'http://localhost:8080/api/huffman/encode/dynamic'

    const requestBody = usePredefined
      ? {
          text: input,
          probabilities: probabilities.reduce((acc, { letter, probability }) => {
            acc[letter] = probability
            return acc
          }, {}),
        }
      : { text: input }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error('Failed to encode the text.')
      }

      const data = await response.json()
      setErrorMessage('') 
      onEncode(data)
    } catch (error) {
      setErrorMessage('Error during encoding: ' + error.message)
      console.error('Error during encoding:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="encode-form">
      <h2>Encode Text</h2>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to encode" required />
      <div>
        <label>
          <input
            className="radio"
            type="radio"
            name="encodingMode"
            checked={usePredefined}
            onChange={() => setUsePredefined(true)}
          />
          Use Predefined Probabilities
        </label>
        <label>
          <input
            className="radio"
            type="radio"
            name="encodingMode"
            checked={!usePredefined}
            onChange={() => setUsePredefined(false)}
          />
          Use Dynamic Probabilities
        </label>
      </div>
      <button className="submit" type="submit">
        Encode
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  )
}

export default EncodeForm
