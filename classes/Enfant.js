const {
  validateString,
  validateDate,
  validateDepartment,
  validateZipCode,
} = require("./Validate");

/**
 * @class Enfant
 * @classdesc Une classe représentant un enfant.
 */
class Enfant {
  /**
   * Crée une instance de la classe Enfant avec les données fournies.
   * @constructor
   * @param {Array<string>} data - Les données de l'enfant.
   * Les éléments du tableau doivent être dans l'ordre suivant :
   *  - Nom de famille
   *  - Prénom
   *  - Date de naissance
   *  - Adresse
   *  - Code postal
   *  - Ville
   *  - Crèche (facultatif)
   */
  constructor(data) {
    this.lastName = validateString(data[0]);
    this.firstName = validateString(data[1]);
    this.birthDate = validateDate(data[2]);
    this.address = validateString(data[3]);
    this.zipCode = validateZipCode(data[4].replace(" ", ""));
    this.department = validateDepartment(this.zipCode.substring(0, 2));
    this.city = validateString(data[5]);
    this.creche = data[6];
  }

  /**
   * Renvoie l'âge de l'enfant en années.
   * @returns {number} L'âge de l'enfant en années.
   */
  getAge() {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  /**
   * Renvoie l'âge de l'enfant en mois.
   * @returns {number} L'âge de l'enfant en mois.
   */
  getMonths() {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      months = 12 + months;
    }
    return months;
  }

  /**
   * Renvoie la crèche à laquelle l'enfant est inscrit.
   * @returns {string} Le nom de la crèche à laquelle l'enfant est inscrit.
   */
  getCreche() {
    return this.creche;
  }

  /**
   * Renvoie le département du domicile de l'enfant.
   * @returns {string} Le département du domicile de l'enfant.
   */
  getDepartment() {
    return this.department;
  }

  /**
   * Renvoie le code postal du domicile de l'enfant.
   * @returns {string} Le code postal du domicile de l'enfant.
   */
  getZipCode() {
    return this.zipCode;
  }

  /**
   * Renvoie une représentation textuelle de l'enfant.
   * @returns {string} Représentation textuelle de l'enfant au format suivant : "<prénom> <nom>, <adresse>, <code postal> <ville>".
   */
  toString() {
    return `${this.firstName} ${this.lastName}, ${this.address}, ${this.zipCode} ${this.city}`;
  }
}

module.exports = Enfant;
