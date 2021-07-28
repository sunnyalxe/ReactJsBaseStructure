import {HashRouter} from 'react-router-dom'
import './Layout.css';
import Header from './Header';
import Routing from './Routing'
import {clearAll} from '../../../Helpers/Session';

function Layout (props){
  const logoutAction = () => {
    clearAll();
  }
  return (
    <HashRouter>
      <div className="page"> 
        <Header logoutAction={logoutAction} userProfile={props.userProfile}/>
        <main className="main-content-area">
          <div className="container-fluid p-0">
            <div className="inner-container">
              <Routing/>                   
            </div>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}
export default Layout;