package com.cy.pj.sys.service;

import com.cy.pj.sys.entity.SysRole;

public interface IRoomDisplayService {
    SysRole getRoomDisplay(String from);

    Boolean subscribeRoom(String type);
}
