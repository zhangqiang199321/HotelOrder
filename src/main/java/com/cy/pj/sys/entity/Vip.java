package com.cy.pj.sys.entity;
import java.io.Serializable;
import java.sql.Date;

import lombok.Data;
@Data
public class Vip implements Serializable{
	private static final long serialVersionUID = 1032118300798232010L;

	private Long id;
	private String account;
	private String password;
	private Date createTime;
	private Date modifiedTime;
    private String ext1;
    private String ext2;
}
