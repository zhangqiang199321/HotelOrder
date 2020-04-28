package com.cy.pj.sys.dao;
import java.util.List;

import com.cy.pj.sys.entity.SysRoom;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.cy.pj.common.vo.CheckBox;

@Mapper
public interface SysRoomDao {

	  /**查询所有角色信息*/
	  @Select("select id,name from sys_roles")
	  List<CheckBox> findObjects();

	  /**更新角色自身信息*/
	  int updateObject(SysRoom entity);

	  /**
	   * 基于角色id获取客房信息
	   * @param hotelId
	   * @return
	   */
	  SysRoom findObjectById(Long hotelId);

	  /**保存客房自身信息*/
	  int insertObject(SysRoom entity);

	  /**基于id执行角色id删除*/
	  int deleteObject(Long hotelId);

	
	  int getRowCount(@Param("hotelType")String hotelType);

	  List<SysRoom> findPageObjects(@Param("hotelType")String hotelType, @Param("startIndex")Integer startIndex, @Param("pageSize")Integer pageSize);
}
