package com.cy.pj.sys.service.impl;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cy.pj.common.exception.ServiceException;
import com.cy.pj.common.util.PageUtil;
import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.entity.Vip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.cy.pj.common.vo.Node;
import com.cy.pj.sys.dao.VipDao;
import com.cy.pj.sys.service.VipService;
@Service
public class VipServiceImpl implements VipService {
    @Autowired
	private VipDao vipDao;
    @Override
    public int saveObject(Vip entity) {
    	//1.参数校验
    	if(entity==null)
    	throw new IllegalArgumentException("保存对象不能为空");
    	if(StringUtils.isEmpty(entity.getAccount()))
    	throw new IllegalArgumentException("用户名不能为空");
    	if(StringUtils.isEmpty(entity.getPassword()))
    	throw new IllegalArgumentException("密码不能为空");
    	//2.持久化数据
    	int rows= vipDao.insertObject(entity);
    	return rows;
    }
    @Override
    public int updateObject(Vip entity) {
    	//1.参数校验
    	if(entity==null)
    		throw new IllegalArgumentException("保存对象不能为空");
    	if(StringUtils.isEmpty(entity.getAccount()))
    		throw new IllegalArgumentException("用户名不能为空");
    	if(StringUtils.isEmpty(entity.getPassword()))
    		throw new IllegalArgumentException("密码不能为空");
    	//2.持久化数据
    	int rows= vipDao.updateObject(entity);
    	return rows;
    }
   
	@Override
	public List<Node> findZtreeMenuNodes() {
		return vipDao.findZtreeMenuNodes();
	}


    @Transactional(readOnly = false)
    @Override
    public PageObject<Vip> doFindPageObjects(String account, Integer pageCurrent) {
        //1.参数校验
        if(pageCurrent==null||pageCurrent<1)
            throw new IllegalArgumentException("页码不正确");
        //2.查询总记录数并进行校验
        int rowCount= vipDao.getRowCount(account);
        if(rowCount==0)
            throw new ServiceException("记录不存在");
        //3.查询当前页要呈现的记录
        //3.1页面大小,例如每页最多显示3条
        int pageSize= PageUtil.getPageSize();
        //3.2当前页起始位置
        int startIndex=PageUtil.getStartIndex(pageCurrent);
        List<Vip> records=
                vipDao.findPageObjects(account,
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
        Vip vip =
                vipDao.findObjectById(id);
        if(vip ==null)
            throw new ServiceException("此用户已经不存在");
        //3.数据封装
        Map<String,Object> map=new HashMap<>();
        map.put("sysMenu", vip);
        return map;
    }
}







