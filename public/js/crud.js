(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
module.exports = function (str, sep) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	sep = typeof sep === 'undefined' ? '_' : sep;

	return str
		.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
		.toLowerCase();
};

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var a=n(19),o=r(a),s=o["default"];e.exports=s},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},a=0;a<this.length;a++){var o=this[a][0];"number"==typeof o&&(r[o]=!0)}for(a=0;a<t.length;a++){var s=t[a];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],a=p[r.id];if(a){a.refs++;for(var o=0;o<a.parts.length;o++)a.parts[o](r.parts[o]);for(;o<r.parts.length;o++)a.parts.push(d(r.parts[o],t))}else{for(var s=[],o=0;o<r.parts.length;o++)s.push(d(r.parts[o],t));p[r.id]={id:r.id,refs:1,parts:s}}}}function a(e){for(var t=[],n={},r=0;r<e.length;r++){var a=e[r],o=a[0],s=a[1],i=a[2],l=a[3],d={css:s,media:i,sourceMap:l};n[o]?n[o].parts.push(d):t.push(n[o]={id:o,parts:[d]})}return t}function o(e,t){var n=y(),r=x[x.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function s(e){e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function i(e){var t=document.createElement("style");return t.type="text/css",o(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",o(e,t),t}function d(e,t){var n,r,a;if(t.singleton){var o=m++;n=g||(g=i(t)),r=c.bind(null,n,o,!1),a=c.bind(null,n,o,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),r=f.bind(null,n),a=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=i(t),r=u.bind(null,n),a=function(){s(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else a()}}function c(e,t,n,r){var a=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,a);else{var o=document.createTextNode(a),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(o,s[t]):e.appendChild(o)}}function u(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t){var n=t.css,r=t.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([n],{type:"text/css"}),o=e.href;e.href=URL.createObjectURL(a),o&&URL.revokeObjectURL(o)}var p={},h=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},v=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),y=h(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,m=0,x=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=v()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=a(e);return r(n,t),function(e){for(var o=[],s=0;s<n.length;s++){var i=n[s],l=p[i.id];l.refs--,o.push(l)}if(e){var d=a(e);r(d,t)}for(var s=0;s<o.length;s++){var l=o[s];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete p[l.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){"use strict";var n={getDuration:function(e){var t=new Date(e);t.getMonth();return t.setMonth(t.getMonth()+1),t.setDate(0),t.getDate()},changeDay:function(e,t){var n=new Date(e);return new Date(n.setDate(n.getDate()+t))},getStartDate:function(e){return new Date(e.getFullYear(),e.getMonth(),1)},getEndDate:function(e){var t=new Date(e.getFullYear(),e.getMonth()+1,1);return new Date(t.setDate(t.getDate()-1))},format:function(e,t){e="string"==typeof e?new Date(e.replace(/-/g,"/")):new Date(e);var n={M:e.getMonth()+1,d:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),q:Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};return t=t.replace(/([yMdhmsqS])+/g,function(t,r){var a=n[r];return void 0!==a?(t.length>1&&(a="0"+a,a=a.substr(a.length-2)),a):"y"===r?String(e.getFullYear()).substr(4-t.length):t})}};e.exports=n},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=r(a);t["default"]={props:{currentDate:{},events:{},weekNames:{},monthNames:{},firstDay:{}},created:function(){this.events.forEach(function(e,t){e._id=e.id||t,e.end=e.end||e.start})},data:function(){return{weekMask:[1,2,3,4,5,6,7],isLismit:!0,eventLimit:3,showMore:!1,morePos:{top:0,left:0},selectDay:{}}},filters:{isBegin:function(e,t,n){var r=new Date(e.start);return 0==n||r.toDateString()==t.toDateString()?e.title:"　"},moreTitle:function(e){var t=new Date(e);return this.weekNames[t.getDay()]+", "+this.monthNames[t.getMonth()]+t.getDate()}},computed:{currentDates:function(){return this.getCalendar()}},methods:{classNames:function(e){return e?"string"==typeof e?e:Array.isArray(e)?e.join(" "):"":""},getCalendar:function(){var e=new Date,t=new Date(this.currentDate),n=o["default"].getStartDate(t),r=n.getDay();n.setDate(n.getDate()-r+this.firstDay);for(var a=[],s=0;s<6;s++){for(var i=[],l=0;l<7;l++)i.push({monthDay:n.getDate(),isToday:e.toDateString()==n.toDateString(),isCurMonth:n.getMonth()==t.getMonth(),weekDay:l,date:new Date(n),events:this.slotEvents(n)}),n.setDate(n.getDate()+1);a.push(i)}return a},slotEvents:function(e){var t=this.events.filter(function(t){var n=new Date(t.start),r=new Date(n.getFullYear(),n.getMonth(),n.getDate()),a=t.end?new Date(t.end):r;return e>=r&&e<=a});t.sort(function(e,t){return e.cellIndex?t.cellIndex?e.cellIndex-t.cellIndex:-1:1});for(var n=0;n<t.length;n++)t[n].cellIndex=t[n].cellIndex||n+1,t[n].isShow=!0,t[n].cellIndex==n+1||n>2||t.splice(n,0,{title:"holder",cellIndex:n+1,start:o["default"].format(e,"yyyy-MM-dd"),end:o["default"].format(e,"yyyy-MM-dd"),isShow:!1});return t},isStart:function(e,t){var n=new Date(e);return n.toDateString()==t.toDateString()},isEnd:function(e,t){var n=new Date(e);return n.toDateString()==t.toDateString()},selectThisDay:function(e,t){this.selectDay=e,this.showMore=!0,this.morePos=this.computePos(event.target),this.morePos.top-=100;var n=e.events.filter(function(e){return 1==e.isShow});this.$dispatch("moreClick",e.date,n,t)},computePos:function(e){var t=e.getBoundingClientRect(),n=this.$els.dates.getBoundingClientRect();return{left:t.left-n.left,top:t.top+t.height-n.top}},dayClick:function(e,t){this.$dispatch("dayClick",e,t)},eventClick:function(e,t){if(console.log("cellIndex",e.cellIndex),e.isShow){t.stopPropagation();var n=this.computePos(t.target);this.$dispatch("eventClick",e,t,n)}}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=r(a);t["default"]={created:function(){this.dispatchEvent()},props:{currentDate:{},titleFormat:{}},data:function(){return{title:"",leftArrow:"<",rightArrow:">"}},methods:{goPrev:function(){this.currentDate=this.changeMonth(this.currentDate,-1),this.dispatchEvent()},goNext:function(){this.currentDate=this.changeMonth(this.currentDate,1),this.dispatchEvent()},changeMonth:function(e,t){var n=new Date(e);return new Date(n.setMonth(n.getMonth()+t))},dispatchEvent:function(){this.title=o["default"].format(this.currentDate,this.titleFormat);var e=o["default"].getStartDate(this.currentDate),t=e.getDay();e.setDate(e.getDate()-t+1);var n=o["default"].changeDay(e,41),r=o["default"].getStartDate(this.currentDate);this.$dispatch("changeMonth",o["default"].format(e,"yyyy-MM-dd"),o["default"].format(n,"yyyy-MM-dd"),o["default"].format(r,"yyyy-MM-dd"))}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(7),o=r(a);t["default"]={props:{events:{type:Array,"default":[]},lang:{type:String,"default":"zh"},firstDay:{type:Number,coerce:function(e){var t=parseInt(e);return t<0||t>6?0:t},"default":0},titleFormat:{type:String,"default":function(){return o["default"][this.lang].titleFormat}},monthNames:{type:Array,"default":function(){return o["default"][this.lang].monthNames}},weekNames:{type:Array,"default":function(){var e=o["default"][this.lang].weekNames;return e.slice(this.firstDay).concat(e.slice(0,this.firstDay))}}},created:function(){},data:function(){return{currentDate:new Date}},components:{"fc-body":n(17),"fc-header":n(18)}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={en:{weekNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],titleFormat:"MM/yyyy"},zh:{weekNames:["周日","周一","周二","周三","周四","周五","周六"],monthNames:["1月","2月","3月","4月","5月","6月","7月","8月","9月","11月","12月"],titleFormat:"yyyy年MM月"}}},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,".comp-full-calendar{padding:20px;background:#fff;max-width:960px;margin:0 auto}.comp-full-calendar p,.comp-full-calendar ul{margin:0;padding:0;font-size:14px}",""])},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,".full-calendar-header{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.full-calendar-header .header-left,.full-calendar-header .header-right{-webkit-box-flex:1;flex:1}.full-calendar-header .header-center{-webkit-box-flex:3;flex:3;text-align:center}.full-calendar-header .header-center .title{margin:0 10px}.full-calendar-header .header-center .next-month,.full-calendar-header .header-center .prev-month{cursor:pointer}",""])},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,".full-calendar-body{margin-top:20px}.full-calendar-body .weeks{display:-webkit-box;display:flex;border-top:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;border-left:1px solid #e0e0e0}.full-calendar-body .weeks .week{-webkit-box-flex:1;flex:1;text-align:center;border-right:1px solid #e0e0e0}.full-calendar-body .dates{position:relative}.full-calendar-body .dates .week-row{border-left:1px solid #e0e0e0;display:-webkit-box;display:flex}.full-calendar-body .dates .week-row .day-cell{-webkit-box-flex:1;flex:1;min-height:100px;padding:4px;border-right:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0}.full-calendar-body .dates .week-row .day-cell .day-number{text-align:right}.full-calendar-body .dates .week-row .day-cell.today{background-color:#fcf8e3}.full-calendar-body .dates .week-row .day-cell.not-cur-month .day-number{color:rgba(0,0,0,.24)}.full-calendar-body .dates .dates-events{position:absolute;top:0;left:0;z-index:1;width:100%}.full-calendar-body .dates .dates-events .events-week{display:-webkit-box;display:flex}.full-calendar-body .dates .dates-events .events-week .events-day{cursor:pointer;-webkit-box-flex:1;flex:1;min-height:109px;overflow:hidden;text-overflow:ellipsis}.full-calendar-body .dates .dates-events .events-week .events-day .day-number{text-align:right;padding:4px 5px 4px 4px;opacity:0}.full-calendar-body .dates .dates-events .events-week .events-day.not-cur-month .day-number{color:rgba(0,0,0,.24)}.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item{cursor:pointer;font-size:12px;background-color:#c7e6fd;margin-bottom:2px;color:rgba(0,0,0,.87);padding:0 0 0 4px;height:18px;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-start{margin-left:4px}.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-end{margin-right:4px}.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-opacity{opacity:0}.full-calendar-body .dates .dates-events .events-week .events-day .event-box .more-link{cursor:pointer;padding-left:8px;padding-right:2px;color:rgba(0,0,0,.38);font-size:14px}.full-calendar-body .dates .more-events{position:absolute;width:150px;z-index:2;border:1px solid #eee;box-shadow:0 2px 6px rgba(0,0,0,.15)}.full-calendar-body .dates .more-events .more-header{background-color:#eee;padding:5px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;font-size:14px}.full-calendar-body .dates .more-events .more-header .title{-webkit-box-flex:1;flex:1}.full-calendar-body .dates .more-events .more-header .close{margin-right:2px;cursor:pointer;font-size:16px}.full-calendar-body .dates .more-events .more-body{height:140px;overflow:hidden}.full-calendar-body .dates .more-events .more-body .body-list{height:120px;padding:5px;overflow:auto;background-color:#fff}.full-calendar-body .dates .more-events .more-body .body-list .body-item{cursor:pointer;font-size:12px;background-color:#c7e6fd;margin-bottom:2px;color:rgba(0,0,0,.87);padding:0 0 0 4px;height:18px;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",""])},function(e,t,n){var r=n(8);"string"==typeof r&&(r=[[e.id,r,""]]);n(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,n){var r=n(9);"string"==typeof r&&(r=[[e.id,r,""]]);n(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,n){var r=n(10);"string"==typeof r&&(r=[[e.id,r,""]]);n(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t){e.exports=' <div class=full-calendar-body> <div class=weeks> <strong class=week v-for="week in weekNames">{{week}}</strong> </div> <div class=dates v-el:dates> <div calss=dates-bg> <div class=week-row v-for="week in currentDates"> <div class=day-cell v-for="day in week" :class="{\'today\' : day.isToday,\n              \'not-cur-month\' : !day.isCurMonth}"> <p class=day-number>{{day.monthDay}}</p> </div> </div> </div> <div class=dates-events> <div class=events-week v-for="week in currentDates"> <div class=events-day v-for="day in week" track-by=$index :class="{\'today\' : day.isToday,\n              \'not-cur-month\' : !day.isCurMonth}" @click.stop="dayClick(day.date, $event)"> <p class=day-number>{{day.monthDay}}</p> <div class=event-box> <p class=event-item v-for="event in day.events" v-show="event.cellIndex <= eventLimit" :class="[classNames(event.cssClass), {\n                  \'is-start\'   : isStart(event.start, day.date),\n                  \'is-end\'     : isEnd(event.end,day.date),\n                  \'is-opacity\' : !event.isShow\n                  }]" @click=eventClick(event,$event)> {{event | isBegin day.date day.weekDay}} </p> <p v-if="day.events.length > eventLimit" class=more-link @click.stop="selectThisDay(day, $event)"> + {{day.events[day.events.length -1].cellIndex - eventLimit}} more </p> </div> </div> </div> </div> <div class=more-events v-show=showMore :style="{left: morePos.left + \'px\', top: morePos.top + \'px\'}"> <div class=more-header> <span class=title>{{selectDay.date | moreTitle }}</span> <span class=close @click.stop="showMore = false">x</span> </div> <div class=more-body> <ul class=body-list> <li v-for="event in selectDay.events" v-show=event.isShow class=body-item @click=eventClick(event,$event)> {{event.title}} </li> </ul> </div> </div> <slot name=body-card> </slot> </div> </div> '},function(e,t){e.exports=" <div class=full-calendar-header> <div class=header-left> <slot name=header-left> </slot> </div> <div class=header-center> <span class=prev-month @click.stop=goPrev>{{leftArrow}}</span> <span class=title>{{title}}</span> <span class=next-month @click.stop=goNext>{{rightArrow}}</span> </div> <div class=header-right> <slot name=header-right> </slot> </div> </div> "},function(e,t){e.exports=" <div class=comp-full-calendar> <fc-header :current-date.sync=currentDate :title-format=titleFormat> <div slot=header-right> <slot name=fc-header-right> </slot> </div> </fc-header> <fc-body :current-date=currentDate :events=events :month-names=monthNames :week-names=weekNames :first-day=firstDay> <div slot=body-card> <slot name=fc-body-card> </slot> </div> </fc-body> </div> "},function(e,t,n){var r,a;n(13),r=n(4),a=n(14),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),a&&(("function"==typeof e.exports?e.exports.options:e.exports).template=a)},function(e,t,n){var r,a;n(12),r=n(5),a=n(15),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),a&&(("function"==typeof e.exports?e.exports.options:e.exports).template=a)},function(e,t,n){var r,a;n(11),r=n(6),a=n(16),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),a&&(("function"==typeof e.exports?e.exports.options:e.exports).template=a)}])});
},{}],4:[function(require,module,exports){
var Vue // late bind
var map = Object.create(null)
var shimmed = false
var isBrowserify = false

/**
 * Determine compatibility and apply patch.
 *
 * @param {Function} vue
 * @param {Boolean} browserify
 */

exports.install = function (vue, browserify) {
  if (shimmed) return
  shimmed = true

  Vue = vue
  isBrowserify = browserify

  exports.compatible = !!Vue.internalDirectives
  if (!exports.compatible) {
    console.warn(
      '[HMR] vue-loader hot reload is only compatible with ' +
      'Vue.js 1.0.0+.'
    )
    return
  }

  // patch view directive
  patchView(Vue.internalDirectives.component)
  console.log('[HMR] Vue component hot reload shim applied.')
  // shim router-view if present
  var routerView = Vue.elementDirective('router-view')
  if (routerView) {
    patchView(routerView)
    console.log('[HMR] vue-router <router-view> hot reload shim applied.')
  }
}

/**
 * Shim the view directive (component or router-view).
 *
 * @param {Object} View
 */

function patchView (View) {
  var unbuild = View.unbuild
  View.unbuild = function (defer) {
    if (!this.hotUpdating) {
      var prevComponent = this.childVM && this.childVM.constructor
      removeView(prevComponent, this)
      // defer = true means we are transitioning to a new
      // Component. Register this new component to the list.
      if (defer) {
        addView(this.Component, this)
      }
    }
    // call original
    return unbuild.call(this, defer)
  }
}

/**
 * Add a component view to a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function addView (Component, view) {
  var id = Component && Component.options.hotID
  if (id) {
    if (!map[id]) {
      map[id] = {
        Component: Component,
        views: [],
        instances: []
      }
    }
    map[id].views.push(view)
  }
}

/**
 * Remove a component view from a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function removeView (Component, view) {
  var id = Component && Component.options.hotID
  if (id) {
    map[id].views.$remove(view)
  }
}

/**
 * Create a record for a hot module, which keeps track of its construcotr,
 * instnaces and views (component directives or router-views).
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if (typeof options === 'function') {
    options = options.options
  }
  if (typeof options.el !== 'string' && typeof options.data !== 'object') {
    makeOptionsHot(id, options)
    map[id] = {
      Component: null,
      views: [],
      instances: []
    }
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot (id, options) {
  options.hotID = id
  injectHook(options, 'created', function () {
    var record = map[id]
    if (!record.Component) {
      record.Component = this.constructor
    }
    record.instances.push(this)
  })
  injectHook(options, 'beforeDestroy', function () {
    map[id].instances.$remove(this)
  })
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook (options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook]
}

/**
 * Update a hot component.
 *
 * @param {String} id
 * @param {Object|null} newOptions
 * @param {String|null} newTemplate
 */

exports.update = function (id, newOptions, newTemplate) {
  var record = map[id]
  // force full-reload if an instance of the component is active but is not
  // managed by a view
  if (!record || (record.instances.length && !record.views.length)) {
    console.log('[HMR] Root or manually-mounted instance modified. Full reload may be required.')
    if (!isBrowserify) {
      window.location.reload()
    } else {
      // browserify-hmr somehow sends incomplete bundle if we reload here
      return
    }
  }
  if (!isBrowserify) {
    // browserify-hmr already logs this
    console.log('[HMR] Updating component: ' + format(id))
  }
  var Component = record.Component
  // update constructor
  if (newOptions) {
    // in case the user exports a constructor
    Component = record.Component = typeof newOptions === 'function'
      ? newOptions
      : Vue.extend(newOptions)
    makeOptionsHot(id, Component.options)
  }
  if (newTemplate) {
    Component.options.template = newTemplate
  }
  // handle recursive lookup
  if (Component.options.name) {
    Component.options.components[Component.options.name] = Component
  }
  // reset constructor cached linker
  Component.linker = null
  // reload all views
  record.views.forEach(function (view) {
    updateView(view, Component)
  })
  // flush devtools
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush')
  }
}

/**
 * Update a component view instance
 *
 * @param {Directive} view
 * @param {Function} Component
 */

function updateView (view, Component) {
  if (!view._bound) {
    return
  }
  view.Component = Component
  view.hotUpdating = true
  // disable transitions
  view.vm._isCompiled = false
  // save state
  var state = extractState(view.childVM)
  // remount, make sure to disable keep-alive
  var keepAlive = view.keepAlive
  view.keepAlive = false
  view.mountComponent()
  view.keepAlive = keepAlive
  // restore state
  restoreState(view.childVM, state, true)
  // re-eanble transitions
  view.vm._isCompiled = true
  view.hotUpdating = false
}

/**
 * Extract state from a Vue instance.
 *
 * @param {Vue} vm
 * @return {Object}
 */

function extractState (vm) {
  return {
    cid: vm.constructor.cid,
    data: vm.$data,
    children: vm.$children.map(extractState)
  }
}

/**
 * Restore state to a reloaded Vue instance.
 *
 * @param {Vue} vm
 * @param {Object} state
 */

function restoreState (vm, state, isRoot) {
  var oldAsyncConfig
  if (isRoot) {
    // set Vue into sync mode during state rehydration
    oldAsyncConfig = Vue.config.async
    Vue.config.async = false
  }
  // actual restore
  if (isRoot || !vm._props) {
    vm.$data = state.data
  } else {
    Object.keys(state.data).forEach(function (key) {
      if (!vm._props[key]) {
        // for non-root, only restore non-props fields
        vm.$data[key] = state.data[key]
      }
    })
  }
  // verify child consistency
  var hasSameChildren = vm.$children.every(function (c, i) {
    return state.children[i] && state.children[i].cid === c.constructor.cid
  })
  if (hasSameChildren) {
    // rehydrate children
    vm.$children.forEach(function (c, i) {
      restoreState(c, state.children[i])
    })
  }
  if (isRoot) {
    Vue.config.async = oldAsyncConfig
  }
}

function format (id) {
  var match = id.match(/[^\/]+\.vue$/)
  return match ? match[0] : id
}

},{}],5:[function(require,module,exports){
/*!
 * vue-resource v1.0.3
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */

'use strict';

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0,
            result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$1.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p = PromiseObj.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
        callback.call(this);
        return value;
    }, function (reason) {
        callback.call(this);
        return Promise.reject(reason);
    });
};

/**
 * Utility functions.
 */

var debug = false;var util = {};var slice = [].slice;


function Util (Vue) {
    util = Vue.util;
    debug = Vue.config.debug || !Vue.config.silent;
}

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}

function isBoolean(val) {
    return val === true || val === false;
}

function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

function each(obj, iterator) {

    var i, key;

    if (obj && typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }
    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

function root (options, next) {

    var url = next(options);

    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
        url = options.root + '/' + url;
    }

    return url;
}

/**
 * Query Parameter Transform.
 */

function query (options, next) {

    var urlParams = Object.keys(Url.options.params),
        query = {},
        url = next(options);

    each(options.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
}

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url),
        expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'],
        variables = [];

    return {
        vars: variables,
        expand: function (context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null,
                        values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }
                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key],
        result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

function template (options) {

    var variables = [],
        url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

/**
 * Service for URL templating.
 */

var ie = document.documentMode;
var el = document.createElement('a');

function Url(url, params) {

    var self = this || {},
        options = url,
        transform;

    if (isString(url)) {
        options = { url: url, params: params };
    }

    options = merge({}, Url.options, self.$options, options);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [],
        escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    if (ie) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options) {
        return handler.call(vm, options, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj),
        plain = isPlainObject(obj),
        hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

function xdrClient (request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(),
            handler = function (_ref) {
            var type = _ref.type;


            var status = 0;

            if (type === 'load') {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(xdr.responseText, { status: status }));
        };

        request.abort = function () {
            return xdr.abort();
        };

        xdr.open(request.method, request.getUrl());
        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
}

/**
 * CORS Interceptor.
 */

var ORIGIN_URL = Url.parse(location.href);
var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();

function cors (request, next) {

    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
        request.crossOrigin = true;
    }

    if (request.crossOrigin) {

        if (!SUPPORTS_CORS) {
            request.client = xdrClient;
        }

        delete request.emulateHTTP;
    }

    next();
}

function crossOrigin(request) {

    var requestUrl = Url.parse(Url(request));

    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
}

/**
 * Body Interceptor.
 */

function body (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');
    } else if (isObject(request.body) || isArray(request.body)) {

        if (request.emulateJSON) {
            request.body = Url.params(request.body);
            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            request.body = JSON.stringify(request.body);
        }
    }

    next(function (response) {

        Object.defineProperty(response, 'data', {
            get: function () {
                return this.body;
            },
            set: function (body) {
                this.body = body;
            }
        });

        return response.bodyText ? when(response.text(), function (text) {

            var type = response.headers.get('Content-Type');

            if (isString(type) && type.indexOf('application/json') === 0) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }
            } else {
                response.body = text;
            }

            return response;
        }) : response;
    });
}

/**
 * JSONP client.
 */

function jsonpClient (request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback',
            callback = '_jsonp' + Math.random().toString(36).substr(2),
            body = null,
            handler,
            script;

        handler = function (_ref) {
            var type = _ref.type;


            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(body, { status: status }));

            delete window[callback];
            document.body.removeChild(script);
        };

        request.params[name] = callback;

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}

/**
 * JSONP Interceptor.
 */

function jsonp (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next(function (response) {

        if (request.method == 'JSONP') {

            return when(response.json(), function (json) {

                response.body = json;

                return response;
            });
        }
    });
}

/**
 * Before Interceptor.
 */

function before (request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
}

/**
 * HTTP method override Interceptor.
 */

function method (request, next) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

    next();
}

/**
 * Header Interceptor.
 */

function header (request, next) {

    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

    next();
}

/**
 * Timeout Interceptor.
 */

function timeout (request, next) {

    var timeout;

    if (request.timeout) {
        timeout = setTimeout(function () {
            request.abort();
        }, request.timeout);
    }

    next(function (response) {

        clearTimeout(timeout);
    });
}

/**
 * XMLHttp client.
 */

function xhrClient (request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(),
            handler = function (event) {

            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
            });

            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
            });

            resolve(response);
        };

        request.abort = function () {
            return xhr.abort();
        };

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        xhr.open(request.method, request.getUrl(), true);

        if ('responseType' in xhr) {
            xhr.responseType = 'blob';
        }

        if (request.credentials === true) {
            xhr.withCredentials = true;
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onerror = handler;
        xhr.send(request.getBody());
    });
}

/**
 * Base client.
 */

function Client (context) {

    var reqHandlers = [sendRequest],
        resHandlers = [],
        handler;

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new PromiseObj(function (resolve) {

            function exec() {

                handler = reqHandlers.pop();

                if (isFunction(handler)) {
                    handler.call(context, request, next);
                } else {
                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
                    next();
                }
            }

            function next(response) {

                if (isFunction(response)) {

                    resHandlers.unshift(response);
                } else if (isObject(response)) {

                    resHandlers.forEach(function (handler) {
                        response = when(response, function (response) {
                            return handler.call(context, response) || response;
                        });
                    });

                    when(response, resolve);

                    return;
                }

                exec();
            }

            exec();
        }, context);
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
}

function sendRequest(request, resolve) {

    var client = request.client || xhrClient;

    resolve(client(request));
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * HTTP Headers.
 */

var Headers = function () {
    function Headers(headers) {
        var _this = this;

        classCallCheck(this, Headers);


        this.map = {};

        each(headers, function (value, name) {
            return _this.append(name, value);
        });
    }

    Headers.prototype.has = function has(name) {
        return getName(this.map, name) !== null;
    };

    Headers.prototype.get = function get(name) {

        var list = this.map[getName(this.map, name)];

        return list ? list[0] : null;
    };

    Headers.prototype.getAll = function getAll(name) {
        return this.map[getName(this.map, name)] || [];
    };

    Headers.prototype.set = function set(name, value) {
        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
    };

    Headers.prototype.append = function append(name, value) {

        var list = this.getAll(name);

        if (list.length) {
            list.push(trim(value));
        } else {
            this.set(name, value);
        }
    };

    Headers.prototype.delete = function _delete(name) {
        delete this.map[getName(this.map, name)];
    };

    Headers.prototype.forEach = function forEach(callback, thisArg) {
        var _this2 = this;

        each(this.map, function (list, name) {
            each(list, function (value) {
                return callback.call(thisArg, value, name, _this2);
            });
        });
    };

    return Headers;
}();

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function () {
    function Response(body, _ref) {
        var url = _ref.url;
        var headers = _ref.headers;
        var status = _ref.status;
        var statusText = _ref.statusText;
        classCallCheck(this, Response);


        this.url = url;
        this.ok = status >= 200 && status < 300;
        this.status = status || 0;
        this.statusText = statusText || '';
        this.headers = new Headers(headers);
        this.body = body;

        if (isString(body)) {

            this.bodyText = body;
        } else if (isBlob(body)) {

            this.bodyBlob = body;

            if (isBlobText(body)) {
                this.bodyText = blobText(body);
            }
        }
    }

    Response.prototype.blob = function blob() {
        return when(this.bodyBlob);
    };

    Response.prototype.text = function text() {
        return when(this.bodyText);
    };

    Response.prototype.json = function json() {
        return when(this.text(), function (text) {
            return JSON.parse(text);
        });
    };

    return Response;
}();

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };
    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function () {
    function Request(options) {
        classCallCheck(this, Request);


        this.body = null;
        this.params = {};

        assign(this, options, {
            method: toUpper(options.method || 'GET')
        });

        if (!(this.headers instanceof Headers)) {
            this.headers = new Headers(this.headers);
        }
    }

    Request.prototype.getUrl = function getUrl() {
        return Url(this);
    };

    Request.prototype.getBody = function getBody() {
        return this.body;
    };

    Request.prototype.respondWith = function respondWith(body, options) {
        return new Response(body, assign(options || {}, { url: this.getUrl() }));
    };

    return Request;
}();

/**
 * Service for sending network requests.
 */

var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

function Http(options) {

    var self = this || {},
        client = Client(self.$vm);

    defaults(options || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {
        client.use(handler);
    });

    return client(new Request(options)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);
    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    custom: CUSTOM_HEADERS,
    common: COMMON_HEADERS
};

Http.interceptors = [before, timeout, method, body, jsonp, header, cors];

['get', 'delete', 'head', 'jsonp'].forEach(function (method) {

    Http[method] = function (url, options) {
        return this(assign(options || {}, { url: url, method: method }));
    };
});

['post', 'put', 'patch'].forEach(function (method) {

    Http[method] = function (url, body, options) {
        return this(assign(options || {}, { url: url, method: method, body: body }));
    };
});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options) {

    var self = this || {},
        resource = {};

    actions = assign({}, Resource.actions, actions);

    each(actions, function (action, name) {

        action = merge({ url: url, params: assign({}, params) }, options, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options = assign({}, action),
        params = {},
        body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
    }

    options.body = body;
    options.params = assign({}, options.params, params);

    return options;
}

Resource.actions = {

    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET' },
    update: { method: 'PUT' },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' }

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function () {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function () {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function () {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function () {
                var _this = this;

                return function (executor) {
                    return new Vue.Promise(executor, _this);
                };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;
},{}],6:[function(require,module,exports){
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};!function(e,t){"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))&&"object"==(typeof module==="undefined"?"undefined":_typeof(module))?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?exports.VueStrap=t():e.VueStrap=t();}(undefined,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports;}var n={};return t.m=e,t.c=n,t.p="",t(0);}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}var i=n(27),r=o(i),a=n(93),s=o(a),l=n(97),c=o(l),u=n(100),p=o(u),d=n(107),f=o(d),h=n(112),v=o(h),b=n(115),m=o(b),y=n(120),g=o(y),x=n(125),w=o(x),_=n(130),k=o(_),S=n(135),M=o(S),O=n(138),$=o(O),D=n(143),j=o(D),C=n(152),N=o(C),B=n(155),L=o(B),E=n(158),A=o(E),T=n(163),P=o(T),R=n(169),V=o(R),z=n(172),I=o(z),W=n(177),F=o(W),Y=n(197),X=o(Y),H=n(200),G=o(H),q=n(205),U=o(q),J=n(208),Z=o(J),K=n(213),Q=o(K),ee=n(218),te=o(ee),ne=n(223),oe=o(ne),ie={$:r.default,accordion:s.default,affix:c.default,alert:p.default,aside:f.default,buttonGroup:v.default,carousel:m.default,checkbox:g.default,datepicker:w.default,dropdown:k.default,formGroup:M.default,input:$.default,modal:j.default,navbar:N.default,option:L.default,panel:A.default,popover:P.default,progressbar:V.default,radio:I.default,select:F.default,slider:X.default,spinner:G.default,tab:U.default,tabGroup:Z.default,tabset:Q.default,tooltip:te.default,typeahead:oe.default};e.exports=ie;},,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}function i(e){return e instanceof window.Node;}function r(e){return e instanceof window.NodeList||e instanceof O||e instanceof window.HTMLCollection||e instanceof Array;}function a(e,t){var n=[];return w.forEach.call(e,function(o){if(i(o))~n.indexOf(o)||n.push(o);else if(r(o))for(var a in o){n.push(o[a]);}else if(null!==o)return e.get=$.get,e.set=$.set,e.call=$.call,e.owner=t,e;}),l(n,t);}function s(e){var t=this;$[e]||(D[e]instanceof Function?$[e]=function(){for(var n=arguments.length,o=Array(n),i=0;i<n;i++){o[i]=arguments[i];}var r=[],s=!0;return(0,b.default)($).forEach(function(t){$[t]&&$[t][e]instanceof Function?($[t]=$[t][e].apply($[t],o),r.push($[t]),s&&void 0!==$[t]&&(s=!1)):r.push(void 0);}),s?t:a(r,t);}:(0,u.default)($,e,{get:function get(){var t=[];return this.each(function(n){null!==n&&(n=n[e]),t.push(n);}),a(t,this);},set:function set(t){this.each(function(n){n&&e in n&&(n[e]=t);});}}));}function l(){return new O(arguments);}Object.defineProperty(t,"__esModule",{value:!0});var c=n(28),u=o(c),p=n(46),d=o(p),f=n(82),h=o(f),v=n(88),b=o(v),m=n(91),y=o(m),g=n(92),x=o(g),w=Array.prototype,_=new Error("Passed arguments must be of Node"),k=void 0,S=[],M=[],O=function(){function e(t){(0,y.default)(this,e);var n=t;if(t[0]===window?n=[window]:"string"==typeof t[0]?(n=(t[1]||document).querySelectorAll(t[0]),t[1]&&(this.owner=t[1])):0 in t&&!i(t[0])&&t[0]&&"length"in t[0]&&(n=t[0],t[1]&&(this.owner=t[1])),n){for(var o in n){this[o]=n[o];}this.length=n.length;}else this.length=0;}return(0,x.default)(e,[{key:"concat",value:function value(){function e(n){w.forEach.call(n,function(n){i(n)?~t.indexOf(n)||t.push(n):n&&e(n);});}var t=w.slice.call(this);return w.forEach.call(arguments,function(n){if(i(n))~t.indexOf(n)||t.push(n);else{if(!r(n))throw Error("Concat arguments must be of a Node, NodeList, HTMLCollection, or Array of (Node, NodeList, HTMLCollection, Array)");e(n);}}),l(t,this);}},{key:"delete",value:function value(){var e=a(this).filter(function(e){return e.remove?e.remove():e.parentNode&&e.parentNode.removeChild(e),document.body.contains(e);});return e.length&&console.warn("NodeList: Some nodes could not be deleted."),e;}},{key:"each",value:function value(){return w.forEach.apply(this,arguments),this;}},{key:"filter",value:function value(){return l(w.filter.apply(this,arguments),this);}},{key:"find",value:function value(e){var t=[];return a(this).forEach(function(n){w.push.apply(t,n.querySelectorAll(e));}),a(t,this.owner);}},{key:"findChildren",value:function value(e){var t=this;return e?this.find(e).filter(function(e){return t.includes(e.parentElement);}):a(this.map(function(e){return e.children;}));}},{key:"forEach",value:function value(){return w.forEach.apply(this,arguments),this;}},{key:"includes",value:function value(e,t){return~this.indexOf(e,t);}},{key:"map",value:function value(){var e=w.map.apply(this,arguments);return e.some(function(e){return i(e)||r(e);})?a(e,this):e;}},{key:"parent",value:function value(){return a(this.map(function(e){return e.parentNode;}),this);}},{key:"pop",value:function e(t){"number"!=typeof t&&(t=1);for(var n=[],e=w.pop.bind(this);t--;){n.push(e());}return l(n,this);}},{key:"push",value:function value(){var e=this;return w.forEach.call(arguments,function(t){if(!i(t))throw _;~e.indexOf(t)||w.push.call(e,t);}),this;}},{key:"shift",value:function value(e){"number"!=typeof e&&(e=1);for(var t=[];e--;){t.push(w.shift.call(this));}return l(t,this);}},{key:"slice",value:function value(){return l(w.slice.apply(this,arguments),this);}},{key:"splice",value:function value(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++){t[n]=arguments[n];}for(var o=2,r=t.length;o<r;o++){if(!i(t[o]))throw _;}return w.splice.apply(this,t),this;}},{key:"unshift",value:function e(){for(var t=this,e=w.unshift.bind(this),n=arguments.length,o=Array(n),r=0;r<n;r++){o[r]=arguments[r];}return w.forEach.call(o,function(n){if(!i(n))throw _;~t.indexOf(n)||e(n);}),this;}},{key:"addClass",value:function value(e){return this.toggleClass(e,!0);}},{key:"removeClass",value:function value(e){return this.toggleClass(e,!1);}},{key:"toggleClass",value:function value(e,t){var n=void 0===t||null===t?"toggle":t?"add":"remove";return"string"==typeof e&&(e=e.trim().replace(/\s+/," ").split(" ")),this.each(function(t){return e.forEach(function(e){return t.classList[n](e);});}),this;}},{key:"get",value:function value(e){var t=[];return this.each(function(n){null!==n&&(n=n[e]),t.push(n);}),a(t,this);}},{key:"set",value:function value(e,t){return e.constructor===Object?this.each(function(t){t&&(0,b.default)(e).forEach(function(n){n in t&&(t[n]=e[n]);});}):this.each(function(n){e in n&&(n[e]=t);}),this;}},{key:"call",value:function value(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++){t[n]=arguments[n];}var o=w.shift.call(t),i=[],r=!0;return this.each(function(e){e&&e[o]instanceof Function?(e=e[o].apply(e,t),i.push(e),r&&void 0!==e&&(r=!1)):i.push(void 0);}),r?this:a(i,this);}},{key:"item",value:function value(e){return l([this[e]],this);}},{key:"on",value:function value(e,t,n){if("string"==typeof e&&(e=e.trim().replace(/\s+/," ").split(" ")),!this||!this.length)return this;if(void 0===n&&(n=t,t=null),!n)return this;var o=n;return n=t?function(e){var n=l(t,this);n.length&&n.some(function(t){var n=t.contains(e.target);return n&&o.call(t,e,t),n;});}:function(e){o.apply(this,[e,this]);},this.each(function(t){e.forEach(function(e){(t===window||i(t))&&(t.addEventListener(e,n,!1),M.push({el:t,event:e,callback:n}));});}),this;}},{key:"off",value:function value(e,t){return e instanceof Function&&(t=e,e=null),"string"==typeof e&&t instanceof Function?this.each(function(n){e.split(" ").forEach(function(e){M.forEach(function(o){M[o]&&M[o].el===n&&M[o].event===e&&M[o].callback===t&&(M[o].el.removeEventListener(M[o].event,M[o].callback),delete M[o]);});});}):"string"==typeof e?this.each(function(t){e.split(" ").forEach(function(e){M.forEach(function(n){M[n]&&M[n].el===t&&M[n].event===e&&(M[n].el.removeEventListener(M[n].event,M[n].callback),delete M[n]);});});}):t instanceof Function?this.each(function(e){M.forEach(function(n){M[n]&&M[n].el===e&&M[n].callback===t&&(M[n].el.removeEventListener(M[n].event,M[n].callback),delete M[n]);});}):this.each(function(e){M.forEach(function(t){M[t]&&M[t].el===e&&(M[t].el.removeEventListener(M[t].event,M[t].callback),delete M[t]);});}),M=M.filter(function(e){return void 0!==e;}),this;}},{key:"onBlur",value:function value(e){return this&&this.length&&e?(this.each(function(t){S.push({el:t,callback:e});}),k||(k=function k(e){S.forEach(function(t){var n=t.el.contains(e.target)||t.el===e.target;n||t.callback.call(t.el,e,t.el);});},document.addEventListener("click",k,!1),document.addEventListener("touchstart",k,!1)),this):this;}},{key:"offBlur",value:function value(e){return this.each(function(t){S=S.filter(function(n){return!(n&&n.el===t&&(!e||n.callback===e))&&t;});}),this;}},{key:"asArray",get:function get(){return w.slice.call(this);}}]),e;}(),$=O.prototype;(0,h.default)(w).forEach(function(e){"join"!==e&&"copyWithin"!==e&&"fill"!==e&&void 0===$[e]&&($[e]=w[e]);}),window.Symbol&&d.default&&($[d.default]=$.values=w[d.default]);var D=document.createElement("div");for(var j in D){s(j);}window.NL=l,t.default=l;},function(e,t,n){e.exports={default:n(29),__esModule:!0};},function(e,t,n){n(30);var o=n(33).Object;e.exports=function(e,t,n){return o.defineProperty(e,t,n);};},function(e,t,n){var o=n(31);o(o.S+o.F*!n(41),"Object",{defineProperty:n(37).f});},function(e,t,n){var o=n(32),i=n(33),r=n(34),a=n(36),s="prototype",l=function l(e,t,n){var c,u,p,d=e&l.F,f=e&l.G,h=e&l.S,v=e&l.P,b=e&l.B,m=e&l.W,y=f?i:i[t]||(i[t]={}),g=y[s],x=f?o:h?o[t]:(o[t]||{})[s];f&&(n=t);for(c in n){u=!d&&x&&void 0!==x[c],u&&c in y||(p=u?x[c]:n[c],y[c]=f&&"function"!=typeof x[c]?n[c]:b&&u?r(p,o):m&&x[c]==p?function(e){var t=function t(_t,n,o){if(this instanceof e){switch(arguments.length){case 0:return new e();case 1:return new e(_t);case 2:return new e(_t,n);}return new e(_t,n,o);}return e.apply(this,arguments);};return t[s]=e[s],t;}(p):v&&"function"==typeof p?r(Function.call,p):p,v&&((y.virtual||(y.virtual={}))[c]=p,e&l.R&&g&&!g[c]&&a(g,c,p)));}};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,e.exports=l;},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n);},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n);},function(e,t,n){var o=n(35);e.exports=function(e,t,n){if(o(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n);};case 2:return function(n,o){return e.call(t,n,o);};case 3:return function(n,o,i){return e.call(t,n,o,i);};}return function(){return e.apply(t,arguments);};};},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e;};},function(e,t,n){var o=n(37),i=n(45);e.exports=n(41)?function(e,t,n){return o.f(e,t,i(1,n));}:function(e,t,n){return e[t]=n,e;};},function(e,t,n){var o=n(38),i=n(40),r=n(44),a=Object.defineProperty;t.f=n(41)?Object.defineProperty:function(e,t,n){if(o(e),t=r(t,!0),o(n),i)try{return a(e,t,n);}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e;};},function(e,t,n){var o=n(39);e.exports=function(e){if(!o(e))throw TypeError(e+" is not an object!");return e;};},function(e,t){e.exports=function(e){return"object"==(typeof e==="undefined"?"undefined":_typeof(e))?null!==e:"function"==typeof e;};},function(e,t,n){e.exports=!n(41)&&!n(42)(function(){return 7!=Object.defineProperty(n(43)("div"),"a",{get:function get(){return 7;}}).a;});},function(e,t,n){e.exports=!n(42)(function(){return 7!=Object.defineProperty({},"a",{get:function get(){return 7;}}).a;});},function(e,t){e.exports=function(e){try{return!!e();}catch(e){return!0;}};},function(e,t,n){var o=n(39),i=n(32).document,r=o(i)&&o(i.createElement);e.exports=function(e){return r?i.createElement(e):{};};},function(e,t,n){var o=n(39);e.exports=function(e,t){if(!o(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!o(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!o(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!o(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value");};},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t};};},function(e,t,n){e.exports={default:n(47),__esModule:!0};},function(e,t,n){n(48),n(77),e.exports=n(81).f("iterator");},function(e,t,n){"use strict";var o=n(49)(!0);n(52)(String,"String",function(e){this._t=String(e),this._i=0;},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=o(t,n),this._i+=e.length,{value:e,done:!1});});},function(e,t,n){var o=n(50),i=n(51);e.exports=function(e){return function(t,n){var r,a,s=String(i(t)),l=o(n),c=s.length;return l<0||l>=c?e?"":void 0:(r=s.charCodeAt(l),r<55296||r>56319||l+1===c||(a=s.charCodeAt(l+1))<56320||a>57343?e?s.charAt(l):r:e?s.slice(l,l+2):(r-55296<<10)+(a-56320)+65536);};};},function(e,t){var n=Math.ceil,o=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?o:n)(e);};},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e;};},function(e,t,n){"use strict";var o=n(53),i=n(31),r=n(54),a=n(36),s=n(55),l=n(56),c=n(57),u=n(73),p=n(75),d=n(74)("iterator"),f=!([].keys&&"next"in[].keys()),h="@@iterator",v="keys",b="values",m=function m(){return this;};e.exports=function(e,t,n,y,g,x,w){c(n,t,y);var _,k,S,M=function M(e){if(!f&&e in j)return j[e];switch(e){case v:return function(){return new n(this,e);};case b:return function(){return new n(this,e);};}return function(){return new n(this,e);};},O=t+" Iterator",$=g==b,D=!1,j=e.prototype,C=j[d]||j[h]||g&&j[g],N=C||M(g),B=g?$?M("entries"):N:void 0,L="Array"==t?j.entries||C:C;if(L&&(S=p(L.call(new e())),S!==Object.prototype&&(u(S,O,!0),o||s(S,d)||a(S,d,m))),$&&C&&C.name!==b&&(D=!0,N=function N(){return C.call(this);}),o&&!w||!f&&!D&&j[d]||a(j,d,N),l[t]=N,l[O]=m,g)if(_={values:$?N:M(b),keys:x?N:M(v),entries:B},w)for(k in _){k in j||r(j,k,_[k]);}else i(i.P+i.F*(f||D),t,_);return _;};},function(e,t){e.exports=!0;},function(e,t,n){e.exports=n(36);},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t);};},function(e,t){e.exports={};},function(e,t,n){"use strict";var o=n(58),i=n(45),r=n(73),a={};n(36)(a,n(74)("iterator"),function(){return this;}),e.exports=function(e,t,n){e.prototype=o(a,{next:i(1,n)}),r(e,t+" Iterator");};},function(e,t,n){var o=n(38),i=n(59),r=n(71),a=n(68)("IE_PROTO"),s=function s(){},l="prototype",_c=function c(){var e,t=n(43)("iframe"),o=r.length,i="<",a=">";for(t.style.display="none",n(72).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(i+"script"+a+"document.F=Object"+i+"/script"+a),e.close(),_c=e.F;o--;){delete _c[l][r[o]];}return _c();};e.exports=Object.create||function(e,t){var n;return null!==e?(s[l]=o(e),n=new s(),s[l]=null,n[a]=e):n=_c(),void 0===t?n:i(n,t);};},function(e,t,n){var o=n(37),i=n(38),r=n(60);e.exports=n(41)?Object.defineProperties:function(e,t){i(e);for(var n,a=r(t),s=a.length,l=0;s>l;){o.f(e,n=a[l++],t[n]);}return e;};},function(e,t,n){var o=n(61),i=n(71);e.exports=Object.keys||function(e){return o(e,i);};},function(e,t,n){var o=n(55),i=n(62),r=n(65)(!1),a=n(68)("IE_PROTO");e.exports=function(e,t){var n,s=i(e),l=0,c=[];for(n in s){n!=a&&o(s,n)&&c.push(n);}for(;t.length>l;){o(s,n=t[l++])&&(~r(c,n)||c.push(n));}return c;};},function(e,t,n){var o=n(63),i=n(51);e.exports=function(e){return o(i(e));};},function(e,t,n){var o=n(64);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==o(e)?e.split(""):Object(e);};},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1);};},function(e,t,n){var o=n(62),i=n(66),r=n(67);e.exports=function(e){return function(t,n,a){var s,l=o(t),c=i(l.length),u=r(a,c);if(e&&n!=n){for(;c>u;){if(s=l[u++],s!=s)return!0;}}else for(;c>u;u++){if((e||u in l)&&l[u]===n)return e||u||0;}return!e&&-1;};};},function(e,t,n){var o=n(50),i=Math.min;e.exports=function(e){return e>0?i(o(e),9007199254740991):0;};},function(e,t,n){var o=n(50),i=Math.max,r=Math.min;e.exports=function(e,t){return e=o(e),e<0?i(e+t,0):r(e,t);};},function(e,t,n){var o=n(69)("keys"),i=n(70);e.exports=function(e){return o[e]||(o[e]=i(e));};},function(e,t,n){var o=n(32),i="__core-js_shared__",r=o[i]||(o[i]={});e.exports=function(e){return r[e]||(r[e]={});};},function(e,t){var n=0,o=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+o).toString(36));};},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");},function(e,t,n){e.exports=n(32).document&&document.documentElement;},function(e,t,n){var o=n(37).f,i=n(55),r=n(74)("toStringTag");e.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,r)&&o(e,r,{configurable:!0,value:t});};},function(e,t,n){var o=n(69)("wks"),i=n(70),r=n(32).Symbol,a="function"==typeof r,s=e.exports=function(e){return o[e]||(o[e]=a&&r[e]||(a?r:i)("Symbol."+e));};s.store=o;},function(e,t,n){var o=n(55),i=n(76),r=n(68)("IE_PROTO"),a=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=i(e),o(e,r)?e[r]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null;};},function(e,t,n){var o=n(51);e.exports=function(e){return Object(o(e));};},function(e,t,n){n(78);for(var o=n(32),i=n(36),r=n(56),a=n(74)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],l=0;l<5;l++){var c=s[l],u=o[c],p=u&&u.prototype;p&&!p[a]&&i(p,a,c),r[c]=r.Array;}},function(e,t,n){"use strict";var o=n(79),i=n(80),r=n(56),a=n(62);e.exports=n(52)(Array,"Array",function(e,t){this._t=a(e),this._i=0,this._k=t;},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,n):"values"==t?i(0,e[n]):i(0,[n,e[n]]);},"values"),r.Arguments=r.Array,o("keys"),o("values"),o("entries");},function(e,t){e.exports=function(){};},function(e,t){e.exports=function(e,t){return{value:t,done:!!e};};},function(e,t,n){t.f=n(74);},function(e,t,n){e.exports={default:n(83),__esModule:!0};},function(e,t,n){n(84);var o=n(33).Object;e.exports=function(e){return o.getOwnPropertyNames(e);};},function(e,t,n){n(85)("getOwnPropertyNames",function(){return n(86).f;});},function(e,t,n){var o=n(31),i=n(33),r=n(42);e.exports=function(e,t){var n=(i.Object||{})[e]||Object[e],a={};a[e]=t(n),o(o.S+o.F*r(function(){n(1);}),"Object",a);};},function(e,t,n){var o=n(62),i=n(87).f,r={}.toString,a="object"==(typeof window==="undefined"?"undefined":_typeof(window))&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function s(e){try{return i(e);}catch(e){return a.slice();}};e.exports.f=function(e){return a&&"[object Window]"==r.call(e)?s(e):i(o(e));};},function(e,t,n){var o=n(61),i=n(71).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return o(e,i);};},function(e,t,n){e.exports={default:n(89),__esModule:!0};},function(e,t,n){n(90),e.exports=n(33).Object.keys;},function(e,t,n){var o=n(76),i=n(60);n(85)("keys",function(){return function(e){return i(o(e));};});},function(e,t){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");};},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}t.__esModule=!0;var i=n(28),r=o(i);t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,r.default)(e,o.key,o);}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t;};}();},function(e,t,n){e.exports=n(94),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(96);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{type:{type:String,default:null},oneAtAtime:{type:Boolean,coerce:o.coerce.boolean,default:!1}},created:function created(){var e=this;this._isAccordion=!0,this.$on("isOpenEvent",function(t){e.oneAtAtime&&e.$children.forEach(function(e){t!==e&&(e.isOpen=!1);});});}};},function(e,t){"use strict";function n(e){var t=new window.XMLHttpRequest(),n={},o={then:function then(e,t){return o.done(e).fail(t);},catch:function _catch(e){return o.fail(e);},always:function always(e){return o.done(e).fail(e);}};return["done","fail"].forEach(function(e){n[e]=[],o[e]=function(t){return t instanceof Function&&n[e].push(t),o;};}),o.done(JSON.parse),t.onreadystatechange=function(){if(4===t.readyState){var e,o,i;!function(){var r={status:t.status};if(200===t.status)try{e=t.responseText;for(o in n.done){i=n.done[o](e),void 0!==i&&(e=i);}}catch(e){n.fail.forEach(function(t){return t(e);});}else n.fail.forEach(function(e){return e(r);});}();}},t.open("GET",e),t.setRequestHeader("Accept","application/json"),t.send(),o;}function o(){if(document.documentElement.scrollHeight<=document.documentElement.clientHeight)return 0;var e=document.createElement("p");e.style.width="100%",e.style.height="200px";var t=document.createElement("div");t.style.position="absolute",t.style.top="0px",t.style.left="0px",t.style.visibility="hidden",t.style.width="200px",t.style.height="150px",t.style.overflow="hidden",t.appendChild(e),document.body.appendChild(t);var n=e.offsetWidth;t.style.overflow="scroll";var o=e.offsetWidth;return n===o&&(o=t.clientWidth),document.body.removeChild(t),n-o;}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"en",t={daysOfWeek:["Su","Mo","Tu","We","Th","Fr","Sa"],limit:"Limit reached ({{limit}} items max).",loading:"Loading...",minLength:"Min. Length",months:["January","February","March","April","May","June","July","August","September","October","November","December"],notSelected:"Nothing Selected",required:"Required",search:"Search"};return window.VueStrapLang?window.VueStrapLang(e):t;}function r(e,t){function n(e){return /^[0-9]+$/.test(e)?Number(e)||1:null;}var o,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100;return function(){for(var r=this,a=arguments.length,s=Array(a),l=0;l<a;l++){s[l]=arguments[l];}o&&clearTimeout(o),o=setTimeout(function(){e.apply(r,s);},n(t)||n(this[t])||i);};}function a(e){var t=!window.Vue||!window.Vue.partial,n={computed:{vue2:function vue2(){return!this.$dispatch;}}};return t?(e.beforeCompile&&(e.beforeMount=e.beforeCompile,delete e.beforeCompile),e.compiled&&(n.compiled=e.compiled,delete e.compiled),e.ready&&(e.mounted=e.ready,delete e.ready)):(e.beforeCreate&&(n.create=e.beforeCreate,delete e.beforeCreate),e.beforeMount&&(e.beforeCompile=e.beforeMount,delete e.beforeMount),e.mounted&&(e.ready=e.mounted,delete e.mounted)),e.mixins||(e.mixins=[]),e.mixins.unshift(n),e;}Object.defineProperty(t,"__esModule",{value:!0}),t.getJSON=n,t.getScrollBarWidth=o,t.translations=i,t.delayer=r,t.VueFixer=a;t.coerce={boolean:function boolean(e){return"string"==typeof e?""===e||"true"===e||"false"!==e&&"null"!==e&&"undefined"!==e&&e:e;},number:function number(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return"number"==typeof e?e:void 0===e||null===e||isNaN(Number(e))?t:Number(e);},string:function string(e){return void 0===e||null===e?"":e+"";},pattern:function pattern(e){return e instanceof Function||e instanceof RegExp?e:"string"==typeof e?new RegExp(e):null;}};},function(e,t){e.exports="<div class=panel-group> <slot></slot> </div>";},function(e,t,n){e.exports=n(98),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(99);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(27),a=o(r);t.default={props:{offset:{type:Number,coerce:i.coerce.number,default:0}},data:function data(){return{affixed:!1};},computed:{top:function top(){return this.offset>0?this.offset+"px":null;}},methods:{checkScroll:function checkScroll(){var e=this;if(this.$el.offsetWidth||this.$el.offsetHeight||this.$el.getClientRects().length){var t={},n={},o=this.$el.getBoundingClientRect(),i=document.body;["Top","Left"].forEach(function(r){var a=r.toLowerCase(),s=window["page"+("Top"===r?"Y":"X")+"Offset"],l="scroll"+r;"number"!=typeof s&&(s=document.documentElement[l],"number"!=typeof s&&(s=document.body[l])),t[a]=s,n[a]=t[a]+o[a]-(e.$el["client"+r]||i["client"+r]||0);});var r=t.top>n.top-this.offset;this.affixed!==r&&(this.affixed=r);}}},ready:function ready(){var e=this;(0,a.default)(window).on("scroll resize",function(){return e.checkScroll();}),setTimeout(function(){return e.checkScroll();},0);},beforeDestroy:function beforeDestroy(){var e=this;(0,a.default)(window).off("scroll resize",function(){return e.checkScroll();});}};},function(e,t){e.exports='<div class="hidden-print hidden-xs hidden-sm"> <nav class=bs-docs-sidebar :class={affix:affixed} :style={marginTop:top}> <slot></slot> </nav> </div>';},function(e,t,n){n(101),e.exports=n(105),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(106);},function(e,t,n){var o=n(102);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".fade-transition{-webkit-transition:opacity .3s ease;transition:opacity .3s ease}.fade-enter,.fade-leave{height:0;opacity:0}.alert.top{margin:0 auto;left:0;right:0}.alert.top,.alert.top-right{position:fixed;top:30px;z-index:1050}.alert.top-right{right:50px}",""]);},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1]);}return e.join("");},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0);}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a));}},e;};},function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],i=f[o.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++){i.parts[r](o.parts[r]);}for(;r<o.parts.length;r++){i.parts.push(c(o.parts[r],t));}}else{for(var a=[],r=0;r<o.parts.length;r++){a.push(c(o.parts[r],t));}f[o.id]={id:o.id,refs:1,parts:a};}}}function i(e){for(var t=[],n={},o=0;o<e.length;o++){var i=e[o],r=i[0],a=i[1],s=i[2],l=i[3],c={css:a,media:s,sourceMap:l};n[r]?n[r].parts.push(c):t.push(n[r]={id:r,parts:[c]});}return t;}function r(e,t){var n=b(),o=g[g.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),g.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t);}}function a(e){e.parentNode.removeChild(e);var t=g.indexOf(e);t>=0&&g.splice(t,1);}function s(e){var t=document.createElement("style");return t.type="text/css",r(e,t),t;}function l(e){var t=document.createElement("link");return t.rel="stylesheet",r(e,t),t;}function c(e,t){var n,o,i;if(t.singleton){var r=y++;n=m||(m=s(t)),o=u.bind(null,n,r,!1),i=u.bind(null,n,r,!0);}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),o=d.bind(null,n),i=function i(){a(n),n.href&&URL.revokeObjectURL(n.href);}):(n=s(t),o=p.bind(null,n),i=function i(){a(n);});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t);}else i();};}function u(e,t,n,o){var i=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=x(t,i);else{var r=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r);}}function p(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;){e.removeChild(e.firstChild);}e.appendChild(document.createTextNode(n));}}function d(e,t){var n=t.css,o=t.sourceMap;o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([n],{type:"text/css"}),r=e.href;e.href=URL.createObjectURL(i),r&&URL.revokeObjectURL(r);}var f={},h=function h(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t;};},v=h(function(){return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());}),b=h(function(){return document.head||document.getElementsByTagName("head")[0];}),m=null,y=0,g=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=v()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return o(n,t),function(e){for(var r=[],a=0;a<n.length;a++){var s=n[a],l=f[s.id];l.refs--,r.push(l);}if(e){var c=i(e);o(c,t);}for(var a=0;a<r.length;a++){var l=r[a];if(0===l.refs){for(var u=0;u<l.parts.length;u++){l.parts[u]();}delete f[l.id];}}};};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n");};}();},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{type:{type:String},dismissable:{type:Boolean,coerce:o.coerce.boolean,default:!1},show:{type:Boolean,coerce:o.coerce.boolean,default:!0,twoWay:!0},duration:{type:Number,coerce:o.coerce.number,default:0},width:{type:String},placement:{type:String}},watch:{show:function show(e){var t=this;this._timeout&&clearTimeout(this._timeout),e&&Boolean(this.duration)&&(this._timeout=setTimeout(function(){t.show=!1;},this.duration));}}};},function(e,t){e.exports="<div v-show=show v-bind:class=\"{\r\n      'alert':\t\ttrue,\r\n      'alert-success':(type == 'success'),\r\n      'alert-warning':(type == 'warning'),\r\n      'alert-info':\t(type == 'info'),\r\n      'alert-danger':\t(type == 'danger'),\r\n      'top': \t\t\t(placement === 'top'),\r\n      'top-right': \t(placement === 'top-right')\r\n    }\" transition=fade v-bind:style={width:width} role=alert> <button v-show=dismissable type=button class=close @click=\"show = false\"> <span>&times;</span> </button> <slot></slot> </div>";},function(e,t,n){n(108),e.exports=n(110),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(111);},function(e,t,n){var o=n(109);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".aside-open{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.aside-open.has-push-right{-webkit-transform:translateX(-300px);transform:translateX(-300px)}.aside{position:fixed;top:0;bottom:0;z-index:1049;overflow:auto;background:#fff}.aside.left{left:0;right:auto}.aside.right{left:auto;right:0}.slideleft-enter{-webkit-animation:slideleft-in .3s;animation:slideleft-in .3s}.slideleft-leave{-webkit-animation:slideleft-out .3s;animation:slideleft-out .3s}@-webkit-keyframes slideleft-in{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes slideleft-in{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes slideleft-out{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}}@keyframes slideleft-out{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}}.slideright-enter{-webkit-animation:slideright-in .3s;animation:slideright-in .3s}.slideright-leave{-webkit-animation:slideright-out .3s;animation:slideright-out .3s}@-webkit-keyframes slideright-in{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes slideright-in{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes slideright-out{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}}@keyframes slideright-out{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}}.aside:focus{outline:0}@media (max-width:991px){.aside{min-width:240px}}.aside.left{right:auto;left:0}.aside.right{right:0;left:auto}.aside .aside-dialog .aside-header{border-bottom:1px solid #e5e5e5;min-height:16.43px;padding:6px 15px;background:#337ab7;color:#fff}.aside .aside-dialog .aside-header .close{margin-right:-8px;padding:4px 8px;color:#fff;font-size:25px;opacity:.8}.aside .aside-dialog .aside-body{position:relative;padding:15px}.aside .aside-dialog .aside-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}.aside .aside-dialog .aside-footer .btn+.btn{margin-left:5px;margin-bottom:0}.aside .aside-dialog .aside-footer .btn-group .btn+.btn{margin-left:-1px}.aside .aside-dialog .aside-footer .btn-block+.btn-block{margin-left:0}.aside-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;opacity:0;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;background-color:#000}.aside-backdrop.in{opacity:.5;filter:alpha(opacity=50)}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(27),a=o(r);t.default={props:{show:{type:Boolean,coerce:i.coerce.boolean,required:!0,twoWay:!0},placement:{type:String,default:"right"},header:{type:String},width:{type:Number,coerce:i.coerce.number,default:320}},watch:{show:function show(e){var t=this,n=document.body,o=(0,i.getScrollBarWidth)();if(e){this._backdrop||(this._backdrop=document.createElement("div")),this._backdrop.className="aside-backdrop",n.appendChild(this._backdrop),n.classList.add("modal-open"),0!==o&&(n.style.paddingRight=o+"px");this._backdrop.clientHeight;this._backdrop.classList.add("in"),(0,a.default)(this._backdrop).on("click",function(){return t.close();});}else(0,a.default)(this._backdrop).on("transitionend",function(){(0,a.default)(t._backdrop).off();try{n.classList.remove("modal-open"),n.style.paddingRight="0",n.removeChild(t._backdrop),t._backdrop=null;}catch(e){}}),this._backdrop.className="aside-backdrop";}},methods:{close:function close(){this.show=!1;}}};},function(e,t){e.exports="<div class=aside v-bind:style=\"{width:width + 'px'}\" v-bind:class=\"{\r\n    left:placement === 'left',\r\n    right:placement === 'right'\r\n    }\" v-show=show :transition=\"(this.placement === 'left') ? 'slideleft' : 'slideright'\"> <div class=aside-dialog> <div class=aside-content> <div class=aside-header> <button type=button class=close @click=close><span>&times;</span></button> <h4 class=aside-title> <slot name=header> {{ header }} </slot> </h4> </div> <div class=aside-body> <slot></slot> </div> </div> </div> </div>";},function(e,t,n){e.exports=n(113),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(114);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{value:null,buttons:{type:Boolean,coerce:o.coerce.boolean,default:!0},justified:{type:Boolean,coerce:o.coerce.boolean,default:!1},type:{type:String,default:"default"},vertical:{type:Boolean,coerce:o.coerce.boolean,default:!1}},watch:{value:{deep:!0,handler:function handler(e){this.$children.forEach(function(e){e.group&&e.eval&&e.eval();});}}},created:function created(){this._btnGroup=!0;}};},function(e,t){e.exports="<div :class=\"{'btn-group':buttons,'btn-group-justified':justified,'btn-group-vertical':vertical}\" :data-toggle=\"buttons&&'buttons'\"> <slot></slot> </div>";},function(e,t,n){n(116),e.exports=n(118),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(119);},function(e,t,n){var o=n(117);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".carousel-control[_v-5afe80ab]{cursor:pointer}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(27),a=o(r);t.default={props:{indicators:{type:Boolean,coerce:i.coerce.boolean,default:!0},controls:{type:Boolean,coerce:i.coerce.boolean,default:!0},interval:{type:Number,coerce:i.coerce.number,default:5e3}},data:function data(){return{indicator:[],index:0,isAnimating:!1};},watch:{index:function index(e,t){this.slide(e>t?"left":"right",e,t);}},methods:{indicatorClick:function indicatorClick(e){return!this.isAnimating&&this.index!==e&&(this.isAnimating=!0,void(this.index=e));},slide:function slide(e,t,n){var o=this;if(this.$el){var i=(0,a.default)(".item",this.$el);if(i.length){var r=i[t]||i[0];(0,a.default)(r).addClass("left"===e?"next":"prev");r.clientHeight;(0,a.default)([i[n],r]).addClass(e).on("transitionend",function(){i.off("transitionend").className="item",(0,a.default)(r).addClass("active"),o.isAnimating=!1;});}}},next:function next(){return!(!this.$el||this.isAnimating)&&(this.isAnimating=!0,void(this.index+1<(0,a.default)(".item",this.$el).length?this.index+=1:this.index=0));},prev:function prev(){return!(!this.$el||this.isAnimating)&&(this.isAnimating=!0,void(0===this.index?this.index=(0,a.default)(".item",this.$el).length-1:this.index-=1));},toggleInterval:function toggleInterval(e){void 0===e&&(e=this._intervalID),this._intervalID&&(clearInterval(this._intervalID),delete this._intervalID),e&&this.interval>0&&(this._intervalID=setInterval(this.next,this.interval));}},ready:function ready(){var e=this;this.toggleInterval(!0),(0,a.default)(this.$el).on("mouseenter",function(){return e.toggleInterval(!1);}).on("mouseleave",function(){return e.toggleInterval(!0);});},beforeDestroy:function beforeDestroy(){this.toggleInterval(!1),(0,a.default)(this.$el).off("mouseenter mouseleave");}};},function(e,t){e.exports='<div class="carousel slide" data-ride=carousel _v-5afe80ab=""> <ol class=carousel-indicators v-show=indicators _v-5afe80ab=""> <li v-for="i in indicator" @click=indicatorClick($index) v-bind:class="{active:$index === index}" _v-5afe80ab=""><span _v-5afe80ab=""></span></li> </ol> <div class=carousel-inner role=listbox _v-5afe80ab=""> <slot _v-5afe80ab=""></slot> </div> <div v-show=controls class="carousel-controls hidden-xs" _v-5afe80ab=""> <a class="left carousel-control" role=button @click=prev _v-5afe80ab=""> <span class="glyphicon glyphicon-chevron-left" aria-hidden=true _v-5afe80ab=""></span> </a> <a class="right carousel-control" role=button @click=next _v-5afe80ab=""> <span class="glyphicon glyphicon-chevron-right" aria-hidden=true _v-5afe80ab=""></span> </a> </div> </div>';},function(e,t,n){n(121),e.exports=n(123),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(124);},function(e,t,n){var o=n(122);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,"label.checkbox[_v-dc195ce4]{position:relative;padding-left:18px}label.checkbox>input[_v-dc195ce4]{box-sizing:border-box;position:absolute;z-index:-1;padding:0;opacity:0;margin:0}label.checkbox>.icon[_v-dc195ce4]{position:absolute;top:.2rem;left:0;display:block;width:1.4rem;height:1.4rem;line-height:1rem;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:.35rem;background-repeat:no-repeat;background-position:50%;background-size:50% 50%}label.checkbox:not(.active)>.icon[_v-dc195ce4]{background-color:#ddd;border:1px solid #bbb}label.checkbox>input:focus~.icon[_v-dc195ce4]{outline:0;border:1px solid #66afe9;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}label.checkbox.active>.icon[_v-dc195ce4]{background-size:1rem 1rem;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtNS43MywwLjUybC0zLjEyNDIyLDMuMzQxNjFsLTEuMzM4OTUsLTEuNDMyMTJsLTEuMjQ5NjksMS4zMzY2NWwyLjU4ODYzLDIuNzY4NzZsNC4zNzM5LC00LjY3ODI2bC0xLjI0OTY5LC0xLjMzNjY1bDAsMGwwLjAwMDAyLDAuMDAwMDF6Ii8+PC9zdmc+)}label.checkbox.active .btn-default[_v-dc195ce4]{-webkit-filter:brightness(75%);filter:brightness(75%)}.btn.readonly[_v-dc195ce4],label.checkbox.disabled[_v-dc195ce4],label.checkbox.readonly[_v-dc195ce4]{filter:alpha(opacity=65);box-shadow:none;opacity:.65}label.btn>input[type=checkbox][_v-dc195ce4]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}",""]);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{value:{default:!0},checked:{twoWay:!0},button:{type:Boolean,coerce:o.coerce.boolean,default:!1},disabled:{type:Boolean,coerce:o.coerce.boolean,default:!1},name:{type:String,default:null},readonly:{type:Boolean,coerce:o.coerce.boolean,default:!1},type:{type:String,default:null}},computed:{active:function active(){return"boolean"!=typeof this.value&&this.group?~this.$parent.value.indexOf(this.value):this.checked===this.value;},isButton:function isButton(){return this.button||this.group&&this.$parent.buttons;},group:function group(){return this.$parent&&this.$parent._checkboxGroup;},typeColor:function typeColor(){return this.type||this.$parent&&this.$parent.type||"default";}},watch:{checked:function checked(e){"boolean"!=typeof this.value&&this.group&&(this.checked&&!~this.$parent.value.indexOf(this.value)&&this.$parent.value.push(this.value),!this.checked&&~this.$parent.value.indexOf(this.value)&&this.$parent.value.$remove(this.value));}},created:function created(){if("boolean"!=typeof this.value){var e=this.$parent;e&&e._btnGroup&&!e._radioGroup&&(e._checkboxGroup=!0,e.value instanceof Array||(e.value=[]));}},ready:function ready(){this.$parent._checkboxGroup&&"boolean"!=typeof this.value&&(this.$parent.value.length?this.checked=~this.$parent.value.indexOf(this.value):this.checked&&this.$parent.value.push(this.value));},methods:{eval:function _eval(){"boolean"!=typeof this.value&&this.group&&(this.checked=~this.$parent.value.indexOf(this.value));},focus:function focus(){this.$els.input.focus();},toggle:function toggle(){if(!this.disabled&&(this.focus(),!this.readonly&&(this.checked=this.checked?null:this.value,this.group&&"boolean"!=typeof this.value))){var e=this.$parent.value.indexOf(this.value);this.$parent.value[~e?"$remove":"push"](this.value);}return!1;}}};},function(e,t){e.exports='<label :class="[isButton?\'btn btn-\'+typeColor:\'open checkbox \'+typeColor,{active:checked,disabled:disabled,readonly:readonly}]" @click.prevent=toggle _v-dc195ce4=""> <input type=checkbox autocomplete=off v-el:input="" :checked=active :value=value :name=name :readonly=readonly :disabled=disabled _v-dc195ce4=""> <span v-if=!isButton class="icon dropdown-toggle" :class="[active?\'btn-\'+typeColor:\'\',{bg:typeColor===\'default\'}]" _v-dc195ce4=""></span> <span v-if="!isButton&amp;active&amp;&amp;typeColor===\'default\'" class=icon _v-dc195ce4=""></span> <slot _v-dc195ce4=""></slot> </label>';},function(e,t,n){n(126),e.exports=n(128),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(129);},function(e,t,n){var o=n(127);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".datepicker{position:relative;display:inline-block}input.datepicker-input.with-reset-button{padding-right:25px}.datepicker>button.close{position:absolute;top:0;right:0;outline:none;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center}.datepicker>button.close:focus{opacity:.2}.datepicker-popup{position:absolute;border:1px solid #ccc;border-radius:5px;background:#fff;margin-top:2px;z-index:1000;box-shadow:0 6px 12px rgba(0,0,0,.175)}.datepicker-inner{width:218px}.datepicker-body{padding:10px}.datepicker-body span,.datepicker-ctrl p,.datepicker-ctrl span{display:inline-block;width:28px;line-height:28px;height:28px;border-radius:4px}.datepicker-ctrl p{width:65%}.datepicker-ctrl span{position:absolute}.datepicker-body span{text-align:center}.datepicker-monthRange span{width:48px;height:50px;line-height:45px}.datepicker-item-disable{background-color:#fff!important;cursor:not-allowed!important}.datepicker-item-disable,.datepicker-item-gray,.decadeRange span:first-child,.decadeRange span:last-child{color:#999}.datepicker-dateRange-item-active,.datepicker-dateRange-item-active:hover{background:#3276b1!important;color:#fff!important}.datepicker-monthRange{margin-top:10px}.datepicker-ctrl p,.datepicker-ctrl span,.datepicker-dateRange span,.datepicker-monthRange span{cursor:pointer}.datepicker-ctrl i:hover,.datepicker-ctrl p:hover,.datepicker-dateRange-item-hover,.datepicker-dateRange span:hover,.datepicker-monthRange span:hover{background-color:#eee}.datepicker-weekRange span{font-weight:700}.datepicker-label{background-color:#f8f8f8;font-weight:700;padding:7px 0;text-align:center}.datepicker-ctrl{position:relative;height:30px;line-height:30px;font-weight:700;text-align:center}.month-btn{font-weight:700;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.datepicker-preBtn{left:2px}.datepicker-nextBtn{right:2px}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(27),a=o(r);t.default={props:{value:{type:String,twoWay:!0},format:{default:"MM/dd/yyyy"},disabledDaysOfWeek:{type:Array,default:function _default(){return[];}},width:{type:String,default:"200px"},clearButton:{type:Boolean,default:!1},lang:{type:String,default:navigator.language},placeholder:{type:String}},ready:function ready(){var e=this;this._blur=function(t){e.$el.contains(t.target)||e.close();},this.$dispatch("child-created",this),this.currDate=this.parse(this.value)||this.parse(new Date()),(0,a.default)(window).on("click",this._blur);},beforeDestroy:function beforeDestroy(){(0,a.default)(window).off("click",this._blur);},data:function data(){return{currDate:new Date(),dateRange:[],decadeRange:[],displayDayView:!1,displayMonthView:!1,displayYearView:!1};},watch:{currDate:function currDate(){this.getDateRange();}},computed:{text:function text(){return(0,i.translations)(this.lang);}},methods:{close:function close(){this.displayDayView=this.displayMonthView=this.displayYearView=!1;},inputClick:function inputClick(){this.currDate=this.parse(this.value)||this.parse(new Date()),this.displayMonthView||this.displayYearView?this.displayDayView=!1:this.displayDayView=!this.displayDayView;},preNextDecadeClick:function preNextDecadeClick(e){var t=this.currDate.getFullYear(),n=this.currDate.getMonth(),o=this.currDate.getDate();0===e?this.currDate=new Date(t-10,n,o):this.currDate=new Date(t+10,n,o);},preNextMonthClick:function preNextMonthClick(e){var t=this.currDate.getFullYear(),n=this.currDate.getMonth(),o=this.currDate.getDate();if(0===e){var i=this.getYearMonth(t,n-1);this.currDate=new Date(i.year,i.month,o);}else{var r=this.getYearMonth(t,n+1);this.currDate=new Date(r.year,r.month,o);}},preNextYearClick:function preNextYearClick(e){var t=this.currDate.getFullYear(),n=this.currDate.getMonth(),o=this.currDate.getDate();0===e?this.currDate=new Date(t-1,n,o):this.currDate=new Date(t+1,n,o);},yearSelect:function yearSelect(e){this.displayYearView=!1,this.displayMonthView=!0,this.currDate=new Date(e,this.currDate.getMonth(),this.currDate.getDate());},daySelect:function daySelect(e,t){return"datepicker-item-disable"!==t.$el.classList[0]&&(this.currDate=e,this.value=this.stringify(this.currDate),this.displayDayView=!1,void 0);},switchMonthView:function switchMonthView(){this.displayDayView=!1,this.displayMonthView=!0;},switchDecadeView:function switchDecadeView(){this.displayMonthView=!1,this.displayYearView=!0;},monthSelect:function monthSelect(e){this.displayMonthView=!1,this.displayDayView=!0,this.currDate=new Date(this.currDate.getFullYear(),e,this.currDate.getDate());},getYearMonth:function getYearMonth(e,t){return t>11?(e++,t=0):t<0&&(e--,t=11),{year:e,month:t};},stringifyDecadeHeader:function stringifyDecadeHeader(e){var t=e.getFullYear().toString(),n=t.substring(0,t.length-1)+0,o=parseInt(n,10)+10;return n+"-"+o;},stringifyDayHeader:function stringifyDayHeader(e){return this.text.months[e.getMonth()]+" "+e.getFullYear();},parseMonth:function parseMonth(e){return this.text.months[e.getMonth()];},stringifyYearHeader:function stringifyYearHeader(e){return e.getFullYear();},stringify:function stringify(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.format;if(e||(e=this.parse()),!e)return"";var n=e.getFullYear(),o=e.getMonth()+1,i=e.getDate(),r=this.parseMonth(e);return t.replace(/yyyy/g,n).replace(/MMMM/g,r).replace(/MMM/g,r.substring(0,3)).replace(/MM/g,("0"+o).slice(-2)).replace(/dd/g,("0"+i).slice(-2)).replace(/yy/g,n).replace(/M(?!a)/g,o).replace(/d/g,i);},parse:function parse(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.value,t=void 0;return t=10!==e.length||"dd-MM-yyyy"!==this.format&&"dd/MM/yyyy"!==this.format?new Date(e):new Date(e.substring(6,10),e.substring(3,5),e.substring(0,2)),isNaN(t.getFullYear())?new Date():t;},getDayCount:function getDayCount(e,t){var n=[31,28,31,30,31,30,31,31,30,31,30,31];return 1===t&&(e%400===0||e%4===0&&e%100!==0)?29:n[t];},getDateRange:function getDateRange(){var e=this;this.dateRange=[],this.decadeRange=[];for(var t={year:this.currDate.getFullYear(),month:this.currDate.getMonth(),day:this.currDate.getDate()},n=t.year.toString(),o=n.substring(0,n.length-1)+0-1,i=0;i<12;i++){this.decadeRange.push({text:o+i});}var r=new Date(t.year,t.month,1),a=r.getDay()+1;0===a&&(a=7);var s=this.getDayCount(t.year,t.month);if(a>1)for(var l=this.getYearMonth(t.year,t.month-1),c=this.getDayCount(l.year,l.month),u=1;u<a;u++){var p=c-a+u+1;this.dateRange.push({text:p,date:new Date(l.year,l.month,p),sclass:"datepicker-item-gray"});}for(var d=function d(n){var o=new Date(t.year,t.month,n),i=o.getDay(),r="";if(e.disabledDaysOfWeek.forEach(function(e){i===parseInt(e,10)&&(r="datepicker-item-disable");}),n===t.day&&e.value){var a=e.parse(e.value);a&&a.getFullYear()===t.year&&a.getMonth()===t.month&&(r="datepicker-dateRange-item-active");}e.dateRange.push({text:n,date:o,sclass:r});},f=1;f<=s;f++){d(f);}if(this.dateRange.length<42)for(var h=42-this.dateRange.length,v=this.getYearMonth(t.year,t.month+1),b=1;b<=h;b++){this.dateRange.push({text:b,date:new Date(v.year,v.month,b),sclass:"datepicker-item-gray"});}}}};},function(e,t){e.exports='<div class=datepicker> <input class="form-control datepicker-input" :class="{\'with-reset-button\': clearButton}" type=text :placeholder=placeholder :style={width:width} @click=inputClick v-model=value /> <button v-if="clearButton && value" type=button class=close @click="value = \'\'"> <span>&times;</span> </button> <div class=datepicker-popup v-show=displayDayView> <div class=datepicker-inner> <div class=datepicker-body> <div class=datepicker-ctrl> <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden=true @click=preNextMonthClick(0)></span> <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden=true @click=preNextMonthClick(1)></span> <p @click=switchMonthView>{{stringifyDayHeader(currDate)}}</p> </div> <div class=datepicker-weekRange> <span v-for="w in text.daysOfWeek">{{w}}</span> </div> <div class=datepicker-dateRange> <span v-for="d in dateRange" :class=d.sclass @click=daySelect(d.date,this)>{{d.text}}</span> </div> </div> </div> </div> <div class=datepicker-popup v-show=displayMonthView> <div class=datepicker-inner> <div class=datepicker-body> <div class=datepicker-ctrl> <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden=true @click=preNextYearClick(0)></span> <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden=true @click=preNextYearClick(1)></span> <p @click=switchDecadeView>{{stringifyYearHeader(currDate)}}</p> </div> <div class=datepicker-monthRange> <template v-for="m in text.months"> <span :class="{\'datepicker-dateRange-item-active\':\r\n                  (text.months[parse(value).getMonth()]  === m) &&\r\n                  currDate.getFullYear() === parse(value).getFullYear()}" @click=monthSelect($index)>{{m.substr(0,3)}}</span> </template> </div> </div> </div> </div> <div class=datepicker-popup v-show=displayYearView> <div class=datepicker-inner> <div class=datepicker-body> <div class=datepicker-ctrl> <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden=true @click=preNextDecadeClick(0)></span> <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden=true @click=preNextDecadeClick(1)></span> <p>{{stringifyDecadeHeader(currDate)}}</p> </div> <div class="datepicker-monthRange decadeRange"> <template v-for="decade in decadeRange"> <span :class="{\'datepicker-dateRange-item-active\':\r\n                  parse(this.value).getFullYear() === decade.text}" @click.stop=yearSelect(decade.text)>{{decade.text}}</span> </template> </div> </div> </div> </div> </div>';},function(e,t,n){n(131),e.exports=n(133),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(134);},function(e,t,n){var o=n(132);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".secret[_v-628ea2dc]{position:absolute;clip:rect(0 0 0 0);overflow:hidden;margin:-1px;height:1px;width:1px;padding:0;border:0}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(27),a=o(r);t.default={props:{show:{twoWay:!0,type:Boolean,coerce:i.coerce.boolean,default:!1},class:null,disabled:{type:Boolean,coerce:i.coerce.boolean,default:!1},text:{type:String,default:null},type:{type:String,default:"default"}},computed:{classes:function classes(){return[{open:this.show,disabled:this.disabled},this.class,this.isLi?"dropdown":this.inInput?"input-group-btn":"btn-group"];},inInput:function inInput(){return this.$parent._input;},isLi:function isLi(){return this.$parent._navbar||this.$parent.menu||this.$parent._tabset;},menu:function menu(){return!this.$parent||this.$parent.navbar;},submenu:function submenu(){return this.$parent&&(this.$parent.menu||this.$parent.submenu);},slots:function slots(){return this._slotContents;}},methods:{blur:function blur(){var e=this;this.unblur(),this._hide=setTimeout(function(){e._hide=null,e.show=!1;},100);},unblur:function unblur(){this._hide&&(clearTimeout(this._hide),this._hide=null);}},ready:function ready(){var e=this,t=(0,a.default)(this.$els.dropdown);t.onBlur(function(t){e.show=!1;}),t.findChildren("a,button.dropdown-toggle").on("click",function(t){return t.preventDefault(),!e.disabled&&(e.show=!e.show,!1);}),t.findChildren("ul").on("click","li>a",function(t){e.show=!1;});},beforeDestroy:function beforeDestroy(){var e=(0,a.default)(this.$els.dropdown);e.offBlur(),e.findChildren("a,button").off(),e.findChildren("ul").off();}};},function(e,t){e.exports='<li v-if=isLi v-el:dropdown="" :class=classes _v-628ea2dc=""> <slot name=button _v-628ea2dc=""> <a class=dropdown-toggle role=button :class="{disabled: disabled}" @keyup.esc="show = false" _v-628ea2dc=""> {{ text }} <span class=caret _v-628ea2dc=""></span> </a> </slot> <slot name=dropdown-menu _v-628ea2dc=""> <ul v-else="" class=dropdown-menu _v-628ea2dc=""> <slot _v-628ea2dc=""></slot> </ul> </slot> </li> <div v-else="" v-el:dropdown="" :class=classes _v-628ea2dc=""> <slot name=before _v-628ea2dc=""></slot> <slot name=button _v-628ea2dc=""> <button type=button class="btn btn-{{type}} dropdown-toggle" @keyup.esc="show = false" :disabled=disabled _v-628ea2dc=""> {{ text }} <span class=caret _v-628ea2dc=""></span> </button> </slot> <slot name=dropdown-menu _v-628ea2dc=""> <ul class=dropdown-menu _v-628ea2dc=""> <slot _v-628ea2dc=""></slot> </ul> </slot> </div>';},function(e,t,n){e.exports=n(136),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(137);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(27);o(r);t.default={props:{valid:{twoWay:!0,default:null},enterSubmit:{type:Boolean,coerce:i.coerce.boolean,default:!1},icon:{type:Boolean,coerce:i.coerce.boolean,default:!1},lang:{type:String,default:navigator.language}},data:function data(){return{children:[],timeout:null};},watch:{valid:function valid(e,t){e!==t&&this._parent&&this._parent.validate();}},methods:{focus:function focus(){this.$els.input.focus();},validate:function validate(){var e=!0;return this.children.some(function(t){var n=t.validate?t.validate():void 0!==t.valid?t.valid:t.required&&!~["",null,void 0].indexOf(t.value);return n||(e=!1),!e;}),this.valid=e,e===!0;}},created:function created(){this._formGroup=!0;for(var e=this.$parent;e&&!e._formGroup;){e=e.$parent;}e&&e._formGroup&&(e.children.push(this),this._parent=e);},ready:function ready(){this.validate();},beforeDestroy:function beforeDestroy(){this._parent&&this._parent.children.$remove(this);}};},function(e,t){e.exports="<slot></slot>";},function(e,t,n){n(139),e.exports=n(141),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(142);},function(e,t,n){var o=n(140);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".form-group[_v-461124e2]{position:relative}label~.close[_v-461124e2]{top:25px}.input-group>.icon[_v-461124e2]{position:relative;display:table-cell;width:0;z-index:3}.close[_v-461124e2]{position:absolute;top:0;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center}.has-feedback .close[_v-461124e2]{right:20px}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(27),a=o(r);t.default={props:{value:{twoWay:!0,default:null},match:{type:String,default:null},clearButton:{type:Boolean,coerce:i.coerce.boolean,default:!1},disabled:{type:Boolean,coerce:i.coerce.boolean,default:!1},enterSubmit:{type:Boolean,coerce:i.coerce.boolean,default:!1},error:{type:String,default:null},help:{type:String,default:null},hideHelp:{type:Boolean,coerce:i.coerce.boolean,default:!0},icon:{type:Boolean,coerce:i.coerce.boolean,default:!1},label:{type:String,default:null},lang:{type:String,default:navigator.language},mask:null,maskDelay:{type:Number,coerce:i.coerce.number,default:100},max:{type:String,coerce:i.coerce.string,default:null},maxlength:{type:Number,coerce:i.coerce.number,default:null},min:{type:String,coerce:i.coerce.string,default:null},minlength:{type:Number,coerce:i.coerce.number,default:0},name:{type:String,default:null},pattern:{coerce:i.coerce.pattern,default:null},placeholder:{type:String,default:null},readonly:{type:Boolean,coerce:i.coerce.boolean,default:!1},required:{type:Boolean,coerce:i.coerce.boolean,default:!1},rows:{type:Number,coerce:i.coerce.number,default:3},step:{type:Number,coerce:i.coerce.number,default:null},type:{type:String,default:"text"},validationDelay:{type:Number,coerce:i.coerce.number,default:250}},data:function data(){return{valid:null,timeout:null};},computed:{canValidate:function canValidate(){return!this.disabled&&!this.readonly&&(this.required||this.pattern||this.nativeValidate||null!==this.match);},errorText:function errorText(){var e=this.value,t=[this.error];return!e&&this.required&&t.push("("+this.text.required.toLowerCase()+")"),e&&e.length<this.minlength&&t.push("("+this.text.minLength.toLowerCase()+": "+this.minlength+")"),t.join(" ");},input:function input(){return this.$els.input;},nativeValidate:function nativeValidate(){return(this.input||{}).checkValidity&&(~["url","email"].indexOf(this.type.toLowerCase())||this.min||this.max);},showClear:function showClear(){return!/\bEdge\//.test(window.navigator.userAgent)&&this.clearButton;},showError:function showError(){return this.error&&this.valid===!1;},showHelp:function showHelp(){return this.help&&(!this.showError||!this.hideHelp);},slots:function slots(){return this._slotContents||{};},text:function text(){return(0,i.translations)(this.lang);},title:function title(){return this.errorText||this.help||"";}},watch:{match:function match(e){this.eval();},valid:function valid(e,t){e!==t&&this._parent&&this._parent.validate();},value:function value(e,t){var n=this;e!==t&&(this.mask instanceof Function&&(e=this.mask(e||""),this.value!==e&&(this._timeout.mask&&clearTimeout(this._timeout.mask),this._timeout.mask=setTimeout(function(){n.value=e,n.$els.input.value=e;},this.maskDelay))),this.eval());}},methods:{attr:function attr(e){return~["",null,void 0].indexOf(e)||e instanceof Function?void 0:e;},focus:function focus(){this.input.focus();},eval:function _eval(){var e=this;this._timeout.eval&&clearTimeout(this._timeout.eval),this.canValidate?this._timeout.eval=setTimeout(function(){e.valid=e.validate(),e._timeout.eval=null;},this.validationDelay):this.valid=!0;},onblur:function onblur(e){this.canValidate&&(this.valid=this.validate()),this.$emit("blur",e);},onfocus:function onfocus(e){this.$emit("focus",e);},submit:function submit(){if(this.$parent._formGroup)return this.$parent.validate();if(this.input.form){var e=(0,a.default)(".form-group.validate:not(.has-success)",this.input.form);e.length?e.find("input,textarea,select")[0].focus():this.input.form.submit();}},validate:function validate(){if(!this.canValidate)return!0;var e=(this.value||"").trim();return e?null!==this.match?this.match===e:!(e.length<this.minlength)&&!(this.nativeValidate&&!this.input.checkValidity())&&(!this.pattern||(this.pattern instanceof Function?this.pattern(this.value):this.pattern.test(this.value))):!this.required;}},created:function created(){this._input=!0,this._timeout={};for(var e=this.$parent;e&&!e._formGroup;){e=e.$parent;}e&&e._formGroup&&(this._parent=e);},ready:function ready(){var e=this;this._parent&&this._parent.children.push(this),(0,a.default)(this.input).on("focus",function(t){return e.$emit("focus",t);}).on("blur",function(t){e.canValidate&&(e.valid=e.validate()),e.$emit("blur",t);});},beforeDestroy:function beforeDestroy(){this._parent&&this._parent.children.$remove(this),(0,a.default)(this.input).off();}};},function(e,t){e.exports='<div class=form-group :class="{validate:canValidate,\'has-feedback\':icon,\'has-error\':canValidate&amp;&amp;valid===false,\'has-success\':canValidate&amp;&amp;valid}" _v-461124e2=""> <slot name=label _v-461124e2=""><label v-if=label class=control-label @click=focus _v-461124e2="">{{label}}</label></slot> <div v-if=slots.before||slots.after class=input-group _v-461124e2=""> <slot name=before _v-461124e2=""></slot> <textarea v-if="type==\'textarea\'" class=form-control v-el:input="" v-model=value :cols=cols :rows=rows :name=name :title=attr(title) :readonly=readonly :required=required :disabled=disabled :maxlength=maxlength :placeholder=placeholder @blur=onblur @focus=onfocus _v-461124e2=""></textarea> <input v-else="" class=form-control v-el:input="" v-model=value :name=name :max=attr(max) :min=attr(min) :step=step :type=type :title=attr(title) :readonly=readonly :required=required :disabled=disabled :maxlength=maxlength :placeholder=placeholder @keyup.enter=enterSubmit&amp;&amp;submit() @blur=onblur @focus=onfocus _v-461124e2=""> <div v-if="showClear &amp;&amp; value" :class={icon:icon} _v-461124e2=""> <span class=close @click="value = \'\'" _v-461124e2="">×</span> </div> <div v-if=icon class=icon _v-461124e2=""> <span v-if="icon&amp;&amp;valid!==null" :class="[\'form-control-feedback glyphicon\',\'glyphicon-\'+(valid?\'ok\':\'remove\')]" aria-hidden=true _v-461124e2=""></span> </div> <slot name=after _v-461124e2=""></slot> </div> <template v-else="" _v-461124e2=""> <textarea v-if="type==\'textarea\'" class=form-control v-el:input="" v-model=value :cols=cols :rows=rows :name=name :title=attr(title) :readonly=readonly :required=required :disabled=disabled :maxlength=maxlength :placeholder=placeholder @blur=onblur @focus=onfocus _v-461124e2=""></textarea> <input v-else="" class=form-control v-el:input="" v-model=value :name=name :max=attr(max) :min=attr(min) :step=step :type=type :title=attr(title) :readonly=readonly :required=required :disabled=disabled :maxlength=maxlength :placeholder=placeholder @keyup.enter=enterSubmit&amp;&amp;submit() @blur=onblur @focus=onfocus _v-461124e2=""> <span v-if="showClear &amp;&amp; value" class=close @click="value = \'\'" _v-461124e2="">×</span> <span v-if="icon&amp;&amp;valid!==null" :class="[\'form-control-feedback glyphicon\',\'glyphicon-\'+(valid?\'ok\':\'remove\')]" aria-hidden=true _v-461124e2=""></span> </template> <div v-if=showHelp class=help-block @click=focus _v-461124e2="">{{help}}</div> <div v-if=showError class="help-block with-errors" @click=focus _v-461124e2="">{{errorText}}</div> </div>';},function(e,t,n){n(144),e.exports=n(146),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(151);},function(e,t,n){var o=n(145);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".modal{-webkit-transition:all .3s ease;transition:all .3s ease}.modal.in{background-color:rgba(0,0,0,.5)}.modal.zoom .modal-dialog{-webkit-transform:scale(.1);transform:scale(.1);top:300px;opacity:0;-webkit-transition:all .3s;transition:all .3s}.modal.zoom.in .modal-dialog{-webkit-transform:scale(1);transform:scale(1);-webkit-transform:translate3d(0,-300px,0);transform:translate3d(0,-300px,0);opacity:1}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(147),r=o(i),a=n(95),s=n(27),l=o(s);t.default={props:{okText:{type:String,default:"Save changes"},cancelText:{type:String,default:"Close"},title:{type:String,default:""},show:{required:!0,type:Boolean,coerce:a.coerce.boolean,twoWay:!0},width:{default:null},callback:{type:Function,default:function _default(){}},effect:{type:String,default:null},backdrop:{type:Boolean,coerce:a.coerce.boolean,default:!0},large:{type:Boolean,coerce:a.coerce.boolean,default:!1},small:{type:Boolean,coerce:a.coerce.boolean,default:!1}},computed:{optionalWidth:function optionalWidth(){return null===this.width?null:(0,r.default)(this.width)?this.width+"px":this.width;}},watch:{show:function show(e){var t=this,n=this.$el,o=document.body,i=(0,a.getScrollBarWidth)();e?((0,l.default)(n).find(".modal-content").focus(),n.style.display="block",setTimeout(function(){return(0,l.default)(n).addClass("in");},0),(0,l.default)(o).addClass("modal-open"),0!==i&&(o.style.paddingRight=i+"px"),this.backdrop&&(0,l.default)(n).on("click",function(e){e.target===n&&(t.show=!1);})):(o.style.paddingRight=null,(0,l.default)(o).removeClass("modal-open"),(0,l.default)(n).removeClass("in").on("transitionend",function(){(0,l.default)(n).off("click transitionend"),n.style.display="none";}));}},methods:{close:function close(){this.show=!1;}}};},function(e,t,n){e.exports={default:n(148),__esModule:!0};},function(e,t,n){n(149),e.exports=n(33).Number.isInteger;},function(e,t,n){var o=n(31);o(o.S,"Number",{isInteger:n(150)});},function(e,t,n){var o=n(39),i=Math.floor;e.exports=function(e){return!o(e)&&isFinite(e)&&i(e)===e;};},function(e,t){e.exports="<div role=dialog v-bind:class=\"{\r\n    'modal':true,\r\n    'fade':effect === 'fade',\r\n    'zoom':effect === 'zoom'\r\n    }\"> <div v-bind:class=\"{'modal-dialog':true,'modal-lg':large,'modal-sm':small}\" role=document v-bind:style=\"{width: optionalWidth}\"> <div class=modal-content> <slot name=modal-header> <div class=modal-header> <button type=button class=close @click=close><span>&times;</span></button> <h4 class=modal-title> <slot name=title> {{title}} </slot> </h4> </div> </slot> <slot name=modal-body> <div class=modal-body></div> </slot> <slot name=modal-footer> <div class=modal-footer> <button type=button class=\"btn btn-default\" @click=close>{{ cancelText }}</button> <button type=button class=\"btn btn-primary\" @click=callback>{{ okText }}</button> </div> </slot> </div> </div> </div>";},function(e,t,n){e.exports=n(153),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(154);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(27),r=o(i);t.default={props:{type:{type:String,default:"default"},placement:{type:String,default:""}},data:function data(){return{id:"bs-example-navbar-collapse-1",collapsed:!0,styles:{}};},computed:{slots:function slots(){return this._slotContents;}},methods:{toggleCollapse:function toggleCollapse(e){e&&e.preventDefault(),this.collapsed=!this.collapsed;}},created:function created(){this._navbar=!0;},ready:function ready(){var e=this,t=(0,r.default)('.dropdown>[data-toggle="dropdown"]',this.$el).parent();t.on("click",".dropdown-toggle",function(e){e.preventDefault(),t.each(function(t){t.contains(e.target)&&t.classList.toggle("open");});}).on("click",".dropdown-menu>li>a",function(e){t.each(function(t){t.contains(e.target)&&t.classList.remove("open");});}).onBlur(function(e){t.each(function(t){t.contains(e.target)||t.classList.remove("open");});}),(0,r.default)(this.$el).on("click touchstart","li:not(.dropdown)>a",function(t){setTimeout(function(){e.collapsed=!0;},200);}).onBlur(function(t){e.$el.contains(t.target)||(e.collapsed=!0);});var n=this.$el.offsetHeight;"top"===this.placement&&(document.body.style.paddingTop=n+"px"),"bottom"===this.placement&&(document.body.style.paddingBottom=n+"px"),this.slots.collapse&&(0,r.default)('[data-toggle="collapse"]',this.$el).on("click",function(t){return e.toggleCollapse(t);});},beforeDestroy:function beforeDestroy(){(0,r.default)(".dropdown",this.$el).off("click").offBlur(),this.slots.collapse&&(0,r.default)('[data-toggle="collapse"]',this.$el).off("click");}};},function(e,t){e.exports="<nav v-el:navbar :class=\"['navbar',{\r\n    'navbar-inverse':(type == 'inverse'),\r\n    'navbar-default':(type == 'default'),\r\n    'navbar-fixed-top':(placement === 'top'),\r\n    'navbar-fixed-bottom':(placement === 'bottom'),\r\n    'navbar-static-top':(placement === 'static')\r\n  }]\"> <div class=container-fluid> <div class=navbar-header> <button v-if=!slots.collapse type=button class=\"navbar-toggle collapsed\" aria-expanded=false @click=toggleCollapse> <span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span> </button> <slot name=collapse></slot> <slot name=brand></slot> </div> <div :class=\"['navbar-collapse',{collapse:collapsed}]\"> <ul class=\"nav navbar-nav\"> <slot></slot> </ul> <ul v-if=slots.right class=\"nav navbar-nav navbar-right\"> <slot name=right></slot> </ul> </div> </div> </nav>";},function(e,t,n){e.exports=n(156),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(157);},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{value:null},data:function data(){return{loading:!0};},ready:function ready(){if(this.$parent._select){this.$parent.options||(this.$parent.options=[]);var e={};e[this.$parent.optionsLabel]=this.$els.v.innerHTML,e[this.$parent.optionsValue]=this.value,this.$parent.options.push(e),this.loading=!1;}else console.warn("options only work inside a select component");}};},function(e,t){e.exports="<li v-el:v v-if=loading><slot></slot></li>";},function(e,t,n){n(159),e.exports=n(161),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(162);},function(e,t,n){var o=n(160);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".accordion-toggle{cursor:pointer}.collapse-transition{-webkit-transition:max-height .5s ease;transition:max-height .5s ease}.collapse-enter,.collapse-leave{max-height:0!important}",""]);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{header:{type:String},isOpen:{type:Boolean,coerce:o.coerce.boolean,default:null},type:{type:String,default:null}},computed:{inAccordion:function inAccordion(){return this.$parent&&this.$parent._isAccordion;},panelType:function panelType(){return"panel-"+(this.type||this.$parent&&this.$parent.type||"default");}},methods:{toggle:function toggle(){this.isOpen=!this.isOpen,this.$dispatch("isOpenEvent",this);}},transitions:{collapse:{afterEnter:function afterEnter(e){e.style.maxHeight="",e.style.overflow="";},beforeLeave:function beforeLeave(e){return e.style.maxHeight=e.offsetHeight+"px",e.style.overflow="hidden",e.offsetHeight;}}},created:function created(){null===this.isOpen&&(this.isOpen=!this.inAccordion);}};},function(e,t){e.exports="<div class=\"panel {{panelType}}\"> <div :class=\"['panel-heading',{'accordion-toggle':inAccordion}]\" @click.prevent=inAccordion&&toggle()> <slot name=header> <h4 class=panel-title>{{ header }}</h4> </slot> </div> <div class=panel-collapse v-el:panel v-show=isOpen transition=collapse> <div class=panel-body> <slot></slot> </div> </div> </div>";},function(e,t,n){n(164),e.exports=n(166),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(168);},function(e,t,n){var o=n(165);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".popover.bottom,.popover.left,.popover.right,.popover.top{display:block}.scale-enter{-webkit-animation:scale-in .15s ease-in;animation:scale-in .15s ease-in}.scale-leave{-webkit-animation:scale-out .15s ease-out;animation:scale-out .15s ease-out}@-webkit-keyframes scale-in{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes scale-in{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes scale-out{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(0);transform:scale(0);opacity:0}}@keyframes scale-out{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(0);transform:scale(0);opacity:0}}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(167),r=o(i);t.default={mixins:[r.default],props:{trigger:{type:String,default:"click"}}};},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(27),a=o(r);t.default={props:{trigger:{type:String},effect:{type:String,default:"fade"},title:{type:String},content:{type:String},header:{type:Boolean,coerce:i.coerce.boolean,default:!0},placement:{type:String,default:"top"}},data:function data(){return{position:{top:0,left:0},show:!1};},methods:{toggle:function toggle(e){var t=this;e&&"contextmenu"===this.trigger&&e.preventDefault(),(this.show=!this.show)&&setTimeout(function(){var e=t.$els.popover,n=t.$els.trigger.children[0];switch(t.placement){case"top":t.position.left=n.offsetLeft-e.offsetWidth/2+n.offsetWidth/2,t.position.top=n.offsetTop-e.offsetHeight;break;case"left":t.position.left=n.offsetLeft-e.offsetWidth,t.position.top=n.offsetTop+n.offsetHeight/2-e.offsetHeight/2;break;case"right":t.position.left=n.offsetLeft+n.offsetWidth,t.position.top=n.offsetTop+n.offsetHeight/2-e.offsetHeight/2;break;case"bottom":t.position.left=n.offsetLeft-e.offsetWidth/2+n.offsetWidth/2,t.position.top=n.offsetTop+n.offsetHeight;break;default:console.warn("Wrong placement prop");}e.style.top=t.position.top+"px",e.style.left=t.position.left+"px";},0);}},ready:function ready(){var e=this.$els.trigger;if(!e)return console.error("Could not find trigger v-el in your component that uses popoverMixin.");if("focus"!==this.trigger||~e.tabIndex||(e=(0,a.default)("a,input,select,textarea,button",e),e.length||(e=null)),e){var t={contextmenu:"contextmenu",hover:"mouseleave mouseenter",focus:"blur focus"};(0,a.default)(e).on(t[this.trigger]||"click",this.toggle),this._trigger=e;}},beforeDestroy:function beforeDestroy(){this._trigger&&(0,a.default)(this._trigger).off();}};},function(e,t){e.exports="<span v-el:trigger> <slot></slot> </span> <div v-el:popover v-if=show :class=\"['popover',placement]\" :transition=effect> <div class=arrow></div> <h3 class=popover-title v-if=title> <slot name=title>{{title}}</slot> </h3> <div class=popover-content> <slot name=content>{{{content}}}</slot> </div> </div>";},function(e,t,n){e.exports=n(170),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(171);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{now:{type:Number,coerce:o.coerce.number,required:!0},label:{type:Boolean,coerce:o.coerce.boolean,default:!1},type:{type:String},striped:{type:Boolean,coerce:o.coerce.boolean,default:!1},animated:{type:Boolean,coerce:o.coerce.boolean,default:!1}}};},function(e,t){e.exports="<div role=progressbar :class=\"['progress-bar',{\r\n      'progress-bar-success':type == 'success',\r\n      'progress-bar-warning':type == 'warning',\r\n      'progress-bar-info':type == 'info',\r\n      'progress-bar-danger':type == 'danger',\r\n      'progress-bar-striped':striped,\r\n      'active':animated\r\n    }]\" :style=\"{width: now + '%'}\"> {{label ? now + '%' : ''}} </div>";},function(e,t,n){n(173),e.exports=n(175),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(176);},function(e,t,n){var o=n(174);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".radio{position:relative}.radio>label>input{position:absolute;margin:0;padding:0;opacity:0;z-index:-1;box-sizing:border-box}.radio>label>.icon{position:absolute;top:.15rem;left:0;display:block;width:1.4rem;height:1.4rem;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:.7rem;background-repeat:no-repeat;background-position:50%;background-size:50% 50%}.radio:not(.active)>label>.icon{background-color:#ddd;border:1px solid #bbb}.radio>label>input:focus~.icon{outline:0;border:1px solid #66afe9;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.radio.active>label>.icon{background-size:1rem 1rem;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSI0IiBmaWxsPSIjZmZmIi8+PC9zdmc+)}.radio.active .btn-default{-webkit-filter:brightness(75%);filter:brightness(75%)}.btn.readonly,.radio.disabled>label>.icon,.radio.readonly>label>.icon{filter:alpha(opacity=65);box-shadow:none;opacity:.65}label.btn>input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}",""]);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{value:{default:!0},checked:{twoWay:!0},button:{type:Boolean,coerce:o.coerce.boolean,default:!1},disabled:{type:Boolean,coerce:o.coerce.boolean,default:!1},name:{type:String,default:null},readonly:{type:Boolean,coerce:o.coerce.boolean,default:!1},type:{type:String,default:null}},computed:{active:function active(){return this.group?this.$parent.value===this.value:this.value===this.checked;},buttonStyle:function buttonStyle(){return this.button||this.group&&this.$parent.buttons;},group:function group(){return this.$parent&&this.$parent._radioGroup;},typeColor:function typeColor(){return this.type||this.$parent&&this.$parent.type||"default";}},created:function created(){var e=this.$parent;e&&e._btnGroup&&!e._checkboxGroup&&(e._radioGroup=!0);},ready:function ready(){this.$parent._radioGroup&&(this.$parent.value?this.checked=this.$parent.value===this.value:this.checked&&(this.$parent.value=this.value));},methods:{focus:function focus(){this.$els.input.focus();},toggle:function toggle(){this.disabled||(this.focus(),this.readonly||(this.checked=this.value,this.group&&(this.$parent.value=this.value)));}}};},function(e,t){e.exports="<label v-if=buttonStyle :class=\"['btn btn-'+typeColor,{active:active,disabled:disabled,readonly:readonly}]\" @click.prevent=toggle> <input type=radio autocomplete=off v-el:input v-show=!readonly :checked=active :value=value :name=name :readonly=readonly :disabled=disabled /> <slot></slot> </label> <div v-else :class=\"['radio',typeColor,{active:active,disabled:disabled,readonly:readonly}]\" @click.prevent=toggle> <label class=open> <input type=radio autocomplete=off v-el:input :checked=active :value=value :name=name :readonly=readonly :disabled=disabled /> <span class=\"icon dropdown-toggle\" :class=\"[active?'btn-'+typeColor:'',{bg:typeColor==='default'}]\"></span> <span v-if=\"active&&typeColor==='default'\" class=icon></span> <slot></slot> </label> </div>";},function(e,t,n){n(178),e.exports=n(180),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(196);},function(e,t,n){var o=n(179);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,"button.form-control.dropdown-toggle[_v-0f3bb707]{height:auto;padding-right:24px}button.form-control.dropdown-toggle[_v-0f3bb707]:after{content:' ';position:absolute;right:13px;top:50%;margin:-1px 0 0;border-top:4px dashed;border-top:4px solid\\9;border-right:4px solid transparent;border-left:4px solid transparent}.bs-searchbox[_v-0f3bb707]{position:relative;margin:4px 8px}.bs-searchbox .close[_v-0f3bb707]{position:absolute;top:0;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center}.bs-searchbox input[_v-0f3bb707]:focus,.secret:focus+button[_v-0f3bb707]{outline:0;border-color:#66afe9!important;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.secret[_v-0f3bb707]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}button>.close[_v-0f3bb707]{margin-left:5px}.notify.out[_v-0f3bb707]{position:relative}.notify.in[_v-0f3bb707],.notify>div[_v-0f3bb707]{position:absolute;width:96%;margin:0 2%;min-height:26px;padding:3px 5px;background:#f5f5f5;border:1px solid #e3e3e3;box-shadow:inset 0 1px 1px rgba(0,0,0,.05);pointer-events:none}.notify>div[_v-0f3bb707]{top:5px;z-index:1}.notify.in[_v-0f3bb707]{opacity:.9;bottom:5px}.btn-group-justified .dropdown-toggle>span[_v-0f3bb707]:not(.close){width:calc(100% - 18px);display:inline-block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-bottom:-4px}.btn-group-justified .dropdown-menu[_v-0f3bb707]{width:100%}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(181),r=o(i),a=n(95),s=n(27),l=o(s),c={};t.default={props:{value:{twoWay:!0},options:{type:Array,default:function _default(){return[];}},multiple:{type:Boolean,coerce:a.coerce.boolean,default:!1},clearButton:{type:Boolean,coerce:a.coerce.boolean,default:!1},closeOnSelect:{type:Boolean,coerce:a.coerce.boolean,default:!1},disabled:{type:Boolean,coerce:a.coerce.boolean,default:!1},lang:{type:String,default:navigator.language},limit:{type:Number,coerce:a.coerce.number,default:1024},name:{type:String,default:null},optionsLabel:{type:String,default:"label"},optionsValue:{type:String,default:"value"},parent:{default:!0},placeholder:{type:String,default:null},readonly:{type:Boolean,coerce:a.coerce.boolean,default:null},required:{type:Boolean,coerce:a.coerce.boolean,default:null},minSearch:{type:Number,coerce:a.coerce.number,default:0},search:{type:Boolean,coerce:a.coerce.boolean,default:!1},searchText:{type:String,default:null},url:{type:String,default:null}},data:function data(){return{loading:null,searchValue:null,show:!1,showNotify:!1,valid:null};},computed:{selected:function selected(){var e=this;if(0===this.options.length)return"";var t=[];return this.values.forEach(function(n){if(~["number","string"].indexOf("undefined"==typeof n?"undefined":(0,r.default)(n))){var o=null;e.options.some(function(t){if(t instanceof Object?t[e.optionsValue]===n:t===n)return o=t,!0;})&&t.push(o[e.optionsLabel]||o);}}),t.join(", ");},classes:function classes(){return[{open:this.show,disabled:this.disabled},this.class,this.isLi?"dropdown":this.inInput?"input-group-btn":"btn-group"];},inInput:function inInput(){return this.$parent._input;},isLi:function isLi(){return this.$parent._navbar||this.$parent.menu||this.$parent._tabset;},canSearch:function canSearch(){return this.minSearch?this.options.length>=this.minSearch:this.search;},limitText:function limitText(){return this.text.limit.replace("{{limit}}",this.limit);},showPlaceholder:function showPlaceholder(){return 0!==this.values.length&&this.hasParent?null:this.placeholder||this.text.notSelected;},text:function text(){return(0,a.translations)(this.lang);},hasParent:function hasParent(){return this.parent instanceof Array?this.parent.length:this.parent;},values:function values(){return this.value instanceof Array?this.value:null!==this.value&&void 0!==this.value?[this.value]:[];}},watch:{options:function options(e){var t=this,n=!1;e instanceof Array&&e.length&&e.map(function(e){if(!(e instanceof Object)){var o={};return o[t.optionsLabel]=e,o[t.optionsValue]=e,n=!0,o;}return e;}),n&&(this.options=e);},show:function show(e){e&&(this.$els.sel.focus(),this.$els.search&&this.$els.search.focus());},url:function url(){this.update();},value:function value(e){var t=this;this.$emit("change",e),this.$emit("selected",this.selected),this.value instanceof Array&&e.length>this.limit&&(this.showNotify=!0,c.limit&&clearTimeout(c.limit),c.limit=setTimeout(function(){c.limit=!1,t.showNotify=!1;},1500)),this.checkValue(),this.valid=this.validate();},valid:function valid(e,t){e!==t&&this._parent&&this._parent.validate();}},methods:{blur:function blur(){this.show=!1;},clear:function clear(){this.disabled||this.readonly||(this.value=this.value instanceof Array?[]:null,this.toggle());},clearSearch:function clearSearch(){this.searchValue="",this.$els.search.focus();},checkValue:function checkValue(){!this.multiple||this.value instanceof Array||(this.value=null===this.value||void 0===this.value?[]:[this.value]),!this.multiple&&this.value instanceof Array&&(this.value=this.value.length?this.value.pop():null),this.limit<1&&(this.limit=1),this.values.length>this.limit&&(this.value=this.value.slice(0,this.limit));},isSelected:function isSelected(e){return this.values.indexOf(e)>-1;},select:function select(e,t){this.value instanceof Array?(~this.value.indexOf(e)?this.value.$remove(e):this.value.push(e),this.closeOnSelect&&this.toggle()):(this.value=~["",null,void 0].indexOf(e)?t:e,this.toggle());},toggle:function toggle(){this.show=!this.show;},update:function update(){var e=this;this.url&&(this.loading=!0,(0,a.getJSON)(this.url).then(function(t){var n=[];t.forEach(function(t){void 0!==t[e.optionsValue]&&void 0!==t[e.optionsLabel]&&n.push(t);}),e.options=n,n.length||(e.value=e.value instanceof Array?[]:null);}).always(function(){e.loading=!1,e.checkValue();}));},validate:function validate(){return!this.required||(this.value instanceof Array?this.value.length>0:null!==this.value);}},created:function created(){this._select=!0,void 0!==this.value&&this.parent||(this.value=null),!this.multiple&&this.value instanceof Array&&(this.value=this.value.shift()),this.checkValue(),this.url&&this.update();for(var e=this.$parent;e&&!e._formGroup;){e=e.$parent;}e&&e._formGroup&&(e.children.push(this),this._parent=e);},ready:function ready(){var e=this;(0,l.default)(this.$els.select).onBlur(function(t){e.show=!1;});},beforeDestroy:function beforeDestroy(){this._parent&&this._parent.children.$remove(this),(0,l.default)(this.$els.select).offBlur();}};},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}t.__esModule=!0;var i=n(46),r=o(i),a=n(182),s=o(a),l="function"==typeof s.default&&"symbol"==_typeof(r.default)?function(e){return typeof e==="undefined"?"undefined":_typeof(e);}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":typeof e==="undefined"?"undefined":_typeof(e);};t.default="function"==typeof s.default&&"symbol"===l(r.default)?function(e){return"undefined"==typeof e?"undefined":l(e);}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":"undefined"==typeof e?"undefined":l(e);};},function(e,t,n){e.exports={default:n(183),__esModule:!0};},function(e,t,n){n(184),n(193),n(194),n(195),e.exports=n(33).Symbol;},function(e,t,n){"use strict";var o=n(32),i=n(55),r=n(41),a=n(31),s=n(54),l=n(185).KEY,c=n(42),u=n(69),p=n(73),d=n(70),f=n(74),h=n(81),v=n(186),b=n(187),m=n(188),y=n(191),g=n(38),x=n(62),w=n(44),_=n(45),k=n(58),S=n(86),M=n(192),O=n(37),$=n(60),D=M.f,j=O.f,C=S.f,_N=o.Symbol,B=o.JSON,L=B&&B.stringify,E="prototype",A=f("_hidden"),T=f("toPrimitive"),P={}.propertyIsEnumerable,R=u("symbol-registry"),V=u("symbols"),z=u("op-symbols"),I=Object[E],W="function"==typeof _N,F=o.QObject,Y=!F||!F[E]||!F[E].findChild,X=r&&c(function(){return 7!=k(j({},"a",{get:function get(){return j(this,"a",{value:7}).a;}})).a;})?function(e,t,n){var o=D(I,t);o&&delete I[t],j(e,t,n),o&&e!==I&&j(I,t,o);}:j,H=function H(e){var t=V[e]=k(_N[E]);return t._k=e,t;},G=W&&"symbol"==_typeof(_N.iterator)?function(e){return"symbol"==(typeof e==="undefined"?"undefined":_typeof(e));}:function(e){return e instanceof _N;},q=function q(e,t,n){return e===I&&q(z,t,n),g(e),t=w(t,!0),g(n),i(V,t)?(n.enumerable?(i(e,A)&&e[A][t]&&(e[A][t]=!1),n=k(n,{enumerable:_(0,!1)})):(i(e,A)||j(e,A,_(1,{})),e[A][t]=!0),X(e,t,n)):j(e,t,n);},U=function U(e,t){g(e);for(var n,o=m(t=x(t)),i=0,r=o.length;r>i;){q(e,n=o[i++],t[n]);}return e;},J=function J(e,t){return void 0===t?k(e):U(k(e),t);},Z=function Z(e){var t=P.call(this,e=w(e,!0));return!(this===I&&i(V,e)&&!i(z,e))&&(!(t||!i(this,e)||!i(V,e)||i(this,A)&&this[A][e])||t);},K=function K(e,t){if(e=x(e),t=w(t,!0),e!==I||!i(V,t)||i(z,t)){var n=D(e,t);return!n||!i(V,t)||i(e,A)&&e[A][t]||(n.enumerable=!0),n;}},Q=function Q(e){for(var t,n=C(x(e)),o=[],r=0;n.length>r;){i(V,t=n[r++])||t==A||t==l||o.push(t);}return o;},ee=function ee(e){for(var t,n=e===I,o=C(n?z:x(e)),r=[],a=0;o.length>a;){!i(V,t=o[a++])||n&&!i(I,t)||r.push(V[t]);}return r;};W||(_N=function N(){if(this instanceof _N)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function t(n){this===I&&t.call(z,n),i(this,A)&&i(this[A],e)&&(this[A][e]=!1),X(this,e,_(1,n));};return r&&Y&&X(I,e,{configurable:!0,set:t}),H(e);},s(_N[E],"toString",function(){return this._k;}),M.f=K,O.f=q,n(87).f=S.f=Q,n(190).f=Z,n(189).f=ee,r&&!n(53)&&s(I,"propertyIsEnumerable",Z,!0),h.f=function(e){return H(f(e));}),a(a.G+a.W+a.F*!W,{Symbol:_N});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;){f(te[ne++]);}for(var te=$(f.store),ne=0;te.length>ne;){v(te[ne++]);}a(a.S+a.F*!W,"Symbol",{for:function _for(e){return i(R,e+="")?R[e]:R[e]=_N(e);},keyFor:function keyFor(e){if(G(e))return b(R,e);throw TypeError(e+" is not a symbol!");},useSetter:function useSetter(){Y=!0;},useSimple:function useSimple(){Y=!1;}}),a(a.S+a.F*!W,"Object",{create:J,defineProperty:q,defineProperties:U,getOwnPropertyDescriptor:K,getOwnPropertyNames:Q,getOwnPropertySymbols:ee}),B&&a(a.S+a.F*(!W||c(function(){var e=_N();return"[null]"!=L([e])||"{}"!=L({a:e})||"{}"!=L(Object(e));})),"JSON",{stringify:function stringify(e){if(void 0!==e&&!G(e)){for(var t,n,o=[e],i=1;arguments.length>i;){o.push(arguments[i++]);}return t=o[1],"function"==typeof t&&(n=t),!n&&y(t)||(t=function t(e,_t2){if(n&&(_t2=n.call(this,e,_t2)),!G(_t2))return _t2;}),o[1]=t,L.apply(B,o);}}}),_N[E][T]||n(36)(_N[E],T,_N[E].valueOf),p(_N,"Symbol"),p(Math,"Math",!0),p(o.JSON,"JSON",!0);},function(e,t,n){var o=n(70)("meta"),i=n(39),r=n(55),a=n(37).f,s=0,l=Object.isExtensible||function(){return!0;},c=!n(42)(function(){return l(Object.preventExtensions({}));}),u=function u(e){a(e,o,{value:{i:"O"+ ++s,w:{}}});},p=function p(e,t){if(!i(e))return"symbol"==(typeof e==="undefined"?"undefined":_typeof(e))?e:("string"==typeof e?"S":"P")+e;if(!r(e,o)){if(!l(e))return"F";if(!t)return"E";u(e);}return e[o].i;},d=function d(e,t){if(!r(e,o)){if(!l(e))return!0;if(!t)return!1;u(e);}return e[o].w;},f=function f(e){return c&&h.NEED&&l(e)&&!r(e,o)&&u(e),e;},h=e.exports={KEY:o,NEED:!1,fastKey:p,getWeak:d,onFreeze:f};},function(e,t,n){var o=n(32),i=n(33),r=n(53),a=n(81),s=n(37).f;e.exports=function(e){var t=i.Symbol||(i.Symbol=r?{}:o.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:a.f(e)});};},function(e,t,n){var o=n(60),i=n(62);e.exports=function(e,t){for(var n,r=i(e),a=o(r),s=a.length,l=0;s>l;){if(r[n=a[l++]]===t)return n;}};},function(e,t,n){var o=n(60),i=n(189),r=n(190);e.exports=function(e){var t=o(e),n=i.f;if(n)for(var a,s=n(e),l=r.f,c=0;s.length>c;){l.call(e,a=s[c++])&&t.push(a);}return t;};},function(e,t){t.f=Object.getOwnPropertySymbols;},function(e,t){t.f={}.propertyIsEnumerable;},function(e,t,n){var o=n(64);e.exports=Array.isArray||function(e){return"Array"==o(e);};},function(e,t,n){var o=n(190),i=n(45),r=n(62),a=n(44),s=n(55),l=n(40),c=Object.getOwnPropertyDescriptor;t.f=n(41)?c:function(e,t){if(e=r(e),t=a(t,!0),l)try{return c(e,t);}catch(e){}if(s(e,t))return i(!o.f.call(e,t),e[t]);};},function(e,t){},function(e,t,n){n(186)("asyncIterator");},function(e,t,n){n(186)("observable");},function(e,t){e.exports='<div v-el:select="" :class=classes _v-0f3bb707=""> <button type=button class="form-control dropdown-toggle" :disabled="disabled || !hasParent" :readonly=readonly @click=toggle() @keyup.esc="show = false" _v-0f3bb707=""> <span class=btn-content v-html="loading ? text.loading : showPlaceholder || selected" _v-0f3bb707=""></span> <span v-if=clearButton&amp;&amp;values.length class=close @click=clear() _v-0f3bb707="">×</span> </button> <select v-el:sel="" v-model=value v-show=show name={{name}} class=secret :multiple=multiple :required=required :readonly=readonly :disabled=disabled _v-0f3bb707=""> <option v-if=required value="" _v-0f3bb707=""></option> <option v-for="option in options" :value=option[optionsValue]||option _v-0f3bb707="">{{ option[optionsLabel]||option }}</option> </select> <ul class=dropdown-menu _v-0f3bb707=""> <template v-if=options.length _v-0f3bb707=""> <li v-if=canSearch class=bs-searchbox _v-0f3bb707=""> <input type=text placeholder={{searchText||text.search}} class=form-control autocomplete=off v-el:search="" v-model=searchValue @keyup.esc="show = false" _v-0f3bb707=""> <span v-show=searchValue class=close @click=clearSearch _v-0f3bb707="">×</span> </li> <li v-if=required&amp;&amp;!clearButton _v-0f3bb707=""><a @mousedown.prevent="clear() &amp;&amp; blur()" _v-0f3bb707="">{{ placeholder || text.notSelected }}</a></li> <li v-for="option in options | filterBy searchValue" :id=option[optionsValue]||option _v-0f3bb707=""> <a @mousedown.prevent=select(option[optionsValue],option) _v-0f3bb707=""> <span v-html=option[optionsLabel]||option _v-0f3bb707=""></span> <span class="glyphicon glyphicon-ok check-mark" v-show=isSelected(option[optionsValue]) _v-0f3bb707=""></span> </a> </li> </template> <slot _v-0f3bb707=""></slot> <div v-if="showNotify &amp;&amp; !closeOnSelect" class="notify in" transition=fadein _v-0f3bb707="">{{limitText}}</div> </ul> <div v-if="showNotify &amp;&amp; closeOnSelect" class="notify out" transition=fadein _v-0f3bb707=""><div _v-0f3bb707="">{{limitText}}</div></div> </div>';},function(e,t,n){e.exports=n(198),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(199);},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function data(){return{index:0,show:!1};},computed:{show:function show(){return this.$parent.index===this.index;}},ready:function ready(){for(var e in this.$parent.$children){if(this.$parent.$children[e]===this){this.index=parseInt(e,10);break;}}this.$parent.indicator.push(this.index),0===this.index&&this.$el.classList.add("active");}};},function(e,t){e.exports="<div class=item> <slot></slot> </div>";},function(e,t,n){e.exports=n(201),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(204);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(202);var o=n(95),i=500;t.default={props:{size:{type:String,default:"md"},text:{type:String,default:""},fixed:{type:Boolean,coerce:o.coerce.boolean,default:!1}},data:function data(){return{active:!1};},computed:{spinnerSize:function spinnerSize(){return this.size?"spinner-"+this.size:"spinner-sm";}},ready:function ready(){this._body=document.querySelector("body"),this._bodyOverflow=this._body.style.overflowY||"";},methods:{getMinWait:function getMinWait(e){return e=e||0,new Date().getTime()-this._started.getTime()<i?i-parseInt(new Date().getTime()-this._started.getTime(),10)+e:0+e;},show:function show(e){e&&e.text&&(this.text=e.text),e&&e.size&&(this.size=e.size),e&&e.fixed&&(this.fixed=e.fixed),this._body.style.overflowY="hidden",this._started=new Date(),this.active=!0,this.$root.$broadcast("shown::spinner");},hide:function hide(){var e=this,t=0;this._spinnerAnimation=setTimeout(function(){e.active=!1,e._body.style.overflowY=e._bodyOverflow,e.$root.$broadcast("hidden::spinner");},this.getMinWait(t));}},events:{"show::spinner":function showSpinner(e){this.show(e);},"hide::spinner":function hideSpinner(){this.hide();},"start::ajax":function startAjax(e){this.show(e);},"end::ajax":function endAjax(){this.hide();}},beforeDestroy:function beforeDestroy(){clearTimeout(this._spinnerAnimation),this._body.style.overflowY=this._bodyOverflow;}};},function(e,t,n){var o=n(203);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,'/*!\r\n *\r\n * Spinner\r\n * With fallback to IE9\r\n *\r\n */@keyframes spin{to{transform:rotate(1turn)}}.spinner-gritcode{top:0;left:0;bottom:0;right:0;z-index:9998;position:absolute;width:100%;text-align:center;background:hsla(0,0%,100%,.9)}.spinner-gritcode.spinner-fixed{position:fixed}.spinner-gritcode .spinner-wrapper{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)}.spinner-gritcode .spinner-circle{position:relative;border:4px solid #ccc;border-right-color:#337ab7;border-radius:50%;display:inline-block;animation:spin .6s linear;animation-iteration-count:infinite;width:3em;height:3em;z-index:2}.spinner-gritcode .spinner-text{position:relative;text-align:center;margin-top:.5em;z-index:2;width:100%;font-size:95%;color:#337ab7}.spinner-gritcode.spinner-sm .spinner-circle{width:1.5em;height:1.5em}.spinner-gritcode.spinner-md .spinner-circle{width:2em;height:2em}.spinner-gritcode.spinner-lg .spinner-circle{width:2.5em;height:2.5em}.spinner-gritcode.spinner-xl .spinner-circle{width:3.5em;height:3.5em}.ie9 .spinner-gritcode .spinner-circle,.lt-ie10 .spinner-gritcode .spinner-circle,.no-csstransforms3d .spinner-gritcode .spinner-circle,.no-csstransitions .spinner-gritcode .spinner-circle,.oldie .spinner-gritcode .spinner-circle{background:url("http://i2.wp.com/www.thegreatnovelingadventure.com/wp-content/plugins/wp-polls/images/loading.gif") 50% no-repeat;animation:none;margin-left:0;margin-top:5px;border:none;width:32px;height:32px}',""]);},function(e,t){e.exports="<div :class=\"['spinner spinner-gritcode',spinnerSize,{'spinner-fixed':fixed}]\" v-show=active> <div class=spinner-wrapper> <div class=spinner-circle></div> <div class=spinner-text>{{text}}</div> </div> </div>";},function(e,t,n){e.exports=n(206),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(207);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{header:{type:String},disabled:{type:Boolean,coerce:o.coerce.boolean,default:!1}},computed:{active:function active(){return this._tabset.show===this;},index:function index(){return this._tabset.tabs.indexOf(this);},show:function show(){return this._tabset&&this._tabset.show===this;},transition:function transition(){return this._tabset?this._tabset.effect:null;}},created:function created(){this._ingroup=this.$parent&&this.$parent._tabgroup;for(var e=this;e&&e._tabset!==!0&&e.$parent;){e=e.$parent;}e._tabset?(e.tabs.push(this),this._ingroup?~e.headers.indexOf(this.$parent)||e.headers.push(this.$parent):e.headers.push(this),this._tabset=e):(this._tabset={},console.warn('Warning: "tab" depend on "tabset" to work properly.')),this._ingroup&&this.$parent.tabs.push(this);},beforeDestroy:function beforeDestroy(){this._tabset.active===this.index&&(this._tabset.active=0),this._ingroup&&this.$parent.tabs.$remove(this),this._tabset.tabs.$remove(this);}};},function(e,t){e.exports='<div role=tabpanel class="tab-pane active" v-show=show :class={hide:!show} :transition=transition> <slot></slot> </div>';},function(e,t,n){n(209),e.exports=n(211),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(212);},function(e,t,n){var o=n(210);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".nav-tabs[_v-7ecb8635]{margin-bottom:15px}",""]);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95);t.default={props:{disabled:{type:Boolean,coerce:o.coerce.boolean,default:!1},header:{type:String}},data:function data(){return{tabs:[],show:!1};},computed:{active:function active(){return~this.tabs.indexOf(this._tabset.show);}},created:function created(){this._tabgroup=!0;var e=this.$parent&&this.$parent._tabset===!0?this.$parent:{};for(this.$parent&&this.$parent._tabgroup&&console.error("Can't nest tabgroups.");e&&!e._tabset&&e.$parent;){e=e.$parent;}e._tabset?this._tabset=e:(this._tabset={},this.show=!0,console.warn("Warning: tabgroup depend on tabset to work properly."));},methods:{blur:function blur(){this.show=!1;},toggle:function toggle(){this.show=!this.show;}}};},function(e,t){e.exports='<slot _v-7ecb8635=""></slot>';},function(e,t,n){n(214),e.exports=n(216),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(217);},function(e,t,n){var o=n(215);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".nav-tabs[_v-e8aecb90]{margin-bottom:15px}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(95),r=n(130),a=o(r);t.default={components:{dropdown:a.default},props:{navStyle:{type:String,default:"tabs"},effect:{type:String,default:"fadein"},active:{twoWay:!0,type:Number,coerce:i.coerce.number,default:0}},data:function data(){return{show:null,headers:[],tabs:[]};},created:function created(){this._tabset=!0;},watch:{active:function active(e){this.show=this.tabs[e];}},ready:function ready(){this.show=this.tabs[this.active];},methods:{select:function select(e){e.disabled||(this.active=e.index);}}};},function(e,t){e.exports=' <ul class="nav nav-{{navStyle}}" role=tablist _v-e8aecb90=""> <template v-for="t in headers" _v-e8aecb90=""> <li v-if=!t._tabgroup :class="{active:t.active, disabled:t.disabled}" @click.prevent=select(t) _v-e8aecb90=""> <a href=# _v-e8aecb90=""><slot name=header _v-e8aecb90="">{{{t.header}}}</slot></a> </li> <dropdown v-else="" :text=t.header :class={active:t.active} :disabled=t.disabled _v-e8aecb90=""> <li v-for="tab in t.tabs" :class={disabled:tab.disabled} _v-e8aecb90=""><a href=# @click.prevent=select(tab) _v-e8aecb90="">{{tab.header}}</a></li> </dropdown> </template> </ul> <div class=tab-content v-el:tab-content="" _v-e8aecb90=""> <slot _v-e8aecb90=""></slot> </div>';},function(e,t,n){n(219),e.exports=n(221),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(222);},function(e,t,n){var o=n(220);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".tooltip.bottom,.tooltip.left,.tooltip.right,.tooltip.top{opacity:.9}.fadein-enter{-webkit-animation:fadein-in .3s ease-in;animation:fadein-in .3s ease-in}.fadein-leave{-webkit-animation:fadein-out .3s ease-out;animation:fadein-out .3s ease-out}@-webkit-keyframes fadein-in{0%{opacity:0}to{opacity:.9}}@keyframes fadein-in{0%{opacity:0}to{opacity:.9}}@-webkit-keyframes fadein-out{0%{opacity:.9}to{opacity:0}}@keyframes fadein-out{0%{opacity:.9}to{opacity:0}}",""]);},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var i=n(167),r=o(i);t.default={mixins:[r.default],props:{trigger:{type:String,default:"hover"},effect:{type:String,default:"scale"}}};},function(e,t){e.exports="<span v-el:trigger> <slot></slot> </span> <div v-el:popover v-if=show style=display:block :class=\"['tooltip',placement]\" :transition=effect> <div class=tooltip-arrow></div> <div class=tooltip-inner> <slot name=content>{{{content}}}</slot> </div> </div>";},function(e,t,n){n(224),e.exports=n(226),e.exports.__esModule&&(e.exports=e.exports.default),("function"==typeof e.exports?e.exports.options:e.exports).template=n(227);},function(e,t,n){var o=n(225);"string"==typeof o&&(o=[[e.id,o,""]]);n(104)(o,{});o.locals&&(e.exports=o.locals);},function(e,t,n){t=e.exports=n(103)(),t.push([e.id,".dropdown-menu>li>a{cursor:pointer}",""]);},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(95),i=window.Vue,r=200;t.default={created:function created(){this.items=this.primitiveData;},partials:{default:'<span v-html="item | highlight value"></span>'},props:{value:{twoWay:!0,type:String,default:""},data:{type:Array},limit:{type:Number,default:8},async:{type:String},template:{type:String},templateName:{type:String,default:"default"},key:{type:String,default:null},matchCase:{type:Boolean,coerce:o.coerce.boolean,default:!1},matchStart:{type:Boolean,coerce:o.coerce.boolean,default:!1},onHit:{type:Function,default:function _default(e){this.reset(),this.value=e;}},placeholder:{type:String},delay:{type:Number,default:r,coerce:o.coerce.number}},data:function data(){return{showDropdown:!1,noResults:!0,current:0,items:[]};},computed:{primitiveData:function primitiveData(){var e=this;if(this.data)return this.data.filter(function(t){t=e.matchCase?t:t.toLowerCase();var n=e.matchCase?e.value:e.value.toLowerCase();return e.matchStart?0===t.indexOf(n):t.indexOf(n)!==-1;}).slice(0,this.limit);}},ready:function ready(){this.templateName&&"default"!==this.templateName&&i.partial(this.templateName,this.template);},methods:{update:function update(){return this.value?(this.data&&(this.items=this.primitiveData,this.showDropdown=this.items.length>0),void(this.async&&this.query())):(this.reset(),!1);},query:(0,o.delayer)(function(){var e=this;(0,o.getJSON)(this.async+this.value).then(function(t){e.items=(e.key?t[e.key]:t).slice(0,e.limit),e.showDropdown=e.items.length;});},"delay",r),reset:function reset(){this.items=[],this.value="",this.loading=!1,this.showDropdown=!1;},setActive:function setActive(e){this.current=e;},isActive:function isActive(e){return this.current===e;},hit:function hit(e){e.preventDefault(),this.onHit(this.items[this.current],this);},up:function up(){this.current>0&&this.current--;},down:function down(){this.current<this.items.length-1&&this.current++;}},filters:{highlight:function highlight(e,t){return e.replace(new RegExp("("+t+")","gi"),"<strong>$1</strong>");}}};},function(e,t){e.exports='<div style="position: relative" v-bind:class="{\'open\':showDropdown}"> <input type=text class=form-control :placeholder=placeholder autocomplete=off v-model=value @input=update @keydown.up=up @keydown.down=down @keydown.enter=hit @keydown.esc=reset @blur="showDropdown = false"/> <ul class=dropdown-menu v-el:dropdown> <li v-for="item in items" v-bind:class="{\'active\': isActive($index)}"> <a @mousedown.prevent=hit @mousemove=setActive($index)> <partial :name=templateName></partial> </a> </li> </ul> </div>';}]);});

},{}],7:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueUploadComponent=e():t.VueUploadComponent=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/dist/",e(0)}([function(t,e,n){"use strict";t.exports=n(73)},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(49),o=n(15);t.exports=function(t){return r(o(t))}},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(6),o=n(12);t.exports=n(4)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(8),o=n(30),i=n(24),s=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return s(t,e,n)}catch(u){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(22)("wks"),o=n(13),i=n(1).Symbol,s="function"==typeof i,u=t.exports=function(t){return r[t]||(r[t]=s&&i[t]||(s?i:o)("Symbol."+t))};u.store=r},function(t,e,n){var r=n(10);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(35),o=n(16);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(6).f,o=n(2),i=n(7)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(22)("keys"),o=n(13);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(10);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(1),o=n(14),i=n(18),s=n(26),u=n(6).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||u(e,t,{value:s.f(t)})}},function(t,e,n){e.f=n(7)},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(10),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(1),o=n(14),i=n(46),s=n(5),u="prototype",a=function(t,e,n){var f,c,l,p=t&a.F,d=t&a.G,h=t&a.S,v=t&a.P,m=t&a.B,y=t&a.W,b=d?o:o[e]||(o[e]={}),g=b[u],x=d?r:h?r[e]:(r[e]||{})[u];d&&(n=e);for(f in n)c=!p&&x&&void 0!==x[f],c&&f in b||(l=c?x[f]:n[f],b[f]=d&&"function"!=typeof x[f]?n[f]:m&&c?i(l,r):y&&x[f]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[u]=t[u],e}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((b.virtual||(b.virtual={}))[f]=l,t&a.R&&g&&!g[f]&&s(g,f,l)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){t.exports=!n(4)&&!n(9)(function(){return 7!=Object.defineProperty(n(28)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(18),o=n(29),i=n(36),s=n(5),u=n(2),a=n(17),f=n(51),c=n(20),l=n(58),p=n(7)("iterator"),d=!([].keys&&"next"in[].keys()),h="@@iterator",v="keys",m="values",y=function(){return this};t.exports=function(t,e,n,b,g,x,_){f(n,e,b);var w,S,E,O=function(t){if(!d&&t in U)return U[t];switch(t){case v:return function(){return new n(this,t)};case m:return function(){return new n(this,t)}}return function(){return new n(this,t)}},A=e+" Iterator",j=g==m,T=!1,U=t.prototype,P=U[p]||U[h]||g&&U[g],k=P||O(g),M=g?j?O("entries"):k:void 0,C="Array"==e?U.entries||P:P;if(C&&(E=l(C.call(new t)),E!==Object.prototype&&(c(E,A,!0),r||u(E,p)||s(E,p,y))),j&&P&&P.name!==m&&(T=!0,k=function(){return P.call(this)}),r&&!_||!d&&!T&&U[p]||s(U,p,k),a[e]=k,a[A]=y,g)if(w={values:j?k:O(m),keys:x?k:O(v),entries:M},_)for(S in w)S in U||i(U,S,w[S]);else o(o.P+o.F*(d||T),e,w);return w}},function(t,e,n){var r=n(8),o=n(55),i=n(16),s=n(21)("IE_PROTO"),u=function(){},a="prototype",f=function(){var t,e=n(28)("iframe"),r=i.length,o=">";for(e.style.display="none",n(48).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+o),t.close(),f=t.F;r--;)delete f[a][i[r]];return f()};t.exports=Object.create||function(t,e){var n;return null!==t?(u[a]=r(t),n=new u,u[a]=null,n[s]=t):n=f(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(35),o=n(16).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(2),o=n(3),i=n(45)(!1),s=n(21)("IE_PROTO");t.exports=function(t,e){var n,u=o(t),a=0,f=[];for(n in u)n!=s&&r(u,n)&&f.push(n);for(;e.length>a;)r(u,n=e[a++])&&(~i(f,n)||f.push(n));return f}},function(t,e,n){t.exports=n(5)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(40),i=r(o);e["default"]={props:{title:{type:String,"default":"Upload file"},name:{type:String,"default":"file"},drop:{"default":!1},extensions:{"default":function(){return[]}},postAction:{type:String},putAction:{type:String},accept:{type:String},multiple:{type:Boolean},timeout:{type:Number,"default":0},size:{type:Number},events:{type:Object,"default":function(){}}},components:{inputFile:{template:'<input type="file" :name="$parent.name" :id="$parent.id||$parent.name" :accept="$parent.accept" @change="change" :multiple="$parent.multiple && $parent.$mode == \'html5\'">',methods:{change:function(t){this.$parent._addFileUploads(t.target),this.$destroy()}}}},data:function(){return{files:[],active:!1,uploaded:!0,dropActive:!1,dropElement:!1,request:{data:{},headers:{}}}},ready:function(){this._drop(this.drop)},init:function(){var t=document.createElement("input");t.type="file",window.FormData&&t.files?this.$mode="html5":this.$mode="html4",this._index=0,this._dropActive=0,this._files={}},beforeDestroy:function(){this.active=!1,this.files=[]},watch:{drop:function(t){this._drop(t)},files:function(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];r.errno||r.success||(this.uploaded=!1),e.push(r.id)}for(var o in this._files)if(-1==e.indexOf(o)){var r=this._files[o]._file;r.removed=!0;var i=this._files[o].xhr;if(i)try{i.abort(),i.timeout=1}catch(s){}var u=this._files[o].iframe;u&&u.onabort({type:"abort"}),delete this._files[o],this._uploadEvents("removeFileUpload",r)}this._index=0},active:function(t,e){t&&!e&&this._fileUploads()},uploaded:function(t){t&&(this.active=!1)}},methods:{clear:function(){this.files.length&&this.files.splice(0,this.files.length)},_uploadEvents:function(t,e){this.$dispatch&&this.$dispatch(t,e,this),this[t]&&this[t](e),this.events&&this.events[t]&&this.events[t](e,this)},_drop:function(t){if(this.dropElement&&"html5"===this.$mode)try{window.document.removeEventListener("dragenter",this._onDragenter,!1),window.document.removeEventListener("dragleave",this._onDragleave,!1),this.dropElement.removeEventListener("dragover",this._onDragover,!1),this.dropElement.removeEventListener("drop",this._onDrop,!1)}catch(e){}return t?("string"==typeof t?this.dropElement=document.querySelector(t)||this.$root.$el.querySelector(t):"boolean"==typeof t?this.dropElement=this.$parent.$el:this.dropElement=this.drop,void(this.dropElement&&"html5"===this.$mode&&(window.document.addEventListener("dragenter",this._onDragenter,!1),window.document.addEventListener("dragleave",this._onDragleave,!1),this.dropElement.addEventListener("dragover",this._onDragover,!1),this.dropElement.addEventListener("drop",this._onDrop,!1)))):void(this.dropElement=!1)},_onDragenter:function(t){this._dropActive++,this.dropActive=!!this._dropActive,t.preventDefault()},_onDragleave:function(t){t.preventDefault(),this._dropActive--,("HTML"==t.target.nodeName||0==t.screenX&&0==t.screenY)&&(this.dropActive=!!this._dropActive)},_onDragover:function(t){t.preventDefault()},_addFileUpload:function(t,e){var n={size:-1,name:"Filename",progress:"0.00",speed:0,active:!1,error:"",errno:"",success:!1,data:{},request:{headers:{},data:{}}};for(var r in n)"undefined"==typeof e[r]&&(e[r]=n[r]);e.id||(e.id=Math.random().toString(36).substr(2)),this.multiple||this.clear(),this._files[e.id]=t,e=this.files[this.files.push(e)-1],this._files[e.id]._file=e,this._uploadEvents("addFileUpload",e)},_onDrop:function(t){if(this._dropActive=0,this.dropActive=!1,t.preventDefault(),t.dataTransfer.files.length)for(var e=0;e<t.dataTransfer.files.length;e++){var n=t.dataTransfer.files[e];if(this._addFileUpload({file:n},{size:n.size,name:n.name}),!this.multiple)break}},_addFileUploads:function(t){var e=this.$options.components.inputFile;if(new e({parent:this,el:t}),this.uploaded=!1,t.files)for(var n=0;n<t.files.length;n++){var r=t.files[n];this._addFileUpload({file:r,el:t},{size:r.size,name:r.name})}else this._addFileUpload({el:t},{size:-1,name:t.value.replace(/^.*?([^\/\\\r\n]+)$/,"$1")})},_fileUploads:function(){if(this.active){for(;this._index<this.files.length;this._index++){var t=this.files[this._index];if(!(t.active||t.success||t.errno)){if(!(this.size&&this.size>0&&t.size>=0&&t.size>this.size)){if(this.extensions&&(this.extensions.length||"undefined"==typeof this.extensions.length)){var e=this.extensions;if("object"==("undefined"==typeof e?"undefined":(0,i["default"])(e))&&e instanceof RegExp||("string"==typeof e&&(e=e.split(",").map(function(t){return t.trim()}).filter(function(t){return t})),e=new RegExp("\\.("+e.join("|").replace(/\./g,"\\.")+")$","i")),-1==t.name.search(e)){t.error="Extension",t.errno="extension";continue}}if("html5"==this.$mode)if(this.putAction||t.putAction)this._fileUploadPut(t);else{if(!this.postAction&&!t.postAction){t.error="Not Support",t.errno="not_support";continue}this._fileUploadHtml5(t)}else{if(!this.postAction&&!t.postAction){t.error="Not Support",t.errno="not_support";continue}this._fileUploadHtml4(t)}return}t.error="Size",t.errno="size"}}this.active=!1,this.uploaded=!0}},_fileUploadXhr:function(t,e,n){var r=this,o=this._files[e.id],i=!1,s=0,u=0;t.upload.onprogress=function(n){if(e.removed)return void t.abort();if(!r.active||!e.active)return void t.abort();if(n.lengthComputable){e.progress=(n.loaded/n.total*100).toFixed(2);var o=Math.round(Date.now()/1e3);o!=s&&(e.speed=n.loaded-u,u=n.loaded,s=o)}r._uploadEvents("fileUploadProgress",e)};var a=function(n){switch(n.type){case"timeout":e.errno="timeout",e.error="Timeout";break;case"abort":e.errno="abort",e.error="Abort";break;case"error":t.status?t.status>=500?(e.errno="server",e.error="Server"):t.status>=400&&(e.errno="denied",e.error="Denied"):(e.errno="network",e.error="Network");break;default:t.status>=500?(e.errno="server",e.error="Server"):t.status>=400?(e.errno="denied",e.error="Denied"):(e.progress="100.00",e.success=!0)}if(e.active=!1,t.responseText){var o=t.getResponseHeader("Content-Type");o&&-1!=o.indexOf("/json")?e.data=JSON.parse(t.responseText):e.data=t.responseText}i||(i=!0,e.removed||r._uploadEvents("afterFileUpload",e),setTimeout(function(){r._fileUploads()},50))};t.onload=a,t.onerror=a,t.onabort=a,t.ontimeout=a,this.timeout&&(t.timeout=this.timeout),t.onload=a,t.onerror=a,t.onabort=a,t.ontimeout=a,this.timeout&&(t.timeout=this.timeout),t.setRequestHeader("X-Requested-With","XMLHttpRequest");for(var f in this.request.headers)t.setRequestHeader(f,this.request.headers[f]);for(var f in e.request.headers)t.setRequestHeader(f,e.request.headers[f]);t.send(n),e.active=!0,o.xhr=t;var c=setInterval(function(){r.active&&e.active&&!e.success&&!e.errno||(clearInterval(c),e.success||e.errno||t.abort())},100);this._uploadEvents("beforeFileUpload",e)},_fileUploadPut:function(t){var e={};for(var n in this.request.data)e[n]=this.request.data[n];for(var r in t.request.data)e[r]=t.request.data[r];var o=[];for(var i in e)null!==e[i]&&"undefined"!=typeof e[i]&&o.push(encodeURIComponent(i)+"="+encodeURIComponent(e[i]));var s=o.length?"?"+o.join("&"):"",u=new XMLHttpRequest;u.open("PUT",(t.putAction||this.putAction)+s),this._fileUploadXhr(u,t,this._files[t.id].file)},_fileUploadHtml5:function(t){var e=new window.FormData;e.append(this.name,this._files[t.id].file);for(var n in this.request.data)e.append(n,this.request.data[n]);for(var n in t.request.data)e.append(n,t.request.data[n]);var r=new XMLHttpRequest;r.open("POST",t.postAction||this.postAction),this._fileUploadXhr(r,t,e)},_fileUploadHtml4:function(t){var e=this,n=this._files[t.id],r=!1,o=function(t){27==t.keyCode&&t.preventDefault()},i=document.createElement("iframe");i.id="upload-iframe-"+t.id,i.name="upload-iframe-"+t.id,i.src="about:blank",i.style.width="1px",i.style.height="1px",i.style.top="-9999px",i.style.left="-9999px",i.style.position="absolute",i.style.marginTop="-9999em";var s=document.createElement("form");s.action=t.postAction||this.postAction,s.name="upload-form-"+t.id,s.setAttribute("method","POST"),s.setAttribute("target","upload-iframe-"+t.id),s.setAttribute("enctype","multipart/form-data"),s.appendChild(n.el);for(var u in this.request.data){var a=document.createElement("input");a.type="hidden",a.name=u,a.value=this.request.data[u],s.appendChild(a)}for(var u in t.request.data){var a=document.createElement("input");a.type="hidden",a.name=u,a.value=t.request.data[u],s.appendChild(a)}var f=function(){var t;try{i.contentWindow&&(t=i.contentWindow.document)}catch(e){}if(!t)try{t=i.contentDocument?i.contentDocument:i.document}catch(e){t=i.document}return t&&t.body?t.body.innerHTML:null},c=function(n){switch(n.type){case"abort":t.errno="abort",t.error="Abort";break;case"error":var s=f();t.errno||(null===s?(t.errno="network",t.error="Network"):(t.errno="denied",t.error="Denied"));break;default:var s=f();t.errno||(null===s?(t.errno="network",t.error="Network"):(t.progress="100.00",t.success=!0))}if(t.active=!1,"undefined"!=typeof s){if(s&&"{"==s.substr(0,1)&&"}"==s.substr(s.length-1,1))try{s=JSON.parse(s)}catch(u){}t.data=s}r||(document.body.removeEventListener("keydown",o),document.body.removeEventListener("keydown",o),r=!0,i.parentNode&&i.parentNode.removeChild(i),t.removed||e._uploadEvents("afterFileUpload",t),setTimeout(function(){e._fileUploads()},50))};setTimeout(function(){document.body.appendChild(i).appendChild(s).submit(),i.onload=c,i.onerror=c,i.onabort=c,t.active=!0,n.iframe=i,document.body.addEventListener("keydown",o);var r=setInterval(function(){e.active&&t.active&&!t.success&&!t.errno||(clearInterval(r),t.success||t.errno||i.onabort({type:"abort"}))},50);e._uploadEvents("beforeFileUpload",t)},10)}}}},function(t,e,n){t.exports={"default":n(41),__esModule:!0}},function(t,e,n){t.exports={"default":n(42),__esModule:!0}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(39),i=r(o),s=n(38),u=r(s),a="function"==typeof u["default"]&&"symbol"==typeof i["default"]?function(t){return typeof t}:function(t){return t&&"function"==typeof u["default"]&&t.constructor===u["default"]?"symbol":typeof t};e["default"]="function"==typeof u["default"]&&"symbol"===a(i["default"])?function(t){return"undefined"==typeof t?"undefined":a(t)}:function(t){return t&&"function"==typeof u["default"]&&t.constructor===u["default"]?"symbol":"undefined"==typeof t?"undefined":a(t)}},function(t,e,n){n(66),n(64),n(67),n(68),t.exports=n(14).Symbol},function(t,e,n){n(65),n(69),t.exports=n(26).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(3),o=n(61),i=n(60);t.exports=function(t){return function(e,n,s){var u,a=r(e),f=o(a.length),c=i(s,f);if(t&&n!=n){for(;f>c;)if(u=a[c++],u!=u)return!0}else for(;f>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(43);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(11),o=n(34),i=n(19);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var s,u=n(t),a=i.f,f=0;u.length>f;)a.call(t,s=u[f++])&&e.push(s);return e}},function(t,e,n){t.exports=n(1).document&&document.documentElement},function(t,e,n){var r=n(27);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(27);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(32),o=n(12),i=n(20),s={};n(5)(s,n(7)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(s,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(11),o=n(3);t.exports=function(t,e){for(var n,i=o(t),s=r(i),u=s.length,a=0;u>a;)if(i[n=s[a++]]===e)return n}},function(t,e,n){var r=n(13)("meta"),o=n(10),i=n(2),s=n(6).f,u=0,a=Object.isExtensible||function(){return!0},f=!n(9)(function(){return a(Object.preventExtensions({}))}),c=function(t){s(t,r,{value:{i:"O"+ ++u,w:{}}})},l=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!a(t))return"F";if(!e)return"E";c(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!a(t))return!0;if(!e)return!1;c(t)}return t[r].w},d=function(t){return f&&h.NEED&&a(t)&&!i(t,r)&&c(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:d}},function(t,e,n){var r=n(6),o=n(8),i=n(11);t.exports=n(4)?Object.defineProperties:function(t,e){o(t);for(var n,s=i(e),u=s.length,a=0;u>a;)r.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var r=n(19),o=n(12),i=n(3),s=n(24),u=n(2),a=n(30),f=Object.getOwnPropertyDescriptor;e.f=n(4)?f:function(t,e){if(t=i(t),e=s(e,!0),a)try{return f(t,e)}catch(n){}return u(t,e)?o(!r.f.call(t,e),t[e]):void 0}},function(t,e,n){var r=n(3),o=n(33).f,i={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],u=function(t){try{return o(t)}catch(e){return s.slice()}};t.exports.f=function(t){return s&&"[object Window]"==i.call(t)?u(t):o(r(t))}},function(t,e,n){var r=n(2),o=n(62),i=n(21)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e,n){var r=n(23),o=n(15);t.exports=function(t){return function(e,n){var i,s,u=String(o(e)),a=r(n),f=u.length;return 0>a||a>=f?t?"":void 0:(i=u.charCodeAt(a),55296>i||i>56319||a+1===f||(s=u.charCodeAt(a+1))<56320||s>57343?t?u.charAt(a):i:t?u.slice(a,a+2):(i-55296<<10)+(s-56320)+65536)}}},function(t,e,n){var r=n(23),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),0>t?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(23),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(15);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(44),o=n(52),i=n(17),s=n(3);t.exports=n(31)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){},function(t,e,n){"use strict";var r=n(59)(!0);n(31)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(1),o=n(2),i=n(4),s=n(29),u=n(36),a=n(54).KEY,f=n(9),c=n(22),l=n(20),p=n(13),d=n(7),h=n(26),v=n(25),m=n(53),y=n(47),b=n(50),g=n(8),x=n(3),_=n(24),w=n(12),S=n(32),E=n(57),O=n(56),A=n(6),j=n(11),T=O.f,U=A.f,P=E.f,k=r.Symbol,M=r.JSON,C=M&&M.stringify,F="prototype",D=d("_hidden"),N=d("toPrimitive"),q={}.propertyIsEnumerable,$=c("symbol-registry"),L=c("symbols"),R=c("op-symbols"),I=Object[F],z="function"==typeof k,H=r.QObject,W=!H||!H[F]||!H[F].findChild,B=i&&f(function(){return 7!=S(U({},"a",{get:function(){return U(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=T(I,e);r&&delete I[e],U(t,e,n),r&&t!==I&&U(I,e,r)}:U,X=function(t){var e=L[t]=S(k[F]);return e._k=t,e},J=z&&"symbol"==typeof k.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof k},G=function(t,e,n){return t===I&&G(R,e,n),g(t),e=_(e,!0),g(n),o(L,e)?(n.enumerable?(o(t,D)&&t[D][e]&&(t[D][e]=!1),n=S(n,{enumerable:w(0,!1)})):(o(t,D)||U(t,D,w(1,{})),t[D][e]=!0),B(t,e,n)):U(t,e,n)},K=function(t,e){g(t);for(var n,r=y(e=x(e)),o=0,i=r.length;i>o;)G(t,n=r[o++],e[n]);return t},Y=function(t,e){return void 0===e?S(t):K(S(t),e)},V=function(t){var e=q.call(this,t=_(t,!0));return this===I&&o(L,t)&&!o(R,t)?!1:e||!o(this,t)||!o(L,t)||o(this,D)&&this[D][t]?e:!0},Q=function(t,e){if(t=x(t),e=_(e,!0),t!==I||!o(L,e)||o(R,e)){var n=T(t,e);return!n||!o(L,e)||o(t,D)&&t[D][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=P(x(t)),r=[],i=0;n.length>i;)o(L,e=n[i++])||e==D||e==a||r.push(e);return r},tt=function(t){for(var e,n=t===I,r=P(n?R:x(t)),i=[],s=0;r.length>s;)o(L,e=r[s++])&&(n?o(I,e):!0)&&i.push(L[e]);return i};z||(k=function(){if(this instanceof k)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===I&&e.call(R,n),o(this,D)&&o(this[D],t)&&(this[D][t]=!1),B(this,t,w(1,n))};return i&&W&&B(I,t,{configurable:!0,set:e}),X(t)},u(k[F],"toString",function(){return this._k}),O.f=Q,A.f=G,n(33).f=E.f=Z,n(19).f=V,n(34).f=tt,i&&!n(18)&&u(I,"propertyIsEnumerable",V,!0),h.f=function(t){return X(d(t))}),s(s.G+s.W+s.F*!z,{Symbol:k});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)d(et[nt++]);for(var et=j(d.store),nt=0;et.length>nt;)v(et[nt++]);s(s.S+s.F*!z,"Symbol",{"for":function(t){return o($,t+="")?$[t]:$[t]=k(t)},keyFor:function(t){if(J(t))return m($,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){W=!0},useSimple:function(){W=!1}}),s(s.S+s.F*!z,"Object",{create:Y,defineProperty:G,defineProperties:K,getOwnPropertyDescriptor:Q,getOwnPropertyNames:Z,getOwnPropertySymbols:tt}),M&&s(s.S+s.F*(!z||f(function(){var t=k();return"[null]"!=C([t])||"{}"!=C({a:t})||"{}"!=C(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!J(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&b(e)||(e=function(t,e){return n&&(e=n.call(this,t,e)),J(e)?void 0:e}),r[1]=e,C.apply(M,r)}}}),k[F][N]||n(5)(k[F],N,k[F].valueOf),l(k,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){n(25)("asyncIterator")},function(t,e,n){n(25)("observable")},function(t,e,n){n(63);for(var r=n(1),o=n(5),i=n(17),s=n(7)("toStringTag"),u=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],a=0;5>a;a++){var f=u[a],c=r[f],l=c&&c.prototype;l&&!l[s]&&o(l,s,f),i[f]=i.Array}},function(t,e,n){e=t.exports=n(71)(),e.push([t.id,".file-uploads{overflow:hidden;position:relative;text-align:center}.file-uploads span{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.file-uploads input{z-index:1;opacity:0;font-size:20em;top:0;left:0;right:0;bottom:0;position:absolute;width:100%;height:100%}.file-uploads.file-uploads-html5 input{float:left;width:1px!important;height:1px!important;top:-1px!important;left:-1px!important;right:auto!important;bottom:auto!important}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var s=e[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(t,e){t.exports="<label :class=\"{'file-uploads': true, 'file-uploads-html5': $mode == 'html5', 'file-uploads-html4': $mode == 'html4'}\"> <span>{{{title}}}</span> <input-file></input-file> </label>"},function(t,e,n){var r,o;n(75),r=n(37),o=n(72),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=l[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(a(r.parts[i],e))}else{for(var s=[],i=0;i<r.parts.length;i++)s.push(a(r.parts[i],e));l[r.id]={id:r.id,refs:1,parts:s}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],s=o[1],u=o[2],a=o[3],f={css:s,media:u,sourceMap:a};n[i]?n[i].parts.push(f):e.push(n[i]={id:i,parts:[f]})}return e}function i(t,e){var n=h(),r=y[y.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),y.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function s(t){t.parentNode.removeChild(t);var e=y.indexOf(t);e>=0&&y.splice(e,1)}function u(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function a(t,e){var n,r,o;if(e.singleton){var i=m++;n=v||(v=u(e)),r=f.bind(null,n,i,!1),o=f.bind(null,n,i,!0)}else n=u(e),r=c.bind(null,n),o=function(){s(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}function f(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=b(e,o);else{var i=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}function c(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var l={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},d=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,m=0,y=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=d()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],s=0;s<n.length;s++){var u=n[s],a=l[u.id];a.refs--,i.push(a)}if(t){var f=o(t);r(f,e)}for(var s=0;s<i.length;s++){var a=i[s];if(0===a.refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete l[a.id]}}}};var b=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var r=n(70);"string"==typeof r&&(r=[[t.id,r,""]]);n(74)(r,{});r.locals&&(t.exports=r.locals)}])});

},{}],8:[function(require,module,exports){
/*!
 * vue-validator v2.1.7
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):t.VueValidator=i()}(this,function(){"use strict";function t(t,i){window.console&&(console.warn("[vue-validator] "+t),i&&console.warn(i.stack))}function i(t){if(null===t||void 0===t)return!0;if(Array.isArray(t)){if(t.length>0)return!1;if(0===t.length)return!0}else if(C.Vue.util.isPlainObject(t))for(var i in t)if(C.Vue.util.hasOwn(t,i))return!1;return!0}function e(t,i,e){if(Array.isArray(t))for(var n=0;n<t.length;n++)i.call(e||t[n],t[n],n);else if(C.Vue.util.isPlainObject(t)){var a=C.Vue.util.hasOwn;for(var o in t)a(t,o)&&i.call(e||t[o],t[o],o)}}function n(t,i){var e=C.Vue.util.indexOf(t,i);return~e?t.splice(e,1):null}function a(t,i,e){var n=document.createEvent("HTMLEvents");if(n.initEvent(i,!0,!1),e)for(var a in e)n[a]=e[a];try{t.dispatchEvent(n)}catch(n){}}function o(t){return t&&"function"==typeof t.then}function r(t,i,e){if(i=i.trim(),-1===i.indexOf(" "))return void e(t,i);for(var n=i.split(/\s+/),a=0,o=n.length;o>a;a++)e(t,n[a])}function s(t){if(Array.isArray(t)){if(0!==t.length){for(var i=!0,e=0,n=t.length;n>e&&(i=s(t[e]),i);e++);return i}return!1}return"number"==typeof t||"function"==typeof t?!0:"boolean"==typeof t?t:"string"==typeof t?t.length>0:null!==t&&"object"===("undefined"==typeof t?"undefined":w["typeof"](t))?Object.keys(t).length>0:null===t||void 0===t?!1:void 0}function l(t,i){if("string"!=typeof i)return!1;var e=i.match(new RegExp("^/(.*?)/([gimy]*)$"));return e?new RegExp(e[1],e[2]).test(t):!1}function d(t,i){return"string"==typeof t?f(i,10)&&t.length>=parseInt(i,10):Array.isArray(t)?t.length>=parseInt(i,10):!1}function u(t,i){return"string"==typeof t?f(i,10)&&t.length<=parseInt(i,10):Array.isArray(t)?t.length<=parseInt(i,10):!1}function h(t,i){return!isNaN(+t)&&!isNaN(+i)&&+t>=+i}function c(t,i){return!isNaN(+t)&&!isNaN(+i)&&+i>=+t}function f(t){return/^(-?[1-9]\d*|0)$/.test(t)}function p(t){var i=t.util.extend,e=Object.create(null);i(e,k),t.options.validators=e;var n=t.config.optionMergeStrategies;n&&(n.validators=function(t,e){if(!e)return t;if(!t)return e;var n=Object.create(null);i(n,t);for(var a in e)n[a]=e[a];return n}),t.validator=function(i,e){return e?void(t.options.validators[i]=e):t.options.validators[i]}}function v(t){var i=t.prototype._init;t.prototype._init=function(t){this._validatorMaps||(this._validatorMaps=Object.create(null)),i.call(this,t)};var e=t.prototype._destroy;t.prototype._destroy=function(){e.apply(this,arguments),this._validatorMaps=null}}function g(t){var i=t.directive("if"),e=t.FragmentFactory,n=t.util,a=n.toArray,o=n.replace,r=n.createAnchor;t.directive("validate-class",{terminal:!0,priority:i.priority+F,bind:function(){var t=this,i=String(I++);this.setClassIds(this.el,i),this.vm.$on(E,this.cb=function(e,n,a){e.indexOf(i)>-1&&n.updateClasses(a,t.frag.node)}),this.setupFragment()},unbind:function(){this.vm.$off(E,this.cb),this.teardownFragment()},setClassIds:function(t,i){for(var e=a(t.childNodes),n=0,o=e.length;o>n;n++){var r=e[n];if(1===r.nodeType)for(var s=r.hasAttributes(),l=s&&a(r.attributes),d=0,u=l.length;u>d;d++){var h=l[d];if(h.name.match(x)){var c=r.getAttribute(E),f=c?c+","+i:i;r.setAttribute(E,f)}}r.hasChildNodes()&&this.setClassIds(r,i)}},setupFragment:function(){this.anchor=r("v-validate-class"),o(this.el,this.anchor),this.factory=new e(this.vm,this.el),this.frag=this.factory.create(this._host,this._scope,this._frag),this.frag.before(this.anchor)},teardownFragment:function(){this.frag&&(this.frag.remove(),this.frag=null,this.factory=null),o(this.anchor,this.el),this.anchor=null}})}function _(t){function i(){if(r){var t=document.createElement("textarea");return t.placeholder="t","t"===t.cloneNode(!0).value}return!1}var n=t.FragmentFactory,a=t.parsers.directive.parseDirective,o=t.util,r=o.inBrowser,s=o.bind,l=o.on,d=o.off,u=o.createAnchor,h=o.replace,c=o.camelize,f=o.isPlainObject,p=i();t.directive("validate",{deep:!0,terminal:!0,priority:A,params:["group","field","detect-blur","detect-change","initial","classes"],paramWatchers:{detectBlur:function(t,i){this._invalid||(this.validation.detectBlur=this.isDetectBlur(t),this.validator.validate(this.field))},detectChange:function(t,i){this._invalid||(this.validation.detectChange=this.isDetectChange(t),this.validator.validate(this.field))}},bind:function(){var t=this.el,i=this.vm.$options._validator,e=t.getAttribute("v-model"),n=this.parseModelRaw(e),a=n.model,o=n.filters;this.model=a,this.setupFragment(),this.setupValidate(i,a,o),this.listen()},update:function(t,i){if(t&&!this._invalid){f(t)||i&&f(i)?this.handleObject(t,i,this.params.initial):(Array.isArray(t)||i&&Array.isArray(i))&&this.handleArray(t,i,this.params.initial);var e={field:this.field};this.frag&&(e.el=this.frag.node),this.validator.validate(e)}},unbind:function(){this._invalid||(this.unlisten(),this.teardownValidate(),this.teardownFragment(),this.model=null)},parseModelRaw:function(t){if(S.test(t)){var i=a(t);return{model:i.expression,filters:i.filters}}return{model:t}},setupValidate:function(t,i,e){var n=this.params,a=this.validator=this.vm._validatorMaps[t];this.field=c(this.arg?this.arg:n.field),this.validation=a.manageValidation(this.field,i,this.vm,this.getElementFrom(this.frag),this._scope,e,n.initial,this.isDetectBlur(n.detectBlur),this.isDetectChange(n.detectChange)),f(n.classes)&&this.validation.setValidationClasses(n.classes),n.group&&a.addGroupValidation(n.group,this.field)},listen:function(){var t=this.model,i=this.validation,e=this.getElementFrom(this.frag);this.onBlur=s(i.listener,i),l(e,"blur",this.onBlur),"radio"!==e.type&&"SELECT"!==e.tagName||t?"checkbox"===e.type?t?(this.onClick=s(i.listener,i),l(e,"click",this.onClick)):(this.onChange=s(i.listener,i),l(e,"change",this.onChange)):t||(this.onInput=s(i.listener,i),l(e,"input",this.onInput)):(this.onChange=s(i.listener,i),l(e,"change",this.onChange))},unlisten:function(){var t=this.getElementFrom(this.frag);this.onInput&&(d(t,"input",this.onInput),this.onInput=null),this.onClick&&(d(t,"click",this.onClick),this.onClick=null),this.onChange&&(d(t,"change",this.onChange),this.onChange=null),this.onBlur&&(d(t,"blur",this.onBlur),this.onBlur=null)},teardownValidate:function(){if(this.validator&&this.validation){var t=this.getElementFrom(this.frag);this.params.group&&this.validator.removeGroupValidation(this.params.group,this.field),this.validator.unmanageValidation(this.field,t),this.validator=null,this.validation=null,this.field=null}},setupFragment:function(){this.anchor=u("v-validate"),h(this.el,this.anchor),this.factory=new n(this.vm,this.shimNode(this.el)),this.frag=this.factory.create(this._host,this._scope,this._frag),this.frag.before(this.anchor)},teardownFragment:function(){this.frag&&(this.frag.remove(),this.frag=null,this.factory=null),h(this.anchor,this.el),this.anchor=null},handleArray:function(t,i,n){var a=this;i&&this.validation.resetValidation(),e(t,function(t){a.validation.setValidation(t,void 0,void 0,n)})},handleObject:function(t,i,n){var a=this;i&&this.validation.resetValidation(),e(t,function(t,i){if(f(t)){if("rule"in t){var e="message"in t?t.message:null,o="initial"in t?t.initial:null;a.validation.setValidation(i,t.rule,e,o||n)}}else a.validation.setValidation(i,t,void 0,n)})},isDetectBlur:function(t){return void 0===t||"on"===t||t===!0},isDetectChange:function(t){return void 0===t||"on"===t||t===!0},isInitialNoopValidation:function(t){return"off"===t||t===!1},shimNode:function(t){var i=t;if(p&&"TEXTAREA"===t.tagName){i=t.cloneNode(!0),i.value=t.value;for(var e=i.childNodes.length;e--;)i.removeChild(i.childNodes[e])}return i},getElementFrom:function(t){return t.single?t.node:t.node.nextSibling}})}function m(t){var i=t.FragmentFactory,e=t.directive("if"),n=t.util,a=n.isArray,o=n.isPlainObject,r=n.createAnchor,s=n.replace,l=n.extend,d=n.camelize;t.elementDirective("validator",{params:["name","groups","lazy","classes"],bind:function(){var t=this.params;if(this.validatorName="$"+d(t.name),!this.vm._validatorMaps)throw new Error("Invalid validator management error");var i={};o(this.params.classes)&&(i=this.params.classes),this.setupValidator(i),this.setupFragment(t.lazy)},unbind:function(){this.teardownFragment(),this.teardownValidator()},getGroups:function(){var t=this.params,i=[];return t.groups&&(a(t.groups)?i=t.groups:o(t.groups)||"string"!=typeof t.groups||i.push(t.groups)),i},setupValidator:function(t){var i=this.validator=new U(this.validatorName,this,this.getGroups(),t);i.enableReactive(),i.setupScope(),i.registerEvents()},teardownValidator:function(){this.validator.unregisterEvents(),this.validator.disableReactive(),this.validatorName&&(this.validatorName=null,this.validator=null)},setupFragment:function(t){var n=this,a=this.vm;this.validator.waitFor(function(){n.anchor=r("vue-validator"),s(n.el,n.anchor),l(a.$options,{_validator:n.validatorName}),n.factory=new i(a,n.el.innerHTML),e.insert.call(n)}),!t&&a.$activateValidator()},teardownFragment:function(){e.unbind.call(this)}})}function y(t){var i={name:"validator-error",props:{field:{type:String,required:!0},validator:{type:String},message:{type:String,required:!0},partial:{type:String,"default":"validator-error-default"}},template:'<div><partial :name="partial"></partial></div>',partials:{}};return i.partials["validator-error-default"]="<p>{{field}}: {{message}}</p>",i}function V(t){var i=t.util,e=y(t),n={name:"validator-errors",props:{validation:{type:Object,required:!0},group:{type:String,"default":null},field:{type:String,"default":null},component:{type:String,"default":"validator-error"}},computed:{errors:function(){var t=this;if(null!==this.group)return this.validation[this.group].errors;if(null!==this.field){var e=this.validation[this.field];if(!e.errors)return;return e.errors.map(function(e){var n={field:t.field};return i.isPlainObject(e)?(e.validator&&(n.validator=e.validator),n.message=e.message):"string"==typeof e&&(n.message=e),n})}return this.validation.errors}},template:'<template v-for="error in errors"><component :is="component" :partial="partial" :field="error.field" :validator="error.validator" :message="error.message"></component></template>',components:{}};return n.props.partial=e.props.partial,n.components[e.name]=e,t.component(n.name,n),n}function b(i){arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return b.installed?void t("already installed."):(C.Vue=i,p(i),V(i),v(i),m(i),g(i),void _(i))}var w={};w["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},w.classCallCheck=function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")},w.createClass=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),w.inherits=function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(t,i):t.__proto__=i)},w.possibleConstructorReturn=function(t,i){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?t:i};var C={},k=Object.freeze({required:s,pattern:l,minlength:d,maxlength:u,min:h,max:c}),E="__vue-validator-validate-update__",A=4096,F=32,S=/[^|]\|[^|]/,x=/^v-validate(?:$|:(.*)$)/,N=/^v-on:|^@/,I=0,O=function(){function t(i,e,n,a,o,r,s,l,d){w.classCallCheck(this,t),this.field=i,this.touched=!1,this.dirty=!1,this.modified=!1,this._modified=!1,this._model=e,this._filters=s,this._validator=r,this._vm=n,this._el=a,this._forScope=o,this._init=this._getValue(a),this._validators={},this._detectBlur=l,this._detectChange=d,this._classes={}}return t.prototype.manageElement=function(t,i){var e=this,n=this._getScope(),a=this._model;this._initial=i;var o=t.getAttribute(E);o&&(t.removeAttribute(E),this._classIds=o.split(",")),a&&(t.value=this._evalModel(a,this._filters),this._unwatch=n.$watch(a,function(i,n){if(i!==n){if(e.guardValidate(t,"input"))return;e.handleValidate(t,{noopable:e._initial}),e._initial&&(e._initial=null)}},{deep:!0}))},t.prototype.unmanageElement=function(t){this._unwatch&&this._unwatch()},t.prototype.resetValidation=function(){var t=this,i=Object.keys(this._validators);e(i,function(i,e){t._validators[i]=null,delete t._validators[i]})},t.prototype.resetValidationNoopable=function(){e(this._validators,function(t,i){t.initial&&!t._isNoopable&&(t._isNoopable=!0)})},t.prototype.setValidation=function(t,i,e,n){var a=this._validators[t];a||(a=this._validators[t]={},a.name=t),a.arg=i,e&&(a.msg=e),n&&(a.initial=n,a._isNoopable=!0)},t.prototype.setValidationClasses=function(t){var i=this;e(t,function(t,e){i._classes[e]=t})},t.prototype.willUpdateFlags=function(){var t=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];t&&this.willUpdateTouched(this._el,"blur"),this.willUpdateDirty(this._el),this.willUpdateModified(this._el)},t.prototype.willUpdateTouched=function(t,i){i&&"blur"===i&&(this.touched=!0,this._fireEvent(t,"touched"))},t.prototype.willUpdateDirty=function(t){!this.dirty&&this._checkModified(t)&&(this.dirty=!0,this._fireEvent(t,"dirty"))},t.prototype.willUpdateModified=function(t){this.modified=this._checkModified(t),this._modified!==this.modified&&(this._fireEvent(t,"modified",{modified:this.modified}),this._modified=this.modified)},t.prototype.listener=function(t){this.guardValidate(t.target,t.type)||this.handleValidate(t.target,{type:t.type})},t.prototype.handleValidate=function(t){var i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],e=i.type,n=void 0===e?null:e,a=i.noopable,o=void 0===a?!1:a;this.willUpdateTouched(t,n),this.willUpdateDirty(t),this.willUpdateModified(t),this._validator.validate({field:this.field,el:t,noopable:o})},t.prototype.validate=function(t){var e=this,n=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],a=arguments.length<=2||void 0===arguments[2]?null:arguments[2],o=C.Vue.util,r={},s=[],l=!0;this._runValidators(function(t,i,a){var d=e._resolveValidator(i),u=null,h=null;if(o.isPlainObject(d)?(d.check&&"function"==typeof d.check&&(u=d.check),d.message&&(h=d.message)):"function"==typeof d&&(u=d),t.msg&&(h=t.msg),n)return r[i]=!1,a();if(t._isNoopable)return r[i]=!1,t._isNoopable=null,a();if(u){var c=e._getValue(e._el);e._invokeValidator(e._vm,u,c,t.arg,function(n,o){if(n)r[i]=!n;else if(l=!1,o)s.push({validator:i,message:o}),r[i]=o;else if(h){var d={validator:i};d.message="function"==typeof h?h.call(e._vm,e.field,t.arg):h,s.push(d),r[i]=d.message}else r[i]=!n;a()})}else a()},function(){e._fireEvent(e._el,l?"valid":"invalid");var n={valid:l,invalid:!l,touched:e.touched,untouched:!e.touched,dirty:e.dirty,pristine:!e.dirty,modified:e.modified};i(s)||(n.errors=s),o.extend(r,n),e.willUpdateClasses(r,a),t(r)})},t.prototype.resetFlags=function(){this.touched=!1,this.dirty=!1,this.modified=!1,this._modified=!1},t.prototype.reset=function(){this.resetValidationNoopable(),this.resetFlags(),this._init=this._getValue(this._el)},t.prototype.willUpdateClasses=function(t){var i=this,e=arguments.length<=1||void 0===arguments[1]?null:arguments[1];this._checkClassIds(e)?!function(){var n=i._getClassIds(e);i.vm.$nextTick(function(){i.vm.$emit(E,n,i,t)})}():this.updateClasses(t)},t.prototype.updateClasses=function(t){var i=arguments.length<=1||void 0===arguments[1]?null:arguments[1];this._updateClasses(i||this._el,t)},t.prototype.guardValidate=function(t,i){return i&&"blur"===i&&!this.detectBlur?!0:i&&"input"===i&&!this.detectChange?!0:i&&"change"===i&&!this.detectChange?!0:i&&"click"===i&&!this.detectChange?!0:!1},t.prototype._getValue=function(t){return t.value},t.prototype._getScope=function(){return this._forScope||this._vm},t.prototype._getClassIds=function(t){return this._classIds},t.prototype._checkModified=function(t){return this._init!==this._getValue(t)},t.prototype._checkClassIds=function(t){return this._getClassIds(t)},t.prototype._fireEvent=function(t,i,e){a(t,i,e)},t.prototype._evalModel=function(t,i){var e=this._getScope(),n=null;return i?(n=e.$get(t),i?this._applyFilters(n,null,i):n):(n=e.$get(t),void 0===n||null===n?"":n)},t.prototype._updateClasses=function(t,i){this._toggleValid(t,i.valid),this._toggleTouched(t,i.touched),this._togglePristine(t,i.pristine),this._toggleModfied(t,i.modified)},t.prototype._toggleValid=function(t,i){var e=C.Vue.util,n=e.addClass,a=e.removeClass,o=this._classes.valid||"valid",s=this._classes.invalid||"invalid";i?(r(t,o,n),r(t,s,a)):(r(t,o,a),r(t,s,n))},t.prototype._toggleTouched=function(t,i){var e=C.Vue.util,n=e.addClass,a=e.removeClass,o=this._classes.touched||"touched",s=this._classes.untouched||"untouched";i?(r(t,o,n),r(t,s,a)):(r(t,o,a),r(t,s,n))},t.prototype._togglePristine=function(t,i){var e=C.Vue.util,n=e.addClass,a=e.removeClass,o=this._classes.pristine||"pristine",s=this._classes.dirty||"dirty";i?(r(t,o,n),r(t,s,a)):(r(t,o,a),r(t,s,n))},t.prototype._toggleModfied=function(t,i){var e=C.Vue.util,n=e.addClass,a=e.removeClass,o=this._classes.modified||"modified";i?r(t,o,n):r(t,o,a)},t.prototype._applyFilters=function(t,i,e,n){var a=C.Vue.util.resolveAsset,o=this._getScope(),r=void 0,s=void 0,l=void 0,d=void 0,u=void 0,h=void 0,c=void 0,f=void 0,p=void 0;for(h=0,c=e.length;c>h;h++)if(r=e[h],s=a(this._vm.$options,"filters",r.name),s&&(s=n?s.write:s.read||s,"function"==typeof s)){if(l=n?[t,i]:[t],u=n?2:1,r.args)for(f=0,p=r.args.length;p>f;f++)d=r.args[f],l[f+u]=d.dynamic?o.$get(d.value):d.value;t=s.apply(this._vm,l)}return t},t.prototype._runValidators=function(t,i){var n=this._validators,a=Object.keys(n).length,o=0;e(n,function(e,n){t(e,n,function(){++o,o>=a&&i()})})},t.prototype._invokeValidator=function(t,i,e,n,a){var r=i.call(this,e,n);"function"==typeof r?r(function(){a(!0)},function(t){a(!1,t)}):o(r)?r.then(function(){a(!0)},function(t){a(!1,t)})["catch"](function(t){a(!1,t.message)}):a(r)},t.prototype._resolveValidator=function(t){var i=C.Vue.util.resolveAsset;return i(this._vm.$options,"validators",t)},w.createClass(t,[{key:"vm",get:function(){return this._vm}},{key:"el",get:function(){return this._el}},{key:"detectChange",get:function(){return this._detectChange},set:function(t){this._detectChange=t}},{key:"detectBlur",get:function(){return this._detectBlur},set:function(t){this._detectBlur=t}}]),t}(),$=function(t){function i(e,n,a,o,r,s,l,d,u){w.classCallCheck(this,i);var h=w.possibleConstructorReturn(this,t.call(this,e,n,a,o,r,s,l,d,u));return h._inits=[],h}return w.inherits(i,t),i.prototype.manageElement=function(t,i){var e=this,n=this._getScope(),a=this._addItem(t,i),o=a.model=this._model;if(o){var r=this._evalModel(o,this._filters);Array.isArray(r)?(this._setChecked(r,a.el),a.unwatch=n.$watch(o,function(t,i){if(t!==i){if(e.guardValidate(a.el,"change"))return;e.handleValidate(a.el,{noopable:a.initial}),a.initial&&(a.initial=null)}})):(t.checked=r||!1,this._init=t.checked,a.init=t.checked,a.value=t.value,a.unwatch=n.$watch(o,function(i,n){if(i!==n){if(e.guardValidate(t,"change"))return;e.handleValidate(t,{noopable:a.initial}),a.initial&&(a.initial=null)}}))}else{var s={field:this.field,noopable:i};this._checkClassIds(t)&&(s.el=t),this._validator.validate(s)}},i.prototype.unmanageElement=function(t){var i=-1;e(this._inits,function(e,n){e.el===t&&(i=n,e.unwatch&&e.model&&(e.unwatch(),e.unwatch=null,e.model=null))}),-1!==i&&(this._inits.splice(i,1),this._validator.validate({field:this.field}))},i.prototype.willUpdateFlags=function(){var t=this,i=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];e(this._inits,function(e,n){i&&t.willUpdateTouched(e.el,"blur"),t.willUpdateDirty(e.el),t.willUpdateModified(e.el)})},i.prototype.reset=function(){this.resetValidationNoopable(),this.resetFlags(),e(this._inits,function(t,i){t.init=t.el.checked,t.value=t.el.value})},i.prototype.updateClasses=function(t){var i=this,n=arguments.length<=1||void 0===arguments[1]?null:arguments[1];n?this._updateClasses(n,t):e(this._inits,function(e,n){i._updateClasses(e.el,t)})},i.prototype._addItem=function(t,i){var e={el:t,init:t.checked,value:t.value,initial:i},n=t.getAttribute(E);return n&&(t.removeAttribute(E),e.classIds=n.split(",")),this._inits.push(e),e},i.prototype._setChecked=function(t,i){for(var e=0,n=t.length;n>e;e++){var a=t[e];i.disabled||i.value!==a||i.checked||(i.checked=!0)}},i.prototype._getValue=function(t){var i=this;if(!this._inits||0===this._inits.length)return t.checked;var n=function(){var t=[];return e(i._inits,function(i,e){i.el.checked&&t.push(i.el.value)}),{v:t}}();return"object"===("undefined"==typeof n?"undefined":w["typeof"](n))?n.v:void 0},i.prototype._getClassIds=function(t){var i=void 0;return e(this._inits,function(e,n){e.el===t&&(i=e.classIds)}),i},i.prototype._checkModified=function(t){var i=this;if(0===this._inits.length)return this._init!==t.checked;var n=function(){var t=!1;return e(i._inits,function(i,e){t||(t=i.init!==i.el.checked)}),{v:t}}();return"object"===("undefined"==typeof n?"undefined":w["typeof"](n))?n.v:void 0},i}(O),M=function(t){function i(e,n,a,o,r,s,l,d,u){w.classCallCheck(this,i);var h=w.possibleConstructorReturn(this,t.call(this,e,n,a,o,r,s,l,d,u));return h._inits=[],h}return w.inherits(i,t),i.prototype.manageElement=function(t,i){var e=this,n=this._getScope(),a=this._addItem(t,i),o=a.model=this._model;if(o){var r=this._evalModel(o,this._filters);this._setChecked(r,t,a),a.unwatch=n.$watch(o,function(i,n){if(i!==n){if(e.guardValidate(a.el,"change"))return;e.handleValidate(t,{noopable:a.initial}),a.initial&&(a.initial=null)}})}else{var s={field:this.field,noopable:i};this._checkClassIds(t)&&(s.el=t),this._validator.validate(s)}},i.prototype.unmanageElement=function(t){var i=-1;e(this._inits,function(e,n){e.el===t&&(i=n)}),-1!==i&&(this._inits.splice(i,1),this._validator.validate({field:this.field}))},i.prototype.willUpdateFlags=function(){var t=this,i=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];e(this._inits,function(e,n){i&&t.willUpdateTouched(e.el,"blur"),t.willUpdateDirty(e.el),t.willUpdateModified(e.el)})},i.prototype.reset=function(){this.resetValidationNoopable(),this.resetFlags(),e(this._inits,function(t,i){t.init=t.el.checked,t.value=t.el.value})},i.prototype.updateClasses=function(t){var i=this,n=arguments.length<=1||void 0===arguments[1]?null:arguments[1];n?this._updateClasses(n,t):e(this._inits,function(e,n){i._updateClasses(e.el,t)})},i.prototype._addItem=function(t,i){var e={el:t,init:t.checked,value:t.value,initial:i},n=t.getAttribute(E);return n&&(t.removeAttribute(E),e.classIds=n.split(",")),this._inits.push(e),e},i.prototype._setChecked=function(t,i,e){i.value===t&&(i.checked=!0,this._init=i.checked,e.init=i.checked,e.value=t)},i.prototype._getValue=function(t){var i=this;if(!this._inits||0===this._inits.length)return t.checked;var n=function(){var t=[];return e(i._inits,function(i,e){i.el.checked&&t.push(i.el.value)}),{v:t}}();return"object"===("undefined"==typeof n?"undefined":w["typeof"](n))?n.v:void 0},i.prototype._getClassIds=function(t){var i=void 0;return e(this._inits,function(e,n){e.el===t&&(i=e.classIds)}),i},i.prototype._checkModified=function(t){var i=this;if(0===this._inits.length)return this._init!==t.checked;var n=function(){var t=!1;return e(i._inits,function(i,e){t||(t=i.init!==i.el.checked)}),{v:t}}();return"object"===("undefined"==typeof n?"undefined":w["typeof"](n))?n.v:void 0},i}(O),j=function(t){function i(e,n,a,o,r,s,l,d,u){w.classCallCheck(this,i);var h=w.possibleConstructorReturn(this,t.call(this,e,n,a,o,r,s,l,d,u));return h._multiple=h._el.hasAttribute("multiple"),h}return w.inherits(i,t),i.prototype.manageElement=function(t,i){var e=this,n=this._getScope(),a=this._model;this._initial=i;var o=t.getAttribute(E);if(o&&(t.removeAttribute(E),this._classIds=o.split(",")),a){var r=this._evalModel(a,this._filters),s=Array.isArray(r)?r:[r];this._setOption(s,t),this._unwatch=n.$watch(a,function(i,n){var a=Array.isArray(i)?i:[i],o=Array.isArray(n)?n:[n];if(a.slice().sort().toString()!==o.slice().sort().toString()){if(e.guardValidate(t,"change"))return;e.handleValidate(t,{noopable:e._initial}),e._initial&&(e._initial=null)}})}},i.prototype.unmanageElement=function(t){this._unwatch&&this._unwatch()},i.prototype._getValue=function(t){for(var i=[],e=0,n=t.options.length;n>e;e++){var a=t.options[e];!a.disabled&&a.selected&&i.push(a.value)}return i},i.prototype._setOption=function(t,i){for(var e=0,n=t.length;n>e;e++)for(var a=t[e],o=0,r=i.options.length;r>o;o++){var s=i.options[o];s.disabled||s.value!==a||s.hasAttribute("selected")&&s.selected||(s.selected=!0)}},i.prototype._checkModified=function(t){var i=this._getValue(t).slice().sort();if(this._init.length!==i.length)return!0;var e=this._init.slice().sort();return e.toString()!==i.toString()},i}(O),U=function(){function t(i,n,a,o){var r=this;w.classCallCheck(this,t),this.name=i,this._scope={},this._dir=n,this._validations={},this._checkboxValidations={},this._radioValidations={},this._groups=a,this._groupValidations={},this._events={},this._modified=!1,this._classes=o,e(a,function(t){r._groupValidations[t]=[]})}return t.prototype.enableReactive=function(){var t=this._dir.vm;C.Vue.util.defineReactive(t,this.name,this._scope),t._validatorMaps[this.name]=this,this._defineResetValidation(),this._defineValidate(),this._defineSetValidationErrors()},t.prototype.disableReactive=function(){var t=this._dir.vm;t.$setValidationErrors=null,delete t.$setValidationErrors,t.$validate=null,delete t.$validate,t.$resetValidation=null,delete t.$resetValidation,t._validatorMaps[this.name]=null,delete t._validatorMaps[this.name],t[this.name]=null,delete t[this.name]},t.prototype.registerEvents=function(){for(var t=C.Vue.parsers.expression.isSimplePath,i=this._dir.el.attributes,e=0,n=i.length;n>e;e++){var a=i[e].name;if(N.test(a)){var o=i[e].value;t(o)&&(o+=".apply(this, $arguments)"),a=a.replace(N,""),this._events[this._getEventName(a)]=this._dir.vm.$eval(o,!0)}}},t.prototype.unregisterEvents=function(){var t=this;e(this._events,function(i,e){t._events[e]=null,delete t._events[e]})},t.prototype.manageValidation=function(t,i,e,n,a,o,r,s,l){var d=null;return d="SELECT"===n.tagName?this._manageSelectValidation(t,i,e,n,a,o,r,s,l):"checkbox"===n.type?this._manageCheckboxValidation(t,i,e,n,a,o,r,s,l):"radio"===n.type?this._manageRadioValidation(t,i,e,n,a,o,r,s,l):this._manageBaseValidation(t,i,e,n,a,o,r,s,l),d.setValidationClasses(this._classes),d},t.prototype.unmanageValidation=function(t,i){"checkbox"===i.type?this._unmanageCheckboxValidation(t,i):"radio"===i.type?this._unmanageRadioValidation(t,i):"SELECT"===i.tagName?this._unmanageSelectValidation(t,i):this._unmanageBaseValidation(t,i)},t.prototype.addGroupValidation=function(t,i){var e=C.Vue.util.indexOf,n=this._getValidationFrom(i),a=this._groupValidations[t];a&&!~e(a,n)&&a.push(n)},t.prototype.removeGroupValidation=function(t,i){var e=this._getValidationFrom(i),a=this._groupValidations[t];a&&n(a,e)},t.prototype.validate=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=t.el,n=void 0===i?null:i,a=t.field,o=void 0===a?null:a,r=t.touched,s=void 0===r?!1:r,l=t.noopable,d=void 0===l?!1:l,u=t.cb,h=void 0===u?null:u;o?this._validate(o,s,d,n,h):(e(this.validations,function(t,i){t.willUpdateFlags(s)}),this._validates(h))},t.prototype.setupScope=function(){var t=this;this._defineProperties(function(){return t.validations},function(){return t._scope}),e(this._groups,function(i){var e=t._groupValidations[i],n={};C.Vue.set(t._scope,i,n),t._defineProperties(function(){return e},function(){return n})})},t.prototype.waitFor=function(t){var i="$activateValidator",e=this._dir.vm;e[i]=function(){t(),e[i]=null}},t.prototype._defineResetValidation=function(){var t=this;this._dir.vm.$resetValidation=function(i){t._resetValidation(i)}},t.prototype._defineValidate=function(){var t=this;this._dir.vm.$validate=function(){for(var i=arguments.length,n=Array(i),a=0;i>a;a++)n[a]=arguments[a];var o=null,r=!1,s=null;e(n,function(t,i){"string"==typeof t?o=t:"boolean"==typeof t?r=t:"function"==typeof t&&(s=t)}),t.validate({field:o,touched:r,cb:s})}},t.prototype._defineSetValidationErrors=function(){var t=this;this._dir.vm.$setValidationErrors=function(i){t._setValidationErrors(i)}},t.prototype._validate=function(t){var i=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],e=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],n=this,a=arguments.length<=3||void 0===arguments[3]?null:arguments[3],o=arguments.length<=4||void 0===arguments[4]?null:arguments[4],r=this._scope,s=this._getValidationFrom(t);s&&(s.willUpdateFlags(i),s.validate(function(i){C.Vue.set(r,t,i),n._fireEvents(),o&&o()},e,a))},t.prototype._validates=function(t){var i=this,e=this._scope;this._runValidates(function(t,i,n){t.validate(function(t){C.Vue.set(e,i,t),n()})},function(){i._fireEvents(),t&&t()})},t.prototype._getValidationFrom=function(t){return this._validations[t]||this._checkboxValidations[t]&&this._checkboxValidations[t].validation||this._radioValidations[t]&&this._radioValidations[t].validation},t.prototype._resetValidation=function(t){e(this.validations,function(t,i){t.reset()}),this._validates(t)},t.prototype._setValidationErrors=function(t){var i=this,n=C.Vue.util.extend,a={};e(t,function(t,i){a[t.field]||(a[t.field]=[]),a[t.field].push(t)}),e(a,function(t,a){var o=i._scope[a],r={};e(t,function(t){t.validator&&(o[t.validator]=t.message)}),o.valid=!1,o.invalid=!0,o.errors=t,n(r,o);var s=i._getValidationFrom(a);s.willUpdateClasses(r,s.el),C.Vue.set(i._scope,a,r)})},t.prototype._manageBaseValidation=function(t,i,e,n,a,o,r,s,l){var d=this._validations[t]=new O(t,i,e,n,a,this,o,s,l);return d.manageElement(n,r),d},t.prototype._unmanageBaseValidation=function(t,i){var e=this._validations[t];e&&(e.unmanageElement(i),C.Vue["delete"](this._scope,t),this._validations[t]=null,delete this._validations[t])},t.prototype._manageCheckboxValidation=function(t,i,e,n,a,o,r,s,l){var d=this._checkboxValidations[t];if(!d){var u=new $(t,i,e,n,a,this,o,s,l);d={validation:u,elements:0},this._checkboxValidations[t]=d}return d.elements++,d.validation.manageElement(n,r),d.validation},t.prototype._unmanageCheckboxValidation=function(t,i){var e=this._checkboxValidations[t];e&&(e.elements--,e.validation.unmanageElement(i),0===e.elements&&(C.Vue["delete"](this._scope,t),this._checkboxValidations[t]=null,delete this._checkboxValidations[t]))},t.prototype._manageRadioValidation=function(t,i,e,n,a,o,r,s,l){var d=this._radioValidations[t];if(!d){var u=new M(t,i,e,n,a,this,o,s,l);d={validation:u,elements:0},this._radioValidations[t]=d}return d.elements++,d.validation.manageElement(n,r),d.validation},t.prototype._unmanageRadioValidation=function(t,i){var e=this._radioValidations[t];e&&(e.elements--,e.validation.unmanageElement(i),0===e.elements&&(C.Vue["delete"](this._scope,t),this._radioValidations[t]=null,delete this._radioValidations[t]))},t.prototype._manageSelectValidation=function(t,i,e,n,a,o,r,s,l){var d=this._validations[t]=new j(t,i,e,n,a,this,o,s,l);return d.manageElement(n,r),d},t.prototype._unmanageSelectValidation=function(t,i){var e=this._validations[t];e&&(e.unmanageElement(i),C.Vue["delete"](this._scope,t),this._validations[t]=null,delete this._validations[t])},t.prototype._fireEvent=function(t){for(var i=arguments.length,e=Array(i>1?i-1:0),n=1;i>n;n++)e[n-1]=arguments[n];var a=this._events[this._getEventName(t)];a&&this._dir.vm.$nextTick(function(){a.apply(null,e)})},t.prototype._fireEvents=function(){var t=this._scope;t.touched&&this._fireEvent("touched"),t.dirty&&this._fireEvent("dirty"),this._modified!==t.modified&&(this._fireEvent("modified",t.modified),
this._modified=t.modified);var i=t.valid;this._fireEvent(i?"valid":"invalid")},t.prototype._getEventName=function(t){return this.name+":"+t},t.prototype._defineProperties=function(t,i){var n=this,a=C.Vue.util.bind;e({valid:{fn:this._defineValid,arg:t},invalid:{fn:this._defineInvalid,arg:i},touched:{fn:this._defineTouched,arg:t},untouched:{fn:this._defineUntouched,arg:i},modified:{fn:this._defineModified,arg:t},dirty:{fn:this._defineDirty,arg:t},pristine:{fn:this._definePristine,arg:i},errors:{fn:this._defineErrors,arg:t}},function(t,e){Object.defineProperty(i(),e,{enumerable:!0,configurable:!0,get:function(){return a(t.fn,n)(t.arg)}})})},t.prototype._runValidates=function(t,i){var n=Object.keys(this.validations).length,a=0;e(this.validations,function(e,o){t(e,o,function(){++a,a>=n&&i()})})},t.prototype._walkValidations=function(t,i,n){var a=this,o=C.Vue.util.hasOwn,r=n;return e(t,function(t,e){if(r!==!n&&o(a._scope,t.field)){var s=a._scope[t.field];s&&s[i]===!n&&(r=!n)}}),r},t.prototype._defineValid=function(t){return this._walkValidations(t(),"valid",!0)},t.prototype._defineInvalid=function(t){return!t().valid},t.prototype._defineTouched=function(t){return this._walkValidations(t(),"touched",!1)},t.prototype._defineUntouched=function(t){return!t().touched},t.prototype._defineModified=function(t){return this._walkValidations(t(),"modified",!1)},t.prototype._defineDirty=function(t){return this._walkValidations(t(),"dirty",!1)},t.prototype._definePristine=function(t){return!t().dirty},t.prototype._defineErrors=function(t){var n=this,a=C.Vue.util.hasOwn,o=C.Vue.util.isPlainObject,r=[];return e(t(),function(t,s){if(a(n._scope,t.field)){var l=n._scope[t.field];l&&!i(l.errors)&&e(l.errors,function(i,e){var n={field:t.field};o(i)?(i.validator&&(n.validator=i.validator),n.message=i.message):"string"==typeof i&&(n.message=i),r.push(n)})}}),i(r)?void 0:r.sort(function(t,i){return t.field<i.field?-1:1})},w.createClass(t,[{key:"validations",get:function(){var t=C.Vue.util.extend,i={};return t(i,this._validations),e(this._checkboxValidations,function(t,e){i[e]=t.validation}),e(this._radioValidations,function(t,e){i[e]=t.validation}),i}}]),t}();return b.version="2.1.7","undefined"!=typeof window&&window.Vue&&window.Vue.use(b),b});
},{}],9:[function(require,module,exports){
(function (process){
/*!
 * Vue.js v1.0.28
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
'use strict';

function set(obj, key, val) {
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return;
  }
  if (obj._isVue) {
    set(obj._data, key, val);
    return;
  }
  var ob = obj.__ob__;
  if (!ob) {
    obj[key] = val;
    return;
  }
  ob.convert(key, val);
  ob.dep.notify();
  if (ob.vms) {
    var i = ob.vms.length;
    while (i--) {
      var vm = ob.vms[i];
      vm._proxy(key);
      vm._digest();
    }
  }
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 *
 * @param {Object} obj
 * @param {String} key
 */

function del(obj, key) {
  if (!hasOwn(obj, key)) {
    return;
  }
  delete obj[key];
  var ob = obj.__ob__;
  if (!ob) {
    if (obj._isVue) {
      delete obj._data[key];
      obj._digest();
    }
    return;
  }
  ob.dep.notify();
  if (ob.vms) {
    var i = ob.vms.length;
    while (i--) {
      var vm = ob.vms[i];
      vm._unproxy(key);
      vm._digest();
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Check if an expression is a literal value.
 *
 * @param {String} exp
 * @return {Boolean}
 */

var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

function isLiteral(exp) {
  return literalValueRE.test(exp);
}

/**
 * Check if a string starts with $ or _
 *
 * @param {String} str
 * @return {Boolean}
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Guard text output, make sure undefined outputs
 * empty string
 *
 * @param {*} value
 * @return {String}
 */

function _toString(value) {
  return value == null ? '' : value.toString();
}

/**
 * Check and convert possible numeric strings to numbers
 * before setting back to data
 *
 * @param {*} value
 * @return {*|Number}
 */

function toNumber(value) {
  if (typeof value !== 'string') {
    return value;
  } else {
    var parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  }
}

/**
 * Convert string boolean literals into real booleans.
 *
 * @param {*} value
 * @return {*|Boolean}
 */

function toBoolean(value) {
  return value === 'true' ? true : value === 'false' ? false : value;
}

/**
 * Strip quotes from a string
 *
 * @param {String} str
 * @return {String | false}
 */

function stripQuotes(str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}

/**
 * Camelize a hyphen-delimited string.
 *
 * @param {String} str
 * @return {String}
 */

var camelizeRE = /-(\w)/g;

function camelize(str) {
  return str.replace(camelizeRE, toUpper);
}

function toUpper(_, c) {
  return c ? c.toUpperCase() : '';
}

/**
 * Hyphenate a camelCase string.
 *
 * @param {String} str
 * @return {String}
 */

var hyphenateRE = /([^-])([A-Z])/g;

function hyphenate(str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
}

/**
 * Converts hyphen/underscore/slash delimitered names into
 * camelized classNames.
 *
 * e.g. my-component => MyComponent
 *      some_else    => SomeElse
 *      some/comp    => SomeComp
 *
 * @param {String} str
 * @return {String}
 */

var classifyRE = /(?:^|[-_\/])(\w)/g;

function classify(str) {
  return str.replace(classifyRE, toUpper);
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */

function bind(fn, ctx) {
  return function (a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  };
}

/**
 * Convert an Array-like object to a real Array.
 *
 * @param {Array-like} list
 * @param {Number} [start] - start index
 * @return {Array}
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 *
 * @param {Object} to
 * @param {Object} from
 */

function extend(to, from) {
  var keys = Object.keys(from);
  var i = keys.length;
  while (i--) {
    to[keys[i]] = from[keys[i]];
  }
  return to;
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * @param {*} obj
 * @return {Boolean}
 */

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';

function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var isArray = Array.isArray;

/**
 * Define a property.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} [enumerable]
 */

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */

function _debounce(func, wait) {
  var timeout, args, context, timestamp, result;
  var later = function later() {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    return result;
  };
}

/**
 * Manual indexOf because it's slightly faster than
 * native.
 *
 * @param {Array} arr
 * @param {*} obj
 */

function indexOf(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) return i;
  }
  return -1;
}

/**
 * Make a cancellable version of an async callback.
 *
 * @param {Function} fn
 * @return {Function}
 */

function cancellable(fn) {
  var cb = function cb() {
    if (!cb.cancelled) {
      return fn.apply(this, arguments);
    }
  };
  cb.cancel = function () {
    cb.cancelled = true;
  };
  return cb;
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */

function looseEqual(a, b) {
  /* eslint-disable eqeqeq */
  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
  /* eslint-enable eqeqeq */
}

var hasProto = ('__proto__' in {});

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

// UA sniffing for working around browser-specific quirks
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && UA.indexOf('trident') > 0;
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

var transitionProp = undefined;
var transitionEndEvent = undefined;
var animationProp = undefined;
var animationEndEvent = undefined;

// Transition property/event sniffing
if (inBrowser && !isIE9) {
  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
}

/* istanbul ignore next */
function isNative(Ctor) {
  return (/native code/.test(Ctor.toString())
  );
}

/**
 * Defer a task to execute it asynchronously. Ideally this
 * should be executed as a microtask, so we leverage
 * MutationObserver if it's available, and fallback to
 * setTimeout(0).
 *
 * @param {Function} cb
 * @param {Object} ctx
 */

var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc = undefined;

  function nextTickHandler() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var noop = function noop() {};
    timerFunc = function () {
      p.then(nextTickHandler);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) setTimeout(noop);
    };
  } else if (typeof MutationObserver !== 'undefined') {
    // use MutationObserver where native Promise is not available,
    // e.g. IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = setTimeout;
  }

  return function (cb, ctx) {
    var func = ctx ? function () {
      cb.call(ctx);
    } : cb;
    callbacks.push(func);
    if (pending) return;
    pending = true;
    timerFunc(nextTickHandler, 0);
  };
})();

var _Set = undefined;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    this.set = Object.create(null);
  };
  _Set.prototype.has = function (key) {
    return this.set[key] !== undefined;
  };
  _Set.prototype.add = function (key) {
    this.set[key] = 1;
  };
  _Set.prototype.clear = function () {
    this.set = Object.create(null);
  };
}

function Cache(limit) {
  this.size = 0;
  this.limit = limit;
  this.head = this.tail = undefined;
  this._keymap = Object.create(null);
}

var p = Cache.prototype;

/**
 * Put <value> into the cache associated with <key>.
 * Returns the entry which was removed to make room for
 * the new entry. Otherwise undefined is returned.
 * (i.e. if there was enough room already).
 *
 * @param {String} key
 * @param {*} value
 * @return {Entry|undefined}
 */

p.put = function (key, value) {
  var removed;

  var entry = this.get(key, true);
  if (!entry) {
    if (this.size === this.limit) {
      removed = this.shift();
    }
    entry = {
      key: key
    };
    this._keymap[key] = entry;
    if (this.tail) {
      this.tail.newer = entry;
      entry.older = this.tail;
    } else {
      this.head = entry;
    }
    this.tail = entry;
    this.size++;
  }
  entry.value = value;

  return removed;
};

/**
 * Purge the least recently used (oldest) entry from the
 * cache. Returns the removed entry or undefined if the
 * cache was empty.
 */

p.shift = function () {
  var entry = this.head;
  if (entry) {
    this.head = this.head.newer;
    this.head.older = undefined;
    entry.newer = entry.older = undefined;
    this._keymap[entry.key] = undefined;
    this.size--;
  }
  return entry;
};

/**
 * Get and register recent use of <key>. Returns the value
 * associated with <key> or undefined if not in cache.
 *
 * @param {String} key
 * @param {Boolean} returnEntry
 * @return {Entry|*}
 */

p.get = function (key, returnEntry) {
  var entry = this._keymap[key];
  if (entry === undefined) return;
  if (entry === this.tail) {
    return returnEntry ? entry : entry.value;
  }
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  if (entry.newer) {
    if (entry === this.head) {
      this.head = entry.newer;
    }
    entry.newer.older = entry.older; // C <-- E.
  }
  if (entry.older) {
    entry.older.newer = entry.newer; // C. --> E
  }
  entry.newer = undefined; // D --x
  entry.older = this.tail; // D. --> E
  if (this.tail) {
    this.tail.newer = entry; // E. <-- D
  }
  this.tail = entry;
  return returnEntry ? entry : entry.value;
};

var cache$1 = new Cache(1000);
var reservedArgRE = /^in$|^-?\d+/;

/**
 * Parser state
 */

var str;
var dir;
var len;
var index;
var chr;
var state;
var startState = 0;
var filterState = 1;
var filterNameState = 2;
var filterArgState = 3;

var doubleChr = 0x22;
var singleChr = 0x27;
var pipeChr = 0x7C;
var escapeChr = 0x5C;
var spaceChr = 0x20;

var expStartChr = { 0x5B: 1, 0x7B: 1, 0x28: 1 };
var expChrPair = { 0x5B: 0x5D, 0x7B: 0x7D, 0x28: 0x29 };

function peek() {
  return str.charCodeAt(index + 1);
}

function next() {
  return str.charCodeAt(++index);
}

function eof() {
  return index >= len;
}

function eatSpace() {
  while (peek() === spaceChr) {
    next();
  }
}

function isStringStart(chr) {
  return chr === doubleChr || chr === singleChr;
}

function isExpStart(chr) {
  return expStartChr[chr];
}

function isExpEnd(start, chr) {
  return expChrPair[start] === chr;
}

function parseString() {
  var stringQuote = next();
  var chr;
  while (!eof()) {
    chr = next();
    // escape char
    if (chr === escapeChr) {
      next();
    } else if (chr === stringQuote) {
      break;
    }
  }
}

function parseSpecialExp(chr) {
  var inExp = 0;
  var startChr = chr;

  while (!eof()) {
    chr = peek();
    if (isStringStart(chr)) {
      parseString();
      continue;
    }

    if (startChr === chr) {
      inExp++;
    }
    if (isExpEnd(startChr, chr)) {
      inExp--;
    }

    next();

    if (inExp === 0) {
      break;
    }
  }
}

/**
 * syntax:
 * expression | filterName  [arg  arg [| filterName arg arg]]
 */

function parseExpression() {
  var start = index;
  while (!eof()) {
    chr = peek();
    if (isStringStart(chr)) {
      parseString();
    } else if (isExpStart(chr)) {
      parseSpecialExp(chr);
    } else if (chr === pipeChr) {
      next();
      chr = peek();
      if (chr === pipeChr) {
        next();
      } else {
        if (state === startState || state === filterArgState) {
          state = filterState;
        }
        break;
      }
    } else if (chr === spaceChr && (state === filterNameState || state === filterArgState)) {
      eatSpace();
      break;
    } else {
      if (state === filterState) {
        state = filterNameState;
      }
      next();
    }
  }

  return str.slice(start + 1, index) || null;
}

function parseFilterList() {
  var filters = [];
  while (!eof()) {
    filters.push(parseFilter());
  }
  return filters;
}

function parseFilter() {
  var filter = {};
  var args;

  state = filterState;
  filter.name = parseExpression().trim();

  state = filterArgState;
  args = parseFilterArguments();

  if (args.length) {
    filter.args = args;
  }
  return filter;
}

function parseFilterArguments() {
  var args = [];
  while (!eof() && state !== filterState) {
    var arg = parseExpression();
    if (!arg) {
      break;
    }
    args.push(processFilterArg(arg));
  }

  return args;
}

/**
 * Check if an argument is dynamic and strip quotes.
 *
 * @param {String} arg
 * @return {Object}
 */

function processFilterArg(arg) {
  if (reservedArgRE.test(arg)) {
    return {
      value: toNumber(arg),
      dynamic: false
    };
  } else {
    var stripped = stripQuotes(arg);
    var dynamic = stripped === arg;
    return {
      value: dynamic ? arg : stripped,
      dynamic: dynamic
    };
  }
}

/**
 * Parse a directive value and extract the expression
 * and its filters into a descriptor.
 *
 * Example:
 *
 * "a + 1 | uppercase" will yield:
 * {
 *   expression: 'a + 1',
 *   filters: [
 *     { name: 'uppercase', args: null }
 *   ]
 * }
 *
 * @param {String} s
 * @return {Object}
 */

function parseDirective(s) {
  var hit = cache$1.get(s);
  if (hit) {
    return hit;
  }

  // reset parser state
  str = s;
  dir = {};
  len = str.length;
  index = -1;
  chr = '';
  state = startState;

  var filters;

  if (str.indexOf('|') < 0) {
    dir.expression = str.trim();
  } else {
    dir.expression = parseExpression().trim();
    filters = parseFilterList();
    if (filters.length) {
      dir.filters = filters;
    }
  }

  cache$1.put(s, dir);
  return dir;
}

var directive = Object.freeze({
  parseDirective: parseDirective
});

var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
var cache = undefined;
var tagRE = undefined;
var htmlRE = undefined;
/**
 * Escape a string so it can be used in a RegExp
 * constructor.
 *
 * @param {String} str
 */

function escapeRegex(str) {
  return str.replace(regexEscapeRE, '\\$&');
}

function compileRegex() {
  var open = escapeRegex(config.delimiters[0]);
  var close = escapeRegex(config.delimiters[1]);
  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
  // reset cache
  cache = new Cache(1000);
}

/**
 * Parse a template text string into an array of tokens.
 *
 * @param {String} text
 * @return {Array<Object> | null}
 *               - {String} type
 *               - {String} value
 *               - {Boolean} [html]
 *               - {Boolean} [oneTime]
 */

function parseText(text) {
  if (!cache) {
    compileRegex();
  }
  var hit = cache.get(text);
  if (hit) {
    return hit;
  }
  if (!tagRE.test(text)) {
    return null;
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, html, value, first, oneTime;
  /* eslint-disable no-cond-assign */
  while (match = tagRE.exec(text)) {
    /* eslint-enable no-cond-assign */
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push({
        value: text.slice(lastIndex, index)
      });
    }
    // tag token
    html = htmlRE.test(match[0]);
    value = html ? match[1] : match[2];
    first = value.charCodeAt(0);
    oneTime = first === 42; // *
    value = oneTime ? value.slice(1) : value;
    tokens.push({
      tag: true,
      value: value.trim(),
      html: html,
      oneTime: oneTime
    });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({
      value: text.slice(lastIndex)
    });
  }
  cache.put(text, tokens);
  return tokens;
}

/**
 * Format a list of tokens into an expression.
 * e.g. tokens parsed from 'a {{b}} c' can be serialized
 * into one single expression as '"a " + b + " c"'.
 *
 * @param {Array} tokens
 * @param {Vue} [vm]
 * @return {String}
 */

function tokensToExp(tokens, vm) {
  if (tokens.length > 1) {
    return tokens.map(function (token) {
      return formatToken(token, vm);
    }).join('+');
  } else {
    return formatToken(tokens[0], vm, true);
  }
}

/**
 * Format a single token.
 *
 * @param {Object} token
 * @param {Vue} [vm]
 * @param {Boolean} [single]
 * @return {String}
 */

function formatToken(token, vm, single) {
  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
}

/**
 * For an attribute with multiple interpolation tags,
 * e.g. attr="some-{{thing | filter}}", in order to combine
 * the whole thing into a single watchable expression, we
 * have to inline those filters. This function does exactly
 * that. This is a bit hacky but it avoids heavy changes
 * to directive parser and watcher mechanism.
 *
 * @param {String} exp
 * @param {Boolean} single
 * @return {String}
 */

var filterRE = /[^|]\|[^|]/;
function inlineFilters(exp, single) {
  if (!filterRE.test(exp)) {
    return single ? exp : '(' + exp + ')';
  } else {
    var dir = parseDirective(exp);
    if (!dir.filters) {
      return '(' + exp + ')';
    } else {
      return 'this._applyFilters(' + dir.expression + // value
      ',null,' + // oldValue (null for read)
      JSON.stringify(dir.filters) + // filter descriptors
      ',false)'; // write?
    }
  }
}

var text = Object.freeze({
  compileRegex: compileRegex,
  parseText: parseText,
  tokensToExp: tokensToExp
});

var delimiters = ['{{', '}}'];
var unsafeDelimiters = ['{{{', '}}}'];

var config = Object.defineProperties({

  /**
   * Whether to print debug messages.
   * Also enables stack trace for warnings.
   *
   * @type {Boolean}
   */

  debug: false,

  /**
   * Whether to suppress warnings.
   *
   * @type {Boolean}
   */

  silent: false,

  /**
   * Whether to use async rendering.
   */

  async: true,

  /**
   * Whether to warn against errors caught when evaluating
   * expressions.
   */

  warnExpressionErrors: true,

  /**
   * Whether to allow devtools inspection.
   * Disabled by default in production builds.
   */

  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Internal flag to indicate the delimiters have been
   * changed.
   *
   * @type {Boolean}
   */

  _delimitersChanged: true,

  /**
   * List of asset types that a component can own.
   *
   * @type {Array}
   */

  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

  /**
   * prop binding modes
   */

  _propBindingModes: {
    ONE_WAY: 0,
    TWO_WAY: 1,
    ONE_TIME: 2
  },

  /**
   * Max circular updates allowed in a batcher flush cycle.
   */

  _maxUpdateCount: 100

}, {
  delimiters: { /**
                 * Interpolation delimiters. Changing these would trigger
                 * the text parser to re-compile the regular expressions.
                 *
                 * @type {Array<String>}
                 */

    get: function get() {
      return delimiters;
    },
    set: function set(val) {
      delimiters = val;
      compileRegex();
    },
    configurable: true,
    enumerable: true
  },
  unsafeDelimiters: {
    get: function get() {
      return unsafeDelimiters;
    },
    set: function set(val) {
      unsafeDelimiters = val;
      compileRegex();
    },
    configurable: true,
    enumerable: true
  }
});

var warn = undefined;
var formatComponentName = undefined;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var hasConsole = typeof console !== 'undefined';

    warn = function (msg, vm) {
      if (hasConsole && !config.silent) {
        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
      }
    };

    formatComponentName = function (vm) {
      var name = vm._isVue ? vm.$options.name : vm.name;
      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
    };
  })();
}

/**
 * Append with transition.
 *
 * @param {Element} el
 * @param {Element} target
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function appendWithTransition(el, target, vm, cb) {
  applyTransition(el, 1, function () {
    target.appendChild(el);
  }, vm, cb);
}

/**
 * InsertBefore with transition.
 *
 * @param {Element} el
 * @param {Element} target
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function beforeWithTransition(el, target, vm, cb) {
  applyTransition(el, 1, function () {
    before(el, target);
  }, vm, cb);
}

/**
 * Remove with transition.
 *
 * @param {Element} el
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function removeWithTransition(el, vm, cb) {
  applyTransition(el, -1, function () {
    remove(el);
  }, vm, cb);
}

/**
 * Apply transitions with an operation callback.
 *
 * @param {Element} el
 * @param {Number} direction
 *                  1: enter
 *                 -1: leave
 * @param {Function} op - the actual DOM operation
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function applyTransition(el, direction, op, vm, cb) {
  var transition = el.__v_trans;
  if (!transition ||
  // skip if there are no js hooks and CSS transition is
  // not supported
  !transition.hooks && !transitionEndEvent ||
  // skip transitions for initial compile
  !vm._isCompiled ||
  // if the vm is being manipulated by a parent directive
  // during the parent's compilation phase, skip the
  // animation.
  vm.$parent && !vm.$parent._isCompiled) {
    op();
    if (cb) cb();
    return;
  }
  var action = direction > 0 ? 'enter' : 'leave';
  transition[action](op, cb);
}

var transition = Object.freeze({
  appendWithTransition: appendWithTransition,
  beforeWithTransition: beforeWithTransition,
  removeWithTransition: removeWithTransition,
  applyTransition: applyTransition
});

/**
 * Query an element selector if it's not an element already.
 *
 * @param {String|Element} el
 * @return {Element}
 */

function query(el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
    }
  }
  return el;
}

/**
 * Check if a node is in the document.
 * Note: document.documentElement.contains should work here
 * but always returns false for comment nodes in phantomjs,
 * making unit tests difficult. This is fixed by doing the
 * contains() check on the node's parentNode instead of
 * the node itself.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function inDoc(node) {
  if (!node) return false;
  var doc = node.ownerDocument.documentElement;
  var parent = node.parentNode;
  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
}

/**
 * Get and remove an attribute from a node.
 *
 * @param {Node} node
 * @param {String} _attr
 */

function getAttr(node, _attr) {
  var val = node.getAttribute(_attr);
  if (val !== null) {
    node.removeAttribute(_attr);
  }
  return val;
}

/**
 * Get an attribute with colon or v-bind: prefix.
 *
 * @param {Node} node
 * @param {String} name
 * @return {String|null}
 */

function getBindAttr(node, name) {
  var val = getAttr(node, ':' + name);
  if (val === null) {
    val = getAttr(node, 'v-bind:' + name);
  }
  return val;
}

/**
 * Check the presence of a bind attribute.
 *
 * @param {Node} node
 * @param {String} name
 * @return {Boolean}
 */

function hasBindAttr(node, name) {
  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

function before(el, target) {
  target.parentNode.insertBefore(el, target);
}

/**
 * Insert el after target
 *
 * @param {Element} el
 * @param {Element} target
 */

function after(el, target) {
  if (target.nextSibling) {
    before(el, target.nextSibling);
  } else {
    target.parentNode.appendChild(el);
  }
}

/**
 * Remove el from DOM
 *
 * @param {Element} el
 */

function remove(el) {
  el.parentNode.removeChild(el);
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild);
  } else {
    target.appendChild(el);
  }
}

/**
 * Replace target with el
 *
 * @param {Element} target
 * @param {Element} el
 */

function replace(target, el) {
  var parent = target.parentNode;
  if (parent) {
    parent.replaceChild(el, target);
  }
}

/**
 * Add event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 * @param {Boolean} [useCapture]
 */

function on(el, event, cb, useCapture) {
  el.addEventListener(event, cb, useCapture);
}

/**
 * Remove event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 */

function off(el, event, cb) {
  el.removeEventListener(event, cb);
}

/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */

function getClass(el) {
  var classname = el.className;
  if (typeof classname === 'object') {
    classname = classname.baseVal || '';
  }
  return classname;
}

/**
 * In IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; However in
 * PhantomJS, setting `className` does not work on SVG elements...
 * So we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */

function setClass(el, cls) {
  /* istanbul ignore if */
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls;
  } else {
    el.setAttribute('class', cls);
  }
}

/**
 * Add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

function addClass(el, cls) {
  if (el.classList) {
    el.classList.add(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

function removeClass(el, cls) {
  if (el.classList) {
    el.classList.remove(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    setClass(el, cur.trim());
  }
  if (!el.className) {
    el.removeAttribute('class');
  }
}

/**
 * Extract raw content inside an element into a temporary
 * container div
 *
 * @param {Element} el
 * @param {Boolean} asFragment
 * @return {Element|DocumentFragment}
 */

function extractContent(el, asFragment) {
  var child;
  var rawContent;
  /* istanbul ignore if */
  if (isTemplate(el) && isFragment(el.content)) {
    el = el.content;
  }
  if (el.hasChildNodes()) {
    trimNode(el);
    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
    /* eslint-disable no-cond-assign */
    while (child = el.firstChild) {
      /* eslint-enable no-cond-assign */
      rawContent.appendChild(child);
    }
  }
  return rawContent;
}

/**
 * Trim possible empty head/tail text and comment
 * nodes inside a parent.
 *
 * @param {Node} node
 */

function trimNode(node) {
  var child;
  /* eslint-disable no-sequences */
  while ((child = node.firstChild, isTrimmable(child))) {
    node.removeChild(child);
  }
  while ((child = node.lastChild, isTrimmable(child))) {
    node.removeChild(child);
  }
  /* eslint-enable no-sequences */
}

function isTrimmable(node) {
  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
}

/**
 * Check if an element is a template tag.
 * Note if the template appears inside an SVG its tagName
 * will be in lowercase.
 *
 * @param {Element} el
 */

function isTemplate(el) {
  return el.tagName && el.tagName.toLowerCase() === 'template';
}

/**
 * Create an "anchor" for performing dom insertion/removals.
 * This is used in a number of scenarios:
 * - fragment instance
 * - v-html
 * - v-if
 * - v-for
 * - component
 *
 * @param {String} content
 * @param {Boolean} persist - IE trashes empty textNodes on
 *                            cloneNode(true), so in certain
 *                            cases the anchor needs to be
 *                            non-empty to be persisted in
 *                            templates.
 * @return {Comment|Text}
 */

function createAnchor(content, persist) {
  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
  anchor.__v_anchor = true;
  return anchor;
}

/**
 * Find a component ref attribute that starts with $.
 *
 * @param {Element} node
 * @return {String|undefined}
 */

var refRE = /^v-ref:/;

function findRef(node) {
  if (node.hasAttributes()) {
    var attrs = node.attributes;
    for (var i = 0, l = attrs.length; i < l; i++) {
      var name = attrs[i].name;
      if (refRE.test(name)) {
        return camelize(name.replace(refRE, ''));
      }
    }
  }
}

/**
 * Map a function to a range of nodes .
 *
 * @param {Node} node
 * @param {Node} end
 * @param {Function} op
 */

function mapNodeRange(node, end, op) {
  var next;
  while (node !== end) {
    next = node.nextSibling;
    op(node);
    node = next;
  }
  op(end);
}

/**
 * Remove a range of nodes with transition, store
 * the nodes in a fragment with correct ordering,
 * and call callback when done.
 *
 * @param {Node} start
 * @param {Node} end
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Function} cb
 */

function removeNodeRange(start, end, vm, frag, cb) {
  var done = false;
  var removed = 0;
  var nodes = [];
  mapNodeRange(start, end, function (node) {
    if (node === end) done = true;
    nodes.push(node);
    removeWithTransition(node, vm, onRemoved);
  });
  function onRemoved() {
    removed++;
    if (done && removed >= nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        frag.appendChild(nodes[i]);
      }
      cb && cb();
    }
  }
}

/**
 * Check if a node is a DocumentFragment.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function isFragment(node) {
  return node && node.nodeType === 11;
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 *
 * @param {Element} el
 * @return {String}
 */

function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
var reservedTagRE = /^(slot|partial|component)$/i;

var isUnknownElement = undefined;
if (process.env.NODE_ENV !== 'production') {
  isUnknownElement = function (el, tag) {
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    } else {
      return (/HTMLUnknownElement/.test(el.toString()) &&
        // Chrome returns unknown for several HTML5 elements.
        // https://code.google.com/p/chromium/issues/detail?id=540526
        // Firefox returns unknown for some "Interactive elements."
        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
      );
    }
  };
}

/**
 * Check if an element is a component, if yes return its
 * component id.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

function checkComponentAttr(el, options) {
  var tag = el.tagName.toLowerCase();
  var hasAttrs = el.hasAttributes();
  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
    if (resolveAsset(options, 'components', tag)) {
      return { id: tag };
    } else {
      var is = hasAttrs && getIsBinding(el, options);
      if (is) {
        return is;
      } else if (process.env.NODE_ENV !== 'production') {
        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
        if (expectedTag) {
          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
        } else if (isUnknownElement(el, tag)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
        }
      }
    }
  } else if (hasAttrs) {
    return getIsBinding(el, options);
  }
}

/**
 * Get "is" binding from an element.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

function getIsBinding(el, options) {
  // dynamic syntax
  var exp = el.getAttribute('is');
  if (exp != null) {
    if (resolveAsset(options, 'components', exp)) {
      el.removeAttribute('is');
      return { id: exp };
    }
  } else {
    exp = getBindAttr(el, 'is');
    if (exp != null) {
      return { id: exp, dynamic: true };
    }
  }
}

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 *
 * All strategy functions follow the same signature:
 *
 * @param {*} parentVal
 * @param {*} childVal
 * @param {Vue} [vm]
 */

var strats = config.optionMergeStrategies = Object.create(null);

/**
 * Helper that recursively merges two data objects together.
 */

function mergeData(to, from) {
  var key, toVal, fromVal;
  for (key in from) {
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isObject(toVal) && isObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(childVal.call(this), parentVal.call(this));
    };
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
};

/**
 * El
 */

strats.el = function (parentVal, childVal, vm) {
  if (!vm && childVal && typeof childVal !== 'function') {
    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
    return;
  }
  var ret = childVal || parentVal;
  // invoke the element factory if this is instance merge
  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
};

/**
 * Hooks and param attributes are merged as arrays.
 */

strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
};

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Events & Watchers.
 *
 * Events & watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = strats.events = function (parentVal, childVal) {
  if (!childVal) return parentVal;
  if (!parentVal) return childVal;
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent ? parent.concat(child) : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */

strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
  if (!childVal) return parentVal;
  if (!parentVal) return childVal;
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret;
};

/**
 * Default strategy.
 */

var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Make sure component options get converted to actual
 * constructors.
 *
 * @param {Object} options
 */

function guardComponents(options) {
  if (options.components) {
    var components = options.components = guardArrayAssets(options.components);
    var ids = Object.keys(components);
    var def;
    if (process.env.NODE_ENV !== 'production') {
      var map = options._componentNameMap = {};
    }
    for (var i = 0, l = ids.length; i < l; i++) {
      var key = ids[i];
      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
        continue;
      }
      // record a all lowercase <-> kebab-case mapping for
      // possible custom element case error warning
      if (process.env.NODE_ENV !== 'production') {
        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
      }
      def = components[key];
      if (isPlainObject(def)) {
        components[key] = Vue.extend(def);
      }
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 *
 * @param {Object} options
 */

function guardProps(options) {
  var props = options.props;
  var i, val;
  if (isArray(props)) {
    options.props = {};
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        options.props[val] = null;
      } else if (val.name) {
        options.props[val.name] = val;
      }
    }
  } else if (isPlainObject(props)) {
    var keys = Object.keys(props);
    i = keys.length;
    while (i--) {
      val = props[keys[i]];
      if (typeof val === 'function') {
        props[keys[i]] = { type: val };
      }
    }
  }
}

/**
 * Guard an Array-format assets option and converted it
 * into the key-value Object format.
 *
 * @param {Object|Array} assets
 * @return {Object}
 */

function guardArrayAssets(assets) {
  if (isArray(assets)) {
    var res = {};
    var i = assets.length;
    var asset;
    while (i--) {
      asset = assets[i];
      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
      if (!id) {
        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
      } else {
        res[id] = asset;
      }
    }
    return res;
  }
  return assets;
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 *
 * @param {Object} parent
 * @param {Object} child
 * @param {Vue} [vm] - if vm is present, indicates this is
 *                     an instantiation merge.
 */

function mergeOptions(parent, child, vm) {
  guardComponents(child);
  guardProps(child);
  if (process.env.NODE_ENV !== 'production') {
    if (child.propsData && !vm) {
      warn('propsData can only be used as an instantiation option.');
    }
  }
  var options = {};
  var key;
  if (child['extends']) {
    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
      parent = mergeOptions(parent, mixinOptions, vm);
    }
  }
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 *
 * @param {Object} options
 * @param {String} type
 * @param {String} id
 * @param {Boolean} warnMissing
 * @return {Object|Function}
 */

function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  var camelizedId;
  var res = assets[id] ||
  // camelCase ID
  assets[camelizedId = camelize(id)] ||
  // Pascal Case ID
  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 *
 * @constructor
 */
function Dep() {
  this.id = uid$1++;
  this.subs = [];
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;

/**
 * Add a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};

/**
 * Remove a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.removeSub = function (sub) {
  this.subs.$remove(sub);
};

/**
 * Add self as a dependency to the target watcher.
 */

Dep.prototype.depend = function () {
  Dep.target.addDep(this);
};

/**
 * Notify all subscribers of a new value.
 */

Dep.prototype.notify = function () {
  // stablize the subscriber list first
  var subs = toArray(this.subs);
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto)

/**
 * Intercept mutating methods and emit events
 */

;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result;
  });
});

/**
 * Swap the element at the given index with a new value
 * and emits corresponding event.
 *
 * @param {Number} index
 * @param {*} val
 * @return {*} - replaced element
 */

def(arrayProto, '$set', function $set(index, val) {
  if (index >= this.length) {
    this.length = Number(index) + 1;
  }
  return this.splice(index, 1, val)[0];
});

/**
 * Convenience method to remove the element at given index or target element reference.
 *
 * @param {*} item
 */

def(arrayProto, '$remove', function $remove(item) {
  /* istanbul ignore if */
  if (!this.length) return;
  var index = indexOf(this, item);
  if (index > -1) {
    return this.splice(index, 1);
  }
});

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However in certain cases, e.g.
 * v-for scope alias and props, we don't want to force conversion
 * because the value may be a nested value under a frozen data structure.
 *
 * So whenever we want to set a reactive property without forcing
 * conversion on the new value, we wrap that call inside this function.
 */

var shouldConvert = true;

function withoutConversion(fn) {
  shouldConvert = false;
  fn();
  shouldConvert = true;
}

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 *
 * @param {Array|Object} value
 * @constructor
 */

function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  def(value, '__ob__', this);
  if (isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
}

// Instance methods

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 *
 * @param {Object} obj
 */

Observer.prototype.walk = function (obj) {
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    this.convert(keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 *
 * @param {Array} items
 */

Observer.prototype.observeArray = function (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

/**
 * Convert a property into getter/setter so we can emit
 * the events when the property is accessed/changed.
 *
 * @param {String} key
 * @param {*} val
 */

Observer.prototype.convert = function (key, val) {
  defineReactive(this.value, key, val);
};

/**
 * Add an owner vm, so that when $set/$delete mutations
 * happen we can notify owner vms to proxy the keys and
 * digest the watchers. This is only called when the object
 * is observed as an instance's root $data.
 *
 * @param {Vue} vm
 */

Observer.prototype.addVm = function (vm) {
  (this.vms || (this.vms = [])).push(vm);
};

/**
 * Remove an owner vm. This is called when the object is
 * swapped out as an instance's $data object.
 *
 * @param {Vue} vm
 */

Observer.prototype.removeVm = function (vm) {
  this.vms.$remove(vm);
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 *
 * @param {Object|Array} target
 * @param {Object} src
 */

function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 *
 * @param {Object|Array} target
 * @param {Object} proto
 */

function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 *
 * @param {*} value
 * @param {Vue} [vm]
 * @return {Observer|undefined}
 * @static
 */

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (ob && vm) {
    ob.addVm(vm);
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 */

function defineReactive(obj, key, val) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (isArray(value)) {
          for (var e, i = 0, l = value.length; i < l; i++) {
            e = value[i];
            e && e.__ob__ && e.__ob__.dep.depend();
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}



var util = Object.freeze({
	defineReactive: defineReactive,
	set: set,
	del: del,
	hasOwn: hasOwn,
	isLiteral: isLiteral,
	isReserved: isReserved,
	_toString: _toString,
	toNumber: toNumber,
	toBoolean: toBoolean,
	stripQuotes: stripQuotes,
	camelize: camelize,
	hyphenate: hyphenate,
	classify: classify,
	bind: bind,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	def: def,
	debounce: _debounce,
	indexOf: indexOf,
	cancellable: cancellable,
	looseEqual: looseEqual,
	isArray: isArray,
	hasProto: hasProto,
	inBrowser: inBrowser,
	devtools: devtools,
	isIE: isIE,
	isIE9: isIE9,
	isAndroid: isAndroid,
	isIOS: isIOS,
	get transitionProp () { return transitionProp; },
	get transitionEndEvent () { return transitionEndEvent; },
	get animationProp () { return animationProp; },
	get animationEndEvent () { return animationEndEvent; },
	nextTick: nextTick,
	get _Set () { return _Set; },
	query: query,
	inDoc: inDoc,
	getAttr: getAttr,
	getBindAttr: getBindAttr,
	hasBindAttr: hasBindAttr,
	before: before,
	after: after,
	remove: remove,
	prepend: prepend,
	replace: replace,
	on: on,
	off: off,
	setClass: setClass,
	addClass: addClass,
	removeClass: removeClass,
	extractContent: extractContent,
	trimNode: trimNode,
	isTemplate: isTemplate,
	createAnchor: createAnchor,
	findRef: findRef,
	mapNodeRange: mapNodeRange,
	removeNodeRange: removeNodeRange,
	isFragment: isFragment,
	getOuterHTML: getOuterHTML,
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	checkComponentAttr: checkComponentAttr,
	commonTagRE: commonTagRE,
	reservedTagRE: reservedTagRE,
	get warn () { return warn; }
});

var uid = 0;

function initMixin (Vue) {
  /**
   * The main init sequence. This is called for every
   * instance, including ones that are created from extended
   * constructors.
   *
   * @param {Object} options - this options object should be
   *                           the result of merging class
   *                           options and the options passed
   *                           in to the constructor.
   */

  Vue.prototype._init = function (options) {
    options = options || {};

    this.$el = null;
    this.$parent = options.parent;
    this.$root = this.$parent ? this.$parent.$root : this;
    this.$children = [];
    this.$refs = {}; // child vm references
    this.$els = {}; // element references
    this._watchers = []; // all watchers as an array
    this._directives = []; // all directives

    // a uid
    this._uid = uid++;

    // a flag to avoid this being observed
    this._isVue = true;

    // events bookkeeping
    this._events = {}; // registered callbacks
    this._eventsCount = {}; // for $broadcast optimization

    // fragment instance properties
    this._isFragment = false;
    this._fragment = // @type {DocumentFragment}
    this._fragmentStart = // @type {Text|Comment}
    this._fragmentEnd = null; // @type {Text|Comment}

    // lifecycle state
    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
    this._unlinkFn = null;

    // context:
    // if this is a transcluded component, context
    // will be the common parent vm of this instance
    // and its host.
    this._context = options._context || this.$parent;

    // scope:
    // if this is inside an inline v-for, the scope
    // will be the intermediate scope created for this
    // repeat fragment. this is used for linking props
    // and container directives.
    this._scope = options._scope;

    // fragment:
    // if this instance is compiled inside a Fragment, it
    // needs to register itself as a child of that fragment
    // for attach/detach to work properly.
    this._frag = options._frag;
    if (this._frag) {
      this._frag.children.push(this);
    }

    // push self into parent / transclusion host
    if (this.$parent) {
      this.$parent.$children.push(this);
    }

    // merge options.
    options = this.$options = mergeOptions(this.constructor.options, options, this);

    // set ref
    this._updateRef();

    // initialize data as empty object.
    // it will be filled up in _initData().
    this._data = {};

    // call init hook
    this._callHook('init');

    // initialize data observation and scope inheritance.
    this._initState();

    // setup event system and option events.
    this._initEvents();

    // call created hook
    this._callHook('created');

    // if `el` option is passed, start compilation.
    if (options.el) {
      this.$mount(options.el);
    }
  };
}

var pathCache = new Cache(1000);

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Determine the type of a character in a keypath.
 *
 * @param {Char} ch
 * @return {String} type
 */

function getPathCharType(ch) {
  if (ch === undefined) {
    return 'eof';
  }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
    case 0x30:
      // 0
      return ch;

    case 0x5F: // _
    case 0x24:
      // $
      return 'ident';

    case 0x20: // Space
    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0: // No-break space
    case 0xFEFF: // Byte Order Mark
    case 0x2028: // Line Separator
    case 0x2029:
      // Paragraph Separator
      return 'ws';
  }

  // a-z, A-Z
  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
    return 'ident';
  }

  // 1-9
  if (code >= 0x31 && code <= 0x39) {
    return 'number';
  }

  return 'else';
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 *
 * @param {String} path
 * @return {String}
 */

function formatSubPath(path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
}

/**
 * Parse a string path into an array of segments
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parse(path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c, newChar, key, type, transition, action, typeMap;

  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote() {
    var nextChar = path[index + 1];
    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true;
    }
  }

  while (mode != null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue;
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return; // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined ? c : newChar;
      if (action() === false) {
        return;
      }
    }

    if (mode === AFTER_PATH) {
      keys.raw = path;
      return keys;
    }
  }
}

/**
 * External parse that check for a cache hit first
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parsePath(path) {
  var hit = pathCache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      pathCache.put(path, hit);
    }
  }
  return hit;
}

/**
 * Get from an object from a path string
 *
 * @param {Object} obj
 * @param {String} path
 */

function getPath(obj, path) {
  return parseExpression$1(path).get(obj);
}

/**
 * Warn against setting non-existent root path on a vm.
 */

var warnNonExistent;
if (process.env.NODE_ENV !== 'production') {
  warnNonExistent = function (path, vm) {
    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
  };
}

/**
 * Set on an object from a path
 *
 * @param {Object} obj
 * @param {String | Array} path
 * @param {*} val
 */

function setPath(obj, path, val) {
  var original = obj;
  if (typeof path === 'string') {
    path = parse(path);
  }
  if (!path || !isObject(obj)) {
    return false;
  }
  var last, key;
  for (var i = 0, l = path.length; i < l; i++) {
    last = obj;
    key = path[i];
    if (key.charAt(0) === '*') {
      key = parseExpression$1(key.slice(1)).get.call(original, original);
    }
    if (i < l - 1) {
      obj = obj[key];
      if (!isObject(obj)) {
        obj = {};
        if (process.env.NODE_ENV !== 'production' && last._isVue) {
          warnNonExistent(path, last);
        }
        set(last, key, obj);
      }
    } else {
      if (isArray(obj)) {
        obj.$set(key, val);
      } else if (key in obj) {
        obj[key] = val;
      } else {
        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
          warnNonExistent(path, obj);
        }
        set(obj, key, val);
      }
    }
  }
  return true;
}

var path = Object.freeze({
  parsePath: parsePath,
  getPath: getPath,
  setPath: setPath
});

var expressionCache = new Cache(1000);

var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

// keywords that don't make sense inside expressions
var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

var wsRE = /\s/g;
var newlineRE = /\n/g;
var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\"']|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
var restoreRE = /"(\d+)"/g;
var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

function noop() {}

/**
 * Save / Rewrite / Restore
 *
 * When rewriting paths found in an expression, it is
 * possible for the same letter sequences to be found in
 * strings and Object literal property keys. Therefore we
 * remove and store these parts in a temporary array, and
 * restore them after the path rewrite.
 */

var saved = [];

/**
 * Save replacer
 *
 * The save regex can match two possible cases:
 * 1. An opening object literal
 * 2. A string
 * If matched as a plain string, we need to escape its
 * newlines, since the string needs to be preserved when
 * generating the function body.
 *
 * @param {String} str
 * @param {String} isString - str if matched as a string
 * @return {String} - placeholder with index
 */

function save(str, isString) {
  var i = saved.length;
  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
  return '"' + i + '"';
}

/**
 * Path rewrite replacer
 *
 * @param {String} raw
 * @return {String}
 */

function rewrite(raw) {
  var c = raw.charAt(0);
  var path = raw.slice(1);
  if (allowedKeywordsRE.test(path)) {
    return raw;
  } else {
    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
    return c + 'scope.' + path;
  }
}

/**
 * Restore replacer
 *
 * @param {String} str
 * @param {String} i - matched save index
 * @return {String}
 */

function restore(str, i) {
  return saved[i];
}

/**
 * Rewrite an expression, prefixing all path accessors with
 * `scope.` and generate getter/setter functions.
 *
 * @param {String} exp
 * @return {Function}
 */

function compileGetter(exp) {
  if (improperKeywordsRE.test(exp)) {
    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
  }
  // reset state
  saved.length = 0;
  // save strings and object literal keys
  var body = exp.replace(saveRE, save).replace(wsRE, '');
  // rewrite all paths
  // pad 1 space here because the regex matches 1 extra char
  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
  return makeGetterFn(body);
}

/**
 * Build a getter function. Requires eval.
 *
 * We isolate the try/catch so it doesn't affect the
 * optimization of the parse function when it is not called.
 *
 * @param {String} body
 * @return {Function|undefined}
 */

function makeGetterFn(body) {
  try {
    /* eslint-disable no-new-func */
    return new Function('scope', 'return ' + body + ';');
    /* eslint-enable no-new-func */
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (e.toString().match(/unsafe-eval|CSP/)) {
        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
      } else {
        warn('Invalid expression. ' + 'Generated function body: ' + body);
      }
    }
    return noop;
  }
}

/**
 * Compile a setter function for the expression.
 *
 * @param {String} exp
 * @return {Function|undefined}
 */

function compileSetter(exp) {
  var path = parsePath(exp);
  if (path) {
    return function (scope, val) {
      setPath(scope, path, val);
    };
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
  }
}

/**
 * Parse an expression into re-written getter/setters.
 *
 * @param {String} exp
 * @param {Boolean} needSet
 * @return {Function}
 */

function parseExpression$1(exp, needSet) {
  exp = exp.trim();
  // try cache
  var hit = expressionCache.get(exp);
  if (hit) {
    if (needSet && !hit.set) {
      hit.set = compileSetter(hit.exp);
    }
    return hit;
  }
  var res = { exp: exp };
  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
  // optimized super simple getter
  ? makeGetterFn('scope.' + exp)
  // dynamic getter
  : compileGetter(exp);
  if (needSet) {
    res.set = compileSetter(exp);
  }
  expressionCache.put(exp, res);
  return res;
}

/**
 * Check if an expression is a simple path.
 *
 * @param {String} exp
 * @return {Boolean}
 */

function isSimplePath(exp) {
  return pathTestRE.test(exp) &&
  // don't treat literal values as paths
  !literalValueRE$1.test(exp) &&
  // Math constants e.g. Math.PI, Math.E etc.
  exp.slice(0, 5) !== 'Math.';
}

var expression = Object.freeze({
  parseExpression: parseExpression$1,
  isSimplePath: isSimplePath
});

// we have two separate queues: one for directive updates
// and one for user watcher registered via $watch().
// we want to guarantee directive updates to be called
// before user watchers so that when user watchers are
// triggered, the DOM would have already been in updated
// state.

var queue = [];
var userQueue = [];
var has = {};
var circular = {};
var waiting = false;

/**
 * Reset the batcher's state.
 */

function resetBatcherState() {
  queue.length = 0;
  userQueue.length = 0;
  has = {};
  circular = {};
  waiting = false;
}

/**
 * Flush both queues and run the watchers.
 */

function flushBatcherQueue() {
  var _again = true;

  _function: while (_again) {
    _again = false;

    runBatcherQueue(queue);
    runBatcherQueue(userQueue);
    // user watchers triggered more watchers,
    // keep flushing until it depletes
    if (queue.length) {
      _again = true;
      continue _function;
    }
    // dev tool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
    resetBatcherState();
  }
}

/**
 * Run the watchers in a single queue.
 *
 * @param {Array} queue
 */

function runBatcherQueue(queue) {
  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (var i = 0; i < queue.length; i++) {
    var watcher = queue[i];
    var id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
        break;
      }
    }
  }
  queue.length = 0;
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 *
 * @param {Watcher} watcher
 *   properties:
 *   - {Number} id
 *   - {Function} run
 */

function pushWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    // push watcher into appropriate queue
    var q = watcher.user ? userQueue : queue;
    has[id] = q.length;
    q.push(watcher);
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushBatcherQueue);
    }
  }
}

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 *
 * @param {Vue} vm
 * @param {String|Function} expOrFn
 * @param {Function} cb
 * @param {Object} options
 *                 - {Array} filters
 *                 - {Boolean} twoWay
 *                 - {Boolean} deep
 *                 - {Boolean} user
 *                 - {Boolean} sync
 *                 - {Boolean} lazy
 *                 - {Function} [preProcess]
 *                 - {Function} [postProcess]
 * @constructor
 */
function Watcher(vm, expOrFn, cb, options) {
  // mix in options
  if (options) {
    extend(this, options);
  }
  var isFn = typeof expOrFn === 'function';
  this.vm = vm;
  vm._watchers.push(this);
  this.expression = expOrFn;
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.prevError = null; // for async error stacks
  // parse expression for getter/setter
  if (isFn) {
    this.getter = expOrFn;
    this.setter = undefined;
  } else {
    var res = parseExpression$1(expOrFn, this.twoWay);
    this.getter = res.get;
    this.setter = res.set;
  }
  this.value = this.lazy ? undefined : this.get();
  // state for avoiding false triggers for deep and Array
  // watchers during vm._digest()
  this.queued = this.shallow = false;
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */

Watcher.prototype.get = function () {
  this.beforeGet();
  var scope = this.scope || this.vm;
  var value;
  try {
    value = this.getter.call(scope, scope);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
    }
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  if (this.preProcess) {
    value = this.preProcess(value);
  }
  if (this.filters) {
    value = scope._applyFilters(value, null, this.filters, false);
  }
  if (this.postProcess) {
    value = this.postProcess(value);
  }
  this.afterGet();
  return value;
};

/**
 * Set the corresponding value with the setter.
 *
 * @param {*} value
 */

Watcher.prototype.set = function (value) {
  var scope = this.scope || this.vm;
  if (this.filters) {
    value = scope._applyFilters(value, this.value, this.filters, true);
  }
  try {
    this.setter.call(scope, scope, value);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
    }
  }
  // two-way sync for v-for alias
  var forContext = scope.$forContext;
  if (forContext && forContext.alias === this.expression) {
    if (forContext.filters) {
      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
      return;
    }
    forContext._withLock(function () {
      if (scope.$key) {
        // original is an object
        forContext.rawValue[scope.$key] = value;
      } else {
        forContext.rawValue.$set(scope.$index, value);
      }
    });
  }
};

/**
 * Prepare for dependency collection.
 */

Watcher.prototype.beforeGet = function () {
  Dep.target = this;
};

/**
 * Add a dependency to this directive.
 *
 * @param {Dep} dep
 */

Watcher.prototype.addDep = function (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */

Watcher.prototype.afterGet = function () {
  Dep.target = null;
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 *
 * @param {Boolean} shallow
 */

Watcher.prototype.update = function (shallow) {
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync || !config.async) {
    this.run();
  } else {
    // if queued, only overwrite shallow with non-shallow,
    // but not the other way around.
    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
    this.queued = true;
    // record before-push error stack in debug mode
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.debug) {
      this.prevError = new Error('[vue] async stack trace');
    }
    pushWatcher(this);
  }
};

/**
 * Batcher job interface.
 * Will be called by the batcher.
 */

Watcher.prototype.run = function () {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated; but only do so if this is a
    // non-shallow update (caused by a vm digest).
    (isObject(value) || this.deep) && !this.shallow) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      // in debug + async mode, when a watcher callbacks
      // throws, we also throw the saved before-push error
      // so the full cross-tick stack trace is available.
      var prevError = this.prevError;
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
        this.prevError = null;
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          nextTick(function () {
            throw prevError;
          }, 0);
          throw e;
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
    this.queued = this.shallow = false;
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */

Watcher.prototype.evaluate = function () {
  // avoid overwriting another watcher that is being
  // collected.
  var current = Dep.target;
  this.value = this.get();
  this.dirty = false;
  Dep.target = current;
};

/**
 * Depend on all deps collected by this watcher.
 */

Watcher.prototype.depend = function () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subcriber list.
 */

Watcher.prototype.teardown = function () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed or is performing a v-for
    // re-render (the watcher list is then filtered by v-for).
    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
      this.vm._watchers.$remove(this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
    this.vm = this.cb = this.value = null;
  }
};

/**
 * Recrusively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 *
 * @param {*} val
 */

var seenObjects = new _Set();
function traverse(val, seen) {
  var i = undefined,
      keys = undefined;
  if (!seen) {
    seen = seenObjects;
    seen.clear();
  }
  var isA = isArray(val);
  var isO = isObject(val);
  if ((isA || isO) && Object.isExtensible(val)) {
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      } else {
        seen.add(depId);
      }
    }
    if (isA) {
      i = val.length;
      while (i--) traverse(val[i], seen);
    } else if (isO) {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) traverse(val[keys[i]], seen);
    }
  }
}

var text$1 = {

  bind: function bind() {
    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
  },

  update: function update(value) {
    this.el[this.attr] = _toString(value);
  }
};

var templateCache = new Cache(1000);
var idSelectorCache = new Cache(1000);

var map = {
  efault: [0, '', ''],
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
};

map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

/**
 * Check if a node is a supported template node with a
 * DocumentFragment content.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function isRealTemplate(node) {
  return isTemplate(node) && isFragment(node.content);
}

var tagRE$1 = /<([\w:-]+)/;
var entityRE = /&#?\w+?;/;
var commentRE = /<!--/;

/**
 * Convert a string template to a DocumentFragment.
 * Determines correct wrapping by tag types. Wrapping
 * strategy found in jQuery & component/domify.
 *
 * @param {String} templateString
 * @param {Boolean} raw
 * @return {DocumentFragment}
 */

function stringToFragment(templateString, raw) {
  // try a cache hit first
  var cacheKey = raw ? templateString : templateString.trim();
  var hit = templateCache.get(cacheKey);
  if (hit) {
    return hit;
  }

  var frag = document.createDocumentFragment();
  var tagMatch = templateString.match(tagRE$1);
  var entityMatch = entityRE.test(templateString);
  var commentMatch = commentRE.test(templateString);

  if (!tagMatch && !entityMatch && !commentMatch) {
    // text only, return a single text node.
    frag.appendChild(document.createTextNode(templateString));
  } else {
    var tag = tagMatch && tagMatch[1];
    var wrap = map[tag] || map.efault;
    var depth = wrap[0];
    var prefix = wrap[1];
    var suffix = wrap[2];
    var node = document.createElement('div');

    node.innerHTML = prefix + templateString + suffix;
    while (depth--) {
      node = node.lastChild;
    }

    var child;
    /* eslint-disable no-cond-assign */
    while (child = node.firstChild) {
      /* eslint-enable no-cond-assign */
      frag.appendChild(child);
    }
  }
  if (!raw) {
    trimNode(frag);
  }
  templateCache.put(cacheKey, frag);
  return frag;
}

/**
 * Convert a template node to a DocumentFragment.
 *
 * @param {Node} node
 * @return {DocumentFragment}
 */

function nodeToFragment(node) {
  // if its a template tag and the browser supports it,
  // its content is already a document fragment. However, iOS Safari has
  // bug when using directly cloned template content with touch
  // events and can cause crashes when the nodes are removed from DOM, so we
  // have to treat template elements as string templates. (#2805)
  /* istanbul ignore if */
  if (isRealTemplate(node)) {
    return stringToFragment(node.innerHTML);
  }
  // script template
  if (node.tagName === 'SCRIPT') {
    return stringToFragment(node.textContent);
  }
  // normal node, clone it to avoid mutating the original
  var clonedNode = cloneNode(node);
  var frag = document.createDocumentFragment();
  var child;
  /* eslint-disable no-cond-assign */
  while (child = clonedNode.firstChild) {
    /* eslint-enable no-cond-assign */
    frag.appendChild(child);
  }
  trimNode(frag);
  return frag;
}

// Test for the presence of the Safari template cloning bug
// https://bugs.webkit.org/showug.cgi?id=137755
var hasBrokenTemplate = (function () {
  /* istanbul ignore else */
  if (inBrowser) {
    var a = document.createElement('div');
    a.innerHTML = '<template>1</template>';
    return !a.cloneNode(true).firstChild.innerHTML;
  } else {
    return false;
  }
})();

// Test for IE10/11 textarea placeholder clone bug
var hasTextareaCloneBug = (function () {
  /* istanbul ignore else */
  if (inBrowser) {
    var t = document.createElement('textarea');
    t.placeholder = 't';
    return t.cloneNode(true).value === 't';
  } else {
    return false;
  }
})();

/**
 * 1. Deal with Safari cloning nested <template> bug by
 *    manually cloning all template instances.
 * 2. Deal with IE10/11 textarea placeholder bug by setting
 *    the correct value after cloning.
 *
 * @param {Element|DocumentFragment} node
 * @return {Element|DocumentFragment}
 */

function cloneNode(node) {
  /* istanbul ignore if */
  if (!node.querySelectorAll) {
    return node.cloneNode();
  }
  var res = node.cloneNode(true);
  var i, original, cloned;
  /* istanbul ignore if */
  if (hasBrokenTemplate) {
    var tempClone = res;
    if (isRealTemplate(node)) {
      node = node.content;
      tempClone = res.content;
    }
    original = node.querySelectorAll('template');
    if (original.length) {
      cloned = tempClone.querySelectorAll('template');
      i = cloned.length;
      while (i--) {
        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
      }
    }
  }
  /* istanbul ignore if */
  if (hasTextareaCloneBug) {
    if (node.tagName === 'TEXTAREA') {
      res.value = node.value;
    } else {
      original = node.querySelectorAll('textarea');
      if (original.length) {
        cloned = res.querySelectorAll('textarea');
        i = cloned.length;
        while (i--) {
          cloned[i].value = original[i].value;
        }
      }
    }
  }
  return res;
}

/**
 * Process the template option and normalizes it into a
 * a DocumentFragment that can be used as a partial or a
 * instance template.
 *
 * @param {*} template
 *        Possible values include:
 *        - DocumentFragment object
 *        - Node object of type Template
 *        - id selector: '#some-template-id'
 *        - template string: '<div><span>{{msg}}</span></div>'
 * @param {Boolean} shouldClone
 * @param {Boolean} raw
 *        inline HTML interpolation. Do not check for id
 *        selector and keep whitespace in the string.
 * @return {DocumentFragment|undefined}
 */

function parseTemplate(template, shouldClone, raw) {
  var node, frag;

  // if the template is already a document fragment,
  // do nothing
  if (isFragment(template)) {
    trimNode(template);
    return shouldClone ? cloneNode(template) : template;
  }

  if (typeof template === 'string') {
    // id selector
    if (!raw && template.charAt(0) === '#') {
      // id selector can be cached too
      frag = idSelectorCache.get(template);
      if (!frag) {
        node = document.getElementById(template.slice(1));
        if (node) {
          frag = nodeToFragment(node);
          // save selector to cache
          idSelectorCache.put(template, frag);
        }
      }
    } else {
      // normal string template
      frag = stringToFragment(template, raw);
    }
  } else if (template.nodeType) {
    // a direct node
    frag = nodeToFragment(template);
  }

  return frag && shouldClone ? cloneNode(frag) : frag;
}

var template = Object.freeze({
  cloneNode: cloneNode,
  parseTemplate: parseTemplate
});

var html = {

  bind: function bind() {
    // a comment node means this is a binding for
    // {{{ inline unescaped html }}}
    if (this.el.nodeType === 8) {
      // hold nodes
      this.nodes = [];
      // replace the placeholder with proper anchor
      this.anchor = createAnchor('v-html');
      replace(this.el, this.anchor);
    }
  },

  update: function update(value) {
    value = _toString(value);
    if (this.nodes) {
      this.swap(value);
    } else {
      this.el.innerHTML = value;
    }
  },

  swap: function swap(value) {
    // remove old nodes
    var i = this.nodes.length;
    while (i--) {
      remove(this.nodes[i]);
    }
    // convert new value to a fragment
    // do not attempt to retrieve from id selector
    var frag = parseTemplate(value, true, true);
    // save a reference to these nodes so we can remove later
    this.nodes = toArray(frag.childNodes);
    before(frag, this.anchor);
  }
};

/**
 * Abstraction for a partially-compiled fragment.
 * Can optionally compile content with a child scope.
 *
 * @param {Function} linker
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Vue} [host]
 * @param {Object} [scope]
 * @param {Fragment} [parentFrag]
 */
function Fragment(linker, vm, frag, host, scope, parentFrag) {
  this.children = [];
  this.childFrags = [];
  this.vm = vm;
  this.scope = scope;
  this.inserted = false;
  this.parentFrag = parentFrag;
  if (parentFrag) {
    parentFrag.childFrags.push(this);
  }
  this.unlink = linker(vm, frag, host, scope, this);
  var single = this.single = frag.childNodes.length === 1 &&
  // do not go single mode if the only node is an anchor
  !frag.childNodes[0].__v_anchor;
  if (single) {
    this.node = frag.childNodes[0];
    this.before = singleBefore;
    this.remove = singleRemove;
  } else {
    this.node = createAnchor('fragment-start');
    this.end = createAnchor('fragment-end');
    this.frag = frag;
    prepend(this.node, frag);
    frag.appendChild(this.end);
    this.before = multiBefore;
    this.remove = multiRemove;
  }
  this.node.__v_frag = this;
}

/**
 * Call attach/detach for all components contained within
 * this fragment. Also do so recursively for all child
 * fragments.
 *
 * @param {Function} hook
 */

Fragment.prototype.callHook = function (hook) {
  var i, l;
  for (i = 0, l = this.childFrags.length; i < l; i++) {
    this.childFrags[i].callHook(hook);
  }
  for (i = 0, l = this.children.length; i < l; i++) {
    hook(this.children[i]);
  }
};

/**
 * Insert fragment before target, single node version
 *
 * @param {Node} target
 * @param {Boolean} withTransition
 */

function singleBefore(target, withTransition) {
  this.inserted = true;
  var method = withTransition !== false ? beforeWithTransition : before;
  method(this.node, target, this.vm);
  if (inDoc(this.node)) {
    this.callHook(attach);
  }
}

/**
 * Remove fragment, single node version
 */

function singleRemove() {
  this.inserted = false;
  var shouldCallRemove = inDoc(this.node);
  var self = this;
  this.beforeRemove();
  removeWithTransition(this.node, this.vm, function () {
    if (shouldCallRemove) {
      self.callHook(detach);
    }
    self.destroy();
  });
}

/**
 * Insert fragment before target, multi-nodes version
 *
 * @param {Node} target
 * @param {Boolean} withTransition
 */

function multiBefore(target, withTransition) {
  this.inserted = true;
  var vm = this.vm;
  var method = withTransition !== false ? beforeWithTransition : before;
  mapNodeRange(this.node, this.end, function (node) {
    method(node, target, vm);
  });
  if (inDoc(this.node)) {
    this.callHook(attach);
  }
}

/**
 * Remove fragment, multi-nodes version
 */

function multiRemove() {
  this.inserted = false;
  var self = this;
  var shouldCallRemove = inDoc(this.node);
  this.beforeRemove();
  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
    if (shouldCallRemove) {
      self.callHook(detach);
    }
    self.destroy();
  });
}

/**
 * Prepare the fragment for removal.
 */

Fragment.prototype.beforeRemove = function () {
  var i, l;
  for (i = 0, l = this.childFrags.length; i < l; i++) {
    // call the same method recursively on child
    // fragments, depth-first
    this.childFrags[i].beforeRemove(false);
  }
  for (i = 0, l = this.children.length; i < l; i++) {
    // Call destroy for all contained instances,
    // with remove:false and defer:true.
    // Defer is necessary because we need to
    // keep the children to call detach hooks
    // on them.
    this.children[i].$destroy(false, true);
  }
  var dirs = this.unlink.dirs;
  for (i = 0, l = dirs.length; i < l; i++) {
    // disable the watchers on all the directives
    // so that the rendered content stays the same
    // during removal.
    dirs[i]._watcher && dirs[i]._watcher.teardown();
  }
};

/**
 * Destroy the fragment.
 */

Fragment.prototype.destroy = function () {
  if (this.parentFrag) {
    this.parentFrag.childFrags.$remove(this);
  }
  this.node.__v_frag = null;
  this.unlink();
};

/**
 * Call attach hook for a Vue instance.
 *
 * @param {Vue} child
 */

function attach(child) {
  if (!child._isAttached && inDoc(child.$el)) {
    child._callHook('attached');
  }
}

/**
 * Call detach hook for a Vue instance.
 *
 * @param {Vue} child
 */

function detach(child) {
  if (child._isAttached && !inDoc(child.$el)) {
    child._callHook('detached');
  }
}

var linkerCache = new Cache(5000);

/**
 * A factory that can be used to create instances of a
 * fragment. Caches the compiled linker if possible.
 *
 * @param {Vue} vm
 * @param {Element|String} el
 */
function FragmentFactory(vm, el) {
  this.vm = vm;
  var template;
  var isString = typeof el === 'string';
  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
    template = parseTemplate(el, true);
  } else {
    template = document.createDocumentFragment();
    template.appendChild(el);
  }
  this.template = template;
  // linker can be cached, but only for components
  var linker;
  var cid = vm.constructor.cid;
  if (cid > 0) {
    var cacheId = cid + (isString ? el : getOuterHTML(el));
    linker = linkerCache.get(cacheId);
    if (!linker) {
      linker = compile(template, vm.$options, true);
      linkerCache.put(cacheId, linker);
    }
  } else {
    linker = compile(template, vm.$options, true);
  }
  this.linker = linker;
}

/**
 * Create a fragment instance with given host and scope.
 *
 * @param {Vue} host
 * @param {Object} scope
 * @param {Fragment} parentFrag
 */

FragmentFactory.prototype.create = function (host, scope, parentFrag) {
  var frag = cloneNode(this.template);
  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
};

var ON = 700;
var MODEL = 800;
var BIND = 850;
var TRANSITION = 1100;
var EL = 1500;
var COMPONENT = 1500;
var PARTIAL = 1750;
var IF = 2100;
var FOR = 2200;
var SLOT = 2300;

var uid$3 = 0;

var vFor = {

  priority: FOR,
  terminal: true,

  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

  bind: function bind() {
    if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('v-if')) {
      warn('<' + this.el.tagName.toLowerCase() + ' v-for="' + this.expression + '" v-if="' + this.el.getAttribute('v-if') + '">: ' + 'Using v-if and v-for on the same element is not recommended - ' + 'consider filtering the source Array instead.', this.vm);
    }

    // support "item in/of items" syntax
    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
    if (inMatch) {
      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
      if (itMatch) {
        this.iterator = itMatch[1].trim();
        this.alias = itMatch[2].trim();
      } else {
        this.alias = inMatch[1].trim();
      }
      this.expression = inMatch[2];
    }

    if (!this.alias) {
      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
      return;
    }

    // uid as a cache identifier
    this.id = '__v-for__' + ++uid$3;

    // check if this is an option list,
    // so that we know if we need to update the <select>'s
    // v-model when the option list has changed.
    // because v-model has a lower priority than v-for,
    // the v-model is not bound here yet, so we have to
    // retrive it in the actual updateModel() function.
    var tag = this.el.tagName;
    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

    // setup anchor nodes
    this.start = createAnchor('v-for-start');
    this.end = createAnchor('v-for-end');
    replace(this.el, this.end);
    before(this.start, this.end);

    // cache
    this.cache = Object.create(null);

    // fragment factory
    this.factory = new FragmentFactory(this.vm, this.el);
  },

  update: function update(data) {
    this.diff(data);
    this.updateRef();
    this.updateModel();
  },

  /**
   * Diff, based on new data and old data, determine the
   * minimum amount of DOM manipulations needed to make the
   * DOM reflect the new data Array.
   *
   * The algorithm diffs the new data Array by storing a
   * hidden reference to an owner vm instance on previously
   * seen data. This allows us to achieve O(n) which is
   * better than a levenshtein distance based algorithm,
   * which is O(m * n).
   *
   * @param {Array} data
   */

  diff: function diff(data) {
    // check if the Array was converted from an Object
    var item = data[0];
    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

    var trackByKey = this.params.trackBy;
    var oldFrags = this.frags;
    var frags = this.frags = new Array(data.length);
    var alias = this.alias;
    var iterator = this.iterator;
    var start = this.start;
    var end = this.end;
    var inDocument = inDoc(start);
    var init = !oldFrags;
    var i, l, frag, key, value, primitive;

    // First pass, go through the new Array and fill up
    // the new frags array. If a piece of data has a cached
    // instance for it, we reuse it. Otherwise build a new
    // instance.
    for (i = 0, l = data.length; i < l; i++) {
      item = data[i];
      key = convertedFromObject ? item.$key : null;
      value = convertedFromObject ? item.$value : item;
      primitive = !isObject(value);
      frag = !init && this.getCachedFrag(value, i, key);
      if (frag) {
        // reusable fragment
        frag.reused = true;
        // update $index
        frag.scope.$index = i;
        // update $key
        if (key) {
          frag.scope.$key = key;
        }
        // update iterator
        if (iterator) {
          frag.scope[iterator] = key !== null ? key : i;
        }
        // update data for track-by, object repeat &
        // primitive values.
        if (trackByKey || convertedFromObject || primitive) {
          withoutConversion(function () {
            frag.scope[alias] = value;
          });
        }
      } else {
        // new instance
        frag = this.create(value, alias, i, key);
        frag.fresh = !init;
      }
      frags[i] = frag;
      if (init) {
        frag.before(end);
      }
    }

    // we're done for the initial render.
    if (init) {
      return;
    }

    // Second pass, go through the old fragments and
    // destroy those who are not reused (and remove them
    // from cache)
    var removalIndex = 0;
    var totalRemoved = oldFrags.length - frags.length;
    // when removing a large number of fragments, watcher removal
    // turns out to be a perf bottleneck, so we batch the watcher
    // removals into a single filter call!
    this.vm._vForRemoving = true;
    for (i = 0, l = oldFrags.length; i < l; i++) {
      frag = oldFrags[i];
      if (!frag.reused) {
        this.deleteCachedFrag(frag);
        this.remove(frag, removalIndex++, totalRemoved, inDocument);
      }
    }
    this.vm._vForRemoving = false;
    if (removalIndex) {
      this.vm._watchers = this.vm._watchers.filter(function (w) {
        return w.active;
      });
    }

    // Final pass, move/insert new fragments into the
    // right place.
    var targetPrev, prevEl, currentPrev;
    var insertionIndex = 0;
    for (i = 0, l = frags.length; i < l; i++) {
      frag = frags[i];
      // this is the frag that we should be after
      targetPrev = frags[i - 1];
      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
      if (frag.reused && !frag.staggerCb) {
        currentPrev = findPrevFrag(frag, start, this.id);
        if (currentPrev !== targetPrev && (!currentPrev ||
        // optimization for moving a single item.
        // thanks to suggestions by @livoras in #1807
        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
          this.move(frag, prevEl);
        }
      } else {
        // new instance, or still in stagger.
        // insert with updated stagger index.
        this.insert(frag, insertionIndex++, prevEl, inDocument);
      }
      frag.reused = frag.fresh = false;
    }
  },

  /**
   * Create a new fragment instance.
   *
   * @param {*} value
   * @param {String} alias
   * @param {Number} index
   * @param {String} [key]
   * @return {Fragment}
   */

  create: function create(value, alias, index, key) {
    var host = this._host;
    // create iteration scope
    var parentScope = this._scope || this.vm;
    var scope = Object.create(parentScope);
    // ref holder for the scope
    scope.$refs = Object.create(parentScope.$refs);
    scope.$els = Object.create(parentScope.$els);
    // make sure point $parent to parent scope
    scope.$parent = parentScope;
    // for two-way binding on alias
    scope.$forContext = this;
    // define scope properties
    // important: define the scope alias without forced conversion
    // so that frozen data structures remain non-reactive.
    withoutConversion(function () {
      defineReactive(scope, alias, value);
    });
    defineReactive(scope, '$index', index);
    if (key) {
      defineReactive(scope, '$key', key);
    } else if (scope.$key) {
      // avoid accidental fallback
      def(scope, '$key', null);
    }
    if (this.iterator) {
      defineReactive(scope, this.iterator, key !== null ? key : index);
    }
    var frag = this.factory.create(host, scope, this._frag);
    frag.forId = this.id;
    this.cacheFrag(value, frag, index, key);
    return frag;
  },

  /**
   * Update the v-ref on owner vm.
   */

  updateRef: function updateRef() {
    var ref = this.descriptor.ref;
    if (!ref) return;
    var hash = (this._scope || this.vm).$refs;
    var refs;
    if (!this.fromObject) {
      refs = this.frags.map(findVmFromFrag);
    } else {
      refs = {};
      this.frags.forEach(function (frag) {
        refs[frag.scope.$key] = findVmFromFrag(frag);
      });
    }
    hash[ref] = refs;
  },

  /**
   * For option lists, update the containing v-model on
   * parent <select>.
   */

  updateModel: function updateModel() {
    if (this.isOption) {
      var parent = this.start.parentNode;
      var model = parent && parent.__v_model;
      if (model) {
        model.forceUpdate();
      }
    }
  },

  /**
   * Insert a fragment. Handles staggering.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Node} prevEl
   * @param {Boolean} inDocument
   */

  insert: function insert(frag, index, prevEl, inDocument) {
    if (frag.staggerCb) {
      frag.staggerCb.cancel();
      frag.staggerCb = null;
    }
    var staggerAmount = this.getStagger(frag, index, null, 'enter');
    if (inDocument && staggerAmount) {
      // create an anchor and insert it synchronously,
      // so that we can resolve the correct order without
      // worrying about some elements not inserted yet
      var anchor = frag.staggerAnchor;
      if (!anchor) {
        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
        anchor.__v_frag = frag;
      }
      after(anchor, prevEl);
      var op = frag.staggerCb = cancellable(function () {
        frag.staggerCb = null;
        frag.before(anchor);
        remove(anchor);
      });
      setTimeout(op, staggerAmount);
    } else {
      var target = prevEl.nextSibling;
      /* istanbul ignore if */
      if (!target) {
        // reset end anchor position in case the position was messed up
        // by an external drag-n-drop library.
        after(this.end, prevEl);
        target = this.end;
      }
      frag.before(target);
    }
  },

  /**
   * Remove a fragment. Handles staggering.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Number} total
   * @param {Boolean} inDocument
   */

  remove: function remove(frag, index, total, inDocument) {
    if (frag.staggerCb) {
      frag.staggerCb.cancel();
      frag.staggerCb = null;
      // it's not possible for the same frag to be removed
      // twice, so if we have a pending stagger callback,
      // it means this frag is queued for enter but removed
      // before its transition started. Since it is already
      // destroyed, we can just leave it in detached state.
      return;
    }
    var staggerAmount = this.getStagger(frag, index, total, 'leave');
    if (inDocument && staggerAmount) {
      var op = frag.staggerCb = cancellable(function () {
        frag.staggerCb = null;
        frag.remove();
      });
      setTimeout(op, staggerAmount);
    } else {
      frag.remove();
    }
  },

  /**
   * Move a fragment to a new position.
   * Force no transition.
   *
   * @param {Fragment} frag
   * @param {Node} prevEl
   */

  move: function move(frag, prevEl) {
    // fix a common issue with Sortable:
    // if prevEl doesn't have nextSibling, this means it's
    // been dragged after the end anchor. Just re-position
    // the end anchor to the end of the container.
    /* istanbul ignore if */
    if (!prevEl.nextSibling) {
      this.end.parentNode.appendChild(this.end);
    }
    frag.before(prevEl.nextSibling, false);
  },

  /**
   * Cache a fragment using track-by or the object key.
   *
   * @param {*} value
   * @param {Fragment} frag
   * @param {Number} index
   * @param {String} [key]
   */

  cacheFrag: function cacheFrag(value, frag, index, key) {
    var trackByKey = this.params.trackBy;
    var cache = this.cache;
    var primitive = !isObject(value);
    var id;
    if (key || trackByKey || primitive) {
      id = getTrackByKey(index, key, value, trackByKey);
      if (!cache[id]) {
        cache[id] = frag;
      } else if (trackByKey !== '$index') {
        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
      }
    } else {
      id = this.id;
      if (hasOwn(value, id)) {
        if (value[id] === null) {
          value[id] = frag;
        } else {
          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
        }
      } else if (Object.isExtensible(value)) {
        def(value, id, frag);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
      }
    }
    frag.raw = value;
  },

  /**
   * Get a cached fragment from the value/index/key
   *
   * @param {*} value
   * @param {Number} index
   * @param {String} key
   * @return {Fragment}
   */

  getCachedFrag: function getCachedFrag(value, index, key) {
    var trackByKey = this.params.trackBy;
    var primitive = !isObject(value);
    var frag;
    if (key || trackByKey || primitive) {
      var id = getTrackByKey(index, key, value, trackByKey);
      frag = this.cache[id];
    } else {
      frag = value[this.id];
    }
    if (frag && (frag.reused || frag.fresh)) {
      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
    }
    return frag;
  },

  /**
   * Delete a fragment from cache.
   *
   * @param {Fragment} frag
   */

  deleteCachedFrag: function deleteCachedFrag(frag) {
    var value = frag.raw;
    var trackByKey = this.params.trackBy;
    var scope = frag.scope;
    var index = scope.$index;
    // fix #948: avoid accidentally fall through to
    // a parent repeater which happens to have $key.
    var key = hasOwn(scope, '$key') && scope.$key;
    var primitive = !isObject(value);
    if (trackByKey || key || primitive) {
      var id = getTrackByKey(index, key, value, trackByKey);
      this.cache[id] = null;
    } else {
      value[this.id] = null;
      frag.raw = null;
    }
  },

  /**
   * Get the stagger amount for an insertion/removal.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Number} total
   * @param {String} type
   */

  getStagger: function getStagger(frag, index, total, type) {
    type = type + 'Stagger';
    var trans = frag.node.__v_trans;
    var hooks = trans && trans.hooks;
    var hook = hooks && (hooks[type] || hooks.stagger);
    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
  },

  /**
   * Pre-process the value before piping it through the
   * filters. This is passed to and called by the watcher.
   */

  _preProcess: function _preProcess(value) {
    // regardless of type, store the un-filtered raw value.
    this.rawValue = value;
    return value;
  },

  /**
   * Post-process the value after it has been piped through
   * the filters. This is passed to and called by the watcher.
   *
   * It is necessary for this to be called during the
   * watcher's dependency collection phase because we want
   * the v-for to update when the source Object is mutated.
   */

  _postProcess: function _postProcess(value) {
    if (isArray(value)) {
      return value;
    } else if (isPlainObject(value)) {
      // convert plain object to array.
      var keys = Object.keys(value);
      var i = keys.length;
      var res = new Array(i);
      var key;
      while (i--) {
        key = keys[i];
        res[i] = {
          $key: key,
          $value: value[key]
        };
      }
      return res;
    } else {
      if (typeof value === 'number' && !isNaN(value)) {
        value = range(value);
      }
      return value || [];
    }
  },

  unbind: function unbind() {
    if (this.descriptor.ref) {
      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
    }
    if (this.frags) {
      var i = this.frags.length;
      var frag;
      while (i--) {
        frag = this.frags[i];
        this.deleteCachedFrag(frag);
        frag.destroy();
      }
    }
  }
};

/**
 * Helper to find the previous element that is a fragment
 * anchor. This is necessary because a destroyed frag's
 * element could still be lingering in the DOM before its
 * leaving transition finishes, but its inserted flag
 * should have been set to false so we can skip them.
 *
 * If this is a block repeat, we want to make sure we only
 * return frag that is bound to this v-for. (see #929)
 *
 * @param {Fragment} frag
 * @param {Comment|Text} anchor
 * @param {String} id
 * @return {Fragment}
 */

function findPrevFrag(frag, anchor, id) {
  var el = frag.node.previousSibling;
  /* istanbul ignore if */
  if (!el) return;
  frag = el.__v_frag;
  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
    el = el.previousSibling;
    /* istanbul ignore if */
    if (!el) return;
    frag = el.__v_frag;
  }
  return frag;
}

/**
 * Create a range array from given number.
 *
 * @param {Number} n
 * @return {Array}
 */

function range(n) {
  var i = -1;
  var ret = new Array(Math.floor(n));
  while (++i < n) {
    ret[i] = i;
  }
  return ret;
}

/**
 * Get the track by key for an item.
 *
 * @param {Number} index
 * @param {String} key
 * @param {*} value
 * @param {String} [trackByKey]
 */

function getTrackByKey(index, key, value, trackByKey) {
  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
}

if (process.env.NODE_ENV !== 'production') {
  vFor.warnDuplicate = function (value) {
    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
  };
}

/**
 * Find a vm from a fragment.
 *
 * @param {Fragment} frag
 * @return {Vue|undefined}
 */

function findVmFromFrag(frag) {
  var node = frag.node;
  // handle multi-node frag
  if (frag.end) {
    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
      node = node.nextSibling;
    }
  }
  return node.__vue__;
}

var vIf = {

  priority: IF,
  terminal: true,

  bind: function bind() {
    var el = this.el;
    if (!el.__vue__) {
      // check else block
      var next = el.nextElementSibling;
      if (next && getAttr(next, 'v-else') !== null) {
        remove(next);
        this.elseEl = next;
      }
      // check main block
      this.anchor = createAnchor('v-if');
      replace(el, this.anchor);
    } else {
      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
      this.invalid = true;
    }
  },

  update: function update(value) {
    if (this.invalid) return;
    if (value) {
      if (!this.frag) {
        this.insert();
      }
    } else {
      this.remove();
    }
  },

  insert: function insert() {
    if (this.elseFrag) {
      this.elseFrag.remove();
      this.elseFrag = null;
    }
    // lazy init factory
    if (!this.factory) {
      this.factory = new FragmentFactory(this.vm, this.el);
    }
    this.frag = this.factory.create(this._host, this._scope, this._frag);
    this.frag.before(this.anchor);
  },

  remove: function remove() {
    if (this.frag) {
      this.frag.remove();
      this.frag = null;
    }
    if (this.elseEl && !this.elseFrag) {
      if (!this.elseFactory) {
        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
      }
      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
      this.elseFrag.before(this.anchor);
    }
  },

  unbind: function unbind() {
    if (this.frag) {
      this.frag.destroy();
    }
    if (this.elseFrag) {
      this.elseFrag.destroy();
    }
  }
};

var show = {

  bind: function bind() {
    // check else block
    var next = this.el.nextElementSibling;
    if (next && getAttr(next, 'v-else') !== null) {
      this.elseEl = next;
    }
  },

  update: function update(value) {
    this.apply(this.el, value);
    if (this.elseEl) {
      this.apply(this.elseEl, !value);
    }
  },

  apply: function apply(el, value) {
    if (inDoc(el)) {
      applyTransition(el, value ? 1 : -1, toggle, this.vm);
    } else {
      toggle();
    }
    function toggle() {
      el.style.display = value ? '' : 'none';
    }
  }
};

var text$2 = {

  bind: function bind() {
    var self = this;
    var el = this.el;
    var isRange = el.type === 'range';
    var lazy = this.params.lazy;
    var number = this.params.number;
    var debounce = this.params.debounce;

    // handle composition events.
    //   http://blog.evanyou.me/2014/01/03/composition-event/
    // skip this for Android because it handles composition
    // events quite differently. Android doesn't trigger
    // composition events for language input methods e.g.
    // Chinese, but instead triggers them for spelling
    // suggestions... (see Discussion/#162)
    var composing = false;
    if (!isAndroid && !isRange) {
      this.on('compositionstart', function () {
        composing = true;
      });
      this.on('compositionend', function () {
        composing = false;
        // in IE11 the "compositionend" event fires AFTER
        // the "input" event, so the input handler is blocked
        // at the end... have to call it here.
        //
        // #1327: in lazy mode this is unecessary.
        if (!lazy) {
          self.listener();
        }
      });
    }

    // prevent messing with the input when user is typing,
    // and force update on blur.
    this.focused = false;
    if (!isRange && !lazy) {
      this.on('focus', function () {
        self.focused = true;
      });
      this.on('blur', function () {
        self.focused = false;
        // do not sync value after fragment removal (#2017)
        if (!self._frag || self._frag.inserted) {
          self.rawListener();
        }
      });
    }

    // Now attach the main listener
    this.listener = this.rawListener = function () {
      if (composing || !self._bound) {
        return;
      }
      var val = number || isRange ? toNumber(el.value) : el.value;
      self.set(val);
      // force update on next tick to avoid lock & same value
      // also only update when user is not typing
      nextTick(function () {
        if (self._bound && !self.focused) {
          self.update(self._watcher.value);
        }
      });
    };

    // apply debounce
    if (debounce) {
      this.listener = _debounce(this.listener, debounce);
    }

    // Support jQuery events, since jQuery.trigger() doesn't
    // trigger native events in some cases and some plugins
    // rely on $.trigger()
    //
    // We want to make sure if a listener is attached using
    // jQuery, it is also removed with jQuery, that's why
    // we do the check for each directive instance and
    // store that check result on itself. This also allows
    // easier test coverage control by unsetting the global
    // jQuery variable in tests.
    this.hasjQuery = typeof jQuery === 'function';
    if (this.hasjQuery) {
      var method = jQuery.fn.on ? 'on' : 'bind';
      jQuery(el)[method]('change', this.rawListener);
      if (!lazy) {
        jQuery(el)[method]('input', this.listener);
      }
    } else {
      this.on('change', this.rawListener);
      if (!lazy) {
        this.on('input', this.listener);
      }
    }

    // IE9 doesn't fire input event on backspace/del/cut
    if (!lazy && isIE9) {
      this.on('cut', function () {
        nextTick(self.listener);
      });
      this.on('keyup', function (e) {
        if (e.keyCode === 46 || e.keyCode === 8) {
          self.listener();
        }
      });
    }

    // set initial value if present
    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    // #3029 only update when the value changes. This prevent
    // browsers from overwriting values like selectionStart
    value = _toString(value);
    if (value !== this.el.value) this.el.value = value;
  },

  unbind: function unbind() {
    var el = this.el;
    if (this.hasjQuery) {
      var method = jQuery.fn.off ? 'off' : 'unbind';
      jQuery(el)[method]('change', this.listener);
      jQuery(el)[method]('input', this.listener);
    }
  }
};

var radio = {

  bind: function bind() {
    var self = this;
    var el = this.el;

    this.getValue = function () {
      // value overwrite via v-bind:value
      if (el.hasOwnProperty('_value')) {
        return el._value;
      }
      var val = el.value;
      if (self.params.number) {
        val = toNumber(val);
      }
      return val;
    };

    this.listener = function () {
      self.set(self.getValue());
    };
    this.on('change', this.listener);

    if (el.hasAttribute('checked')) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    this.el.checked = looseEqual(value, this.getValue());
  }
};

var select = {

  bind: function bind() {
    var _this = this;

    var self = this;
    var el = this.el;

    // method to force update DOM using latest value.
    this.forceUpdate = function () {
      if (self._watcher) {
        self.update(self._watcher.get());
      }
    };

    // check if this is a multiple select
    var multiple = this.multiple = el.hasAttribute('multiple');

    // attach listener
    this.listener = function () {
      var value = getValue(el, multiple);
      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
      self.set(value);
    };
    this.on('change', this.listener);

    // if has initial value, set afterBind
    var initValue = getValue(el, multiple, true);
    if (multiple && initValue.length || !multiple && initValue !== null) {
      this.afterBind = this.listener;
    }

    // All major browsers except Firefox resets
    // selectedIndex with value -1 to 0 when the element
    // is appended to a new parent, therefore we have to
    // force a DOM update whenever that happens...
    this.vm.$on('hook:attached', function () {
      nextTick(_this.forceUpdate);
    });
    if (!inDoc(el)) {
      nextTick(this.forceUpdate);
    }
  },

  update: function update(value) {
    var el = this.el;
    el.selectedIndex = -1;
    var multi = this.multiple && isArray(value);
    var options = el.options;
    var i = options.length;
    var op, val;
    while (i--) {
      op = options[i];
      val = op.hasOwnProperty('_value') ? op._value : op.value;
      /* eslint-disable eqeqeq */
      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
      /* eslint-enable eqeqeq */
    }
  },

  unbind: function unbind() {
    /* istanbul ignore next */
    this.vm.$off('hook:attached', this.forceUpdate);
  }
};

/**
 * Get select value
 *
 * @param {SelectElement} el
 * @param {Boolean} multi
 * @param {Boolean} init
 * @return {Array|*}
 */

function getValue(el, multi, init) {
  var res = multi ? [] : null;
  var op, val, selected;
  for (var i = 0, l = el.options.length; i < l; i++) {
    op = el.options[i];
    selected = init ? op.hasAttribute('selected') : op.selected;
    if (selected) {
      val = op.hasOwnProperty('_value') ? op._value : op.value;
      if (multi) {
        res.push(val);
      } else {
        return val;
      }
    }
  }
  return res;
}

/**
 * Native Array.indexOf uses strict equal, but in this
 * case we need to match string/numbers with custom equal.
 *
 * @param {Array} arr
 * @param {*} val
 */

function indexOf$1(arr, val) {
  var i = arr.length;
  while (i--) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

var checkbox = {

  bind: function bind() {
    var self = this;
    var el = this.el;

    this.getValue = function () {
      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
    };

    function getBooleanValue() {
      var val = el.checked;
      if (val && el.hasOwnProperty('_trueValue')) {
        return el._trueValue;
      }
      if (!val && el.hasOwnProperty('_falseValue')) {
        return el._falseValue;
      }
      return val;
    }

    this.listener = function () {
      var model = self._watcher.get();
      if (isArray(model)) {
        var val = self.getValue();
        var i = indexOf(model, val);
        if (el.checked) {
          if (i < 0) {
            self.set(model.concat(val));
          }
        } else if (i > -1) {
          self.set(model.slice(0, i).concat(model.slice(i + 1)));
        }
      } else {
        self.set(getBooleanValue());
      }
    };

    this.on('change', this.listener);
    if (el.hasAttribute('checked')) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    var el = this.el;
    if (isArray(value)) {
      el.checked = indexOf(value, this.getValue()) > -1;
    } else {
      if (el.hasOwnProperty('_trueValue')) {
        el.checked = looseEqual(value, el._trueValue);
      } else {
        el.checked = !!value;
      }
    }
  }
};

var handlers = {
  text: text$2,
  radio: radio,
  select: select,
  checkbox: checkbox
};

var model = {

  priority: MODEL,
  twoWay: true,
  handlers: handlers,
  params: ['lazy', 'number', 'debounce'],

  /**
   * Possible elements:
   *   <select>
   *   <textarea>
   *   <input type="*">
   *     - text
   *     - checkbox
   *     - radio
   *     - number
   */

  bind: function bind() {
    // friendly warning...
    this.checkFilters();
    if (this.hasRead && !this.hasWrite) {
      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
    }
    var el = this.el;
    var tag = el.tagName;
    var handler;
    if (tag === 'INPUT') {
      handler = handlers[el.type] || handlers.text;
    } else if (tag === 'SELECT') {
      handler = handlers.select;
    } else if (tag === 'TEXTAREA') {
      handler = handlers.text;
    } else {
      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
      return;
    }
    el.__v_model = this;
    handler.bind.call(this);
    this.update = handler.update;
    this._unbind = handler.unbind;
  },

  /**
   * Check read/write filter stats.
   */

  checkFilters: function checkFilters() {
    var filters = this.filters;
    if (!filters) return;
    var i = filters.length;
    while (i--) {
      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
      if (typeof filter === 'function' || filter.read) {
        this.hasRead = true;
      }
      if (filter.write) {
        this.hasWrite = true;
      }
    }
  },

  unbind: function unbind() {
    this.el.__v_model = null;
    this._unbind && this._unbind();
  }
};

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  'delete': [8, 46],
  up: 38,
  left: 37,
  right: 39,
  down: 40
};

function keyFilter(handler, keys) {
  var codes = keys.map(function (key) {
    var charCode = key.charCodeAt(0);
    if (charCode > 47 && charCode < 58) {
      return parseInt(key, 10);
    }
    if (key.length === 1) {
      charCode = key.toUpperCase().charCodeAt(0);
      if (charCode > 64 && charCode < 91) {
        return charCode;
      }
    }
    return keyCodes[key];
  });
  codes = [].concat.apply([], codes);
  return function keyHandler(e) {
    if (codes.indexOf(e.keyCode) > -1) {
      return handler.call(this, e);
    }
  };
}

function stopFilter(handler) {
  return function stopHandler(e) {
    e.stopPropagation();
    return handler.call(this, e);
  };
}

function preventFilter(handler) {
  return function preventHandler(e) {
    e.preventDefault();
    return handler.call(this, e);
  };
}

function selfFilter(handler) {
  return function selfHandler(e) {
    if (e.target === e.currentTarget) {
      return handler.call(this, e);
    }
  };
}

var on$1 = {

  priority: ON,
  acceptStatement: true,
  keyCodes: keyCodes,

  bind: function bind() {
    // deal with iframes
    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
      var self = this;
      this.iframeBind = function () {
        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
      };
      this.on('load', this.iframeBind);
    }
  },

  update: function update(handler) {
    // stub a noop for v-on with no value,
    // e.g. @mousedown.prevent
    if (!this.descriptor.raw) {
      handler = function () {};
    }

    if (typeof handler !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
      return;
    }

    // apply modifiers
    if (this.modifiers.stop) {
      handler = stopFilter(handler);
    }
    if (this.modifiers.prevent) {
      handler = preventFilter(handler);
    }
    if (this.modifiers.self) {
      handler = selfFilter(handler);
    }
    // key filter
    var keys = Object.keys(this.modifiers).filter(function (key) {
      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
    });
    if (keys.length) {
      handler = keyFilter(handler, keys);
    }

    this.reset();
    this.handler = handler;

    if (this.iframeBind) {
      this.iframeBind();
    } else {
      on(this.el, this.arg, this.handler, this.modifiers.capture);
    }
  },

  reset: function reset() {
    var el = this.iframeBind ? this.el.contentWindow : this.el;
    if (this.handler) {
      off(el, this.arg, this.handler);
    }
  },

  unbind: function unbind() {
    this.reset();
  }
};

var prefixes = ['-webkit-', '-moz-', '-ms-'];
var camelPrefixes = ['Webkit', 'Moz', 'ms'];
var importantRE = /!important;?$/;
var propCache = Object.create(null);

var testEl = null;

var style = {

  deep: true,

  update: function update(value) {
    if (typeof value === 'string') {
      this.el.style.cssText = value;
    } else if (isArray(value)) {
      this.handleObject(value.reduce(extend, {}));
    } else {
      this.handleObject(value || {});
    }
  },

  handleObject: function handleObject(value) {
    // cache object styles so that only changed props
    // are actually updated.
    var cache = this.cache || (this.cache = {});
    var name, val;
    for (name in cache) {
      if (!(name in value)) {
        this.handleSingle(name, null);
        delete cache[name];
      }
    }
    for (name in value) {
      val = value[name];
      if (val !== cache[name]) {
        cache[name] = val;
        this.handleSingle(name, val);
      }
    }
  },

  handleSingle: function handleSingle(prop, value) {
    prop = normalize(prop);
    if (!prop) return; // unsupported prop
    // cast possible numbers/booleans into strings
    if (value != null) value += '';
    if (value) {
      var isImportant = importantRE.test(value) ? 'important' : '';
      if (isImportant) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
        }
        value = value.replace(importantRE, '').trim();
        this.el.style.setProperty(prop.kebab, value, isImportant);
      } else {
        this.el.style[prop.camel] = value;
      }
    } else {
      this.el.style[prop.camel] = '';
    }
  }

};

/**
 * Normalize a CSS property name.
 * - cache result
 * - auto prefix
 * - camelCase -> dash-case
 *
 * @param {String} prop
 * @return {String}
 */

function normalize(prop) {
  if (propCache[prop]) {
    return propCache[prop];
  }
  var res = prefix(prop);
  propCache[prop] = propCache[res] = res;
  return res;
}

/**
 * Auto detect the appropriate prefix for a CSS property.
 * https://gist.github.com/paulirish/523692
 *
 * @param {String} prop
 * @return {String}
 */

function prefix(prop) {
  prop = hyphenate(prop);
  var camel = camelize(prop);
  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
  if (!testEl) {
    testEl = document.createElement('div');
  }
  var i = prefixes.length;
  var prefixed;
  if (camel !== 'filter' && camel in testEl.style) {
    return {
      kebab: prop,
      camel: camel
    };
  }
  while (i--) {
    prefixed = camelPrefixes[i] + upper;
    if (prefixed in testEl.style) {
      return {
        kebab: prefixes[i] + prop,
        camel: prefixed
      };
    }
  }
}

// xlink
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xlinkRE = /^xlink:/;

// check for attributes that prohibit interpolations
var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
// these attributes should also set their corresponding properties
// because they only affect the initial state of the element
var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
// these attributes expect enumrated values of "true" or "false"
// but are not boolean attributes
var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

// these attributes should set a hidden property for
// binding v-model to object values
var modelProps = {
  value: '_value',
  'true-value': '_trueValue',
  'false-value': '_falseValue'
};

var bind$1 = {

  priority: BIND,

  bind: function bind() {
    var attr = this.arg;
    var tag = this.el.tagName;
    // should be deep watch on object mode
    if (!attr) {
      this.deep = true;
    }
    // handle interpolation bindings
    var descriptor = this.descriptor;
    var tokens = descriptor.interp;
    if (tokens) {
      // handle interpolations with one-time tokens
      if (descriptor.hasOneTime) {
        this.expression = tokensToExp(tokens, this._scope || this.vm);
      }

      // only allow binding on native attributes
      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
        this.el.removeAttribute(attr);
        this.invalid = true;
      }

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production') {
        var raw = attr + '="' + descriptor.raw + '": ';
        // warn src
        if (attr === 'src') {
          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
        }

        // warn style
        if (attr === 'style') {
          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
        }
      }
    }
  },

  update: function update(value) {
    if (this.invalid) {
      return;
    }
    var attr = this.arg;
    if (this.arg) {
      this.handleSingle(attr, value);
    } else {
      this.handleObject(value || {});
    }
  },

  // share object handler with v-bind:class
  handleObject: style.handleObject,

  handleSingle: function handleSingle(attr, value) {
    var el = this.el;
    var interp = this.descriptor.interp;
    if (this.modifiers.camel) {
      attr = camelize(attr);
    }
    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
      ? '' : value : value;

      if (el[attr] !== attrValue) {
        el[attr] = attrValue;
      }
    }
    // set model props
    var modelProp = modelProps[attr];
    if (!interp && modelProp) {
      el[modelProp] = value;
      // update v-model if present
      var model = el.__v_model;
      if (model) {
        model.listener();
      }
    }
    // do not set value attribute for textarea
    if (attr === 'value' && el.tagName === 'TEXTAREA') {
      el.removeAttribute(attr);
      return;
    }
    // update attribute
    if (enumeratedAttrRE.test(attr)) {
      el.setAttribute(attr, value ? 'true' : 'false');
    } else if (value != null && value !== false) {
      if (attr === 'class') {
        // handle edge case #1960:
        // class interpolation should not overwrite Vue transition class
        if (el.__v_trans) {
          value += ' ' + el.__v_trans.id + '-transition';
        }
        setClass(el, value);
      } else if (xlinkRE.test(attr)) {
        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
      } else {
        el.setAttribute(attr, value === true ? '' : value);
      }
    } else {
      el.removeAttribute(attr);
    }
  }
};

var el = {

  priority: EL,

  bind: function bind() {
    /* istanbul ignore if */
    if (!this.arg) {
      return;
    }
    var id = this.id = camelize(this.arg);
    var refs = (this._scope || this.vm).$els;
    if (hasOwn(refs, id)) {
      refs[id] = this.el;
    } else {
      defineReactive(refs, id, this.el);
    }
  },

  unbind: function unbind() {
    var refs = (this._scope || this.vm).$els;
    if (refs[this.id] === this.el) {
      refs[this.id] = null;
    }
  }
};

var ref = {
  bind: function bind() {
    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
  }
};

var cloak = {
  bind: function bind() {
    var el = this.el;
    this.vm.$once('pre-hook:compiled', function () {
      el.removeAttribute('v-cloak');
    });
  }
};

// logic control
// two-way binding
// event handling
// attributes
// ref & el
// cloak
// must export plain object
var directives = {
  text: text$1,
  html: html,
  'for': vFor,
  'if': vIf,
  show: show,
  model: model,
  on: on$1,
  bind: bind$1,
  el: el,
  ref: ref,
  cloak: cloak
};

var vClass = {

  deep: true,

  update: function update(value) {
    if (!value) {
      this.cleanup();
    } else if (typeof value === 'string') {
      this.setClass(value.trim().split(/\s+/));
    } else {
      this.setClass(normalize$1(value));
    }
  },

  setClass: function setClass(value) {
    this.cleanup(value);
    for (var i = 0, l = value.length; i < l; i++) {
      var val = value[i];
      if (val) {
        apply(this.el, val, addClass);
      }
    }
    this.prevKeys = value;
  },

  cleanup: function cleanup(value) {
    var prevKeys = this.prevKeys;
    if (!prevKeys) return;
    var i = prevKeys.length;
    while (i--) {
      var key = prevKeys[i];
      if (!value || value.indexOf(key) < 0) {
        apply(this.el, key, removeClass);
      }
    }
  }
};

/**
 * Normalize objects and arrays (potentially containing objects)
 * into array of strings.
 *
 * @param {Object|Array<String|Object>} value
 * @return {Array<String>}
 */

function normalize$1(value) {
  var res = [];
  if (isArray(value)) {
    for (var i = 0, l = value.length; i < l; i++) {
      var _key = value[i];
      if (_key) {
        if (typeof _key === 'string') {
          res.push(_key);
        } else {
          for (var k in _key) {
            if (_key[k]) res.push(k);
          }
        }
      }
    }
  } else if (isObject(value)) {
    for (var key in value) {
      if (value[key]) res.push(key);
    }
  }
  return res;
}

/**
 * Add or remove a class/classes on an element
 *
 * @param {Element} el
 * @param {String} key The class name. This may or may not
 *                     contain a space character, in such a
 *                     case we'll deal with multiple class
 *                     names at once.
 * @param {Function} fn
 */

function apply(el, key, fn) {
  key = key.trim();
  if (key.indexOf(' ') === -1) {
    fn(el, key);
    return;
  }
  // The key contains one or more space characters.
  // Since a class name doesn't accept such characters, we
  // treat it as multiple classes.
  var keys = key.split(/\s+/);
  for (var i = 0, l = keys.length; i < l; i++) {
    fn(el, keys[i]);
  }
}

var component = {

  priority: COMPONENT,

  params: ['keep-alive', 'transition-mode', 'inline-template'],

  /**
   * Setup. Two possible usages:
   *
   * - static:
   *   <comp> or <div v-component="comp">
   *
   * - dynamic:
   *   <component :is="view">
   */

  bind: function bind() {
    if (!this.el.__vue__) {
      // keep-alive cache
      this.keepAlive = this.params.keepAlive;
      if (this.keepAlive) {
        this.cache = {};
      }
      // check inline-template
      if (this.params.inlineTemplate) {
        // extract inline template as a DocumentFragment
        this.inlineTemplate = extractContent(this.el, true);
      }
      // component resolution related state
      this.pendingComponentCb = this.Component = null;
      // transition related state
      this.pendingRemovals = 0;
      this.pendingRemovalCb = null;
      // create a ref anchor
      this.anchor = createAnchor('v-component');
      replace(this.el, this.anchor);
      // remove is attribute.
      // this is removed during compilation, but because compilation is
      // cached, when the component is used elsewhere this attribute
      // will remain at link time.
      this.el.removeAttribute('is');
      this.el.removeAttribute(':is');
      // remove ref, same as above
      if (this.descriptor.ref) {
        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
      }
      // if static, build right now.
      if (this.literal) {
        this.setComponent(this.expression);
      }
    } else {
      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
    }
  },

  /**
   * Public update, called by the watcher in the dynamic
   * literal scenario, e.g. <component :is="view">
   */

  update: function update(value) {
    if (!this.literal) {
      this.setComponent(value);
    }
  },

  /**
   * Switch dynamic components. May resolve the component
   * asynchronously, and perform transition based on
   * specified transition mode. Accepts a few additional
   * arguments specifically for vue-router.
   *
   * The callback is called when the full transition is
   * finished.
   *
   * @param {String} value
   * @param {Function} [cb]
   */

  setComponent: function setComponent(value, cb) {
    this.invalidatePending();
    if (!value) {
      // just remove current
      this.unbuild(true);
      this.remove(this.childVM, cb);
      this.childVM = null;
    } else {
      var self = this;
      this.resolveComponent(value, function () {
        self.mountComponent(cb);
      });
    }
  },

  /**
   * Resolve the component constructor to use when creating
   * the child vm.
   *
   * @param {String|Function} value
   * @param {Function} cb
   */

  resolveComponent: function resolveComponent(value, cb) {
    var self = this;
    this.pendingComponentCb = cancellable(function (Component) {
      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
      self.Component = Component;
      cb();
    });
    this.vm._resolveComponent(value, this.pendingComponentCb);
  },

  /**
   * Create a new instance using the current constructor and
   * replace the existing instance. This method doesn't care
   * whether the new component and the old one are actually
   * the same.
   *
   * @param {Function} [cb]
   */

  mountComponent: function mountComponent(cb) {
    // actual mount
    this.unbuild(true);
    var self = this;
    var activateHooks = this.Component.options.activate;
    var cached = this.getCached();
    var newComponent = this.build();
    if (activateHooks && !cached) {
      this.waitingFor = newComponent;
      callActivateHooks(activateHooks, newComponent, function () {
        if (self.waitingFor !== newComponent) {
          return;
        }
        self.waitingFor = null;
        self.transition(newComponent, cb);
      });
    } else {
      // update ref for kept-alive component
      if (cached) {
        newComponent._updateRef();
      }
      this.transition(newComponent, cb);
    }
  },

  /**
   * When the component changes or unbinds before an async
   * constructor is resolved, we need to invalidate its
   * pending callback.
   */

  invalidatePending: function invalidatePending() {
    if (this.pendingComponentCb) {
      this.pendingComponentCb.cancel();
      this.pendingComponentCb = null;
    }
  },

  /**
   * Instantiate/insert a new child vm.
   * If keep alive and has cached instance, insert that
   * instance; otherwise build a new one and cache it.
   *
   * @param {Object} [extraOptions]
   * @return {Vue} - the created instance
   */

  build: function build(extraOptions) {
    var cached = this.getCached();
    if (cached) {
      return cached;
    }
    if (this.Component) {
      // default options
      var options = {
        name: this.ComponentName,
        el: cloneNode(this.el),
        template: this.inlineTemplate,
        // make sure to add the child with correct parent
        // if this is a transcluded component, its parent
        // should be the transclusion host.
        parent: this._host || this.vm,
        // if no inline-template, then the compiled
        // linker can be cached for better performance.
        _linkerCachable: !this.inlineTemplate,
        _ref: this.descriptor.ref,
        _asComponent: true,
        _isRouterView: this._isRouterView,
        // if this is a transcluded component, context
        // will be the common parent vm of this instance
        // and its host.
        _context: this.vm,
        // if this is inside an inline v-for, the scope
        // will be the intermediate scope created for this
        // repeat fragment. this is used for linking props
        // and container directives.
        _scope: this._scope,
        // pass in the owner fragment of this component.
        // this is necessary so that the fragment can keep
        // track of its contained components in order to
        // call attach/detach hooks for them.
        _frag: this._frag
      };
      // extra options
      // in 1.0.0 this is used by vue-router only
      /* istanbul ignore if */
      if (extraOptions) {
        extend(options, extraOptions);
      }
      var child = new this.Component(options);
      if (this.keepAlive) {
        this.cache[this.Component.cid] = child;
      }
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
      }
      return child;
    }
  },

  /**
   * Try to get a cached instance of the current component.
   *
   * @return {Vue|undefined}
   */

  getCached: function getCached() {
    return this.keepAlive && this.cache[this.Component.cid];
  },

  /**
   * Teardown the current child, but defers cleanup so
   * that we can separate the destroy and removal steps.
   *
   * @param {Boolean} defer
   */

  unbuild: function unbuild(defer) {
    if (this.waitingFor) {
      if (!this.keepAlive) {
        this.waitingFor.$destroy();
      }
      this.waitingFor = null;
    }
    var child = this.childVM;
    if (!child || this.keepAlive) {
      if (child) {
        // remove ref
        child._inactive = true;
        child._updateRef(true);
      }
      return;
    }
    // the sole purpose of `deferCleanup` is so that we can
    // "deactivate" the vm right now and perform DOM removal
    // later.
    child.$destroy(false, defer);
  },

  /**
   * Remove current destroyed child and manually do
   * the cleanup after removal.
   *
   * @param {Function} cb
   */

  remove: function remove(child, cb) {
    var keepAlive = this.keepAlive;
    if (child) {
      // we may have a component switch when a previous
      // component is still being transitioned out.
      // we want to trigger only one lastest insertion cb
      // when the existing transition finishes. (#1119)
      this.pendingRemovals++;
      this.pendingRemovalCb = cb;
      var self = this;
      child.$remove(function () {
        self.pendingRemovals--;
        if (!keepAlive) child._cleanup();
        if (!self.pendingRemovals && self.pendingRemovalCb) {
          self.pendingRemovalCb();
          self.pendingRemovalCb = null;
        }
      });
    } else if (cb) {
      cb();
    }
  },

  /**
   * Actually swap the components, depending on the
   * transition mode. Defaults to simultaneous.
   *
   * @param {Vue} target
   * @param {Function} [cb]
   */

  transition: function transition(target, cb) {
    var self = this;
    var current = this.childVM;
    // for devtool inspection
    if (current) current._inactive = true;
    target._inactive = false;
    this.childVM = target;
    switch (self.params.transitionMode) {
      case 'in-out':
        target.$before(self.anchor, function () {
          self.remove(current, cb);
        });
        break;
      case 'out-in':
        self.remove(current, function () {
          target.$before(self.anchor, cb);
        });
        break;
      default:
        self.remove(current);
        target.$before(self.anchor, cb);
    }
  },

  /**
   * Unbind.
   */

  unbind: function unbind() {
    this.invalidatePending();
    // Do not defer cleanup when unbinding
    this.unbuild();
    // destroy all keep-alive cached instances
    if (this.cache) {
      for (var key in this.cache) {
        this.cache[key].$destroy();
      }
      this.cache = null;
    }
  }
};

/**
 * Call activate hooks in order (asynchronous)
 *
 * @param {Array} hooks
 * @param {Vue} vm
 * @param {Function} cb
 */

function callActivateHooks(hooks, vm, cb) {
  var total = hooks.length;
  var called = 0;
  hooks[0].call(vm, next);
  function next() {
    if (++called >= total) {
      cb();
    } else {
      hooks[called].call(vm, next);
    }
  }
}

var propBindingModes = config._propBindingModes;
var empty = {};

// regexes
var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

/**
 * Compile props on a root element and return
 * a props link function.
 *
 * @param {Element|DocumentFragment} el
 * @param {Array} propOptions
 * @param {Vue} vm
 * @return {Function} propsLinkFn
 */

function compileProps(el, propOptions, vm) {
  var props = [];
  var propsData = vm.$options.propsData;
  var names = Object.keys(propOptions);
  var i = names.length;
  var options, name, attr, value, path, parsed, prop;
  while (i--) {
    name = names[i];
    options = propOptions[name] || empty;

    if (process.env.NODE_ENV !== 'production' && name === '$data') {
      warn('Do not use $data as prop.', vm);
      continue;
    }

    // props could contain dashes, which will be
    // interpreted as minus calculations by the parser
    // so we need to camelize the path here
    path = camelize(name);
    if (!identRE$1.test(path)) {
      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
      continue;
    }

    prop = {
      name: name,
      path: path,
      options: options,
      mode: propBindingModes.ONE_WAY,
      raw: null
    };

    attr = hyphenate(name);
    // first check dynamic version
    if ((value = getBindAttr(el, attr)) === null) {
      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
        prop.mode = propBindingModes.TWO_WAY;
      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
        prop.mode = propBindingModes.ONE_TIME;
      }
    }
    if (value !== null) {
      // has dynamic binding!
      prop.raw = value;
      parsed = parseDirective(value);
      value = parsed.expression;
      prop.filters = parsed.filters;
      // check binding type
      if (isLiteral(value) && !parsed.filters) {
        // for expressions containing literal numbers and
        // booleans, there's no need to setup a prop binding,
        // so we can optimize them as a one-time set.
        prop.optimizedLiteral = true;
      } else {
        prop.dynamic = true;
        // check non-settable path for two-way bindings
        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
          prop.mode = propBindingModes.ONE_WAY;
          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
        }
      }
      prop.parentPath = value;

      // warn required two-way
      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
        warn('Prop "' + name + '" expects a two-way binding type.', vm);
      }
    } else if ((value = getAttr(el, attr)) !== null) {
      // has literal binding!
      prop.raw = value;
    } else if (propsData && (value = propsData[name] || propsData[path]) !== null) {
      // has propsData
      prop.raw = value;
    } else if (process.env.NODE_ENV !== 'production') {
      // check possible camelCase prop usage
      var lowerCaseName = path.toLowerCase();
      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
      if (value) {
        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
      } else if (options.required && (!propsData || !(name in propsData) && !(path in propsData))) {
        // warn missing required
        warn('Missing required prop: ' + name, vm);
      }
    }
    // push prop
    props.push(prop);
  }
  return makePropsLinkFn(props);
}

/**
 * Build a function that applies props to a vm.
 *
 * @param {Array} props
 * @return {Function} propsLinkFn
 */

function makePropsLinkFn(props) {
  return function propsLinkFn(vm, scope) {
    // store resolved props info
    vm._props = {};
    var inlineProps = vm.$options.propsData;
    var i = props.length;
    var prop, path, options, value, raw;
    while (i--) {
      prop = props[i];
      raw = prop.raw;
      path = prop.path;
      options = prop.options;
      vm._props[path] = prop;
      if (inlineProps && hasOwn(inlineProps, path)) {
        initProp(vm, prop, inlineProps[path]);
      }if (raw === null) {
        // initialize absent prop
        initProp(vm, prop, undefined);
      } else if (prop.dynamic) {
        // dynamic prop
        if (prop.mode === propBindingModes.ONE_TIME) {
          // one time binding
          value = (scope || vm._context || vm).$get(prop.parentPath);
          initProp(vm, prop, value);
        } else {
          if (vm._context) {
            // dynamic binding
            vm._bindDir({
              name: 'prop',
              def: propDef,
              prop: prop
            }, null, null, scope); // el, host, scope
          } else {
              // root instance
              initProp(vm, prop, vm.$get(prop.parentPath));
            }
        }
      } else if (prop.optimizedLiteral) {
        // optimized literal, cast it and just set once
        var stripped = stripQuotes(raw);
        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
        initProp(vm, prop, value);
      } else {
        // string literal, but we need to cater for
        // Boolean props with no value, or with same
        // literal value (e.g. disabled="disabled")
        // see https://github.com/vuejs/vue-loader/issues/182
        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
        initProp(vm, prop, value);
      }
    }
  };
}

/**
 * Process a prop with a rawValue, applying necessary coersions,
 * default values & assertions and call the given callback with
 * processed value.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} rawValue
 * @param {Function} fn
 */

function processPropValue(vm, prop, rawValue, fn) {
  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
  var value = rawValue;
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop);
  }
  value = coerceProp(prop, value, vm);
  var coerced = value !== rawValue;
  if (!assertProp(prop, value, vm)) {
    value = undefined;
  }
  if (isSimple && !coerced) {
    withoutConversion(function () {
      fn(value);
    });
  } else {
    fn(value);
  }
}

/**
 * Set a prop's initial value on a vm and its data object.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */

function initProp(vm, prop, value) {
  processPropValue(vm, prop, value, function (value) {
    defineReactive(vm, prop.path, value);
  });
}

/**
 * Update a prop's value on a vm.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */

function updateProp(vm, prop, value) {
  processPropValue(vm, prop, value, function (value) {
    vm[prop.path] = value;
  });
}

/**
 * Get the default value of a prop.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @return {*}
 */

function getPropDefaultValue(vm, prop) {
  // no default, return undefined
  var options = prop.options;
  if (!hasOwn(options, 'default')) {
    // absent boolean value defaults to false
    return options.type === Boolean ? false : undefined;
  }
  var def = options['default'];
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // call factory function for non-Function types
  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 *
 * @param {Object} prop
 * @param {*} value
 * @param {Vue} vm
 */

function assertProp(prop, value, vm) {
  if (!prop.options.required && ( // non-required
  prop.raw === null || // abscent
  value == null) // null or undefined
  ) {
      return true;
    }
  var options = prop.options;
  var type = options.type;
  var valid = !type;
  var expectedTypes = [];
  if (type) {
    if (!isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType);
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    if (process.env.NODE_ENV !== 'production') {
      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
    }
    return false;
  }
  var validator = options.validator;
  if (validator) {
    if (!validator(value)) {
      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
      return false;
    }
  }
  return true;
}

/**
 * Force parsing value with coerce option.
 *
 * @param {*} value
 * @param {Object} options
 * @return {*}
 */

function coerceProp(prop, value, vm) {
  var coerce = prop.options.coerce;
  if (!coerce) {
    return value;
  }
  if (typeof coerce === 'function') {
    return coerce(value);
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
    return value;
  }
}

/**
 * Assert the type of a value
 *
 * @param {*} value
 * @param {Function} type
 * @return {Object}
 */

function assertType(value, type) {
  var valid;
  var expectedType;
  if (type === String) {
    expectedType = 'string';
    valid = typeof value === expectedType;
  } else if (type === Number) {
    expectedType = 'number';
    valid = typeof value === expectedType;
  } else if (type === Boolean) {
    expectedType = 'boolean';
    valid = typeof value === expectedType;
  } else if (type === Function) {
    expectedType = 'function';
    valid = typeof value === expectedType;
  } else if (type === Object) {
    expectedType = 'object';
    valid = isPlainObject(value);
  } else if (type === Array) {
    expectedType = 'array';
    valid = isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Format type for output
 *
 * @param {String} type
 * @return {String}
 */

function formatType(type) {
  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
}

/**
 * Format value
 *
 * @param {*} value
 * @return {String}
 */

function formatValue(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

var bindingModes = config._propBindingModes;

var propDef = {

  bind: function bind() {
    var child = this.vm;
    var parent = child._context;
    // passed in from compiler directly
    var prop = this.descriptor.prop;
    var childKey = prop.path;
    var parentKey = prop.parentPath;
    var twoWay = prop.mode === bindingModes.TWO_WAY;

    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
      updateProp(child, prop, val);
    }, {
      twoWay: twoWay,
      filters: prop.filters,
      // important: props need to be observed on the
      // v-for scope if present
      scope: this._scope
    });

    // set the child initial value.
    initProp(child, prop, parentWatcher.value);

    // setup two-way binding
    if (twoWay) {
      // important: defer the child watcher creation until
      // the created hook (after data observation)
      var self = this;
      child.$once('pre-hook:created', function () {
        self.childWatcher = new Watcher(child, childKey, function (val) {
          parentWatcher.set(val);
        }, {
          // ensure sync upward before parent sync down.
          // this is necessary in cases e.g. the child
          // mutates a prop array, then replaces it. (#1683)
          sync: true
        });
      });
    }
  },

  unbind: function unbind() {
    this.parentWatcher.teardown();
    if (this.childWatcher) {
      this.childWatcher.teardown();
    }
  }
};

var queue$1 = [];
var queued = false;

/**
 * Push a job into the queue.
 *
 * @param {Function} job
 */

function pushJob(job) {
  queue$1.push(job);
  if (!queued) {
    queued = true;
    nextTick(flush);
  }
}

/**
 * Flush the queue, and do one forced reflow before
 * triggering transitions.
 */

function flush() {
  // Force layout
  var f = document.documentElement.offsetHeight;
  for (var i = 0; i < queue$1.length; i++) {
    queue$1[i]();
  }
  queue$1 = [];
  queued = false;
  // dummy return, so js linters don't complain about
  // unused variable f
  return f;
}

var TYPE_TRANSITION = 'transition';
var TYPE_ANIMATION = 'animation';
var transDurationProp = transitionProp + 'Duration';
var animDurationProp = animationProp + 'Duration';

/**
 * If a just-entered element is applied the
 * leave class while its enter transition hasn't started yet,
 * and the transitioned property has the same value for both
 * enter/leave, then the leave transition will be skipped and
 * the transitionend event never fires. This function ensures
 * its callback to be called after a transition has started
 * by waiting for double raf.
 *
 * It falls back to setTimeout on devices that support CSS
 * transitions but not raf (e.g. Android 4.2 browser) - since
 * these environments are usually slow, we are giving it a
 * relatively large timeout.
 */

var raf = inBrowser && window.requestAnimationFrame;
var waitForTransitionStart = raf
/* istanbul ignore next */
? function (fn) {
  raf(function () {
    raf(fn);
  });
} : function (fn) {
  setTimeout(fn, 50);
};

/**
 * A Transition object that encapsulates the state and logic
 * of the transition.
 *
 * @param {Element} el
 * @param {String} id
 * @param {Object} hooks
 * @param {Vue} vm
 */
function Transition(el, id, hooks, vm) {
  this.id = id;
  this.el = el;
  this.enterClass = hooks && hooks.enterClass || id + '-enter';
  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
  this.hooks = hooks;
  this.vm = vm;
  // async state
  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
  this.justEntered = false;
  this.entered = this.left = false;
  this.typeCache = {};
  // check css transition type
  this.type = hooks && hooks.type;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production') {
    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
    }
  }
  // bind
  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
    self[m] = bind(self[m], self);
  });
}

var p$1 = Transition.prototype;

/**
 * Start an entering transition.
 *
 * 1. enter transition triggered
 * 2. call beforeEnter hook
 * 3. add enter class
 * 4. insert/show element
 * 5. call enter hook (with possible explicit js callback)
 * 6. reflow
 * 7. based on transition type:
 *    - transition:
 *        remove class now, wait for transitionend,
 *        then done if there's no explicit js callback.
 *    - animation:
 *        wait for animationend, remove class,
 *        then done if there's no explicit js callback.
 *    - no css transition:
 *        done now if there's no explicit js callback.
 * 8. wait for either done or js callback, then call
 *    afterEnter hook.
 *
 * @param {Function} op - insert/show the element
 * @param {Function} [cb]
 */

p$1.enter = function (op, cb) {
  this.cancelPending();
  this.callHook('beforeEnter');
  this.cb = cb;
  addClass(this.el, this.enterClass);
  op();
  this.entered = false;
  this.callHookWithCb('enter');
  if (this.entered) {
    return; // user called done synchronously.
  }
  this.cancel = this.hooks && this.hooks.enterCancelled;
  pushJob(this.enterNextTick);
};

/**
 * The "nextTick" phase of an entering transition, which is
 * to be pushed into a queue and executed after a reflow so
 * that removing the class can trigger a CSS transition.
 */

p$1.enterNextTick = function () {
  var _this = this;

  // prevent transition skipping
  this.justEntered = true;
  waitForTransitionStart(function () {
    _this.justEntered = false;
  });
  var enterDone = this.enterDone;
  var type = this.getCssTransitionType(this.enterClass);
  if (!this.pendingJsCb) {
    if (type === TYPE_TRANSITION) {
      // trigger transition by removing enter class now
      removeClass(this.el, this.enterClass);
      this.setupCssCb(transitionEndEvent, enterDone);
    } else if (type === TYPE_ANIMATION) {
      this.setupCssCb(animationEndEvent, enterDone);
    } else {
      enterDone();
    }
  } else if (type === TYPE_TRANSITION) {
    removeClass(this.el, this.enterClass);
  }
};

/**
 * The "cleanup" phase of an entering transition.
 */

p$1.enterDone = function () {
  this.entered = true;
  this.cancel = this.pendingJsCb = null;
  removeClass(this.el, this.enterClass);
  this.callHook('afterEnter');
  if (this.cb) this.cb();
};

/**
 * Start a leaving transition.
 *
 * 1. leave transition triggered.
 * 2. call beforeLeave hook
 * 3. add leave class (trigger css transition)
 * 4. call leave hook (with possible explicit js callback)
 * 5. reflow if no explicit js callback is provided
 * 6. based on transition type:
 *    - transition or animation:
 *        wait for end event, remove class, then done if
 *        there's no explicit js callback.
 *    - no css transition:
 *        done if there's no explicit js callback.
 * 7. wait for either done or js callback, then call
 *    afterLeave hook.
 *
 * @param {Function} op - remove/hide the element
 * @param {Function} [cb]
 */

p$1.leave = function (op, cb) {
  this.cancelPending();
  this.callHook('beforeLeave');
  this.op = op;
  this.cb = cb;
  addClass(this.el, this.leaveClass);
  this.left = false;
  this.callHookWithCb('leave');
  if (this.left) {
    return; // user called done synchronously.
  }
  this.cancel = this.hooks && this.hooks.leaveCancelled;
  // only need to handle leaveDone if
  // 1. the transition is already done (synchronously called
  //    by the user, which causes this.op set to null)
  // 2. there's no explicit js callback
  if (this.op && !this.pendingJsCb) {
    // if a CSS transition leaves immediately after enter,
    // the transitionend event never fires. therefore we
    // detect such cases and end the leave immediately.
    if (this.justEntered) {
      this.leaveDone();
    } else {
      pushJob(this.leaveNextTick);
    }
  }
};

/**
 * The "nextTick" phase of a leaving transition.
 */

p$1.leaveNextTick = function () {
  var type = this.getCssTransitionType(this.leaveClass);
  if (type) {
    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
    this.setupCssCb(event, this.leaveDone);
  } else {
    this.leaveDone();
  }
};

/**
 * The "cleanup" phase of a leaving transition.
 */

p$1.leaveDone = function () {
  this.left = true;
  this.cancel = this.pendingJsCb = null;
  this.op();
  removeClass(this.el, this.leaveClass);
  this.callHook('afterLeave');
  if (this.cb) this.cb();
  this.op = null;
};

/**
 * Cancel any pending callbacks from a previously running
 * but not finished transition.
 */

p$1.cancelPending = function () {
  this.op = this.cb = null;
  var hasPending = false;
  if (this.pendingCssCb) {
    hasPending = true;
    off(this.el, this.pendingCssEvent, this.pendingCssCb);
    this.pendingCssEvent = this.pendingCssCb = null;
  }
  if (this.pendingJsCb) {
    hasPending = true;
    this.pendingJsCb.cancel();
    this.pendingJsCb = null;
  }
  if (hasPending) {
    removeClass(this.el, this.enterClass);
    removeClass(this.el, this.leaveClass);
  }
  if (this.cancel) {
    this.cancel.call(this.vm, this.el);
    this.cancel = null;
  }
};

/**
 * Call a user-provided synchronous hook function.
 *
 * @param {String} type
 */

p$1.callHook = function (type) {
  if (this.hooks && this.hooks[type]) {
    this.hooks[type].call(this.vm, this.el);
  }
};

/**
 * Call a user-provided, potentially-async hook function.
 * We check for the length of arguments to see if the hook
 * expects a `done` callback. If true, the transition's end
 * will be determined by when the user calls that callback;
 * otherwise, the end is determined by the CSS transition or
 * animation.
 *
 * @param {String} type
 */

p$1.callHookWithCb = function (type) {
  var hook = this.hooks && this.hooks[type];
  if (hook) {
    if (hook.length > 1) {
      this.pendingJsCb = cancellable(this[type + 'Done']);
    }
    hook.call(this.vm, this.el, this.pendingJsCb);
  }
};

/**
 * Get an element's transition type based on the
 * calculated styles.
 *
 * @param {String} className
 * @return {Number}
 */

p$1.getCssTransitionType = function (className) {
  /* istanbul ignore if */
  if (!transitionEndEvent ||
  // skip CSS transitions if page is not visible -
  // this solves the issue of transitionend events not
  // firing until the page is visible again.
  // pageVisibility API is supported in IE10+, same as
  // CSS transitions.
  document.hidden ||
  // explicit js-only transition
  this.hooks && this.hooks.css === false ||
  // element is hidden
  isHidden(this.el)) {
    return;
  }
  var type = this.type || this.typeCache[className];
  if (type) return type;
  var inlineStyles = this.el.style;
  var computedStyles = window.getComputedStyle(this.el);
  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
  if (transDuration && transDuration !== '0s') {
    type = TYPE_TRANSITION;
  } else {
    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
    if (animDuration && animDuration !== '0s') {
      type = TYPE_ANIMATION;
    }
  }
  if (type) {
    this.typeCache[className] = type;
  }
  return type;
};

/**
 * Setup a CSS transitionend/animationend callback.
 *
 * @param {String} event
 * @param {Function} cb
 */

p$1.setupCssCb = function (event, cb) {
  this.pendingCssEvent = event;
  var self = this;
  var el = this.el;
  var onEnd = this.pendingCssCb = function (e) {
    if (e.target === el) {
      off(el, event, onEnd);
      self.pendingCssEvent = self.pendingCssCb = null;
      if (!self.pendingJsCb && cb) {
        cb();
      }
    }
  };
  on(el, event, onEnd);
};

/**
 * Check if an element is hidden - in that case we can just
 * skip the transition alltogether.
 *
 * @param {Element} el
 * @return {Boolean}
 */

function isHidden(el) {
  if (/svg$/.test(el.namespaceURI)) {
    // SVG elements do not have offset(Width|Height)
    // so we need to check the client rect
    var rect = el.getBoundingClientRect();
    return !(rect.width || rect.height);
  } else {
    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
}

var transition$1 = {

  priority: TRANSITION,

  update: function update(id, oldId) {
    var el = this.el;
    // resolve on owner vm
    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
    id = id || 'v';
    oldId = oldId || 'v';
    el.__v_trans = new Transition(el, id, hooks, this.vm);
    removeClass(el, oldId + '-transition');
    addClass(el, id + '-transition');
  }
};

var internalDirectives = {
  style: style,
  'class': vClass,
  component: component,
  prop: propDef,
  transition: transition$1
};

// special binding prefixes
var bindRE = /^v-bind:|^:/;
var onRE = /^v-on:|^@/;
var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
var modifierRE = /\.[^\.]+/g;
var transitionRE = /^(v-bind:|:)?transition$/;

// default directive priority
var DEFAULT_PRIORITY = 1000;
var DEFAULT_TERMINAL_PRIORITY = 2000;

/**
 * Compile a template and return a reusable composite link
 * function, which recursively contains more link functions
 * inside. This top level compile function would normally
 * be called on instance root nodes, but can also be used
 * for partial compilation if the partial argument is true.
 *
 * The returned composite link function, when called, will
 * return an unlink function that tearsdown all directives
 * created during the linking phase.
 *
 * @param {Element|DocumentFragment} el
 * @param {Object} options
 * @param {Boolean} partial
 * @return {Function}
 */

function compile(el, options, partial) {
  // link function for the node itself.
  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
  // link function for the childNodes
  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

  /**
   * A composite linker function to be called on a already
   * compiled piece of DOM, which instantiates all directive
   * instances.
   *
   * @param {Vue} vm
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host] - host vm of transcluded content
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - link context fragment
   * @return {Function|undefined}
   */

  return function compositeLinkFn(vm, el, host, scope, frag) {
    // cache childNodes before linking parent, fix #657
    var childNodes = toArray(el.childNodes);
    // link
    var dirs = linkAndCapture(function compositeLinkCapturer() {
      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
    }, vm);
    return makeUnlinkFn(vm, dirs);
  };
}

/**
 * Apply a linker to a vm/element pair and capture the
 * directives created during the process.
 *
 * @param {Function} linker
 * @param {Vue} vm
 */

function linkAndCapture(linker, vm) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    // reset directives before every capture in production
    // mode, so that when unlinking we don't need to splice
    // them out (which turns out to be a perf hit).
    // they are kept in development mode because they are
    // useful for Vue's own tests.
    vm._directives = [];
  }
  var originalDirCount = vm._directives.length;
  linker();
  var dirs = vm._directives.slice(originalDirCount);
  sortDirectives(dirs);
  for (var i = 0, l = dirs.length; i < l; i++) {
    dirs[i]._bind();
  }
  return dirs;
}

/**
 * sort directives by priority (stable sort)
 *
 * @param {Array} dirs
 */
function sortDirectives(dirs) {
  if (dirs.length === 0) return;

  var groupedMap = {};
  var i, j, k, l;
  var index = 0;
  var priorities = [];
  for (i = 0, j = dirs.length; i < j; i++) {
    var dir = dirs[i];
    var priority = dir.descriptor.def.priority || DEFAULT_PRIORITY;
    var array = groupedMap[priority];
    if (!array) {
      array = groupedMap[priority] = [];
      priorities.push(priority);
    }
    array.push(dir);
  }

  priorities.sort(function (a, b) {
    return a > b ? -1 : a === b ? 0 : 1;
  });
  for (i = 0, j = priorities.length; i < j; i++) {
    var group = groupedMap[priorities[i]];
    for (k = 0, l = group.length; k < l; k++) {
      dirs[index++] = group[k];
    }
  }
}

/**
 * Linker functions return an unlink function that
 * tearsdown all directives instances generated during
 * the process.
 *
 * We create unlink functions with only the necessary
 * information to avoid retaining additional closures.
 *
 * @param {Vue} vm
 * @param {Array} dirs
 * @param {Vue} [context]
 * @param {Array} [contextDirs]
 * @return {Function}
 */

function makeUnlinkFn(vm, dirs, context, contextDirs) {
  function unlink(destroying) {
    teardownDirs(vm, dirs, destroying);
    if (context && contextDirs) {
      teardownDirs(context, contextDirs);
    }
  }
  // expose linked directives
  unlink.dirs = dirs;
  return unlink;
}

/**
 * Teardown partial linked directives.
 *
 * @param {Vue} vm
 * @param {Array} dirs
 * @param {Boolean} destroying
 */

function teardownDirs(vm, dirs, destroying) {
  var i = dirs.length;
  while (i--) {
    dirs[i]._teardown();
    if (process.env.NODE_ENV !== 'production' && !destroying) {
      vm._directives.$remove(dirs[i]);
    }
  }
}

/**
 * Compile link props on an instance.
 *
 * @param {Vue} vm
 * @param {Element} el
 * @param {Object} props
 * @param {Object} [scope]
 * @return {Function}
 */

function compileAndLinkProps(vm, el, props, scope) {
  var propsLinkFn = compileProps(el, props, vm);
  var propDirs = linkAndCapture(function () {
    propsLinkFn(vm, scope);
  }, vm);
  return makeUnlinkFn(vm, propDirs);
}

/**
 * Compile the root element of an instance.
 *
 * 1. attrs on context container (context scope)
 * 2. attrs on the component template root node, if
 *    replace:true (child scope)
 *
 * If this is a fragment instance, we only need to compile 1.
 *
 * @param {Element} el
 * @param {Object} options
 * @param {Object} contextOptions
 * @return {Function}
 */

function compileRoot(el, options, contextOptions) {
  var containerAttrs = options._containerAttrs;
  var replacerAttrs = options._replacerAttrs;
  var contextLinkFn, replacerLinkFn;

  // only need to compile other attributes for
  // non-fragment instances
  if (el.nodeType !== 11) {
    // for components, container and replacer need to be
    // compiled separately and linked in different scopes.
    if (options._asComponent) {
      // 2. container attributes
      if (containerAttrs && contextOptions) {
        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
      }
      if (replacerAttrs) {
        // 3. replacer attributes
        replacerLinkFn = compileDirectives(replacerAttrs, options);
      }
    } else {
      // non-component, just compile as a normal element.
      replacerLinkFn = compileDirectives(el.attributes, options);
    }
  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
    // warn container directives for fragment instances
    var names = containerAttrs.filter(function (attr) {
      // allow vue-loader/vueify scoped css attributes
      return attr.name.indexOf('_v-') < 0 &&
      // allow event listeners
      !onRE.test(attr.name) &&
      // allow slots
      attr.name !== 'slot';
    }).map(function (attr) {
      return '"' + attr.name + '"';
    });
    if (names.length) {
      var plural = names.length > 1;

      var componentName = options.el.tagName.toLowerCase();
      if (componentName === 'component' && options.name) {
        componentName += ':' + options.name;
      }

      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + componentName + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
    }
  }

  options._containerAttrs = options._replacerAttrs = null;
  return function rootLinkFn(vm, el, scope) {
    // link context scope dirs
    var context = vm._context;
    var contextDirs;
    if (context && contextLinkFn) {
      contextDirs = linkAndCapture(function () {
        contextLinkFn(context, el, null, scope);
      }, context);
    }

    // link self
    var selfDirs = linkAndCapture(function () {
      if (replacerLinkFn) replacerLinkFn(vm, el);
    }, vm);

    // return the unlink function that tearsdown context
    // container directives.
    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
  };
}

/**
 * Compile a node and return a nodeLinkFn based on the
 * node type.
 *
 * @param {Node} node
 * @param {Object} options
 * @return {Function|null}
 */

function compileNode(node, options) {
  var type = node.nodeType;
  if (type === 1 && !isScript(node)) {
    return compileElement(node, options);
  } else if (type === 3 && node.data.trim()) {
    return compileTextNode(node, options);
  } else {
    return null;
  }
}

/**
 * Compile an element and return a nodeLinkFn.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Function|null}
 */

function compileElement(el, options) {
  // preprocess textareas.
  // textarea treats its text content as the initial value.
  // just bind it as an attr directive for value.
  if (el.tagName === 'TEXTAREA') {
    // a textarea which has v-pre attr should skip complie.
    if (getAttr(el, 'v-pre') !== null) {
      return skip;
    }
    var tokens = parseText(el.value);
    if (tokens) {
      el.setAttribute(':value', tokensToExp(tokens));
      el.value = '';
    }
  }
  var linkFn;
  var hasAttrs = el.hasAttributes();
  var attrs = hasAttrs && toArray(el.attributes);
  // check terminal directives (for & if)
  if (hasAttrs) {
    linkFn = checkTerminalDirectives(el, attrs, options);
  }
  // check element directives
  if (!linkFn) {
    linkFn = checkElementDirectives(el, options);
  }
  // check component
  if (!linkFn) {
    linkFn = checkComponent(el, options);
  }
  // normal directives
  if (!linkFn && hasAttrs) {
    linkFn = compileDirectives(attrs, options);
  }
  return linkFn;
}

/**
 * Compile a textNode and return a nodeLinkFn.
 *
 * @param {TextNode} node
 * @param {Object} options
 * @return {Function|null} textNodeLinkFn
 */

function compileTextNode(node, options) {
  // skip marked text nodes
  if (node._skip) {
    return removeText;
  }

  var tokens = parseText(node.wholeText);
  if (!tokens) {
    return null;
  }

  // mark adjacent text nodes as skipped,
  // because we are using node.wholeText to compile
  // all adjacent text nodes together. This fixes
  // issues in IE where sometimes it splits up a single
  // text node into multiple ones.
  var next = node.nextSibling;
  while (next && next.nodeType === 3) {
    next._skip = true;
    next = next.nextSibling;
  }

  var frag = document.createDocumentFragment();
  var el, token;
  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
    frag.appendChild(el);
  }
  return makeTextNodeLinkFn(tokens, frag, options);
}

/**
 * Linker for an skipped text node.
 *
 * @param {Vue} vm
 * @param {Text} node
 */

function removeText(vm, node) {
  remove(node);
}

/**
 * Process a single text token.
 *
 * @param {Object} token
 * @param {Object} options
 * @return {Node}
 */

function processTextToken(token, options) {
  var el;
  if (token.oneTime) {
    el = document.createTextNode(token.value);
  } else {
    if (token.html) {
      el = document.createComment('v-html');
      setTokenType('html');
    } else {
      // IE will clean up empty textNodes during
      // frag.cloneNode(true), so we have to give it
      // something here...
      el = document.createTextNode(' ');
      setTokenType('text');
    }
  }
  function setTokenType(type) {
    if (token.descriptor) return;
    var parsed = parseDirective(token.value);
    token.descriptor = {
      name: type,
      def: directives[type],
      expression: parsed.expression,
      filters: parsed.filters
    };
  }
  return el;
}

/**
 * Build a function that processes a textNode.
 *
 * @param {Array<Object>} tokens
 * @param {DocumentFragment} frag
 */

function makeTextNodeLinkFn(tokens, frag) {
  return function textNodeLinkFn(vm, el, host, scope) {
    var fragClone = frag.cloneNode(true);
    var childNodes = toArray(fragClone.childNodes);
    var token, value, node;
    for (var i = 0, l = tokens.length; i < l; i++) {
      token = tokens[i];
      value = token.value;
      if (token.tag) {
        node = childNodes[i];
        if (token.oneTime) {
          value = (scope || vm).$eval(value);
          if (token.html) {
            replace(node, parseTemplate(value, true));
          } else {
            node.data = _toString(value);
          }
        } else {
          vm._bindDir(token.descriptor, node, host, scope);
        }
      }
    }
    replace(el, fragClone);
  };
}

/**
 * Compile a node list and return a childLinkFn.
 *
 * @param {NodeList} nodeList
 * @param {Object} options
 * @return {Function|undefined}
 */

function compileNodeList(nodeList, options) {
  var linkFns = [];
  var nodeLinkFn, childLinkFn, node;
  for (var i = 0, l = nodeList.length; i < l; i++) {
    node = nodeList[i];
    nodeLinkFn = compileNode(node, options);
    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
    linkFns.push(nodeLinkFn, childLinkFn);
  }
  return linkFns.length ? makeChildLinkFn(linkFns) : null;
}

/**
 * Make a child link function for a node's childNodes.
 *
 * @param {Array<Function>} linkFns
 * @return {Function} childLinkFn
 */

function makeChildLinkFn(linkFns) {
  return function childLinkFn(vm, nodes, host, scope, frag) {
    var node, nodeLinkFn, childrenLinkFn;
    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
      node = nodes[n];
      nodeLinkFn = linkFns[i++];
      childrenLinkFn = linkFns[i++];
      // cache childNodes before linking parent, fix #657
      var childNodes = toArray(node.childNodes);
      if (nodeLinkFn) {
        nodeLinkFn(vm, node, host, scope, frag);
      }
      if (childrenLinkFn) {
        childrenLinkFn(vm, childNodes, host, scope, frag);
      }
    }
  };
}

/**
 * Check for element directives (custom elements that should
 * be resovled as terminal directives).
 *
 * @param {Element} el
 * @param {Object} options
 */

function checkElementDirectives(el, options) {
  var tag = el.tagName.toLowerCase();
  if (commonTagRE.test(tag)) {
    return;
  }
  var def = resolveAsset(options, 'elementDirectives', tag);
  if (def) {
    return makeTerminalNodeLinkFn(el, tag, '', options, def);
  }
}

/**
 * Check if an element is a component. If yes, return
 * a component link function.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Function|undefined}
 */

function checkComponent(el, options) {
  var component = checkComponentAttr(el, options);
  if (component) {
    var ref = findRef(el);
    var descriptor = {
      name: 'component',
      ref: ref,
      expression: component.id,
      def: internalDirectives.component,
      modifiers: {
        literal: !component.dynamic
      }
    };
    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
      if (ref) {
        defineReactive((scope || vm).$refs, ref, null);
      }
      vm._bindDir(descriptor, el, host, scope, frag);
    };
    componentLinkFn.terminal = true;
    return componentLinkFn;
  }
}

/**
 * Check an element for terminal directives in fixed order.
 * If it finds one, return a terminal link function.
 *
 * @param {Element} el
 * @param {Array} attrs
 * @param {Object} options
 * @return {Function} terminalLinkFn
 */

function checkTerminalDirectives(el, attrs, options) {
  // skip v-pre
  if (getAttr(el, 'v-pre') !== null) {
    return skip;
  }
  // skip v-else block, but only if following v-if
  if (el.hasAttribute('v-else')) {
    var prev = el.previousElementSibling;
    if (prev && prev.hasAttribute('v-if')) {
      return skip;
    }
  }

  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
  for (var i = 0, j = attrs.length; i < j; i++) {
    attr = attrs[i];
    name = attr.name.replace(modifierRE, '');
    if (matched = name.match(dirAttrRE)) {
      def = resolveAsset(options, 'directives', matched[1]);
      if (def && def.terminal) {
        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
          termDef = def;
          rawName = attr.name;
          modifiers = parseModifiers(attr.name);
          value = attr.value;
          dirName = matched[1];
          arg = matched[2];
        }
      }
    }
  }

  if (termDef) {
    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
  }
}

function skip() {}
skip.terminal = true;

/**
 * Build a node link function for a terminal directive.
 * A terminal link function terminates the current
 * compilation recursion and handles compilation of the
 * subtree in the directive.
 *
 * @param {Element} el
 * @param {String} dirName
 * @param {String} value
 * @param {Object} options
 * @param {Object} def
 * @param {String} [rawName]
 * @param {String} [arg]
 * @param {Object} [modifiers]
 * @return {Function} terminalLinkFn
 */

function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
  var parsed = parseDirective(value);
  var descriptor = {
    name: dirName,
    arg: arg,
    expression: parsed.expression,
    filters: parsed.filters,
    raw: value,
    attr: rawName,
    modifiers: modifiers,
    def: def
  };
  // check ref for v-for, v-if and router-view
  if (dirName === 'for' || dirName === 'router-view') {
    descriptor.ref = findRef(el);
  }
  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
    if (descriptor.ref) {
      defineReactive((scope || vm).$refs, descriptor.ref, null);
    }
    vm._bindDir(descriptor, el, host, scope, frag);
  };
  fn.terminal = true;
  return fn;
}

/**
 * Compile the directives on an element and return a linker.
 *
 * @param {Array|NamedNodeMap} attrs
 * @param {Object} options
 * @return {Function}
 */

function compileDirectives(attrs, options) {
  var i = attrs.length;
  var dirs = [];
  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
  while (i--) {
    attr = attrs[i];
    name = rawName = attr.name;
    value = rawValue = attr.value;
    tokens = parseText(value);
    // reset arg
    arg = null;
    // check modifiers
    modifiers = parseModifiers(name);
    name = name.replace(modifierRE, '');

    // attribute interpolations
    if (tokens) {
      value = tokensToExp(tokens);
      arg = name;
      pushDir('bind', directives.bind, tokens);
      // warn against mixing mustaches with v-bind
      if (process.env.NODE_ENV !== 'production') {
        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
          return attr.name === ':class' || attr.name === 'v-bind:class';
        })) {
          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
        }
      }
    } else

      // special attribute: transition
      if (transitionRE.test(name)) {
        modifiers.literal = !bindRE.test(name);
        pushDir('transition', internalDirectives.transition);
      } else

        // event handlers
        if (onRE.test(name)) {
          arg = name.replace(onRE, '');
          pushDir('on', directives.on);
        } else

          // attribute bindings
          if (bindRE.test(name)) {
            dirName = name.replace(bindRE, '');
            if (dirName === 'style' || dirName === 'class') {
              pushDir(dirName, internalDirectives[dirName]);
            } else {
              arg = dirName;
              pushDir('bind', directives.bind);
            }
          } else

            // normal directives
            if (matched = name.match(dirAttrRE)) {
              dirName = matched[1];
              arg = matched[2];

              // skip v-else (when used with v-show)
              if (dirName === 'else') {
                continue;
              }

              dirDef = resolveAsset(options, 'directives', dirName, true);
              if (dirDef) {
                pushDir(dirName, dirDef);
              }
            }
  }

  /**
   * Push a directive.
   *
   * @param {String} dirName
   * @param {Object|Function} def
   * @param {Array} [interpTokens]
   */

  function pushDir(dirName, def, interpTokens) {
    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
    var parsed = !hasOneTimeToken && parseDirective(value);
    dirs.push({
      name: dirName,
      attr: rawName,
      raw: rawValue,
      def: def,
      arg: arg,
      modifiers: modifiers,
      // conversion from interpolation strings with one-time token
      // to expression is differed until directive bind time so that we
      // have access to the actual vm context for one-time bindings.
      expression: parsed && parsed.expression,
      filters: parsed && parsed.filters,
      interp: interpTokens,
      hasOneTime: hasOneTimeToken
    });
  }

  if (dirs.length) {
    return makeNodeLinkFn(dirs);
  }
}

/**
 * Parse modifiers from directive attribute name.
 *
 * @param {String} name
 * @return {Object}
 */

function parseModifiers(name) {
  var res = Object.create(null);
  var match = name.match(modifierRE);
  if (match) {
    var i = match.length;
    while (i--) {
      res[match[i].slice(1)] = true;
    }
  }
  return res;
}

/**
 * Build a link function for all directives on a single node.
 *
 * @param {Array} directives
 * @return {Function} directivesLinkFn
 */

function makeNodeLinkFn(directives) {
  return function nodeLinkFn(vm, el, host, scope, frag) {
    // reverse apply because it's sorted low to high
    var i = directives.length;
    while (i--) {
      vm._bindDir(directives[i], el, host, scope, frag);
    }
  };
}

/**
 * Check if an interpolation string contains one-time tokens.
 *
 * @param {Array} tokens
 * @return {Boolean}
 */

function hasOneTime(tokens) {
  var i = tokens.length;
  while (i--) {
    if (tokens[i].oneTime) return true;
  }
}

function isScript(el) {
  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
}

var specialCharRE = /[^\w\-:\.]/;

/**
 * Process an element or a DocumentFragment based on a
 * instance option object. This allows us to transclude
 * a template node/fragment before the instance is created,
 * so the processed fragment can then be cloned and reused
 * in v-for.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Element|DocumentFragment}
 */

function transclude(el, options) {
  // extract container attributes to pass them down
  // to compiler, because they need to be compiled in
  // parent scope. we are mutating the options object here
  // assuming the same object will be used for compile
  // right after this.
  if (options) {
    options._containerAttrs = extractAttrs(el);
  }
  // for template tags, what we want is its content as
  // a documentFragment (for fragment instances)
  if (isTemplate(el)) {
    el = parseTemplate(el);
  }
  if (options) {
    if (options._asComponent && !options.template) {
      options.template = '<slot></slot>';
    }
    if (options.template) {
      options._content = extractContent(el);
      el = transcludeTemplate(el, options);
    }
  }
  if (isFragment(el)) {
    // anchors for fragment instance
    // passing in `persist: true` to avoid them being
    // discarded by IE during template cloning
    prepend(createAnchor('v-start', true), el);
    el.appendChild(createAnchor('v-end', true));
  }
  return el;
}

/**
 * Process the template option.
 * If the replace option is true this will swap the $el.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Element|DocumentFragment}
 */

function transcludeTemplate(el, options) {
  var template = options.template;
  var frag = parseTemplate(template, true);
  if (frag) {
    var replacer = frag.firstChild;
    if (!replacer) {
      return frag;
    }
    var tag = replacer.tagName && replacer.tagName.toLowerCase();
    if (options.replace) {
      /* istanbul ignore if */
      if (el === document.body) {
        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
      }
      // there are many cases where the instance must
      // become a fragment instance: basically anything that
      // can create more than 1 root nodes.
      if (
      // multi-children template
      frag.childNodes.length > 1 ||
      // non-element template
      replacer.nodeType !== 1 ||
      // single nested component
      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
      // element directive
      resolveAsset(options, 'elementDirectives', tag) ||
      // for block
      replacer.hasAttribute('v-for') ||
      // if block
      replacer.hasAttribute('v-if')) {
        return frag;
      } else {
        options._replacerAttrs = extractAttrs(replacer);
        mergeAttrs(el, replacer);
        return replacer;
      }
    } else {
      el.appendChild(frag);
      return el;
    }
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
  }
}

/**
 * Helper to extract a component container's attributes
 * into a plain object array.
 *
 * @param {Element} el
 * @return {Array}
 */

function extractAttrs(el) {
  if (el.nodeType === 1 && el.hasAttributes()) {
    return toArray(el.attributes);
  }
}

/**
 * Merge the attributes of two elements, and make sure
 * the class names are merged properly.
 *
 * @param {Element} from
 * @param {Element} to
 */

function mergeAttrs(from, to) {
  var attrs = from.attributes;
  var i = attrs.length;
  var name, value;
  while (i--) {
    name = attrs[i].name;
    value = attrs[i].value;
    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
      to.setAttribute(name, value);
    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
      value.split(/\s+/).forEach(function (cls) {
        addClass(to, cls);
      });
    }
  }
}

/**
 * Scan and determine slot content distribution.
 * We do this during transclusion instead at compile time so that
 * the distribution is decoupled from the compilation order of
 * the slots.
 *
 * @param {Element|DocumentFragment} template
 * @param {Element} content
 * @param {Vue} vm
 */

function resolveSlots(vm, content) {
  if (!content) {
    return;
  }
  var contents = vm._slotContents = Object.create(null);
  var el, name;
  for (var i = 0, l = content.children.length; i < l; i++) {
    el = content.children[i];
    /* eslint-disable no-cond-assign */
    if (name = el.getAttribute('slot')) {
      (contents[name] || (contents[name] = [])).push(el);
    }
    /* eslint-enable no-cond-assign */
    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
      warn('The "slot" attribute must be static.', vm.$parent);
    }
  }
  for (name in contents) {
    contents[name] = extractFragment(contents[name], content);
  }
  if (content.hasChildNodes()) {
    var nodes = content.childNodes;
    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
      return;
    }
    contents['default'] = extractFragment(content.childNodes, content);
  }
}

/**
 * Extract qualified content nodes from a node list.
 *
 * @param {NodeList} nodes
 * @return {DocumentFragment}
 */

function extractFragment(nodes, parent) {
  var frag = document.createDocumentFragment();
  nodes = toArray(nodes);
  for (var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
      parent.removeChild(node);
      node = parseTemplate(node, true);
    }
    frag.appendChild(node);
  }
  return frag;
}



var compiler = Object.freeze({
	compile: compile,
	compileAndLinkProps: compileAndLinkProps,
	compileRoot: compileRoot,
	transclude: transclude,
	resolveSlots: resolveSlots
});

function stateMixin (Vue) {
  /**
   * Accessor for `$data` property, since setting $data
   * requires observing the new object and updating
   * proxied properties.
   */

  Object.defineProperty(Vue.prototype, '$data', {
    get: function get() {
      return this._data;
    },
    set: function set(newData) {
      if (newData !== this._data) {
        this._setData(newData);
      }
    }
  });

  /**
   * Setup the scope of an instance, which contains:
   * - observed data
   * - computed properties
   * - user methods
   * - meta properties
   */

  Vue.prototype._initState = function () {
    this._initProps();
    this._initMeta();
    this._initMethods();
    this._initData();
    this._initComputed();
  };

  /**
   * Initialize props.
   */

  Vue.prototype._initProps = function () {
    var options = this.$options;
    var el = options.el;
    var props = options.props;
    if (props && !el) {
      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
    }
    // make sure to convert string selectors into element now
    el = options.el = query(el);
    this._propsUnlinkFn = el && el.nodeType === 1 && props
    // props must be linked in proper scope if inside v-for
    ? compileAndLinkProps(this, el, props, this._scope) : null;
  };

  /**
   * Initialize the data.
   */

  Vue.prototype._initData = function () {
    var dataFn = this.$options.data;
    var data = this._data = dataFn ? dataFn() : {};
    if (!isPlainObject(data)) {
      data = {};
      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
    }
    var props = this._props;
    // proxy data on instance
    var keys = Object.keys(data);
    var i, key;
    i = keys.length;
    while (i--) {
      key = keys[i];
      // there are two scenarios where we can proxy a data key:
      // 1. it's not already defined as a prop
      // 2. it's provided via a instantiation option AND there are no
      //    template prop present
      if (!props || !hasOwn(props, key)) {
        this._proxy(key);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
      }
    }
    // observe data
    observe(data, this);
  };

  /**
   * Swap the instance's $data. Called in $data's setter.
   *
   * @param {Object} newData
   */

  Vue.prototype._setData = function (newData) {
    newData = newData || {};
    var oldData = this._data;
    this._data = newData;
    var keys, key, i;
    // unproxy keys not present in new data
    keys = Object.keys(oldData);
    i = keys.length;
    while (i--) {
      key = keys[i];
      if (!(key in newData)) {
        this._unproxy(key);
      }
    }
    // proxy keys not already proxied,
    // and trigger change for changed values
    keys = Object.keys(newData);
    i = keys.length;
    while (i--) {
      key = keys[i];
      if (!hasOwn(this, key)) {
        // new property
        this._proxy(key);
      }
    }
    oldData.__ob__.removeVm(this);
    observe(newData, this);
    this._digest();
  };

  /**
   * Proxy a property, so that
   * vm.prop === vm._data.prop
   *
   * @param {String} key
   */

  Vue.prototype._proxy = function (key) {
    if (!isReserved(key)) {
      // need to store ref to self here
      // because these getter/setters might
      // be called by child scopes via
      // prototype inheritance.
      var self = this;
      Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter() {
          return self._data[key];
        },
        set: function proxySetter(val) {
          self._data[key] = val;
        }
      });
    }
  };

  /**
   * Unproxy a property.
   *
   * @param {String} key
   */

  Vue.prototype._unproxy = function (key) {
    if (!isReserved(key)) {
      delete this[key];
    }
  };

  /**
   * Force update on every watcher in scope.
   */

  Vue.prototype._digest = function () {
    for (var i = 0, l = this._watchers.length; i < l; i++) {
      this._watchers[i].update(true); // shallow updates
    }
  };

  /**
   * Setup computed properties. They are essentially
   * special getter/setters
   */

  function noop() {}
  Vue.prototype._initComputed = function () {
    var computed = this.$options.computed;
    if (computed) {
      for (var key in computed) {
        var userDef = computed[key];
        var def = {
          enumerable: true,
          configurable: true
        };
        if (typeof userDef === 'function') {
          def.get = makeComputedGetter(userDef, this);
          def.set = noop;
        } else {
          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
          def.set = userDef.set ? bind(userDef.set, this) : noop;
        }
        Object.defineProperty(this, key, def);
      }
    }
  };

  function makeComputedGetter(getter, owner) {
    var watcher = new Watcher(owner, getter, null, {
      lazy: true
    });
    return function computedGetter() {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    };
  }

  /**
   * Setup instance methods. Methods must be bound to the
   * instance since they might be passed down as a prop to
   * child components.
   */

  Vue.prototype._initMethods = function () {
    var methods = this.$options.methods;
    if (methods) {
      for (var key in methods) {
        this[key] = bind(methods[key], this);
      }
    }
  };

  /**
   * Initialize meta information like $index, $key & $value.
   */

  Vue.prototype._initMeta = function () {
    var metas = this.$options._meta;
    if (metas) {
      for (var key in metas) {
        defineReactive(this, key, metas[key]);
      }
    }
  };
}

var eventRE = /^v-on:|^@/;

function eventsMixin (Vue) {
  /**
   * Setup the instance's option events & watchers.
   * If the value is a string, we pull it from the
   * instance's methods by name.
   */

  Vue.prototype._initEvents = function () {
    var options = this.$options;
    if (options._asComponent) {
      registerComponentEvents(this, options.el);
    }
    registerCallbacks(this, '$on', options.events);
    registerCallbacks(this, '$watch', options.watch);
  };

  /**
   * Register v-on events on a child component
   *
   * @param {Vue} vm
   * @param {Element} el
   */

  function registerComponentEvents(vm, el) {
    var attrs = el.attributes;
    var name, value, handler;
    for (var i = 0, l = attrs.length; i < l; i++) {
      name = attrs[i].name;
      if (eventRE.test(name)) {
        name = name.replace(eventRE, '');
        // force the expression into a statement so that
        // it always dynamically resolves the method to call (#2670)
        // kinda ugly hack, but does the job.
        value = attrs[i].value;
        if (isSimplePath(value)) {
          value += '.apply(this, $arguments)';
        }
        handler = (vm._scope || vm._context).$eval(value, true);
        handler._fromParent = true;
        vm.$on(name.replace(eventRE), handler);
      }
    }
  }

  /**
   * Register callbacks for option events and watchers.
   *
   * @param {Vue} vm
   * @param {String} action
   * @param {Object} hash
   */

  function registerCallbacks(vm, action, hash) {
    if (!hash) return;
    var handlers, key, i, j;
    for (key in hash) {
      handlers = hash[key];
      if (isArray(handlers)) {
        for (i = 0, j = handlers.length; i < j; i++) {
          register(vm, action, key, handlers[i]);
        }
      } else {
        register(vm, action, key, handlers);
      }
    }
  }

  /**
   * Helper to register an event/watch callback.
   *
   * @param {Vue} vm
   * @param {String} action
   * @param {String} key
   * @param {Function|String|Object} handler
   * @param {Object} [options]
   */

  function register(vm, action, key, handler, options) {
    var type = typeof handler;
    if (type === 'function') {
      vm[action](key, handler, options);
    } else if (type === 'string') {
      var methods = vm.$options.methods;
      var method = methods && methods[handler];
      if (method) {
        vm[action](key, method, options);
      } else {
        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
      }
    } else if (handler && type === 'object') {
      register(vm, action, key, handler.handler, handler);
    }
  }

  /**
   * Setup recursive attached/detached calls
   */

  Vue.prototype._initDOMHooks = function () {
    this.$on('hook:attached', onAttached);
    this.$on('hook:detached', onDetached);
  };

  /**
   * Callback to recursively call attached hook on children
   */

  function onAttached() {
    if (!this._isAttached) {
      this._isAttached = true;
      this.$children.forEach(callAttach);
    }
  }

  /**
   * Iterator to call attached hook
   *
   * @param {Vue} child
   */

  function callAttach(child) {
    if (!child._isAttached && inDoc(child.$el)) {
      child._callHook('attached');
    }
  }

  /**
   * Callback to recursively call detached hook on children
   */

  function onDetached() {
    if (this._isAttached) {
      this._isAttached = false;
      this.$children.forEach(callDetach);
    }
  }

  /**
   * Iterator to call detached hook
   *
   * @param {Vue} child
   */

  function callDetach(child) {
    if (child._isAttached && !inDoc(child.$el)) {
      child._callHook('detached');
    }
  }

  /**
   * Trigger all handlers for a hook
   *
   * @param {String} hook
   */

  Vue.prototype._callHook = function (hook) {
    this.$emit('pre-hook:' + hook);
    var handlers = this.$options[hook];
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        handlers[i].call(this);
      }
    }
    this.$emit('hook:' + hook);
  };
}

function noop$1() {}

/**
 * A directive links a DOM element with a piece of data,
 * which is the result of evaluating an expression.
 * It registers a watcher with the expression and calls
 * the DOM update function when a change is triggered.
 *
 * @param {Object} descriptor
 *                 - {String} name
 *                 - {Object} def
 *                 - {String} expression
 *                 - {Array<Object>} [filters]
 *                 - {Object} [modifiers]
 *                 - {Boolean} literal
 *                 - {String} attr
 *                 - {String} arg
 *                 - {String} raw
 *                 - {String} [ref]
 *                 - {Array<Object>} [interp]
 *                 - {Boolean} [hasOneTime]
 * @param {Vue} vm
 * @param {Node} el
 * @param {Vue} [host] - transclusion host component
 * @param {Object} [scope] - v-for scope
 * @param {Fragment} [frag] - owner fragment
 * @constructor
 */
function Directive(descriptor, vm, el, host, scope, frag) {
  this.vm = vm;
  this.el = el;
  // copy descriptor properties
  this.descriptor = descriptor;
  this.name = descriptor.name;
  this.expression = descriptor.expression;
  this.arg = descriptor.arg;
  this.modifiers = descriptor.modifiers;
  this.filters = descriptor.filters;
  this.literal = this.modifiers && this.modifiers.literal;
  // private
  this._locked = false;
  this._bound = false;
  this._listeners = null;
  // link context
  this._host = host;
  this._scope = scope;
  this._frag = frag;
  // store directives on node in dev mode
  if (process.env.NODE_ENV !== 'production' && this.el) {
    this.el._vue_directives = this.el._vue_directives || [];
    this.el._vue_directives.push(this);
  }
}

/**
 * Initialize the directive, mixin definition properties,
 * setup the watcher, call definition bind() and update()
 * if present.
 */

Directive.prototype._bind = function () {
  var name = this.name;
  var descriptor = this.descriptor;

  // remove attribute
  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
    var attr = descriptor.attr || 'v-' + name;
    this.el.removeAttribute(attr);
  }

  // copy def properties
  var def = descriptor.def;
  if (typeof def === 'function') {
    this.update = def;
  } else {
    extend(this, def);
  }

  // setup directive params
  this._setupParams();

  // initial bind
  if (this.bind) {
    this.bind();
  }
  this._bound = true;

  if (this.literal) {
    this.update && this.update(descriptor.raw);
  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
    // wrapped updater for context
    var dir = this;
    if (this.update) {
      this._update = function (val, oldVal) {
        if (!dir._locked) {
          dir.update(val, oldVal);
        }
      };
    } else {
      this._update = noop$1;
    }
    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
    {
      filters: this.filters,
      twoWay: this.twoWay,
      deep: this.deep,
      preProcess: preProcess,
      postProcess: postProcess,
      scope: this._scope
    });
    // v-model with inital inline value need to sync back to
    // model instead of update to DOM on init. They would
    // set the afterBind hook to indicate that.
    if (this.afterBind) {
      this.afterBind();
    } else if (this.update) {
      this.update(watcher.value);
    }
  }
};

/**
 * Setup all param attributes, e.g. track-by,
 * transition-mode, etc...
 */

Directive.prototype._setupParams = function () {
  if (!this.params) {
    return;
  }
  var params = this.params;
  // swap the params array with a fresh object.
  this.params = Object.create(null);
  var i = params.length;
  var key, val, mappedKey;
  while (i--) {
    key = hyphenate(params[i]);
    mappedKey = camelize(key);
    val = getBindAttr(this.el, key);
    if (val != null) {
      // dynamic
      this._setupParamWatcher(mappedKey, val);
    } else {
      // static
      val = getAttr(this.el, key);
      if (val != null) {
        this.params[mappedKey] = val === '' ? true : val;
      }
    }
  }
};

/**
 * Setup a watcher for a dynamic param.
 *
 * @param {String} key
 * @param {String} expression
 */

Directive.prototype._setupParamWatcher = function (key, expression) {
  var self = this;
  var called = false;
  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
    self.params[key] = val;
    // since we are in immediate mode,
    // only call the param change callbacks if this is not the first update.
    if (called) {
      var cb = self.paramWatchers && self.paramWatchers[key];
      if (cb) {
        cb.call(self, val, oldVal);
      }
    } else {
      called = true;
    }
  }, {
    immediate: true,
    user: false
  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
};

/**
 * Check if the directive is a function caller
 * and if the expression is a callable one. If both true,
 * we wrap up the expression and use it as the event
 * handler.
 *
 * e.g. on-click="a++"
 *
 * @return {Boolean}
 */

Directive.prototype._checkStatement = function () {
  var expression = this.expression;
  if (expression && this.acceptStatement && !isSimplePath(expression)) {
    var fn = parseExpression$1(expression).get;
    var scope = this._scope || this.vm;
    var handler = function handler(e) {
      scope.$event = e;
      fn.call(scope, scope);
      scope.$event = null;
    };
    if (this.filters) {
      handler = scope._applyFilters(handler, null, this.filters);
    }
    this.update(handler);
    return true;
  }
};

/**
 * Set the corresponding value with the setter.
 * This should only be used in two-way directives
 * e.g. v-model.
 *
 * @param {*} value
 * @public
 */

Directive.prototype.set = function (value) {
  /* istanbul ignore else */
  if (this.twoWay) {
    this._withLock(function () {
      this._watcher.set(value);
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn('Directive.set() can only be used inside twoWay' + 'directives.');
  }
};

/**
 * Execute a function while preventing that function from
 * triggering updates on this directive instance.
 *
 * @param {Function} fn
 */

Directive.prototype._withLock = function (fn) {
  var self = this;
  self._locked = true;
  fn.call(self);
  nextTick(function () {
    self._locked = false;
  });
};

/**
 * Convenience method that attaches a DOM event listener
 * to the directive element and autometically tears it down
 * during unbind.
 *
 * @param {String} event
 * @param {Function} handler
 * @param {Boolean} [useCapture]
 */

Directive.prototype.on = function (event, handler, useCapture) {
  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
};

/**
 * Teardown the watcher and call unbind.
 */

Directive.prototype._teardown = function () {
  if (this._bound) {
    this._bound = false;
    if (this.unbind) {
      this.unbind();
    }
    if (this._watcher) {
      this._watcher.teardown();
    }
    var listeners = this._listeners;
    var i;
    if (listeners) {
      i = listeners.length;
      while (i--) {
        off(this.el, listeners[i][0], listeners[i][1]);
      }
    }
    var unwatchFns = this._paramUnwatchFns;
    if (unwatchFns) {
      i = unwatchFns.length;
      while (i--) {
        unwatchFns[i]();
      }
    }
    if (process.env.NODE_ENV !== 'production' && this.el) {
      this.el._vue_directives.$remove(this);
    }
    this.vm = this.el = this._watcher = this._listeners = null;
  }
};

function lifecycleMixin (Vue) {
  /**
   * Update v-ref for component.
   *
   * @param {Boolean} remove
   */

  Vue.prototype._updateRef = function (remove) {
    var ref = this.$options._ref;
    if (ref) {
      var refs = (this._scope || this._context).$refs;
      if (remove) {
        if (refs[ref] === this) {
          refs[ref] = null;
        }
      } else {
        refs[ref] = this;
      }
    }
  };

  /**
   * Transclude, compile and link element.
   *
   * If a pre-compiled linker is available, that means the
   * passed in element will be pre-transcluded and compiled
   * as well - all we need to do is to call the linker.
   *
   * Otherwise we need to call transclude/compile/link here.
   *
   * @param {Element} el
   */

  Vue.prototype._compile = function (el) {
    var options = this.$options;

    // transclude and init element
    // transclude can potentially replace original
    // so we need to keep reference; this step also injects
    // the template and caches the original attributes
    // on the container node and replacer node.
    var original = el;
    el = transclude(el, options);
    this._initElement(el);

    // handle v-pre on root node (#2026)
    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
      return;
    }

    // root is always compiled per-instance, because
    // container attrs and props can be different every time.
    var contextOptions = this._context && this._context.$options;
    var rootLinker = compileRoot(el, options, contextOptions);

    // resolve slot distribution
    resolveSlots(this, options._content);

    // compile and link the rest
    var contentLinkFn;
    var ctor = this.constructor;
    // component compilation can be cached
    // as long as it's not using inline-template
    if (options._linkerCachable) {
      contentLinkFn = ctor.linker;
      if (!contentLinkFn) {
        contentLinkFn = ctor.linker = compile(el, options);
      }
    }

    // link phase
    // make sure to link root with prop scope!
    var rootUnlinkFn = rootLinker(this, el, this._scope);
    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

    // register composite unlink function
    // to be called during instance destruction
    this._unlinkFn = function () {
      rootUnlinkFn();
      // passing destroying: true to avoid searching and
      // splicing the directives
      contentUnlinkFn(true);
    };

    // finally replace original
    if (options.replace) {
      replace(original, el);
    }

    this._isCompiled = true;
    this._callHook('compiled');
  };

  /**
   * Initialize instance element. Called in the public
   * $mount() method.
   *
   * @param {Element} el
   */

  Vue.prototype._initElement = function (el) {
    if (isFragment(el)) {
      this._isFragment = true;
      this.$el = this._fragmentStart = el.firstChild;
      this._fragmentEnd = el.lastChild;
      // set persisted text anchors to empty
      if (this._fragmentStart.nodeType === 3) {
        this._fragmentStart.data = this._fragmentEnd.data = '';
      }
      this._fragment = el;
    } else {
      this.$el = el;
    }
    this.$el.__vue__ = this;
    this._callHook('beforeCompile');
  };

  /**
   * Create and bind a directive to an element.
   *
   * @param {Object} descriptor - parsed directive descriptor
   * @param {Node} node   - target node
   * @param {Vue} [host] - transclusion host component
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - owner fragment
   */

  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
  };

  /**
   * Teardown an instance, unobserves the data, unbind all the
   * directives, turn off all the event listeners, etc.
   *
   * @param {Boolean} remove - whether to remove the DOM node.
   * @param {Boolean} deferCleanup - if true, defer cleanup to
   *                                 be called later
   */

  Vue.prototype._destroy = function (remove, deferCleanup) {
    if (this._isBeingDestroyed) {
      if (!deferCleanup) {
        this._cleanup();
      }
      return;
    }

    var destroyReady;
    var pendingRemoval;

    var self = this;
    // Cleanup should be called either synchronously or asynchronoysly as
    // callback of this.$remove(), or if remove and deferCleanup are false.
    // In any case it should be called after all other removing, unbinding and
    // turning of is done
    var cleanupIfPossible = function cleanupIfPossible() {
      if (destroyReady && !pendingRemoval && !deferCleanup) {
        self._cleanup();
      }
    };

    // remove DOM element
    if (remove && this.$el) {
      pendingRemoval = true;
      this.$remove(function () {
        pendingRemoval = false;
        cleanupIfPossible();
      });
    }

    this._callHook('beforeDestroy');
    this._isBeingDestroyed = true;
    var i;
    // remove self from parent. only necessary
    // if parent is not being destroyed as well.
    var parent = this.$parent;
    if (parent && !parent._isBeingDestroyed) {
      parent.$children.$remove(this);
      // unregister ref (remove: true)
      this._updateRef(true);
    }
    // destroy all children.
    i = this.$children.length;
    while (i--) {
      this.$children[i].$destroy();
    }
    // teardown props
    if (this._propsUnlinkFn) {
      this._propsUnlinkFn();
    }
    // teardown all directives. this also tearsdown all
    // directive-owned watchers.
    if (this._unlinkFn) {
      this._unlinkFn();
    }
    i = this._watchers.length;
    while (i--) {
      this._watchers[i].teardown();
    }
    // remove reference to self on $el
    if (this.$el) {
      this.$el.__vue__ = null;
    }

    destroyReady = true;
    cleanupIfPossible();
  };

  /**
   * Clean up to ensure garbage collection.
   * This is called after the leave transition if there
   * is any.
   */

  Vue.prototype._cleanup = function () {
    if (this._isDestroyed) {
      return;
    }
    // remove self from owner fragment
    // do it in cleanup so that we can call $destroy with
    // defer right when a fragment is about to be removed.
    if (this._frag) {
      this._frag.children.$remove(this);
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (this._data && this._data.__ob__) {
      this._data.__ob__.removeVm(this);
    }
    // Clean up references to private properties and other
    // instances. preserve reference to _data so that proxy
    // accessors still work. The only potential side effect
    // here is that mutating the instance after it's destroyed
    // may affect the state of other components that are still
    // observing the same object, but that seems to be a
    // reasonable responsibility for the user rather than
    // always throwing an error on them.
    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
    // call the last hook...
    this._isDestroyed = true;
    this._callHook('destroyed');
    // turn off all instance listeners.
    this.$off();
  };
}

function miscMixin (Vue) {
  /**
   * Apply a list of filter (descriptors) to a value.
   * Using plain for loops here because this will be called in
   * the getter of any watcher with filters so it is very
   * performance sensitive.
   *
   * @param {*} value
   * @param {*} [oldValue]
   * @param {Array} filters
   * @param {Boolean} write
   * @return {*}
   */

  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
    var filter, fn, args, arg, offset, i, l, j, k;
    for (i = 0, l = filters.length; i < l; i++) {
      filter = filters[write ? l - i - 1 : i];
      fn = resolveAsset(this.$options, 'filters', filter.name, true);
      if (!fn) continue;
      fn = write ? fn.write : fn.read || fn;
      if (typeof fn !== 'function') continue;
      args = write ? [value, oldValue] : [value];
      offset = write ? 2 : 1;
      if (filter.args) {
        for (j = 0, k = filter.args.length; j < k; j++) {
          arg = filter.args[j];
          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
        }
      }
      value = fn.apply(this, args);
    }
    return value;
  };

  /**
   * Resolve a component, depending on whether the component
   * is defined normally or using an async factory function.
   * Resolves synchronously if already resolved, otherwise
   * resolves asynchronously and caches the resolved
   * constructor on the factory.
   *
   * @param {String|Function} value
   * @param {Function} cb
   */

  Vue.prototype._resolveComponent = function (value, cb) {
    var factory;
    if (typeof value === 'function') {
      factory = value;
    } else {
      factory = resolveAsset(this.$options, 'components', value, true);
    }
    /* istanbul ignore if */
    if (!factory) {
      return;
    }
    // async component factory
    if (!factory.options) {
      if (factory.resolved) {
        // cached
        cb(factory.resolved);
      } else if (factory.requested) {
        // pool callbacks
        factory.pendingCallbacks.push(cb);
      } else {
        factory.requested = true;
        var cbs = factory.pendingCallbacks = [cb];
        factory.call(this, function resolve(res) {
          if (isPlainObject(res)) {
            res = Vue.extend(res);
          }
          // cache resolved
          factory.resolved = res;
          // invoke callbacks
          for (var i = 0, l = cbs.length; i < l; i++) {
            cbs[i](res);
          }
        }, function reject(reason) {
          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
        });
      }
    } else {
      // normal component
      cb(factory);
    }
  };
}

var filterRE$1 = /[^|]\|[^|]/;

function dataAPI (Vue) {
  /**
   * Get the value from an expression on this vm.
   *
   * @param {String} exp
   * @param {Boolean} [asStatement]
   * @return {*}
   */

  Vue.prototype.$get = function (exp, asStatement) {
    var res = parseExpression$1(exp);
    if (res) {
      if (asStatement) {
        var self = this;
        return function statementHandler() {
          self.$arguments = toArray(arguments);
          var result = res.get.call(self, self);
          self.$arguments = null;
          return result;
        };
      } else {
        try {
          return res.get.call(this, this);
        } catch (e) {}
      }
    }
  };

  /**
   * Set the value from an expression on this vm.
   * The expression must be a valid left-hand
   * expression in an assignment.
   *
   * @param {String} exp
   * @param {*} val
   */

  Vue.prototype.$set = function (exp, val) {
    var res = parseExpression$1(exp, true);
    if (res && res.set) {
      res.set.call(this, this, val);
    }
  };

  /**
   * Delete a property on the VM
   *
   * @param {String} key
   */

  Vue.prototype.$delete = function (key) {
    del(this._data, key);
  };

  /**
   * Watch an expression, trigger callback when its
   * value changes.
   *
   * @param {String|Function} expOrFn
   * @param {Function} cb
   * @param {Object} [options]
   *                 - {Boolean} deep
   *                 - {Boolean} immediate
   * @return {Function} - unwatchFn
   */

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    var parsed;
    if (typeof expOrFn === 'string') {
      parsed = parseDirective(expOrFn);
      expOrFn = parsed.expression;
    }
    var watcher = new Watcher(vm, expOrFn, cb, {
      deep: options && options.deep,
      sync: options && options.sync,
      filters: parsed && parsed.filters,
      user: !options || options.user !== false
    });
    if (options && options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };

  /**
   * Evaluate a text directive, including filters.
   *
   * @param {String} text
   * @param {Boolean} [asStatement]
   * @return {String}
   */

  Vue.prototype.$eval = function (text, asStatement) {
    // check for filters.
    if (filterRE$1.test(text)) {
      var dir = parseDirective(text);
      // the filter regex check might give false positive
      // for pipes inside strings, so it's possible that
      // we don't get any filters here
      var val = this.$get(dir.expression, asStatement);
      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
    } else {
      // no filter
      return this.$get(text, asStatement);
    }
  };

  /**
   * Interpolate a piece of template text.
   *
   * @param {String} text
   * @return {String}
   */

  Vue.prototype.$interpolate = function (text) {
    var tokens = parseText(text);
    var vm = this;
    if (tokens) {
      if (tokens.length === 1) {
        return vm.$eval(tokens[0].value) + '';
      } else {
        return tokens.map(function (token) {
          return token.tag ? vm.$eval(token.value) : token.value;
        }).join('');
      }
    } else {
      return text;
    }
  };

  /**
   * Log instance data as a plain JS object
   * so that it is easier to inspect in console.
   * This method assumes console is available.
   *
   * @param {String} [path]
   */

  Vue.prototype.$log = function (path) {
    var data = path ? getPath(this._data, path) : this._data;
    if (data) {
      data = clean(data);
    }
    // include computed fields
    if (!path) {
      var key;
      for (key in this.$options.computed) {
        data[key] = clean(this[key]);
      }
      if (this._props) {
        for (key in this._props) {
          data[key] = clean(this[key]);
        }
      }
    }
    console.log(data);
  };

  /**
   * "clean" a getter/setter converted object into a plain
   * object copy.
   *
   * @param {Object} - obj
   * @return {Object}
   */

  function clean(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

function domAPI (Vue) {
  /**
   * Convenience on-instance nextTick. The callback is
   * auto-bound to the instance, and this avoids component
   * modules having to rely on the global Vue.
   *
   * @param {Function} fn
   */

  Vue.prototype.$nextTick = function (fn) {
    nextTick(fn, this);
  };

  /**
   * Append instance to target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$appendTo = function (target, cb, withTransition) {
    return insert(this, target, cb, withTransition, append, appendWithTransition);
  };

  /**
   * Prepend instance to target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$prependTo = function (target, cb, withTransition) {
    target = query(target);
    if (target.hasChildNodes()) {
      this.$before(target.firstChild, cb, withTransition);
    } else {
      this.$appendTo(target, cb, withTransition);
    }
    return this;
  };

  /**
   * Insert instance before target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$before = function (target, cb, withTransition) {
    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
  };

  /**
   * Insert instance after target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$after = function (target, cb, withTransition) {
    target = query(target);
    if (target.nextSibling) {
      this.$before(target.nextSibling, cb, withTransition);
    } else {
      this.$appendTo(target.parentNode, cb, withTransition);
    }
    return this;
  };

  /**
   * Remove instance from DOM
   *
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$remove = function (cb, withTransition) {
    if (!this.$el.parentNode) {
      return cb && cb();
    }
    var inDocument = this._isAttached && inDoc(this.$el);
    // if we are not in document, no need to check
    // for transitions
    if (!inDocument) withTransition = false;
    var self = this;
    var realCb = function realCb() {
      if (inDocument) self._callHook('detached');
      if (cb) cb();
    };
    if (this._isFragment) {
      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
    } else {
      var op = withTransition === false ? removeWithCb : removeWithTransition;
      op(this.$el, this, realCb);
    }
    return this;
  };

  /**
   * Shared DOM insertion function.
   *
   * @param {Vue} vm
   * @param {Element} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition]
   * @param {Function} op1 - op for non-transition insert
   * @param {Function} op2 - op for transition insert
   * @return vm
   */

  function insert(vm, target, cb, withTransition, op1, op2) {
    target = query(target);
    var targetIsDetached = !inDoc(target);
    var op = withTransition === false || targetIsDetached ? op1 : op2;
    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
    if (vm._isFragment) {
      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
        op(node, target, vm);
      });
      cb && cb();
    } else {
      op(vm.$el, target, vm, cb);
    }
    if (shouldCallHook) {
      vm._callHook('attached');
    }
    return vm;
  }

  /**
   * Check for selectors
   *
   * @param {String|Element} el
   */

  function query(el) {
    return typeof el === 'string' ? document.querySelector(el) : el;
  }

  /**
   * Append operation that takes a callback.
   *
   * @param {Node} el
   * @param {Node} target
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function append(el, target, vm, cb) {
    target.appendChild(el);
    if (cb) cb();
  }

  /**
   * InsertBefore operation that takes a callback.
   *
   * @param {Node} el
   * @param {Node} target
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function beforeWithCb(el, target, vm, cb) {
    before(el, target);
    if (cb) cb();
  }

  /**
   * Remove operation that takes a callback.
   *
   * @param {Node} el
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function removeWithCb(el, vm, cb) {
    remove(el);
    if (cb) cb();
  }
}

function eventsAPI (Vue) {
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$on = function (event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
    modifyListenerCount(this, event, 1);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$once = function (event, fn) {
    var self = this;
    function on() {
      self.$off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.$on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$off = function (event, fn) {
    var cbs;
    // all
    if (!arguments.length) {
      if (this.$parent) {
        for (event in this._events) {
          cbs = this._events[event];
          if (cbs) {
            modifyListenerCount(this, event, -cbs.length);
          }
        }
      }
      this._events = {};
      return this;
    }
    // specific event
    cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (arguments.length === 1) {
      modifyListenerCount(this, event, -cbs.length);
      this._events[event] = null;
      return this;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        modifyListenerCount(this, event, -1);
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Trigger an event on self.
   *
   * @param {String|Object} event
   * @return {Boolean} shouldPropagate
   */

  Vue.prototype.$emit = function (event) {
    var isSource = typeof event === 'string';
    event = isSource ? event : event.name;
    var cbs = this._events[event];
    var shouldPropagate = isSource || !cbs;
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      // this is a somewhat hacky solution to the question raised
      // in #2102: for an inline component listener like <comp @test="doThis">,
      // the propagation handling is somewhat broken. Therefore we
      // need to treat these inline callbacks differently.
      var hasParentCbs = isSource && cbs.some(function (cb) {
        return cb._fromParent;
      });
      if (hasParentCbs) {
        shouldPropagate = false;
      }
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        var cb = cbs[i];
        var res = cb.apply(this, args);
        if (res === true && (!hasParentCbs || cb._fromParent)) {
          shouldPropagate = true;
        }
      }
    }
    return shouldPropagate;
  };

  /**
   * Recursively broadcast an event to all children instances.
   *
   * @param {String|Object} event
   * @param {...*} additional arguments
   */

  Vue.prototype.$broadcast = function (event) {
    var isSource = typeof event === 'string';
    event = isSource ? event : event.name;
    // if no child has registered for this event,
    // then there's no need to broadcast.
    if (!this._eventsCount[event]) return;
    var children = this.$children;
    var args = toArray(arguments);
    if (isSource) {
      // use object event to indicate non-source emit
      // on children
      args[0] = { name: event, source: this };
    }
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var shouldPropagate = child.$emit.apply(child, args);
      if (shouldPropagate) {
        child.$broadcast.apply(child, args);
      }
    }
    return this;
  };

  /**
   * Recursively propagate an event up the parent chain.
   *
   * @param {String} event
   * @param {...*} additional arguments
   */

  Vue.prototype.$dispatch = function (event) {
    var shouldPropagate = this.$emit.apply(this, arguments);
    if (!shouldPropagate) return;
    var parent = this.$parent;
    var args = toArray(arguments);
    // use object event to indicate non-source emit
    // on parents
    args[0] = { name: event, source: this };
    while (parent) {
      shouldPropagate = parent.$emit.apply(parent, args);
      parent = shouldPropagate ? parent.$parent : null;
    }
    return this;
  };

  /**
   * Modify the listener counts on all parents.
   * This bookkeeping allows $broadcast to return early when
   * no child has listened to a certain event.
   *
   * @param {Vue} vm
   * @param {String} event
   * @param {Number} count
   */

  var hookRE = /^hook:/;
  function modifyListenerCount(vm, event, count) {
    var parent = vm.$parent;
    // hooks do not get broadcasted so no need
    // to do bookkeeping for them
    if (!parent || !count || hookRE.test(event)) return;
    while (parent) {
      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
      parent = parent.$parent;
    }
  }
}

function lifecycleAPI (Vue) {
  /**
   * Set instance target element and kick off the compilation
   * process. The passed in `el` can be a selector string, an
   * existing Element, or a DocumentFragment (for block
   * instances).
   *
   * @param {Element|DocumentFragment|string} el
   * @public
   */

  Vue.prototype.$mount = function (el) {
    if (this._isCompiled) {
      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
      return;
    }
    el = query(el);
    if (!el) {
      el = document.createElement('div');
    }
    this._compile(el);
    this._initDOMHooks();
    if (inDoc(this.$el)) {
      this._callHook('attached');
      ready.call(this);
    } else {
      this.$once('hook:attached', ready);
    }
    return this;
  };

  /**
   * Mark an instance as ready.
   */

  function ready() {
    this._isAttached = true;
    this._isReady = true;
    this._callHook('ready');
  }

  /**
   * Teardown the instance, simply delegate to the internal
   * _destroy.
   *
   * @param {Boolean} remove
   * @param {Boolean} deferCleanup
   */

  Vue.prototype.$destroy = function (remove, deferCleanup) {
    this._destroy(remove, deferCleanup);
  };

  /**
   * Partially compile a piece of DOM and return a
   * decompile function.
   *
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host]
   * @param {Object} [scope]
   * @param {Fragment} [frag]
   * @return {Function}
   */

  Vue.prototype.$compile = function (el, host, scope, frag) {
    return compile(el, this.$options, true)(this, el, host, scope, frag);
  };
}

/**
 * The exposed Vue constructor.
 *
 * API conventions:
 * - public API methods/properties are prefixed with `$`
 * - internal methods/properties are prefixed with `_`
 * - non-prefixed properties are assumed to be proxied user
 *   data.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 */

function Vue(options) {
  this._init(options);
}

// install internals
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
miscMixin(Vue);

// install instance APIs
dataAPI(Vue);
domAPI(Vue);
eventsAPI(Vue);
lifecycleAPI(Vue);

var slot = {

  priority: SLOT,
  params: ['name'],

  bind: function bind() {
    // this was resolved during component transclusion
    var name = this.params.name || 'default';
    var content = this.vm._slotContents && this.vm._slotContents[name];
    if (!content || !content.hasChildNodes()) {
      this.fallback();
    } else {
      this.compile(content.cloneNode(true), this.vm._context, this.vm);
    }
  },

  compile: function compile(content, context, host) {
    if (content && context) {
      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
        // if the inserted slot has v-if
        // inject fallback content as the v-else
        var elseBlock = document.createElement('template');
        elseBlock.setAttribute('v-else', '');
        elseBlock.innerHTML = this.el.innerHTML;
        // the else block should be compiled in child scope
        elseBlock._context = this.vm;
        content.appendChild(elseBlock);
      }
      var scope = host ? host._scope : this._scope;
      this.unlink = context.$compile(content, host, scope, this._frag);
    }
    if (content) {
      replace(this.el, content);
    } else {
      remove(this.el);
    }
  },

  fallback: function fallback() {
    this.compile(extractContent(this.el, true), this.vm);
  },

  unbind: function unbind() {
    if (this.unlink) {
      this.unlink();
    }
  }
};

var partial = {

  priority: PARTIAL,

  params: ['name'],

  // watch changes to name for dynamic partials
  paramWatchers: {
    name: function name(value) {
      vIf.remove.call(this);
      if (value) {
        this.insert(value);
      }
    }
  },

  bind: function bind() {
    this.anchor = createAnchor('v-partial');
    replace(this.el, this.anchor);
    this.insert(this.params.name);
  },

  insert: function insert(id) {
    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
    if (partial) {
      this.factory = new FragmentFactory(this.vm, partial);
      vIf.insert.call(this);
    }
  },

  unbind: function unbind() {
    if (this.frag) {
      this.frag.destroy();
    }
  }
};

var elementDirectives = {
  slot: slot,
  partial: partial
};

var convertArray = vFor._postProcess;

/**
 * Limit filter for arrays
 *
 * @param {Number} n
 * @param {Number} offset (Decimal expected)
 */

function limitBy(arr, n, offset) {
  offset = offset ? parseInt(offset, 10) : 0;
  n = toNumber(n);
  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
}

/**
 * Filter filter for arrays
 *
 * @param {String} search
 * @param {String} [delimiter]
 * @param {String} ...dataKeys
 */

function filterBy(arr, search, delimiter) {
  arr = convertArray(arr);
  if (search == null) {
    return arr;
  }
  if (typeof search === 'function') {
    return arr.filter(search);
  }
  // cast to lowercase string
  search = ('' + search).toLowerCase();
  // allow optional `in` delimiter
  // because why not
  var n = delimiter === 'in' ? 3 : 2;
  // extract and flatten keys
  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
  var res = [];
  var item, key, val, j;
  for (var i = 0, l = arr.length; i < l; i++) {
    item = arr[i];
    val = item && item.$value || item;
    j = keys.length;
    if (j) {
      while (j--) {
        key = keys[j];
        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
          res.push(item);
          break;
        }
      }
    } else if (contains(item, search)) {
      res.push(item);
    }
  }
  return res;
}

/**
 * Order filter for arrays
 *
 * @param {String|Array<String>|Function} ...sortKeys
 * @param {Number} [order]
 */

function orderBy(arr) {
  var comparator = null;
  var sortKeys = undefined;
  arr = convertArray(arr);

  // determine order (last argument)
  var args = toArray(arguments, 1);
  var order = args[args.length - 1];
  if (typeof order === 'number') {
    order = order < 0 ? -1 : 1;
    args = args.length > 1 ? args.slice(0, -1) : args;
  } else {
    order = 1;
  }

  // determine sortKeys & comparator
  var firstArg = args[0];
  if (!firstArg) {
    return arr;
  } else if (typeof firstArg === 'function') {
    // custom comparator
    comparator = function (a, b) {
      return firstArg(a, b) * order;
    };
  } else {
    // string keys. flatten first
    sortKeys = Array.prototype.concat.apply([], args);
    comparator = function (a, b, i) {
      i = i || 0;
      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
    };
  }

  function baseCompare(a, b, sortKeyIndex) {
    var sortKey = sortKeys[sortKeyIndex];
    if (sortKey) {
      if (sortKey !== '$key') {
        if (isObject(a) && '$value' in a) a = a.$value;
        if (isObject(b) && '$value' in b) b = b.$value;
      }
      a = isObject(a) ? getPath(a, sortKey) : a;
      b = isObject(b) ? getPath(b, sortKey) : b;
    }
    return a === b ? 0 : a > b ? order : -order;
  }

  // sort on a copy to avoid mutating original array
  return arr.slice().sort(comparator);
}

/**
 * String contain helper
 *
 * @param {*} val
 * @param {String} search
 */

function contains(val, search) {
  var i;
  if (isPlainObject(val)) {
    var keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      if (contains(val[keys[i]], search)) {
        return true;
      }
    }
  } else if (isArray(val)) {
    i = val.length;
    while (i--) {
      if (contains(val[i], search)) {
        return true;
      }
    }
  } else if (val != null) {
    return val.toString().toLowerCase().indexOf(search) > -1;
  }
}

var digitsRE = /(\d{3})(?=\d)/g;

// asset collections must be a plain object.
var filters = {

  orderBy: orderBy,
  filterBy: filterBy,
  limitBy: limitBy,

  /**
   * Stringify value.
   *
   * @param {Number} indent
   */

  json: {
    read: function read(value, indent) {
      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
    },
    write: function write(value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  },

  /**
   * 'abc' => 'Abc'
   */

  capitalize: function capitalize(value) {
    if (!value && value !== 0) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  /**
   * 'abc' => 'ABC'
   */

  uppercase: function uppercase(value) {
    return value || value === 0 ? value.toString().toUpperCase() : '';
  },

  /**
   * 'AbC' => 'abc'
   */

  lowercase: function lowercase(value) {
    return value || value === 0 ? value.toString().toLowerCase() : '';
  },

  /**
   * 12345 => $12,345.00
   *
   * @param {String} sign
   * @param {Number} decimals Decimal places
   */

  currency: function currency(value, _currency, decimals) {
    value = parseFloat(value);
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '$';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
  },

  /**
   * 'item' => 'items'
   *
   * @params
   *  an array of strings corresponding to
   *  the single, double, triple ... forms of the word to
   *  be pluralized. When the number to be pluralized
   *  exceeds the length of the args, it will use the last
   *  entry in the array.
   *
   *  e.g. ['single', 'double', 'triple', 'multiple']
   */

  pluralize: function pluralize(value) {
    var args = toArray(arguments, 1);
    var length = args.length;
    if (length > 1) {
      var index = value % 10 - 1;
      return index in args ? args[index] : args[length - 1];
    } else {
      return args[0] + (value === 1 ? '' : 's');
    }
  },

  /**
   * Debounce a handler function.
   *
   * @param {Function} handler
   * @param {Number} delay = 300
   * @return {Function}
   */

  debounce: function debounce(handler, delay) {
    if (!handler) return;
    if (!delay) {
      delay = 300;
    }
    return _debounce(handler, delay);
  }
};

function installGlobalAPI (Vue) {
  /**
   * Vue and every constructor that extends Vue has an
   * associated options object, which can be accessed during
   * compilation steps as `this.constructor.options`.
   *
   * These can be seen as the default options of every
   * Vue instance.
   */

  Vue.options = {
    directives: directives,
    elementDirectives: elementDirectives,
    filters: filters,
    transitions: {},
    components: {},
    partials: {},
    replace: true
  };

  /**
   * Expose useful internals
   */

  Vue.util = util;
  Vue.config = config;
  Vue.set = set;
  Vue['delete'] = del;
  Vue.nextTick = nextTick;

  /**
   * The following are exposed for advanced usage / plugins
   */

  Vue.compiler = compiler;
  Vue.FragmentFactory = FragmentFactory;
  Vue.internalDirectives = internalDirectives;
  Vue.parsers = {
    path: path,
    text: text,
    template: template,
    directive: directive,
    expression: expression
  };

  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */

  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   *
   * @param {Object} extendOptions
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var isFirstExtend = Super.cid === 0;
    if (isFirstExtend && extendOptions._Ctor) {
      return extendOptions._Ctor;
    }
    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
        name = null;
      }
    }
    var Sub = createClass(name || 'VueComponent');
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;
    // allow further extension
    Sub.extend = Super.extend;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // cache constructor
    if (isFirstExtend) {
      extendOptions._Ctor = Sub;
    }
    return Sub;
  };

  /**
   * A function that returns a sub-class constructor with the
   * given name. This gives us much nicer output when
   * logging instances in the console.
   *
   * @param {String} name
   * @return {Function}
   */

  function createClass(name) {
    /* eslint-disable no-new-func */
    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
    /* eslint-enable no-new-func */
  }

  /**
   * Plugin system
   *
   * @param {Object} plugin
   */

  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return;
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this;
  };

  /**
   * Apply a global mixin by merging it into the default
   * options.
   */

  Vue.mixin = function (mixin) {
    Vue.options = mergeOptions(Vue.options, mixin);
  };

  /**
   * Create asset registration methods with the following
   * signature:
   *
   * @param {String} id
   * @param {*} definition
   */

  config._assetTypes.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          if (!definition.name) {
            definition.name = id;
          }
          definition = Vue.extend(definition);
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });

  // expose internal transition API
  extend(Vue.transition, transition);
}

installGlobalAPI(Vue);

Vue.version = '1.0.28';

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue);
    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
}, 0);

module.exports = Vue;
}).call(this,require('_process'))
},{"_process":2}],10:[function(require,module,exports){
var inserted = exports.cache = {}

exports.insert = function (css) {
  if (inserted[css]) return
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return elem
}

},{}],11:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.vuetable th.sortable:hover {\n  color: #2185d0;\n  cursor: pointer;\n}\n.vuetable-actions {\n  width: 15%;\n  padding: 12px 0px;\n  text-align: center;\n}\n.vuetable-pagination {\n  background: #f9fafb !important;\n}\n.vuetable-pagination-info {\n  margin-top: auto;\n  margin-bottom: auto;\n}\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        wrapperClass: {
            type: String,
            default: function _default() {
                return null;
            }
        },
        tableWrapper: {
            type: String,
            default: function _default() {
                return null;
            }
        },
        tableClass: {
            type: String,
            default: function _default() {
                return 'ui blue striped selectable celled stackable attached table';
            }
        },
        loadingClass: {
            type: String,
            default: function _default() {
                return 'loading';
            }
        },
        dataPath: {
            type: String,
            default: function _default() {
                return 'data';
            }
        },
        paginationPath: {
            type: String,
            default: function _default() {
                return 'links.pagination';
            }
        },
        fields: {
            type: Array,
            required: true
        },
        apiUrl: {
            type: String,
            required: true
        },
        sortOrder: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        multiSort: {
            type: Boolean,
            default: function _default() {
                return false;
            }
        },
        /*
         * physical key that will trigger multi-sort option
         * possible values: 'alt', 'ctrl', 'meta', 'shift'
         * 'ctrl' might not work as expected on Mac
         */
        multiSortKey: {
            type: String,
            default: 'alt'
        },
        perPage: {
            type: Number,
            coerce: function coerce(val) {
                return parseInt(val);
            },
            default: function _default() {
                return 10;
            }
        },
        ascendingIcon: {
            type: String,
            default: function _default() {
                return 'blue chevron up icon';
            }
        },
        descendingIcon: {
            type: String,
            default: function _default() {
                return 'blue chevron down icon';
            }
        },
        appendParams: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        showPagination: {
            type: Boolean,
            default: function _default() {
                return true;
            }
        },
        paginationComponent: {
            type: String,
            default: function _default() {
                return 'vuetable-pagination';
            }
        },
        paginationInfoTemplate: {
            type: String,
            default: function _default() {
                return "Displaying {from} to {to} of {total} items";
            }
        },
        paginationInfoNoDataTemplate: {
            type: String,
            default: function _default() {
                return 'No relevant data';
            }
        },
        paginationClass: {
            type: String,
            default: function _default() {
                return 'ui bottom attached segment grid';
            }
        },
        paginationInfoClass: {
            type: String,
            default: function _default() {
                return 'left floated left aligned six wide column';
            }
        },
        paginationComponentClass: {
            type: String,
            default: function _default() {
                return 'right floated right aligned six wide column';
            }
        },
        paginationConfig: {
            type: String,
            default: function _default() {
                return 'paginationConfig';
            }
        },
        paginationConfigCallback: {
            type: String,
            default: function _default() {
                return 'paginationConfig';
            }
        },
        itemActions: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        queryParams: {
            type: Object,
            default: function _default() {
                return {
                    sort: 'sort',
                    page: 'page',
                    perPage: 'per_page'
                };
            }
        },
        loadOnStart: {
            type: Boolean,
            default: function _default() {
                return true;
            }
        },
        selectedTo: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        httpOptions: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        detailRow: {
            type: String,
            default: ''
        },
        detailRowCallback: {
            type: String,
            default: ''
        },
        detailRowId: {
            type: String,
            default: 'id'
        },
        detailRowTransition: {
            type: String,
            default: ''
        },
        detailRowClass: {
            type: String,
            default: 'vuetable-detail-row'
        },
        detailRowComponent: {
            type: String,
            default: ''
        },
        rowClassCallback: {
            type: String,
            default: ''
        }
    },
    data: function data() {
        return {
            eventPrefix: 'vuetable:',
            tableData: null,
            tablePagination: null,
            currentPage: 1,
            visibleDetailRows: []
        };
    },
    directives: {
        'attr': {
            update: function update(value) {
                for (var i in value) {
                    this.el.setAttribute(i, value[i]);
                }
            }
        }
    },
    computed: {
        paginationInfo: function paginationInfo() {
            if (this.tablePagination == null || this.tablePagination.total == 0) {
                return this.paginationInfoNoDataTemplate;
            }

            return this.paginationInfoTemplate.replace('{from}', this.tablePagination.from || 0).replace('{to}', this.tablePagination.to || 0).replace('{total}', this.tablePagination.total || 0);
        },
        useDetailRow: function useDetailRow() {
            if (this.tableData && typeof this.tableData[0][this.detailRowId] === 'undefined') {
                console.warn('You need to define "detail-row-id" in order for detail-row feature to work!');
                return false;
            }

            return this.detailRowCallback.trim() !== '' || this.detailRowComponent !== '';
        },
        useDetailRowComponent: function useDetailRowComponent() {
            return this.detailRowComponent !== '';
        },
        countVisibleFields: function countVisibleFields() {
            return this.fields.filter(function (field) {
                return field.visible;
            }).length;
        }
    },
    methods: {
        normalizeFields: function normalizeFields() {
            var self = this;
            var obj;
            this.fields.forEach(function (field, i) {
                if (typeof field === 'string') {
                    obj = {
                        name: field,
                        title: self.setTitle(field),
                        titleClass: '',
                        dataClass: '',
                        callback: null,
                        visible: true
                    };
                } else {
                    obj = {
                        name: field.name,
                        title: field.title === undefined ? self.setTitle(field.name) : field.title,
                        sortField: field.sortField,
                        titleClass: field.titleClass === undefined ? '' : field.titleClass,
                        dataClass: field.dataClass === undefined ? '' : field.dataClass,
                        callback: field.callback === undefined ? '' : field.callback,
                        visible: field.visible === undefined ? true : field.visible
                    };
                }
                self.fields.$set(i, obj);
            });
        },
        setTitle: function setTitle(str) {
            if (this.isSpecialField(str)) {
                return '';
            }

            return this.titleCase(str);
        },
        titleCase: function titleCase(str) {
            return str.replace(/\w+/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },
        notIn: function notIn(str, arr) {
            return arr.indexOf(str) === -1;
        },
        loadData: function loadData() {
            var self = this;

            var wrapper = document.querySelector(this.tableWrapper);
            this.showLoadingAnimation(wrapper);

            var url = this.apiUrl + '?' + this.getAllQueryParams();
            this.$http.get(url, this.httpOptions).then(function (response) {
                var body = this.transform(response.body);
                self.tableData = self.getObjectValue(body, self.dataPath, null);
                self.tablePagination = self.getObjectValue(body, self.paginationPath, null);
                if (self.tablePagination === null) {
                    console.warn('vuetable: pagination-path "' + self.paginationPath + '" not found. ' + 'It looks like the data returned from the sever does not have pagination information ' + 'or you may have set it incorrectly.');
                }

                self.$nextTick(function () {
                    self.dispatchEvent('load-success', response);
                    self.broadcastEvent('load-success', self.tablePagination);

                    self.hideLoadingAnimation(wrapper);
                });
            }, function (response) {
                self.dispatchEvent('load-error', response);
                self.broadcastEvent('load-error', response);

                self.hideLoadingAnimation(wrapper);
            });
        },
        getAllQueryParams: function getAllQueryParams() {
            var params = [this.queryParams.sort + '=' + this.getSortParam(), this.queryParams.page + '=' + this.currentPage, this.queryParams.perPage + '=' + this.perPage].join('&');

            if (this.appendParams.length > 0) {
                params += '&' + this.appendParams.join('&');
            }

            return params;
        },
        showLoadingAnimation: function showLoadingAnimation(wrapper) {
            if (wrapper !== null) {
                this.addClass(wrapper, this.loadingClass);
            }
            this.dispatchEvent('loading');
        },
        hideLoadingAnimation: function hideLoadingAnimation(wrapper) {
            if (wrapper !== null) {
                this.removeClass(wrapper, this.loadingClass);
            }
            this.dispatchEvent('loaded');
        },
        transform: function transform(data) {
            var func = 'transform';

            if (this.parentFunctionExists(func)) {
                return this.$parent[func].call(this.$parent, data);
            }

            return data;
        },
        parentFunctionExists: function parentFunctionExists(func) {
            return func !== '' && typeof this.$parent[func] === 'function';
        },
        getTitle: function getTitle(field) {
            if (typeof field.title === 'undefined') {
                return field.name.replace('.', ' ');
            }
            return field.title;
        },
        getSortParam: function getSortParam() {
            if (!this.sortOrder || this.sortOrder.field == '') {
                return '';
            }

            if (typeof this.$parent['getSortParam'] == 'function') {
                return this.$parent['getSortParam'].call(this.$parent, this.sortOrder);
            }

            return this.getDefaultSortParam();
        },
        getDefaultSortParam: function getDefaultSortParam() {
            var result = '';

            for (var i = 0; i < this.sortOrder.length; i++) {
                var fieldName = typeof this.sortOrder[i].sortField === 'undefined' ? this.sortOrder[i].field : this.sortOrder[i].sortField;

                result += fieldName + '|' + this.sortOrder[i].direction + (i + 1 < this.sortOrder.length ? ',' : '');
            }

            return result;
        },
        addClass: function addClass(el, className) {
            if (el.classList) el.classList.add(className);else el.className += ' ' + className;
        },
        removeClass: function removeClass(el, className) {
            if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        dispatchEvent: function dispatchEvent(eventName, args) {
            this.$dispatch(this.eventPrefix + eventName, args);
        },
        broadcastEvent: function broadcastEvent(eventName, args) {
            this.$broadcast(this.eventPrefix + eventName, args);
        },
        orderBy: function orderBy(field, event) {
            if (!this.isSortable(field)) {
                return;
            }

            var key = this.multiSortKey.toLowerCase() + 'Key';

            if (this.multiSort && event[key]) {
                //adding column to multisort
                var i = this.currentSortOrder(field);

                if (i === false) {
                    //this field is not in the sort array yet
                    this.sortOrder.push({
                        field: field.sortField,
                        direction: 'asc'
                    });
                } else {
                    //this field is in the sort array, now we change its state
                    if (this.sortOrder[i].direction == 'asc') {
                        // switch direction
                        this.sortOrder[i].direction = 'desc';
                    } else {
                        //remove sort condition
                        this.sortOrder.splice(i, 1);
                    }
                }
            } else {
                //no multisort, or resetting sort
                if (this.sortOrder.length == 0) {
                    this.sortOrder.push({
                        field: '',
                        direction: 'asc'
                    });
                }

                this.sortOrder.splice(1); //removes additional columns

                if (this.sortOrder[0].field == field.sortField) {
                    // change sort direction
                    this.sortOrder[0].direction = this.sortOrder[0].direction == 'asc' ? 'desc' : 'asc';
                } else {
                    // reset sort direction
                    this.sortOrder[0].direction = 'asc';
                }
                this.sortOrder[0].field = field.sortField;
            }

            this.currentPage = 1; // reset page index
            this.loadData();
        },
        isSortable: function isSortable(field) {
            return !(typeof field.sortField == 'undefined');
        },
        isCurrentSortField: function isCurrentSortField(field) {
            return this.currentSortOrder(field) !== false;
        },
        currentSortOrder: function currentSortOrder(field) {
            if (!this.isSortable(field)) {
                return false;
            }

            for (var i = 0; i < this.sortOrder.length; i++) {
                if (this.sortOrder[i].field == field.sortField) {
                    return i;
                }
            }

            return false;
        },
        sortIcon: function sortIcon(field) {
            var i = this.currentSortOrder(field);
            if (i !== false) {
                return this.sortOrder[i].direction == 'asc' ? this.ascendingIcon : this.descendingIcon;
            } else {
                return '';
            }
        },
        sortIconOpacity: function sortIconOpacity(field) {
            //fields with stronger precedence have darker color

            //if there are few fields, we go down by 0.3
            //ex. 2 fields are selected: 1.0, 0.7

            //if there are more we go down evenly on the given spectrum
            //ex. 6 fields are selected: 1.0, 0.86, 0.72, 0.58, 0.44, 0.3

            var max = 1.0;
            var min = 0.3;
            var step = 0.3;

            var count = this.sortOrder.length;
            var current = this.currentSortOrder(field);

            if (max - count * step < min) {
                step = (max - min) / (count - 1);
            }

            var opacity = max - current * step;

            return opacity;
        },
        gotoPreviousPage: function gotoPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadData();
            }
        },
        gotoNextPage: function gotoNextPage() {
            if (this.currentPage < this.tablePagination.last_page) {
                this.currentPage++;
                this.loadData();
            }
        },
        gotoPage: function gotoPage(page) {
            if (page != this.currentPage && page > 0 && page <= this.tablePagination.last_page) {
                this.currentPage = page;
                this.loadData();
            }
        },
        isSpecialField: function isSpecialField(fieldName) {
            // return fieldName.startsWith('__')
            return fieldName.slice(0, 2) === '__';
        },
        hasCallback: function hasCallback(item) {
            return item.callback ? true : false;
        },
        callCallback: function callCallback(field, item) {
            if (!this.hasCallback(field)) return;

            var args = field.callback.split('|');
            var func = args.shift();

            if (typeof this.$parent[func] == 'function') {
                return args.length > 0 ? this.$parent[func].apply(this.$parent, [this.getObjectValue(item, field.name)].concat(args)) : this.$parent[func].call(this.$parent, this.getObjectValue(item, field.name));
            }

            return null;
        },
        getObjectValue: function getObjectValue(object, path, defaultValue) {
            defaultValue = typeof defaultValue == 'undefined' ? null : defaultValue;

            var obj = object;
            if (path.trim() != '') {
                var keys = path.split('.');
                keys.forEach(function (key) {
                    if (obj !== null && typeof obj[key] != 'undefined' && obj[key] !== null) {
                        obj = obj[key];
                    } else {
                        obj = defaultValue;
                        return;
                    }
                });
            }
            return obj;
        },
        callAction: function callAction(action, data) {
            this.$dispatch(this.eventPrefix + 'action', action, data);
        },
        addParam: function addParam(param) {
            this.appendParams.push(param);
        },
        toggleCheckbox: function toggleCheckbox(isChecked, dataItem, fieldName) {
            var idColumn = this.extractArgs(fieldName);
            if (idColumn === undefined) {
                console.warn('You did not provide reference id column with "__checkbox:<column_name>" field!');
                return;
            }
            if (isChecked) {
                this.selectedTo.push(dataItem[idColumn]);
            } else {
                this.selectedTo.$remove(dataItem[idColumn]);
            }
        },
        toggleAllCheckboxes: function toggleAllCheckboxes(isChecked, fieldName) {
            var self = this;
            var idColumn = this.extractArgs(fieldName);

            if (isChecked) {
                this.tableData.forEach(function (dataItem) {
                    if (!self.isSelectedRow(dataItem, fieldName)) {
                        self.selectedTo.push(dataItem[idColumn]);
                    }
                });
            } else {
                this.tableData.forEach(function (dataItem) {
                    self.selectedTo.$remove(dataItem[idColumn]);
                });
            }
        },
        isSelectedRow: function isSelectedRow(dataItem, fieldName) {
            return this.selectedTo.indexOf(dataItem[this.extractArgs(fieldName)]) >= 0;
        },
        checkCheckboxesState: function checkCheckboxesState(fieldName) {
            if (this.selectedTo.length === 0) return false;

            var self = this;
            var selector = 'th.checkbox_' + this.extractArgs(fieldName) + ' input[type=checkbox]';
            var els = document.querySelectorAll(selector);
            var idColumn = this.extractArgs(fieldName);

            // count how many checkbox row in the current page has been checked
            var selected = this.tableData.filter(function (item) {
                return self.selectedTo.indexOf(item[idColumn]) >= 0;
            });

            // count == 0, clear the checkbox
            if (selected.length <= 0) {
                els.forEach(function (el) {
                    el.indeterminate = false;
                });
                return false;
            }
            // count > 0 and count < perPage, set checkbox state to 'indeterminate'
            else if (selected.length < this.perPage) {
                    els.forEach(function (el) {
                        el.indeterminate = true;
                    });
                    return true;
                }
                // count == perPage, set checkbox state to 'checked'
                else {
                        els.forEach(function (el) {
                            el.indeterminate = false;
                        });
                        return true;
                    }
        },
        extractName: function extractName(string) {
            return string.split(':')[0].trim();
        },
        extractArgs: function extractArgs(string) {
            return string.split(':')[1];
        },
        callDetailRowCallback: function callDetailRowCallback(item) {
            var func = this.detailRowCallback.trim();
            if (func === '') {
                return '';
            }

            if (typeof this.$parent[func] == 'function') {
                return this.$parent[func].call(this.$parent, item);
            } else {
                console.error('Function "' + func + '()" does not exist!');
            }
        },
        isVisibleDetailRow: function isVisibleDetailRow(rowId) {
            return this.visibleDetailRows.indexOf(rowId) >= 0;
        },
        showDetailRow: function showDetailRow(rowId) {
            if (!this.isVisibleDetailRow(rowId)) {
                this.visibleDetailRows.push(rowId);
            }
        },
        hideDetailRow: function hideDetailRow(rowId) {
            if (this.isVisibleDetailRow(rowId)) {
                this.visibleDetailRows.$remove(rowId);
            }
        },
        toggleDetailRow: function toggleDetailRow(rowId) {
            if (this.isVisibleDetailRow(rowId)) {
                this.hideDetailRow(rowId);
            } else {
                this.showDetailRow(rowId);
            }
        },
        onRowClass: function onRowClass(dataItem, index) {
            var func = this.rowClassCallback.trim();

            if (func !== '' && typeof this.$parent[func] === 'function') {
                return this.$parent[func].call(this.$parent, dataItem, index);
            }
            return '';
        },
        onRowChanged: function onRowChanged(dataItem) {
            this.dispatchEvent('row-changed', dataItem);
            return true;
        },
        onRowClicked: function onRowClicked(dataItem, event) {
            this.$dispatch(this.eventPrefix + 'row-clicked', dataItem, event);
            return true;
        },
        onRowDoubleClicked: function onRowDoubleClicked(dataItem, event) {
            this.$dispatch(this.eventPrefix + 'row-dblclicked', dataItem, event);
        },
        onCellClicked: function onCellClicked(dataItem, field, event) {
            this.$dispatch(this.eventPrefix + 'cell-clicked', dataItem, field, event);
        },
        onCellDoubleClicked: function onCellDoubleClicked(dataItem, field, event) {
            this.$dispatch(this.eventPrefix + 'cell-dblclicked', dataItem, field, event);
        },
        onDetailRowClick: function onDetailRowClick(dataItem, event) {
            this.$dispatch(this.eventPrefix + 'detail-row-clicked', dataItem, event);
        },
        callPaginationConfig: function callPaginationConfig() {
            if (typeof this.$parent[this.paginationConfigCallback] === 'function') {
                this.$parent[this.paginationConfigCallback].call(this.$parent, this.$refs.pagination.$options.name);
            }
        },
        logDeprecatedMessage: function logDeprecatedMessage(name, replacer) {
            var msg = '"{name}" prop is being deprecated and will be removed in the future. Please use "{replacer}" instead.';
            console.warn(msg.replace('{name}', name).replace('{replacer}', replacer));
        },
        checkForDeprecatedProps: function checkForDeprecatedProps() {
            if (this.paginationConfig !== 'paginationConfig') {
                this.logDeprecatedMessage('paginationConfig', 'paginationConfigCallback');
            }
            if (this.detailRow !== '') {
                this.logDeprecatedMessage('detail-row', 'detail-row-callback');
            }
            if (this.detailRowCallback !== '') {
                this.logDeprecatedMessage('detail-row-callback', 'detail-row-component');
            }
        }
    },
    watch: {
        'multiSort': function multiSort(newVal, oldVal) {
            if (newVal === false && this.sortOrder.length > 1) {
                this.sortOrder.splice(1);
                this.loadData();
            }
        }
    },
    events: {
        'vuetable-pagination:change-page': function vuetablePaginationChangePage(page) {
            if (page == 'prev') {
                this.gotoPreviousPage();
            } else if (page == 'next') {
                this.gotoNextPage();
            } else {
                this.gotoPage(page);
            }
        },
        'vuetable:reload': function vuetableReload() {
            this.loadData();
        },
        'vuetable:refresh': function vuetableRefresh() {
            this.currentPage = 1;
            this.loadData();
        },
        'vuetable:goto-page': function vuetableGotoPage(page) {
            this.$emit('vuetable-pagination:change-page', page);
        },
        'vuetable:set-options': function vuetableSetOptions(options) {
            for (var n in options) {
                this.$set(n, options[n]);
            }
        },
        'vuetable:toggle-detail': function vuetableToggleDetail(dataItem) {
            this.toggleDetailRow(dataItem);
        },
        'vuetable:show-detail': function vuetableShowDetail(dataItem) {
            this.showDetailRow(dataItem);
        },
        'vuetable:hide-detail': function vuetableHideDetail(dataItem) {
            this.hideDetailRow(dataItem);
        }
    },
    created: function created() {
        this.checkForDeprecatedProps();
        this.normalizeFields();
        if (this.loadOnStart) {
            this.loadData();
        }
        this.$nextTick(function () {
            this.callPaginationConfig();
        });
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"{{wrapperClass}}\">\n    <table class=\"vuetable {{tableClass}}\">\n        <thead>\n            <tr>\n                <template v-for=\"field in fields\">\n                    <template v-if=\"field.visible\">\n                        <template v-if=\"isSpecialField(field.name)\">\n                            <th v-if=\"extractName(field.name) == '__checkbox'\" :class=\"[field.titleClass, 'checkbox_'+extractArgs(field.name)]\">\n                                <input type=\"checkbox\" @change=\"toggleAllCheckboxes($event.target.checked, field.name)\" :checked=\"checkCheckboxesState(field.name)\">\n                            </th>\n                            <th v-if=\"extractName(field.name) == '__component'\" @click=\"orderBy(field, $event)\" class=\"{{field.titleClass || ''}} {{isSortable(field) ? 'sortable' : ''}}\">\n                                {{field.title || ''}}\n                                <i v-if=\"isCurrentSortField(field) &amp;&amp; field.title\" class=\"{{ sortIcon(field) }}\" v-bind:style=\"{opacity: sortIconOpacity(field)}\"></i>\n                            </th>\n                            <th v-if=\"notIn(extractName(field.name), ['__checkbox', '__component'])\" id=\"{{field.name}}\" class=\"{{field.titleClass || ''}}\">\n                                {{field.title || ''}}\n                            </th>\n                        </template>\n                        <template v-else=\"\">\n                            <th @click=\"orderBy(field, $event)\" id=\"_{{field.name}}\" class=\"{{field.titleClass || ''}} {{isSortable(field) ? 'sortable' : ''}}\">\n                                {{getTitle(field) | capitalize}}&nbsp;\n                                <i v-if=\"isCurrentSortField(field)\" class=\"{{ sortIcon(field) }}\" v-bind:style=\"{opacity: sortIconOpacity(field)}\"></i>\n                            </th>\n                        </template>\n                    </template>\n                </template>\n            </tr>\n        </thead>\n        <tbody v-cloak=\"\">\n            <template v-for=\"(itemNumber, item) in tableData\">\n                <tr @dblclick=\"onRowDoubleClicked(item, $event)\" @click=\"onRowClicked(item, $event)\" :render=\"onRowChanged(item)\" :class=\"onRowClass(item, itemNumber)\">\n                    <template v-for=\"field in fields\">\n                        <template v-if=\"field.visible\">\n                            <template v-if=\"isSpecialField(field.name)\">\n                                <td v-if=\"extractName(field.name) == '__sequence'\" class=\"vuetable-sequence {{field.dataClass}}\" v-html=\"tablePagination.from + itemNumber\">\n                                </td>\n                                <td v-if=\"extractName(field.name) == '__checkbox'\" class=\"vuetable-checkboxes {{field.dataClass}}\">\n                                    <input type=\"checkbox\" @change=\"toggleCheckbox($event.target.checked, item, field.name)\" :checked=\"isSelectedRow(item, field.name)\">\n                                </td>\n                                <td v-if=\"field.name == '__actions'\" class=\"vuetable-actions {{field.dataClass}}\">\n                                    <template v-for=\"action in itemActions\">\n                                        <button class=\"{{ action.class }}\" @click=\"callAction(action.name, item)\" v-attr=\"action.extra\">\n                                            <i class=\"{{ action.icon }}\"></i> {{ action.label }}\n                                        </button>\n                                    </template>\n                                </td>\n                                <td v-if=\"extractName(field.name) == '__component'\" class=\"{{field.dataClass}}\">\n                                    <component :is=\"extractArgs(field.name)\" :row-data=\"item\"></component>\n                                </td>\n                            </template>\n                            <template v-else=\"\">\n                                <td v-if=\"hasCallback(field)\" class=\"{{field.dataClass}}\" @click=\"onCellClicked(item, field, $event)\" @dblclick=\"onCellDoubleClicked(item, field, $event)\">\n                                    {{{ callCallback(field, item) }}}\n                                </td>\n                                <td v-else=\"\" class=\"{{field.dataClass}}\" @click=\"onCellClicked(item, field, $event)\" @dblclick=\"onCellDoubleClicked(item, field, $event)\">\n                                    {{{ getObjectValue(item, field.name, \"\") }}}\n                                </td>\n                            </template>\n                        </template>\n                    </template>\n                </tr>\n                <template v-if=\"useDetailRow\">\n                  <template v-if=\"useDetailRowComponent\">\n                    <tr v-if=\"isVisibleDetailRow(item[detailRowId])\" @click=\"onDetailRowClick(item, $event)\" :transition=\"detailRowTransition\" :class=\"[detailRowClass]\">\n                      <td :colspan=\"countVisibleFields\">\n                        <component :is=\"detailRowComponent\" :row-data=\"item\"></component>\n                      </td>\n                    </tr>\n                  </template>\n                  <template v-else=\"\">\n                    <tr v-if=\"isVisibleDetailRow(item[detailRowId])\" v-html=\"callDetailRowCallback(item)\" @click=\"onDetailRowClick(item, $event)\" :transition=\"detailRowTransition\" :class=\"[detailRowClass]\"></tr>\n                  </template>\n                </template>\n            </template>\n        </tbody>\n    </table>\n    <div v-if=\"showPagination\" class=\"vuetable-pagination {{paginationClass}}\">\n        <div class=\"vuetable-pagination-info {{paginationInfoClass}}\" v-html=\"paginationInfo\">\n        </div>\n        <div v-show=\"tablePagination &amp;&amp; tablePagination.last_page > 1\" class=\"vuetable-pagination-component {{paginationComponentClass}}\">\n            <component v-ref:pagination=\"\" :is=\"paginationComponent\"></component>\n        </div>\n    </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.vuetable th.sortable:hover {\n  color: #2185d0;\n  cursor: pointer;\n}\n.vuetable-actions {\n  width: 15%;\n  padding: 12px 0px;\n  text-align: center;\n}\n.vuetable-pagination {\n  background: #f9fafb !important;\n}\n.vuetable-pagination-info {\n  margin-top: auto;\n  margin-bottom: auto;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-725f467e", module.exports)
  } else {
    hotAPI.update("_v-725f467e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":9,"vue-hot-reload-api":4,"vueify/lib/insert-css":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VuetablePaginationMixin = require('./VuetablePaginationMixin.vue');

var _VuetablePaginationMixin2 = _interopRequireDefault(_VuetablePaginationMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_VuetablePaginationMixin2.default]
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"{{wrapperClass}}\">\n    <a @click=\"loadPage(1)\" class=\"btn-nav {{linkClass}} {{isOnFirstPage ? disabledClass : ''}}\">\n            <i v-if=\"icons.first != ''\" class=\"{{icons.first}}\"></i>\n            <span v-else=\"\">«</span>\n    </a>\n    <a @click=\"loadPage('prev')\" class=\"btn-nav {{linkClass}} {{isOnFirstPage ? disabledClass : ''}}\">\n            <i v-if=\"icons.next != ''\" class=\"{{icons.prev}}\"></i>\n            <span v-else=\"\">&nbsp;‹</span>\n    </a>\n    <template v-if=\"notEnoughPages\">\n        <template v-for=\"n in totalPage\">\n            <a @click=\"loadPage(n+1)\" class=\"{{pageClass}} {{isCurrentPage(n+1) ? activeClass : ''}}\">\n                    {{ n+1 }}\n            </a>\n        </template>\n    </template>\n    <template v-else=\"\">\n       <template v-for=\"n in windowSize\">\n           <a @click=\"loadPage(windowStart+n)\" class=\"{{pageClass}} {{isCurrentPage(windowStart+n) ? activeClass : ''}}\">\n                {{ windowStart+n }}\n           </a>\n       </template>\n    </template>\n    <a @click=\"loadPage('next')\" class=\"btn-nav {{linkClass}} {{isOnLastPage ? disabledClass : ''}}\">\n        <i v-if=\"icons.next != ''\" class=\"{{icons.next}}\"></i>\n        <span v-else=\"\">›&nbsp;</span>\n    </a>\n    <a @click=\"loadPage(totalPage)\" class=\"btn-nav {{linkClass}} {{isOnLastPage ? disabledClass : ''}}\">\n        <i v-if=\"icons.last != ''\" class=\"{{icons.last}}\"></i>\n        <span v-else=\"\">»</span>\n    </a>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-1d22c5b8", module.exports)
  } else {
    hotAPI.update("_v-1d22c5b8", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./VuetablePaginationMixin.vue":15,"vue":9,"vue-hot-reload-api":4}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VuetablePaginationMixin = require('./VuetablePaginationMixin.vue');

var _VuetablePaginationMixin2 = _interopRequireDefault(_VuetablePaginationMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_VuetablePaginationMixin2.default],
    methods: {
        loadPage: function loadPage(page) {
            this.$dispatch('vuetable-pagination:change-page', page);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<nav>\n    <ul class=\"pagination\">\n        <li class=\"{{isOnFirstPage ? disabledClass : ''}}\">\n            <a @click=\"loadPage('prev')\"><i class=\"glyphicon glyphicon-chevron-left\"></i></a>\n        </li>\n        <template v-for=\"n in totalPage\">\n            <li class=\"{{isCurrentPage(n+1) ? ' active' : ''}}\">\n                <a @click=\"loadPage(n+1)\"> {{ n+1 }}</a>\n            </li>\n        </template>\n        <li class=\"{{isOnLastPage ? disabledClass : ''}}\">\n            <a @click=\"loadPage('next')\"><i class=\"glyphicon glyphicon-chevron-right\"></i></a>\n        </li>\n    </ul>\n</nav>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-6f4b8a74", module.exports)
  } else {
    hotAPI.update("_v-6f4b8a74", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./VuetablePaginationMixin.vue":15,"vue":9,"vue-hot-reload-api":4}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VuetablePaginationMixin = require('./VuetablePaginationMixin.vue');

var _VuetablePaginationMixin2 = _interopRequireDefault(_VuetablePaginationMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_VuetablePaginationMixin2.default],
    props: {
        'dropdownClass': {
            type: String,
            default: function _default() {
                return 'ui search dropdown';
            }
        },
        'pageText': {
            type: String,
            default: function _default() {
                return 'Page';
            }
        }
    },
    methods: {
        loadPage: function loadPage(page) {
            // update dropdown value
            if (page == 'prev' && !this.isOnFirstPage) {
                this.setDropdownToPage(this.tablePagination.current_page - 1);
            } else if (page == 'next' && !this.isOnLastPage) {
                this.setDropdownToPage(this.tablePagination.current_page + 1);
            }

            this.$dispatch('vuetable-pagination:change-page', page);
        },
        setDropdownToPage: function setDropdownToPage(page) {
            this.$nextTick(function () {
                document.getElementById('vuetable-pagination-dropdown').value = page;
            });
        },
        selectPage: function selectPage(event) {
            this.$dispatch('vuetable-pagination:change-page', event.target.selectedIndex + 1);
        }
    },
    events: {
        'vuetable:load-success': function vuetableLoadSuccess(tablePagination) {
            this.tablePagination = tablePagination;
            this.setDropdownToPage(tablePagination.current_page);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"{{wrapperClass}}\">\n    <a @click=\"loadPage('prev')\" class=\"{{linkClass}} {{isOnFirstPage ? disabledClass : ''}}\">\n        <i :class=\"icons.prev\"></i>\n    </a>\n    <select id=\"vuetable-pagination-dropdown\" class=\"{{dropdownClass}}\" @change=\"selectPage($event)\">\n        <template v-for=\"n in totalPage\">\n            <option class=\"{{pageClass}}\" value=\"{{n+1}}\">\n                {{pageText}} {{n+1}}\n            </option>\n        </template>\n    </select>\n    <a @click=\"loadPage('next')\" class=\"{{linkClass}} {{isOnLastPage ? disabledClass : ''}}\">\n        <i :class=\"icons.next\"></i>\n    </a>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-65a5cd69", module.exports)
  } else {
    hotAPI.update("_v-65a5cd69", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./VuetablePaginationMixin.vue":15,"vue":9,"vue-hot-reload-api":4}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        'wrapperClass': {
            type: String,
            default: function _default() {
                return 'ui right floated pagination menu';
            }
        },
        'activeClass': {
            type: String,
            default: function _default() {
                return 'active large';
            }
        },
        'disabledClass': {
            type: String,
            default: function _default() {
                return 'disabled';
            }
        },
        'pageClass': {
            type: String,
            default: function _default() {
                return 'item';
            }
        },
        'linkClass': {
            type: String,
            default: function _default() {
                return 'icon item';
            }
        },
        'icons': {
            type: Object,
            default: function _default() {
                return {
                    first: 'angle double left icon',
                    prev: 'left chevron icon',
                    next: 'right chevron icon',
                    last: 'angle double right icon'
                };
            }
        },
        'onEachSide': {
            type: Number,
            coerce: function coerce(value) {
                return parseInt(value);
            },
            default: function _default() {
                return 2;
            }
        }
    },
    data: function data() {
        return {
            tablePagination: null
        };
    },
    computed: {
        totalPage: function totalPage() {
            return this.tablePagination == null ? 0 : this.tablePagination.last_page;
        },
        isOnFirstPage: function isOnFirstPage() {
            return this.tablePagination == null ? false : this.tablePagination.current_page == 1;
        },
        isOnLastPage: function isOnLastPage() {
            return this.tablePagination == null ? false : this.tablePagination.current_page == this.tablePagination.last_page;
        },
        notEnoughPages: function notEnoughPages() {
            return this.totalPage < this.onEachSide * 2 + 4;
        },
        windowSize: function windowSize() {
            return this.onEachSide * 2 + 1;
        },
        windowStart: function windowStart() {
            if (!this.tablePagination || this.tablePagination.current_page <= this.onEachSide) {
                return 1;
            } else if (this.tablePagination.current_page >= this.totalPage - this.onEachSide) {
                return this.totalPage - this.onEachSide * 2;
            }

            return this.tablePagination.current_page - this.onEachSide;
        }
    },
    methods: {
        loadPage: function loadPage(page) {
            this.$dispatch('vuetable-pagination:change-page', page);
        },
        isCurrentPage: function isCurrentPage(page) {
            return page == this.tablePagination.current_page;
        }
    },
    events: {
        'vuetable:load-success': function vuetableLoadSuccess(tablePagination) {
            this.tablePagination = tablePagination;
        },
        'vuetable-pagination:set-options': function vuetablePaginationSetOptions(options) {
            for (var n in options) {
                this.$set(n, options[n]);
            }
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-f35dd14e", module.exports)
  } else {
    hotAPI.update("_v-f35dd14e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":9,"vue-hot-reload-api":4}],16:[function(require,module,exports){
'use strict';

/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

var Vue = require('vue');
var VueResource = require('vue-resource');
var Vuetable = require('vuetable/src/components/Vuetable.vue');
var VuetablePagination = require('vuetable/src/components/VuetablePagination.vue');
var VuetablePaginationDropdown = require('vuetable/src/components/VuetablePaginationDropdown.vue');
var VuetablePaginationBootstrap = require('vuetable/src/components/VuetablePaginationBootstrap.vue');
//var VuetablePaginationSimple = require('../vendor/vue-table/components/VuetablePaginationSimple.vue')
//var VueEditable = require('../vendor/vue-editable/vue-editable.js')
var VueStrap = require('vue-strap/dist/vue-strap.min.js');
//var vSelect = require('vue-select')
//var CustomVueSelectTemplate = require('./vue-components/vue-select.vue')
var VueValidator = require('vue-validator/dist/vue-validator.min.js');

var VueFileUpload = require('vue-upload-component/dist/vue-upload-component.min.js');

var VueFullCalendar = require('vue-fullcalendar/dist/vue-fullcalendar.min.js');

var decamelize = require('decamelize');

Vue.use(VueResource);
/*Vue.use(VueEditable)*/
Vue.use(VueValidator);

//Vue.component('v-select', vSelect)
Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination);
Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown);
Vue.component('vuetable-pagination-bootstrap', VuetablePaginationBootstrap);
//Vue.component('vuetable-pagination-simple', VuetablePaginationSimple)
Vue.component('vuefileupload', VueFileUpload);
Vue.component('v-full-calendar', VueFullCalendar);

var E_SERVER_ERROR = 'Error communicating with the server';

Vue.config.debug = true;
Vue.config.devtools = true;

Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

/*Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});*/

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

//Vue.component('example', require('./components/Example.vue'));

/*Vue.component('custom-action', {
        template: [
            '<div>',
                '<button @click="itemAction(\'view-item\', rowData)"><i class="glyphicon glyphicon-zoom-in"></i></button>',
                '<button @click="itemAction(\'edit-item\', rowData)"><i class="glyphicon glyphicon-pencil"></i></button>',
                '<button @click="itemAction(\'delete-item\', rowData)"><i class="glyphicon glyphicon-remove"></i></button>',
            '</div>'
        ].join(''),
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        methods: {
            itemAction: function(action, data) {
                sweetAlert('custom-action: ' + action, data.name)
            },
            onClick: function(event) {
                console.log('custom-action: on-click', event.target)
            },
            onDoubleClick: function(event) {
                console.log('custom-action: on-dblclick', event.target)
            }
        }
    })
    Vue.component('my-detail-row', {
        template: [
            '<div class="detail-row ui form" @click="onClick($event)">',
                '<div class="inline field">',
                    '<label>Name: </label>',
                    '<span>{{rowData.name}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Email: </label>',
                    '<span>{{rowData.email}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Nickname: </label>',
                    '<span>{{rowData.nickname}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Birthdate: </label>',
                    '<span>{{rowData.birthdate}}</span>',
                '</div>',
                '<div class="inline field">',
                    '<label>Gender: </label>',
                    '<span>{{rowData.gender}}</span>',
                '</div>',
            '</div>',
        ].join(''),
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        methods: {
            onClick: function(event) {
                console.log('my-detail-row: on-click')
            }
        },
    })
    */
window.vm = new Vue({
    components: {
        modal: VueStrap.modal
    },
    el: '#app',
    //mixins: [mixin],
    data: {
        formModal: false,
        infoModal: false,
        showModal: false,
        deleteModal: false,
        lastOpenModal: [],
        localModals: typeof modals !== 'undefined' ? modals : {},
        flashMessage: null,
        defaultErrorMessage: 'Some errors in sended data, please check!.',
        flashTypeDanger: 'danger',
        errorMessages: '',
        flashType: null,
        url: apiUrl,
        row: objectRow,
        foreignData: new Array(),
        searchFor: '',
        columns: tableColumns,
        sortOrder: [{
            field: fieldInitOrder,
            direction: 'asc'
        }],
        multiSort: true,
        perPage: 10,
        paginationComponent: 'vuetable-pagination',
        paginationInfoTemplate: 'แสดง {from} ถึง {to} จากทั้งหมด {total} รายการ',
        itemActions: typeof actions !== 'undefined' ? actions : {},
        moreParams: [],

        /*Vue fullcalendar*/
        fcEvents: typeof demoEvents !== 'undefined' ? demoEvents : {},

        file: null

    },
    created: function created() {
        console.log('Ready');
    },
    watch: {
        'perPage': function perPage(val, oldVal) {
            this.$broadcast('vuetable:refresh');
        },
        'paginationComponent': function paginationComponent(val, oldVal) {
            this.$broadcast('vuetable:load-success', this.$refs.vuetable.tablePagination);
            this.paginationConfig(this.paginationComponent);
        }
    },
    methods: {
        /**
         * Callback functions
         */
        allCap: function allCap(value) {
            return value.toUpperCase();
        },
        gender: function gender(value) {
            return value == 'M' ? '<span class="label label-info"><i class="glyphicon glyphicon-star"></i> Male</span>' : '<span class="label label-success"><i class="glyphicon glyphicon-heart"></i> Female</span>';
        },
        formatDate: function formatDate(value, fmt) {
            if (value == null) return '';
            fmt = typeof fmt == 'undefined' ? 'D MMM YYYY' : fmt;
            return moment(value, 'YYYY-MM-DD').format(fmt);
        },
        showDetailRow: function showDetailRow(value) {
            var icon = this.$refs.vuetable.isVisibleDetailRow(value) ? 'glyphicon glyphicon-minus-sign' : 'glyphicon glyphicon-plus-sign';
            return ['<a class="show-detail-row">', '<i class="' + icon + '"></i>', '</a>'].join('');
        },

        /**
         * Other functions
         */
        setFilter: function setFilter() {
            this.moreParams = ['filter=' + this.searchFor];
            this.$nextTick(function () {
                this.$broadcast('vuetable:refresh');
            });
        },
        resetFilter: function resetFilter() {
            this.searchFor = '';
            this.setFilter();
        },
        preg_quote: function preg_quote(str) {
            // http://kevin.vanzonneveld.net
            // +   original by: booeyOH
            // +   improved by: Ates Goral (http://magnetiq.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: preg_quote("$40");
            // *     returns 1: '\$40'
            // *     example 2: preg_quote("*RRRING* Hello?");
            // *     returns 2: '\*RRRING\* Hello\?'
            // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
            // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
            return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
        },
        highlight: function highlight(needle, haystack) {
            return haystack.replace(new RegExp('(' + this.preg_quote(needle) + ')', 'ig'), '<span class="highlight">$1</span>');
        },
        makeDetailRow: function makeDetailRow(data) {
            return ['<td colspan="7">', '<div class="detail-row">', '<div class="form-group">', '<label>Name: </label>', '<span>' + data.name + '</span>', '</div>', '<div class="form-group">', '<label>Email: </label>', '<span>' + data.email + '</span>', '</div>', '<div class="form-group">', '<label>Nickname: </label>', '<span>' + data.nickname + '</span>', '</div>', '<div class="form-group">', '<label>Birthdate: </label>', '<span>' + data.birthdate + '</span>', '</div>', '<div class="form-group">', '<label>Gender: </label>', '<span>' + data.gender + '</span>', '</div>', '</div>', '</td>'].join('');
        },
        rowClassCB: function rowClassCB(data, index) {
            return index % 2 === 0 ? 'positive' : '';
        },
        paginationConfig: function paginationConfig(componentName) {
            console.log('paginationConfig: ', componentName);
            if (componentName == 'vuetable-pagination') {
                this.$broadcast('vuetable-pagination:set-options', {
                    wrapperClass: 'pagination',
                    icons: { first: '', prev: '', next: '', last: '' },
                    activeClass: 'active',
                    linkClass: 'btn btn-default',
                    pageClass: 'btn btn-default'
                });
            }
            if (componentName == 'vuetable-pagination-dropdown') {
                this.$broadcast('vuetable-pagination:set-options', {
                    wrapperClass: 'form-inline',
                    icons: { prev: 'glyphicon glyphicon-chevron-left', next: 'glyphicon glyphicon-chevron-right' },
                    dropdownClass: 'form-control'
                });
            }
        },
        // -------------------------------------------------------------------------------------------
        // You can change how sort params string is constructed by overriding getSortParam() like this
        // -------------------------------------------------------------------------------------------
        // getSortParam: function(sortOrder) {
        //     console.log('parent getSortParam:', JSON.stringify(sortOrder))
        //     return sortOrder.map(function(sort) {
        //         return (sort.direction === 'desc' ? '+' : '') + sort.field
        //     }).join(',')
        // }
        submit: function submit() {
            var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var related = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            this.row._token = token;
            //Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#_token').getAttribute('value');
            Vue.http.headers.common['X-CSRF-TOKEN'] = token;

            var formData = new FormData();
            var keys = '';
            var data = '';
            var actionUrl = "";

            if (!model || model.target) {
                keys = Object.keys(this.row);
                data = this.row;
                keys.forEach(function (index) {
                    formData.append(index, data[index]);
                });

                if (this.method == 'PATCH' || this.method == 'POST') {
                    if (this.method == 'PATCH') {
                        actionUrl = this.url.update + this.row.id;
                        this.$http.patch(actionUrl, formData).then(this.success, this.failed);
                    } else if (this.method == 'POST') {
                        actionUrl = this.url.store;
                        this.$http.post(actionUrl, formData).then(this.success, this.failed);
                    }
                } else if (this.method == 'DELETE') {
                    actionUrl = this.url.delete + this.row.id;
                    this.$http.delete(actionUrl, formData).then(this.success, this.failed);
                }
            } else if (related) {
                console.log('Related: ' + related);
                console.log('Model: ' + model);
            } else {
                //console.log ('Model: ' + model);
                actionUrl = this.url.foreign[model][type].url;
                //this.method = this.url.foreign[model][type].method;
                keys = Object.keys(this.row[model]);
                data = this.row[model];
                keys.forEach(function (index) {
                    formData.append(index, data[index]);
                });
                this.$http.post(actionUrl, formData).then(this.success2, this.failed);
            }
        },
        success: function success(response) {
            var lastOpenModal = this.lastOpenModal.pop();
            if (response.data.data) {
                var data = response.data.data;
                var actions = lastOpenModal.split('_');
                var map = 'row';
                if (actions.length && actions[2] == 'inform') {
                    map += '.' + actions[0];
                    var field = decamelize(actions[0]);
                    this.row[field + '_id'] = data.id;
                }
                console.log(map);
                //vm.$set(map, data);
            }
            if (this.method == 'POST' || this.method == 'PATCH' || this.method == 'DELETE') this.$broadcast('vuetable:reload');
            var message = response.data.message;
            vm.flashMessage = message;
            vm.flashType = 'success';
            this.closeModal(lastOpenModal);
            console.log(response);
        },
        success2: function success2(response) {
            var lastOpenModal = this.lastOpenModal.pop();
            if (response.data.data) {
                var map = 'row';
                var data = response.data.data;
                var actions = lastOpenModal.split('_');
                if (actions.length && actions[2] == 'inform') {
                    map += '.' + decamelize(actions[0]);
                    var field = decamelize(actions[0]);
                    this.row[field + '_id'] = data.id;
                    console.log(field, this.row[field + '_id']);
                }
                if (response.data.imageUrl) {
                    this.file = '/' + response.data.imageUrl;
                }

                this.$set(map, data);
                console.log(map);

                //console.log("success2");
                //console.log(JSON.stringify(response.data));
            }
            if (this.method == 'POST' || this.method == 'PATCH' || this.method == 'DELETE') this.$broadcast('vuetable:reload');
            var message = response.data.message;
            this.flashMessage = message;
            this.flashType = 'success';
        },
        failed: function failed(response) {
            console.log(response);
            this.flashMessage = this.defaultErrorMessage;
            this.flashType = this.flashTypeDanger;
            if (response.data) {
                vm.updateErrors(response.data);
                //console.log("errors", response.data);
            }
            //console.log("response", response.data);
        },
        updateErrors: function updateErrors(errors) {
            this.errorMessages = [];
            for (var fieldAttr in errors) {
                var errorMgs = errors[fieldAttr];
                for (var msg in errorMgs) {
                    //errorMessages.push({ field: fieldAttr, message: errorMgs[msg] });                       
                    this.errorMessages.push(errorMgs[msg]);
                }
            }
            //console.log("errors", this.errorMessages);
        },
        getData: function getData() {
            var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (!url) {
                this.sendData(this.url.show + this.row.id, 'GET').then(this.success2, this.failed);
            } else {
                this.sendData(url, 'GET').then(this.success2, this.failed);
            }
        },
        getForeignData: function getForeignData() {
            var callUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var mapVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var related = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'index';

            var foreign = this.url.foreign[related][action];
            if (callUrl == null) callUrl = foreign.url;

            var sendParams = { url: callUrl, method: foreign.method, data: {} };
            this.$http(sendParams).then(function (response) {
                if (response.data.data) {
                    var data = response.data.data;
                    var currentForeignData = vm.foreignData;
                    currentForeignData[mapVar] = data;
                    var count = data.length;
                    if (count === undefined) count = Object.keys(data).length;
                    currentForeignData[mapVar + 'Count'] = count;
                    vm.foreignData.push(currentForeignData);
                }
            });
        },
        cleanData: function cleanData() {
            this.row = objectRow;
            this.flashMessage = '';
            this.flashType = '';
        },
        sendData: function sendData(callUrl, method) {
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return this.$http({ url: callUrl, method: method, data: data });
        },
        visible: function visible(field) {
            for (var column in this.columns) {
                if (this.columns[column].name == field || this.columns[column].name == field + '_format' || this.columns[column].name == field + '_name') return this.columns[column].visible;
            }
            return false;
        },
        modal: function modal(type) {
            if (type == 'PATCH' || type == 'POST') {
                this.lastOpenModal.push('formModal');
                this.method = type;
                this.formModal = true;
            } else if (type == 'SHOW') {
                this.lastOpenModal.push('showModal');
                this.method = type;
                this.showModal = true;
            } else if (type == 'DELETE') {
                this.lastOpenModal.push('deleteModal');
                this.method = type;
                this.deleteModal = true;
            } else {
                this.lastOpenModal.push(type);
                this.localModals[type] = true;
            }
        },
        closeModal: function closeModal(modalName) {
            if (modalName == this.lastOpenModal[this.lastOpenModal.length - 1]) this.lastOpenModal.pop();

            if (this.localModals[modalName] != undefined) this.localModals[modalName] = false;else this.$set(modalName, false);

            this.cleanData();
            //console.log("Cerrado");
        },
        onFileChange: function onFileChange(event) {
            var files = event.target.files || event.dataTransfer.files;
            if (!files.length) return;
            this.row.image = files[0];
            this.createImage(files[0]);
        },
        createImage: function createImage(file) {
            var _this = this;

            var image = new Image();
            var reader = new FileReader();

            reader.onload = function (e) {
                _this.file = e.target.result;
            };
            reader.readAsDataURL(file);
            //console.log(JSON.stringify(this.row));
        },

        removeImage: function removeImage(e) {
            //this.row.image = '';
            this.file = '';
        }
    },
    events: {
        'vuetable:row-changed': function vuetableRowChanged(data) {
            //console.log('row-changed:', data.name)
        },
        'vuetable:row-clicked': function vuetableRowClicked(data, event) {
            console.log('row-clicked:', data.name);
        },
        'vuetable:cell-clicked': function vuetableCellClicked(data, field, event) {
            console.log('cell-clicked:', field.name);
            if (field.name !== '__actions') {
                this.$broadcast('vuetable:toggle-detail', data.id);
            }
        },
        'vuetable:action': function vuetableAction(action, data) {
            console.log('vuetable:action', action, data);

            this.row.id = data.id;
            this.getData();
            if (action == 'view-item') {
                this.modal('SHOW');
            } else if (action == 'edit-item') {
                this.modal('PATCH');
            } else if (action == 'delete-item') {
                this.modal('DELETE');
            }
        },
        'vuetable:load-success': function vuetableLoadSuccess(response) {
            var data = response.data.data;
            //console.log(response.data)
            /*if (this.searchFor !== '') {
                for (n in data) {
                    data[n].name = this.highlight(this.searchFor, data[n].name)
                    data[n].email = this.highlight(this.searchFor, data[n].email)
                }
            }*/
        },
        'vuetable:load-error': function vuetableLoadError(response) {
            if (response.status == 400) {
                console.log('Something\'s Wrong!', response.data.message, 'error');
            } else {
                console.log('Oops', E_SERVER_ERROR, 'error');
            }
        },

        changeMonth: function changeMonth(start, end, current) {
            console.log('changeMonth', start, end, current);
        },
        eventClick: function eventClick(event, jsEvent, pos) {
            console.log('eventClick', event, jsEvent, pos);
        },
        dayClick: function dayClick(day, jsEvent) {
            console.log('dayClick', day, jsEvent);
        },
        moreClick: function moreClick(day, events, jsEvent) {
            console.log('moreCLick', day, events, jsEvent);
        }
    }
});

},{"decamelize":1,"vue":9,"vue-fullcalendar/dist/vue-fullcalendar.min.js":3,"vue-resource":5,"vue-strap/dist/vue-strap.min.js":6,"vue-upload-component/dist/vue-upload-component.min.js":7,"vue-validator/dist/vue-validator.min.js":8,"vuetable/src/components/Vuetable.vue":11,"vuetable/src/components/VuetablePagination.vue":12,"vuetable/src/components/VuetablePaginationBootstrap.vue":13,"vuetable/src/components/VuetablePaginationDropdown.vue":14}]},{},[16]);
