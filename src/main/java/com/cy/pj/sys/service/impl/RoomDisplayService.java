package com.cy.pj.sys.service.impl;

import com.cy.pj.sys.entity.RoomDisplay;
import com.cy.pj.sys.service.IRoomDisplayService;
import org.springframework.stereotype.Service;

@Service
public class RoomDisplayService implements IRoomDisplayService {
    @Override
    public RoomDisplay getRoomDisplay(String from) {
        RoomDisplay roomDisplay = new RoomDisplay();
        roomDisplay.setId("123");
        roomDisplay.setTitle("【多图】颐和美地西区，百家湖租房，毕业生专属福利 百家湖颐和美地西区 九龙湖站 近地铁 生活便，江宁租房-南京58安居客");
        roomDisplay.setSpecial("毕业生专属福利 百家湖颐和美地西区 九龙湖站 近地铁 生活便");
        roomDisplay.setPrice("200");
        roomDisplay.setMianji("80");
        return roomDisplay;
    }
}
