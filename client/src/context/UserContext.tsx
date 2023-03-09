import { createContext, useReducer, useContext, useEffect } from 'react';
import {
  IUserStateType,
  REDUCER_ACTION_TYPE,
  IReducerAction,
} from '../interfaces/interfaces';

const initState: IUserStateType = { users: [], loading: true, error: '' };

export const UserContext = createContext(initState);

export function useUsers() {
  return useContext(UserContext);
}

const useUserReducer = (
  state: IUserStateType,
  action: IReducerAction
): IUserStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.FETCH_REQUEST:
      return { ...state, loading: true };
    case REDUCER_ACTION_TYPE.FETCH_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case REDUCER_ACTION_TYPE.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [{ loading, error, users }, dispatch] = useReducer(
    useUserReducer,
    initState
  );

  useEffect(() => {
    const fetchUserData = async () => {
      dispatch({ type: REDUCER_ACTION_TYPE.FETCH_REQUEST });
      try {
        const response = await fetch('http://localhost:8000/api/v1/users');
        const userData = await response.json();
        dispatch({
          type: REDUCER_ACTION_TYPE.FETCH_SUCCESS,
          payload: userData,
        });
      } catch (error) {
        dispatch({ type: REDUCER_ACTION_TYPE.FETCH_FAIL, payload: error });
      }
    };
    fetchUserData();
    return;
  }, []);

  const value = { loading, error, users };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
