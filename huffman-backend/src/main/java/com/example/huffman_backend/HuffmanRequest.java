package com.example.huffman_backend;

import java.util.Map;

public class HuffmanRequest {
    private String text;
    private Map<String, Double> probabilities;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Map<String, Double> getProbabilities() {
        return probabilities;
    }

    public void setProbabilities(Map<String, Double> probabilities) {
        this.probabilities = probabilities;
    }
}
