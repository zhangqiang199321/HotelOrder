package com.cy.pj.sys.service.impl;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cy.pj.common.exception.ServiceException;
import com.cy.pj.common.util.PageUtil;
import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.vo.EmployeeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.cy.pj.common.vo.Node;
import com.cy.pj.sys.dao.SysMenuDao;
import com.cy.pj.sys.entity.SysMenu;
import com.cy.pj.sys.service.SysMenuService;
@Service
public class SysMenuServiceImpl implements SysMenuService {
    @Autowired
	private SysMenuDao sysMenuDao;
    @Override
    public int saveObject(SysMenu entity) {
    	//1.参数校验
    	if(entity==null)
    	throw new IllegalArgumentException("保存对象不能为空");
    	if(StringUtils.isEmpty(entity.getAccount()))
    	throw new IllegalArgumentException("用户名不能为空");
    	if(StringUtils.isEmpty(entity.getPassword()))
    	throw new IllegalArgumentException("密码不能为空");
    	//2.持久化数据
    	int rows=sysMenuDao.insertObject(entity);

		/*//1.参数校验
		if(entity==null)
			throw new IllegalArgumentException("保存对象不能为空");
		if(StringUtils.isEmpty(entity.getName()))
			throw new IllegalArgumentException("菜单名不能为空");
		if(StringUtils.isEmpty(entity.getPermission()))
			throw new IllegalArgumentException("权限标识不能为空");
		//2.持久化数据
		int rows=sysMenuDao.insertObject(entity);*/

    	//3.返回结果
    	return rows;
    }
    @Override
    public int updateObject(SysMenu entity) {
    	//1.参数校验
    	if(entity==null)
    		throw new IllegalArgumentException("保存对象不能为空");
    	if(StringUtils.isEmpty(entity.getAccount()))
    		throw new IllegalArgumentException("用户名不能为空");
    	if(StringUtils.isEmpty(entity.getPassword()))
    		throw new IllegalArgumentException("密码不能为空");
    	//2.持久化数据
    	int rows=sysMenuDao.updateObject(entity);

       /* //1.参数校验
        if(entity==null)
            throw new IllegalArgumentException("保存对象不能为空");
        if(StringUtils.isEmpty(entity.getName()))
            throw new IllegalArgumentException("菜单名不能为空");
        if(StringUtils.isEmpty(entity.getPermission()))
            throw new IllegalArgumentException("权限标识不能为空");
        //2.持久化数据
        int rows=sysMenuDao.updateObject(entity);*/

    	//3.返回结果
    	return rows;
    }
   
	/*@Override
	public List<Map<String, Object>> findObjects() {
		List<Map<String, Object>> list=
		sysMenuDao.findObjects();
		return list;
	}*/
	@Override
	public List<Node> findZtreeMenuNodes() {
		return sysMenuDao.findZtreeMenuNodes();
	}


    @Transactional(readOnly = false)
    @Override
    public PageObject<SysMenu> doFindPageObjects(String account, Integer pageCurrent) {
        //1.参数校验
        if(pageCurrent==null||pageCurrent<1)
            throw new IllegalArgumentException("页码不正确");
        //2.查询总记录数并进行校验
        int rowCount=sysMenuDao.getRowCount(account);
        if(rowCount==0)
            throw new ServiceException("记录不存在");
        //3.查询当前页要呈现的记录
        //3.1页面大小,例如每页最多显示3条
        int pageSize= PageUtil.getPageSize();
        //3.2当前页起始位置
        int startIndex=PageUtil.getStartIndex(pageCurrent);
        List<SysMenu> records=
                sysMenuDao.findPageObjects(account,
                        startIndex,pageSize);
        System.out.println(records);
        //4.对查询结果进行计算和封装并返回
        return PageUtil.newPageObject(
                pageCurrent, rowCount, pageSize, records);
    }

    @Override
    public Map<String, Object> findObjectById(Long id) {
        //1.合法性验证
        if(id==null||id<=0)
            throw new ServiceException("参数数据不合法,id="+id);
        //2.业务查询
        SysMenu sysMenu=
                sysMenuDao.findObjectById(id);
        if(sysMenu==null)
            throw new ServiceException("此用户已经不存在");
        //3.数据封装
        Map<String,Object> map=new HashMap<>();
        map.put("sysMenu", sysMenu);
        return map;
    }
}







