import { createContext, useReducer, useContext, useEffect } from 'react';
import {
  IStateType,
  REDUCER_ACTION_TYPE,
  IReducerAction,
} from '../interfaces/interfaces';

const initState: IStateType = { bikes: [], loading: true, error: '' };

export const BikeContext = createContext(initState);

export function useBikes() {
  return useContext(BikeContext);
}

const useBikeReducer = (
  state: IStateType,
  action: IReducerAction
): IStateType => {
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

export function BikesProvider({ children }: { children: React.ReactNode }) {
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
