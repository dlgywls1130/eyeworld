package com.example.eyeworld.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    
    @GetMapping("/")
    public String main() {
        return "app/main/index";
    }

    @GetMapping("/advertisement")
    public String advertisement() {
        return "app/advertisement/index";
    }

    @GetMapping("/students")
    public String students() {
        return "app/students/index";
    }

    @GetMapping("/teachers")
    public String teachers() {
        return "app/teachers/index";
    }

    @GetMapping("/parents")
    public String parents() {
        return "app/parents/index";
    }

    @GetMapping("/kpop")
    public String kpop() {
        return "app/kpop/index";
    }

    @GetMapping("/knowledge")
    public String knowledge() {
        return "app/knowledge/index";
    }

    @GetMapping("/communication")
    public String communication() {
        return "app/communication/index";
    }

    @GetMapping("/health")
    public String health() {
        return "app/health/index";
    }

    @GetMapping("/personality")
    public String personality() {
        return "app/personality/index";
    }

    @GetMapping("/more")
    public String more() {
        return "app/more/index";
    }

    // 디버깅용 추가 메서드
    @GetMapping("/test")
    public String test() {
        return "Hello, World!";
    }
}