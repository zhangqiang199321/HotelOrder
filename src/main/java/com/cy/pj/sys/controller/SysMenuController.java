package com.cy.pj.sys.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.SysMenu;
import com.cy.pj.sys.service.SysMenuService;

import java.util.Map;

@Controller
@RequestMapping("/vip/")
/*@RequestMapping("/menu/")*/
public class SysMenuController {
	 @Autowired
	 private SysMenuService sysMenuService;
	 @RequestMapping("doMenuListUI")
	 public String doMenuListUI() {
		 return "sys/menu_list";
	 }
	
	 @RequestMapping("doMenuEditUI")
	 public String doMenuEditUI() {
		 return "sys/menu_edit";
	 }
	 @RequestMapping("doUpdateObject")
	 @ResponseBody
	 public JsonResult doUpdateObject(SysMenu entity) {
		 sysMenuService.updateObject(entity);
		 return new JsonResult("update ok");
	 }
	 @RequestMapping("doSaveObject")
	 @ResponseBody
	 public JsonResult doSaveObject(SysMenu entity) {
		 sysMenuService.saveObject(entity);
		 return new JsonResult("save ok");
	 }
	 @RequestMapping("doFindZtreeMenuNodes")
	 @ResponseBody
	 public JsonResult doFindZtreeMenuNodes() {
		 return new JsonResult(sysMenuService.findZtreeMenuNodes());
	 }

	 /*@RequestMapping("doFindObjects")
	 @ResponseBody
	 public JsonResult doFindObjects() {
		 return new JsonResult(
		 sysMenuService.findObjects());
	 }*/

    @RequestMapping("doFindPageObjects")
    @ResponseBody
    public JsonResult doFindPageObjects(String account, Integer pageCurrent) {
        return new JsonResult(sysMenuService.doFindPageObjects(account, pageCurrent));
    }

    @RequestMapping("doFindObjectById")
    @ResponseBody
    public JsonResult doFindObjectById(
            Long id){
        Map<String,Object> map=
                sysMenuService.findObjectById(id);
        return new JsonResult(map);
    }

}



