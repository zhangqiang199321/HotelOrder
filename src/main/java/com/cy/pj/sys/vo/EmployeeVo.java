package com.cy.pj.sys.vo;

import com.cy.pj.sys.entity.SysDept;
import lombok.Data;

import java.util.Date;

/**
 * 类作用：
 * 项目名称：CGB-DBTMS-V1.01
 * 包：com.cy.pj.sys.vo
 * 类名称：EmployeeVo
 * 类描述：类功能详细描述
 * 创建人：ZQ
 * 创建时间：2020/4/11 16:10
 */
@Data
public class EmployeeVo {
    private static final long serialVersionUID = -1385472527241996140L;
    private Long employeeId;
    private String employeeName;
    private int employeeAge;
    private String employeePosition;
    private String employeePhone;
    private Date createTime;
    private Date modifiedTime;

}
