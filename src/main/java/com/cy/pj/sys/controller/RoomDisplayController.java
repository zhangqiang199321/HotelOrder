package com.cy.pj.sys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 查找需求房型
 */
@Controller
@RequestMapping("/")
public class RoomDisplayController {
    @RequestMapping("display")
    public String get(String from){
        return "display";
    }
}
