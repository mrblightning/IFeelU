(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{181:function(e,t){},183:function(e,t){},193:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(15),l=a(17),s=a(16),o=a(18),i=a(0),c=a.n(i),m=a(46),g=a.n(m);a(48),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var d=a(74),u=a.n(d),p=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).state={checked:!0},"true"===a.props.initToggle?a.state={checked:!0}:a.state={checked:!1},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.state.checked;return c.a.createElement("div",{className:"trackItem"},c.a.createElement("div",{className:"trackName"},this.props.toggleName),c.a.createElement(u.a,{checked:t,onColor:"#22aee4",className:"switch",onChange:function(t){return e.setState({checked:t})}}))}}]),t}(c.a.Component),h=function(e){var t=e.match;return c.a.createElement("div",{className:"pageContent",id:"pageContent"},c.a.createElement("div",{className:"pageTopText"},"Page ID ",t.params.id))},b=(a(134),a(178),a(59)),E=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).renderExtraText=function(e,t,n){a.setState({extraText:n+e[t]})},a.state={myLabels:[],myDataPain:[],myDataGeneralFeeling:[],GeneralFeelingTexts:[],PainTexts:[],extraText:""},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;function t(e){return new Date(e)}function a(e,a){var n=t(e).getTime(),r=t(a).getTime(),l=Math.abs(n-r);return Math.round(l/864e5)}var n=this.node;fetch("http://localhost:4000/fetch/Ilana").then(function(e){return e.json()}).then(function(n){for(var r=!1,l=!1,s=0,o=0,i="",c="",m=0;m<n.length;m++){var g=t(n[m].date).toLocaleString(void 0,{day:"numeric",month:"short",year:"2-digit"})+"."+n[m].check;if(!1===e.state.myLabels.includes(g)){for(;a(n[m].date,c)>1;){var d=new Date(t(c));d.setDate(d.getDate()+1),c=d.toLocaleString(void 0,{day:"numeric",month:"short",year:"2-digit"}),e.state.myLabels.push(c),!1===r&&(e.state.myDataGeneralFeeling.push(s),e.state.GeneralFeelingTexts.push(" ")),!1===l&&(e.state.myDataPain.push(o),e.state.PainTexts.push(" ")),r=!1,l=!1}e.state.myLabels.push(g),i!==g&&""!==i&&(!1===r&&(e.state.myDataGeneralFeeling.push(s),e.state.GeneralFeelingTexts.push(" ")),!1===l&&(e.state.myDataPain.push(o),e.state.PainTexts.push(" "))),c=n[m].date,i=g,r=!1,l=!1}"GeneralFeeling"===n[m].RecordTracking&&(e.state.myDataGeneralFeeling.push(n[m].state),e.state.GeneralFeelingTexts.push(n[m].ExtraText),s=n[m].state,r=!0),"Pain"===n[m].RecordTracking&&(e.state.myDataPain.push(n[m].state),e.state.PainTexts.push(n[m].ExtraText),o=n[m].state,l=!0)}!1===r&&(e.state.myDataGeneralFeeling.push(s),e.state.GeneralFeelingTexts.push(" ")),!1===l&&(e.state.myDataPain.push(o),e.state.PainTexts.push(" "))});var r=new b(n,{type:"line",data:{labels:this.state.myLabels,datasets:[{label:"Pain",data:this.state.myDataPain,backgroundColor:["#c45850"],borderColor:"#c45850",fill:!1},{label:"General Feeling",data:this.state.myDataGeneralFeeling,backgroundColor:["#3e95cd"],borderColor:"#3e95cd",fill:!1},{label:"Test1",data:[5,5,4,3,1,2,3,4,3,1,2,3,4,3,3,1,2,3,4,3],backgroundColor:["#7f22e8"],borderColor:"#7f22e8",fill:!1},{label:"Test2",data:[4,4,3,3,3,2,1,5,4,3,1,2,3,4,3,2,1,5,4],backgroundColor:["#eb94db"],borderColor:"#eb94db",fill:!1}]},options:{onClick:function(t,a){var n=r.getElementAtEvent(t)[0];if(void 0!==n){if("General Feeling"===n._chart.legend.legendItems[n._datasetIndex].text){var l="On "+e.state.myLabels[n._index]+", concerning your General Feeling you wrote: ";e.renderExtraText(e.state.GeneralFeelingTexts,n._index,l)}if("Pain"===n._chart.legend.legendItems[n._datasetIndex].text){var s="On "+e.state.myLabels[n._index]+", concerning your Pain you wrote: ";e.renderExtraText(e.state.PainTexts,n._index,s)}}},scales:{scaleOverride:!0,scaleSteps:1,scaleStepWidth:1,scaleStartValue:0,yAxes:[{ticks:{beginAtZero:!0,max:5,min:1,stepSize:1}}]},pan:{enabled:!0,mode:"x"},zoom:{enabled:!0,mode:"x"}}})}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"pageContent",id:"pageContent"},c.a.createElement("canvas",{className:"graphContent",ref:function(t){return e.node=t}}),c.a.createElement("div",{className:"extraText"},this.state.extraText))}}]),t}(c.a.Component),v=a(197),T=a(195),f=a(196),x=function(e){function t(e){return Object(n.a)(this,t),Object(l.a)(this,Object(s.a)(t).call(this,e))}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e;return e=this.props.isToggleOn?"sidebarMenuShadow":"",c.a.createElement(v.a,null,c.a.createElement("div",null,c.a.createElement("div",{className:"header"},c.a.createElement("div",{className:"headerText"},"IFEELU"),c.a.createElement("div",{className:"logo"},c.a.createElement("a",{href:"https://www.youtube.com/"},c.a.createElement("img",{src:"https://drive.google.com/uc?id=14MW9Z9pz9of-krcV5qLRLs_gvjmE1Sny",alt:"IFeelU Logo"})))),c.a.createElement("input",{type:"checkbox",className:"openSidebarMenu",id:"openSidebarMenu",onClick:this.props.toggleState,checked:this.props.isToggleOn,onChange:this.props.toggleState}),c.a.createElement("label",{htmlFor:"openSidebarMenu",className:"sidebarIconToggle"},c.a.createElement("div",{className:"spinner diagonal part-1"}),c.a.createElement("div",{className:"spinner horizontal"}),c.a.createElement("div",{className:"spinner diagonal part-2"})),c.a.createElement("div",{id:"sidebarMenu",className:e},c.a.createElement("ul",{className:"sidebarMenuInner"},c.a.createElement("li",{onClick:this.props.toggleState},c.a.createElement(T.a,{to:"/"},"Barak Brudo ",c.a.createElement("span",null,"Web Developer"))),c.a.createElement("li",{onClick:this.props.toggleState},c.a.createElement(T.a,{to:"/graph"},"Graph")),c.a.createElement("li",{onClick:this.props.toggleState},c.a.createElement(T.a,{to:"/pages/Instagram"},"Instagram")),c.a.createElement("li",{onClick:this.props.toggleState},c.a.createElement(T.a,{to:"/pages/Twitter"},"Twitter")),c.a.createElement("li",{onClick:this.props.toggleState},c.a.createElement(T.a,{to:"/pages/YouTube"},"YouTube")),c.a.createElement("li",{onClick:this.props.toggleState},c.a.createElement(T.a,{to:"/pages/Linkedin"},"Linkedin")))),c.a.createElement("div",{className:"wrapper"},c.a.createElement(f.a,{exact:!0,path:"/",component:k}),c.a.createElement(f.a,{path:"/pages/:id",component:h}),c.a.createElement(f.a,{exact:!0,path:"/:id",component:E}))))}}]),t}(c.a.Component),k=function(e){e.match;return c.a.createElement("div",{className:"pageContent",id:"pageContent"},c.a.createElement("div",{className:"pageTopText"},"I would like to track:"),c.a.createElement("div",{className:"trackBox"},c.a.createElement(p,{toggleName:"General Feeling",initToggle:"true"}),c.a.createElement(p,{toggleName:"Appetite",initToggle:"false"}),c.a.createElement(p,{toggleName:"Nausea",initToggle:"false"}),c.a.createElement(p,{toggleName:"Bowel Movements",initToggle:"false"}),c.a.createElement(p,{toggleName:"Motivation",initToggle:"false"}),c.a.createElement(p,{toggleName:"Pain",initToggle:"true"}),c.a.createElement(p,{toggleName:"Dizziness",initToggle:"false"}),c.a.createElement(p,{toggleName:"Exhaustion",initToggle:"false"})),c.a.createElement("div",{className:"buttonArea"},c.a.createElement("button",{className:"button buttonBack"},"Back"),c.a.createElement("button",{className:"button buttonNext"},"Next")))},y=x,N=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).toggleState=function(){a.setState({isToggleOn:!a.state.isToggleOn})},a.state={isToggleOn:!1},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return this.state.isToggleOn?"sidebarMenuShadow":"",c.a.createElement("div",null,c.a.createElement(y,{toggleState:this.toggleState,isToggleOn:this.state.isToggleOn}))}}]),t}(c.a.Component);g.a.render(c.a.createElement("div",{id:"App"},c.a.createElement(N,{pageWrapId:"pageContent",outerContainerId:"App"})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},48:function(e,t,a){},76:function(e,t,a){e.exports=a(193)}},[[76,1,2]]]);
//# sourceMappingURL=main.03e7d7a8.chunk.js.map