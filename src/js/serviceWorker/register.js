export default (function registerSW () {
  if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
      console.log(`Dobro došli na sajt za učenje kodiranja i programiranja. Ovo je naša konzola :)`);
    } else {
      // Register the service worker
      navigator.serviceWorker
        .register("../js/serviceWorker/service-worker.js", {
          //scope: "./kodiranje/"
          scope: "/"
        })
        .then(function (reg) {
          console.log(`Dobro došli na sajt za učenje kodiranja i programiranja. Ovo je naša konzola :)`);
        });
    }
  }
})()