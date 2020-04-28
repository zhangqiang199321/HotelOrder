package com.cy.pj.sys.controller;
import java.util.Map;

import com.cy.pj.sys.entity.SysEmployee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.service.SysEmployeeService;

@Controller
@RequestMapping("/employee/")
public class SysEmployeeController {
	//todo 员工管理
	@Autowired
	private SysEmployeeService sysEmployeeService;
	@RequestMapping("doEmployeeListUI")
	public String doEmployeeListUI() {
		return "sys/employee_list";
	}
	@RequestMapping("doEmployeeEditUI")
	public String doEmployeeEditUI() {
		return "sys/employee_edit";
	}
	@RequestMapping("doSaveObject")
	@ResponseBody
	public JsonResult doSaveObject(SysEmployee entity) {
		sysEmployeeService.saveObject(entity);
		return new JsonResult("insert ok");
	}
	@RequestMapping("doValidById")
	@ResponseBody
	public JsonResult doValidById(
			Integer id,Integer valid) {
		sysEmployeeService.validById(id,
				valid,"admin");
		return new JsonResult("update ok");
	}
	@RequestMapping("doFindPageObjects")
	@ResponseBody
	public JsonResult doFindPageObjects(String employeeName, Integer pageCurrent) {
		return new JsonResult(sysEmployeeService.findPageObjects(employeeName, pageCurrent));
	}
	@RequestMapping("doFindObjectById")
	@ResponseBody
	public JsonResult doFindObjectById(
			Long id){
		Map<String,Object> map=
				sysEmployeeService.findObjectById(id);
		return new JsonResult(map);
	}

	@RequestMapping("doUpdateObject")
	@ResponseBody
	public JsonResult doUpdateObject(SysEmployee entity){
		sysEmployeeService.updateObject(entity);
		return new JsonResult("update ok");
	}
}
