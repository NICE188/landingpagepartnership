document.addEventListener(
"DOMContentLoaded",
function(){


const buttons =
document.querySelectorAll(".referral");


const loading =
document.getElementById("loading");



buttons.forEach(
function(button){



let url =
new URL(
button.href
);



/*
读取来源参数
*/

let params =
new URLSearchParams(
window.location.search
);



[
"utm_source",
"utm_medium",
"utm_campaign",
"utm_content",
"subid"
]

.forEach(
function(item){


if(
params.has(item)
){

url.searchParams.set(
item,
params.get(item)
);

}


}

);



button.href =
url.toString();






button.addEventListener(
"click",
function(){



let data={


company:
button.dataset.name,


time:
new Date()
.toISOString(),


page:
window.location.href


};



localStorage.setItem(

"last_click",

JSON.stringify(data)

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
