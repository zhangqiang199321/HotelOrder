package com.cy.pj.sys.controller;
import com.cy.pj.sys.entity.Vip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.service.VipService;

import java.util.Map;

@Controller
@RequestMapping("/vip/")
public class VipController {
	 @Autowired
	 private VipService vipService;

	 @RequestMapping("doVipListUI")
	 public String doVipListUI() {
		 return "sys/vip_list";
	 }
	
	 @RequestMapping("doVipEditUI")
	 public String doVipEditUI() {
		 return "sys/vip_edit";
	 }

	 @RequestMapping("doUpdateObject")
	 @ResponseBody
	 public JsonResult doUpdateObject(Vip entity) {
		 vipService.updateObject(entity);
		 return new JsonResult("update ok");
	 }

	 @RequestMapping("doSaveObject")
	 @ResponseBody
	 public JsonResult doSaveObject(Vip entity) {
		 vipService.saveObject(entity);
		 return new JsonResult("save ok");
	 }


    @RequestMapping("doFindPageObjects")
    @ResponseBody
    public JsonResult doFindPageObjects(String account, Integer pageCurrent) {
        return new JsonResult(vipService.doFindPageObjects(account, pageCurrent));
    }

    @RequestMapping("doFindObjectById")
    @ResponseBody
    public JsonResult doFindObjectById(
            Long id){
        Map<String,Object> map= vipService.findObjectById(id);
        return new JsonResult(map);
    }

}



