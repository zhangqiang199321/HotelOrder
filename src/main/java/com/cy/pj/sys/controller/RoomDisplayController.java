package com.cy.pj.sys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * 查找需求房型
 */
@Controller
@RequestMapping("/")
public class RoomDisplayController {
    @RequestMapping("display")
    public String get(String from, HttpServletResponse response){
        Cookie ck = new Cookie("hotelId",from);
        ck.setDomain("localhost");  //10.200.152.22
        ck.setPath("/");
        response.addCookie(ck);
        response.setHeader("location","display.html");
        return "display";
    }
}
