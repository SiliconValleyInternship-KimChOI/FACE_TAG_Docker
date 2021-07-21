create user 'root'@'%' identified with mysql_native_password by 'password';
grant all privileges on *.* to 'root'@'%';

CREATE DATABASE test;
use test;

CREATE TABLE Characters (
  id int primary key auto_increment,
  name varchar(100),
  img varchar(1000)
);

CREATE TABLE Timeline(
id int primary key auto_increment,
cid int,
start Time,
end Time,
foreign key (cid) references Characters(id)  on update cascade on delete cascade
);

INSERT INTO characters(name,img) VALUES ('Harry Potter','[https://gagagaga.s3.ap-northeast-2.amazonaws.com/Harry+James+Potter.png](https://gagagaga.s3.ap-northeast-2.amazonaws.com/Harry+James+Potter.png)');
INSERT INTO characters(name,img) VALUES ('Ron Weasley','[https://gagagaga.s3.ap-northeast-2.amazonaws.com/Ronald+Bilius+Weasley.png](https://gagagaga.s3.ap-northeast-2.amazonaws.com/Ronald+Bilius+Weasley.png)');
INSERT INTO characters(name,img) VALUES ('Hermione Granger','[https://gagagaga.s3.ap-northeast-2.amazonaws.com/Hermione+Jean+Granger.png](https://gagagaga.s3.ap-northeast-2.amazonaws.com/Hermione+Jean+Granger.png)');