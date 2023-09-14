import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useCard, useCardAction } from '../providers/CardProvider';
import './cardPage.css';
const CardPage = () => {
  const { card, total } = useCard();
  const dispatch = useCardAction();

  if (!card.length) {
    return (
      <main>
        <p>no item in card</p>
      </main>
    );
  }
  const incHandler = (cardItem) => {
    dispatch({ type: 'ADD_TO_CARD', payload: cardItem });
  };
  const decHandler = (cardItem) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: cardItem });
  };

  return (
    <Layout>
      <main className="container">
        <section className="cardCenter">
          <section className="cardItemList">
            {card.map((item) => {
              return (
                <div className="cardItem" key={item.id}>
                  <div className="itemImg">
                    <img src={item.image} alt={item.name}></img>
                  </div>
                  <div>{item.name}</div>
                  <div>{item.offPrice * item.quantity}</div>
                  <div className="btnGroup">
                    <button onClick={() => decHandler(item)}>-</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>+</button>
                  </div>
                </div>
              );
            })}
          </section>
          <CardSummery total={total} card={card} />
        </section>
      </main>
    </Layout>
  );
};

export default CardPage;

const CardSummery = ({ total, card }) => {
  const originalTotalPrice = card.length
    ? card.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;
  return (
    <section className="cardSummery">
      <h1>card summary</h1>
      <div className="summeryItem">
        <p>card total</p>
        <p>{originalTotalPrice} $</p>
      </div>
      <div className="summeryItem">
        <p>card discount</p>
        <p>{originalTotalPrice - total} $</p>
      </div>
      <div className="summeryItem net">
        <p>net price</p>
        <p>{total} $</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button className="btn primary">Go To Checkout</button>
      </Link>
    </section>
  );
};
