import colors from "./colors";
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  mobileXL: '525px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1200px',
  desktop: '2560px',
  customHeight: '800px',
  containerWidth: '1200px'
};

export const tokens = {
  ui: {
    background: {
      light: {
        background: colors.common.white["100"],
        bodyText: colors.common.black["30"]
      },
      dark: {
        background: colors.common.black["30"],
        bodyText: colors.common.black["180"]
      }
    },
    alphaBackground: colors.common.black["opacity30"]
  },
  interactive: {
    focusOutline: {
      light: {
        default: colors.common.blue["100"]
      },
      dark: {
        default: colors.common.blue["100"]
      }
    },
    link: {
      light: {
        default: colors.common.blue["80"]
      },
      dark: {
        default: colors.common.blue["100"]
      }
    }
  },
 constants : {
  device : {
      mobileS: `(max-width: ${size.mobileS})`,
      mobileM: `(max-width: ${size.mobileM})`,
      mobileL: `(max-width: ${size.mobileL})`,
      mobileXL: `(max-width: ${size.mobileXL})`,
      tablet: `(max-width: ${size.tablet})`,
      laptop: `(max-width: ${size.laptop})`,
      laptopL: `(max-width: ${size.laptopL})`,
      desktop: `(max-width: ${size.desktop})`,
      desktopL: `(max-width: ${size.desktop})`,
      customHeight: `(max-height: ${size.customHeight})`,
      containerWidth: `(max-width: ${size.containerWidth})`
  }
}

};
export default tokens;
