package com.cy.pj.sys.controller;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.entity.SysUser;
import com.cy.pj.sys.service.SysUserService;

@Controller
@RequestMapping("/employee/")
public class SysUserController {
	//todo 员工管理
	@Autowired
	private SysUserService sysUserService;
	@RequestMapping("doEmployeeListUI")
	public String doEmployeeListUI() {
		return "employee_list";
	}
	@RequestMapping("doEmployeeEditUI")
	public String doEmployeeEditUI() {
		return "employee_edit";
	}
	@RequestMapping("doSaveObject")
	@ResponseBody
	public JsonResult doSaveObject(SysUser entity) {
		sysUserService.saveObject(entity);
		return new JsonResult("insert ok");
	}
	@RequestMapping("doValidById")
	@ResponseBody
	public JsonResult doValidById(
			Integer id,Integer valid) {
		sysUserService.validById(id,
				valid,"admin");
		return new JsonResult("update ok");
	}
	@RequestMapping("doFindPageObjects")
	@ResponseBody
	public JsonResult doFindPageObjects(String username, Integer pageCurrent) {
		return new JsonResult(sysUserService.findPageObjects(username, pageCurrent));
	}
	@RequestMapping("doFindObjectById")
	@ResponseBody
	public JsonResult doFindObjectById(
			Long id){
		Map<String,Object> map=
				sysUserService.findObjectById(id);
		return new JsonResult(map);
	}

	@RequestMapping("doUpdateObject")
	@ResponseBody
	public JsonResult doUpdateObject(SysUser entity){
		sysUserService.updateObject(entity);
		return new JsonResult("update ok");
	}
	/*@RequestMapping("doUpdateObject")
	@ResponseBody
	public JsonResult doUpdateObject(
			SysUser entity,Integer[] roleIds){
		sysUserService.updateObject(entity,
				roleIds);
		return new JsonResult("update ok");
	}*/


}
