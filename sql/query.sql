CREATE TABLE `admin_profile` (
   `a_id` int NOT NULL AUTO_INCREMENT,
   `admin_id` varchar(255) NOT NULL,
   `password` varchar(255) NOT NULL,
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `is_deleted` tinyint(1) DEFAULT '0',
   `meta_data` json DEFAULT NULL,
   `role` varchar(255) DEFAULT 'admin',
   PRIMARY KEY (`a_id`),
   UNIQUE KEY `admin_id` (`admin_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
