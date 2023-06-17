const { v4: uuidv4 } = require("uuid");
const {
  validateString,
  validatePositiveInteger,
  validateDepartment,
  validateZipCode,
} = require("./Validate");

/**
 * @class Creche
 * @classdesc Une classe représentant une crèche.
 */
class Creche {
  /**
   * Crée une instance de la classe `Creche` avec les données fournies.
   * @constructor
   * @param {Array<string>} data - Les données de la crèche.
   * Les éléments du tableau doivent être dans l'ordre suivant :
   *  - Nom de la crèche
   *  - Capacité de la crèche (nombre entier positif)
   *  - Adresse de la crèche
   *  - Code postal de la crèche
   *  - Ville de la crèche
   */
  constructor(data) {
    this.id = uuidv4();
    this.name = validateString(data[0]);
    this.capacity = validatePositiveInteger(data[1]);
    this.address = validateString(data[2]);
    this.zipCode = validateZipCode(data[3].replace(" ", ""));
    this.department = validateDepartment(this.zipCode.substring(0, 2));
    this.city = validateString(data[4]);
  }

  /**
   * Renvoie le code postal de la crèche.
   * @returns {string} Le code postal de la crèche.
   */
  getZipCode() {
    return this.zipCode;
  }

  /**
   * Renvoie le département de la crèche.
   * @returns {string} Le département de la crèche.
   */
  getDepartment() {
    return this.department;
  }

  /**
   * Renvoie une représentation textuelle de la crèche.
   * @returns {string} La représentation textuelle de la crèche au format : `<id> : <nom>, <adresse>, <code postal> <ville>`.
   */
  toString() {
    return `${this.id} : ${this.name}, ${this.address}, ${this.zipCode} ${this.city}`;
  }
}

module.exports = Creche;
