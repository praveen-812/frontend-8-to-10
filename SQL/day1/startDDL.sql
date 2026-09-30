create database schooldata;
use schooldata;

create table student (
userid int primary key auto_increment,
username varchar(20),
useremail varchar(20) unique,
useraddress varchar(50),
usermobile varchar(12),
userage int,
usersalary int
);
select * from student;
create table corporationoffice(
workerid int primary key auto_increment,
intime datetime,
outtime datetime,
salary int,
workername varchar(20),
workplace varchar(20),
workexperence varchar(20)
);

select * from  corporationoffice;
create table productcard(
productid int primary key auto_increment,
productname varchar (20),
productdescription varchar(20),
productcash int,
prouctlist varchar(20),
productitems varchar(20)
);
select * from productcard;