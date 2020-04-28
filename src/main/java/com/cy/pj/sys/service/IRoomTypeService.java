package com.cy.pj.sys.service;

import com.cy.pj.sys.entity.RoomEntity;
import com.cy.pj.sys.entity.SysRoom;

import java.util.List;
import java.util.Set;

/**
 * @author xiaozui
 *
 */
public interface IRoomTypeService {
    /**
     * 入参：想要的房间信息编码
     * 出参：输出信息
     * @param Type
     * @return
     */
    List<SysRoom> getRoomType(String Type);
}
