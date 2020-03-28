/* Source: http://www.javascriptkit.com/javatutors/touchevents2.shtml */
window.addEventListener(
  'load',
  function() {
    const touchsurface = document.getElementById('touchsurface');
    var startX;
    var startY;
    var dist;
    const threshold = 150; //required min distance traveled to be considered swipe
    const allowedTime = 200; // maximum time allowed to travel that distance
    var elapsedTime;
    var startTime;
    const backIcon = document.getElementById('js-swipe-left');

    function handleswipe(isrightswipe) {
      if (isrightswipe) {
        // right swipe
        window.location.replace('/swipe-test');
      } else {
        // no right swipe
        console.log('sad boiiiii');
      }
    }
    function handleswipeleft(isleftswipe) {
      if (isleftswipe) {
        // left swipe
        backIcon.classList.toggle('js-swiped-left');
        setTimeout(() => {
          window.location.replace('/swipe-test-left');
        }, 220);
      } else {
        // no left swipe
        console.log('sad boiiiii');
      }
    }

    touchsurface.addEventListener(
      'touchstart',
      function(e) {
        touchsurface.innerHTML = '';
        const touchobj = e.changedTouches[0];
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        e.preventDefault();
      },
      false
    );

    // touchsurface.addEventListener(
    //   'touchmove',
    //   function(e) {
    //     e.preventDefault(); // prevent scrolling when inside DIV
    //   },
    //   false
    // );

    touchsurface.addEventListener(
      'touchend',
      function(e) {
        const touchobj = e.changedTouches[0];
        dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        const swiperightBol =
          elapsedTime <= allowedTime &&
          dist >= threshold &&
          Math.abs(touchobj.pageY - startY) <= 100;
        const swipeleftBol =
          elapsedTime <= allowedTime &&
          dist <= threshold &&
          Math.abs(touchobj.pageY - startY) <= 100;
        handleswipe(swiperightBol);
        handleswipeleft(swipeleftBol);
        e.preventDefault();
      },
      false
    );
  },
  false
); // end window.onload
