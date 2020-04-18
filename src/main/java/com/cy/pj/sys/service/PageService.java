package com.cy.pj.sys.service;

import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.vo.EmployeeVo;

/**
  *  用户行为日志业务
 * @author Administrator
 */
public interface PageService<T> {
	/**
	 * 执行分页查询
	 * @param username
	 * @param pageCurrent
	 * @return
	 */
	PageObject<EmployeeVo> findPageObjects(
			 String username,
			 Integer pageCurrent);
	
}





