package com.cy.pj.sys.service.impl;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.dao.RoomDisplayDao;
import com.cy.pj.sys.entity.RoomEntity;
import com.cy.pj.sys.entity.SysRole;
import com.cy.pj.sys.service.IRoomTypeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 根据前端的需求类型返回相应的房型信息
 * 并且对首页的页面展示进行更改
 */
@Service
public class RoomTypeService implements IRoomTypeService {
    @Resource
    RoomDisplayDao roomDisplayDao;
    @Override
    public List<SysRole> getRoomType(String need) {
        List<SysRole> roomList = new ArrayList<SysRole>();
        Integer start = null;
        Integer end = null;
        Integer topic = null;
        Integer type = null;
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
                        topic = 0;
                        break;
                    case "x1":
                        topic = 1;
                        break;
                    case "x2":
                        topic = 2;
                        break;
                    case "fx0":
                        type = 0;
                        break;
                    case "fx1":
                        type = 1;
                        break;
                    case "fx2":
                        type = 2;
                        break;
                }
            }
        }
        getRoomByPrice(start,end,topic,type,roomList);
        return roomList;
    }

    private List<SysRole> getRoomByPrice(Integer start,Integer end,Integer topic,Integer type,List<SysRole> value) {
        List<SysRole> objectByPrice = roomDisplayDao.findObjectByPrice(start, end,topic,type);
        for (int i = 0; i < objectByPrice.size(); i++) {
            value.add(objectByPrice.get(i));
        }
        return value;
    }

    private List<SysRole> getRoomByTopic(int topic,List<SysRole> value) {
        List<SysRole> objectByTopic = roomDisplayDao.findObjectByTopic(topic);
        for (int i = 0; i < objectByTopic.size(); i++) {
            value.add(objectByTopic.get(i));
        }
        return value;
    }

    private Set<SysRole> getRoomByType(int type,Set<SysRole> value) {
        List<SysRole> objectByTopic = roomDisplayDao.findObjectByType(type);
        for (int i = 0; i < objectByTopic.size(); i++) {
            value.add(objectByTopic.get(i));
        }
        return value;
    }
}
