export default class ResponsiveManager {
  static watch(query, onMatch, onUnmatch) {
    const media = window.matchMedia(`(${query})`);
    const abortController = new AbortController();

    const handler = (e) => e.matches ? onMatch() : onUnmatch();
    media.addEventListener('change', handler, { signal: abortController.signal });
    handler(media);
    return abortController;
  }
}