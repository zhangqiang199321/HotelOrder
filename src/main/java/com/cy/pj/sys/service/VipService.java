package com.cy.pj.sys.service;
import java.util.List;
import java.util.Map;

import com.cy.pj.common.vo.Node;
import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.entity.Vip;

public interface VipService {
	/**
	  *  更新菜单信息到数据库
	 * @param entity
	 * @return
	 */
	int updateObject(Vip entity);
	 /**
	    * 保存菜单信息到数据库
	  * @param entity
	  * @return
	  */
	 int saveObject(Vip entity);
	
	 /**查询所有菜单信息并呈现treegrid中*/
	 /*List<Map<String,Object>> findObjects();*/
	 /**查询所有菜单id,name,parentId呈现在zTree中*/
	 List<Node> findZtreeMenuNodes();

	PageObject<Vip> doFindPageObjects(
			String account,
			Integer pageCurrent);

    Map<String, Object> findObjectById(
            Long id);
}
