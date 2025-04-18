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

    @GetMapping("/knowledge2")
    public String knowledge2() {
        return "app/knowledge/index2";
    }

    @GetMapping("/communication")
    public String communication() {
        return "app/communication/index";
    }

    @GetMapping("/health")
    public String health() {
        return "app/health/index";
    }

    @GetMapping("/video")
    public String video() {
        return "app/health/video";
    }

    @GetMapping("/personality")
    public String personality() {
        return "app/personality/index";
    }

    @GetMapping("/more")
    public String more() {
        return "app/more/index";
    }

    // 추가된 메뉴 항목들
    @GetMapping("/webtoon")
    public String webtoon() {
        return "app/webtoon/index";
    }

    @GetMapping("/highschool")
    public String highschool() {
        return "app/highschool/index";
    }

    @GetMapping("/hobby")
    public String hobby() {
        return "app/hobby/index";
    }

    @GetMapping("/club")
    public String club() {
        return "app/club/index";
    }

    @GetMapping("/movie")
    public String movie() {
        return "app/movie/index";
    }

    @GetMapping("/exchange")
    public String exchange() {
        return "app/exchange/index";
    }

    @GetMapping("/product_write")
    public String productWrite() {
        return "app/exchange/product_write";
    }

    @GetMapping("/market")
    public String market() {
        return "app/market/index";
    }

    @GetMapping("/login")
    public String login() {
        return "app/auth/login";
    }


    @GetMapping("/register")
    public String registert() {
        return "app/auth/register";
    }

    @GetMapping("/affirmation")
    public String affirmation() {
        return "app/affirmation/index";
    }

    @GetMapping("/thesis")
    public String thesis() {
        return "app/thesis/index";
    }

    @GetMapping("/filialPiety")
    public String filialPiety() {
        return "app/filialPiety/index";
    }

    @GetMapping("/news")
    public String news() {
        return "app/news/index";
    }

    @GetMapping("/peace")
    public String peace() {
        return "app/peace/index";
    }

    @GetMapping("/stress")
    public String stress() {
        return "app/stress/index";
    }

    @GetMapping("/detail")
    public String detail() {
        return "fragments/detail";
    }

    @GetMapping("/write")
    public String write() {
        return "fragments/write";
    }

    @GetMapping("/video_write")
    public String videoWrite() {
        return "fragments/video_write";
    }

    @GetMapping("/privacy-policy")
    public String privacypolicy() {
        return "app/etc/privacy-policy";
    }

    @GetMapping("/documents")
    public String documents() {
        return "app/etc/documents";
    }

    @GetMapping("/supports")
    public String supports() {
        return "app/etc/supports";
    }

    @GetMapping("/faq")
    public String faq() {
        return "app/etc/faq";
    }

    @GetMapping("/blog")
    public String blog() {
        return "app/etc/blog";
    }

    @GetMapping("/condition")
    public String condition() {
        return "app/etc/condition";
    }


    @GetMapping("/contact")
    public String contact() {
        return "app/etc/contact";
    }

    @GetMapping("/career")
    public String career() {
        return "app/career/index";
    }

    @GetMapping("/career-detail")
    public String careerdetail() {
        return "app/career/career-detail";
    }

    @GetMapping("/partner")
    public String partner() {
        return "app/partner/index";
    }

    @GetMapping("/about")
    public String about() {
        return "app/about/index";
    }

    // 디버깅용 추가 메서드
    @GetMapping("/test")
    public String test() {
        return "Hello, World!";
    }
}