package com.cy.pj.sys.service;

import java.util.Map;


import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.entity.Vip;

public interface VipService {
	/**
	  *  更新
	 * @param entity
	 * @return
	 */
	int updateObject(Vip entity);
	 /**
	    * 保存
	  * @param entity
	  * @return
	  */
	 int saveObject(Vip entity);


	PageObject<Vip> doFindPageObjects(String account, Integer pageCurrent);

    Map<String, Object> findObjectById(Long id);
}
