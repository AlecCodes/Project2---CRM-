const notes = document.querySelectorAll('#notification')
const xbutton = document.querySelectorAll('span')

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
console.log(notes)