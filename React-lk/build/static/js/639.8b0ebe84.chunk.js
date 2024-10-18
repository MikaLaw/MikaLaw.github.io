"use strict";(self.webpackChunklkk_frontend_react=self.webpackChunklkk_frontend_react||[]).push([[639],{8869:(e,t,r)=>{r.d(t,{A:()=>y});r(9950);var n=r(2875),s=r(4903),o=r(6583),l=r(9985),a=r(5308),i=r(1827),u=r(1117),c=r(4414);const d=e=>{let{fields:t,form:r,onFinish:d,onFinishFailed:y,formProps:p,formHeader:f}=e;return(0,c.jsx)(n.A,{form:r,className:"form",layout:"vertical",onFinish:d,onFinishFailed:y,...p,children:()=>(0,c.jsxs)(c.Fragment,{children:[f&&f,t.map((e=>{var t,r,d,y,p,f;let{key:m,field:x,innerField:_,...h}=e;return(0,c.jsxs)(n.A.Item,{className:"large",...x,children:[h.type===u.r.INPUT&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.A.Item,{noStyle:!0,..._,children:(0,c.jsx)(s.A,{placeholder:h.input.placeholder,onChange:h.input.onChange})}),h.input.passwordPrompt&&(0,c.jsx)("p",{className:"text-3 form__prompt",children:h.input.passwordPrompt})]}),h.type===u.r.PASSWORD&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.A.Item,{noStyle:!0,..._,children:(0,c.jsx)(s.A.Password,{placeholder:h.password.placeholder,onChange:h.password.onChange,iconRender:e=>e?(0,c.jsx)(i.bM,{}):(0,c.jsx)(i.Rx,{})})}),h.password.passwordLink&&(0,c.jsx)(o.A,{type:"link",...h.password.passwordLink.button,children:h.password.passwordLink.title}),h.password.passwordPrompt&&(0,c.jsx)("p",{className:"text-3 form__prompt",children:h.password.passwordPrompt})]}),h.type===u.r.BUTTON&&(0,c.jsx)(o.A,{...h.button,children:null===h||void 0===h||null===(t=h.button)||void 0===t?void 0:t.title}),h.type===u.r.BUTTON_SUBMIT&&(0,c.jsx)(o.A,{type:null===(r=h.button)||void 0===r?void 0:r.type,htmlType:null===(d=h.button)||void 0===d?void 0:d.htmlType,loading:null===(y=h.button)||void 0===y?void 0:y.loading,disabled:null===(p=h.button)||void 0===p?void 0:p.disabled,children:null===h||void 0===h||null===(f=h.button)||void 0===f?void 0:f.title}),h.type===u.r.ALERT&&(0,c.jsx)(l.A,{...h.alert}),h.type===u.r.TEXT&&(0,c.jsx)("p",{className:"text-3 form__text",children:h.text.jsx}),h.type===u.r.TOOLTIP&&(0,c.jsx)(a.A,{title:h.title,overlayClassName:"tooltip-green tooltip-entry",placement:"bottom",children:(0,c.jsx)("span",{className:"text-3 color-brand-2-hover form__text form__text_tooltip",children:h.text})})]},m)}))]})})},y=e=>{let{blockClass:t,title:r,subtitle:n,text:s,...o}=e;return(0,c.jsxs)("div",{className:`entry-block ${t}`,children:[(0,c.jsxs)("div",{className:"entry-block__top",children:[(0,c.jsx)("h2",{className:"entry-block__title head-2",children:r}),n&&(0,c.jsx)("div",{className:"entry-block__subtitle text-2",children:n}),s&&(0,c.jsx)("div",{className:"entry-block__text text-3",children:s})]}),(0,c.jsx)("div",{className:"entry-block__form",children:(0,c.jsx)(d,{...o})})]})}},1117:(e,t,r)=>{r.d(t,{r:()=>n});let n=function(e){return e.INPUT="input",e.TEXT="text",e.PASSWORD="password",e.BUTTON="button",e.BUTTON_SUBMIT="buttonSubmit",e.ALERT="alert",e.TOOLTIP="tooltip",e}({})},9663:(e,t,r)=>{r.d(t,{A:()=>l});var n=r(385),s=r(4606),o=r(4414);const l=e=>{let{children:t}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.A,{isLoggedIn:!1}),(0,o.jsx)(s.A,{renderView:e=>(0,o.jsx)("div",{style:{...e.style,overflow:"auto scroll",minHeight:"auto",flex:"auto",display:"flex",flexDirection:"column"}}),autoHeightMax:"calc(100vh - 58px)",style:{display:"flex",flexDirection:"column",flex:"auto"},zIndexVerticalThumb:2,children:(0,o.jsx)("div",{className:"entry-layout",children:(0,o.jsxs)("div",{className:"entry-layout__wrap",children:[t,(0,o.jsx)("span",{className:"entry-layout__dot entry-layout__dot_1"}),(0,o.jsx)("span",{className:"entry-layout__dot entry-layout__dot_2"}),(0,o.jsx)("span",{className:"entry-layout__dot entry-layout__dot_3"}),(0,o.jsx)("span",{className:"entry-layout__dot entry-layout__dot_4 green"}),(0,o.jsx)("span",{className:"entry-layout__dot entry-layout__dot_5 blue"}),(0,o.jsx)("span",{className:"entry-layout__dot entry-layout__dot_6 blue"}),(0,o.jsx)("span",{className:"entry-layout__capsule entry-layout__capsule_1"}),(0,o.jsx)("span",{className:"entry-layout__capsule entry-layout__capsule_2"}),(0,o.jsx)("span",{className:"entry-layout__capsule entry-layout__capsule_3"}),(0,o.jsx)("span",{className:"entry-layout__tablet"})]})})})]})}},2639:(e,t,r)=>{r.r(t),r.d(t,{default:()=>w});var n=r(8869),s=r(1117),o=r(9950),l=r(2381),a=r(8993),i=r(2875),u=r(375),c=r(5669),d=r(4215),y=r(545),p=r(9051),f=r.n(p);const m=e=>{const[t,r]=(0,o.useState)({}),n=(0,o.useCallback)(((e,r)=>function(e){return(t,r)=>{const n={};return e&&"object"===typeof e&&"undefined"!==typeof e[t]&&(n.validateStatus="error",null!==r&&void 0!==r&&r.isHelpText&&(n.help=e[t])),n}}(t)(e,r)),[t]),s=function(e){r(!(arguments.length>1&&void 0!==arguments[1])||arguments[1]?{_error:e}:{...t,_error:e})};return{errors:t,errorsManage:{setErrorsByRestResponse:t=>{r(function(e){const{status:t,data:r,registeredFields:n,commonErrorMsg:s="The form contains errors",unknownErrorMsg:o="Request error."}=e,l={};function a(e,t){l[e]?l[e]+=" "+t:l[e]=t}if((0,y.n$)(r,t)){const e=[];s&&e.push(s),r.forEach((t=>{n&&Array.isArray(n)&&n.length>0?-1!==n.indexOf(t.field)||n.find((e=>e.test&&e.test(t.field)))?a(t.field,t.message):e.push(t.message):a(t.field,t.message)})),e.length&&(l._error=e.join("<br/>"))}else r&&r.message&&(l._error=r.message);return Object.keys(l).length||(l._error=o),l}({...t,registeredFields:e}))},setGeneralError:s,clearErrors:()=>{r({})},removeErrors:e=>{if(Array.isArray(e)&&Object.keys(t).length>0){let n=!1,s={...t};e.forEach((e=>{s&&"undefined"!==typeof s[e]&&(delete s[e],n=!0)})),n?r(s):s=null}},clearGeneralError:()=>{s(null,!1)}},getFieldAsyncProps:n}};var x=r(1827),_=r(6480),h=r(8258),v=r(9663),b=r(4414);const g=["email"],j="emailPasswordRecovery",k="timePasswordRecovery",T=_.Ay.get(k),A=_.Ay.get(j),w=()=>{const{push:e}=(0,a.useActions)({push:l.VC}),[t,r]=(0,o.useState)(!1),[p]=i.A.useForm(),{getFieldAsyncProps:w,errorsManage:N}=m(g),{execute:E,loading:S,result:O}=(0,u.V$)(c.Ay.passwordResetRequest.bind(c.Ay),{onSuccess:e=>{if(e.status===d.Gi.OK){const e=(0,h.Nq)();_.Ay.set(j,p.getFieldValue("email")),_.Ay.set(k,f()(),e),r(!0),F(60)}N.setErrorsByRestResponse(e)}}),[C,F]=o.useState(0),R=(0,o.useMemo)((()=>{var t;return[{key:"email",type:s.r.INPUT,field:{label:"E-mail",...w("email",{isHelpText:!0})},innerField:{rules:[{required:!0}],required:!0,name:"email"},input:{placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0447\u0442\u0443",onChange:()=>N.removeErrors(["email"])}},(0,y.d7)(null===O||void 0===O?void 0:O.data,null===O||void 0===O?void 0:O.status)&&!Array.isArray(null===O||void 0===O?void 0:O.data)?{key:"alert2",type:s.r.ALERT,alert:{message:"\u041e\u0448\u0438\u0431\u043a\u0430",description:null===O||void 0===O||null===(t=O.data)||void 0===t?void 0:t.message,type:"error",showIcon:!0,icon:(0,b.jsx)(x.d7,{}),className:"auth-alert"},field:{}}:null,{key:"button",type:s.r.BUTTON_SUBMIT,field:{label:"",required:!0,style:{marginTop:"25px"}},button:{type:"primary",title:"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c",htmlType:"submit",loading:S}},{key:"link",type:s.r.BUTTON,field:{label:"",required:!0},button:{type:"link",title:"\u0412\u043e\u0439\u0442\u0438",onClick:()=>e("/login")}}].filter(Boolean)}),[w,null===O||void 0===O?void 0:O.data,null===O||void 0===O?void 0:O.status,S,N,e]),P=(0,o.useMemo)((()=>[{key:"text",type:s.r.TEXT,field:{label:""},text:{jsx:(0,b.jsx)(b.Fragment,{children:"\u041d\u0435 \u043f\u0440\u0438\u0448\u043b\u0430 \u0441\u0441\u044b\u043b\u043a\u0430? \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e\u0441\u0442\u044c \u0432\u0432\u0435\u0434\u0435\u043d\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0432\u0442\u043e\u0440\u043d\u043e."})}},{key:"button",type:s.r.BUTTON,field:{label:"",style:{marginBottom:"7px"}},button:{type:"primary",title:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0432\u0442\u043e\u0440\u043d\u043e",htmlType:"button",disabled:0!==C,onClick:()=>r(!1)}},0!==C?{key:"text1",type:s.r.TEXT,field:{label:""},text:{jsx:(0,b.jsxs)(b.Fragment,{children:["\u0427\u0435\u0440\u0435\u0437 ",(0,b.jsx)("b",{children:C})," \u0441\u0435\u043a\u0443\u043d\u0434"]})}}:null].filter(Boolean)),[C]);var I;return(0,o.useEffect)((()=>{if(T){const e=f()(T);if(e.isValid()){const t=f().duration(f()().diff(f()(e))),n=60-t.seconds();0===t.minutes()&&n>0&&(r(!0),F(n),p.setFieldsValue({email:A}))}}}),[]),(0,o.useEffect)((()=>{const e=C>0&&setTimeout((()=>{F(C-1)}),1e3);return()=>{e&&clearTimeout(e)}}),[C]),t?(0,b.jsx)(v.A,{children:(0,b.jsx)(n.A,{blockClass:"entry-block_w_medium",title:"\u0417\u0430\u043f\u0440\u043e\u0441 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d",subtitle:`\u0412 \u0441\u043b\u0443\u0447\u0430\u0435, \u0435\u0441\u043b\u0438 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0441 \u0430\u0434\u0440\u0435\u0441\u043e\u043c \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b ${null!==(I=p.getFieldValue("email"))&&void 0!==I?I:A} \u0435\u0441\u0442\u044c \u0438 \u0430\u043a\u0442\u0438\u0432\u0435\u043d, \u043d\u0430 \u044d\u0442\u043e\u0442 \u0430\u0434\u0440\u0435\u0441 \u043f\u0440\u0438\u0434\u0435\u0442 \u0441\u0441\u044b\u043b\u043a\u0430 \u0434\u043b\u044f \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f \u043f\u0430\u0440\u043e\u043b\u044f. `,fields:P})}):(0,b.jsx)(v.A,{children:(0,b.jsx)(n.A,{blockClass:"entry-block_w_wide",title:"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f",subtitle:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d \u0432\u0430\u0448 \u043a\u0430\u0431\u0438\u043d\u0435\u0442 (\u0432\u0430\u0448 \u043b\u043e\u0433\u0438\u043d). \u041d\u0430 \u044d\u0442\u0443 \u043f\u043e\u0447\u0442\u0443 \u043f\u0440\u0438\u0434\u0435\u0442 \u0441\u0441\u044b\u043b\u043a\u0430; \u043f\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043f\u043e \u044d\u0442\u043e\u0439 \u0441\u0441\u044b\u043b\u043a\u0435, \u0447\u0442\u043e\u0431\u044b \u0437\u0430\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c.",fields:R,onFinish:e=>E({email:e.email,type:"passwordCreate"}),form:p})})}},375:(e,t,r)=>{r.d(t,{V$:()=>y,Yb:()=>d});var n=r(9950);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}"undefined"!==typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!==typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var o="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?n.useLayoutEffect:n.useEffect,l={status:"not-requested",loading:!1,result:void 0,error:void 0},a={status:"loading",loading:!0,result:void 0,error:void 0},i=function(){},u={initialState:function(e){return e&&e.executeOnMount?a:l},executeOnMount:!0,executeOnUpdate:!0,setLoading:function(e){return a},setResult:function(e,t){return{status:"success",loading:!1,result:e,error:void 0}},setError:function(e,t){return{status:"error",loading:!1,result:void 0,error:e}},onSuccess:i,onError:i},c=function(e,t,r){!t&&(t=[]);var l=function(e){return s({},u,{},e)}(r),a=(0,n.useState)(null),i=a[0],c=a[1],d=function(e){var t=(0,n.useState)((function(){return e.initialState(e)})),r=t[0],o=t[1],l=(0,n.useCallback)((function(){return o(e.initialState(e))}),[o,e]),a=(0,n.useCallback)((function(){return o(e.setLoading(r))}),[r,o]),i=(0,n.useCallback)((function(t){return o(e.setResult(t,r))}),[r,o]),u=(0,n.useCallback)((function(t){return o(e.setError(t,r))}),[r,o]),c=(0,n.useCallback)((function(e){return o(s({},r,{},e))}),[r,o]);return{value:r,set:o,merge:c,reset:l,setLoading:a,setResult:i,setError:u}}(l),y=function(){var e=(0,n.useRef)(!1);return(0,n.useEffect)((function(){return e.current=!0,function(){e.current=!1}}),[]),function(){return e.current}}(),p=function(){var e=(0,n.useRef)(null);return{set:function(t){return e.current=t},get:function(){return e.current},is:function(t){return e.current===t}}}(),f=function(e){return y()&&p.is(e)},m=function(e){var t=(0,n.useRef)(e);return o((function(){t.current=e})),(0,n.useCallback)((function(){return t.current}),[t])}((function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];var s=function(){try{return Promise.resolve(e.apply(void 0,r))}catch(t){return Promise.reject(t)}}();return c(r),p.set(s),d.setLoading(),s.then((function(e){f(s)&&d.setResult(e),l.onSuccess(e,{isCurrent:function(){return p.is(s)}})}),(function(e){f(s)&&d.setError(e),l.onError(e,{isCurrent:function(){return p.is(s)}})})),s})),x=(0,n.useCallback)((function(){return m().apply(void 0,arguments)}),[m]),_=!y();return(0,n.useEffect)((function(){var e=function(){return m().apply(void 0,t)};_&&l.executeOnMount&&e(),!_&&l.executeOnUpdate&&e()}),t),s({},d.value,{set:d.set,merge:d.merge,reset:d.reset,execute:x,currentPromise:p.get(),currentParams:i})};function d(e,t,r){return c(e,t,r)}var y=function(e,t){return c(e,[],s({},t,{executeOnMount:!1,executeOnUpdate:!1}))}}}]);