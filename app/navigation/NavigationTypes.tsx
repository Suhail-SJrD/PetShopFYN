export type NavigationTypes = {
  SplashScreen: undefined;
  Home: undefined;
  SearchScreen: undefined;
  NewPetForm: undefined;
  CaptureImage: {
    getPhoto: (path: string) => void;
  };
  Cart: undefined;
  NoInternetScreen: undefined;
};
