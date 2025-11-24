// This script should be placed in the public directory

// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // Construct the URL for the service worker
    var swUrl = '/serviceWorker.js';

    if (isLocalhost) {
      // Check if a service worker exists
      checkValidServiceWorker(swUrl, config);
    } else {
      // Register the service worker
      registerValidSW(swUrl, config);
    }
  });
}

// Utility to determine if the current environment is localhost
function isLocalhost() {
  return window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(window.location.hostname);
}

// Register a valid service worker
function registerValidSW(swUrl, config) {
  navigator.serviceWorker.register(swUrl)
    .then(function (registration) {
      registration.onupdatefound = function () {
        var installingWorker = registration.installing;
        installingWorker.onstatechange = function () {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(function (error) {
      console.error('Error during service worker registration:', error);
    });
}

// Check if the service worker is valid
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl)
    .then(function (response) {
      if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.unregister().then(function () {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(function () {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

// Unregister the service worker
function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    });
  }
}