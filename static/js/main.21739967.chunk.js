(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n.n(s),o=n(7),a=n.n(o);n(13),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(1),u=n(2),l=n(3),c=n(5),h=n(4),p=(n(14),function(e,t){var n,s,r=Math.floor(t/9),o=t%9,a=r<3?0:r<6?3:6,i=o<3?0:o<6?3:6,u=[];for(n=9*r;n<9*r+9;n++)if(0!==e[n]){if(u.includes(e[n]))return!1;u.push(e[n])}for(u=[],n=o;n<81;n+=9)if(0!==e[n]){if(u.includes(e[n]))return!1;u.push(e[n])}for(u=[],n=9*a;n<9*a+27;n+=9)for(s=i;s<i+3;s++)if(0!==e[n+s]){if(u.includes(e[n+s]))return!1;u.push(e[n+s])}return!0}),v=function(e,t){return function e(t,n,s,r){if(s>80)return r;if(n.has(s))return e(t,n,s+1,r);if(9!==t[s]){var o=t.slice();if(o[s]=o[s]+1,r.push(o),!p(o,s))return e(o,n,s,r);var a=e(o,n,s+1,r);return null===a?e(o,n,s,r):a}return null}(e,t,0,[])},f=function(e){for(var t=new Set,n=0;n<e.length;n++)0!==e[n]&&t.add(n);return t},m=[{puzzle:[0,0,4,3,0,0,2,0,9,0,0,5,0,0,9,0,0,1,0,7,0,0,6,0,0,4,3,0,0,6,0,0,2,0,8,7,1,9,0,0,0,7,4,0,0,0,5,0,0,8,3,0,0,0,6,0,0,0,0,0,1,0,5,0,0,3,5,0,8,6,9,0,0,4,2,9,1,0,3,0,0],solution:[8,6,4,3,7,1,2,5,9,3,2,5,8,4,9,7,6,1,9,7,1,2,6,5,8,4,3,4,3,6,1,9,2,5,8,7,1,9,8,6,5,7,4,3,2,2,5,7,4,8,3,9,1,6,6,8,9,7,3,4,1,2,5,7,1,3,5,2,8,6,9,4,5,4,2,9,1,6,3,7,8]},{puzzle:[0,4,0,1,0,0,0,5,0,1,0,7,0,0,3,9,6,0,5,2,0,0,0,8,0,0,0,0,0,0,0,0,0,0,1,7,0,0,0,9,0,6,8,0,0,8,0,3,0,5,0,6,2,0,0,9,0,0,6,0,5,4,3,6,0,0,0,8,0,7,0,0,2,5,0,0,9,7,1,0,0],solution:[3,4,6,1,7,9,2,5,8,1,8,7,5,2,3,9,6,4,5,2,9,6,4,8,3,7,1,9,6,5,8,3,2,4,1,7,4,7,2,9,1,6,8,3,5,8,1,3,7,5,4,6,2,9,7,9,8,2,6,1,5,4,3,6,3,1,4,8,5,7,9,2,2,5,4,3,9,7,1,8,6]},{puzzle:Array(81).fill(0),solution:Array(81).fill(0)}],d=function(e){var t="";for(var n in e)e[n]&&(t+=n+" ");return t},y=function(e){return r.a.createElement("div",{className:d({cell:!0,show:!e.show}),key:e.val},e.val)},k=function(e){Object(c.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"renderNotes",value:function(){for(var e=[],t=1;t<10;t++)e.push(r.a.createElement(y,{val:t,show:this.props.notes[t-1]}));return r.a.createElement("div",{className:"grid"},e)}},{key:"render",value:function(){return r.a.createElement("td",{className:d({"square-selected":this.props.selected,incorrect:this.props.value!==this.props.solution,given:this.props.given}),onClick:this.props.onClick,key:this.props.val},0===this.props.value?this.renderNotes():this.props.value)}}]),n}(r.a.Component),b=function(e){Object(c.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"renderSquare",value:function(e){var t=this;return r.a.createElement(k,{value:this.props.squares[e],given:this.props.givens.has(e),solution:this.props.solution[e],selected:this.props.selected===e,notes:this.props.notes[e],onClick:function(){return t.props.squareClick(e)},val:e})}},{key:"makeRows",value:function(){for(var e=[],t=0;t<9;t++){for(var n=[],s=0;s<9;s++)n.push(this.renderSquare(9*t+s));e.push(r.a.createElement("tr",{key:t},n))}return e}},{key:"render",value:function(){return r.a.createElement("div",{className:"main-container"},r.a.createElement("table",{className:"board"},r.a.createElement("tbody",null,this.makeRows())))}}]),n}(r.a.Component),N=function(e){Object(c.a)(n,e);var t=Object(h.a)(n);function n(e){var s;Object(u.a)(this,n),s=t.call(this,e);for(var r=Array(81).fill(null),o=0;o<81;o++)r[o]=Array(9).fill(!1);return s.state={history:[m[0].puzzle],solution:m[0].solution,givens:f(m[0].puzzle),notes:r,selected:null,stepNumber:0,noteMode:!1},s.keyIn=s.keyIn.bind(Object(i.a)(s)),s}return Object(l.a)(n,[{key:"squareClick",value:function(e){this.setState({selected:e})}},{key:"undoClick",value:function(){console.log("undo"),this.setState((function(e){var t=0===e.stepNumber?0:e.stepNumber-1;return{stepNumber:t,history:e.history.slice(0,t+1)}}))}},{key:"keyIn",value:function(e){e&&(isNaN(e.key)||"0"===e.key||0!==this.state.history[0][this.state.selected]?"Backspace"===e.key&&this.setState((function(e){var t=e.history[e.stepNumber].slice();return t[e.selected]=0,{history:e.history.concat([t]),stepNumber:e.stepNumber+1}})):(console.log("key in"),this.setState((function(t){if(t.noteMode){var n=t.notes.slice();return n[t.selected][parseInt(e.key)-1]=!n[t.selected][parseInt(e.key)-1],{notes:n}}var s=t.history[t.stepNumber].slice();return s[t.selected]=parseInt(e.key),{history:t.history.concat([s]),stepNumber:t.stepNumber+1}}))))}},{key:"notesClick",value:function(){this.setState((function(e){return{noteMode:!e.noteMode}}))}},{key:"solve",value:function(e){console.log("solving");var t=e(this.state.history[this.state.stepNumber],this.state.givens);this.setState((function(e){return{history:e.history.concat(t),stepNumber:e.stepNumber+t.length}}))}},{key:"bfSolveSteps",value:function(){var e=this,t=v(this.state.history[this.state.stepNumber],this.state.givens);null!==t&&(this.setState((function(e){return{history:e.history.concat(t)}})),setTimeout((function(){var t=0,n=setInterval((function(){e.setState({stepNumber:t}),++t===e.state.history.length&&clearInterval(n)}),1)}),100))}},{key:"clear",value:function(){this.setState((function(e){return{history:e.history.slice(0,1),selected:null,stepNumber:0}}))}},{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.keyIn)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.keyIn)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"game"},r.a.createElement("div",{className:"game-board"},r.a.createElement(b,{squares:this.state.history[this.state.stepNumber],solution:this.state.solution,givens:this.state.givens,selected:this.state.selected,notes:this.state.notes,squareClick:function(t){return e.squareClick(t)}})),r.a.createElement("button",{className:"undo",onClick:function(){return e.undoClick()}},"Undo"),r.a.createElement("button",{className:"clear",onClick:function(){return e.clear()}},"Clear"),r.a.createElement("button",{className:"notes",onClick:function(){return e.notesClick()}},"Notes"),r.a.createElement("button",{className:"solve",onClick:function(){return e.bfSolveSteps()}},"Solve"))}}]),n}(r.a.Component);var g=function(){return r.a.createElement("div",{className:"app"},r.a.createElement(N,null))};a.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.21739967.chunk.js.map