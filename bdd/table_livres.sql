DROP TABLE IF EXISTS `table_livres`;
CREATE TABLE IF NOT EXISTS `table_livres`
(
    `code_barre` BIGINT PRIMARY KEY NOT NULL,
    `type_de_produits` ENUM('livre') NOT NULL,
    `format` ENUM
    (
        'Broche', 'Relie', 'Poche', 'Autre'
    ) NOT NULL,
    `genre` VARCHAR(50) NOT NULL,
    `titre` VARCHAR(150) NOT NULL,
    `description` TEXT NOT NULL,
    `age_de_lecture` VARCHAR(5),
    `langue` VARCHAR(25) NOT NULL,
    `zone_de_commercialisation` VARCHAR(50),
    `nombre_de_pages` VARCHAR(10) NOT NULL,
    `editeur` VARCHAR(100),
    `auteur` VARCHAR(100),
    `date_de_sortie` VARCHAR(20),
    `photo` TEXT,
    `poid_article` VARCHAR(10)
)
ENGINE = INNODB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;