package com.cy.pj.sys.service;

import java.util.List;

import com.cy.pj.common.vo.CheckBox;
import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.entity.SysRoom;

/**
  *  用户行为日志业务
 * @author Administrator
 */
public interface SysRoomService {
	/**
	 * 查询所有角色id,name
	 * @return
	 */
	List<CheckBox> findObjects();
	
	/**
	 * 基于角色id查询客房
	 * @param hotelId
	 * @return
	 */
	SysRoom findObjectById(Long hotelId);

	/**
	 * 更新角色以及对应的菜单信息
	 * @param entity
	 * @param
	 * @return
	 */
	int updateObject(SysRoom entity);
	
	/**
	 * 保存角色以及对应的菜单信息
	 * @param entity
	 * @return
	 */
	int saveObject(SysRoom entity);
	
	/**
	 * 基于角色id删除角色以及对应的关系数据
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
	PageObject<SysRoom> findPageObjects(
			 String hotelType,
			 Integer pageCurrent);
	
}





