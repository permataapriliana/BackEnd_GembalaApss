const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _costumer{
	deletecostumer(id_cus){
		const sql = {
			query: `DELETE FROM d_costumer WHERE id_cus = ?`,
			params: [id_cus]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deletecostumer Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updatecostumer(data, id_cus){
		const sql = {
			query: `UPDATE d_costumer SET first_name = ?, last_name = ?, alamat = ?, email = ?  WHERE id_cus = ?`,
			params: [data.first_name, data.last_name, data.alamat, data.email, data.id_cus]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updatecostumer Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addcostumer(data){
		const sql = {
			query: `INSERT INTO d_costumer(id_cus, first_name, last_name,  alamat, email) VALUES (?, ?, ?, ?, ?)`,
			params: [data.id_cus, data.first_name, data.last_name, data.alamat, data.email]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addcostumer Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailcostumer(id_cus){
		const sql = {
			query: `
			SELECT
				emp.id_cus,
				emp.first_name,
                emp.last_name,
                emp.alamat,
				emp.email
			FROM d_costumer emp
			WHERE emp.id_cus = ?`,
			params: [id_cus]
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
					console.error('getDetailcostumer Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	listcostumer(options = {}){
		const { id_cus } = options
		const sql = {
				query: `
                    SELECT
						emp.id_cus,
						emp.first_name,
                        emp.last_name,
                        emp.alamat,
						emp.email
					FROM d_costumer emp
					WHERE 1`,
				params: [],
			};

		if (id_cus) {
			sql.query += ` AND emp.id_cus = ?`;
			sql.params.push(id_cus);
		}

		sql.query += ` ORDER BY emp.alamat DESC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_cus: data[key].id_cus,
						first_name: data[key].first_name,
						last_name:data[key].last_name,
                        alamat:data[key].alamat,
                        email:data[key].email,
					})
				}

				return {
					status: true,
					data: id_cus ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_cus && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data tid_cusak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('costumer list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _costumer();



// Kelompok 6
// 1. Bima - 2202077
// 2. Dany Widiyanto - 2202081
// 3. Dede Septa Maulana Fajar - 2202069 
// 4. Dian Permata Apriliana Dewi-2202087
// 5. sem abraham - 2202071








