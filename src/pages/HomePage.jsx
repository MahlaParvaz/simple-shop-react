import { toast } from 'react-toastify';
import Layout from '../Layout/Layout';
import * as data from '../data/data';
import { useCard, useCardAction } from '../providers/CardProvider';
import { CheckInCard } from '../utils/CheckInCard';
const HomePage = () => {
  const { card } = useCard();
  const dispatch = useCardAction();
  const addProductHandler = (product) => {
    toast.success(`${product.name} added to card`);
    dispatch({ type: 'ADD_TO_CARD', payload: product });
    console.log('product', product);
  };
  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((product) => {
            return (
              <section className="product" key={product.id}>
                <div className="productImg">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="productDesc">
                  <p>{product.name}</p>
                  <p> ${product.price}</p>
                  <button
                    className="btn primary"
                    onClick={() => addProductHandler(product)}
                  >
                    {CheckInCard(card, product) ? 'In Card' : ' Add to card'}
                  </button>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
