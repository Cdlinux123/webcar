//asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_BCH_PWA';

//configuracion de los ficheros
var urlToCache = [
    './',
    './styles.css',
    './images/img1.jpeg',
    './images/img2.jpeg',
    './images/img3.jpg',
    './images/BKW.jpg'
];
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(Cache => {
                return Cache.addAll(urlToCache)
                    .then(()=>{
                        self.skipWaiting();
                    })
            })
            .catch(err => console.log('No se pudo registrar cache',err))
    );
});

self.addEventListener('install',e => {
    // utilizamos la variable del evento
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(Cache => {
                //Le mandamos que tenemos en el array
                return caches.addAll(urlsToCache)
                             .then(()=>{
                                self.skipWaiting();
                             })
              }) 
              .catch(err=>caches.log('No se ha registrado el cache, err'))
    );
});

// Este evento permite que la aplicacion funcione offline
self.addEventListener('activate', e=> {
    const cacheWhilelist = [CACHE_NAME];

    // Que el evento espere a que termine de ejecutar
    e.waitUntil (
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                    cacheNames.map(cacheNames => {
                        if(cacheWhilelist.indexOf(cacheNames)== -1)
                        {
                            // Borrar elementos que no se necesitan
                            return cache.delete(cacheName);
                        }
                    })
                );
            })
            .then(()=>{
                self.Clients.claim();
            })
    )
})

    self.addEventListener('fetch', e => {
        e.respondWith(
            caches.match(e.request)
                .then(res => {
                    if(res){
                        return res;
                    }
                    return fetch (e.request);
                })
        );
    });