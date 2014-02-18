'use strict';

var App = (function App() {

  var img, button;

  function init () {
    // Cache DOM elements
    img = document.querySelector('.container img');
    button = document.getElementById('close');
    // Add listeners
    button.addEventListener('click', function handleClick() {
      window.close();
    });

    // Add activity listener
    window.navigator.mozSetMessageHandler('activity', function(activity) {
      renderCat(function(blob) {
        // Here you can play with the blob!
        // For example, returning this value from an activity ;)
        activity.postResult({blob: blob});
      });
    });
  }
  
  // Retrieve a random number between min & max
  function _getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Render a funny cat
  function renderCat(cb) {
    // Generate URL
    var url = 'cat' + _getRandom(1, 4) + '.jpg';
    img.src = url;
    img.onload = function() {
      img.classList.remove('hidden');
      img.addEventListener('click', function() {
        getCatBlob(this, cb);
      });
      
    };
  }

  // Get blob from a funny cat!
  function getCatBlob(img, cb) {
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 480;
    canvas.getContext("2d").drawImage(img, 0, 0);
    canvas.toBlob(function(blob) {
      cb && cb(blob);
    });
  }

  return {
    init: init
  };

})();

window.onload = App.init;
