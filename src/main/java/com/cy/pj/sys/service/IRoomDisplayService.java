package com.cy.pj.sys.service;

import com.cy.pj.sys.entity.SysRoom;

public interface IRoomDisplayService {
    SysRoom getRoomDisplay(String from);

    Boolean subscribeRoom(String type);
}
