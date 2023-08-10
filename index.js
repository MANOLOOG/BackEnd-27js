const fs = require("fs");

const db = "koders.json";

const dbFile = (file) => {
  fs.writeFileSync(file, "[]", "utf-8");
};
if (fs.existsSync(db)) {
} else {
  dbFile(db);
}

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
  if (!content.find((koder) => koder.name === koderName)) {
    console.log(
      `No se encontro el koder con el nombre: ${koderName}. Verifica el nombre e intentalo de nuevo`
    );
    process.exit(1);
  }
  const remove = content.filter((koder) => koder.name !== koderName);
  fs.writeFileSync(db, JSON.stringify(remove));
};

const command = process.argv[2];

switch (command) {
  case "add":
    const koderAdd = process.argv[3];
    if (!koderAdd) {
      console.log("Ingresa el nombre del Koder");
      process.exit(1);
    }
    addKoder(koderAdd);
    break;
  case "ls":
    listKoders();
    break;
  case "rm":
    const koderRemove = process.argv[3];
    if (!koderRemove) {
      console.log("Ingresa el nombre del Koder a Eliminar");
      process.exit(1);
    }
    removeKoder(koderRemove);
    break;

  case "reset":
    dbFile(db);

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
