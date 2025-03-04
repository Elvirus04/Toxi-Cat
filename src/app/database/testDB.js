import sequelize from "./config.js";

const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à PostgreSQL réussie ! 🚀");
  } catch (error) {
    console.error("Erreur de connexion à la base :", error);
  }
};

testDB();
