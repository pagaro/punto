const status =  {
    WAIT: "WAIT", // - WAIT : en attente de joueurs
    RUNNING: "RUNNING", // - RUNNING : en cours
    BREAK: "BREAK", // - BREAK : en pause
    FINISHED: "FINISHED" // - FINISHED : terminé
}
// Exemple d'utilisation :
// const { status } = require('./status.js');
// console.log(status.WAIT); // Affiche "WAIT"

exports.status = status