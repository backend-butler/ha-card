var q=globalThis,U=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),st=new WeakMap,S=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(U&&t===void 0){let o=e!==void 0&&e.length===1;o&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&st.set(e,t))}return t}toString(){return this.cssText}},at=n=>new S(typeof n=="string"?n:n+"",void 0,D),z=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((o,i,r)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new S(e,n,D)},ct=(n,t)=>{if(U)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let o=document.createElement("style"),i=q.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=e.cssText,n.appendChild(o)}},j=U?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let o of t.cssRules)e+=o.cssText;return at(e)})(n):n;var{is:Rt,defineProperty:qt,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:Ht,getOwnPropertySymbols:Ot,getPrototypeOf:Bt}=Object,H=globalThis,lt=H.trustedTypes,Dt=lt?lt.emptyScript:"",zt=H.reactiveElementPolyfillSupport,T=(n,t)=>n,F={toAttribute(n,t){switch(t){case Boolean:n=n?Dt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},pt=(n,t)=>!Rt(n,t),ht={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:pt};Symbol.metadata??=Symbol("metadata"),H.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(t,o,e);i!==void 0&&qt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){let{get:i,set:r}=Ut(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){let l=i?.call(this);r?.call(this,s),this.requestUpdate(t,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,o=[...Ht(e),...Ot(e)];for(let i of o)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[o,i]of e)this.elementProperties.set(o,i)}this._$Eh=new Map;for(let[e,o]of this.elementProperties){let i=this._$Eu(e,o);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let o=new Set(t.flat(1/0).reverse());for(let i of o)e.unshift(j(i))}else t!==void 0&&e.push(j(t));return e}static _$Eu(t,e){let o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ct(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){let o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(i!==void 0&&o.reflect===!0){let r=(o.converter?.toAttribute!==void 0?o.converter:F).toAttribute(e,o.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let o=this.constructor,i=o._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=o.getPropertyOptions(i),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:F;this._$Em=i;let l=s.fromAttribute(e,r.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,o,i=!1,r){if(t!==void 0){let s=this.constructor;if(i===!1&&(r=this[t]),o??=s.getPropertyOptions(t),!((o.hasChanged??pt)(r,e)||o.useDefault&&o.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:r},s){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),r!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[i,r]of o){let{wrapped:s}=r,l=this[i];s!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,r,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[T("elementProperties")]=new Map,g[T("finalized")]=new Map,zt?.({ReactiveElement:g}),(H.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,dt=n=>n,O=J.trustedTypes,ut=O?O.createPolicy("lit-html",{createHTML:n=>n}):void 0,yt="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+_,jt=`<${vt}>`,$=document,L=()=>$.createComment(""),P=n=>n===null||typeof n!="object"&&typeof n!="function",Y=Array.isArray,Ft=n=>Y(n)||typeof n?.[Symbol.iterator]=="function",K=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,ft=/>/g,y=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,_t=/"/g,$t=/^(?:script|style|textarea|title)$/i,Q=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),f=Q(1),w=Q(2),be=Q(3),A=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),bt=new WeakMap,v=$.createTreeWalker($,129);function At(n,t){if(!Y(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ut!==void 0?ut.createHTML(t):t}var Kt=(n,t)=>{let e=n.length-1,o=[],i,r=t===2?"<svg>":t===3?"<math>":"",s=k;for(let l=0;l<e;l++){let a=n[l],p,d,c=-1,u=0;for(;u<a.length&&(s.lastIndex=u,d=s.exec(a),d!==null);)u=s.lastIndex,s===k?d[1]==="!--"?s=gt:d[1]!==void 0?s=ft:d[2]!==void 0?($t.test(d[2])&&(i=RegExp("</"+d[2],"g")),s=y):d[3]!==void 0&&(s=y):s===y?d[0]===">"?(s=i??k,c=-1):d[1]===void 0?c=-2:(c=s.lastIndex-d[2].length,p=d[1],s=d[3]===void 0?y:d[3]==='"'?_t:mt):s===_t||s===mt?s=y:s===gt||s===ft?s=k:(s=y,i=void 0);let m=s===y&&n[l+1].startsWith("/>")?" ":"";r+=s===k?a+jt:c>=0?(o.push(p),a.slice(0,c)+yt+a.slice(c)+_+m):a+_+(c===-2?l:m)}return[At(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]},I=class n{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let r=0,s=0,l=t.length-1,a=this.parts,[p,d]=Kt(t,e);if(this.el=n.createElement(p,o),v.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=v.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(yt)){let u=d[s++],m=i.getAttribute(c).split(_),R=/([.?@])?(.*)/.exec(u);a.push({type:1,index:r,name:R[2],strings:m,ctor:R[1]==="."?G:R[1]==="?"?V:R[1]==="@"?X:x}),i.removeAttribute(c)}else c.startsWith(_)&&(a.push({type:6,index:r}),i.removeAttribute(c));if($t.test(i.tagName)){let c=i.textContent.split(_),u=c.length-1;if(u>0){i.textContent=O?O.emptyScript:"";for(let m=0;m<u;m++)i.append(c[m],L()),v.nextNode(),a.push({type:2,index:++r});i.append(c[u],L())}}}else if(i.nodeType===8)if(i.data===vt)a.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(_,c+1))!==-1;)a.push({type:7,index:r}),c+=_.length-1}r++}}static createElement(t,e){let o=$.createElement("template");return o.innerHTML=t,o}};function E(n,t,e=n,o){if(t===A)return t;let i=o!==void 0?e._$Co?.[o]:e._$Cl,r=P(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,o)),o!==void 0?(e._$Co??=[])[o]=i:e._$Cl=i),i!==void 0&&(t=E(n,i._$AS(n,t.values),i,o)),t}var W=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??$).importNode(e,!0);v.currentNode=i;let r=v.nextNode(),s=0,l=0,a=o[0];for(;a!==void 0;){if(s===a.index){let p;a.type===2?p=new N(r,r.nextSibling,this,t):a.type===1?p=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(p=new Z(r,this,t)),this._$AV.push(p),a=o[++l]}s!==a?.index&&(r=v.nextNode(),s++)}return v.currentNode=$,i}p(t){let e=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},N=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),P(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ft(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T($.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:o}=t,i=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=I.createElement(At(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new W(i,this),s=r.u(this.options);r.p(e),this.T(s),this._$AH=r}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new I(t)),e}k(t){Y(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,o,i=0;for(let r of t)i===e.length?e.push(o=new n(this.O(L()),this.O(L()),this,this.options)):o=e[i],o._$AI(r),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let o=dt(t).nextSibling;dt(t).remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},x=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=h}_$AI(t,e=this,o,i){let r=this.strings,s=!1;if(r===void 0)t=E(this,t,e,0),s=!P(t)||t!==this._$AH&&t!==A,s&&(this._$AH=t);else{let l=t,a,p;for(t=r[0],a=0;a<r.length-1;a++)p=E(this,l[o+a],e,a),p===A&&(p=this._$AH[a]),s||=!P(p)||p!==this._$AH[a],p===h?t=h:t!==h&&(t+=(p??"")+r[a+1]),this._$AH[a]=p}s&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},G=class extends x{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},V=class extends x{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},X=class extends x{constructor(t,e,o,i,r){super(t,e,o,i,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??h)===A)return;let o=this._$AH,i=t===h&&o!==h||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==h&&(o===h||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Z=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Wt=J.litHtmlPolyfillSupport;Wt?.(I,N),(J.litHtmlVersions??=[]).push("3.3.3");var wt=(n,t,e)=>{let o=e?.renderBefore??t,i=o._$litPart$;if(i===void 0){let r=e?.renderBefore??null;o._$litPart$=i=new N(t.insertBefore(L(),r),r,void 0,e??{})}return i._$AI(n),i};var tt=globalThis,b=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};b._$litElement$=!0,b.finalized=!0,tt.litElementHydrateSupport?.({LitElement:b});var Gt=tt.litElementPolyfillSupport;Gt?.({LitElement:b});(tt.litElementVersions??=[]).push("4.2.2");var Vt="backend-butler.intent";function Ct(n,t,e=Date.now()){try{n.setItem(Vt,JSON.stringify({kind:t,at:e}))}catch{}}var xt="/e0a0a4ab_backend_butler",B="Ask Butler";var Xt={chatgpt:["camera","image","mic","voice"],grok:["compose","voice"]},et={field:"field",camera:"camera",image:"photo",mic:"mic",voice:"voice",compose:"new"},Zt=["chatgpt","grok"],Jt=["dark","auto"],Et=["field","camera","image","mic","voice","compose"];function ot(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function C(n,t){if(n==null)return null;if(typeof n!="string")throw new Error(`${t} must be a string`);return n.trim()===""?null:n}function St(n){return ot(n)&&typeof n.action=="string"}function Yt(n,t){if(!ot(n))throw new Error(`actions[${t}] must be an object with an id`);let e=n.id;if(typeof e!="string"||!Et.includes(e))throw new Error(`actions[${t}].id must be one of ${Et.join(", ")}`);let o={id:e},i=C(n.icon,`actions[${t}].icon`),r=C(n.label,`actions[${t}].label`);if(i&&(o.icon=i),r&&(o.label=r),n.tap_action!==void 0){if(!St(n.tap_action))throw new Error(`actions[${t}].tap_action must be an action object`);o.tap_action=n.tap_action}return o}function Tt(n){if(!ot(n))throw new Error("Invalid configuration");let t=n,e=t.layout??"chatgpt";if(typeof e!="string"||!Zt.includes(e))throw new Error("layout must be chatgpt or grok");let o=t.theme??"dark";if(typeof o!="string"||!Jt.includes(o))throw new Error("theme must be dark or auto");let i=C(t.conversation_agent,"conversation_agent");if(i!==null&&!i.startsWith("conversation."))throw new Error('conversation_agent must start with "conversation."');if(t.show_logo!==void 0&&typeof t.show_logo!="boolean")throw new Error("show_logo must be true or false");if(t.tap_action!==void 0&&!St(t.tap_action))throw new Error("tap_action must be an action object");let r;if(t.actions===void 0||t.actions===null)r=Xt[e].map(s=>({id:s}));else{if(!Array.isArray(t.actions))throw new Error("actions must be a list");if(t.actions.length>4)throw new Error("actions can have at most 4 buttons");r=t.actions.map(Yt)}return{title:C(t.title,"title")??B,layout:e,show_logo:t.show_logo??!0,logo_url:C(t.logo_url,"logo_url"),panel_path:C(t.panel_path,"panel_path")??C(t.ingress_path,"ingress_path")??null,conversation_agent:i,theme:o,tap_action:t.tap_action??null,buttons:r}}function Qt(n){let t=Object.keys(n??{}).filter(o=>/^[0-9a-z]+_backend_butler$/.test(o)),e=t.find(o=>!o.startsWith("local_"))??t[0];return e?`/${e}`:xt}function te(n,t){let e=t==="field"?n.tap_action:n.buttons.find(o=>o.id===t)?.tap_action;return e||(n.conversation_agent&&(t==="mic"||t==="voice")?{action:"assist",start_listening:!0}:{action:"butler",intent:et[t]})}function ee(n,t){return(n?.pipelines??[]).find(o=>o.conversation_engine===t)?.id??(n?.preferred_pipeline?n.preferred_pipeline:void 0)}function oe(){return{get storage(){try{return window.localStorage}catch{return}},pushState:n=>window.history.pushState(null,"",n),dispatchLocationChanged:()=>window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),makeEvent:(n,t)=>new CustomEvent(n,t)}}function kt(n,t,e){n.dispatchEvent(t.makeEvent("hass-action",{bubbles:!0,composed:!0,detail:{config:{tap_action:e},action:"tap"}}))}async function nt(n,t,e,o=oe()){let i=te(t,e);if(i.action!=="none"){if(i.action==="butler"){o.storage&&Ct(o.storage,i.intent??et[e]),o.pushState(t.panel_path??Qt(n.hass?.panels)),o.dispatchLocationChanged();return}if(i.action==="assist"&&t.conversation_agent&&!i.pipeline_id){let r=n.hass,s;try{let l=await r?.callWS?.({type:"assist_pipeline/pipeline/list"});s=ee(l,t.conversation_agent)}catch{}kt(n,o,s?{...i,pipeline_id:s}:i);return}kt(n,o,i)}}var ne={layout:"Layout",title:"Title",show_logo:"Show logo",tap_action:"Tap action (pill)",advanced:"Advanced",logo_url:"Logo URL",panel_path:"Butler panel path",theme:"Theme",conversation_agent:"Conversation agent"},ie={tap_action:"Default: opens Butler with the box focused. Per-button actions are YAML-only (actions: list).",logo_url:"Replaces the Butler mark. Leave empty for the default.",panel_path:"Leave empty: the card finds Butler's panel itself",theme:"Dark widget matches the iOS widgets; Follow HA theme uses your dashboard colors.",conversation_agent:"Mic and voice buttons run HA Assist with this agent instead of Butler. Per-button actions are YAML-only (actions: list)."};function Lt(){return{schema:[{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"chatgpt",label:"ChatGPT style (wide)"},{value:"grok",label:"Grok style (square)"}]}}},{name:"title",selector:{text:{}}},{name:"show_logo",selector:{boolean:{}}},{name:"tap_action",selector:{ui_action:{}}},{type:"expandable",name:"advanced",title:"Advanced",schema:[{name:"logo_url",selector:{text:{}}},{name:"panel_path",selector:{text:{}}},{name:"theme",selector:{select:{mode:"dropdown",options:[{value:"dark",label:"Dark widget"},{value:"auto",label:"Follow HA theme"}]}}},{name:"conversation_agent",selector:{conversation_agent:{}}}]}],computeLabel:n=>ne[n.name],computeHelper:n=>ie[n.name]}}var M=n=>f`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${n}</svg>`,re=()=>M(w`<path d="M3.5 9A2.5 2.5 0 0 1 6 6.5h.9a1 1 0 0 0 .83-.45l.74-1.1a1 1 0 0 1 .83-.45h3.4a1 1 0 0 1 .83.45l.74 1.1a1 1 0 0 0 .83.45H18A2.5 2.5 0 0 1 20.5 9v8.5A2.5 2.5 0 0 1 18 20H6a2.5 2.5 0 0 1-2.5-2.5Z"/><circle cx="12" cy="13" r="3.5"/>`),se=()=>M(w`<rect x="3.5" y="4.5" width="17" height="15" rx="3.5"/><circle cx="9" cy="9.5" r="1.5"/><path d="M4 17l4.5-4.3a1.5 1.5 0 0 1 2.1 0L15 17"/><path d="M13.5 15.5l1.4-1.3a1.5 1.5 0 0 1 2.1 0L20 17"/>`),ae=()=>M(w`<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21"/>`),Pt=()=>M(w`<path d="M4 10v4M8 6.5v11M12 3.5v17M16 7.5v9M20 10.5v3"/>`),ce=()=>M(w`<path d="M11 4.5H7A3.5 3.5 0 0 0 3.5 8v9A3.5 3.5 0 0 0 7 20.5h9a3.5 3.5 0 0 0 3.5-3.5v-4"/><path d="M19.2 3.8a1.9 1.9 0 0 1 2.7 2.7l-9.4 9.4-4 .6.6-4Z"/>`),le={camera:re,image:se,mic:ae,voice:Pt,compose:ce};function It(n,t){return t&&t.startsWith("mdi:")?f`<ha-icon .icon=${t}></ha-icon>`:(le[n]??Pt)()}var he=["M749.942 220.58C814.037 285.517 847.277 360.473 851.65 451.672C852.85 524.818 836.905 584.683 798.107 646.903C816.745 698.038 833.92 751.768 852.025 803.36C832.712 798.988 810.362 795.163 790.682 791.323L665.695 766.828C618.287 788.975 576.242 801.478 523.285 802.985C431.761 806.18 342.835 772.213 276.748 708.808C212.578 647.36 175.077 563.188 172.307 474.386C169.745 398.835 192.519 324.596 237.006 263.479C249.022 247.018 259.48 235.645 273.417 220.948C275.84 223.88 287.478 251.398 290.068 257.307L327.609 342.739L511.99 761.698C522.782 738.763 533.552 712.828 543.812 689.45L602.95 555.05L749.942 220.58Z","M506.905 434.37C518.26 431.575 529.727 438.541 532.48 449.908C535.232 461.274 528.22 472.712 516.842 475.418C505.525 478.11 494.162 471.146 491.429 459.841C488.694 448.537 495.617 437.15 506.905 434.37Z","M508.16 521.797C519.575 519.712 530.54 527.219 532.708 538.627C534.883 550.027 527.443 561.044 516.058 563.294C504.56 565.574 493.403 558.044 491.209 546.524C489.016 535.004 496.625 523.905 508.16 521.797Z","M510.202 609.23C521.82 608.255 532.027 616.872 533.032 628.482C534.03 640.092 525.442 650.322 513.832 651.35C502.185 652.377 491.916 643.76 490.912 632.112C489.908 620.465 498.555 610.212 510.202 609.23Z"],pe="M408.633 220.664C428.508 230.775 451.307 246.223 471.295 256.877C480.312 261.412 489.669 269.054 499.455 271.644C522.885 277.845 539.438 264.565 558.323 253.605L615.293 220.648C615.3 234.676 616.403 354.8 614.7 357.238L612.885 356.602C580.988 340.038 548.385 316.924 515.58 301.693C513.09 300.538 505.845 302.407 503.43 303.694C471.585 320.639 440.174 340.756 408.582 357.973L408.633 220.664Z",Nt=()=>f`<svg class="logo" viewBox="160 162 704 704" aria-hidden="true" focusable="false">${he.map(n=>w`<path d=${n} fill="currentColor" />`)}<path d=${pe} fill="#FC6B02" /></svg>`;var Mt=z`
  /* ChatGPT widget, dark: bar and buttons are lighter than the card. */
  :host {
    --bqc-card: #161616;
    --bqc-fill: #3a3a3c;
    --bqc-fill-active: #4b4b4e;
    --bqc-icon: #ffffff;
    --bqc-text: #ffffff;
    --bqc-placeholder: rgba(255, 255, 255, 0.55);
    --bqc-rim: rgba(255, 255, 255, 0.07);
    --bqc-pill-rim: transparent;
    --bqc-focus: #0a84ff;
    --bqc-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  }
  /* Grok widget, dark: bar and buttons are slightly darker than the card, with a faint inner edge. */
  :host([layout="grok"]) {
    --bqc-card: #2a2a2a;
    --bqc-fill: #232323;
    --bqc-fill-active: #323232;
    --bqc-pill-rim: rgba(255, 255, 255, 0.08);
  }
  /* theme: auto follows the HA theme (a light theme gives a light widget). Last, so it wins over both layouts. */
  :host([theme="auto"]) {
    --bqc-card: var(--ha-card-background, var(--card-background-color));
    --bqc-fill: var(--secondary-background-color);
    --bqc-fill-active: color-mix(in srgb, var(--secondary-background-color), var(--primary-text-color) 10%);
    --bqc-icon: var(--primary-text-color);
    --bqc-text: var(--primary-text-color);
    --bqc-placeholder: var(--secondary-text-color);
    --bqc-rim: var(--divider-color);
    --bqc-pill-rim: transparent;
    --bqc-focus: var(--primary-color);
    --bqc-shadow: var(--ha-card-box-shadow, none);
  }

  :host {
    display: block;
    /* Geometry scales with the card's own width (160px phone column to 600px desktop), not the viewport. */
    container-type: inline-size;
    font-family: var(--ha-font-family-body, -apple-system, system-ui, sans-serif);
  }

  ha-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--gap);
    box-sizing: border-box;
    padding: var(--pad);
    overflow: hidden;
    background: var(--bqc-card);
    color: var(--bqc-text);
    border: none;
    border-radius: var(--radius);
    box-shadow: var(--bqc-shadow), inset 0 0 0 1px var(--bqc-rim);
  }

  /* ChatGPT: about 2:1, pill on top, four circles under it. */
  ha-card.chatgpt {
    --pad: 4.5cqw;
    --gap: 4.5cqw;
    --radius: 14cqw;
    --pill-h: max(44px, 17cqw);
    --btn: max(44px, 17cqw);
    --logo: calc(var(--pill-h) * 0.56);
    --fs: calc(var(--pill-h) * 0.33);
  }
  /* Grok: square, pill about 45% of the height, two circles. */
  ha-card.grok {
    --pad: 6cqw;
    --gap: 6cqw;
    --radius: 16cqw;
    --pill-h: 45cqw;
    --btn: max(44px, 32cqw);
    --logo: calc(var(--pill-h) * 0.4);
    --fs: calc(var(--pill-h) * 0.19);
    aspect-ratio: 1 / 1;
  }

  button {
    appearance: none;
    margin: 0;
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
    background: var(--bqc-fill);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition:
      transform 120ms ease,
      background-color 120ms ease;
  }
  button:active {
    transform: scale(0.96);
    background: var(--bqc-fill-active);
  }
  button:focus-visible {
    outline: 2px solid var(--bqc-focus);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
    button:active {
      transform: none;
    }
  }

  .field {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: var(--pill-h);
    min-width: 0;
    padding: 0 calc(var(--pill-h) * 0.3);
    gap: calc(var(--pill-h) * 0.22);
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px var(--bqc-pill-rim);
    text-align: left;
    color: var(--bqc-placeholder);
    font-size: var(--fs);
    line-height: 1.2;
  }
  .grok .field {
    justify-content: center;
    padding: 0 var(--pad);
    gap: calc(var(--pill-h) * 0.08);
    color: var(--bqc-text);
    font-weight: 600;
  }
  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .logo,
  .logo-img {
    flex: none;
    width: var(--logo);
    height: var(--logo);
    color: var(--bqc-icon);
  }
  .logo-img {
    object-fit: contain;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--gap);
  }
  .btn {
    flex: none;
    display: grid;
    place-items: center;
    width: var(--btn);
    height: var(--btn);
    border-radius: 50%;
    color: var(--bqc-icon);
    --mdc-icon-size: calc(var(--btn) * 0.46);
  }
  .btn svg {
    width: calc(var(--btn) * 0.46);
    height: calc(var(--btn) * 0.46);
  }

  .error {
    padding: 16px;
    color: var(--bqc-text);
    font-size: 14px;
    line-height: 1.4;
  }
`;var de={field:"Ask Butler",camera:"Take photo",image:"Choose photo",mic:"Dictate",voice:"Voice",compose:"New chat"},ue={chatgpt:{columns:12,rows:2,min_columns:6,min_rows:2},grok:{columns:6,rows:3,min_columns:3,min_rows:3}},it=class extends b{static properties={_config:{state:!0}};static styles=Mt;hass;setConfig(t){let e=Tt(t);this.setAttribute("layout",e.layout),this.setAttribute("theme",e.theme),this._config=e}getCardSize(){return this._config?.layout==="grok"?3:2}getGridOptions(){return ue[this._config?.layout??"chatgpt"]}static getConfigForm(){return Lt()}static getStubConfig(){return{type:"custom:butler-quick-card",title:B,layout:"chatgpt"}}_logo(t){return t.show_logo?t.logo_url?f`<img class="logo-img" src=${t.logo_url} alt="" />`:Nt():h}_button(t,e){return f`<button
      class="btn"
      type="button"
      aria-label=${e.label??de[e.id]}
      @click=${()=>{nt(this,t,e.id)}}
    >
      ${It(e.id,e.icon)}
    </button>`}render(){let t=this._config;if(!t)return f`<ha-card class="chatgpt"
        ><div class="error" role="alert">
          Butler quick card is not configured. Set <code>type: custom:butler-quick-card</code> in the card YAML.
        </div></ha-card
      >`;let e=t.layout==="grok"&&t.title===B?"Butler":t.title;return f`<ha-card class=${t.layout}>
      <button class="field" type="button" aria-label=${t.title} @click=${()=>{nt(this,t,"field")}}>
        ${this._logo(t)}<span class="label">${e}</span>
      </button>
      <div class="row">${t.buttons.map(o=>this._button(t,o))}</div>
    </ha-card>`}};customElements.get("butler-quick-card")||customElements.define("butler-quick-card",it);var rt=window;rt.customCards=rt.customCards??[];rt.customCards.push({type:"butler-quick-card",name:"Butler quick card",description:"A ChatGPT/Grok-style launcher for Backend Butler.",preview:!0});export{it as ButlerQuickCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
