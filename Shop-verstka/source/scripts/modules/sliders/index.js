import {initSliderSimple} from './init-slider-simple';
import {initSliderBleed} from './init-slider-bleed';
import {initSliderInnerMain} from './init-slider-inner-main';
import {initSliderHoverNested} from './init-slider-hover-nested';
import {initSliderInnerNested} from './init-slider-inner-nested';
import {initSliderThumb} from './init-slider-thumb';
import {initSliderCustom} from './init-slider-custom';
import {initSliderFullSize} from './init-slider-full-size';
import {initSliderFullSizeAsync} from './init-slider-full-size-async';
import {initSliderPic} from './init-slider-pic';

export const initSlider = () => {
  initSliderSimple();
  initSliderBleed();
  initSliderInnerMain();
  initSliderHoverNested();
  initSliderInnerNested();
  initSliderThumb();
  initSliderCustom(); 
  initSliderFullSize();
  initSliderFullSizeAsync();
  initSliderPic();
};