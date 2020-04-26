package com.cy.pj.sys.dao;

import com.cy.pj.sys.entity.RoomDisplay;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RoomDisplayDao {
    RoomDisplay findRoomDisplayByHotelId(@Param("hotelId")String hotelId);
}
