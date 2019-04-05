!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var r={}.toString;function o(e){return function(t){return r.call(t)==="[object "+e+"]"}}e.exports={trim:function(e){return(e||"").replace(/^\s+/,"").replace(/\s+$/,"")},isObject:o("Object"),isString:o("String"),isFunction:o("Function"),isNumber:o("Number"),isBoolean:o("Boolean"),isDate:o("Date")}},function(e,t,n){"use strict";var r=Object.create(null);r.DIV="0",r.P="1",r.A="2",r.SPAN="3",r.UL="4",r.LI="5",r.OL="6",r.DL="7",r.DD="8",r.DT="9",r.STRONG="a",r.B="b",r.U="c",r.TABLE="d",r.TH="e",r.TD="f",r.PRE="g",r.INPUT="h",r.SELECT="i",r.OPTION="j",r.TEXTAREA="k",r.FONT="l",r.EM="m",r.SMALL="n",r.ABBR="o",r.ADDRESS="p",r.ARTICLE="q",r.ASIDE="r",r.BIG="s",r.BLOCKQUOTE="t",r.BUTTON="u",r.CAPTION="v",r.CENTER="w",r.DEL="x",r.FIELDSET="y",r.FONT="z",r.FOOTER="A",r.HEADER="B",r.SECTION="C",r.H1="D",r.H2="E",r.H3="F",r.H4="G",r.H5="H",r.H6="I",r.I="J",r.INS="K",r.LABEL="L",r.MENU="M",r.OPTION="N",r.S="O",r.Q="P",r.SUB="Q",r.SUP="R",r.STRIKE="S";var o=Object.create(null);for(var i in r)o[r[i]]=i;e.exports={encode:function(e){return r[e]||e},decode:function(e){return o[e]||e}}},function(e,t,n){"use strict";var r,o,i,u=n(0),c=n(1),a=500,l=Object.create(null);function f(e){return/^(([+-]?\d+\.)|([+-]?\d*\.\d+)|([+-]?\d+))$/.test(e)}function d(e,t,n,r,o){if(e.id)return"#"+e.id;var i="";if(n)for(var u=n.split(","),c=document.body,a="",l=0,f=u.length;l<f;l++){var d=u[l],v=s(c.children[d],c,a,r,o);"#"===v.charAt(0)?i=v+">":i+=v+">",a+=","+d,c=c.children[d]}var O=s(e,e.parentNode,n,r,o);return"#"===O.charAt(0)?i=O:i+=O,i}function s(e,t,n,r,o){for(var i=[],u=0,c=t.children,a=c.length;u<a;u++){var l=c[u],f=v(l,n?n+","+u:String(u),o);if(l===e){for(var d=0,s=0,O=i.length;s<O;s++)i[s]===f&&d++;return f+"/"+u+"."+d}i.push(f)}}function v(e,t,n){if(n[t])return n[t];var r=c.encode(e.nodeName);if(e.id)return n[t]="#"+e.id;var o=u.trim(Array.prototype.join.call(e.classList,"."));return o&&(r+="."+o),n[t]=r}function O(){if("undefined"!=typeof document){var e=[];return function e(t,n,r,o,i){for(var c=0,a=t.children,l=a.length;c<l;c++){var s=a[c],v=s.childNodes;if(1===v.length){var O=s.firstChild;if(1===O.nodeType)e(s,n?n+","+c:String(c),r,o,i);else if(3===O.nodeType){var E=u.trim(O.nodeValue);if(f(E)){var T=d(s,0,n,r,o);i.push({k:T,v:E})}}}else v.length>1&&e(s,n?n+","+c:String(c),r,o,i)}}(document.body,"",Object.create(null),Object.create(null),e),e}}l.BODY=l.SCRIPT=l.STYLE=l.LINK=l.META=l.TITLE=l.CANVAS=l.SVG=l.APPLET=l.OBJECT=l.EMBED=l.AUDIO=l.VIDEO=l.BR=l.IFRAME=l.FRAME=l.MAP=l.NOFRAMES=l.NOSCRIPT=l.PROGRESS=l.FRAMESET=!0;var E,T=function(e){if(u.isFunction(r)){var t=!1,n=!0,c=!1,f=void 0;try{for(var d,s=e[Symbol.iterator]();!(n=(d=s.next()).done);n=!0){var v=d.value.target;if(v&&!l[v.nodeName]){t=!0;break}}}catch(e){c=!0,f=e}finally{try{n||null==s.return||s.return()}finally{if(c)throw f}}t&&(o&&(clearTimeout(o),o=null),o=setTimeout(function(){var e=O(),t=JSON.stringify(e);i!==t&&(i=t,t&&r(e,t))},a))}};e.exports={collect:function(){return O()},observe:function(e,t){u.isFunction(e)&&(t=e,e=void 0),a=e,a=Math.max(0,a),r=t,"undefined"!=typeof document&&"undefined"!=typeof MutationObserver&&(E||(E=new MutationObserver(function(e){T(e)})),E.observe(document.body,{childList:!0,subtree:!0,characterData:!0}))},collectAndObserve:function(e,t){u.isFunction(e)&&(t=e,e=void 0);var n=this.collect();return this.observe(e,t),n},disconnect:function(){E&&E.disconnect()}}}]);
//# sourceMappingURL=auto.js.map