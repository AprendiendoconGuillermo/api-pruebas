require("dotenv").config({ path: "settings.env" });

module.exports={
    db_dev:{
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD_DB_DV,
        database: process.env.DB_DEV
    }
}