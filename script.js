document.addEventListener(
"DOMContentLoaded",
function(){


const buttons =
document.querySelectorAll(
".referral"
);


const loading =
document.getElementById(
"loading"
);



buttons.forEach(
function(button){



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
"utm_content",
"subid",
"clickid"

].forEach(
function(key){


if(
params.has(key)
){

url.searchParams.set(

key,

params.get(key)

);

}


}

);



button.href =
url.toString();





button.addEventListener(
"click",
function(){



let clickData={


company:
button.dataset.company,


time:
new Date()
.toISOString(),


source:
window.location.href


};



localStorage.setItem(

"last_click",

JSON.stringify(clickData)

);





if(loading){

loading.classList.add(
"active"
);

}



}

);



}



);


});
