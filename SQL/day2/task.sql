
create database task;
use task;
create table student(
studentid int primary key auto_increment,
studentname varchar (20),
studentage int,
studentdepartment varchar(20),
studentcity varchar(20)
);
insert into student (studentname,studentage,studentdepartment,studentcity) value
("ravi",22,"CSE","chennai"),
("arun",22,"java","combitaore"),
("bala",23,"ECE","chennai"),
("priya",24,"js","madurai");

update student set studentcity="banglore" where studentid=2;
update student set studentage=25 where studentid=3;
update student set studentage=22,studentcity="madurai", studentdepartment="python" where studentid=1;
update student set studentcity="thiruvallur" where studentname="ravi";  

SET SQL_SAFE_UPDATES=0; 
delete from student where studentid=1;
delete from student where studentcity="madurai";

create table college (
staffId int primary key auto_increment,
staffName varchar (20),
staffAge int,
staffEmail varchar(20),
staffPassword varchar(30)
);                  
alter table college add column entery_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
           ON UPDATE CURRENT_TIMESTAMP;
           alter table college add column out_time timestamp default current_timestamp on update current_timestamp;
           alter table college rename column entery_time to entery_timing;
           alter table college rename column out_time to out_timing;
insert into college (staffName,staffAge,staffEmail,staffPassword) value
("praveen",25,"praqveen@gmail.com",12134456),
("kumar",24,"kumar@gmail.com",12134456),
("santhosh",28,"santhosh@gmail.com",12134456),
("ravi",25,"ravieen@gmail.com",111111);
           
           
 update college set staffName="guru" where staffId=2;          
           