const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _ternak{
	deleteternak(id_ternak){
		const sql = {
			query: `DELETE FROM s_ternak WHERE id_ternak = ?`,
			params: [id_ternak]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deleteternak Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updateternak(data, id_ternak){
		const sql = {
			query: `UPDATE s_ternak SET rf_id = ?, id_users = ?, jenis_kelamin = ?,
			 id_varietas = ?, berat_berkala = ?, suhu_berkala = ?, tanggal_lahir = ?, tanggal_masuk = ?, 
			 id_induk = ?, id_pejantan = ?, status_sehat = ?, id_pakan = ?, fase_pemeliharaan = ?,
			 tanggal_keluar = ?, status_keluar = ?  WHERE id_ternak = ?`,
			params: [data.rf_id, data.id_users, data.jenis_kelamin, data.id_varietas, data.berat, data.suhu,
				data.tanggal_lahir, data.tanggal_masuk, data.id_induk, data.id_pejantan, data.status_sehat,
				data.id_pakan, data.fase_pemeliharaan, data.tanggal_keluar, data.status_keluar, data.id_ternak]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updateternak Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addternak(data){
		const sql = {
			query: `INSERT INTO s_ternak(id_ternak, rf_id, id_users, jenis_kelamin, id_varietas, berat_berkala,
				 suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat,
				  id_pakan, fase_pemeliharaan, tanggal_keluar, status_keluar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			params: [data.id_ternak, data.rf_id, data.id_users, data.jenis_kelamin, data.id_varietas, data.berat, data.suhu,
				 data.tanggal_lahir, data.tanggal_masuk, data.id_induk, data.id_pejantan, data.status_sehat,
				 data.id_pakan, data.fase_pemeliharaan, data.tanggal_keluar, data.status_keluar]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addternak Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailternak(id_ternak){
		const sql = {
			query: `
			SELECT 
        	s_ternak.id_users,
			s_ternak.id_ternak,
			s_ternak.jenis_kelamin,
			d_varietas.nama_varietas , 
			s_ternak.berat_berkala, 
			s_ternak.suhu_berkala, 
			s_ternak.tanggal_lahir, 
			timestampdiff(month, s_ternak.tanggal_lahir, curdate()) AS umur , 
			s_ternak.tanggal_masuk, s_ternak.id_induk, s_ternak.id_pejantan, 
			s_ternak.status_sehat, 
			s_ternak.fase_pemeliharaan,
            d_pakan.nama_pakan,
			s_ternak.tanggal_keluar, 
			s_ternak.status_keluar 
			FROM s_ternak
			LEFT JOIN d_varietas
			ON s_ternak.id_varietas=d_varietas.id_varietas
            LEFT JOIN d_pakan
            ON s_ternak.id_pakan=d_pakan.id_pakan
			WHERE s_ternak.id_ternak=?`,
			params: [id_ternak]
		}

		return mysql.query(sql.query, sql.params)
			.then( data => {
				return {
					status: true,
					data
				}
			})
			.catch(error => {
				if(debug){
					console.error('getDetailternak Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	getDetailternakusers(id_users){
		const sql = {
			query: `
			SELECT
        	s_ternak.id_users,
			s_ternak.id_ternak,
            s_ternak.rf_id,
			s_ternak.jenis_kelamin,
			d_varietas.nama_varietas , 
			s_ternak.berat_berkala, 
			s_ternak.suhu_berkala, 
			s_ternak.tanggal_lahir, 
			timestampdiff(month, s_ternak.tanggal_lahir, curdate()) AS umur , 
			s_ternak.tanggal_masuk, s_ternak.id_induk, s_ternak.id_pejantan, 
			s_ternak.status_sehat, 
			s_ternak.fase_pemeliharaan,
            d_pakan.nama_pakan,
			s_ternak.tanggal_keluar, 
			s_ternak.status_keluar 
			FROM s_ternak
			LEFT JOIN d_varietas
			ON s_ternak.id_varietas=d_varietas.id_varietas
            LEFT JOIN d_pakan
            ON s_ternak.id_pakan=d_pakan.id_pakan
            WHERE s_ternak.id_users=?`,
			params: [id_users]
		}

		return mysql.query(sql.query, sql.params)
			.then( data => {
				return {
					status: true,
					data
				}
			})
			.catch(error => {
				if(debug){
					console.error('getDetailternakusers Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};


	getDetailternakrfid(rf_id){
		const sql = {
			query: `
			SELECT 
        	s_ternak.id_users,
			s_ternak.id_ternak,
            s_ternak.rf_id,
			s_ternak.jenis_kelamin,
			d_varietas.nama_varietas , 
			s_ternak.berat_berkala, 
			s_ternak.suhu_berkala, 
			s_ternak.tanggal_lahir, 
			timestampdiff(month, s_ternak.tanggal_lahir, curdate()) AS umur , 
			s_ternak.tanggal_masuk, s_ternak.id_induk, s_ternak.id_pejantan, 
			s_ternak.status_sehat, 
			s_ternak.fase_pemeliharaan,
            d_pakan.nama_pakan,
			s_ternak.tanggal_keluar, 
			s_ternak.status_keluar 
			FROM s_ternak
			LEFT JOIN d_varietas
			ON s_ternak.id_varietas=d_varietas.id_varietas
            LEFT JOIN d_pakan
            ON s_ternak.id_pakan=d_pakan.id_pakan
            WHERE s_ternak.rf_id=?`,
			params: [rf_id]
		}

		return mysql.query(sql.query, sql.params)
			.then( data => {
				return {
					status: true,
					data
				}
			})
			.catch(error => {
				if(debug){
					console.error('getDetailternakrfid Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
	




	listternak(options = {}){
		const { id_ternak } = options
		const sql = {
				query: `
				SELECT 
        	s_ternak.id_users,
			s_ternak.id_ternak,
			s_ternak.rf_id,
			s_ternak.jenis_kelamin,
			d_varietas.nama_varietas , 
			s_ternak.berat_berkala, 
			s_ternak.suhu_berkala, 
			s_ternak.tanggal_lahir, 
			timestampdiff(month, s_ternak.tanggal_lahir, curdate()) AS umur , 
			s_ternak.tanggal_masuk, s_ternak.id_induk, s_ternak.id_pejantan, 
			s_ternak.status_sehat, 
			s_ternak.fase_pemeliharaan,
            d_pakan.nama_pakan,
			s_ternak.tanggal_keluar, 
			s_ternak.status_keluar 
			FROM s_ternak
			LEFT JOIN d_varietas
			ON s_ternak.id_varietas=d_varietas.id_varietas
            LEFT JOIN d_pakan
            ON s_ternak.id_pakan=d_pakan.id_pakan
			WHERE 1`,
				params: [],
			};

		if (id_ternak) {
			sql.query += ` AND s_ternak.id_ternak = ?`;
			sql.params.push(id_ternak);
		}

		sql.query += ` ORDER BY s_ternak.id_ternak DESC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_users: data[key].id_users,
						id_ternak: data[key].id_ternak,
						rf_id: data[key].rf_id,
						jenis_kelamin: data[key].jenis_kelamin,
						nama_varietas: data[key].nama_varietas,
						berat_berkala: data[key].berat_berkala,
						suhu_berkala: data[key].suhu_berkala,
						tanggal_lahir: data[key].tanggal_lahir,
						umur: data[key].umur,
						tanggal_masuk: data[key].tanggal_masuk,
						status_sehat: data[key].status_sehat,
						fase_pemeliharaan: data[key].fase_pemeliharaan,
						nama_pakan: data[key].nama_pakan,
						id_induk: data[key].id_induk,
						id_pejantan: data[key].id_pejantan,
					})
				}

				return {
					status: true,
					data: id_ternak ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_ternak && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data id_ternak tidak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('ternak list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _ternak();



// Kelompok 6
// 1. Bima - 2202077
// 2. Dany Widiyanto - 2202081
// 3. Dede Septa Maulana Fajar - 2202069 
// 4. Dian Permata Apriliana Dewi-2202087
// 5. sem abraham - 2202071



