import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactElement,
} from 'react';

export type BikeType = {
  image: string;
  brand: string;
  model: string;
  type: string;
  wheelSize: number;
  price: number;
  rating: number;
  numReviews: number;
};

type StateType = {
  bikes: BikeType[];
  loading: boolean;
  error: string;
};

const initState: StateType = { bikes: [], loading: true, error: '' };

export const BikeContext = createContext(initState);

export function useBikes() {
  return useContext(BikeContext);
}

const enum REDUCER_ACTION_TYPE {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  // TODO - check type for payload
  payload?: any;
};

const useBikeReducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.FETCH_REQUEST:
      return { ...state, loading: true };
    case REDUCER_ACTION_TYPE.FETCH_SUCCESS:
      return { ...state, loading: false, bikes: action.payload };
    case REDUCER_ACTION_TYPE.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export function BikesProvider({ children }: { children: ReactElement }) {
  // const [isAuth, setIsAuth] = useState(false);
  const [{ loading, error, bikes }, dispatch] = useReducer(
    useBikeReducer,
    initState
  );

  useEffect(() => {
    const fetchBikeData = async () => {
      dispatch({ type: REDUCER_ACTION_TYPE.FETCH_REQUEST });
      try {
        const response = await fetch('http://localhost:8000/api/bikes');
        const bikeData = await response.json();
        dispatch({
          type: REDUCER_ACTION_TYPE.FETCH_SUCCESS,
          payload: bikeData,
        });
      } catch (error) {
        dispatch({ type: REDUCER_ACTION_TYPE.FETCH_FAIL, payload: error });
      }
    };
    fetchBikeData();
  }, []);

  const value = { loading, error, bikes };

  return <BikeContext.Provider value={value}>{children}</BikeContext.Provider>;
}

// type UseBikeContextType = ReturnType<typeof BikesProvider>;

// const initContextState: UseBikeContextType = {
//   state: initState,
// };

// export const BikeProvider = ({ children, ...initState }, );
