  
  const usersTask = [
    {
      id: 1,
      name: "Mohamed",
      taskToDo: ["Apprendre le html","Apprendre les méthodes Agiles"],
      taskAchieve: ["Revoir ses cours","Apprendre des requêtes SQL"],
      created: new Date()
    },

    {
      id:2,
      name: "Sabrina",
      taskToDo: ["S'expérimenter en chimie", "Apprendre plus de combinaisons"],
      taskAchieve: ["Partager ses connaissances","Aider les personnes qui ont besoin d'aide" ],
      created: new Date()
    },

    {  
      id:3,
      name: "Jean",
      taskToDo: [
        "Apprendre le Javascript",
        "Apprendre le CSS"
      ],
      taskAchieve: [
        "HTML",
        "Wordpress"
      ],
      created: new Date()
    },

    {
      id:4,
      name: "Jeanette",
      taskToDo: ["Manger des danettes","Chocolat & Vanille"],
      taskAchieve: ["Apprentissage du dev","Diplôme formatrice !"],
      created: new Date()
    }
]

for(var i = 5; i < 30; i++) {
  const nb = i - 5;
  usersTask.push({
    id: i,
    name:`test ${ nb }`,
    taskToDo: [`Tache à faire ${ nb }`],
    taskAchieve:[`tache faite ${ nb }`],
    created:new Date()
  })
}
module.exports = usersTask;