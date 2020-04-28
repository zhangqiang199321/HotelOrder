package com.cy.pj.sys.service.impl;

import java.util.List;

import com.cy.pj.sys.dao.SysRoomDao;
import com.cy.pj.sys.entity.SysRoom;
import com.cy.pj.sys.service.SysRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cy.pj.common.annotation.RequiredLog;
import com.cy.pj.common.exception.ServiceException;
import com.cy.pj.common.util.PageUtil;
import com.cy.pj.common.vo.CheckBox;
import com.cy.pj.common.vo.PageObject;
import com.cy.pj.sys.dao.SysRoleMenuDao;
import com.cy.pj.sys.dao.SysUserRoleDao;

@Service
public class SysRoomServiceImpl implements SysRoomService {
	@Autowired
	private SysRoomDao sysRoomDao;//has a
	@Autowired
	private SysUserRoleDao sysUserRoleDao;
	@Autowired
	private SysRoleMenuDao sysRoleMenuDao;
	
	@Override
	public List<CheckBox> findObjects() {
		return sysRoomDao.findObjects();
	}


	@Override
	public SysRoom findObjectById(Long hotelId) {
		//1.参数校验
		if(hotelId==null || hotelId<1)
			throw new IllegalArgumentException("id值无效");
		SysRoom rm= sysRoomDao.findObjectById(hotelId);
		//3.返回结果
		if(rm==null)
			throw new ServiceException("没有找到对应结果");
		return rm;
	}


	@Override
	public int saveObject(SysRoom entity) {
		//1.参数校验
		if(entity==null)
		throw new IllegalArgumentException("保存对象不能为空");
		if(StringUtils.isEmpty(entity.getHotelType()))
		throw new IllegalArgumentException("房间类型不能为空");
		//2.保存数据
		int rows= sysRoomDao.insertObject(entity);
		//3.返回结果
		return rows;
	}


	@Override
	public int updateObject(SysRoom entity) {
		//1.参数校验
		if(entity==null)
			throw new IllegalArgumentException("保存对象不能为空");
		if(StringUtils.isEmpty(entity.getHotelType()))
			throw new IllegalArgumentException("房间类型不能为空");
		//2.保存数据
		//2.1保存角色自身信息
		int rows= sysRoomDao.updateObject(entity);
		//3.返回结果
		return rows;
	}

    /*@Override
    public int updateObject(SysRoom entity, Integer[] menuIds) {
        //1.参数校验
        if(entity==null)
            throw new IllegalArgumentException("保存对象不能为空");
        if(StringUtils.isEmpty(entity.getName()))
            throw new IllegalArgumentException("角色名不能为空");
        if(menuIds==null||menuIds.length==0)
            throw new IllegalArgumentException("必须为角色分配权限");
        //2.保存数据
        //2.1保存角色自身信息
        int rows=sysRoomDao.updateObject(entity);
        //2.2保存角色菜单关系数据
        sysRoleMenuDao.deleteObjectsByRoleId(entity.getId());
        sysRoleMenuDao.insertObjects(entity.getId(),
                menuIds);
        //3.返回结果
        return rows;
    }*/

	@Override
	public int deleteObject(Long hotelId) {
		//1.校验参数
		if(hotelId==null||hotelId<1)
		throw new IllegalArgumentException("id值无效");
		//2.执行删除(假如物理上没有关系,如下删除顺序没关系)
		//2.1删除角色和菜单的关系数据
//		sysRoleMenuDao.deleteObjectsByRoleId(hotelId);
		//2.2删除角色和用户的关系数据
//		sysUserRoleDao.deleteObjectsByRoleId(hotelId);
		//2.3删除角色自身信息
		int rows= sysRoomDao.deleteObject(hotelId);
		//3.返回结果
		if(rows==0)throw new ServiceException("记录可能已经不存在");
		return rows;
	}
	@RequiredLog("日志查询")
	@Override
	public PageObject<SysRoom> findPageObjects(
			String hotelType, Integer pageCurrent) {
		//1.参数校验
		if(pageCurrent==null||pageCurrent<1)
		throw new IllegalArgumentException("页码值不正确");
		//2.查询总记录数,并校验
		int rowCount= sysRoomDao.getRowCount(hotelType);
		if(rowCount==0)
		throw new ServiceException("没有记录");
		//3.查询当前页记录
		int pageSize=PageUtil.getPageSize();
		int startIndex=PageUtil.getStartIndex(pageCurrent);
		List<SysRoom> records=
		sysRoomDao.findPageObjects(hotelType, startIndex, pageSize);
		//4.封装查询结果并返回
		return PageUtil.newPageObject(pageCurrent, rowCount, pageSize, records);
	}

	/*@RequiredLog("日志查询")
	@Override
	public PageObject<SysRoom> findPageObjects(
			String name, Integer pageCurrent) {
		//1.参数校验
		if(pageCurrent==null||pageCurrent<1)
			throw new IllegalArgumentException("页码值不正确");
		//2.查询总记录数,并校验
		int rowCount=sysRoomDao.getRowCount(name);
		if(rowCount==0)
			throw new ServiceException("没有记录");
		//3.查询当前页记录
		int pageSize=PageUtil.getPageSize();
		int startIndex=PageUtil.getStartIndex(pageCurrent);
		List<SysRoom> records=
				sysRoomDao.findPageObjects(name, startIndex, pageSize);
		//4.封装查询结果并返回
		return PageUtil.newPageObject(pageCurrent, rowCount, pageSize, records);
	}*/
}
