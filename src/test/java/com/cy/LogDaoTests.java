package com.cy;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.cy.pj.sys.dao.LogDao;
import com.cy.pj.sys.entity.Log;
@RunWith(SpringRunner.class)
@SpringBootTest
public class LogDaoTests {
	@Autowired
	private LogDao logDao;
	
	@Test
	public void testGetRowCount() {
	  int rowCount=
	  logDao.getRowCount("admin");
	  System.out.println(rowCount);
	}
	
	@Test
	public void testFindPageObjects() {
		List<Log> list=
		logDao.findPageObjects(
		"admin",0, 3);
		System.out.println(list.size());
	}
	
	
	@Test
	public void testDeleteObject() {
		int rows= logDao.deleteObject(16);
		System.out.println(rows);
	}
	@Test
	public void testDeleteObjects() {
		int rows=
		logDao.deleteObjects(17,18);
		System.out.println(rows);
	}
}





