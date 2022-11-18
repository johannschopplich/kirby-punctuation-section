(function(){"use strict";const _={props:{blueprint:String,lock:[Boolean,Object],help:String,name:String,parent:String,timestamp:Number},methods:{load(){return this.$api.get(`${this.parent}/sections/${this.name}`)}}},$="";function d(e,t,n,o,s,l,c,u){var i=typeof e=="function"?e.options:e;t&&(i.render=t,i.staticRenderFns=n,i._compiled=!0),o&&(i.functional=!0),l&&(i._scopeId="data-v-"+l);var r;if(c?(r=function(a){a=a||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!a&&typeof __VUE_SSR_CONTEXT__<"u"&&(a=__VUE_SSR_CONTEXT__),s&&s.call(this,a),a&&a._registeredComponents&&a._registeredComponents.add(c)},i._ssrRegister=r):s&&(r=u?function(){s.call(this,(i.functional?this.parent:this).$root.$options.shadowRoot)}:s),r)if(i.functional){i._injectStyles=r;var k=i.render;i.render=function(g,p){return r.call(p),k(g,p)}}else{var h=i.beforeCreate;i.beforeCreate=h?[].concat(h,r):[r]}return{exports:e,options:i}}const f={mixins:[_],props:{fieldsets:Object},data(){return{headline:null,text:[],theme:null,activeChar:null,categoryIndex:null}},async created(){const e=await this.load();this.headline=e.headline,this.theme=e.theme||"none",this.text=this.fieldsets.map(t=>({...t,label:this.t(t.label),help:t.help?this.t(t.help):!1}))},methods:{t(e){var t,n;return typeof e=="string"?e:(n=e==null?void 0:e[(t=this.$language)==null?void 0:t.code])!=null?n:Object.values(e)[0]},async writeToClipboard(e,t){try{await navigator.clipboard.writeText(e)}catch{console.error(`Failed writing "${e}" to clipboard. The Clipboard API is only available to secure contexts (HTTPS).`);return}this.activeChar=e,this.categoryIndex=t,setTimeout(()=>{this.activeChar=null,this.categoryIndex=null},2e3)}}};var m=function(){var t=this,n=t._self._c;return n("section",{staticClass:"k-info-section"},[n("k-headline",{staticClass:"k-info-section-headline"},[t._v(" "+t._s(t.headline)+" ")]),n("k-box",{attrs:{theme:t.theme}},[n("k-text",{staticClass:"k-text-punctuation space-y-1"},t._l(t.text,function(o,s){return n("k-grid",{key:s},[n("k-column",{attrs:{width:o.help?"1/2":"1/1"}},[n("span",{staticClass:"k-text-punctuation-label"},[t._v(t._s(o.label)+":")]),n("div",{staticClass:"k-text-punctuation-group space-x-1"},t._l(o.chars,function(l,c){return n("button",{key:c,class:["k-button k-button-punctuation",{"is-active":s===t.categoryIndex&&l===t.activeChar}],attrs:{type:"button"},on:{click:function(u){return t.writeToClipboard(l,s)}}},[t._v(" "+t._s(l)+" ")])}),0)]),o.help?n("k-column",{attrs:{width:o.help?"1/2":"1/1"}},[n("k-text",{staticClass:"k-text-punctuation-help",attrs:{html:o.help}})],1):t._e()],1)}),1)],1)],1)},b=[],v=d(f,m,b,!1,null,null,null,null);const C=v.exports;window.panel.plugin("johannschopplich/punctuation-section",{sections:{punctuation:C}})})();
