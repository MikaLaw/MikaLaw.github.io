import BgVideo from './bg-video';

export const initBgVideo = () => {
  document.querySelectorAll('[data-video-full-size]').forEach((mainVideo) => {
    new BgVideo(mainVideo, {
      observer: true
    });    
  })
}