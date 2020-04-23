package com.cy.pj.sys.controller;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.RoomDisplay;
import com.cy.pj.sys.entity.RoomEntity;
import com.cy.pj.sys.service.IRoomDisplayService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.net.BindException;
import java.util.List;

/**
 * 查找需求房型
 */
@Controller
@RequestMapping("/")
public class LoginController {

    @Resource
    IRoomDisplayService iRoomDisplayService;

    @RequestMapping("/undefined/login/checkbroker")
    @ResponseBody
    public JsonResult get(String  account){
        JsonResult ok = new JsonResult("roomList");
        return ok;
    }
    @RequestMapping("/loginout")
    public String  loginout(HttpServletResponse response){
        Cookie ck=new Cookie("ajkAuthTicket","userName");
        ck.setDomain("localhost");  //10.200.152.22
        ck.setPath("/");
        ck.setMaxAge(0);
        response.addCookie(ck);
        response.setHeader("location","index.html");
        response.setHeader("location","display.html");
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
