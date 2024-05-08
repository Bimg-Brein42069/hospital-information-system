import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"

interface PrivateRouteProps {
  allowedRoles: string[];
  [x: string]: any; // for the rest of the props that we'll pass to the Route
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, ...routeProps }) => {

  const user = useSelector((state: any) => state.user.currentUser);

  if(user && user.role && allowedRoles.includes(user.role)) {
    // role allowed, render the route
    return <Route {...routeProps} />;
  }
  return <Redirect to="/sign-in" />;
}

export default PrivateRoute;