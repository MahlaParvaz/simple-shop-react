import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useCard } from '../providers/CardProvider';
const Navigation = () => {
  const { card } = useCard();
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact="true">
              home
            </NavLink>
          </li>
          <li className="cardLink">
            <NavLink to="/card" activeClassName="activeLink">
              card
            </NavLink>
            <span>{card.length}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
