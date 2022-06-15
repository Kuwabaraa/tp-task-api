export function selector (balise, val) {
    if (typeof(balise) == "number") return false;
    return val === "all" ? document.querySelectorAll(balise) : document.querySelector(balise)
}

export function style (balise, val, prop, propval) {
    if (typeof(balise) == "number") return false;
    return val === "all" ? [...document.querySelectorAll(balise)].map(x => x.style[prop] = propval) : document.querySelector(balise).style
}

export class Dom {
    showUsers (liste) {
      let lis = liste.map(x => `<li value=${ x.id }> ${ x.name } </li>`)
      selector('.user_list').innerHTML = `<ul> ${ lis.join('') } </ul>`
    }

    taskLowerCase (id, liste) {
      let t;
      for(var i = 0; i < liste.length; i++) if (liste[i].id == id) t = liste[i];
      for(var i in t) if (i === "taskAchieve" || i === "taskToDo") t[i] = t[i].map(x => x.toLowerCase())
      return t    
    }

    success (balise, s) {
      balise.classList.add('success')
      window.setTimeout(function() {
      balise.classList.remove('success');
      balise.value = ""
      }, s)    
    }

    divsuccess (balise, s) {
      balise.classList.add('divsuccess')
      window.setTimeout(function() {
      balise.classList.remove('divsuccess');
      balise.value = ""
      }, s)    
    }

    error (balise, s) {  
      balise.classList.add('error')
      window.setTimeout(function() {
      balise.classList.remove('error');
      balise.value = ""
      }, s)        
    }
}
