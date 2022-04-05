const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _stok{
	deletestok(id_stock){
		const sql = {
			query: `DELETE FROM s_stock WHERE id_stock = ?`,
			params: [id_stock]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deletestok Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updatestok(data, id_stock){
		const sql = {
			query: `UPDATE s_stock SET  id_produk = ?, jumlah = ?  WHERE id_stock = ?`,
			params: [data.id_produk, data.jumlah, data.id_stock]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updatestok Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addstok(data){
		const sql = {
			query: `INSERT INTO s_stock(id_stock, id_produk, jumlah) VALUES (?, ?, ?)`,
			params: [data.id_stock, data.id_produk, data.jumlah]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addstok Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailstok(id_stock){
		const sql = {
			query: `
			SELECT
				emp.id_stock,
				emp.id_produk,
				emp.jumlah
			FROM s_stock emp
			WHERE emp.id_stock = ?`,
			params: [id_stock]
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
					console.error('getDetailstok Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	liststok(options = {}){
		const { id_stock } = options
		const sql = {
				query: `
                    SELECT
						emp.id_stock,
						emp.id_produk,
						emp.jumlah
					FROM s_stock emp
					WHERE 1`,
				params: [],
			};

		if (id_stock) {
			sql.query += ` AND emp.id_stock = ?`;
			sql.params.push(id_stock);
		}

		sql.query += ` ORDER BY emp.jumlah DESC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_stock: data[key].id_stock,
						id_produk: data[key].id_produk,
                        jumlah:data[key].jumlah,
					})
				}

				return {
					status: true,
					data: id_stock ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_stock && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data tid_stockak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('stok list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _stok();




// Kelompok 6
// 1. Bima - 2202077
// 2. Dany Widiyanto - 2202081
// 3. Dede Septa Maulana Fajar - 2202069 
// 4. Dian Permata Apriliana Dewi-2202087
// 5. sem abraham - 2202071



