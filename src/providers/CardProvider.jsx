import { createContext, useContext, useReducer } from 'react';
import cardReducer from './cardReducer';

const CardContext = createContext();
const CardContextDispatcher = createContext();
const initialState = {
  card: [],
  total: 0,
};
const CardProvider = ({ children }) => {
  const [card, dispatch] = useReducer(cardReducer, initialState);
  return (
    <CardContext.Provider value={card}>
      <CardContextDispatcher.Provider value={dispatch}>
        {children}
      </CardContextDispatcher.Provider>
    </CardContext.Provider>
  );
};

export default CardProvider;

export const useCard = () => useContext(CardContext);
export const useCardAction = () => useContext(CardContextDispatcher);
