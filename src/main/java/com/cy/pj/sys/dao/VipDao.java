package com.cy.pj.sys.dao;
import java.util.List;
import java.util.Map;

import com.cy.pj.sys.entity.Vip;
import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.cy.pj.common.vo.Node;

/**
  * 菜单的数据访问层对象
 * @author Administrator
 */
@Mapper
@CacheNamespace
public interface VipDao {

	int updateObject(Vip entity);

	int insertObject(Vip entity);

    List<Vip> findPageObjects(@Param("account")String account, @Param("startIndex")Integer startIndex, @Param("pageSize")Integer pageSize);

    int getRowCount(@Param("account")String account);

    Vip findObjectById(Long id);
}






