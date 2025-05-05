type RootStackParamList = {
    landing: undefined,
    login: undefined,
    register: undefined,
    home: {fullName?: string},
    search: undefined,
    "select-traveler": ITripData,
    "select-date": ITripData,
    "select-budget": ITripData,
    "review-trip": ITripData,
    "generate-trip": ITripData,
    "trip-details": any,
    "map": any,
};

interface ITripData {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  photoRef: string;
  url: string;
  traveler: {
    id: number,
    title: string,
    description: string,
    icon: string,
    people: string,
  },
  time: {
    startDate: Moment|null,
    endDate: Moment|null,
    totalNoOfDays: number,
  },
  budget: {
    id: number,
    title: string,
    description: string,
    icon: string,
  },
}

declare module "*.png";