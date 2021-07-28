import {Route} from 'react-router-dom';
import RoutesArr from './RoutesArr';
const Routing = () => ( <div className="routing">
  {RoutesArr.map((row,index) => {
    return <Route key={index} exact path={row.path} component={row.component} />
  })}
  
</div>
);
export default Routing;