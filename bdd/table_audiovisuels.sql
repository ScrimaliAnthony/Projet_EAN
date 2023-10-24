DROP TABLE IF EXISTS `table_audiovisuels`;
CREATE TABLE IF NOT EXISTS `table_audiovisuels`
(
    `code_barre` BIGINT PRIMARY KEY NOT NULL,
    `type_de_produits` ENUM('audiovisuel') NOT NULL,
    `format` ENUM
    (
        'DVD', 'Blu-ray', 'Blu-ray 4K Ultra HD', 'Blue-ray 3D active', 'coffrets collectors', 'VHS', 'UMD', 'HD DVD', 'Autres'
    ) NOT NULL,
    `type` ENUM
    (
        'Film', 'Serie', 'Anime Japonais', 'Dessin anime'
    ) NOT NULL,
    `genre` ENUM
    (
        'Action', 'Aventure', 'Animation', 'Comedie', 'Dram & emotion', 'Enfant, jeunesse et famille', 'Espionnage', 'Fantastique', 'Guerre',
        'Histoire', 'Horreur et epouvante', 'Film musical', 'Policier', 'Romance', 'Science fiction', 'Thriller', 'Western', 'Erotique +16 ans',
        'Film pour Adulte +18 ans', 'Documentaire', 'Fitness', 'Foi et spiritualite', 'LGBTQ+', 'Loisir et passions', 'Spectacle', 'Sport',
        'Tele realite'
    ) NOT NULL,
    `titre` VARCHAR(150) NOT NULL,
    `description` TEXT NOT NULL,
    `classification_des_ages` ENUM
    (
        '', 'Tous publics', '10', '12', '16', '18'
    ),
    `langue_originale` VARCHAR(25),
    `duree` VARCHAR(20) NOT NULL,
    `Format_image` VARCHAR(100),
    `Format_son` VARCHAR(100),
    `acteur` VARCHAR(250) NOT NULL,
    `realisateur` VARCHAR(250) NOT NULL,
    `decenie_de_sortie` ENUM
    (
        '', '2020 et après', '2010 à 1019', '2000 à 2009', '1990 à 1999', '1980 à 1989', '1970 à 1979', '1960 à 1969', '1950 à 1959', '1940 à 1949',
        '1939 et avant'
    ),
    `date_de_sortie` VARCHAR(40),
    `sous_titre` VARCHAR(255),
    `studio` VARCHAR(250),
    `pays_origine` VARCHAR(25),
    `nombre_de_disques` VARCHAR(10) NOT NULL,
    `commercialisation` VARCHAR(25),
    `edition` ENUM
    (
        '', 'Edition simple', 'Coffret', 'Edition collector', 'Edition limitee', 'Boîtier Metal', 'Edition speciale', 'Mediabook', 'Version realisateur',
        'Version longue'
    ),
    `photo` TEXT,
    `video` TEXT,
    `poid_article` VARCHAR(10)
)
ENGINE = INNODB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;