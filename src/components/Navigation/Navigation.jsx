import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useCard } from '../../providers/CardProvider';
import { useAuth } from '../../providers/AuthProvider';
const Navigation = () => {
  const { card } = useCard();
  const userData = useAuth();
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <div>Saheb shopping</div>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact>
              home
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className="cardLink">
            <NavLink to="/card" activeClassName="activeLink">
              Card
            </NavLink>
            <span>{card.length}</span>
          </li>
          <li>
            <NavLink
              to={userData ? '/profile' : '/login'}
              activeClassName="activeLink"
            >
              {userData ? 'profile' : 'login / signup'}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
