"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/gmar-2/index.html","d2dc174306896cd2a17c4d8bfe72388d"],["/gmar-2/static/css/main.cc138a4f.css","09803cd7ea38fcc7e980afaf19d59d22"],["/gmar-2/static/js/main.71754e5a.js","c7a0ad346fe08412ec95d1b6335044ce"],["/gmar-2/static/media/arrow2.c9dbd522.svg","c9dbd522d4724b68695543fbfedcb452"],["/gmar-2/static/media/arrow3.c109d1b8.svg","c109d1b840b517a2926398bea17ccd08"],["/gmar-2/static/media/falk.59956e1e.ttf","59956e1e59d897796a731f8347b5eb42"],["/gmar-2/static/media/falk.5ba1ffef.svg","5ba1ffefae528d79d47ea1d81457f04a"],["/gmar-2/static/media/falk.679681b8.eot","679681b8404aa9902263b4195aef348b"],["/gmar-2/static/media/falk.fc6956cc.woff","fc6956cca7732b7f3e49173f53d499b1"],["/gmar-2/static/media/gmar.50ffc943.svg","50ffc943fc5190077420067324304aa4"],["/gmar-2/static/media/gmar.80773e3c.woff","80773e3c393116169df5768382a4434c"],["/gmar-2/static/media/gmar.db68cc21.ttf","db68cc213733de6182e32275688a300b"],["/gmar-2/static/media/gmar.e4242c40.eot","e4242c40e6d9db4e0286dae5e8a2551b"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],r=new URL(t,self.location),n=createCacheKey(r,hashParamName,a,/\.\w{8}\./);return[r.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var r=new Request(a,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/gmar-2/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});