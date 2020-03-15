const cacheName = "DotGame";
const filesToCache = [
  "/",
  "./style.css",
  "./index.js",
  "./Dot.js",
  "./DotManager.js",
  "./ScoreBoard.js",
  "./SliderSpeed.js",
  "./images/smile.png",
  "./images/angry.png",
  "./images/happy.png",
  "./images/shock.png",
  "./images/smile.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
