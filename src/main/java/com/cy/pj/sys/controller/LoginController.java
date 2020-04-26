package com.cy.pj.sys.controller;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.dao.LoginDao;
import com.cy.pj.sys.entity.Request;
import com.cy.pj.sys.service.ILoginService;
import com.cy.pj.sys.service.impl.LoginService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 查找需求房型
 */
@Controller
@RequestMapping("/")
public class LoginController {
    @Resource
    ILoginService iLoginService;

    @RequestMapping("undefined/login/checkbroker")
    @ResponseBody
    public JsonResult get(String  account){
        JsonResult ok = new JsonResult("roomList");
        return ok;
    }
    @RequestMapping("/loginout")
    public String  loginout(HttpServletResponse response){
        Cookie ck = new Cookie("ajkAuthTicket","userName");
        ck.setDomain("localhost");  //10.200.152.22
        ck.setPath("/");
        ck.setMaxAge(0);
        response.addCookie(ck);
        response.setHeader("location","index.html");
        response.setHeader("location","display.html");
        return "index";
    }
    @RequestMapping("login/success")
    public void success(String  account, HttpServletResponse response) throws IOException {
        response.sendRedirect("index");
    }

    @RequestMapping("ajk/login")
    @ResponseBody
    public String login(Request request, HttpServletResponse response){
        Boolean isLogin = iLoginService.doLogin(request);
        String result;
        if(isLogin){
            Cookie ck=new Cookie("ajkAuthTicket",request.getUsername());
            ck.setDomain("localhost");  //10.200.152.22
            ck.setPath("/");
            response.addCookie(ck);
            response.setHeader("location","index.html");
            response.setHeader("location","display.html");
            result = "<script type=\"text/javascript\">document.domain='localhost';\n" +
                    "parent.SDK_CALLBACK_FUN.successFun({\"code\":0,\"data\":{\"action\":\"1\",\"requesthost\":\"cloud-passport.anjuke.com\"},\"msg\":\"登录成功\"})</script>";
        }else {
            result = "<script type=\"text/javascript\">document.domain='localhost';\n" +
                    "parent.SDK_CALLBACK_FUN.successFun({\"code\":772,\"data\":{\"action\":\"1\",\"requesthost\":\"cloud-passport.anjuke.com\"},\"msg\":\"登录失败，账号和密码错误\"})</script>";
        }
        return result;
    }
    @RequestMapping("ajk/zhuce")
    @ResponseBody
    public String zhuce(Request request,HttpServletResponse response){
        Boolean register = iLoginService.register(request);
        String result = null;
        if(register){
            result = "<script type=\"text/javascript\">document.domain='localhost';\n" +
                    "parent.SDK_CALLBACK_FUN.successFun({\"code\":772,\"data\":{\"action\":\"1\",\"requesthost\":\"cloud-passport.anjuke.com\"},\"msg\":\"注册成功\"})</script>";
        }else {
            result = "<script type=\"text/javascript\">document.domain='localhost';\n" +
                    "parent.SDK_CALLBACK_FUN.successFun({\"code\":772,\"data\":{\"action\":\"1\",\"requesthost\":\"cloud-passport.anjuke.com\"},\"msg\":\"账号重复，注册失败\"})</script>";
        }
        return result;
    }
}
