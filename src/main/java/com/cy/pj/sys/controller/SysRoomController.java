package com.cy.pj.sys.controller;

import com.cy.pj.sys.entity.SysRoom;
import com.cy.pj.sys.service.SysRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cy.pj.common.vo.JsonResult;

@Controller
@RequestMapping("/room/")
public class SysRoomController {
	//todo 客房类型管理
	@Autowired
    private SysRoomService sysRoomService;

	@RequestMapping("doRoomListUI")
	public String doRoomListUI() {
		return "sys/room_list";
	}
	@RequestMapping("doRoomEditUI")
	public String doRoomEditUI() {
		return "sys/room_edit";
	}
	@RequestMapping("doFindRoles")
	@ResponseBody
	public JsonResult doFindRooms() {
		return new JsonResult(sysRoomService.findObjects());
	}
	
	@RequestMapping("doFindObjectById")
    @ResponseBody
    public JsonResult doFindObjectById(Long hotelId) {
        return new JsonResult(sysRoomService.findObjectById(hotelId));
    }

	@RequestMapping("doUpdateObject")
	@ResponseBody
	public JsonResult doUpdateObject(SysRoom entity) {
		sysRoomService.updateObject(entity);
		return new JsonResult("update ok");
	}
	
	@RequestMapping("doSaveObject")
	@ResponseBody
	public JsonResult doSaveObject(SysRoom entity) {
		sysRoomService.saveObject(entity);
		return new JsonResult("save  ok");
	}


	@RequestMapping("doDeleteObject")
	@ResponseBody
	public JsonResult doDeleteObject(Long hotelId) {
		sysRoomService.deleteObject(hotelId);
		return new JsonResult("delete ok");
	}

	@RequestMapping("doFindPageObjects")
	@ResponseBody
	public JsonResult doFindPageObjects(String hotelType,Integer pageCurrent) {
		return new JsonResult(sysRoomService.findPageObjects(hotelType, pageCurrent));
	}
}
