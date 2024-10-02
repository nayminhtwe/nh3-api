const Engine = require("../models/Engine");

async function engineSeed() {
  const engines = [
    { enginepower: "150.0" },
    { enginepower: "180.0" },
    { enginepower: "200.0" },
    { enginepower: "250.0" },
    { enginepower: "300.0" },
  ];

  await Engine.bulkCreate(engines);
  console.log("Inserted engines");
}

engineSeed();
