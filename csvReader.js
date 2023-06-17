const fs = require("fs");
const csv = require("csv-parser");

/**
 * Lit un fichier CSV et renvoie les données sous forme d'un tableau d'objets.
 *
 * @param {string} filePath - Le chemin du fichier CSV à lire.
 * @returns {Promise<Array<Object>>} Une promesse résolue avec les données du fichier CSV.
 * @throws {Error} Une erreur est lancée si la lecture du fichier échoue.
 */
function readCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = {
  readCsvFile,
};
