/**
 * Valide une chaîne de caractères non vide.
 * @param {string} value - La valeur à valider.
 * @returns {string} - La chaîne de caractères validée (trimmée).
 * @throws {Error} - Si la valeur n'est pas une chaîne de caractères non vide.
 */
function validateString(value) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      "La valeur doit être une chaîne de caractères non vide: " + value
    );
  }
  return value.trim();
}

/**
 * Valide une date au format JJ/MM/AAAA.
 * @param {string} value - La date à valider.
 * @returns {Date} - La date validée.
 * @throws {Error} - Si la date n'est pas au format attendu ou si elle est invalide.
 */
function validateDate(value) {
  const datePattern = /^\d{2}\/\d{1 || 2}\/\d{4}$/;
  if (!datePattern.test(value)) {
    throw new Error("La date doit être au format JJ/MM/AAAA: " + value);
  }
  const [day, month, year] = value.split("/");
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    isNaN(parsedDate.getDate()) ||
    parsedDate.getMonth() !== Number(month) - 1 ||
    parsedDate.getFullYear() !== Number(year)
  ) {
    throw new Error("La date fournie est invalide: " + value);
  }

  return parsedDate;
}

/**
 * Valide un code postal composé de 5 chiffres.
 * @param {string} value - Le code postal à valider.
 * @returns {string} - Le code postal validé.
 * @throws {Error} - Si le code postal n'est pas au format attendu.
 */
function validateZipCode(value) {
  const zipCodePattern = /^\d{5}$/;
  if (!zipCodePattern.test(value)) {
    throw new Error(
      "Le code postal doit être un nombre à 5 chiffres: " + value
    );
  }
  return value;
}

/**
 * Valide un numéro de département composé de 2 chiffres.
 * @param {string} value - Le numéro de département à valider.
 * @returns {string} - Le numéro de département validé.
 * @throws {Error} - Si le numéro de département n'est pas au format attendu.
 */
function validateDepartment(value) {
  const departmentPattern = /^\d{2}$/;
  if (!departmentPattern.test(value)) {
    throw new Error(
      "Le numéro de département doit être un nombre à 2 chiffres: " + value
    );
  }
  return value;
}

/**
 * Valide un entier positif.
 * @param {string} value - La valeur à valider.
 * @returns {number} - L'entier positif validé.
 * @throws {Error} - Si la valeur n'est pas un entier positif.
 */
function validatePositiveInteger(value) {
  const intValue = parseInt(value);
  if (isNaN(intValue) || intValue <= 0) {
    throw new Error("La valeur doit être un entier positif: " + value);
  }
  return intValue;
}

module.exports = {
  validateString,
  validateDate,
  validateZipCode,
  validateDepartment,
  validatePositiveInteger,
};
