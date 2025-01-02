package com.example.huffman_backend;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.*;

@Service
public class HuffmanService {

    public HuffmanResult encode(String input, Map<String, Double> probabilities) {
    
    BinaryTree<Pair> huffmanTree = generateHuffmanTree(probabilities);
    if (huffmanTree == null) {
        throw new IllegalArgumentException("Huffman Tree generation failed.");
    }

    
    Map<Character, String> encodingMap = createEncodingMap(huffmanTree);

    
    StringBuilder encodedText = new StringBuilder();
    for (char c : input.toCharArray()) {
        if (!encodingMap.containsKey(c)) {
            throw new IllegalArgumentException("Input contains invalid character: " + c);
        }
        encodedText.append(encodingMap.get(c));
    }

    return new HuffmanResult(encodedText.toString(), null, encodingMap, huffmanTree);
}


    public String decode(String encodedText, Map<Character, String> encodingMap) {
        Map<String, Character> decodingMap = new HashMap<>();
        for (Map.Entry<Character, String> entry : encodingMap.entrySet()) {
            decodingMap.put(entry.getValue(), entry.getKey());
        }

        StringBuilder decodedText = new StringBuilder();
        StringBuilder buffer = new StringBuilder();

        for (char bit : encodedText.toCharArray()) {
            buffer.append(bit);
            if (decodingMap.containsKey(buffer.toString())) {
                decodedText.append(decodingMap.get(buffer.toString()));
                buffer.setLength(0);
            }
        }

        return decodedText.toString();
    }

    private BinaryTree<Pair> generateHuffmanTree(Map<String, Double> probabilities) {
        PriorityQueue<BinaryTree<Pair>> queue = new PriorityQueue<>(Comparator.comparingDouble(bt -> bt.getData().getProbability()));

        
        for (Map.Entry<String, Double> entry : probabilities.entrySet()) {
            Pair pair = new Pair(entry.getKey().charAt(0), entry.getValue());
            BinaryTree<Pair> tree = new BinaryTree<>();
            tree.setData(pair);
            queue.add(tree);
        }

        
        while (queue.size() > 1) {
            BinaryTree<Pair> left = queue.poll();
            BinaryTree<Pair> right = queue.poll();
            Pair parentPair = new Pair(null, left.getData().getProbability() + right.getData().getProbability());

            BinaryTree<Pair> parentTree = new BinaryTree<>();
            parentTree.setData(parentPair);
            parentTree.setLeft(left);
            parentTree.setRight(right);

            queue.add(parentTree);
        }

        return queue.poll();
    }

   private Map<Character, String> createEncodingMap(BinaryTree<Pair> tree) {
    Map<Character, String> encodingMap = new HashMap<>();
    createEncodingHelper(tree, "", encodingMap);
    System.out.println("Encoding Map: " + encodingMap); 
    return encodingMap;
}

private void createEncodingHelper(BinaryTree<Pair> tree, String code, Map<Character, String> map) {
    if (tree.isLeaf()) {
        map.put(tree.getData().getCharacter(), code);
    } else {
        if (tree.getLeft() != null) {
            createEncodingHelper(tree.getLeft(), code + "0", map);
        }
        if (tree.getRight() != null) {
            createEncodingHelper(tree.getRight(), code + "1", map);
        }
    }
}

    private Map<String, Double> getDefaultProbabilities() {
        Map<String, Double> probabilities = new HashMap<>();
        probabilities.put("Z", 0.0007);
        probabilities.put("J", 0.001);
        probabilities.put("Q", 0.0011);
        probabilities.put("X", 0.0017);
        probabilities.put("K", 0.0069);
        probabilities.put("V", 0.0111);
        probabilities.put("B", 0.0149);
        probabilities.put("P", 0.0182);
        probabilities.put("G", 0.0203);
        probabilities.put("W", 0.0209);
        probabilities.put("Y", 0.0211);
        probabilities.put("F", 0.023);
        probabilities.put("M", 0.0261);
        probabilities.put("C", 0.0271);
        probabilities.put("U", 0.0288);
        probabilities.put("L", 0.0398);
        probabilities.put("D", 0.0432);
        probabilities.put("H", 0.0592);
        probabilities.put("R", 0.0602);
        probabilities.put("S", 0.0628);
        probabilities.put("N", 0.0695);
        probabilities.put("I", 0.0731);
        probabilities.put("O", 0.0768);
        probabilities.put("A", 0.0812);
        probabilities.put("T", 0.091);
        probabilities.put("E", 0.1203);
        return probabilities;
    }
}
