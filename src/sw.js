// ____________service worker______________
const DEBUG = true;
const OFLINE_URL = 'offline.html';

self.addEventListener('install', (e)=>{
    if(DEBUG) console.log('[serviceworker] installed');

    e.waitUntil(
        caches
        .open('v1')
        .then((cache)=>{
            cache.add(new Request(OFLINE_URL, {cache: 'reload'}))
        })
        .then(()=>{
            if (DEBUG){
                // console.log('cached assets: ', OFLINE_URL);
            }
        })
        .catch((error)=>{
            console.error(error)
        })
    )
});

self.addEventListener('fetch', (e)=>{
    e.respondWith(
        fetch(e.request).catch((error)=>{
            if(DEBUG){
                console.log('fetch failed; returning offline page instead', error);
            }
            return caches.match(OFLINE_URL);
        })
    )
});