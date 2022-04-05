CREATE VIEW `view_data_ternak`
AS SELECT 
    id_ternak, 
    jenis_kelamin, 
    nama_varietas,
    berat_berkala, 
    suhu_berkala, 
    tanggal_lahir, 
    tanggal_masuk, 
    id_induk,
    id_pejantan,
    status_sehat,
    nama_pakan,
    fase_pemeliharaan
FROM `s_ternak`,`d_pakan`, `d_varietas`
WHERE d_pakan.id_pakan = s_ternak.id_pakan = s_ternak.id_varietas = d_varietas.id_varietas AND id_users = 8



CREATE VIEW `view_data_ternak`
AS SELECT 
    id_ternak, 
    jenis_kelamin, 
    nama_varietas,
    berat_berkala, 
    suhu_berkala, 
    tanggal_lahir, 
    tanggal_masuk, 
    id_induk,
    id_pejantan,
    status,
    nama_pakan,
    fase_pemeliharaan
FROM `s_ternak`,`d_pakan`, `d_varietas` `d_kesehatan`
WHERE d_pakan.id_pakan = s_ternak.id_pakan = s_ternak.id_varietas = d_varietas.id_varietas = d_kesehatan.id_kesehatan = s_ternak.id_kesehatan



