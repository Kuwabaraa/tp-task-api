import { Dom, selector, style } from './dom.js';
import { Users } from './central.js'

const btnParam = selector('.param');
const btnClose = selector('svg');
const menu = selector('.menu');
let click = true;
let id = false;

btnParam.addEventListener('click', function () {
    if (click) {
        click = false;
        selector('.menu').style.display = "block";    
        btnClose.style.display = "block"
        style('h2', 'all', 'opacity', '0.4')
        style('.z', 'all', 'border', "none")
        return btnParam.style.display = "none";
    }
})

btnClose.addEventListener('click', function () {
    if (!click) {
        click = true;
        menu.style.display = "none";
        btnParam.style.display = "block";
        btnClose.style.display = "none";
        style('h2', 'all', 'opacity', '1')
        style('.z', 'all', 'border', "block")
      
    }
})

// Step 2 : "Get JWT token 🔓"
fetch("http://localhost:4000/api/login", {
  method: "POST",
  body: JSON.stringify({ username: "root", password: "coucou" }),
  headers: { "Content-type": "application/json" }
})
  .then((res) => res.json())
  .then((res) => res.token)
  .then((token) => fetchUserslist(token));

// Step 3 : "Get pokemon list 🎉"
const fetchUserslist = (token) => {
  fetch("http://localhost:4000/api/users", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => res.json())
    .then((data) => {
      const app = new Users(data.data)
           app.searchUser(token)
           app.addUser(token)
           return app.Globalusers(token, data.data)          
    }).then(data => console.log(data))
    // .then((res) => getUsers(res.data, document.querySelector('.user_list')));
};

