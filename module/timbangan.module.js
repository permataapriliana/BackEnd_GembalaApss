const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _timbangan{
	deletetimbangan(id_timbangan){
		const sql = {
			query: `DELETE FROM d_timbangan WHERE id_timbangan = ?`,
			params: [id_timbangan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('deletetimbangan Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	updatetimbangan(data, id_timbangan){
		const sql = {
			query: `UPDATE d_timbangan SET id_ternak = ?, rf_id =?, berat_berkala = ?, suhu_berkala = ?, tanggal = ?  WHERE id_timbangan = ?`,
			params: [ data.id_ternak, data.rf_id, data.berat_berkala, data.suhu_berkala, data.tanggal, data.id_timbangan]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if(debug){
					console.error('updatetimbangan Error:', error);
				}

				return {
					status: false,
					error
				}
			})
	}

	addtimbangan(data){
		const sql = {
			query: `INSERT INTO d_timbangan(id_timbangan, id_ternak, rf_id, berat_berkala, suhu_berkala, tanggal ) VALUES (?, ?, ?, ?, ?, ?)`,
			params: [data.id_timbangan, data.id_ternak, data.rf_id, data.berat_berkala, data.suhu_berkala, data.tanggal]
		}

		return mysql.query(sql.query, sql.params)
			.then(data => {
				return {
					status: true,
					data
				}
			}).catch(error => {
				if (debug) {
					console.error('addtimbangan Error', error);
				}

				return {
					status: false,
					error
				}	
			})
		

	}

	getDetailtimbangan(id_timbangan){
		const sql = {
			query: `
			SELECT
				emp.id_timbangan,
				emp.id_ternak,
				emp.rf_id,
				emp.berat_berkala,
				emp.suhu_berkala,
				emp.tanggal
			FROM d_timbangan emp
			WHERE emp.id_timbangan = ?`,
			params: [id_timbangan]
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
					console.error('getDetailtimbangan Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};

	listtimbangan(options = {}){
		const { id_timbangan } = options
		const sql = {
				query: `
                    SELECT
						emp.id_timbangan,
						emp.id_ternak,
						emp.rf_id,
						emp.berat_berkala,
						emp.suhu_berkala,
						emp.tanggal
					FROM d_timbangan emp
					WHERE 1`,
				params: [],
			};

		if (id_timbangan) {
			sql.query += ` AND emp.id_timbangan = ?`;
			sql.params.push(id_timbangan);
		}

		sql.query += ` ORDER BY emp.id_timbangan ASC`

		return mysql.query(sql.query, sql.params)
			.then(async data => {
				let tmp = [];

				for (let key in data) {
					tmp.push({
						id_timbangan: data[key].id_timbangan,
						id_ternak: data[key].id_ternak,
						rf_id: data[key].rf_id,
						berat_berkala: data[key].berat_berkala,
						suhu_berkala: data[key].suhu_berkala,
						tanggal: data[key].tanggal,
					})
				}

				return {
					status: true,
					data: id_timbangan ? tmp[0]:tmp
				};
			})
			.catch(error => {
				if (id_timbangan && error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data id_timbangan tidak ditemukan!"
					}
				}

				if (error.code == "EMPTY_RESULT") {
					return {
						status: false,
						error: "Data masih kosong!"
					}
				}

				if(debug){
					console.error('timbangan list Error:', error);
				}

				return {
					status: false,
					error,
				};
			});
	};
}

module.exports = new _timbangan();







