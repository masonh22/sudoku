(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(0),s=n.n(r),a=n(7),u=n.n(a);n(13),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(1),o=n(2),l=n(3),c=n(5),f=n(4),h=(n(14),function(e,t){var n,r,s=Math.floor(t/9),a=t%9,u=s<3?0:s<6?3:6,i=a<3?0:a<6?3:6,o=[];for(n=9*s;n<9*s+9;n++)if(null!==e[n]){if(o.includes(e[n]))return!1;o.push(e[n])}for(o=[],n=a;n<81;n+=9)if(null!==e[n]){if(o.includes(e[n]))return!1;o.push(e[n])}for(o=[],n=9*u;n<9*u+27;n+=9)for(r=i;r<i+3;r++)if(null!==e[n+r]){if(o.includes(e[n+r]))return!1;o.push(e[n+r])}return!0}),m=function(e){return function e(t,n,r,s,a){if(r>80)return a;if(r===n[s])return e(t,n,r+1,s+1,a);if(9!==t[r]){var u=t.slice();if(u[r]=u[r]+1,a.push(u),!h(u,r))return e(u,n,r,s,a);var i=e(u,n,r+1,s,a);return null===i?e(u,n,r,s,a):i}return null}(e.nums,e.givens,0,0,[]).slice()},v=function(e){return function e(t,n,r,s){if(r>80)return[t];if(r===n[s])return e(t,n,r+1,s+1);if(9!==t[r]){var a=t.slice();if(a[r]=a[r]+1,h(a,r)){var u=e(a,n,r+1,s);return null===u?e(a,n,r,s):u}return e(a,n,r,s)}return null}(e.nums,e.givens,0,0)},k=function(e){for(var t=[],n=0;n<e.length;n++)null!==e[n]&&t.push(n);return t};function d(e){return s.a.createElement("td",{className:e.selected?"square selected":"square",onClick:e.onClick,key:e.val},e.value)}function y(e){return s.a.createElement("button",{className:"undo",onClick:e.onClick},"Undo")}var p=function(e){Object(c.a)(n,e);var t=Object(f.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"renderSquare",value:function(e){var t=this;return s.a.createElement(d,{value:this.props.squares[e],selected:this.props.selected===e,onClick:function(){return t.props.squareClick(e)},val:e})}},{key:"makeRows",value:function(){for(var e=[],t=0;t<9;t++){for(var n=[],r=0;r<9;r++)n.push(this.renderSquare(9*t+r));e.push(s.a.createElement("tr",{key:t},n))}return e}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("table",{className:"board"},s.a.createElement("tbody",null,this.makeRows())))}}]),n}(s.a.Component),b=function(e){Object(c.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).state={history:[Array(81).fill(null)],selected:null,stepNumber:0},r.keyIn=r.keyIn.bind(Object(i.a)(r)),r}return Object(l.a)(n,[{key:"squareClick",value:function(e){this.setState({selected:e})}},{key:"undoClick",value:function(){console.log("undo"),this.setState((function(e){var t=0===e.stepNumber?0:e.stepNumber-1;return{stepNumber:t,history:e.history.slice(0,t+1)}}))}},{key:"keyIn",value:function(e){e&&(isNaN(e.key)||"0"===e.key?"Backspace"===e.key&&this.setState((function(e){var t=e.history[e.stepNumber].slice();return t[e.selected]=null,{history:e.history.concat([t]),stepNumber:e.stepNumber+1}})):(console.log("key in"),this.setState((function(t){var n=t.history[t.stepNumber].slice();return n[t.selected]=parseInt(e.key),{history:t.history.concat([n]),stepNumber:t.stepNumber+1}}))))}},{key:"solve",value:function(e){console.log("solving");var t=e({nums:this.state.history[this.state.stepNumber],givens:k(this.state.history[this.state.stepNumber])});this.setState((function(e){return{history:e.history.concat(t),stepNumber:e.stepNumber+t.length}}))}},{key:"bfSolveSteps",value:function(){var e=this;this.solve(m),setTimeout((function(){var t=0,n=setInterval((function(){e.setState({stepNumber:t}),++t===e.state.history.length&&clearInterval(n)}),1)}),100)}},{key:"clear",value:function(){this.setState({history:[Array(81).fill(null)],selected:null,stepNumber:0})}},{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.keyIn)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.keyIn)}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"game"},s.a.createElement("div",{className:"game-board"},s.a.createElement(p,{squares:this.state.history[this.state.stepNumber],selected:this.state.selected,squareClick:function(t){return e.squareClick(t)}})),s.a.createElement(y,{onClick:function(){return e.undoClick()}}),s.a.createElement("button",{className:"clear",onClick:function(){return e.clear()}},"Clear"),s.a.createElement("button",{className:"solve",onClick:function(){return e.solve(v)}},"Solve"))}}]),n}(s.a.Component);var N=function(){return s.a.createElement("div",{className:"app"},s.a.createElement(b,null))};u.a.render(s.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.ceec375b.chunk.js.map