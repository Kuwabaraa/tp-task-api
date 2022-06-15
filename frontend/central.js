import { RequestFetch } from './fetch.js';
import { selector, Dom } from './dom.js';

const dom = new Dom();
const requestfetch = new RequestFetch();

export class Users {
  constructor(list) {
    this.list = list;
  }
  
  searchUser (token) {
    const search = selector('.search');
    const liste = this.list;
    const state = selector('.user_list')
    search.addEventListener('keyup', (e) => {
      const keyCode = e.keyCode;
      const value = e.target.value;
      const len = value.length
      let div = selector('.state')
      requestfetch.searchUser(token, value)
        .then(data => {
          if (!data.data) {
            div.innerHTML = data.message
            dom.error(div, 1000)
          } else {
            div.innerHTML = data.message
            dom.divsuccess(div, 2000)
            this.Globalusers(token, data.data)
          }
        }).then(res => res)
    })
  }

  addUser(token) {
    const add = selector('.add_user');
    add.addEventListener('keypress', function (e) {
      const keyCode = e.keyCode;
      const value = e.target.value;
      if (keyCode === 13) requestfetch.addUser(token, value, this)   
    })
  }

  Globalusers (token, l) {
    let liste = this.list, id;
    dom.showUsers(l)
    const lis = selector('li', 'all')
    const menu_root = selector('.menu_root')
    const container_task = selector('.container_task')
    const container_user = selector('.container_user')
    for(var i = 0; i < lis.length; i++) {
      lis[i].addEventListener("click", function (e) {
        const userName = e.target.textContent;
          const id = e.target.value
          const user_current = dom.taskLowerCase(id, liste)
          return new Promise(function(resolve, reject) {
            return liste.filter(x => x.id == id).forEach(element => {
            let toDo = "Tâches à faire", achieve = "Tâches faites";
            container_task.innerHTML = "";
            container_user.innerHTML = `
            <div class="User" 
              <div class="user_name"> <span> User : </span>  ${element.name}</div>
              <button class="act" data-value="delete_user"> Supprimer ${element.name}</button>
              <input  class="act" data-value="task_user" id="taskToDo"  placeholder="Ajouter une tâche à faire"></input> 
              <input  class="act" data-value="task_user" id="taskAchieve" placeholder="Ajouter une tâche achevée"></input>                
            
            </div>
        `   
          const act = selector('.act', 'all');
          for(var i = 0; i < act.length; i++) {   
            const btnAction = act[i];
            const datavalue = act[i].dataset.value;
            const even = datavalue == "task_user" ? "keypress" : "click"
            btnAction.addEventListener(even, function(e) {
              const code = e.keyCode
              const baliseValue = e.target.id;
                if (datavalue == "task_user" && e.keyCode == 13) {
                  const word = e.target.value.toLowerCase();
                  user_current[baliseValue].push(word)
                  requestfetch.updateGlobal(user_current, id, token)
                  dom.success(this, 2000)
                    
                } else if (datavalue === "delete_user") {
                  requestfetch.deleteUser(id, token, this)
                  
                }                   
              })
            }
              selector('.taskToDo_list').innerHTML = `<ul> <h2> ${ toDo } </h2>${element.taskToDo.map(x =>`<li class="task" value="${toDo} - taskToDo">${ x }</li>`).join('')} </ul>`
              selector('.taskAchieve_list').innerHTML = `<ul> <h2> Tâches faites </h2>${element.taskAchieve.map(x =>`<li class="task" value="${achieve} - taskAchieve">${ x }</li>`).join('')} </ul>`
              resolve({ id: id, lis: selector('.task','all'), name: element.name, taskToDo: element.taskToDo, taskAchieve: element.taskAchieve })
            })          
        }).then(userclick => {
            const li_task = userclick.lis;
            const task_title = document.createElement('div')
            task_title.className = "task_title"
            for(var i = 0; i < li_task.length; i++) {
              const li = li_task[i];     
              li.addEventListener('click', function(e) {
                const value = this.getAttribute('value').split(' - ')
                const valueTitle = value[0];
                const valueOrigin = value[1]
                const nameTask = e.target.textContent.toLowerCase()
                return new Promise(function (resolve, reject) {
                container_task.innerHTML = `
                  
                    <div class="task_title"> <span>Catégorie :</span> ${valueTitle}</div>
                    <div class="task_name">  <span>Nom de la tâche :</span> ${e.target.textContent}</div>
                    <button class="action" data-value="delete_task"> supprimer cette tâche </button>
                    <input  class="action" data-value="update_task" placeholder= "modifier cette tâche" ></input> 
                              
                ` 
                return resolve(selector('.action', 'all'))
                }).then(data => {
                  for(var i = 0; i < data.length; i++) {   
                   const btnAction = data[i];
                   const datavalue = data[i].dataset.value;                   
                   const even = datavalue == "update_task" ? "keypress" : "click"
                   btnAction.addEventListener(even, function(e) {
                    const code = e.keyCode
                    const id = userclick.id;
                      if (datavalue == "update_task" && e.keyCode == 13) {
                        const word = e.target.value.toLowerCase();
                            user_current[valueOrigin].splice(user_current[valueOrigin].indexOf(nameTask), 1, word)
                            requestfetch.updateGlobal(user_current, id, token, this)
                            dom.success(this, 2000)
                          
                      } else if (datavalue === "delete_task") {
                        user_current[valueOrigin].splice(user_current[valueOrigin].indexOf(nameTask), 1)
                        requestfetch.updateGlobal(user_current, id, token, this)
                        dom.success(this, 2000)
                      }                   
                   })
                  }
                })
              })
            }
        })
      })
    } 
  }
}         
       

