// import React, { Fragment } from "react";
// import { Link } from "react-router-dom";

// const NavBar = ({ auth, logout }) => {
//   return (
//     <nav className="navbar">
//       <div className="container">
//         <ul className="navbar-container">
//           <li>
//             <Link className="navbar-brand" to="/">
//               Todo app
//             </Link>
//           </li>
//           {!auth.isAuthenticated && (
//             <Fragment>
//               <li>
//                 <Link className="navbar-item" to="/register">
//                   Register
//                 </Link>
//               </li>
//               <li>
//                 <Link className="navbar-item" to="/login">
//                   Login
//                 </Link>
//               </li>
//             </Fragment>
//           )}
//           {auth.isAuthenticated && (
//             <Fragment>
//               <li>
//                 <Link className="navbar-item" to="/new">
//                   New Todo
//                 </Link>
//               </li>
//               <li>
//                 <a className="navbar-item" onClick={logout}>
//                   Logout
//                 </a>
//               </li>
//             </Fragment>
//           )}
//         </ul>
//         {auth.isAuthenticated && (
//           <p className="navbar-user">Logged in as {auth.user.userName}</p>
//         )}
//       </div>
//     </nav>
//   );
// };

// // const MapDispatchToProps = (dispatch) => {
// //   return {
// //     logout:()=>dispatch(logout)
// //   };
// // };
// export default connect(MapStateToProps, { logout })(NavBar);

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logout } from "../store/actions";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function NavBar({ auth, logout }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="secondary"
            noWrap
            className={classes.toolbarTitle}
          >
            {" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button color="secondary">
                {" "}
                <HomeIcon />
                Todo
              </Button>
            </Link>
          </Typography>

          <nav>
            {!auth.isAuthenticated && (
              <nav>
                {" "}
                <Link
                  color="secondary"
                  style={{ textDecoration: "none" }}
                  to="/register"
                >
                  <Button color="primary" variant="outlined">
                    Register{" "}
                  </Button>
                </Link>
                {"   "}
                <Link
                  color="primary"
                  style={{ textDecoration: "none" }}
                  to="/login"
                >
                  <Button color="primary" variant="outlined">
                    Login
                  </Button>
                </Link>
              </nav>
            )}
            {auth.isAuthenticated && (
              <nav>
                {" "}
                <Button color="primary">
                  <AccountCircleIcon />
                  {auth.user.userName}
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  className={classes.link}
                  onClick={logout}
                >
                  Logout
                </Button>
                <Link
                  style={{ textDecoration: "none" }}
                  color="primary"
                  to="/new"
                >
                  <Fab color="primary" aria-label="add">
                    <AddIcon />
                  </Fab>
                </Link>
              </nav>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
const MapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(MapStateToProps, { logout })(NavBar);
