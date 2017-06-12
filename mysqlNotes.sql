USE day15;

-- 创建表
CREATE TABLE teacher(
	id INT,
	NAME VARCHAR(20)
)
-- 查看所有表
SHOW TABLES;

DESC student;

DROP TABLE student;

CREATE TABLE student(
	id INT,
	NAME VARCHAR(20),
	gender VARCHAR(2),
	age INT
)

-- ********一、增删改数据********* ---
-- 1.1 增加数据
-- 插入所有字段。一定依次按顺序插入
INSERT INTO student VALUES(1,'张三','男',20);
-- 注意不能少或多字段值
-- INSERT INTO student VALUES(2,'李四','女');
-- 插入部分字段
INSERT INTO student(id,NAME) VALUES(2,'李四');

-- 1.2 修改数据
-- 修改所有数据（建议少用）
UPDATE student SET gender='女';
-- 带条件的修改（推荐使用）
UPDATE student SET gender='男' WHERE id=1; -- 修改id为1的学生，修改性别为男
-- 修改多个字段,注意: SET 字段名=值,字段名=值,....
UPDATE student SET gender='男',age=30 WHERE id=2;

-- 1.3 删除数据
-- 删除所有数据（建议少用）
DELETE FROM student;
-- 带条件的删除(推荐使用)
DELETE FROM student WHERE id=2;
--  另一种方式
-- delete from: 可以全表删除      1)可以带条件删除  2）只能删除表的数据，不能删除表的约束     3)使用delete from删除的数据可以回滚（事务）
-- truncate table: 可以全表删除   1）不能带条件删除 2）即可以删除表的数据，也可以删除表的约束 3）使用truncate table删除的数据不能回滚
TRUNCATE TABLE student;


CREATE TABLE test(
	id INT PRIMARY KEY AUTO_INCREMENT, -- 自增长约束
	NAME VARCHAR(20)
)
DESC test;

-- 1.
DELETE FROM test;
-- 2
TRUNCATE TABLE test;

INSERT INTO test(NAME) VALUES('张三');
INSERT INTO test(NAME) VALUES('张三2');
INSERT INTO test(NAME) VALUES('张三3');

SELECT * FROM test;

-- truncate table student where id=2; 不能带条件

-- 查询数据
SELECT * FROM student;

-- ********二、查询数据（select）*******--
-- 2.1 查询所有列
SELECT * FROM student;

-- 2.2 查询指定列
SELECT id,NAME,gender FROM student;

-- 2.3 查询时指定别名（as）
-- 注意： 在多表查询是经常使用表的别名
SELECT id AS '编号',NAME AS '姓名' FROM student;

-- 2.4 查询时添加常量列
-- 需求： 在查询student表时添加一个班级列，内容为“java就业班”
SELECT id,NAME,gender,age,'java就业班' AS '年级'  FROM student;

-- 2.5 查询时合并列
-- 需求： 查询每个学生的servlet和jsp的总成绩
SELECT id,NAME,(servlet+jsp) AS '总成绩' FROM student;
-- 注意：合并列只能合并数值类型的字段
SELECT id,(NAME+servlet) FROM student;

-- 2.6 查询时去除重复记录(DISTINCT)
-- 需求： 查询学生的性别     男 女
SELECT DISTINCT gender FROM student;
-- 另一种语法
SELECT DISTINCT(gender) FROM student;
-- 需求: 查询学生所在的地区
SELECT DISTINCT address FROM student;

-- 2.7 条件查询(where)
-- 2.7.1 逻辑条件： and(与)     or(或)
-- 需求： 查询id为2，且姓名为李四的学生
SELECT * FROM student WHERE id=2 AND NAME='李四'; -- 交集

-- 需求： 查询id为2，或姓名为张三的学生
SELECT * FROM student WHERE id=2 OR NAME='张三'; -- 并集

-- 2.7.2 比较条件： >   <   >=  <=  =  <>(不等于)     between and (等价于>= 且 <=)
-- 需求： 查询servlet成绩大于70分的学生
SELECT * FROM student WHERE servlet>70;

-- 需求： 查询jsp成绩大于等于75，且小于等于90分的学生
SELECT * FROM student WHERE jsp>=75 AND jsp<=90;
-- 另一个语法
SELECT * FROM student WHERE jsp BETWEEN 75 AND 90; -- (包前包后)

SELECT * FROM student WHERE gender<>'男';


-- 2.7.3 判空条件(null 空字符串)：  is null / is not null / =''  / <>''
-- 需求： 查询地址为空的学生（包括null和空字符串）
-- null vs  空字符串
-- null：表示没有值
-- 空字符串：有值的！
-- 判断null
SELECT * FROM student WHERE address IS NULL ;
-- 判断空字符串
SELECT * FROM student WHERE address='';

SELECT * FROM student WHERE address IS NULL OR address=''; -- （包括null和空字符串）

-- 需求： 查询有地址的学生(不包括null和空字符串)
SELECT * FROM student WHERE address IS NOT NULL AND address<>'';


-- 2.7.4 模糊条件： like
-- 通常使用以下替换标记：
-- % : 表示任意个字符
-- _ : 表示一个字符
-- 需求： 查询姓‘张’的学生
SELECT * FROM student WHERE NAME LIKE '李%';

-- 需求： 查询姓‘李’，且姓名只有两个字的学生
SELECT * FROM student WHERE NAME LIKE '李_';


--- 练习 --
CREATE TABLE student2(
	id INT,
	NAME VARCHAR(20),
	chinese FLOAT,
	english FLOAT,
	math FLOAT
);

INSERT INTO student2(id,NAME,chinese,english,math) VALUES(1,'张小明',89,78,90);
INSERT INTO student2(id,NAME,chinese,english,math) VALUES(2,'李进',67,53,95);
INSERT INTO student2(id,NAME,chinese,english,math) VALUES(3,'王五',87,78,77);
INSERT INTO student2(id,NAME,chinese,english,math) VALUES(4,'李一',88,98,92);
INSERT INTO student2(id,NAME,chinese,english,math) VALUES(5,'李来财',82,84,67);
INSERT INTO student2(id,NAME,chinese,english,math) VALUES(6,'张进宝',55,85,45);
INSERT INTO student2(id,NAME,chinese,english,math) VALUES(7,'黄蓉',75,65,30);



-- 查询表中所有学生的信息。
SELECT * FROM student2;

-- 查询表中所有学生的姓名和对应的英语成绩。
SELECT NAME,english FROM student2;

-- 过滤表中英语成绩的重复数据
SELECT DISTINCT(english) FROM student2;

-- 使用别名表示学生分数。
SELECT NAME AS '姓名',chinese AS '语文',english AS '英语',math AS '数学' FROM student2; 

-- 查询姓名为李一的学生成绩
SELECT * FROM student2 WHERE NAME='李一';

-- 查询英语成绩大于等于90分的同学
SELECT * FROM student2 WHERE english>=90;

-- 查询总分大于200分的所有同学
SELECT * FROM student2 WHERE (chinese+english+math)>200;
	
-- 查询所有姓李的学生英语成绩。
SELECT NAME,english FROM student2 WHERE NAME LIKE '李%';

-- 查询英语>80或者总分>200的同学
SELECT * FROM student2 WHERE english>80 OR (chinese+english+math)>200

-- 统计每个学生的总分。
SELECT id,NAME,(chinese+english+math) AS '总成绩' FROM student2;

-- 在所有学生总分数上加10分特长分。
SELECT id,NAME,(chinese+english+math+10) AS '总成绩' FROM student2;

SELECT * FROM student;


-- 2.8 聚合查询（使用聚合函数的查询）
 -- 常用的聚合函数： sum()  avg()  max()  min()  count()
-- 需求：查询学生的servlet的总成绩 (sum() :求和函数)
SELECT SUM(servlet) AS 'servlet的总成绩' FROM student;

-- 需求： 查询学生的servlet的平均分
SELECT AVG(servlet) AS 'servlet的平均分' FROM student;

-- 需求: 查询当前servlet最高分
SELECT MAX(servlet) AS '最高分' FROM student;

-- 需求： 查询最低分
SELECT MIN(servlet) AS '最低分' FROM student;

-- 需求： 统计当前有多少学生(count(字段))
SELECT COUNT(*) FROM student;

SELECT COUNT(id) FROM student;

-- 注意：count（）函数统计的数量不包含null的数据
-- 使用count统计表的记录数，要使用不包含null值的字段
SELECT COUNT(age) FROM student;


SELECT * FROM student;
-- 2.9 分页查询（limit 起始行,查询几行）
-- 起始行从0开始
-- 分页：当前页  每页显示多少条
-- 分页查询当前页的数据的sql: SELECT * FROM student LIMIT (当前页-1)*每页显示多少条,每页显示多少条;

-- 需求： 查询第1,2条记录（第1页的数据）
SELECT * FROM student LIMIT 0,2;
-- 查询第3,4条记录（第2页的数据）
SELECT * FROM student LIMIT 2,2;
-- 查询第5,6条记录（第3页的数据）
SELECT * FROM student LIMIT 4,2;
-- 查询第7,8条记录 (没有记录不显示)
SELECT * FROM student LIMIT 6,2;

-- 2.10 查询排序（order by ）
-- 语法 ：order by 字段 asc/desc
-- asc: 顺序，正序。数值：递增，字母：自然顺序（a-z）
-- desc: 倒序，反序。数值：递减，字母：自然反序(z-a)

-- 默认情况下，按照插入记录顺序排序
SELECT * FROM student;

-- 需求： 按照id顺序排序
SELECT * FROM student ORDER BY id ASC;
SELECT * FROM student ORDER BY id; -- 默认正序

SELECT * FROM student ORDER BY id DESC;-- 反序

-- 注意：多个排序条件
-- 需求： 按照servlet正序，按照jsp的倒序
SELECT * FROM student ORDER BY servlet ASC,jsp DESC;

-- 2.11 分组查询(group by)
-- 需求： 查询男女的人数
-- 预期结果：
  --  男   3
  --- 女   2
  -- 1) 把学生按照性别分组(GROUP BY gender)
  -- 2) 统计每组的人数(COUNT(*))
SELECT gender,COUNT(*) FROM student GROUP BY gender;

-- 2.12 分组查询后筛选
-- 需求： 查询总人数大于2的性别
-- 1) 查询男女的人数
-- 2）筛选出人数大于2的记录(having)
--- 注意： 分组之前条件使用where关键字，分组之前条件使用having关键字
SELECT gender,COUNT(*) FROM student WHERE GROUP BY gender HAVING COUNT(*)>2;


-- 给student表添加servlet和jsp成绩列
ALTER TABLE student ADD servlet INT,ADD jsp INT;
ALTER TABLE student ADD servlet INT;
ALTER TABLE student ADD address VARCHAR(10);
DESC student;
UPDATE student SET servlet=70,jsp=85 WHERE id=1;
UPDATE student SET servlet=65,jsp=90 WHERE id=2;
UPDATE student SET gender='女' WHERE id=2;
UPDATE student SET address='广州天河' WHERE id=1;
UPDATE student SET address='广州天河' WHERE id=2;
UPDATE student SET address='广州番禺' WHERE id=3;

INSERT INTO student VALUES(4,'陈六','男',28,75,80,'');
INSERT INTO student VALUES(5,'李七','男',30,64,83,NULL);
INSERT INTO student VALUES(6,'李八八','男',35,67,82,'广州天河');



-- day16课程内容 --
CREATE DATABASE day16;
USE day16;

-- *************一、数据约束********************----
-- 1.1 默认值
CREATE TABLE student(
	id INT,
	NAME VARCHAR(20),
	address VARCHAR(20) DEFAULT '广州天河'  -- 默认值
)

DROP TABLE student;
-- 当字段没有插入值的时候，mysql自动给该字段分配默认值
INSERT INTO student(id,NAME) VALUES(1,'张三');

-- 注意：默认值的字段允许为null
INSERT INTO student(id,NAME,address) VALUE(2,'李四',NULL);
INSERT INTO student(id,NAME,address) VALUE(3,'王五','广州番禺');

SELECT * FROM student;

-- 1.2 非空
-- 需求： gender字段必须有值（不为null）
CREATE TABLE student(
	id INT,
	NAME VARCHAR(20),
	gender VARCHAR(2) NOT NULL -- 非空
)

-- 非空字段必须赋值
INSERT INTO student(id,NAME) VALUES(1,'李四');
-- 非空字符不能插入null
INSERT INTO student(id,NAME,gender) VALUES(1,'李四',NULL);

SELECT * FROM student;

-- 1.3 唯一
CREATE TABLE student(
	id INT UNIQUE, -- 唯一
	NAME VARCHAR(20)
)

INSERT INTO student(id,NAME) VALUES(1,'zs');
INSERT INTO student(id,NAME) VALUES(1,'lisi'); -- ERROR 1062 (23000): Duplicate entry '1' for key 'id'

INSERT INTO student(id,NAME) VALUES(2,'lisi');

SELECT * FROM student;

-- 1.4 主键（非空+唯一）
DROP TABLE student;

CREATE TABLE student(
	id INT PRIMARY KEY, -- 主键
	NAME VARCHAR(20)
)

INSERT INTO student(id,NAME) VALUES(1,'张三');
INSERT INTO student(id,NAME) VALUES(2,'张三');
-- INSERT INTO student(id,NAME) VALUES(1,'李四'); -- 违反唯一约束： Duplicate entry '1' for key 'PRIMARY'

-- insert into student(name) value('李四'); -- 违反非空约束： ERROR 1048 (23000): Column 'id' cannot be null

-- 1.5 自增长
CREATE TABLE student(
	id INT(4) ZEROFILL PRIMARY KEY AUTO_INCREMENT, -- 自增长，从0开始  ZEROFILL 零填充
	NAME VARCHAR(20)
)

-- 自增长字段可以不赋值，自动递增
INSERT INTO student(NAME) VALUES('张三');
INSERT INTO student(NAME) VALUES('李四');
INSERT INTO student(NAME) VALUES('王五');

SELECT * FROM student;
-- 不能影响自增长约束
DELETE FROM student;
-- 可以影响自增长约束
TRUNCATE TABLE student;

-- 1.6 外键约束
-- 员工表
CREATE TABLE employee(
	id INT PRIMARY KEY,
	empName VARCHAR(20),
	deptName VARCHAR(20) -- 部门名称
)

INSERT INTO employee VALUES(1,'张三','软件开发部');
INSERT INTO employee VALUES(2,'李四','软件开发部');
INSERT INTO employee VALUES(3,'王五','应用维护部');

SELECT * FROM employee;

-- 添加员工，部门名称的数据冗余高
INSERT INTO employee VALUES(4,'陈六','软件开发部');

-- 解决数据冗余高的问题：给冗余的字段放到一张独立表中
-- 独立设计一张部门表
CREATE TABLE dept(
	id INT PRIMARY KEY,
	deptName VARCHAR(20)
)

DROP TABLE employee;

-- 修改员工表
CREATE TABLE employee(
	id INT PRIMARY KEY,
	empName VARCHAR(20),
	deptId INT,-- 把部门名称改为部门ID
	-- 声明一个外键约束
	CONSTRAINT emlyee_dept_fk FOREIGN KEY(deptId) REFERENCES dept(id) ON UPDATE CASCADE ON DELETE CASCADE  -- ON CASCADE UPDATE ：级联修改
	--           外键名称                  外键               参考表(参考字段)
)

INSERT INTO dept(id,deptName) VALUES(1,'软件开发部');
INSERT INTO dept(id,deptName) VALUES(2,'应用维护部');
INSERT INTO dept(id,deptName) VALUES(3,'秘书部');

INSERT INTO employee VALUES(1,'张三',1);
INSERT INTO employee VALUES(2,'李四',1);
INSERT INTO employee VALUES(3,'王五',2);
INSERT INTO employee VALUES(4,'陈六',3);

-- 问题: 该记录业务上不合法，员工插入了一个不存在的部门数据
INSERT INTO employee VALUES(5,'陈六',4); -- 违反外键约束： Cannot add or update a child row: a foreign key constraint fails (`day16`.`employee`, CONSTRAINT `emlyee_dept_fk` FOREIGN KEY (`deptId`) REFERENCES `dept` (`id`))

-- 1）当有了外键约束，添加数据的顺序： 先添加主表，再添加副表数据
-- 2）当有了外键约束，修改数据的顺序： 先修改副表，再修改主表数据
-- 3）当有了外键约束，删除数据的顺序： 先删除副表，再删除主表数据
-- 修改部门(不能直接修改主表)
UPDATE dept SET id=4 WHERE id=3;
-- 先修改员工表
UPDATE employee SET deptId=2 WHERE id=4;
 
-- 删除部门
DELETE FROM dept WHERE id=2;

-- 先删除员工表
DELETE FROM employee WHERE deptId=2;

SELECT * FROM dept;
SELECT * FROM employee;

-- 级联修改（修改）
-- 直接修改部门
UPDATE dept SET id=5 WHERE id=4;

-- 级联删除
-- 直接删除部门 
DELETE FROM dept WHERE id=1;



--  **************二、关联查询（多表查询）****************----
-- 需求：查询员工及其所在部门(显示员工姓名，部门名称)
-- 2.1 交叉连接查询（不推荐。产生笛卡尔乘积现象：4 * 4=16，有些是重复记录）
SELECT empName,deptName FROM employee,dept;

-- 需求：查询员工及其所在部门(显示员工姓名，部门名称)
-- 多表查询规则：1）确定查询哪些表   2）确定哪些哪些字段   3）表与表之间连接条件 (规律：连接条件数量是表数量-1)
-- 2.2 内连接查询：只有满足条件的结果才会显示(使用最频繁)
SELECT empName,deptName       -- 2）确定哪些哪些字段
	FROM employee,dept    -- 1）确定查询哪些表
	WHERE employee.deptId=dept.id  -- 3）表与表之间连接条件
	
-- 内连接的另一种语法
SELECT empName,deptName
	FROM employee
	INNER JOIN dept
	ON employee.deptId=dept.id;
	
-- 使用别名
SELECT e.empName,d.deptName
	FROM employee e
	INNER JOIN dept d
	ON e.deptId=d.id;

-- 需求： 查询每个部门的员工
-- 预期结果：
 --  软件开发部  张三
 --  软件开发部  李四
 --  应用维护部  王五
 --  秘书部      陈六
 --  总经办      null 
-- 2.2 左[外]连接查询： 使用左边表的数据去匹配右边表的数据，如果符合连接条件的结果则显示，如果不符合连接条件则显示null
 -- （注意： 左外连接：左表的数据一定会完成显示！）
SELECT d.deptName,e.empName
	FROM dept d
	LEFT OUTER JOIN employee e
	ON d.id=e.deptId;

-- 2.3 右[外]连接查询: 使用右边表的数据去匹配左边表的数据，如果符合连接条件的结果则显示，如果不符合连接条件则显示null
 -- （注意： 右外连接：右表的数据一定会完成显示！）
SELECT d.deptName,e.empName
	FROM employee e
	RIGHT OUTER JOIN dept d
	ON d.id=e.deptId;

-- 2.4 自连接查询
-- 需求：查询员工及其上司
-- 预期结果：       
	-- 张三    null
	-- 李四    张三
	-- 王五    李四
	-- 陈六    王五
SELECT e.empName,b.empName
	FROM employee e 
	LEFT OUTER JOIN employee b
	ON e.bossId=b.id;


SELECT * FROM employee;
SELECT * FROM dept;
-- 添加上司ID
ALTER TABLE employee ADD bossId INT;
UPDATE employee SET bossId=1 WHERE id=2;
UPDATE employee SET bossId=2 WHERE id=3;
UPDATE employee SET bossId=3 WHERE id=4;


-- **************三、存储过程*******************-
-- 声明结束符
-- 创建存储过程
DELIMITER $
CREATE PROCEDURE pro_test()
BEGIN
	-- 可以写多个sql语句;
	SELECT * FROM employee;
END $

-- 执行存储过程
CALL pro_test();

-- 3.1 带有输入参数的存储过程
-- 需求：传入一个员工的id，查询员工信息
DELIMITER $
CREATE PROCEDURE pro_findById(IN eid INT)  -- IN: 输入参数
BEGIN
	SELECT * FROM employee WHERE id=eid;
END $ 

-- 调用
CALL pro_findById(4);

-- 3.2 带有输出参数的存储过程
DELIMITER $
CREATE PROCEDURE pro_testOut(OUT str VARCHAR(20))  -- OUT：输出参数
BEGIN
        -- 给参数赋值
	SET str='helljava';
END $

-- 删除存储过程
DROP PROCEDURE pro_testOut;
-- 调用
-- 如何接受返回参数的值？？
-- ***mysql的变量******
--  全局变量（内置变量）：mysql数据库内置的变量 （所有连接都起作用）
        -- 查看所有全局变量： show variables
        -- 查看某个全局变量： select @@变量名
        -- 修改全局变量： set 变量名=新值
        -- character_set_client: mysql服务器的接收数据的编码
        -- character_set_results：mysql服务器输出数据的编码
        
--  会话变量： 只存在于当前客户端与数据库服务器端的一次连接当中。如果连接断开，那么会话变量全部丢失！
        -- 定义会话变量: set @变量=值
        -- 查看会话变量： select @变量
        
-- 局部变量： 在存储过程中使用的变量就叫局部变量。只要存储过程执行完毕，局部变量就丢失！！

-- 1)定义一个会话变量name, 2)使用name会话变量接收存储过程的返回值
CALL pro_testOut(@NAME);
-- 查看变量值
SELECT @NAME;

-- 3.3 带有输入输出参数的存储过程
DELIMITER $
CREATE PROCEDURE pro_testInOut(INOUT n INT)  -- INOUT： 输入输出参数
BEGIN
   -- 查看变量
   SELECT n;
   SET n =500;
END $

-- 调用
SET @n=10;

CALL pro_testInOut(@n);

SELECT @n;

-- 3.4 带有条件判断的存储过程
-- 需求：输入一个整数，如果1，则返回“星期一”,如果2，返回“星期二”,如果3，返回“星期三”。其他数字，返回“错误输入”;
DELIMITER $
CREATE PROCEDURE pro_testIf(IN num INT,OUT str VARCHAR(20))
BEGIN
	IF num=1 THEN
		SET str='星期一';
	ELSEIF num=2 THEN
		SET str='星期二';
	ELSEIF num=3 THEN
		SET str='星期三';
	ELSE
		SET str='输入错误';
	END IF;
END $

CALL pro_testIf(4,@str);
 
SELECT @str;

-- 3.5 带有循环功能的存储过程
-- 需求： 输入一个整数，求和。例如，输入100，统计1-100的和
DELIMITER $
CREATE PROCEDURE pro_testWhile(IN num INT,OUT result INT)
BEGIN
	-- 定义一个局部变量
	DECLARE i INT DEFAULT 1;
	DECLARE vsum INT DEFAULT 0;
	WHILE i<=num DO
	      SET vsum = vsum+i;
	      SET i=i+1;
	END WHILE;
	SET result=vsum;
END $

DROP PROCEDURE pro_testWhile;


CALL pro_testWhile(100,@result);

SELECT @result;

USE day16;

-- 3.6 使用查询的结果赋值给变量（INTO）
DELIMITER $
CREATE PROCEDURE pro_findById2(IN eid INT,OUT vname VARCHAR(20) )
BEGIN
	SELECT empName INTO vname FROM employee WHERE id=eid;
END $

CALL pro_findById2(1,@NAME);

SELECT @NAME;


USE day15;

SELECT * FROM student2;

-- 练习： 编写一个存储过程 
	如果学生的英语平均分小于等于70分，则输出'一般'
	如果学生的英语平均分大于70分，且小于等于90分，则输出‘良好’
	如果学生的英语平均分大于90分，则输出‘优秀’
	
DELIMITER $
CREATE PROCEDURE pro_testAvg(OUT str VARCHAR(20))
BEGIN 
      -- 定义局部变量，接收平均分
      DECLARE savg DOUBLE;
      -- 计算英语平方分
      SELECT AVG(english) INTO savg FROM student2;
      IF savg<=70 THEN
           SET str='一般';
      ELSEIF savg>70 AND savg<=90 THEN
           SET str='良好';
      ELSE
	   SET str='优秀';
      END IF;
END $

CALL pro_testAvg(@str);

SELECT @str;


-- ************四、触发器*****************
SELECT * FROM employee;

-- 日志表
CREATE TABLE test_log(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(100)
)

-- 需求： 当向员工表插入一条记录时，希望mysql自动同时往日志表插入数据
-- 创建触发器(添加)
CREATE TRIGGER tri_empAdd AFTER INSERT ON employee FOR EACH ROW    -- 当往员工表插入一条记录时
     INSERT INTO test_log(content) VALUES('员工表插入了一条记录');
     
-- 插入数据
INSERT INTO employee(id,empName,deptId) VALUES(7,'扎古斯',1);
INSERT INTO employee(id,empName,deptId) VALUES(8,'扎古斯2',1);

-- 创建触发器(修改)
CREATE TRIGGER tri_empUpd AFTER UPDATE ON employee FOR EACH ROW    -- 当往员工表修改一条记录时
     INSERT INTO test_log(content) VALUES('员工表修改了一条记录');
     
 -- 修改
 UPDATE employee SET empName='eric' WHERE id=7;
 
-- 创建触发器(删除)
CREATE TRIGGER tri_empDel AFTER DELETE ON employee FOR EACH ROW    -- 当往员工表删除一条记录时
     INSERT INTO test_log(content) VALUES('员工表删除了一条记录');
  
 -- 删除
 DELETE FROM employee WHERE id=7;
 
 SELECT * FROM employee;
 SELECT * FROM test_log;
 
 -- ***********五、mysql权限问题****************
 -- mysql数据库权限问题：root ：拥有所有权限（可以干任何事情）
 -- 权限账户，只拥有部分权限（CURD）例如，只能操作某个数据库的某张表
 -- 如何修改mysql的用户密码？
 -- password: md5加密函数(单向加密)
 SELECT PASSWORD('root'); -- *81F5E21E35407D884A6CD4A731AEBFB6AF209E1B
 
--  mysql数据库，用户配置 : user表
USE mysql;

SELECT * FROM USER;

-- 修改密码
UPDATE USER SET PASSWORD=PASSWORD('123456') WHERE USER='root';

-- 分配权限账户
GRANT SELECT ON day16.employee TO 'eric'@'localhost' IDENTIFIED BY '123456';
GRANT DELETE ON day16.employee TO 'eric'@'localhost' IDENTIFIED BY '123456';

-- ****** 六，mysql备份和还原********



 
 
 

CREATE TABLE student(id INT PRIMARY KEY AUTO_INCREMENT,NAME VARCHAR(20),gender VARCHAR(2));

DESC student;

DROP TABLE student;

-- 插入记录
INSERT INTO student(NAME,gender) VALUES('张三','男');

-- 查询
SELECT * FROM student;

-- 更新
UPDATE student SET NAME='王五' WHERE id=1;

DELETE FROM student WHERE id=1;


-- 模拟用户登录
-- 用户表
CREATE TABLE users(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20),
	PASSWORD VARCHAR(20)
)

INSERT INTO users(NAME,PASSWORD) VALUES('eric','123456');
INSERT INTO users(NAME,PASSWORD) VALUES('rose','654321');

SELECT * FROM users;

-- 登录成功：用户输入的用户名和密码和users表的某条记录匹配
-- 登录失败：  找不到匹配的数据
SELECT * FROM users WHERE NAME='eric' AND PASSWORD='123456';

SELECT * FROM users;

SELECT * FROM users WHERE 1=1; -- 1=1 表示恒成立(永远成立，永远真)

-- sql注入
SELECT * FROM users WHERE NAME='eric' OR 1=1 -- 'and password='123456';


-- SELECT * FROM users WHERE NAME='eric';
-- SELECT * FROM users WHERE 1=1;

-- 创建存储过程





