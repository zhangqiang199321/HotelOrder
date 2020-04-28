package com.cy.pj.sys.service.impl;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cy.pj.sys.entity.SysEmployee;
import com.cy.pj.sys.vo.EmployeeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.cy.pj.common.annotation.RequiredLog;
import com.cy.pj.common.exception.ServiceException;
import com.cy.pj.common.util.PageUtil;
import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.dao.SysEmployeeDao;
import com.cy.pj.sys.service.SysEmployeeService;

@Transactional(timeout = 30, readOnly = false, isolation = Isolation.READ_COMMITTED, rollbackFor = Throwable.class,
               propagation = Propagation.REQUIRED)
@Service 
public class SysUserServiceImpl implements SysEmployeeService {
	@Autowired 
	private SysEmployeeDao sysEmployeeDao;

	@RequiredLog("update user")
	@Override
	public int updateObject(SysEmployee entity) {
        System.out.println(entity);
		//1.参数有效性验证
		if(entity==null)
			throw new IllegalArgumentException("保存对象不能为空");
		if(StringUtils.isEmpty(entity.getEmployeeName()))
			throw new IllegalArgumentException("用户名不能为空");
		//2.更新信息
		int rows= sysEmployeeDao.updateObject(entity);
		//4.返回结果
		return rows;
	}

    //readOnly表示大家可以并发访问数据
	@Transactional(readOnly = true)
    @Override
    public Map<String, Object> findObjectById(
            Long employeeId) {
        //1.合法性验证
        if(employeeId==null||employeeId<=0)
            throw new ServiceException("参数数据不合法,employeeId="+employeeId);
        //2.业务查询
        SysEmployee employee=
                sysEmployeeDao.findObjectById(employeeId);
        if(employee==null)
            throw new ServiceException("此员工已经不存在");
        //3.数据封装
        Map<String,Object> map=new HashMap<>();
        map.put("employee", employee);
        return map;
    }

	@RequiredLog("save user")
	@Override
	public int saveObject(SysEmployee entity) {
		//1.参数校验
		if(entity==null)
			throw new ServiceException("保存对象不能为空");
		if(StringUtils.isEmpty(entity.getEmployeeName()))
			throw new ServiceException("员工姓名不能为空");
		//2.将对象写入到数据库
		int rows= sysEmployeeDao.insertObject(entity);
		return rows;
	}

	@Override
	public int validById(Integer id, 
			Integer valid, 
			String modifiedUser) {
		//1.参数校验
		if(id==null||id<1)
			throw new IllegalArgumentException("id值不正确");
		if(valid!=1&&valid!=0)
			throw new IllegalArgumentException("状态值不正确");
		//2.修改状态
		int rows= sysEmployeeDao.validById(id, valid, modifiedUser);
		//3.返回结果
		if(rows==0)
			throw new ServiceException("记录可能已经不存在");
		return rows;
	}
	@RequiredLog("query user")
	@Transactional(readOnly = false)
	@Override
	public PageObject<SysEmployee> findPageObjects(String employeeName, Integer pageCurrent) {
		//1.参数校验
		if(pageCurrent==null||pageCurrent<1)
			throw new IllegalArgumentException("页码不正确");
		//2.查询总记录数并进行校验
		int rowCount= sysEmployeeDao.getRowCount(employeeName);
		if(rowCount==0)
			throw new ServiceException("记录不存在");
		//3.查询当前页要呈现的记录
		//3.1页面大小,例如每页最多显示3条
		int pageSize=PageUtil.getPageSize();
		//3.2当前页起始位置
		int startIndex=PageUtil.getStartIndex(pageCurrent);
		List<SysEmployee> records=
				sysEmployeeDao.findPageObjects(employeeName, startIndex,pageSize);
        System.out.println(records);
		//4.对查询结果进行计算和封装并返回
		return PageUtil.newPageObject(
				pageCurrent, rowCount, pageSize, records);
	}

}
