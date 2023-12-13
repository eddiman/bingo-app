import { ITheme } from "../interfaces/Interfaces";
import baseTokens from "../tokens/baseTokens";
import piresTokens from "../tokens/piresTokens";
import christmasTokens from "../tokens/christmasTokens";
import baseStyled, { ThemedStyledInterface } from 'styled-components';
import otTokens from "../tokens/otTokens";

export const piresLightTheme: ITheme = {
    link: {
        default: baseTokens.interactive.link.light.default
    },
    focus: {
        default: baseTokens.interactive.focusOutline.light.default
    },
    background: baseTokens.ui.background.light.background,
    text: baseTokens.ui.background.light.bodyText,
    alphaBackground: baseTokens.ui.alphaBackground,

    interactive: {
        primary: {
            default: piresTokens.light.interactive.primary.default,
            defaultText: piresTokens.light.interactive.primary.defaultText,
            hover: piresTokens.light.interactive.primary.hover,
            hoverText: piresTokens.light.interactive.primary.hoverText,
            active: piresTokens.light.interactive.primary.active,
            activeText: piresTokens.light.interactive.primary.activeText,
            disabled: piresTokens.light.interactive.primary.disabled,
            disabledText: piresTokens.light.interactive.primary.disabledText,
            focus: piresTokens.light.interactive.primary.focus,
            label: piresTokens.light.interactive.primary.label,
            border: piresTokens.light.interactive.primary.border
        },
        secondary: {
            default: piresTokens.light.interactive.secondary.default,
            hover: piresTokens.light.interactive.secondary.hover,
            active: piresTokens.light.interactive.secondary.active,
            focus: piresTokens.light.interactive.secondary.focus,
            label: piresTokens.light.interactive.secondary.label
        }
    },
    miscColors: {
        color1: piresTokens.miscColors.color1,
        color2: piresTokens.miscColors.color2,
        color3: piresTokens.miscColors.color3,
        color4: piresTokens.miscColors.color4,
        color5: piresTokens.miscColors.color5,
    }
};

export const piresDarkTheme: ITheme = {
    link: {
        default: baseTokens.interactive.link.dark.default
    },
    focus: {
        default: baseTokens.interactive.focusOutline.dark.default
    },
    background: baseTokens.ui.background.dark.background,
    text: baseTokens.ui.background.dark.bodyText,
    alphaBackground: baseTokens.ui.alphaBackground,

    interactive: {
        primary: {
            default: piresTokens.dark.interactive.primary.default,
            defaultText: piresTokens.dark.interactive.primary.defaultText,
            hover: piresTokens.dark.interactive.primary.hover,
            hoverText: piresTokens.dark.interactive.primary.hoverText,
            active: piresTokens.dark.interactive.primary.active,
            activeText: piresTokens.dark.interactive.primary.activeText,
            disabled: piresTokens.dark.interactive.primary.disabled,
            disabledText: piresTokens.dark.interactive.primary.disabledText,
            focus: piresTokens.dark.interactive.primary.focus,
            label: piresTokens.dark.interactive.primary.label,
            border: piresTokens.dark.interactive.primary.border
        },
        secondary: {
            default: piresTokens.dark.interactive.secondary.default,
            hover: piresTokens.dark.interactive.secondary.hover,
            active: piresTokens.dark.interactive.secondary.active,
            focus: piresTokens.dark.interactive.secondary.focus,
            label: piresTokens.dark.interactive.secondary.label
        }
    },
    miscColors: {
        color1: piresTokens.miscColors.color1,
        color2: piresTokens.miscColors.color2,
        color3: piresTokens.miscColors.color3,
        color4: piresTokens.miscColors.color4,
        color5: piresTokens.miscColors.color5,
    }
};

export const otLightTheme: ITheme = {
    link: {
        default: baseTokens.interactive.link.light.default
    },
    focus: {
        default: baseTokens.interactive.focusOutline.light.default
    },
    background: baseTokens.ui.background.light.background,
    text: baseTokens.ui.background.light.bodyText,
    alphaBackground: baseTokens.ui.alphaBackground,

    interactive: {
        primary: {
            default: otTokens.light.interactive.primary.default,
            defaultText: otTokens.light.interactive.primary.defaultText,
            hover: otTokens.light.interactive.primary.hover,
            hoverText: otTokens.light.interactive.primary.hoverText,
            active: otTokens.light.interactive.primary.active,
            activeText: otTokens.light.interactive.primary.activeText,
            disabled: otTokens.light.interactive.primary.disabled,
            disabledText: otTokens.light.interactive.primary.disabledText,
            focus: otTokens.light.interactive.primary.focus,
            label: otTokens.light.interactive.primary.label,
            border: otTokens.light.interactive.primary.border
        },
        secondary: {
            default: otTokens.light.interactive.secondary.default,
            hover: otTokens.light.interactive.secondary.hover,
            active: otTokens.light.interactive.secondary.active,
            focus: otTokens.light.interactive.secondary.focus,
            label: otTokens.light.interactive.secondary.label
        }
    },
    miscColors: {
        color1: otTokens.miscColors.color1,
        color2: otTokens.miscColors.color2,
        color3: otTokens.miscColors.color3,
        color4: otTokens.miscColors.color4,
        color5: otTokens.miscColors.color5,
    }
};
export const otDarkTheme: ITheme = {
    link: {
        default: baseTokens.interactive.link.dark.default
    },
    focus: {
        default: baseTokens.interactive.focusOutline.dark.default
    },
    background: baseTokens.ui.background.dark.background,
    text: baseTokens.ui.background.dark.bodyText,
    alphaBackground: baseTokens.ui.alphaBackground,

    interactive: {
        primary: {
            default: otTokens.dark.interactive.primary.default,
            defaultText: otTokens.dark.interactive.primary.defaultText,
            hover: otTokens.dark.interactive.primary.hover,
            hoverText: otTokens.dark.interactive.primary.hoverText,
            active: otTokens.dark.interactive.primary.active,
            activeText: otTokens.dark.interactive.primary.activeText,
            disabled: otTokens.dark.interactive.primary.disabled,
            disabledText: otTokens.dark.interactive.primary.disabledText,
            focus: otTokens.dark.interactive.primary.focus,
            label: otTokens.dark.interactive.primary.label,
            border: otTokens.dark.interactive.primary.border
        },
        secondary: {
            default: otTokens.dark.interactive.secondary.default,
            hover: otTokens.dark.interactive.secondary.hover,
            active: otTokens.dark.interactive.secondary.active,
            focus: otTokens.dark.interactive.secondary.focus,
            label: otTokens.dark.interactive.secondary.label
        }
    },
    miscColors: {
        color1: otTokens.miscColors.color1,
        color2: otTokens.miscColors.color2,
        color3: otTokens.miscColors.color3,
        color4: otTokens.miscColors.color4,
        color5: otTokens.miscColors.color5,
    }
};

export const christmasLightTheme: ITheme = {
    link: {
        default: baseTokens.interactive.link.dark.default
    },
    focus: {
        default: baseTokens.interactive.focusOutline.dark.default
    },
    background: baseTokens.ui.background.dark.background,
    text: baseTokens.ui.background.dark.bodyText,
    alphaBackground: baseTokens.ui.alphaBackground,

    interactive: {
        primary: {
            default: christmasTokens.dark.interactive.primary.default,
            defaultText: christmasTokens.dark.interactive.primary.defaultText,
            hover: christmasTokens.dark.interactive.primary.hover,
            hoverText: christmasTokens.dark.interactive.primary.hoverText,
            active: christmasTokens.dark.interactive.primary.active,
            activeText: christmasTokens.dark.interactive.primary.activeText,
            disabled: christmasTokens.dark.interactive.primary.disabled,
            disabledText: christmasTokens.dark.interactive.primary.disabledText,
            focus: christmasTokens.dark.interactive.primary.focus,
            label: christmasTokens.dark.interactive.primary.label,
            border: christmasTokens.dark.interactive.primary.border
        },
        secondary: {
            default: christmasTokens.dark.interactive.secondary.default,
            hover: christmasTokens.dark.interactive.secondary.hover,
            active: christmasTokens.dark.interactive.secondary.active,
            focus: christmasTokens.dark.interactive.secondary.focus,
            label: christmasTokens.dark.interactive.secondary.label
        }
    },
    miscColors: {
        color1: christmasTokens.miscColors.color1,
        color2: christmasTokens.miscColors.color2,
        color3: christmasTokens.miscColors.color3,
        color4: christmasTokens.miscColors.color4,
        color5: christmasTokens.miscColors.color5,
    }
};

export const styled = baseStyled as ThemedStyledInterface<ITheme>;