create database if not exists crexDatabase;


create table if not exists signUp (sign_up_id int primary key auto_increment, user_id varchar(255) unique not null,
 user_password varchar(255) not null,
 created_at timeStamp default current_timeStamp,
 updated_at timestamp default current_timestamp on update current_timestamp, 
 is_deleted boolean default false, meta_data JSON);

 <---------------------themes------------------------>

create table if not exists themes (themes_id int primary key auto_increment, meta_data JSON)

