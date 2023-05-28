-- create table users (
--     email char(100) not null primary key,
--     first_name char(64) not null,
--     last_name char(64) not null
--     );
--     
-- select * from users;

-- insert into users (email, first_name, last_name)
-- 	values ( 'bala@gmail.com', 'Bala', 'Boba'),
--     ('coco@gmail.com', 'Connie', 'Coco'),
--     ('donald@gmail.com', 'Donald', 'Dan'),
--     ('eries@gmail.com', 'Eries', 'Ew'),
--     ('felicia@gmail.com', 'Felicia', 'fang');

--  create table newItem (
--  	item_id int not null,
--     item_category char(64) not null,
--  	item_name char(64) not null,
--     item_price numeric(10) not null,
--   	item_quantity numeric(10) not null,
--     item_owner char(64) not null,
--     constraint fk_item_id foreign key(item_id) references user_items(item_id)
--     )

-- categories: food, social life, pets, transport, household, apparel, beauty, health, entertainment, gift, others

--  select * from newItem;

-- insert into user_items (item_date, item_location, user_email) values
-- ('2022-11-11', 'Din Tai Fung', 'felicia@gmail.com');

-- insert into newItem (item_category, item_name, item_price, item_quantity, item_owner)
--   	values ( 'food', 'fried rice', 9, 1, 'me')

--    create table user_items (
--    	item_id int not null primary key auto_increment,
--      item_uuid varchar(8) not null,
--      item_payment varchar(100) not null,
--  	item_date date not null,
--    	item_location varchar(100) not null,
--      user_email char(100) not null,
--      item_category char(64) not null,
--    	item_name varchar(64) not null,
--      item_price decimal(10,2)  not null,
--    	item_quantity numeric(10) not null,
--      item_owner varchar(64) not null,
--      constraint fk_email foreign key(user_email) references users(email)
--  	)

    -- insert into user_items (item_uuid, item_payment, item_date, item_location, user_email, item_category, item_name, item_price, item_quantity, item_owner)
--     	values ( '3f83hfi3', 'paynow', '2023-11-11', 'Ding Tai Fung', 'bala@gmail.com', 'food', 'fried rice', '1', 1, 'me'),
--         ( 'fj3ifj3d', 'dbs', '2023-11-14', 'Crystal Jade', 'felicia@gmail.com', 'food', 'fried rice', '2', 3, 'me'),
--         ( '3jf92lfj', 'citi', '2023-10-13', 'Macdonalds', 'bala@gmail.com', 'food', 'fried rice', '3.14', 10, 'felicia'),
--         ( 'dn38fhsi', 'dbs', '2023-10-12', 'KFC', 'bala@gmail.com', 'food', 'fried rice', '9.9', 4, 'me'),
--         ( 'dj12djdd', 'paynow', '2023-11-15', 'Wendys', 'felicia@gmail.com', 'food', 'fried rice', '5.12', 15, 'bala')
--         
-- filter by:

-- by month, display sum of payment type, sum of each category, su
SELECT item_payment, item_name, item_price FROM user_items WHERE item_date >= '2023-11-01' AND item_date <= '2023-12-31';

SELECT sum(item_price) FROM user_items WHERE user_email= 'bala@gmail.com' AND item_date >= '2023-11-01' AND item_date <= '2023-12-31' AND item_category = ''