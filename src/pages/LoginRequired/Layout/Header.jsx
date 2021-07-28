import Navigation from './Navigation';
import { NavLink } from 'react-router-dom';
import Avatar from '../../../componants/Avatar/Avatar';

const Header = (props) => {
  return (
    <header className="p-0 header-nav d-flex align-items-center h-5 flex-column">
      <div className="container-fluid p-0 header-block">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <div className="company-logo d-flex flex-column align-items-center me-5"> 
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              <img src="/asset/images/horse-icon.png" alt="" width="33" className="me-2" /> 
              <img src="/asset/images/company-logo.png" alt="" width="" /> 
            </a>
          </div>  
          <Navigation />
          <div className="header-right ms-auto d-flex align-items-center">
            <div className="dropdown text-end user-dropdown" >
              <button className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <Avatar fullName={props.userProfile.admin_name} pictureUrl = "" size="32px" fontSize="16px" ></Avatar>
                <i className="mdi mdi-chevron-down"></i>
              </button>
              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                <li><NavLink className="dropdown-item" to="/MyProfile">{props.userProfile.admin_name}</NavLink></li>
                <li><a className="dropdown-item" onClick={props.logoutAction} href="/">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
     </header>
  )
};
export default Header;