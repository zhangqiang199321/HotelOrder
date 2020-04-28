package com.cy.pj.sys.service.impl;

import com.cy.pj.sys.dao.RoomDisplayDao;
import com.cy.pj.sys.entity.SysRoom;
import com.cy.pj.sys.service.IRoomTypeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 根据前端的需求类型返回相应的房型信息
 * 并且对首页的页面展示进行更改
 */
@Service
public class RoomTypeService implements IRoomTypeService {
    @Resource
    RoomDisplayDao roomDisplayDao;
    @Override
    public List<SysRoom> getRoomType(String need) {
        List<SysRoom> roomList = new ArrayList<SysRoom>();
        Integer start = 0;
        Integer end = 9999;
        String topic = null;
        String type = null;
        if(null != need){
            String[] split = need.split("-");
            for (int i = 0; i < split.length; i++) {
                switch (split[i]) {
                    case "zj200":
                        start = 0;
                        end = 9999;
                        break;
                    case "zj201":
                        start = 0;
                        end = 200;
                        break;
                    case "zj202":
                        start = 200;
                        end = 300;
                        break;
                    case "zj203":
                        start = 300;
                        end = 500;
                        break;
                    case "zj204":
                        start = 500;
                        end = 1000;
                        break;
                    case "zj205":
                        start = 1000;
                        end = 9999;
                        break;
                    case "x0":
                        topic = null;
                        break;
                    case "x1":
                        topic = "优惠";
                        break;
                    case "x2":
                        topic = "主题";
                        break;
                    case "fx0":
                        type = null;
                        break;
                    case "fx1":
                        type = "标间";
                        break;
                    case "fx2":
                        type = "大床房";
                        break;
                    case "fx3":
                        type = "三床房";
                        break;
                }
            }
        }
        getRoomByPrice(start,end,topic,type,roomList);
        return roomList;
    }

    private List<SysRoom> getRoomByPrice(Integer start, Integer end, String topic, String type, List<SysRoom> value) {
        List<SysRoom> objectByPrice = roomDisplayDao.findObjectByPrice(start, end,topic,type);
        for (int i = 0; i < objectByPrice.size(); i++) {
            value.add(objectByPrice.get(i));
        }
        return value;
    }
}
