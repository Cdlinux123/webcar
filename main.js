
//Cargar service worker
if ('serviceWorker' in navigator) {
    console.log("Puedes usar el service worker");
    navigator.serviceWorker.register('./sw.js')
        .then(res=>console.log('sw cargado correctamente', res))
        .catch(err => console.log('Service worker no jalooo', err));
}else{
    console.log("No se puede comunicar con el service worker.");
}