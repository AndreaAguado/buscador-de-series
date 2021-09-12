"use strict";const input=document.querySelector(".js_input"),list=document.querySelector(".js_list"),favList=document.querySelector(".js_favs_list"),button=document.querySelector(".js_submit_button");let resetButton,deleteButton,url;function urlMaker(){return url="//api.tvmaze.com/search/shows?q=",url+=input.value,url}let listItem,shows=[];function requestToAPI(){shows=[],url=urlMaker(),fetch(url).then(t=>t.json()).then(t=>{console.log(t);for(let e=0;e<t.length;e++)shows[e]=t[e].show;console.log(shows),displayNoResults()})}function displayResults(){let t="";for(let e=0;e<shows.length;e++){t+=isFavorite(shows[e])?`<li class="list_item js_list_item fav" id="${shows[e].id}">`:`<li class="list_item js_list_item" id="${shows[e].id}">`,null===shows[e].image?t+='<img class="img" src="https://via.placeholder.com/210x295/b5a899/736762/?text=TV" alt="movie cover">':t+=`<img class="img" src=${shows[e].image.medium} alt="movie cover">`,t+=`  <h2 class="movie_title">${shows[e].name}</h2>`,t+="</li>"}list.innerHTML=t,listenFavs()}function listenFavs(){listItem=document.querySelectorAll(".js_list_item"),console.log(listItem);for(const t of listItem)t.addEventListener("click",handleListItems)}function displayNoResults(){if(shows.length<1){let t="";t+='<li class="list_item js_list_item">',t+=`No se encontraron resultados para "${input.value}"`,t+="</li>",list.innerHTML=t}else displayResults()}let favorites=[];function isFavorite(t){return void 0!==favorites.find(e=>e.id===t.id)}function handleListItems(t){const e=t.currentTarget.id,s=t.currentTarget;console.log(s),s.classList.toggle("fav"),console.log(e);const o=shows.find(t=>t.id===parseInt(e));console.log(o);const l=favorites.findIndex(t=>t.id===parseInt(e));-1===l?favorites.push(o):favorites.splice(l,1),console.log(favorites),displayFavsList(),saveToLocalStorage()}function saveToLocalStorage(){localStorage.setItem("favorites",JSON.stringify(favorites))}function getFromLocalStorage(){let t=JSON.parse(localStorage.getItem("favorites"));if(null===t){let t="";t+='<li class="fav_item js_fav_item">',t+="Aun no tienes favoritos.",t+="</li>",favList.innerHTML=t}else favorites=t,displayFavsList()}function displayFavsList(){let t="";if(0===favorites.length||null===favorites)t+="Aun no tienes favoritos.";else{for(const e of favorites)t+=`<li class="fav_item js_fav_item" id="${e.id}">`,null===e.image?t+='<img class="img" src="https://via.placeholder.com/210x295/b5a899/736762/?text=TV"  alt="movie cover">':t+=`<img class="img" src="${e.image.medium}" alt="movie cover">`,t+=`<h2 class="movie_title">${e.name}</h2>`,t+=`<button class="reset_button js_reset_button" id="${e.id}">X</button>`,t+="</li>";t+='<button class="delete_button js_delete_button">Borrar todos</button>'}favList.innerHTML=t,listenResetButtons(),listenDeleteButton()}function listenResetButtons(){resetButton=document.querySelectorAll(".js_reset_button");for(const t of resetButton)t.addEventListener("click",handleResetButton)}function handleResetButton(t){t.preventDefault();const e=t.currentTarget.id;console.log(e);const s=favorites.findIndex(t=>t.id===parseInt(e));favorites.splice(s,1),console.log(favorites),console.log(favorites.length),displayFavsList(),saveToLocalStorage()}function listenDeleteButton(){deleteButton=document.querySelector(".js_delete_button"),console.log(deleteButton),deleteButton.addEventListener("click",handleDeleteButton)}function handleDeleteButton(t){t.preventDefault(),favorites=[],removeFromLocalStorage(),displayFavsList()}function removeFromLocalStorage(){localStorage.removeItem("favorites")}function handleButton(t){t.preventDefault(),urlMaker(),requestToAPI()}getFromLocalStorage(),button.addEventListener("click",handleButton);