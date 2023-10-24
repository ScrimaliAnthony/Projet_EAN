DROP VIEW IF EXISTS `vue_produits`;
CREATE VIEW vue_produits AS
SELECT `code_barre`, `type_de_produits`, `titre`, `photo` FROM `table_jeux_video_jv`
UNION ALL
SELECT `code_barre`, `type_de_produits`, `titre`, `photo` FROM `table_audiovisuels`
UNION ALL
SELECT `code_barre`, `type_de_produits`, `titre`, `photo` FROM `table_livres`
UNION ALL
SELECT `code_barre`, `type_de_produits`, `titre`, `photo` FROM `table_musiques`;