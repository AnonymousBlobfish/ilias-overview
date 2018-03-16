
CREATE DATABASE WeGotDataTEST;

USE WeGotDataTEST;

CREATE TABLE restaurantstest (
  id INT,
  name VARCHAR(100),
  tagline VARCHAR(50),
  type VARCHAR(50),
  vicinity VARCHAR(50),
  priceLevel INT,
  zagatFood INT,
  zagatDecor INT,
  zagatService INT,
  longDescription VARCHAR(2000),
  PRIMARY KEY (id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- LOADING THE CSV INTO MYSQL
load data infile '/Users/iliasschulz/Documents/HR-System-Design-Capstone/ilias-overview/BigData.csv' into table restaurantstest FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' ignore 1 rows;