(window["webpackJsonpreact-getting-started"]=window["webpackJsonpreact-getting-started"]||[]).push([[5],{104:function(e,n,r){e.exports={Order:"order__Order__ugFlZ",Ingredient:"order__Ingredient__3o7-M"}},106:function(e,n,r){"use strict";r.r(n);var t=r(5),a=r(6),i=r(8),o=r(7),c=r(9),s=r(0),u=r.n(s),d=r(19),p=r(21),l=r(46),m=r(18),g=r(45),b=r(3),f=r(104),h=r.n(f),O=function(e){var n=[];for(var r in e.ingredients)n.push({name:r,amount:e.ingredients[r]});var t=n.map(function(e){return u.a.createElement("span",{className:h.a.Ingredient,key:e.name},e.name," (",e.amount,")")});return u.a.createElement("div",{className:h.a.Order},u.a.createElement("p",null,b.b.ingredients,": ",t),u.a.createElement("p",null,b.b.price,": ",u.a.createElement("b",null,b.b.currencyUsd," ",Number.parseFloat(e.price).toFixed(2))))},k=function(e){function n(){return Object(t.a)(this,n),Object(i.a)(this,Object(o.a)(n).apply(this,arguments))}return Object(c.a)(n,e),Object(a.a)(n,[{key:"componentDidMount",value:function(){this.props.onOrdersFetch(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=u.a.createElement(g.a,null);return this.props.loading||(e=this.props.orders.map(function(e){return u.a.createElement(O,{key:e.id,ingredients:e.ingredients,price:e.price})})),e}}]),n}(s.Component);n.default=Object(d.b)(function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}},function(e){return{onOrdersFetch:function(n,r){return e(m.g(n,r))}}})(Object(l.a)(k,p.a))}}]);
//# sourceMappingURL=5.cbae8bf6.chunk.js.map