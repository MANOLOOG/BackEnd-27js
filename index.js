const fs = require("fs");

const db = "koders.json";

const contentString = fs.readFileSync(db, "utf8");
const content = JSON.parse(contentString);

const addKoder = (koder) => {
  content.push({ name: koder });
  fs.writeFileSync(db, JSON.stringify(content));
};

const listKoders = () => {
  content.forEach((koder) => console.log(koder));
};

const removeKoder = (koderName) => {
  const remove = content.filter((koder) => koder.name !== koderName);
  fs.writeFileSync(db, JSON.stringify(remove));
};

const resetDatabase = () => {
  fs.writeFileSync(db, "[]");
};

const command = process.argv[2];

switch (command) {
  case "add":
    const koderAdd = process.argv[3];
    addKoder(koderAdd);
    break;
  case "ls":
    listKoders();
    break;
  case "rm":
    const koderRemove = process.argv[3];
    removeKoder(koderRemove);
    break;

  case "reset":
    resetDatabase();
    break;
  default:
    console.log("Comando no valido");
    console.log("Comandos: ");
    console.log(
      "\nadd [name]: Añadir nuevo koder",
      "\nls: Listar todos los koders",
      "\nrm [name]: Eliminar koder por nombre",
      "\nreset: Eliminar todos los koders"
    );
}
