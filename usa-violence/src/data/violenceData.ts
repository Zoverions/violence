
import { ViolenceData } from '@/types';

export const violenceData: ViolenceData = {
  hateCrime: {
    years: [2018, 2019, 2020, 2021, 2022, 2023],
    total: [8180, 8389, 8263, 8577, 11500, 11288],
    race: [4500, 4600, 4700, 4800, 6400, 6212],
    religion: [1800, 1750, 1725, 1700, 2400, 2290],
    sexual_orientation: [1350, 1375, 1400, 1425, 1850, 1860],
  },
  ncvsFbi: {
    years: [2019, 2020, 2021, 2022, 2023],
    ncvs: [20.1, 21.5, 19.7, 20.3, 19.4],
    fbi: [379, 398, 387, 381, 364],
  },
  leoka: {
    years: [2019, 2020, 2021, 2022, 2023],
    assaults: [60000, 65000, 70000, 78000, 79936],
    felonious: [48, 46, 73, 71, 60],
    ambush: [7, 9, 12, 14, 11],
  },
  gunViolence: {
    years: [2020, 2021, 2022, 2023, 2024],
    suicides: [24000, 24600, 24800, 24185, 16162],
    homicides: [19300, 20900, 20000, 18874, 12988],
    other: [2000, 2100, 2050, 2000, 1000],
    massShootings: [611, 690, 647, 656, 488],
  },
  scale: {
    categories: [
      'Ideological Murders (CSIS/ADL)',
      'Homicides (FBI 2023)',
      'Firearm Suicides (GVA 2023)'
    ],
    values: [20, 18874, 24185],
  }
};
