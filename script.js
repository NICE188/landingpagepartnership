document.addEventListener(
"DOMContentLoaded",
()=>{


/* SIDE MENU */


const menuButton =
document.getElementById(
"menuButton"
);


const sideMenu =
document.getElementById(
"sideMenu"
);


const closeMenu =
document.getElementById(
"closeMenu"
);


const overlay =
document.getElementById(
"overlay"
);



menuButton.onclick=()=>{

sideMenu.classList.add(
"active"
);

overlay.classList.add(
"active"
);

};



closeMenu.onclick=()=>{

sideMenu.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);

};



overlay.onclick=()=>{

sideMenu.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);

};





/* REFERRAL TRACKING */


const buttons =
document.querySelectorAll(
".referral"
);



buttons.forEach(
button=>{


let url =
new URL(
button.href
);



let params =
new URLSearchParams(
window.location.search
);



[
"utm_source",
"utm_medium",
"utm_campaign",
"subid",
"clickid"

].forEach(
key=>{


if(params.has(key)){

url.searchParams.set(
key,
params.get(key)
);

}


}

);



button.href =
url.toString();





button.onclick=()=>{


localStorage.setItem(

"last_click",

JSON.stringify({

company:
button.dataset.company,


time:
new Date()
.toISOString()


})

);



document
.getElementById("loading")
.classList.add(
"active"
);


};



});



});
