package com.cy.pj.sys.controller;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.LoginEntity;
import com.cy.pj.sys.entity.RoomDisplay;
import com.cy.pj.sys.entity.SysRole;
import com.cy.pj.sys.service.IRoomDisplayService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping("/dingyue/{type}")
    @ResponseBody
    public JsonResult getDisplay(@PathVariable String type){
        Boolean aBoolean = iRoomDisplayService.subscribeRoom(type);
        if(aBoolean){
            JsonResult jsonResult = new JsonResult("预定成功");
            return jsonResult;
        }else{
            JsonResult jsonResult = new JsonResult("预定失败");
            return jsonResult;
        }

    }
}
