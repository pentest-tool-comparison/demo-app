-- MySQL Script generated by MySQL Workbench
-- Thu May  5 16:05:41 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema demoapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema demoapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `demoapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `demoapp` ;

-- -----------------------------------------------------
-- Table `demoapp`.`userdata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `demoapp`.`userdata` (
                                                    `user_id` INT NOT NULL AUTO_INCREMENT,
                                                    `username` VARCHAR(255) NULL DEFAULT NULL,
    `pw_md5` VARCHAR(255) NULL DEFAULT NULL,
    `pw_sha1` VARCHAR(255) NULL,
    `pw_bcrypt` VARCHAR(255) NULL,
    `is_admin` TINYINT NULL DEFAULT 0,
    PRIMARY KEY (`user_id`))
    ENGINE = InnoDB
    AUTO_INCREMENT = 2
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `demoapp`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `demoapp`.`items` (
                                                 `item_id` INT NOT NULL AUTO_INCREMENT,
                                                 `name` VARCHAR(255) NULL,
    `imgurl` VARCHAR(255) NULL,
    `price` DECIMAL(10,2) NULL,
    PRIMARY KEY (`item_id`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `demoapp`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `demoapp`.`comments` (
                                                    `comment_id` INT NOT NULL AUTO_INCREMENT,
                                                    `title` VARCHAR(100) NULL,
    `body` LONGTEXT NULL,
    `item_id` INT NOT NULL,
    PRIMARY KEY (`comment_id`),
    INDEX `fk_item_comment_idx` (`item_id` ASC) VISIBLE,
    CONSTRAINT `fk_item_comment`
    FOREIGN KEY (`item_id`)
    REFERENCES `demoapp`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
