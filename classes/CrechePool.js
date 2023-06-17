/**
 * @class CrechePool
 * @classdesc une classe représentant un pool de crèches.
 */
class CrechePool {
  /**
   * @constructor
   * Constructeur de la classe CrechePool.
   * Initialise un tableau vide de crèches.
   */
  constructor() {
    this.creches = [];
  }

  /**
   * Ajoute une crèche au pool.
   * @param {Creche} creche - La crèche à ajouter.
   */
  addCreche(creche) {
    this.creches.push(creche);
  }

  /**
   * Récupère une crèche à partir de son nom, son adresse et son code postal.
   * @param {string} name - Le nom de la crèche à rechercher.
   * @param {string} address - L'adresse de la crèche à rechercher.
   * @param {string} zipCode - Le code postal de la crèche à rechercher.
   * @returns {Creche | undefined} La crèche correspondante ou undefined si elle n'est pas trouvée.
   */
  getCrecheByNameAddressZipCode(name, address, zipCode) {
    return this.creches.find(
      (creche) =>
        creche.name.toLowerCase() === name.toLowerCase() &&
        creche.address.toLowerCase().trim() === address.toLowerCase().trim() &&
        creche.zipCode.trim() === zipCode.trim()
    );
  }
}

module.exports = CrechePool;
