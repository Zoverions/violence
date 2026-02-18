
export interface HateCrimeData {
  years: number[];
  total: number[];
  race: number[];
  religion: number[];
  sexual_orientation: number[];
}

export interface NcvsFbiData {
  years: number[];
  ncvs: number[];
  fbi: number[];
}

export interface LeokaData {
  years: number[];
  assaults: number[];
  felonious: number[];
  ambush: number[];
}

export interface GunViolenceData {
  years: number[];
  suicides: number[];
  homicides: number[];
  other: number[];
  massShootings: number[];
}

export interface ScaleData {
  categories: string[];
  values: number[];
}

export interface ViolenceData {
  hateCrime: HateCrimeData;
  ncvsFbi: NcvsFbiData;
  leoka: LeokaData;
  gunViolence: GunViolenceData;
  scale: ScaleData;
}
