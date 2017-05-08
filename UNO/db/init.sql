/*
 * Install Postgresql server, create database Uno, initialize db 
 * with the following tables and values for cards. Note: update 
 * required for card images. Default value: 'red(0).png'.
 *
 * run command: sudo apt-get update
 *		sudo apt-get install postgresql postgresql-contrib
 *		sudo -u postgres createdb Uno
 *		sudo -u postgres psql Uno < init.sql
 *
 * Use postgres to view db on the terminal.
 *
 * run command: sudo -u postgres psql Uno
 *    \connect Uno (Should already be connected to Uno db, if not this command should do it.)
 *		ALTER USER "postgres" WITH PASSWORD 'DRFB_S17';  (Change password from the default).
 *  		\d	(Displays the db tables).
 *		SELECT * FROM [Name of Table];	(Display all rows from the table).
 *    DELETE FROM [Name of Table];  (Delete all rows from table in case you want to update table with new values from init.sql)
 */


DROP DATABASE IF EXISTS Uno;
CREATE DATABASE Uno;


CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(32),
  last_name VARCHAR (32),
  alias VARCHAR(32) UNIQUE NOT NULL,
  email VARCHAR(32) UNIQUE NOT NULL,
  pw VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS Cards (
  id INTEGER PRIMARY KEY,
  card_type VARCHAR(32),
  color VARCHAR1,
  number INTEGER,
  image VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS Games (
  id SERIAL PRIMARY KEY,
  top_card_id INTEGER REFERENCES Cards(id),
  direction BOOLEAN DEFAULT TRUE,
  player_turn INTEGER REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS GameUsers (
  game_id INTEGER REFERENCES Games(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES Users(id), 
  uno BOOLEAN DEFAULT FALSE,
  num_cards INTEGER,
  PRIMARY KEY (game_id, user_id)
);

CREATE TABLE IF NOT EXISTS GameCards (
  game_id INTEGER REFERENCES Games(id),
  card_id INTEGER REFERENCES Cards(id),
  user_id INTEGER REFERENCES Users(id),
  discarded_at TIME WITH TIME ZONE,
  discarded BOOLEAN,
  PRIMARY KEY (game_id, card_id, user_id)
);

CREATE TABLE IF NOT EXISTS Messages (
  game_id INTEGER REFERENCES Games(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES Users(id),
  message VARCHAR(100),
  time_stamp TIME WITH TIME ZONE,
  PRIMARY KEY (game_id, user_id)
);

INSERT INTO Cards (id, card_type, color, number, image) VALUES
  (0, 'number', 'r', 0, 'red0.png'),
  (1, 'number', 'r', 1, 'red1.png'),
  (2, 'number', 'r', 1, 'red1.png'),
  (3, 'number', 'r', 2, 'red2.png'),
  (4, 'number', 'r', 2, 'red2.png'),
  (5, 'number', 'r', 3, 'red3.png'),
  (6, 'number', 'r', 3, 'red3.png'),
  (7, 'number', 'r', 4, 'red4.png'),
  (8, 'number', 'r', 4, 'red4.png'),
  (9, 'number', 'r', 5, 'red5.png'),
  (10, 'number', 'r', 5, 'red5.png'),
  (11, 'number', 'r', 6, 'red6.png'),
  (12, 'number', 'r', 6, 'red6.png'),
  (13, 'number', 'r', 7, 'red7.png'),
  (14, 'number', 'r', 7, 'red7.png'),
  (15, 'number', 'r', 8, 'red8.png'),
  (16, 'number', 'r', 8, 'red8.png'),
  (17, 'number', 'r', 9, 'red9.png'),
  (18, 'number', 'r', 9, 'red9.png'),
  (19, 'skip', 'r', -1, 'redStop.png'),
  (20, 'skip', 'r', -1, 'redStop.png'),
  (21, 'reverse', 'r', -1, 'redReverse.png'),
  (22, 'reverse', 'r', -1, 'redReverse.png'),
  (23, 'draw2','r', -1, 'redDraw2.png'),
  (24, 'draw2','r', -1, 'redDraw2.png'),
  (25, 'wild', 'w', -1, 'wild.png'),
  (26, 'wild4', 'w', -1, 'wildDraw4.png'),
  (27, 'number', 'y', 0, 'yellow0.png'),
  (28, 'number', 'y', 1, 'yellow1.png'),
  (29, 'number', 'y', 1, 'yellow1.png'),
  (30, 'number', 'y', 2, 'yellow2.png'),
  (31, 'number', 'y', 2, 'yellow2.png'),
  (32, 'number', 'y', 3, 'yellow3.png'),
  (33, 'number', 'y', 3, 'yellow3.png'),
  (34, 'number', 'y', 4, 'yellow4.png'),
  (35, 'number', 'y', 4, 'yellow4.png'),
  (36, 'number', 'y', 5, 'yellow5.png'),
  (37, 'number', 'y', 5, 'yellow5.png'),
  (38, 'number', 'y', 6, 'yellow6.png'),
  (39, 'number', 'y', 6, 'yellow6.png'),
  (40, 'number', 'y', 7, 'yellow7.png'),
  (41, 'number', 'y', 7, 'yellow7.png'),
  (42, 'number', 'y', 8, 'yellow8.png'),
  (43, 'number', 'y', 8, 'yellow8.png'),
  (44, 'number', 'y', 9, 'yellow9.png'),
  (45, 'number', 'y', 9, 'yellow9.png'),
  (46, 'skip', 'y', -1, 'yellowStop.png'),
  (47, 'skip', 'y', -1, 'yellowStop.png'),
  (48, 'reverse', 'y', -1, 'yellowReverse.png'),
  (49, 'reverse', 'y', -1, 'yellowReverse.png'),
  (50, 'draw2','y', -1, 'yellowDraw2.png'),
  (51, 'draw2','y', -1, 'yellowDraw2.png'),
  (52, 'wild', 'w', -1, 'wild.png'),
  (53, 'wild4', 'w', -1, 'wildDraw4.png'),
  (54, 'number', 'g', 0, 'green0.png'),
  (55, 'number', 'g', 1, 'green1.png'),
  (56, 'number', 'g', 1, 'green1.png'),
  (57, 'number', 'g', 2, 'green2.png'),
  (58, 'number', 'g', 2, 'green2.png'),
  (59, 'number', 'g', 3, 'green3.png'),
  (60, 'number', 'g', 3, 'green3.png'),
  (61, 'number', 'g', 4, 'green4.png'),
  (62, 'number', 'g', 4, 'green4.png'),
  (63, 'number', 'g', 5, 'green5.png'),
  (64, 'number', 'g', 5, 'green5.png'),
  (65, 'number', 'g', 6, 'green6.png'),
  (66, 'number', 'g', 6, 'green6.png'),
  (67, 'number', 'g', 7, 'green7.png'),
  (68, 'number', 'g', 7, 'green7.png'),
  (69, 'number', 'g', 8, 'green8.png'),
  (70, 'number', 'g', 8, 'green8.png'),
  (71, 'number', 'g', 9, 'green9.png'),
  (72, 'number', 'g', 9, 'green9.png'),
  (73, 'skip', 'g', -1, 'greenStop.png'),
  (74, 'skip', 'g', -1, 'greenStop.png'),
  (75, 'reverse', 'g', -1, 'greenReverse.png'),
  (76, 'reverse', 'g', -1, 'greenReverse.png'),
  (77, 'draw2','g', -1, 'greenDraw2.png'),
  (78, 'draw2','g', -1, 'greenDraw2.png'),
  (79, 'wild', 'w', -1, 'wild.png'),
  (80, 'wild4', 'w', -1, 'wildDraw4.png'),
  (81, 'number', 'b', 0, 'blue0.png'),
  (82, 'number', 'b', 1, 'blue1.png'),
  (83, 'number', 'b', 1, 'blue1.png'),
  (84, 'number', 'b', 2, 'blue2.png'),
  (85, 'number', 'b', 2, 'blue2.png'),
  (86, 'number', 'b', 3, 'blue3.png'),
  (87, 'number', 'b', 3, 'blue3.png'),
  (88, 'number', 'b', 4, 'blue4.png'),
  (89, 'number', 'b', 4, 'blue4.png'),
  (90, 'number', 'b', 5, 'blue5.png'),
  (91, 'number', 'b', 5, 'blue5.png'),
  (92, 'number', 'b', 6, 'blue6.png'),
  (93, 'number', 'b', 6, 'blue6.png'),
  (94, 'number', 'b', 7, 'blue7.png'),
  (95, 'number', 'b', 7, 'blue7.png'),
  (96, 'number', 'b', 8, 'blue8.png'),
  (97, 'number', 'b', 8, 'blue8.png'),
  (98, 'number', 'b', 9, 'blue9.png'),
  (99, 'number', 'b', 9, 'blue9.png'),
  (100, 'skip', 'b', -1, 'blueStop.png'),
  (101, 'skip', 'b', -1, 'blueStop.png'),
  (102, 'reverse', 'b', -1, 'blueReverse.png'),
  (103, 'reverse', 'b', -1, 'blueReverse.png'),
  (104, 'draw2','b', -1, 'blueDraw2.png'),
  (105, 'draw2','b', -1, 'blueDraw2.png'),
  (106, 'wild', 'w', -1, 'wild.png'),
  (107, 'wild4', 'w', -1, 'wildDraw4.png');