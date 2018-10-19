CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(6,2),
    stock_quantity INT,
    PRIMARY VALUE(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pokeball", "Items", 1.50, 50),
("Great Ball", "Items", 3.00, 25),
("Ultra Ball", "Items", 5.25, 10),
("Potion", "Recovery", 2.25, 30),
("Revive", "Recovery", 6.15, 10),
("Ether", "Recovery", 3.75, 45),
("Quick Attack", "Moves", 10.35, 15),
("Sleep Powder", "Moves", 14.60, 3),
("Dragon Rage", "Moves", 15.00, 5),
("Giga Drain", "Moves", 12.95, 10),