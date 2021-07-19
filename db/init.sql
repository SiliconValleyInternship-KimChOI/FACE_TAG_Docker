CREATE DATABASE test;
use test;

CREATE TABLE UserInfo (
  id int unsigned AUTO_INCREMENT PRIMARY KEY,
  username varchar(30) NOT NULL,
  hashed_password varchar(255) NOT NULL,
  email varchar(50) NOT NULL,
  UNIQUE KEY EMAIL (email)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert  into UserInfo(id,username,hashed_password,email) values
(1,'Soumitra Roy','1234','sroy@gmail.com'),
(2,'Rahul Kumar','1234','rahul@gmail.com');