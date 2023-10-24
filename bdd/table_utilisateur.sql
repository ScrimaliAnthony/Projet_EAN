DROP TABLE IF EXISTS `table_utilisateur`;
CREATE TABLE IF NOT EXISTS `table_utilisateur`
(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `identifiant` VARCHAR(30) UNIQUE NOT NULL,
    `mot_de_passe` VARCHAR(60) NOT NULL
)
ENGINE = INNODB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;