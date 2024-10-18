"use strict";(()=>{var Y=Object.defineProperty,Z=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable;var b=(e,a,r)=>a in e?Y(e,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[a]=r,f=(e,a)=>{for(var r in a||={})te.call(a,r)&&b(e,r,a[r]);if(w)for(var r of w(a))ne.call(a,r)&&b(e,r,a[r]);return e},H=(e,a)=>Z(e,ee(a));function y(e,a={}){return new CustomEvent(e,{detail:a})}function O(){return y("showOverflow")}function I(){return y("hideOverflow")}function $({overflowCount:e}){return y("itemsChanged",{overflowCount:e})}function P({original:e}){return y("toggleClicked",{original:e})}function re(){let{port1:e}=new MessageChannel;return{addEventListener:e.addEventListener.bind(e),dispatchEvent:e.dispatchEvent.bind(e),removeEventListener:e.removeEventListener.bind(e)}}var x=re;function ae(){let e={eventReady:!1},a=x(),r=new Map;function s(v,p,i=!0){function d(M){(!i||e.eventReady)&&p(M)}return r.set(p,{eventType:v,wrappedCallback:d}),a.addEventListener(v,d),this}function c(v,p){let{wrappedCallback:i}=r.get(p);return a.removeEventListener(v,i),this}function m(v){a.dispatchEvent(v)}function n(v=!0){e.eventReady=v}return{off:c,on:s,setEventReady:n,trigger:m}}var k=ae;function le(){let e=new WeakMap;return function(r,s){return e.get(r)||e.set(r,new Map(Array.from(r).reduce((c,m,n)=>c.concat([[m,s[n]]]),[]))),e.get(r)}}var B=le;function ie(e,a={}){return typeof e=="string"?e:e(a)}var N=ie;function oe(e){if(e&&e.length)throw new Error(`
- ${e.join(`
- `)}`)}function se(e){return[!(e instanceof Element)&&"Target must be an HTMLElement.",(!e.children||!e.children.length)&&"Target must be the direct parent of the individual nav items."].filter(Boolean)}function ce(e,a){return Object.keys(e).map(r=>typeof a[r]=="undefined"?`Unrecognised option: ${r}`:void 0).filter(Boolean)}function me(e,a,r){return[...se(e),...ce(a,r)]}function ve(e,a,r){oe(me(e,a,r))}var A=ve;var L={classNames:{["container"]:["p-plus-container"],["main"]:["p-plus"],["primary-nav-wrapper"]:["p-plus__primary-wrapper"],["primary-nav"]:["p-plus__primary"],["overflow-nav"]:["p-plus__overflow"],["toggle-btn"]:["p-plus__toggle-btn"],["nav-item"]:["p-plus__primary-nav-item"]},collapseAtCount:-1,openOnToggle:!0,defaultOverflowVisible:!1,innerToggleTemplate:"More"};function Ee(e,a={}){let r=H(f(f({},L),a),{classNames:f(f({},L.classNames),a.classNames)}),{classNames:s}=r,c=k(),m={eventListeners:new Map,itemMap:new WeakMap},n={clone:{},primary:{}},v=B();function p(t){return s[t].join(" ")}function i(t){return`data-${t}`}function d(){return`
      <div ${i("main")} class="${p("main")}">
        <div class="${p("primary-nav-wrapper")}" ${i("primary-nav-wrapper")}></div>
        <button
          ${i("toggle-btn")}
          class="${p("toggle-btn")}"
          aria-expanded="false"
        >${N(r.innerToggleTemplate)}</button>
        <${e.tagName}
          ${i("overflow-nav")}
          class="${p("overflow-nav")}"
          aria-hidden="true"
        >
        </${e.tagName}>
      </div>
    `}function M(t){let l=t.cloneNode(!0);return R(l),Array.from(l.children).forEach(W),l}function R(t){t.classList.add(...s["primary-nav"]),t.setAttribute(i("primary-nav"),"")}function W(t){t.classList.add(...s["nav-item"]),t.setAttribute(i("nav-item"),"")}function j(){let{itemMap:t}=m,l=d(),o=document.createElement("div");o.classList.add(...s["container"]),o.setAttribute(i("container"),"true"),n["container"]=o;let E=document.createRange().createContextualFragment(l);n.primary["primary-nav-wrapper"]=E.querySelector(`[${i("primary-nav-wrapper")}]`),n.primary["primary-nav-wrapper"].appendChild(M(e));let g=E.cloneNode(!0);n.primary["main"]=E.querySelector(`[${i("main")}]`),n.primary["primary-nav"]=E.querySelector(`[${i("primary-nav")}]`),n.primary["nav-item"]=Array.from(E.querySelectorAll(`[${i("nav-item")}]`)),n.primary["overflow-nav"]=E.querySelector(`[${i("overflow-nav")}]`),n.primary["toggle-btn"]=E.querySelector(`[${i("toggle-btn")}]`),n.clone["main"]=g.querySelector(`[${i("main")}]`),n.clone["nav-item"]=Array.from(g.querySelectorAll(`[${i("nav-item")}]`)),n.clone["toggle-btn"]=g.querySelector(`[${i("toggle-btn")}]`),n.clone["main"].setAttribute("aria-hidden","true"),n.clone["main"].setAttribute("data-clone","true"),n.clone["main"].classList.add(`${s["main"][0]}--clone`),n.clone["main"].classList.add(`${s["main"][0]}--${"is-showing-toggle"}`),o.appendChild(E),o.appendChild(g),n.clone["nav-item"].forEach(X=>t.set(X,"primary-nav")),e.parentNode.replaceChild(o,e)}function V(t=!0){n.primary["main"].classList[t?"add":"remove"](`${s["main"][0]}--${"is-showing-toggle"}`),typeof r.innerToggleTemplate!="string"&&[n.primary["toggle-btn"],n.clone["toggle-btn"]].forEach(l=>{l.innerHTML=N(r.innerToggleTemplate,{toggleCount:n.primary["overflow-nav"].children.length,totalCount:n.clone["nav-item"].length})})}function T(t){let{itemMap:l}=m;return n.clone["nav-item"].filter(o=>l.get(o)===t)}function _(t){let{collapseAtCount:l}=r;if(t==="primary-nav"||l<0)return T(t);let o=T("primary-nav").length;return o>0&&o<=l?n.clone["nav-item"]:T(t)}function q(t){let l=n.primary[t].cloneNode();return _(t).forEach(o=>{let E=v(n.clone["nav-item"],n.primary["nav-item"]).get(o);l.appendChild(E)}),l}function D(t){let l=q(t);n.primary[t].parentNode.replaceChild(l,n.primary[t]),n.primary[t]=l}function F({target:t,intersectionRatio:l}){m.itemMap.set(t,l<.99?"overflow-nav":"primary-nav")}function U(t){t.forEach(F),["primary-nav","overflow-nav"].forEach(D),c.trigger($({overflowCount:n.primary["overflow-nav"].children.length})),c.setEventReady(!0)}function u(t=!0){let l=`${s["main"][0]}--${"is-showing-overflow"}`;return n.primary["main"].classList[t?"add":"remove"](l),n.primary["overflow-nav"].setAttribute("aria-hidden",t?"false":"true"),n.primary["toggle-btn"].setAttribute("aria-expanded",t?"true":"false"),c.trigger(t?O():I()),this}function h(){let t=`${s["main"][0]}--${"is-showing-overflow"}`;return u(!n.primary["main"].classList.contains(t)),this}function z(t=!0){let l=`${s["main"][0]}--${"is-hiding-primary"}`;n.primary["main"].classList[t?"add":"remove"](l),n.primary["primary-nav"].setAttribute("aria-hidden",String(t))}function C(t){t.preventDefault(),c.trigger(P({original:t}))}function G({detail:{overflowCount:t}={}}){V(t>0),t===0&&u(!1),z(t===n.clone["nav-item"].length)}function J(){return f({},n.primary)}function K(){m.observer=new IntersectionObserver(U,{root:n.clone["main"],rootMargin:"0px 0px 0px 0px",threshold:[.99]}),n.clone["nav-item"].forEach(t=>m.observer.observe(t)),n.primary["toggle-btn"].addEventListener("click",C),c.on("itemsChanged",G,!1),r.openOnToggle&&c.on("toggleClicked",h,!1)}function Q(){m.observer&&m.observer.disconnect(),n.primary["toggle-btn"].removeEventListener("click",C),Array.from(m.eventListeners.entries()).forEach(([l,{eventType:o}])=>{c.off(o,l)}),n["container"].parentNode.replaceChild(e,n["container"])}return function(){A(e,a,L),j(),K(),r.defaultOverflowVisible&&u(!0)}(),{destroy:Q,getNavElements:J,off:c.off,on:c.on,setOverflowNavOpen:u,toggleOverflowNav:h}}var S=Ee;window.priorityPlus=S;})();