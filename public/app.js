const notes = document.querySelectorAll('#notification')
const xbutton = document.querySelectorAll('#X')
const lastContactElement = document.querySelectorAll("#lastContact")
const today = new Date()

function remove(){
    this.parentNode.remove()
}

// for (let note of notes){
//     note.style.backgroundColor = 'red'
// }

for (let button of xbutton){
    button.style.backgroundColor = 'red'
    button.addEventListener('click', remove)
}

if (!notes.length){
    console.log('empty!')
}

for (const i of lastContactElement){
   const lastContactDate = new Date(i.innerHTML)
   if ((lastContactDate)&& ((today - lastContactDate)/86400000 > 14)){
    i.style.backgroundColor='red'
   }
}