create database if not exists crexDatabase;


create table if not exists signUp (sign_up_id int primary key auto_increment, user_id varchar(255) unique not null,
 user_password varchar(255) not null,
 created_at timeStamp default current_timeStamp,
 updated_at timestamp default current_timestamp on update current_timestamp, 
 is_deleted boolean default false, meta_data JSON);

 <---------------------themes------------------------>

create table if not exists themes (themes_id int primary key auto_increment, meta_data JSON)

<-------------------------admin------------------------->
CREATE TABLE `admin_profile` (
   `a_id` int NOT NULL AUTO_INCREMENT,
   `admin_id` varchar(255) NOT NULL,
   `password` varchar(255) NOT NULL,
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `is_deleted` tinyint(1) DEFAULT '0',
   `meta_data` json DEFAULT NULL,
   `role` varchar(255) default "admin",
   PRIMARY KEY (`a_id`),
   UNIQUE KEY `admin_id` (`admin_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

