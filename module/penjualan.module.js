const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _penjualan{
	deletepenjualan(id_penjualan){
		const sql = {
			query: `DELETE FROM d_penjualan WHERE id_penjualan = ?`,
			params: [id_penjualan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deletepenjualan Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updatepenjualan(data, id_penjualan){
		const sql = {
			query: `UPDATE d_penjualan SET id_users = ?, id_ternak = ?, total_berat = ?, total_harga = ?, tgl_penjualan = ?  WHERE id_penjualan = ?`,
			params: [data.id_users, data.id_ternak, data.total_berat, data.total_harga, data.tgl_penjualan, data.id_penjualan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updatepenjualan Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addpenjualan(data){
		const sql = {
			query: `INSERT INTO d_penjualan(id_penjualan, id_users, id_ternak,  total_berat, total_harga, tgl_penjualan) VALUES (?, ?, ?, ?, ?, ?)`,
			params: [data.id_penjualan, data.id_users, data.id_ternak, data.total_berat, data.total_harga, data.tgl_penjualan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addpenjualan Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailpenjualan(id_penjualan){
		const sql = {
			query: `
			SELECT
				emp.id_penjualan,
				emp.id_users,
                emp.id_ternak,
                emp.total_berat,
				emp.total_harga,
                emp.tgl_penjualan
			FROM d_penjualan emp
			WHERE emp.id_penjualan = ?`,
			params: [id_penjualan]
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
					console.error('getDetailpenjualan Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	listpenjualan(options = {}){
		const { id_penjualan } = options
		const sql = {
				query: `
                    SELECT
						emp.id_penjualan,
						emp.id_users,
                        emp.id_ternak,
                        emp.total_berat,
						emp.total_harga,
                        emp.tgl_penjualan
					FROM d_penjualan emp
					WHERE 1`,
				params: [],
			};

		if (id_penjualan) {
			sql.query += ` AND emp.id_penjualan = ?`;
			sql.params.push(id_penjualan);
		}

		sql.query += ` ORDER BY emp.total_berat DESC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_penjualan: data[key].id_penjualan,
						id_users: data[key].id_users,
						id_ternak:data[key].id_ternak,
                        total_berat:data[key].total_berat,
                        total_harga:data[key].total_harga,
                        tgl_penjualan:data[key].tgl_penjualan,
					})
				}

				return {
					status: true,
					data: id_penjualan ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_penjualan && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data penjualan tidak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('penjualan list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _penjualan();
