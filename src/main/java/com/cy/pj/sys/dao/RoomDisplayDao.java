package com.cy.pj.sys.dao;

import com.cy.pj.sys.entity.RoomDisplay;
import com.cy.pj.sys.entity.RoomEntity;
import com.cy.pj.sys.entity.SysRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RoomDisplayDao {
    SysRole findRoomDisplayByHotelId(@Param("hotelId")String hotelId);

    int setOccupy(@Param("type")String type);

    List<SysRole> findObjectByPrice(@Param("start")Integer start, @Param("end")Integer end,@Param("topic")Integer topic,@Param("type")Integer type);

    List<SysRole> findObjectByTopic(@Param("topic")Integer topic);

    List<SysRole> findObjectByType(@Param("type")Integer type);
}
