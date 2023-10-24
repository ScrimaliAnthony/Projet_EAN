DROP TABLE IF EXISTS `table_musiques`;
CREATE TABLE IF NOT EXISTS `table_musiques`
(
    `code_barre` BIGINT PRIMARY KEY NOT NULL,
    `type_de_produits` ENUM('musique') NOT NULL,
    `format` ENUM
    (
        'CD', 'DVD audio', 'Vinyles 33 tours', 'Viniles 45 tours', 'cassette audio', 'Autres'
    ) NOT NULL,
    `genre` ENUM
    (
        'Musique classique', 'Musique country', 'Musique electronique', 'Flamenco', 'Musique folk', 'R&B, Soul et Funk', 'Musique gothique',
        'Chanson française', 'Rap & hip-hop', 'Musique instrumentale', 'Jazz', 'Musique latine', 'Mambo', 'Musique new age', 'Polka', 'Pop',
        'Reggae', 'Musique regionale', 'Rock', 'Surf music', 'Zouk', 'Musique acoustique', "Musique d'ambiance", 'Musique de jeu video',
        'Poesie chantee', 'Musique publicitaire', 'Musique de relaxation', 'Pop Rock', 'Hard Rock', 'Heavy Metal', "Bandes originales de films",
        'Musique pour enfants', 'Musique Oriental'
    ) NOT NULL,
    `titre` VARCHAR(150) NOT NULL,
    `description` TEXT NOT NULL,
    `liste_des_titres` TEXT NOT NULL,
    `edition` ENUM
    (
        '', 'Album live', 'Best of', 'Coffret', 'Compilation', 'Edition limitee', 'Single'
    ),
    `nombre_de_disques` VARCHAR(10) NOT NULL,
    `artiste` VARCHAR(150) NOT NULL,
    `compositeur` VARCHAR(150),
    `editeur` VARCHAR(150),
    `pays_origine` VARCHAR(25),
    `zone_de_comercialisation` VARCHAR(25),
    `photo` TEXT,
    `poid_article` VARCHAR(10)
)
ENGINE = INNODB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;