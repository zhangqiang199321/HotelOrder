package com.cy.pj.sys.controller;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.LoginEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 查找需求房型
 */
@Controller
@RequestMapping("/login")
public class LogController {
    @RequestMapping("/checkbroker")
    @ResponseBody
    public JsonResult get(String  account){
        LoginEntity loginEntity = new LoginEntity();
        loginEntity.setCode("0");
        JsonResult ok = new JsonResult(loginEntity);
        return ok;
    }
    @RequestMapping("/index")
    public String index(String  account){
        return "index";
    }
}
