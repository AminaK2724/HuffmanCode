import React, { useState } from 'react'

const DecodeForm = ({ onDecode }) => {
  const [input, setInput] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/api/huffman/decode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ encodedText: input }),
    })
    const data = await response.json()
    onDecode(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Decode Text</h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter encoded text"
        required
      />
      <button type="submit">Decode</button>
    </form>
  )
}

export default DecodeForm
