package com.cy.pj.sys.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.cy.pj.common.vo.JsonResult;
import com.cy.pj.sys.service.LogService;
@Controller //bean
@RequestMapping("/log/")
public class LogController {
	 @Autowired
     private LogService logService;
	 /**返回日志列表页面*/
	 @RequestMapping("doLogListUI")
	 public String doLogListUI() {
		 return "sys/log_list";
	 }
	 
	 @RequestMapping("doFindPageObjects")
	 @ResponseBody
	 public JsonResult doFindPageObjects(
			 String username,
			 Integer pageCurrent){
		 System.out.println("username="+username);
		 return new JsonResult(logService.findPageObjects(
				 username,pageCurrent));
	 }
	 //.../log/doDeleteObjects?ids=19,20
	 @RequestMapping("doDeleteObjects")
	 @ResponseBody
	 public JsonResult doDeleteObjects(
			 Integer...ids) {//1,2,3,4
		int rows= logService.deleteObjects(ids);
		return new JsonResult("delete ok,rows="+rows);
	 }
	 
}
