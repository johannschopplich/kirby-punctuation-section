(function(){"use strict";const m={props:{blueprint:String,lock:[Boolean,Object],help:String,name:String,parent:String,timestamp:Number},methods:{load(){return this.$api.get(`${this.parent}/sections/${this.name}`)}}},T="";function p(t,e,n,s,a,r,c,u){var i=typeof t=="function"?t.options:t;e&&(i.render=e,i.staticRenderFns=n,i._compiled=!0),s&&(i.functional=!0),r&&(i._scopeId="data-v-"+r);var l;if(c?(l=function(o){o=o||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!o&&typeof __VUE_SSR_CONTEXT__<"u"&&(o=__VUE_SSR_CONTEXT__),a&&a.call(this,o),o&&o._registeredComponents&&o._registeredComponents.add(c)},i._ssrRegister=l):a&&(l=u?function(){a.call(this,(i.functional?this.parent:this).$root.$options.shadowRoot)}:a),l)if(i.functional){i._injectStyles=l;var b=i.render;i.render=function(C,h){return l.call(h),b(C,h)}}else{var d=i.beforeCreate;i.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:i}}const f={mixins:[m],props:{fieldsets:{type:Object,required:!0},clipboard:{type:Boolean,default:!1}},data(){return{label:null,text:[],theme:null,activeChar:null,categoryIndex:null,lastFocusedElement:null,lastSelection:null}},async created(){const t=await this.load();this.label=t.label,this.theme=t.theme||"none",this.text=this.fieldsets.map(e=>({...e,label:this.t(e.label),help:e.help?this.t(e.help):!1}))},mounted(){document.addEventListener("focus",this.handleEditabeFocus,{capture:!0}),document.addEventListener("blur",this.handleInputBlur,{capture:!0}),document.addEventListener("click",this.handleDocumentClick)},beforeDestroy(){document.removeEventListener("focus",this.handleEditabeFocus,{capture:!0}),document.removeEventListener("blur",this.handleInputBlur,{capture:!0}),document.removeEventListener("click",this.handleDocumentClick)},methods:{t(t){var e;return typeof t=="string"?t:(t==null?void 0:t[(e=this.$language)==null?void 0:e.code])??Object.values(t)[0]},handleEditabeFocus(t){const e=t.target;e.isContentEditable&&(this.lastFocusedElement=e,this.lastSelection=window.getSelection().getRangeAt(0).cloneRange())},handleInputBlur(t){const e=t.target;(e.tagName==="INPUT"||e.tagName==="TEXTAREA")&&(this.lastFocusedElement=e,this.lastSelection={start:e.selectionStart,end:e.selectionEnd})},handleDocumentClick(t){const e=t.target;!(e.tagName==="BUTTON"&&e.classList.contains("k-button"))&&!e.isContentEditable&&e.tagName!=="INPUT"&&e.tagName!=="TEXTAREA"&&(this.lastFocusedElement=null,this.lastSelection=null)},async writeToClipboard(t,e){if(this.activeChar=t,this.categoryIndex=e,setTimeout(()=>{this.activeChar=null,this.categoryIndex=null},2e3),this.clipboard)try{await navigator.clipboard.writeText(t)}catch{const s=`Failed writing "${t}" to clipboard. The Clipboard API is only available to secure contexts (HTTPS).`;console.error(s),this.$store.dispatch("notification/error",s)}else if(this.lastFocusedElement){if(this.lastFocusedElement.isContentEditable){const n=window.getSelection();n.removeAllRanges(),n.addRange(this.lastSelection);const s=n.getRangeAt(0),a=document.createTextNode(t);s.insertNode(a),s.setStartAfter(a),s.setEndAfter(a),this.lastSelection=s.cloneRange(),n.removeAllRanges(),n.addRange(s)}else if(this.lastFocusedElement.tagName==="INPUT"||this.lastFocusedElement.tagName==="TEXTAREA"){const n=this.lastFocusedElement.selectionStart,s=this.lastFocusedElement.selectionEnd;this.lastFocusedElement.value=this.lastFocusedElement.value.substring(0,n)+t+this.lastFocusedElement.value.substring(s),this.lastFocusedElement.selectionStart=this.lastFocusedElement.selectionEnd=n+t.length,this.lastFocusedElement.focus()}}}}};var _=function(){var e=this,n=e._self._c;return n("k-section",{attrs:{headline:e.label}},[n("k-box",{attrs:{theme:e.theme}},[n("div",{staticClass:"container space-y-1"},e._l(e.text,function(s,a){return n("div",{key:a,staticClass:"group"},[n("div",{staticClass:"flex items-center gap-2"},[n("span",[e._v(e._s(s.label)+":")]),n("k-button-group",{staticClass:"gap-1"},e._l(s.chars,function(r,c){return n("k-button",{key:c,class:[a===e.categoryIndex&&r===e.activeChar&&"outline outline-2 outline-[var(--color-focus)]"],attrs:{variant:"filled",size:"xs"},on:{click:function(u){return e.writeToClipboard(r,a)}}},[e._v(" "+e._s(r)+" ")])}),1)],1),s.help?n("k-text",{staticClass:"text-[var(--color-text-dimmed)]",attrs:{html:s.help}}):e._e()],1)}),0)])],1)},g=[],v=p(f,_,g,!1,null,"a70491a8",null,null);const E=v.exports,F="";window.panel.plugin("johannschopplich/punctuation-section",{sections:{punctuation:E}})})();
