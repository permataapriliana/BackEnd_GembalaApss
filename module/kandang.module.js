const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _kandang{
	deletekandang(id_kandang){
		const sql = {
			query: `DELETE FROM d_kandang WHERE id_kandang = ?`,
			params: [id_kandang]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deletekandang Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updatekandang(data, id_kandang){
		const sql = {
			query: `UPDATE d_kandang SET nama_kandang = ? WHERE id_kandang = ?`,
			params: [data.nama_kandang, data.id_kandang]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updatekandang Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addkandang(data){
		const sql = {
			query: `INSERT INTO d_kandang(id_kandang, nama_kandang ) VALUES (?, ?)`,
			params: [data.id_kandang, data.nama_kandang ]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addkandang Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailkandang(id_kandang){
		const sql = {
			query: `
			SELECT
				emp.id_kandang,
				emp.nama_kandang
			FROM d_kandang emp
			WHERE emp.id_kandang = ?`,
			params: [id_kandang]
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
					console.error('getDetailkandang Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	listkandang(options = {}){
		const { id_kandang } = options
		const sql = {
				query: `
                    SELECT
						emp.id_kandang,
						emp.nama_kandang
					FROM d_kandang emp
					WHERE 1`,
				params: [],
			};

		if (id_kandang) {
			sql.query += ` AND emp.id_kandang = ?`;
			sql.params.push(id_kandang);
		}

		sql.query += ` ORDER BY emp.id_kandang ASC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_kandang: data[key].id_kandang,
						nama_kandang: data[key].nama_kandang,
					})
				}

				return {
					status: true,
					data: id_kandang ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_kandang && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data id_kandang tidak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('kandang list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _kandang();







