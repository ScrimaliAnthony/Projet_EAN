DROP TABLE IF EXISTS `table_jeux_video_jv`;
CREATE TABLE IF NOT EXISTS `table_jeux_video_jv`
(
    `code_barre` BIGINT PRIMARY KEY NOT NULL,
    `type_de_produits` ENUM('jeuxVideo') NOT NULL,
    `categorie` ENUM('Jeux video') NOT NULL,
    `console` ENUM
    (
        'Magnavox Odyssey (1972)', 'VideoSport MK2 (1974 ou 1975)', 'PC-50X (1975)', 'Odyssey 2100 (1976)', 'Pong (1976)', 'Atari 2600 (1977)',
        'Atari 2800 (1983) (Japon uniquement)', 'Atari 7800 (1985)', 'Atari Lynx (1989) Console portable', 'Atari Lynx II (1991) Console portable',
        "Coleco Gemini (clone de l'Atari 2600)", 'Magnavox Odyssey²', 'Game and Watch (1980) Console portable', 'Intellivision (1979)',
        'Intellivision II (1983)', 'Intellivision III (1985)', 'PV-1000 (1983)', 'Sega SG-1000 (1983)', 'Sega SG-1000 II (1984)', 
        'Master System (1985)', 'Nintendo Entertainment System (NES) (1987)', 'Famicom (1983)', 'Mega Drive / Sega Genesis (1988)',
        'Mega Drive II (1993)', 'Mega-CD/Sega CD (1991)', 'Sega 32X (1994)', 'Sega Pico (1994)', 'Sega Mega Jet (1994) Console portable',
        'Sega Saturn (1994)', 'Neo-Geo (1990)', 'Neo-Geo CD (1994)', 'Neo-Geo CDZ (1994)', 'Neo-Geo Pocket (1998) Console portable', 
        'Neo-Geo Pocket Color (1999) Console portable', 'Commodore CDTV (1991)', 'Game Gear (1990) Console portable',
        'Game Boy (1989) Console portable', 'Super Nintendo (SNES) (1990)', 'SNES Super Famicom (1990)', 'Sega Nomad (1995) Console portable',
        'Atari Jaguar (1993)', 'PlayStation (1994)', 'PlayStation 2 (2000)', 'PlayStation 3 (2006)', 'PlayStation 4 (2013)', 'PlayStation 5 (2020)',
        'PlayStation Portable (2005) Console portable', 'PlayStation Vita (2011) Console portable', 'Amiga CD32 (1993)',
        'Game Boy Color (1998) Console portable', 'Game Boy Advance (2001) Console portable', 'Nintendo 3DS (2011) Console portable',
        'Nintendo 64 (1996)', 'Sega Dreamcast (1998)', 'Nintendo GameCube (2001)', 'Xbox (2001)', 'Xbox 360 (2005)', 'Xbox One (2013)',
        'Wii (2006)', 'Nintendo DS (2004) Console portable', 'Nintendo Switch (2017)'
    ) NOT NULL,
    `titre` VARCHAR(150) NOT NULL,
    `description` TEXT NOT NULL,
    `PEGI` ENUM
    (
        '', '3', '7', '12', '16', '18'
    ),
    `genre` ENUM
    (
        'Beat them up', "Hack'n' slash", 'Combat', 'Plates-formes', "Shoot'em up", 'FPS', 'GTA-like', 'Infiltration', 'Metroidvania', 'Survie',
        'Survival horror', 'Aventure graphique', "Point'n click", 'Fiction interactive', 'Film interactif', 'Visual novel', 'Myst-like',
        'Walking simulator', 'RPG', 'Action aventure', 'Action RPG', 'Dungeon RPG', 'Roguelike', 'Tactical RPG', 'Animal de compagnie virtuel',
        'God game', 'Gestion', 'Wargame', 'Strategie tour par tour', 'Carte à collectionner', 'Strategie temps reel', 'Tower defense', '4X',
        'Grande Strategie', 'Rythme', 'Party game', 'Bac à sable'
    ) NOT NULL,
    `editeur` VARCHAR(100),
    `developpeur` VARCHAR(100),
    `date_de_sortie` VARCHAR(40),
    `langue` VARCHAR(25),
    `pays` VARCHAR(40),
    `code_region` VARCHAR(10),
    `photo` TEXT,
    `video` TEXT,
    `poid_article` VARCHAR(10)
)
ENGINE = INNODB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;