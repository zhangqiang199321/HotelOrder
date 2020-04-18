package com.cy.pj.sys.controller;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.RoomDisplay;
import com.cy.pj.sys.entity.RoomEntity;
import com.cy.pj.sys.service.IRoomDisplayService;
import com.cy.pj.sys.service.IRoomTypeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * 查找需求房型
 */
@Controller
@RequestMapping("/fangyuan")
public class RoomTypeController {

    @Resource
    public IRoomTypeService iRoomTypeService;

    @Resource
    IRoomDisplayService iRoomDisplayService;
    @RequestMapping("/jiangninga/{type}")
    @ResponseBody
    public JsonResult get(@PathVariable String type){
        List<RoomEntity> roomList = iRoomTypeService.getRoomType(type);
        JsonResult ok = new JsonResult(roomList);
        return ok;
    }

    @RequestMapping("/display/{from}")
    @ResponseBody
    public JsonResult getDisplay(@PathVariable String from){
        RoomDisplay roomDisplay = iRoomDisplayService.getRoomDisplay(from);
        JsonResult jsonResult = new JsonResult(roomDisplay);
        return jsonResult;
    }
}
