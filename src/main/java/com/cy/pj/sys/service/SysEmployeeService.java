package com.cy.pj.sys.service;

import java.util.Map;

import com.cy.pj.sys.entity.SysEmployee;

public interface SysEmployeeService extends PageService<SysEmployee>{

	int updateObject(SysEmployee entity);

	Map<String, Object> findObjectById(Long userId);

	int saveObject(SysEmployee entity);

}
