"use strict";const input=document.querySelector(".js_input"),list=document.querySelector(".js_list"),button=document.querySelector(".js_submit_button");let url;function urlMaker(){return url="//api.tvmaze.com/search/shows?q=",url+=input.value,url}let shows=[],images=[],showTitles=[];function requestToAPI(){url=urlMaker(),fetch(url).then(e=>e.json()).then(e=>{console.log(e);for(let s=0;s<e.length;s++)shows[s]=e[s].show,images[s]=shows[s].image,showTitles[s]=shows[s].name;console.log(shows),console.log(images),console.log(showTitles),displayResults()})}function displayResults(){let e="";for(let s=0;s<shows.length;s++)e+='<li class="list_item js_list_item">',null===images[s].medium?e+='<img class="img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="movie cover">':e+=`<img class="img" src=${images[s].medium} alt="movie cover">`,e+=`  <h2 class="movie_title">${showTitles[s]}</h2>`,e+='<h2 class="movie_title">Movie Title</h2>',e+="</li>",list.innerHTML=e}function handleButton(e){e.preventDefault(),urlMaker(),requestToAPI()}button.addEventListener("click",handleButton);