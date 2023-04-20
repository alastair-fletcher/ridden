import {
  User,
  UserCredential,
} from 'firebase/auth';

// Login/SignUp
export interface ILoginSignUpProps {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  toggleModal: () => void;
}

// NavBar
export interface INavProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// BikeCard
export interface IBikeCardProps {
  bike: IBikeType;
  usersLikedBikes: string[];
}

// Map
export interface IMapProps {
  setAddedBike: React.Dispatch<React.SetStateAction<IBikeType>>;
}

// Search
export interface ISearchProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// BikeContext
export interface IBikeType {
  bikeId: string;
  createdAt: string;
  userId: string | undefined;
  title: string;
  description: string;
  price: string;
  image: string;
  latitude: number;
  longitude: number;
  placeName: string;
}
export interface IStateType {
  bikes: IBikeType[];
  loading: boolean;
  error: string;
}

// UserContext
export interface IUserType {
  userId: string | null;
  bikeIds: string[];
}

export interface IUserStateType {
  users: IUserType[];
  loading: boolean;
  error: string;
}

export const enum REDUCER_ACTION_TYPE {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
}

export interface IReducerAction {
  type: REDUCER_ACTION_TYPE;
  // TODO - check type for payload
  payload?: any;
};

// AuthContext
export interface IAuthContext {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setNewEmail: (currentUser: User, email: string) => Promise<void>;
  setNewPassword: (currentUser: User, newPassword: string) => Promise<void>;
  googleLogin: () => Promise<UserCredential>;
  deleteAccount: (currentUser: User) => Promise<void>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
