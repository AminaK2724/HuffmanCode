package com.example.huffman_backend;

import com.example.huffman_backend.HuffmanResult;
import com.example.huffman_backend.HuffmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/huffman")
@CrossOrigin(origins = "http://localhost:3000")
public class HuffmanController {

    @Autowired
    private HuffmanService huffmanService;

    @PostMapping("/encode")
    public HuffmanResult encode(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        return huffmanService.encode(text);
    }
}
