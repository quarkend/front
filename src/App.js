import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";

// import Topbar from "./components/topbar/Topbar";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  // admin: JSON.parse(localStorage.getItem("admin")) || null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAdmin: true,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "X":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem('token') || null)
    if (user && token) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])
  return (
    <Router>
      <AuthContext.Provider
        value={{
          state,
          dispatch
        }}
      >
      
        {/* <div className="App">{!state.isAuthenticated ? <Login/> : <Home/>}</div> */}
        <Switch>
         <Route exact path ="/" ><Home/></Route>
          {/* <Route exact path="/">
            {state.isAuthenticated ? <Home /> : <Register />}
          </Route>
          <Route path="/login">{state.isAuthenticated ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {state.isAuthenticated ? <Redirect to="/" /> : <Register />}
          </Route> */}
       
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}
export default App;
