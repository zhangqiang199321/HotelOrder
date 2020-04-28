package com.cy.pj.sys.dao;

import com.cy.pj.sys.entity.SysRoom;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RoomDisplayDao {
    SysRoom findRoomDisplayByHotelId(@Param("hotelId")String hotelId);

    int setOccupy(@Param("type")String type);

    List<SysRoom> findObjectByPrice(@Param("start")Integer start, @Param("end")Integer end, @Param("topic")String topic, @Param("type")String type);
}
