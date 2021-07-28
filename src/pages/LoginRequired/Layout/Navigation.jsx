import {NavLink} from 'react-router-dom';
import RoutesArr from './RoutesArr';
const Navigation = () => (
  <ul className="nav col-12 col-lg-auto m-auto mb-2 justify-content-center mb-md-0">
    {RoutesArr.map((row,index) => {
      return  row.menuItem && <li key={index}>
                <NavLink to={row.path} className="nav-link px-2">
                  <i className={row.className}></i>
                  {row.title}
                </NavLink>
              </li>
    })}
  </ul>);
export default Navigation;