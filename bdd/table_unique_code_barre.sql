DROP TABLE IF EXISTS `table_unique_code_barre`;
CREATE TABLE IF NOT EXISTS `table_unique_code_barre`
(
    `code_barre` BIGINT PRIMARY KEY NOT NULL
)
ENGINE = INNODB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;