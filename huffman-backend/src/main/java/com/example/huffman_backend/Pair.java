package com.example.huffman_backend;

public class Pair implements Comparable<Pair> {
    private Character character; 
    private double probability;

    public Pair(Character character, double probability) {
        this.character = character;
        this.probability = probability;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public double getProbability() {
        return probability;
    }

    public void setProbability(double probability) {
        this.probability = probability;
    }

    @Override
    public int compareTo(Pair other) {
        return Double.compare(this.probability, other.probability);
    }

    @Override
    public String toString() {
        return "Pair{" +
                "character=" + character +
                ", probability=" + probability +
                '}';
    }
}
