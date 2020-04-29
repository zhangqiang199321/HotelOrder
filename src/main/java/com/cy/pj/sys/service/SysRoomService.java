package com.cy.pj.sys.service;

import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.entity.SysRoom;


public interface SysRoomService {
	
	/**
	 * 基于id查询客房
	 * @param hotelId
	 * @return
	 */
	SysRoom findObjectById(Long hotelId);

	/**
	 * 更新
	 * @param entity
	 * @param
	 * @return
	 */
	int updateObject(SysRoom entity);
	
	/**
	 * 保存信息
	 * @param entity
	 * @return
	 */
	int saveObject(SysRoom entity);
	
	/**
	 * 基于id删除数据
	 * @param hotelId
	 * @return
	 */
	int deleteObject(Long hotelId);
	
	/**
	 * 执行分页查询
	 * @param
	 * @param pageCurrent
	 * @return
	 */
	PageObject<SysRoom> findPageObjects(String hotelType, Integer pageCurrent);
	
}





