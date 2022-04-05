const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _penjualan{
	deletepenjualan(id_penjualan){
		const sql = {
			query: `DELETE FROM s_penjualan WHERE id_penjualan = ?`,
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
			query: `UPDATE s_penjualan SET id_cus = ?, id_produk = ?, jumlah = ?, id_stock = ?, tgl_penjualan = ?  WHERE id_penjualan = ?`,
			params: [data.id_cus, data.id_produk, data.jumlah, data.id_stock, data.tgl_penjualan, data.id_penjualan]
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
			query: `INSERT INTO s_penjualan(id_penjualan, id_cus, id_produk,  jumlah, id_stock, tgl_penjualan) VALUES (?, ?, ?, ?, ?, ?)`,
			params: [data.id_penjualan, data.id_cus, data.id_produk, data.jumlah, data.id_stock, data.tgl_penjualan]
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
				emp.id_cus,
                emp.id_produk,
                emp.jumlah,
				emp.id_stock,
                emp.tgl_penjualan
			FROM s_penjualan emp
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
						emp.id_cus,
                        emp.id_produk,
                        emp.jumlah,
						emp.id_stock,
                        emp.tgl_penjualan
					FROM s_penjualan emp
					WHERE 1`,
				params: [],
			};

		if (id_penjualan) {
			sql.query += ` AND emp.id_penjualan = ?`;
			sql.params.push(id_penjualan);
		}

		sql.query += ` ORDER BY emp.jumlah DESC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_penjualan: data[key].id_penjualan,
						id_cus: data[key].id_cus,
						id_produk:data[key].id_produk,
                        jumlah:data[key].jumlah,
                        id_stock:data[key].id_stock,
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
						error: "Data tid_penjualanak ditemukan!"
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
