package com.cy.pj.sys.service;

import com.cy.pj.sys.entity.RoomEntity;

import java.util.List;

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
    List<RoomEntity> getRoomType(String Type);
}
