if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

/* custom cache rules*/
workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

// cache the call to get the most recent story ids
// only if you can't get the freshest list first
workbox.routing.registerRoute(
  new RegExp('https://hacker-news.firebaseio.com/v0/newstories.json'),
  new workbox.strategies.NetworkFirst({cacheName: 'most-recent-stories'}),
);

// cache individual stories. Since they don't change, just serve the stale
// version immediately and update the cache when the network can
workbox.routing.registerRoute(
  /^https:\/\/hacker-news\.firebaseio\.com\/v0\/item\/\d+\.json/,
  new workbox.strategies.StaleWhileRevalidate({cacheName: 'stories'}),
);

workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
