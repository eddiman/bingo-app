export interface IPage {
  name: string,
  slug: string,
  disabled: boolean
}


export interface IAgeGroupAvg {
  groupName: string,
  avgSalary: number,
  organizedAmount: number,
  nonOrganizedAmount: number,
  organizedPercent: number,
  organized: number[],
  avgWorkExperience: number,
  avgEducation: number,
  nonValidEducation: number,
  privateSectorAmount: number,
  privateSectorPercent: number,
  publicSectorAmount: number,
  publicSectorPercent: number,
  noSectorAmount: number,
  groupSize: number

}

interface ServiceInit {
  status: 'init';
}
interface ServiceLoading {
  status: 'loading';
}
interface ServiceLoaded<T> {
  status: 'loaded';
  payload: T;
}
interface ServiceError {
  status: 'error';
  error: Error;
}
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;


export interface ITheme {
  link: {
    default: string;
  };
  focus: {
    default: string;
  };
  background: string;
  text: string,
  interactive: {
    primary: {
      default: string;
      defaultText: string;
      hover: string;
      hoverText: string;
      active: string;
      activeText: string;
      disabled: string;
      disabledText: string;
      focus: string;
      label: string;
      border: string;
    };
    secondary: {
      default: string;
      hover: string;
      active: string;
      focus: string;
      label: string;
    }
  },
  miscColors: {
    color1 : string,
    color2 : string,
    color3 : string,
    color4 : string,
    color5 : string,
}
}