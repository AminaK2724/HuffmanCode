import React, { useState } from 'react'
import HuffmanTree from './HuffmanTree'
import EncodingTable from './EncodingTable'
import 'table.css';
const HuffmanVisualizer = () => {
  const [input, setInput] = useState('')
  const [tree, setTree] = useState(null)
  const [encodingMap, setEncodingMap] = useState({})
  const [encodedText, setEncodedText] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/api/huffman/encode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      })

      const data = await response.json()

      setTree(data.tree) // Assume the backend sends the tree
      setEncodingMap(data.encodingMap) // Assume the backend sends the encoding map
      setEncodedText(data.encodedText)
    } catch (error) {
      console.error('Error fetching Huffman encoding:', error)
    }
  }

  return (
    <div>
      <h1>Huffman Code Visualizer</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to encode" />
        <button type="submit">Generate Huffman Tree</button>
      </form>

      {tree && <HuffmanTree root={tree} />}
      {Object.keys(encodingMap).length > 0 && <EncodingTable encodingMap={encodingMap} />}
      {encodedText && (
        <div>
          <h3>Encoded Text</h3>
          <p>{encodedText}</p>
        </div>
      )}
    </div>
  )
}

export default HuffmanVisualizer
