document.addEventListener(
"DOMContentLoaded",
()=>{


// SIDE MENU


const button =
document.getElementById(
"menuButton"
);


const menu =
document.getElementById(
"sideMenu"
);


const overlay =
document.getElementById(
"overlay"
);



button.onclick=()=>{


menu.classList.add(
"active"
);


overlay.classList.add(
"active"
);


};



overlay.onclick=()=>{


menu.classList.remove(
"active"
);


overlay.classList.remove(
"active"
);


};







// REFERRAL TRACKING


const links =
document.querySelectorAll(
".referral"
);



links.forEach(link=>{


let url =
new URL(
link.href
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

].forEach(key=>{


if(params.has(key)){


url.searchParams.set(

key,

params.get(key)

);


}


});



link.href=url;



link.onclick=()=>{


localStorage.setItem(

"click",

JSON.stringify({

company:
link.dataset.company,


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
