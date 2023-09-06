import Sequelize from "sequelize";

// Inisialisasi Sequelize dengan konfigurasi
const db = new Sequelize("auth_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  // tambahkan opsi lainnya jika diperlukan
});

export default db;
