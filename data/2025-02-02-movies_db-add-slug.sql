ALTER TABLE `web_app`.`movies` ADD COLUMN `slug` VARCHAR(255) NOT NULL;
UPDATE `web_app`.`movies` SET `slug` = 'inception' WHERE (`id` = '1');
UPDATE `web_app`.`movies` SET `slug` = 'the-godfather' WHERE (`id` = '2');
UPDATE `web_app`.`movies` SET `slug` = 'titanic' WHERE (`id` = '3');
UPDATE `web_app`.`movies` SET `slug` = 'the-matrix' WHERE (`id` = '4');
UPDATE `web_app`.`movies` SET `slug` = 'interstellar' WHERE (`id` = '5');
