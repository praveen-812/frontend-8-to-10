create database dqltask;
use dqltask;
create table  officestaff (
staffid int primary key auto_increment,
staffname varchar(20),
staffage int,
staffdepart varchar (20),
staffsalary int,
staffcity varchar(20)
);
insert into officestaff (staffname,staffage,staffdepart,staffsalary,staffcity) values 
("praveen",22,"react",20000,"chennai"),
("anbu",28,"it",10000,"chennai"),
("santhosh",22,"hr",30000,"cuddlore"),
("pradeep",23,"coa",40000,"madurai"),
("gopi",21,"web",70000,"tirchy"),
("karthi",27,"stack",90000,"chennai");

select staffname,staffsalary,staffcity from officestaff;
select * from officestaff where staffcity="chennai" ;
select * from officestaff where staffsalary > 45000 ;
select * from officestaff where staffage < 28;
select * from officestaff where  staffsalary>= 40000;
select * from officestaff where  NOT staffdepart ="hr";
select * from officestaff where staffdepart="it" AND staffcity="chennai";
select * from officestaff where staffcity="madurai" OR staffcity="chennai";
select * from officestaff where staffsalary > 40000 AND staffage <30;
select * from officestaff where staffcity IN ("chennai","madurai","salem");
select * from officestaff where staffdepart NOT IN ("it","hr");
select * from officestaff where staffcity ="";
select * from officestaff where not staffcity ="";
select * from officestaff where  staffsalary  BETWEEN 30000 AND 40000;
select * from officestaff where staffname LIKE 'a%';
select * from officestaff where staffname LIKE '%vi%';
select DISTINCT staffcity from officestaff;
select DISTINCT staffcity from officestaff;
select DISTINCT staffcity from officestaff;
select staffname AS "employyename" from officestaff;
select staffdepart AS "employee department" from officestaff;
select staffsalary AS "employee salary " from officestaff;