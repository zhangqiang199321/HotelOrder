package com.cy.pj.sys.service.impl;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.RoomEntity;
import com.cy.pj.sys.service.IRoomTypeService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 根据前端的需求类型返回相应的房型信息
 * 并且对首页的页面展示进行更改
 */
@Service
public class RoomTypeService implements IRoomTypeService {
    @Override
    public List<RoomEntity> getRoomType(String type) {
        List<RoomEntity> roomList = null;
        if(null != type){
            roomList = getTypeByPrice(type);
        }
        return roomList;
    }

    private List<RoomEntity> getTypeByPrice(String type) {
        List<RoomEntity> roomList = new ArrayList<RoomEntity>();
        RoomEntity sss = new RoomEntity();
        if("111".equals(type)){
            RoomEntity roomEntity = new RoomEntity();
            roomEntity.setName("百家湖公寓");
            roomEntity.setPrice("200");
            roomEntity.setTopic(1);
            roomEntity.setType(1);
            roomEntity.setPriceType(2);
            roomEntity.setRoomUrl("123");
            sss.setName("百家湖公寓1");
            sss.setPrice("200");
            sss.setTopic(1);
            sss.setType(1);
            sss.setPriceType(2);
            sss.setRoomUrl("123");
            roomList.add(roomEntity);
            roomList.add(sss);
        }else{
            sss.setName("百家湖公寓1");
            sss.setPrice("200");
            sss.setTopic(1);
            sss.setType(1);
            sss.setPriceType(2);
            sss.setRoomUrl("123");
            roomList.add(sss);
        }


        return roomList;
    }
}
