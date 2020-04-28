package com.cy.pj.sys.service.impl;

import com.cy.pj.sys.dao.LoginDao;
import com.cy.pj.sys.entity.Request;
import com.cy.pj.sys.entity.Vip;
import com.cy.pj.sys.service.ILoginService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class LoginService implements ILoginService {
    @Resource
    LoginDao loginDao;

    @Override
    public Boolean doLogin(Request request) {
        if(request == null){
            return false;
        }
        String username = request.getUsername();
        String password = loginDao.findPassWordByUserName(username);
        if(password != null){
            if(password.equals(request.getPassword())){
                return true;
            }
        }
        return false;
    }

    @Override
    public Boolean register(Request request) {
        if(request == null){
            return false;
        }
        String username = request.getUsername();
        Integer numByUsername = loginDao.findNumByUsername(username);
        if(numByUsername == 0){
            Vip vip = new Vip();
            vip.setAccount(request.getUsername());
            vip.setPassword(request.getPassword());
            Integer isRegister = loginDao.insertUsername(vip);
            if(isRegister == 1){
                return true;
            }
        }
        return false;
    }
}
