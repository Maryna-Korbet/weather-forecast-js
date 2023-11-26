(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const a={form:document.querySelector(".js-search-form"),list:document.querySelector(".js-list")};a.form.addEventListener("submit",i);function i(s){s.preventDefault();const{city:o,days:c}=s.currentTarget.elements;l(o.value,c.value).then(r=>{a.list.innerHTML=u(r.forecast.forecastday,r.location)}).catch(r=>{a.list.innerHTML='<li class="weather-card"><img src="https://repository-images.githubusercontent.com/627560142/41fad3ef-09ac-4e99-a6b7-bacf592b3142" alt="weather" width="500"/></li>',console.log(r)})}function l(s="",o="0"){const c="http://api.weatherapi.com/v1",r="/forecast.json",e="6410346f89264d6e919165208231505",t=new URLSearchParams({key:e,q:s,days:o,lang:"en"});return fetch(`${c}${r}?${t}`).then(n=>{if(console.log(n),!n.ok)throw new Error(n.statusText);return n.json()})}function u(s,o){return s.map(({date:c,day:{avgtemp_c:r,condition:{icon:e,text:t}}})=>`
  <li class="weather-card">
    <img src="${e}" alt="${t}" class="weather-icon" />
    <h2 class="date">${o.name}</h2>
    <h3 class="date">${o.country}</h3>
    <h4 class="date">${c}</h4>
    <h4 class="weather-text">${t}</h4>
    <h4 class="temperature">${r} °C</h4>
</li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
