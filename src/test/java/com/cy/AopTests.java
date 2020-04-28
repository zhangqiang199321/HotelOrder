package com.cy;
import com.cy.pj.sys.service.SysEmployeeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AopTests {
	 @Autowired
	 private ApplicationContext ctx;
	 @Test
	 public void testSysUserService() {
		 SysEmployeeService userService=
		 ctx.getBean("sysUserServiceImpl",
				 SysEmployeeService.class);
		 //JDK proxy:com.sun.proxy.$Proxy101
		 //CGLIB:$$EnhancerBySpringCGLIB$$4606b6ef
		 System.out.println(userService.getClass());
		 /*PageObject<SysUserDeptVo> po=
		 userService.findPageObjects(
				 "admin",1);
		 System.out.println("rowCount:"+po.getRowCount());*/
	 }
}





