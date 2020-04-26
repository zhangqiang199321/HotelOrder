package com.cy.pj.sys.service.impl;

import com.cy.pj.sys.dao.RoomDisplayDao;
import com.cy.pj.sys.entity.RoomDisplay;
import com.cy.pj.sys.service.IRoomDisplayService;
import org.springframework.context.annotation.PropertySources;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class RoomDisplayService implements IRoomDisplayService {
    @Resource
    RoomDisplayDao roomDisplayDao;
    @Override
    public RoomDisplay getRoomDisplay(String from) {
        RoomDisplay roleIdsByUserId = roomDisplayDao.findRoomDisplayByHotelId(from);
        return roleIdsByUserId;
    }
}
