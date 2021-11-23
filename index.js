(()=>{(function(){"use strict";var d={props:{blueprint:String,lock:[Boolean,Object],help:String,name:String,parent:String,timestamp:Number},methods:{load(){return this.$api.get(`${this.parent}/sections/${this.name}`)}}},p=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"k-info-section"},[o("k-headline",{staticClass:"k-info-section-headline"},[t._v(" "+t._s(t.headline)+" ")]),o("k-box",{attrs:{theme:t.theme},on:{click:t.handleClick}},[o("k-text",{domProps:{innerHTML:t._s(t.text)}})],1)],1)},f=[],y="";function v(t,e,o,a,s,c,l,b){var n=typeof t=="function"?t.options:t;e&&(n.render=e,n.staticRenderFns=o,n._compiled=!0),a&&(n.functional=!0),c&&(n._scopeId="data-v-"+c);var r;if(l?(r=function(i){i=i||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!i&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(i=__VUE_SSR_CONTEXT__),s&&s.call(this,i),i&&i._registeredComponents&&i._registeredComponents.add(l)},n._ssrRegister=r):s&&(r=b?function(){s.call(this,(n.functional?this.parent:this).$root.$options.shadowRoot)}:s),r)if(n.functional){n._injectStyles=r;var k=n.render;n.render=function(S,_){return r.call(_),k(S,_)}}else{var h=n.beforeCreate;n.beforeCreate=h?[].concat(h,r):[r]}return{exports:t,options:n}}const m={mixins:[d],props:{fieldsets:Object},data(){return{headline:null,text:null,theme:null}},computed:{currentLanguage(){var t;return(t=this==null?void 0:this.$language)!=null?t:this.$store.state.languages.current}},async created(){const t=await this.load();this.headline=t.headline,this.theme=t.theme||"none",this.text=this.fieldsets.map(({label:e,chars:o})=>{var a;return`${e==="string"?e:(a=e==null?void 0:e[this.currentLanguage.code])!=null?a:Object.values(e)[0]}: ${o.map(s=>`<button class="k-button k-button-punctuation" type="button">${s}</button>`).join(" ")}`}).join("<br>")},methods:{async handleClick({target:t}){if(!!t.matches("button"))try{await navigator.clipboard.writeText(t.textContent)}catch{console.error(`Failed writing "${t.textContent}" to clipboard. The Clipboard API is only available to secure contexts (HTTPS).`)}}}},u={};var g=v(m,p,f,!1,C,null,null,null);function C(t){for(let e in u)this[e]=u[e]}var $=function(){return g.exports}();window.panel.plugin("johannschopplich/punctuation-section",{sections:{punctuation:$}})})();})();
