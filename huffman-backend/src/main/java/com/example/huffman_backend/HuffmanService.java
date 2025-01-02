package com.example.huffman_backend;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HuffmanService {

    public HuffmanResult encodeWithPredefined(String input, Map<String, Double> probabilities) {
        return encodeWithProbabilities(input, probabilities);
    }

    public HuffmanResult encodeWithDynamic(String input) {
        Map<String, Double> dynamicProbabilities = calculateDynamicProbabilities(input);
        return encodeWithProbabilities(input, dynamicProbabilities);
    }

    private HuffmanResult encodeWithProbabilities(String input, Map<String, Double> probabilities) {
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

    private Map<String, Double> calculateDynamicProbabilities(String input) {
        Map<String, Double> probabilities = new HashMap<>();
        int totalCharacters = input.length();

        for (char c : input.toCharArray()) {
            probabilities.put(
                String.valueOf(c),
                probabilities.getOrDefault(String.valueOf(c), 0.0) + 1.0 / totalCharacters
            );
        }

        return probabilities;
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
}
