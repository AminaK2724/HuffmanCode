import React, { useState } from 'react'
import '../EncodeForm.css' 

const EncodeForm = ({ onEncode }) => {
  const [input, setInput] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if (!/^[A-Z\s]+$/.test(input)) {
      alert('Invalid input. Please enter uppercase letters only.')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/huffman/encode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to encode the text.')
      }

      const data = await response.json()
      onEncode(data)
    } catch (error) {
      console.error('Error during encoding:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="encode-form">
      <h2>Encode Text</h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text to encode"
        required
        className="text-input"
      />
      <button type="submit" className="encode-button">
        Encode
      </button>
    </form>
  )
}

export default EncodeForm
