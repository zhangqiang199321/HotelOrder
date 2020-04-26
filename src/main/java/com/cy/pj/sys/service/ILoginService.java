package com.cy.pj.sys.service;


import com.cy.pj.sys.entity.Request;

public interface ILoginService {
    Boolean doLogin(Request request);

    Boolean register(Request request);
}
