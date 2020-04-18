package com.cy.pj.sys.controller;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.LoginEntity;
import com.cy.pj.sys.entity.Request;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/")
public class IndexController {
    @RequestMapping("/{page}")
    public String save(@PathVariable String page){
        return page;
    }
    @RequestMapping("ajk/mobile/pc/login")
    @ResponseBody
    public String login(Request request){
        LoginEntity loginEntity = new LoginEntity();
        loginEntity.setAction("1");
        loginEntity.setRequesthost("cloud-passport.anjuke.com");
        JsonResult jsonResult = new JsonResult();
        jsonResult.setCode(772);
        jsonResult.setMessage("该用户名与密码不符");
        jsonResult.setData(loginEntity);
        String sss = "<script type=\"text/javascript\">document.domain='localhost';\n" +
                "parent.SDK_CALLBACK_FUN.successFun({\"code\":0,\"data\":{\"action\":\"1\",\"requesthost\":\"cloud-passport.anjuke.com\"},\"msg\":\"该用户名与密码不符\"})</script>";
        return sss;
    }
    @RequestMapping("/login/success")
    public void success(String  account, HttpServletResponse response) throws IOException {
        response.sendRedirect("index");
    }
}
