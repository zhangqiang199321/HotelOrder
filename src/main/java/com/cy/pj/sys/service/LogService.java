package com.cy.pj.sys.service;

import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.entity.Log;

/**
  *  用户行为日志业务
 * @author Administrator
 */
public interface LogService {
	/**
	 * 执行分页查询
	 * @param username
	 * @param pageCurrent
	 * @return
	 */
	PageObject<Log> findPageObjects(
			 String username,
			 Integer pageCurrent);
	
	 /**
	      * 基于用户传入的多个id执行日志删除业务
	   * @param ids
	   * @return
	   */
	 int deleteObjects(Integer...ids);
}





