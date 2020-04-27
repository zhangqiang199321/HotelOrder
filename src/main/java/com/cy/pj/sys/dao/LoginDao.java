package com.cy.pj.sys.dao;

import com.cy.pj.sys.entity.SysMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginDao {
    String findPassWordByUserName(@Param("username")String username);

    Integer findNumByUsername(@Param("username")String username);

    int insertUsername(SysMenu sysMenu);
}
