package com.cy.pj.sys.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cy.pj.common.exception.ServiceException;
import com.cy.pj.common.util.PageUtil;
import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.dao.LogDao;
import com.cy.pj.sys.entity.Log;
import com.cy.pj.sys.service.LogService;

import lombok.extern.slf4j.Slf4j;
@Service //===map.put("sysLogServiceImpl",object instance)
@Slf4j
public class LogServiceImpl implements LogService {

	@Autowired
	private LogDao logDao;

	@Override
	public PageObject<Log> findPageObjects(
		String username, Integer pageCurrent) {
		//1.参数校验
		if(pageCurrent==null||pageCurrent<1)
		throw new IllegalArgumentException("页码不正确");
		//2.查询总记录数并进行校验
		int rowCount= logDao.getRowCount(username);
		if(rowCount==0)
		throw new ServiceException("记录不存在");
		//3.查询当前页要呈现的记录
		//3.1页面大小,例如每页最多显示3条
		int pageSize=PageUtil.getPageSize();
		//3.2当前页起始位置
		int startIndex=PageUtil.getStartIndex(pageCurrent);
		List<Log> records=
		logDao.findPageObjects(username,
				startIndex,pageSize);
		//4.对查询结果进行计算和封装并返回
		return PageUtil.newPageObject(
	    pageCurrent, rowCount, pageSize, records);
	}

	@Override
	public int deleteObjects(Integer... ids) {
		//1.参数校验(参数校验)
		//2.执行删除
		int rows= logDao.deleteObjects(ids);
		if(rows>0) {
		log.info("delete ok,rows="+rows);
		}
		//3.验证并返回结果
		return rows;
	}
}
