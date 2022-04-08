const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _kawin{
	deletekawin(id_kawin){
		const sql = {
			query: `DELETE FROM d_kawin WHERE id_kawin = ?`,
			params: [id_kawin]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deletekawin Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updatekawin(data, id_kawin){
		const sql = {
			query: `UPDATE d_kawin SET id_ternak = ?, tanggal_kawin = ?, rf_id_pemancek = ? WHERE id_kawin = ?`,
			params: [data.id_ternak, data.tanggal_kawin, data.rf_id_pemancek, data.id_kawin]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updatekawin Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addkawin(data){
		const sql = {
			query: `INSERT INTO d_kawin(id_kawin, id_ternak, tanggal_kawin, rf_id_pemancek) VALUES (?, ?, ?, ?)`,
			params: [data.id_kawin, data.id_ternak, data.tanggal_kawin, data.rf_id_pemancek ]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addkawin Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailkawin(id_kawin){
		const sql = {
			query: `
			SELECT
				emp.id_kawin,
                emp.id_ternak,
                emp.tanggal_kawin,
                emp.rf_id_pemancek
			FROM d_kawin emp
			WHERE emp.id_kawin = ?`,
			params: [id_kawin]
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
					console.error('getDetailkawin Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	listkawin(options = {}){
		const { id_kawin } = options
		const sql = {
				query: `
                    SELECT
						emp.id_kawin,
                        emp.id_ternak,
                        emp.tanggal_kawin,
                        emp.rf_id_pemancek
					FROM d_kawin emp`,
				params: [],
			};

		if (id_kawin) {
			sql.query += ` AND emp.id_kawin = ?`;
			sql.params.push(id_kawin);
		}

		sql.query += ` ORDER BY emp.id_kawin ASC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_kawin: data[key].id_kawin,
                        id_ternak: data[key].id_ternak,
                        tanggal_kawin: data[key].tanggal_kawin,
                        rf_id_pemancek: data[key].rf_id_pemancek
					})
				}

				return {
					status: true,
					data: id_kawin ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_kawin && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data id_kawin tidak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('kawin list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _kawin();







