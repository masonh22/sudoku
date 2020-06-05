(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n(2),u=n(3),a=n(5),i=n(4),o=n(0),l=n.n(o),c=n(7),h=n.n(c);n(13),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=function(e,t){var n,r,s=Math.floor(t/9),u=t%9,a=s<3?0:s<6?3:6,i=u<3?0:u<6?3:6,o=[];for(n=9*s;n<9*s+9;n++)if(null!==e[n]){if(o.includes(e[n]))return!1;o.push(e[n])}for(o=[],n=u;n<81;n+=9)if(null!==e[n]){if(o.includes(e[n]))return!1;o.push(e[n])}for(o=[],n=9*a;n<9*a+27;n+=9)for(r=i;r<i+3;r++)if(null!==e[n+r]){if(o.includes(e[n+r]))return!1;o.push(e[n+r])}return!0},m=function(e,t){return function e(t,n,r,s,u){if(r>80)return u(t),t;if(r===n[s])return u(t),e(t,n,r+1,s+1,u);if(9!==t[r]){var a=t.slice();if(a[r]=a[r]+1,u(a),!f(a,r))return e(a,n,r,s,u);var i=e(a,n,r+1,s,u);return null===i?e(a,n,r,s,u):i}return null}(e.nums,e.givens,0,0,t)},v=function(e){return function e(t,n,r,s){if(r>80)return t;if(r===n[s])return e(t,n,r+1,s+1);if(9!==t[r]){var u=t.slice();if(u[r]=u[r]+1,!f(u,r))return e(u,n,r,s);var a=e(u,n,r+1,s);return null===a?e(u,n,r,s):a}return null}(e.nums,e.givens,0,0)},y=function(e){for(var t=[],n=0;n<e.length;n++)null!==e[n]&&t.push(n);return t};function k(e){return l.a.createElement("td",{className:e.selected?"square selected":"square",onClick:e.onClick,key:e.val},e.value)}function d(e){return l.a.createElement("button",{className:"undo",onClick:e.onClick},"Undo")}var p=function(e){Object(a.a)(n,e);var t=Object(i.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"renderSquare",value:function(e){var t=this;return l.a.createElement(k,{value:this.props.squares[e],selected:this.props.selected===e,onClick:function(){return t.props.squareClick(e)},val:e})}},{key:"makeRows",value:function(){for(var e=[],t=0;t<9;t++){for(var n=[],r=0;r<9;r++)n.push(this.renderSquare(9*t+r));e.push(l.a.createElement("tr",{key:t},n))}return e}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("table",{className:"board"},l.a.createElement("tbody",null,this.makeRows())))}}]),n}(l.a.Component),b=function(e){Object(a.a)(n,e);var t=Object(i.a)(n);function n(e){var u;return Object(s.a)(this,n),(u=t.call(this,e)).state={history:[Array(81).fill(null)],selected:null,stepNumber:0},u.keyIn=u.keyIn.bind(Object(r.a)(u)),u}return Object(u.a)(n,[{key:"squareClick",value:function(e){this.setState({selected:e})}},{key:"undoClick",value:function(){console.log("undo"),this.setState((function(e){var t=0===e.stepNumber?0:e.stepNumber-1;return{stepNumber:t,history:e.history.slice(0,t+1)}}))}},{key:"keyIn",value:function(e){e&&(isNaN(e.key)||"0"===e.key?"Backspace"===e.key&&this.setState((function(e){var t=e.history[e.stepNumber].slice();return t[e.selected]=null,{history:e.history.concat([t]),stepNumber:e.stepNumber+1}})):(console.log("key in"),this.setState((function(t){var n=t.history[t.stepNumber].slice();return n[t.selected]=parseInt(e.key),{history:t.history.concat([n]),stepNumber:t.stepNumber+1}}))))}},{key:"updateNums",value:function(e){this.setState((function(t){return{history:t.history.concat([e]),stepNumber:t.stepNumber+1}}))}},{key:"bfSolveCallback",value:function(){var e=this;console.log("starting solve"),m({nums:this.state.history[this.state.stepNumber],givens:y(this.state.history[this.state.stepNumber])},(function(t){return e.updateNums(t)}))}},{key:"bfSolve",value:function(){console.log("solving");var e=v({nums:this.state.history[this.state.stepNumber],givens:y(this.state.history[this.state.stepNumber])});this.setState((function(t){return{history:t.history.concat([e]),stepNumber:t.stepNumber+1}}))}},{key:"clear",value:function(){this.setState({history:[Array(81).fill(null)],selected:null,stepNumber:0})}},{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.keyIn)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.keyIn)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"game"},l.a.createElement("div",{className:"game-board"},l.a.createElement(p,{squares:this.state.history[this.state.history.length-1],selected:this.state.selected,squareClick:function(t){return e.squareClick(t)}})),l.a.createElement(d,{onClick:function(){return e.undoClick()}}),l.a.createElement("button",{className:"clear",onClick:function(){return e.clear()}},"Clear"),l.a.createElement("button",{className:"solve",onClick:function(){return e.bfSolve()}},"Solve"))}}]),n}(l.a.Component);h.a.render(l.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.5c3c5f2f.chunk.js.map