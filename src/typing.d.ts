type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Page: undefined;
    PageRedux: undefined;
    Chat: undefined;
    AddTrip: undefined;
    GetTrip: undefined;
    ChatRoom: {id: string, name: string};
    TheatreMap: undefined;
    TheatreDetails: { theatres: Theatre }
    MoviesScreen: undefined;
};

interface RegisterData {
  email: string;
  password: string;
  name: string
}

interface SimpleUser {
  uid: string;
  email: string;
  name?: string;
}

interface Character  {
  id: number;
  name: string;
  image: string;
};

interface Trip  {
  tripName: string;
  total: string;
};
