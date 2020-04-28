package com.cy.pj.sys.entity;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public class SysEmployee implements Serializable{
	private static final long serialVersionUID = -2084506667460906909L;

	private Long employeeId;
	private String employeeName;
	private int employeeAge;
	private String employeePosition;
	private String employeePhone;
	private Date createTime;
	private Date modifiedTime;

}
