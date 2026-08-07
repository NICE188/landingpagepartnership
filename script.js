document.addEventListener(
"DOMContentLoaded",
()=>{


const menu =
document.getElementById(
"menuButton"
);


const side =
document.getElementById(
"sideMenu"
);


const overlay =
document.getElementById(
"overlay"
);



function openMenu(){

side.classList.add(
"active"
);

overlay.classList.add(
"active"
);

}



function closeMenu(){

side.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);

}




menu.onclick=openMenu;


overlay.onclick=closeMenu;






// Referral Tracking


const buttons =
document.querySelectorAll(
".referral"
);



buttons.forEach(
btn=>{


let url =
new URL(
btn.href
);



let params =
new URLSearchParams(
location.search
);



[
"utm_source",
"utm_campaign",
"subid",
"clickid"

]
.forEach(
key=>{


if(params.has(key)){


url.searchParams.set(
key,
params.get(key)
);


}


});



btn.href=url;



btn.onclick=()=>{


localStorage.setItem(

"last_click",

JSON.stringify({

company:
btn.dataset.company,


time:
new Date()

})


);



};


});



});
