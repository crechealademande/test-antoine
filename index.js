/**
 * @module index
 * @description Ce module contient le point d'entrée principal du programme.
 */

const Creche = require("./classes/Creche");
const CrechePool = require("./classes/CrechePool");
const FamillePool = require("./classes/FamillePool");
const Enfant = require("./classes/Enfant");
const { readCsvFile } = require("./csvReader");

/**
 * Fonction principale du programme.
 * Lit les fichiers CSV des crèches et des familles, puis vérifie les conditions d'acceptation des enfants.
 * @function main
 * @returns {void}
 * @async
 */
async function main() {
  // Vérification des noms de fichiers CSV pour voir si ils sont passés en tant qu'arguments
  if (process.argv.length < 4) {
    console.log("Usage: node index.js <crecheCsvFile> <famillesCsvFile>");
    process.exit(1);
  }

  // Récupération des noms de fichiers CSV à partir des arguments
  const crecheCsvFile = process.argv[2];
  const famillesCsvFile = process.argv[3];

  const crechePool = await readCrecheCsvFile(crecheCsvFile);
  // Si on a une liste de crèches
  if (crechePool) {
    const famillePool = await readFamillesCsvFile(famillesCsvFile);
    // Si on a une liste d'enfants
    if (famillePool) {
      // Pour chaque enfant
      for (const enfant of famillePool.enfants) {
        // On vérifie les conditions d'acceptation
        acceptanceConditions(enfant, crechePool);
      }
    }
  }
}

/**
 * Lit le fichier CSV des crèches et crée une instance de `CrechePool` contenant les crèches.
 * @function readCrecheCsvFile
 * @param {string} crecheCsvFile - Le chemin du fichier CSV des crèches.
 * @returns {Promise<CrechePool|null>} - Une promesse qui se résout avec l'instance de `CrechePool` si la lecture est réussie, sinon `null`.
 * @async
 */
async function readCrecheCsvFile(crecheCsvFile) {
  try {
    const crecheData = await readCsvFile(crecheCsvFile);
    const crechePool = new CrechePool();

    for (const data of crecheData) {
      try {
        const creche = new Creche(Object.values(data));
        crechePool.addCreche(creche);
      } catch (error) {
        console.error("Erreur lors de l'ajout d'une crèche :", error);
      }
    }

    return crechePool;
  } catch (error) {
    console.error(
      `Une erreur s'est produite lors de la lecture du fichier ${crecheCsvFile}:`,
      error
    );
    return null;
  }
}

/**
 * Lit le fichier CSV des familles et crée une instance de `FamillePool` contenant les enfants.
 * @function readFamillesCsvFile
 * @param {string} famillesCsvFile - Le chemin du fichier CSV des familles.
 * @returns {Promise<FamillePool|null>} - Une promesse qui se résout avec l'instance de `FamillePool` si la lecture est réussie, sinon `null`.
 * @async
 */
async function readFamillesCsvFile(famillesCsvFile) {
  try {
    const famillesData = await readCsvFile(famillesCsvFile);
    const famillePool = new FamillePool();

    for (const data of famillesData) {
      try {
        const enfant = new Enfant(Object.values(data));
        famillePool.addEnfant(enfant);
      } catch (error) {
        console.error("Erreur lors de l'ajout d'un enfant :", error);
      }
    }

    return famillePool;
  } catch (error) {
    console.error(
      `Une erreur s'est produite lors de la lecture du fichier ${famillesCsvFile}:`,
      error
    );
    return null;
  }
}

/**
 * Vérifie les conditions d'acceptation d'un enfant dans une crèche.
 * Affiche les résultats de la vérification.
 * @function acceptanceConditions
 * @param {Enfant} enfant - L'enfant à vérifier.
 * @param {CrechePool} crechePool - Le pool de crèches disponibles.
 * @returns {void}
 */
function acceptanceConditions(enfant, crechePool) {
  console.log("=====================================");

  // Vérification de l'âge de l'enfant
  if (enfant.getAge() > 4) {
    console.log(
      `L'enfant ${enfant.toString()} est trop vieux pour être accepté en crèche car il a ${enfant.getAge()} ans.`
    );
  } else if (enfant.getMonths() < 4) {
    console.log(
      `L'enfant ${enfant.toString()} est trop jeune pour être accepté en crèche car il a ${enfant.getMonths()} mois.`
    );
  } else {
    // Vérification si l'enfant est déjà inscrit en crèche
    if (enfant.getCreche()) {
      console.log(
        `L'enfant ${enfant.toString()} est déjà inscrit dans la crèche : `
      );
      // Récupération de la crêche de l'enfant
      const crecheInfo = enfant.getCreche().split(",");
      // Affichage de la crèche de l'enfant
      if (crecheInfo.length !== 3) {
        console.log("La crèche de l'enfant n'est pas correctement renseignée.");
      } else {
        const creche = crechePool.getCrecheByNameAddressZipCode(
          crecheInfo[0],
          crecheInfo[1],
          crecheInfo[2]
        );
        console.log(creche ? creche.toString() : "Crèche introuvable.");
      }
    } else {
      // Recherche des crèches disponibles
      const crecheDepartment = crechePool.creches.filter(
        (creche) => creche.getDepartment() === enfant.getDepartment()
      );

      // Si il y a des crèches disponibles dans le département
      if (crecheDepartment.length > 0) {
        console.log(
          `L'enfant ${enfant.toString()} peut être accepté en crèche car il y a ${
            crecheDepartment.length
          } crèche(s) disponible(s) dans son département.`
        );

        // Récupération des crèches dans le même code postal
        displayAvailableBestCreches(enfant, crecheDepartment);

        // Récupération des crèches dans le même département
        displayAvailableCreches(enfant, crecheDepartment);
      } else {
        console.log(
          `L'enfant ${enfant.toString()} ne peut pas être accepté en crèche car il n'y a pas de crèche disponible dans son département.`
        );
      }
    }
  }
}

/**
 * Affiche les crèches disponibles dans le même code postal que l'enfant.
 * @function displayAvailableCreches
 * @param {Enfant} enfant - L'enfant concerné.
 * @param {Creche[]} crecheDepartment - Les crèches dans le même département que l'enfant.
 * @returns {void}
 */
function displayAvailableBestCreches(enfant, crecheDepartment) {
  // Récupération des crèches dans le même code postal
  const crecheZipCode = crecheDepartment.filter(
    (creche) => creche.getZipCode() === enfant.getZipCode()
  );

  // Si il y a une crèche dans le même code postal on l'affiche en premier
  if (crecheZipCode.length > 0) {
    console.log(
      crecheZipCode.length === 1
        ? "La meilleure crèche est : "
        : "Les meilleures crèches sont :"
    );
    for (const creche of crecheZipCode) {
      console.log(creche.toString());
    }
  }
}

/**
 * Affiche les crèches disponibles dans le même département que l'enfant mais pas dans le même code postal.
 * @function displayAvailableCreches
 * @param {Enfant} enfant - L'enfant concerné.
 * @param {Creche[]} crecheDepartment - Les crèches dans le même département que l'enfant.
 * @returns {void}
 */
function displayAvailableCreches(enfant, crecheDepartment) {
  // Récupération des crèches dans le même département mais pas dans le même code postal
  const crecheNotZipCode = crecheDepartment.filter(
    (creche) => creche.getZipCode() !== enfant.getZipCode()
  );

  // Si il y a des crèches dans le même département mais pas dans le même code postal on les affiche
  if (crecheNotZipCode.length > 0) {
    console.log(
      crecheNotZipCode.length === 1
        ? "La crèche disponible est : "
        : "Les crèches disponibles sont :"
    );

    for (const creche of crecheNotZipCode) {
      console.log(creche.toString());
    }
  }
}

main();
