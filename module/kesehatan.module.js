const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _kesehatan{
	deletekesehatan(id_kesehatan){
		const sql = {
			query: `DELETE FROM d_kesehatan WHERE id_kesehatan = ?`,
			params: [id_kesehatan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deletekesehatan Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updatekesehatan(data, id_kesehatan){
		const sql = {
			query: `UPDATE d_kesehatan SET id_ternak = ?, penyakit = ?, tgl_sakit = ? WHERE id_kesehatan = ?`,
			params: [data.id_ternak, data.penyakit, data.tgl_sakit, data.id_kesehatan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updatekesehatan Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addkesehatan(data){
		const sql = {
			query: `INSERT INTO d_kesehatan(id_kesehatan, id_ternak, penyakit, tgl_sakit ) VALUES (?, ?, ?, ?)`,
			params: [data.id_kesehatan, data.id_ternak, data.penyakit, data.tgl_sakit ]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addkesehatan Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailkesehatan(id_kesehatan){
		const sql = {
			query: `
			SELECT
				emp.id_kesehatan,
				emp.id_ternak,
                emp.penyakit,
                emp.tgl_sakit
			FROM d_kesehatan emp
			WHERE emp.id_kesehatan = ?`,
			params: [id_kesehatan]
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
					console.error('getDetailkesehatan Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	listkesehatan(options = {}){
		const { id_kesehatan } = options
		const sql = {
				query: `
                    SELECT
						emp.id_kesehatan,
						emp.id_ternak,
                        emp.penyakit,
                        emp.tgl_sakit
					FROM d_kesehatan emp`,
				params: [],
			};

		if (id_kesehatan) {
			sql.query += ` AND emp.id_kesehatan = ?`;
			sql.params.push(id_kesehatan);
		}

		sql.query += ` ORDER BY emp.id_kesehatan ASC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_kesehatan: data[key].id_kesehatan,
						id_ternak: data[key].id_ternak,
						penyakit: data[key].penyakit,
						tgl_sakit: data[key].tgl_sakit,
					})
				}

				return {
					status: true,
					data: id_kesehatan ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_kesehatan && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data id_kesehatan tidak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('kesehatan list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _kesehatan();







