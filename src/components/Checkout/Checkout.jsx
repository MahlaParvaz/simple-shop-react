import { useAuth } from '../../providers/AuthProvider';
import { useCard } from '../../providers/CardProvider';
// import '../../pages/cardPage.css';
import { Link } from 'react-router-dom';
const Checkout = () => {
  const auth = useAuth();
  const { card, total } = useCard();

  if (!card.length)
    return (
      <main className="container">
        <Link to="/"> go to shopping? </Link>
      </main>
    );

  return (
    <main className="container">
      <section className="cardCenter">
        {auth ? (
          <>
            <section className="cardItemList">
              <h3>checkout detial</h3>
              <p>name : {auth.name}</p>
              <p>email : {auth.email}</p>
              <p>phoneNumber: {auth.phoneNumber}</p>
            </section>
            <section className="cardSummery">
              {card &&
                card.map((c) => {
                  return (
                    <div>
                      {c.name} * {c.quantity} : {c.quantity * c.offPrice}
                    </div>
                  );
                })}
              <hr />
              <div>total price : {total}</div>
            </section>
          </>
        ) : (
          <p>please login !</p>
        )}
      </section>
    </main>
  );
};

export default Checkout;
