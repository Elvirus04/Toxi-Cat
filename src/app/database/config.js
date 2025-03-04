import { Sequelize } from "sequelize";

const sequelize = new Sequelize("toxicat_db", "toxicat_user", "toxicat_pass", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Désactive les logs SQL
});

export default sequelize;
