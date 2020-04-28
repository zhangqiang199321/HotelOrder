package com.cy.pj.sys.service;

import java.util.Map;

import com.cy.pj.sys.entity.SysEmployee;
import com.cy.pj.sys.vo.SysUserDeptVo;

public interface SysEmployeeService extends PageService<SysUserDeptVo>{

	int updateObject(SysEmployee entity);

	Map<String, Object> findObjectById(Long userId);

	int saveObject(SysEmployee entity);
	
	int validById(Integer id, Integer valid, String modifiedUser);

}
