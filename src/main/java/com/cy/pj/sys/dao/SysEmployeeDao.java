package com.cy.pj.sys.dao;
import java.util.List;

import com.cy.pj.sys.entity.SysEmployee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SysEmployeeDao {
	  int updateObject(SysEmployee entity);

	  SysEmployee findObjectById(Long id);

	   /**
	    * 保存信息
	    * @param entity
	    * @return
	    */
	   int insertObject(SysEmployee entity);

	   
	   int getRowCount(@Param("employeeName")String employeeName);

	   List<SysEmployee> findPageObjects(@Param("employeeName")String employeeName, @Param("startIndex")Integer startIndex, @Param("pageSize")Integer pageSize);
}
