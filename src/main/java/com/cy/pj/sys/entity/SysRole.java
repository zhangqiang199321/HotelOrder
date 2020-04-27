package com.cy.pj.sys.entity;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;
@Data
public class SysRole implements Serializable{
    //todo 客房信息
	private static final long serialVersionUID = 5444781487816683086L;
	//客房id
	private Long hotelId;
	//客房编号
	private String hotelNum;
	//客房状态
	private String status;
	//客房类型
    private String hotelType;
    //客房价格
    private Double price;
    //客房面积
    private Double square;
    //客房位置
    private String hotelLocation;
    //是否预订
    private String occupyFlag;
    //人数
    private int visitorNum;
    //客房标题
    private String title;
    //客房主题
    private String topic;
	private Date createTime;
	private Date modifiedTime;
	private String ext1;
	private String ext2;
	/*private Integer id;
	private String name;
	private String note;
	private Date createdTime;
	private Date modifiedTime;
	private String createdUser;
	private String modifiedUser;*/

}
