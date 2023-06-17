/**
 * @class FamillePool
 * @classdesc une classe représentant un pool d'enfant.
 */
class FamillePool {
  /**
   * @constructor
   * Constructeur de la classe FamillePool.
   * Initialise une nouvelle instance de FamillePool avec une liste vide d'enfants.
   */
  constructor() {
    this.enfants = [];
  }

  /**
   * Ajoute un enfant à la liste des enfants.
   * @param {Enfant} enfant - L'enfant à ajouter.
   */
  addEnfant(enfant) {
    this.enfants.push(enfant);
  }
}

module.exports = FamillePool;
