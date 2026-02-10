export interface City {
  id: number;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
}

export type CitiesContextType = {
  isLoading: boolean;
  cities: Array<City>;
  currentCity: any;
  getCity: (id: string |undefined) => Promise<void>;
  error: string;
  deleteCity: (id: string | number) => Promise<void>;
  createCity: (city: Omit<City, "id">) => any;
};

export interface Country {
  country: string;
  emoji: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export type FakeAuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (arg1: string, arg2: string) => void;
  logout: () => void;
};
