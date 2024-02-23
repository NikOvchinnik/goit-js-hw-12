import{a as L,i as d,S as b}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();async function f(i,o){const t="https://pixabay.com",l="/api/?",e={key:"42408042-b97fa2d9d3888df0f8d594195",q:`${i}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:15},s=t+l;return(await L.get(s,{params:e})).data}function u(i){const o=i.hits.map(t=>`<li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img
          src=${t.webformatURL}
          alt=${t.tags}
          width="360"
          height="200"
        />
        </a>
        <ul class="img-list-info">
          <li class="img-item">
            <h2 class="img-title">Likes</h2>
            <p class="img-text">${t.likes}</p>
          </li>
          <li class="img-item">
            <h2 class="img-title">Views</h2>
            <p class="img-text">${t.views}</p>
          </li>
          <li class="img-item">
            <h2 class="img-title">Comments</h2>
            <p class="img-text">${t.comments}</p>
          </li>
          <li class="img-item">
            <h2 class="img-title">Downloads</h2>
            <p class="img-text">${t.downloads}</p>
          </li>
        </ul>
      </li>`).join("");r.listElem.insertAdjacentHTML("beforeend",o),w.refresh()}const r={formElem:document.querySelector(".form-search"),listElem:document.querySelector(".gallery-list"),loaderElem:document.querySelector(".loader-container"),btnLoadElem:document.querySelector(".btn-load")};let c="",a=1,m=0;r.formElem.addEventListener("submit",E);async function E(i){if(i.preventDefault(),c=i.target.elements.image.value.trim(),!c)return d.show({title:"Error",titleColor:"#fff",titleSize:"16",titleLineHeight:"1.5",message:"Please, enter name of image",messageColor:"#fff",messageSize:"16",messageLineHeight:"1.5",backgroundColor:"#ef4040",position:"topRight"});r.listElem.innerHTML="",g(),p(),a=1,await f(c,a).then(o=>{if(m=Math.ceil(o.totalHits/15),m===0)return reject();u(o),m>a&&(y(),r.btnLoadElem.addEventListener("click",v))}).catch(o=>{g(),d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",messageSize:"16",messageLineHeight:"1.5",backgroundColor:"#ef4040",position:"topRight"})}).finally(()=>{h(),r.formElem.reset()})}const S={captionDelay:250,captionsData:"alt"},w=new b(".gallery-list a",S);function h(){r.loaderElem.classList.add("is-hidden")}function p(){r.loaderElem.classList.remove("is-hidden")}async function v(){g(),p(),a+=1,await f(c,a).then(i=>{u(i),m>a?y():d.show({message:"Were sorry, but youve reached the end of search results.",messageColor:"#fff",messageSize:"16",messageLineHeight:"1.5",backgroundColor:"#00FFFF",position:"topRight"});const t=document.querySelector(".gallery-item").getBoundingClientRect();scrollBy({behavior:"smooth",top:t.height*2.7})}).catch(i=>{d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",messageSize:"16",messageLineHeight:"1.5",backgroundColor:"#ef4040",position:"topRight"})}).finally(()=>{h()})}function g(){r.btnLoadElem.classList.add("is-hidden")}function y(){r.btnLoadElem.classList.remove("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
