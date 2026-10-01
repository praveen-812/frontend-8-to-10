create database govermenthospital;
use govermenthospital;
create table rajugandhi(
paitentid int primary key auto_increment,
paitentname varchar(20),
paitentage int,
paitentreport varchar(20),
paitenttablet varchar(20),
createdby varchar (20) default "admin",
createdat date,
updatedby varchar(20) default "admin",
updated date



);
drop table rajugandhi;

insert into rajugandhi(paitentname,paitentage,paitentreport,paitenttablet,createdat)  value 
("praveen",27,"fever","dollo",current_date()),
("santhosh",12,"cold","daita",current_date()),
("kumar",22,"hiv","redcapsul",current_date());

update rajugandhi 