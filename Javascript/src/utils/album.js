import {ALBUMS_EXTRA_COUNT} from '../consts.js';

export function sortByDate(albumA, albumB) {
    return Date.parse(albumB.albumInfo.release.date) - Date.parse(albumA.albumInfo.release.date);
}
  
export function sortByTrack(albumA, albumB) {
    return albumB.albumInfo.trackCount - albumA.albumInfo.trackCount;
}

export function getMostCommentedAlbums(albums) {
    return albums.sort((a, b) => b.comments.length - a.comments.length).slice(0, ALBUMS_EXTRA_COUNT);
}

export function isCtrlPlusEnterPressed(evt) {
    return evt.metaKey && evt.code === 'Enter' || evt.ctrlKey && evt.code === 'Enter';
  }

export function getDigitToWord(count, words) {
    let num, result;
    let [one, two, three] = words
    num = Number(count);
  
    let string = num.toString();
    let lastChar = string.charAt(string.length - 1);
  
    if (lastChar == "1" && !(num == 11)) {
        result = num + " " + one;
    } else if (lastChar == "2" && !(num == 12)) {
        result = num + " " + two;
    } else if (lastChar == "3" && !(num == 13)) {
        result = num + " " + two;
    } else if (lastChar == "4" && !(num == 14)) {
        result = num + " " + two;
    } else {
        result = num + " " + three;
    }
  
    return result
}

export const isExtra = true