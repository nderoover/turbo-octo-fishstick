const readline = require("node:readline");

const interfaceLecture = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const lignes = interfaceLecture[Symbol.asyncIterator]();

async function demander(question) {
    process.stdout.write(question);
    const { value } = await lignes.next();
    return value ?? "";
}

async function calculatrice() {
    let continuer = "Oui";

    while (continuer.toLowerCase() === "oui") {
        const a = Number(await demander("Entrez le premier nombre : "));
        const b = Number(await demander("Entrez le deuxième nombre : "));
        const operation = await demander("Choisissez une opération (+, -, *, /) : ");

        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            console.log("Erreur : veuillez entrer des nombres valides.");
        } else {
            switch (operation) {
                case "+":
                    console.log("Résultat :", a + b);
                    break;
                case "-":
                    console.log("Résultat :", a - b);
                    break;
                case "*":
                    console.log("Résultat :", a * b);
                    break;
                case "/":
                    if (b !== 0) {
                        console.log("Résultat :", a / b);
                    } else {
                        console.log("Erreur : division par zéro");
                    }
                    break;
                default:
                    console.log("Opération invalide");
            }
        }

        continuer = await demander("Voulez-vous effectuer un autre calcul ? (Oui/Non) ");
    }

    console.log("Merci d'avoir utilisé notre calculatrice !");
    interfaceLecture.close();
}

calculatrice();
