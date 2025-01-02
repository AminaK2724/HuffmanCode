import React from 'react'

const TreeNode = ({ node }) => {
  if (!node) return null
  return (
    <div>
      <div>{node.data.value ? `${node.data.value} (${node.data.prob})` : `${node.data.prob}`}</div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <TreeNode node={node.left} />
        <TreeNode node={node.right} />
      </div>
    </div>
  )
}

const HuffmanTree = ({ tree }) => {
  return (
    <div>
      <h3>Huffman Tree</h3>
      <TreeNode node={tree} />
    </div>
  )
}

export default HuffmanTree
