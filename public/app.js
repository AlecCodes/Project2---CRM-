const lastContactElement = document.querySelectorAll("#lastContact")
const today = new Date()


for (const i of lastContactElement){
   const lastContactDate = new Date(i.innerHTML)
   if ((lastContactDate)&& ((today - lastContactDate)/86400000 > 14)){
    i.style.color='red'
   }
   if ((lastContactDate)&& ((today - lastContactDate)/86400000 < 7)){
    i.style.color='green'
   }
   if ((lastContactDate)&& ((today - lastContactDate)/86400000 > 7) && ((today - lastContactDate)/86400000 < 14)){
    i.style.color='orange'
   }

}