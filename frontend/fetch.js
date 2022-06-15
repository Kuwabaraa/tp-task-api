import { Dom } from './dom.js';
const dom = new Dom();

export class RequestFetch {
  async updateGlobal (user, userId, token, balise) {
    return await fetch(`http://localhost:4000/api/users/${userId}`, {
      method: 'PUT', 
      body: JSON.stringify({
        name: user.username,
        taskToDo : user.taskToDo,
        taskAchieve: user.taskAchieve
        }),
        headers: { 
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
        }
      })
      .then(response => dom.success(balise, 1000))
      .catch(error => dom.error(balise, 1000))
    }

  async searchUser(token, name) {
      const url = `http://localhost:4000/api/users?name=${name}`
      return await fetch(url, {
        method:'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
    }

  async addUser(token, name, balise) {
    return await fetch(`http://localhost:4000/api/users/`, {
        method:'POST',
        body: JSON.stringify(
          {
            name: name,
            taskToDo: [],
            taskAchieve : []
          }
        ),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => dom.success(balise, 1000)) 
    }

  async deleteUser (userId, token, balise) {
      return await fetch(`http://localhost:4000/api/users/${userId}`, {
        method:'DELETE',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => dom.success(balise, 1000))
      .catch(error => dom.error(balise, 1000))
    }
}