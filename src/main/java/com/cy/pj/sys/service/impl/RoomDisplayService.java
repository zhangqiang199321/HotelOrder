package com.cy.pj.sys.service.impl;

import com.cy.pj.sys.dao.RoomDisplayDao;
import com.cy.pj.sys.entity.SysRoom;
import com.cy.pj.sys.service.IRoomDisplayService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class RoomDisplayService implements IRoomDisplayService {
    @Resource
    RoomDisplayDao roomDisplayDao;
    @Override
    public SysRoom getRoomDisplay(String from) {
        SysRoom roleIdsByUserId = roomDisplayDao.findRoomDisplayByHotelId(from);
        return roleIdsByUserId;
    }

    @Override
    public Boolean subscribeRoom(String type) {
        int i = roomDisplayDao.setOccupy(type);
        if(i == 1){
            return true;
        }
        return false;
    }
}
