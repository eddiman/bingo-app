import colors from "../tokens/colors";

const piresTokens = {
  light: {
    interactive: {
      primary: {
        default: colors.common.black["130"],
        defaultText: colors.common.black["30"],
        hover: colors.common.black["30"],
        hoverText: colors.common.white["100"],
        active: colors.common.white["100"],
        activeText: colors.common.black["30"],
        disabled: colors.common.black["180"],
        disabledText: colors.common.black["130"],
        focus: colors.common.black["100"],
        label: colors.common.white["100"],
        border: colors.common.black["180"]
      },
      secondary: {
        default: "",
        hover: "",
        active: "",
        focus: "",
        label: ""
      }
    }
  },
  dark: {
    interactive: {
      primary: {
        default: colors.common.black["80"],
        defaultText: colors.common.black["180"],
        hover: colors.common.black["180"],
        hoverText: colors.common.black["80"],
        active: colors.common.black["30"],
        activeText: colors.common.black["180"],
        disabled: colors.common.black["180"],
        disabledText: colors.common.black["130"],
        focus: colors.common.black["100"],
        label: colors.common.black["180"],
        border: colors.common.black["80"]
      },
      secondary: {
        default: "",
        hover: "",
        active: "",
        focus: "",
        label: ""
      }
    }
  },
  miscColors: {
    color1 : colors.pires.colorRange["color-1"],
    color2 : colors.pires.colorRange["color-2"],
    color3 : colors.pires.colorRange["color-3"],
    color4 : colors.pires.colorRange["color-4"],
    color5 : colors.pires.colorRange["color-5"],
}
};
export default piresTokens;
