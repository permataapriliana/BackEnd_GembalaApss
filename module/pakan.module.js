const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _pakan{
	deletepakan(id_pakan){
		const sql = {
			query: `DELETE FROM d_pakan WHERE id_pakan = ?`,
			params: [id_pakan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deletepakan Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updatepakan(data, id_pakan){
		const sql = {
			query: `UPDATE d_pakan SET nama_pakan = ? WHERE id_pakan = ?`,
			params: [data.nama_pakan, data.id_pakan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updatepakan Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addpakan(data){
		const sql = {
			query: `INSERT INTO d_pakan(id_pakan, nama_pakan ) VALUES (?, ?)`,
			params: [data.id_pakan, data.nama_pakan ]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addpakan Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailpakan(id_pakan){
		const sql = {
			query: `
			SELECT
				emp.id_pakan,
				emp.nama_pakan
			FROM d_pakan emp
			WHERE emp.id_pakan = ?`,
			params: [id_pakan]
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
					console.error('getDetailpakan Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	listpakan(options = {}){
		const { id_pakan } = options
		const sql = {
				query: `
                    SELECT
						emp.id_pakan,
						emp.nama_pakan
					FROM d_pakan emp
					WHERE 1`,
				params: [],
			};

		if (id_pakan) {
			sql.query += ` AND emp.id_pakan = ?`;
			sql.params.push(id_pakan);
		}

		sql.query += ` ORDER BY emp.id_pakan ASC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_pakan: data[key].id_pakan,
						nama_pakan: data[key].nama_pakan,
					})
				}

				return {
					status: true,
					data: id_pakan ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_pakan && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data id_pakan tidak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('pakan list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _pakan();







