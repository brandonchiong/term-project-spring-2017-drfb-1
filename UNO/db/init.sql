/*
 * Install Postgresql server, create database Uno, initialize db 
 * with the following tables and values for cards. Note: update 
 * required for card images. Default value: 'tbd'.
 *
 * run command: sudo apt-get update
 *		sudo apt-get install postgresql postgresql-contrib
 *		sudo -u postgres createdb Uno
 *		sudo -u postgres psql uno < init.sql
 *
 * Use postgres to view db on the terminal.
 *
 * run command: sudo -u postgres psql Uno
 *		ALTER USER "postgres" WITH PASSWORD 'DRFB_S17';  (Change password from the default).
 *  		\d	(Displays the db tables).
 *		SELECT * FROM [Name of Table];	(Display all rows from the table).
 */


DROP DATABASE IF EXISTS Uno;
CREATE DATABASE Uno;


CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(32),
  last_name VARCHAR (32),
  alias VARCHAR(32),
  email VARCHAR(32) UNIQUE NOT NULL,
  pw VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS Cards (
  id INTEGER PRIMARY KEY,
  card_type VARCHAR(32),
  color VARCHAR(1),
  number INTEGER,
  image VARCHAR(128)
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
  (0, 'number', 'r', 0, 'tbd'),
  (1, 'number', 'r', 1, 'tbd'),
  (2, 'number', 'r', 1, 'tbd'),
  (3, 'number', 'r', 2, 'tbd'),
  (4, 'number', 'r', 2, 'tbd'),
  (5, 'number', 'r', 3, 'tbd'),
  (6, 'number', 'r', 3, 'tbd'),
  (7, 'number', 'r', 4, 'tbd'),
  (8, 'number', 'r', 4, 'tbd'),
  (9, 'number', 'r', 5, 'tbd'),
  (10, 'number', 'r', 5, 'tbd'),
  (11, 'number', 'r', 6, 'tbd'),
  (12, 'number', 'r', 6, 'tbd'),
  (13, 'number', 'r', 7, 'tbd'),
  (14, 'number', 'r', 7, 'tbd'),
  (15, 'number', 'r', 8, 'tbd'),
  (16, 'number', 'r', 8, 'tbd'),
  (17, 'number', 'r', 9, 'tbd'),
  (18, 'number', 'r', 9, 'tbd'),
  (19, 'skip', 'r', -1, 'tbd'),
  (20, 'skip', 'r', -1, 'tbd'),
  (21, 'reverse', 'r', -1, 'tbd'),
  (22, 'reverse', 'r', -1, 'tbd'),
  (23, 'draw2','r', -1, 'tbd'),
  (24, 'draw2','r', -1, 'tbd'),
  (25, 'wild', 'w', -1, 'tbd'),
  (26, 'wild4', 'w', -1, 'tbd'),
  (27, 'number', 'y', 0, 'tbd'),
  (28, 'number', 'y', 1, 'tbd'),
  (29, 'number', 'y', 1, 'tbd'),
  (30, 'number', 'y', 2, 'tbd'),
  (31, 'number', 'y', 2, 'tbd'),
  (32, 'number', 'y', 3, 'tbd'),
  (33, 'number', 'y', 3, 'tbd'),
  (34, 'number', 'y', 4, 'tbd'),
  (35, 'number', 'y', 4, 'tbd'),
  (36, 'number', 'y', 5, 'tbd'),
  (37, 'number', 'y', 5, 'tbd'),
  (38, 'number', 'y', 6, 'tbd'),
  (39, 'number', 'y', 6, 'tbd'),
  (40, 'number', 'y', 7, 'tbd'),
  (41, 'number', 'y', 7, 'tbd'),
  (42, 'number', 'y', 8, 'tbd'),
  (43, 'number', 'y', 8, 'tbd'),
  (44, 'number', 'y', 9, 'tbd'),
  (45, 'number', 'y', 9, 'tbd'),
  (46, 'skip', 'y', -1, 'tbd'),
  (47, 'skip', 'y', -1, 'tbd'),
  (48, 'reverse', 'y', -1, 'tbd'),
  (49, 'reverse', 'y', -1, 'tbd'),
  (50, 'draw2','y', -1, 'tbd'),
  (51, 'draw2','y', -1, 'tbd'),
  (52, 'wild', 'w', -1, 'tbd'),
  (53, 'wild4', 'w', -1, 'tbd'),
  (54, 'number', 'g', 0, 'tbd'),
  (55, 'number', 'g', 1, 'tbd'),
  (56, 'number', 'g', 1, 'tbd'),
  (57, 'number', 'g', 2, 'tbd'),
  (58, 'number', 'g', 2, 'tbd'),
  (59, 'number', 'g', 3, 'tbd'),
  (60, 'number', 'g', 3, 'tbd'),
  (61, 'number', 'g', 4, 'tbd'),
  (62, 'number', 'g', 4, 'tbd'),
  (63, 'number', 'g', 5, 'tbd'),
  (64, 'number', 'g', 5, 'tbd'),
  (65, 'number', 'g', 6, 'tbd'),
  (66, 'number', 'g', 6, 'tbd'),
  (67, 'number', 'g', 7, 'tbd'),
  (68, 'number', 'g', 7, 'tbd'),
  (69, 'number', 'g', 8, 'tbd'),
  (70, 'number', 'g', 8, 'tbd'),
  (71, 'number', 'g', 9, 'tbd'),
  (72, 'number', 'g', 9, 'tbd'),
  (73, 'skip', 'g', -1, 'tbd'),
  (74, 'skip', 'g', -1, 'tbd'),
  (75, 'reverse', 'g', -1, 'tbd'),
  (76, 'reverse', 'g', -1, 'tbd'),
  (77, 'draw2','g', -1, 'tbd'),
  (78, 'draw2','g', -1, 'tbd'),
  (79, 'wild', 'w', -1, 'tbd'),
  (80, 'wild4', 'w', -1, 'tbd'),
  (81, 'number', 'b', 0, 'tbd'),
  (82, 'number', 'b', 1, 'tbd'),
  (83, 'number', 'b', 1, 'tbd'),
  (84, 'number', 'b', 2, 'tbd'),
  (85, 'number', 'b', 2, 'tbd'),
  (86, 'number', 'b', 3, 'tbd'),
  (87, 'number', 'b', 3, 'tbd'),
  (88, 'number', 'b', 4, 'tbd'),
  (89, 'number', 'b', 4, 'tbd'),
  (90, 'number', 'b', 5, 'tbd'),
  (91, 'number', 'b', 5, 'tbd'),
  (92, 'number', 'b', 6, 'tbd'),
  (93, 'number', 'b', 6, 'tbd'),
  (94, 'number', 'b', 7, 'tbd'),
  (95, 'number', 'b', 7, 'tbd'),
  (96, 'number', 'b', 8, 'tbd'),
  (97, 'number', 'b', 8, 'tbd'),
  (98, 'number', 'b', 9, 'tbd'),
  (99, 'number', 'b', 9, 'tbd'),
  (100, 'skip', 'b', -1, 'tbd'),
  (101, 'skip', 'b', -1, 'tbd'),
  (102, 'reverse', 'b', -1, 'tbd'),
  (103, 'reverse', 'b', -1, 'tbd'),
  (104, 'draw2','b', -1, 'tbd'),
  (105, 'draw2','b', -1, 'tbd'),
  (106, 'wild', 'w', -1, 'tbd'),
  (107, 'wild4', 'w', -1, 'tbd');
