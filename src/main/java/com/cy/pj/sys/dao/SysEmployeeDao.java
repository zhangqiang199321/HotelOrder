package com.cy.pj.sys.dao;
import java.util.List;

import com.cy.pj.sys.entity.SysEmployee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface SysEmployeeDao {
	  int updateObject(SysEmployee entity);

    SysEmployee findObjectById(Long id);

	   /**
	    * 保存用户自身信息
	    * @param entity
	    * @return
	    */
	   int insertObject(SysEmployee entity);
	   /**
	    * 禁用启用用户信息
	    * @param id 用户id
	    * @param valid 状态信息(禁用,启用)
	    * @param modifiedUser 登录用户
	    * @return 更新的行数
	    */
	   @Update("update sys_users set valid=#{valid},modifiedUser=#{modifiedUser},modifiedTime=now() where id=#{id}")
	   int validById(
			   @Param("id")Integer id,
			   @Param("valid")Integer valid,
			   @Param("modifiedUser")String modifiedUser);
	   
	   int getRowCount(@Param("employeeName")String employeeName);

	   List<SysEmployee> findPageObjects(@Param("employeeName")String employeeName, @Param("startIndex")Integer startIndex, @Param("pageSize")Integer pageSize);
}
