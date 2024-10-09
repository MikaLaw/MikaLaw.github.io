module.exports = function(params) {
  var roller = function(params) {
    if (!params.parentElement) { return false } 
    var rollerParent = params.parentElement,
    min = params.minValue,
    max = params.maxValue,
    roller = rollerParent.querySelectorAll('.roller__circle')[0],
    shaftIndicator = rollerParent.querySelector('.roller__shaft-indicator'),
    startInput = rollerParent.querySelector('input[name="roller_start"]'),
    endInput = rollerParent.querySelector('input[name="roller_end"]'),
    roller2Exist = false,
    gap = params.gap || params.step || (max - min) / 20,
    procentGap = Math.floor((gap * 100) / (max - min)),
    currentTarget = roller,
    roller1position = 0,
    roller2position = 0,
    value1 = min,
    value2 = max,
    // разница между максимальным и минимальным значением на оси X
    differenceValue = max - min,
    shaftIndicatorFromLeft = 0,
    shaftIndicatorFromRight = 0,
    rollerProcentWidth = 0;

    startInput.value = min;
    startInput.setAttribute('data-initial', min);
    endInput.value = max;
    endInput.setAttribute('data-initial', max);

    var roundOff = function(val) {
      var numberTail = val % params.step;
      val = val - numberTail;
      if (val > max) {
        val = max;
      }
      return val;      
    }


    if (params.secondRoller === true && rollerParent.querySelectorAll('.roller__circle').length > 1) {
      var roller2 = rollerParent.querySelectorAll('.roller__circle')[1];
      roller2Exist = true;
    }

    if (rollerParent.querySelector('.roller__data_start span')) {
      rollerParent.querySelector('.roller__data_start span').innerHTML = value1;
      rollerParent.querySelector('.roller__data_end span').innerHTML = value2;
    }


    function move(pointerPosition, target) {

      var maxRight = rollerParent.offsetWidth,
      percent = 0,
      parentDistance = rollerParent.getBoundingClientRect();

      if (!roller2Exist) {
        
        // значение ширины оси
        var rollerPosition = pointerPosition - parentDistance.left;
        percent = Math.ceil(rollerPosition / maxRight * 100);

        if (percent > 100) {
          percent = 100; 
        } else if (percent < 0) {
          percent = 0;
        } 

        roller.style.left = percent + '%';

        value1 = ((percent * differenceValue / 100) + min).toFixed(0);

        // если установлен шаг
        if (params.step) { value1 = roundOff(value1) }

        startInput.value = value1;

        if (shaftIndicator) { shaftIndicator.style.width = 100 - percent + '%' }
      }
      // end one roller condition


      if (roller2Exist) {
        rollerProcentWidth = Math.ceil(roller.offsetWidth * 100 / maxRight); 
        roller1position = Number(roller.style.left.split('%')[0]) || roller1position;
        roller2position = Number(roller2.style.right.split('%')[0]) || roller2position;
        rollerPosition = pointerPosition - parentDistance.left;
        percent = Math.ceil(rollerPosition / maxRight * 100);

        if (target === roller) {
          currentTarget = roller;
        } else if (target === roller2) {
          currentTarget = roller2;
        }
        
        if (percent > 100) {
          percent = 100; 
        } else if (percent < 0) {
          percent = 0;
        } 

        if (currentTarget === roller) {
          if (percent + roller2position > 100 - procentGap) {

          } else {
            roller.style.left = percent + '%';
            value1 = ((percent * differenceValue / 100) + min).toFixed(0);
            if (params.step) { value1 = roundOff(value1) }
            startInput.value = value1;
            
            if (shaftIndicator) { 
              shaftIndicatorFromLeft = percent;
              shaftIndicator.style.width = 100 - (shaftIndicatorFromLeft + shaftIndicatorFromRight) + '%' 
            }

          }    
        }

        if (currentTarget === roller2) {
          if ((100 - percent) + roller1position > 100 - procentGap) {
            
          } else {
            roller2.style.right = (100 - percent) + '%';

            value2 = ((percent * differenceValue / 100) + min).toFixed(0);
            if (params.step) { value2 = roundOff(value2) }
            endInput.value = value2;

            if (shaftIndicator) { 
              shaftIndicatorFromRight = (100 - percent);
              shaftIndicator.style.width = 100 - (shaftIndicatorFromLeft + shaftIndicatorFromRight) + '%';
              shaftIndicator.style.right = (100 - percent) + '%';
            }

          }
        }
      }
      // end multi rollers condition

      if (params.extraFunc) { params.extraFunc(value1, value2) }
    } 
    // end move function

    if (params.startValue) {
      var startCoef = params.startValue > max ? 1 : params.startValue / differenceValue;
      var maxRight = rollerParent.offsetWidth,
      parentDistance = rollerParent.getBoundingClientRect(),
      startPx = maxRight * startCoef + parentDistance.left;
      move(startPx);
    }

    // событие по клику на ось
    rollerParent.addEventListener('click', function(e) {
      if(e.target !== roller) {
        move(e.pageX, e.target);
      }
    })


    // события для мыши

    function mouseListener(element) {
      element.onmousedown = function(e) {
        document.onmousemove = function(e) {
          move(e.pageX, e.target);
        }
        document.onmouseup = function() {
          document.onmousemove = null;
        }
      }      
    }

    mouseListener(roller);

    if (roller2Exist) {
      mouseListener(roller2);
    }


    // события для touch

    function touchListener(element) {
      if (window.TouchEvent) {

        var touchMove = function(e) {
          var touchobj = e.changedTouches[0];
          var startx = parseInt(touchobj.pageX);
          move(startx, e.target);
        }

        element.addEventListener('touchstart', function(e) {
          element.addEventListener('touchmove', touchMove, false);
        }, false)
      }
    }


    touchListener(roller);

    if (roller2Exist) {
      touchListener(roller2);
    }
  }

  return roller(params);
}