type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    TheatreMap: undefined;
    TheatreDetails: { theatres: Theatre }
    MoviesScreen: undefined;
};

interface RegisterData {
  email: string;
  password: string;
}

interface SimpleUser {
  uid: string;
  email: string;
}
