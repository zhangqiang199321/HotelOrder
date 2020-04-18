package com.cy.pj.sys.entity;

import lombok.Data;

@Data
public class RoomEntity{
    private String name;
    private String price;
    private Integer priceType;
    private Integer type;
    private Integer topic;
    private String roomUrl;
}
