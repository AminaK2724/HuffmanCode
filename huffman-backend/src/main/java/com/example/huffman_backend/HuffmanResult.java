package com.example.huffman_backend;

import java.util.Map;

public class HuffmanResult {
    private String encodedText;
    private String decodedText;
    private Map<Character, String> encodingMap;
    private BinaryTree<Pair> tree;
    
    public HuffmanResult(String encodedText, String decodedText, Map<Character, String> encodingMap, BinaryTree<Pair> tree) {
        this.encodedText = encodedText;
        this.decodedText = decodedText;
        this.encodingMap = encodingMap;
        this.tree = tree;
    }

    public String getEncodedText() {
        return encodedText;
    }

    public String getDecodedText() {
        return decodedText;
    }

    public Map<Character, String> getEncodingMap() {
        return encodingMap;
    }

    public BinaryTree<Pair> getTree() {
        return tree;
    }
}
