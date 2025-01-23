package com.example.huffman_backend;

import com.example.huffman_backend.HuffmanResult;
import com.example.huffman_backend.HuffmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/huffman")
@CrossOrigin(origins = "http://localhost:3000/")
public class HuffmanController {

    @Autowired
    private HuffmanService huffmanService;

    @PostMapping("/encode/predefined")
    public HuffmanResult encodeWithPredefined(@RequestBody Map<String, Object> request) {
        String text = (String) request.get("text");
        Map<String, Double> probabilities = (Map<String, Double>) request.get("probabilities");
        return huffmanService.encodeWithPredefined(text, probabilities);
    }

    @PostMapping("/encode/dynamic")
    public HuffmanResult encodeWithDynamic(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        return huffmanService.encodeWithDynamic(text);
    }
}
