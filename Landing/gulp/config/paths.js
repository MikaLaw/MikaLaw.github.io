const srcFolder = './src';
const buildFolder = './app';

export const paths = {
  base: {
    src: srcFolder,
    build: buildFolder,
  },
  srcScss: `${srcFolder}/scss/**/*.scss`,
  srcPug: `${srcFolder}/view`,
  buildCssFolder: `${buildFolder}/css`,
  srcFaviconFolder: `${srcFolder}/img/favicon`,
  fontsFolder: `${srcFolder}/fonts`,
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcSvg: `${srcFolder}/img/sprite/**.svg`,
  srcMainJs: `${srcFolder}/js/main.js`,
  srcVendorJs: `${srcFolder}/js/vendor.js`,
  buildJsFolder: `${buildFolder}/js`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
};