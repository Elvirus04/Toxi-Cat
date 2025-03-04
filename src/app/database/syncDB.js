import sequelize from "./config.js";
import History from "./models/History.js";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Création / Mise à jour de la table
    console.log("📦 Base de données synchronisée !");
    process.exit();
  } catch (error) {
    console.error("❌ Erreur lors de la synchronisation :", error);
    process.exit(1);
  }
};

syncDatabase();
