package com.cy.pj.sys.controller;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.RoomEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 查找需求房型
 */
@Controller
@RequestMapping("/undefined/login")
public class LoginController {
    @RequestMapping("/checkbroker")
    @ResponseBody
    public JsonResult get(String  account){
        JsonResult ok = new JsonResult("roomList");
        return ok;
    }
}
