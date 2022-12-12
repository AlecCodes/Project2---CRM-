const lastContactElement = document.querySelectorAll("#lastContact")
const today = new Date()


for (const i of lastContactElement){
   const lastContactDate = new Date(i.innerHTML)
   if ((lastContactDate)&& ((today - lastContactDate)/86400000 > 14)){
    i.style.backgroundColor='red'
   }
   if ((lastContactDate)&& ((today - lastContactDate)/86400000 < 7)){
    i.style.backgroundColor='green'
   }
   if ((lastContactDate)&& ((today - lastContactDate)/86400000 > 7) && ((today - lastContactDate)/86400000 < 14)){
    i.style.backgroundColor='yellow'
   }

}