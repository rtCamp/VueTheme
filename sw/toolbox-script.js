// Route #1

toolbox.router.get('/(.*)', toolbox.networkFirst, {
  cache: {
    name: 'googleapis',
    maxEntries: 20,
  },
  origin: /\.googleapis\.com$/
});

// Route #2
toolbox.router.get(/\.(?:png|gif|jpg)$/, toolbox.networkFirst, {
  cache: {
    name: 'images-cache',
    maxEntries: 50
  }
});

toolbox.router.get('/login', toolbox.networkFirst, {
  cache: {
    name: 'login'
  }
});


toolbox.router.get('/my-profile', toolbox.networkFirst, {
  cache: {
    name: 'profile'
  }
});

toolbox.router.get( /^http:\/\/sagar\.rtcamp\.info\//, toolbox.networkFirst);

toolbox.router.get( /^https:\/\/rtcamp\.com\//, toolbox.networkFirst);


