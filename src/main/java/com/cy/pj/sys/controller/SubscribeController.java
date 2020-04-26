package com.cy.pj.sys.controller;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.LoginEntity;
import com.cy.pj.sys.entity.RoomDisplay;
import com.cy.pj.sys.service.IRoomDisplayService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * 查找需求房型
 */
@Controller
@RequestMapping("/login")
public class SubscribeController {
    @Resource
    IRoomDisplayService iRoomDisplayService;

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

    @RequestMapping("/dingyue")
    @ResponseBody
    public JsonResult getDisplay(){
        String type ="";
        RoomDisplay roomDisplay = iRoomDisplayService.getRoomDisplay(type);
        JsonResult jsonResult = new JsonResult(roomDisplay);
        return jsonResult;
    }
}
