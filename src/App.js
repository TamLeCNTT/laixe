import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import Calendar from "./Component/Cabin/Calendar ";
import Cabin_add from "./Component/Cabin/Cabin_add";
import Cabin_edit from "./Component/Cabin/Cabin_edit";
import Login from "./Component/Page/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Home from "./Component/Page/Home";
import Cabin_list from "./Component/Cabin/Cabin_list";
import Giaovien_List from "./Component/giaovien/Giaovien_List";
import Cohuu_List from "./Component/cohuu/Cohuu_List";
import Student_List from "./Component/student/Student_List";
import Session_List from "./Component/Session/Session_List";
import ThuChi_List from "./Component/ThuChi/ThuChi_List";
import CheckError from "./Component/cohuu/CheckError";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* <Route path="/cabin/test" element={<Test />} />{" "} */}
            <Route path="/cabin/show" element={<Calendar />} />
            <Route path="/cabin/add" element={<Cabin_add />} />
            <Route path="/cabin/edit/:id" element={<Cabin_edit />} />
            <Route path="/cabin/list" element={<Cabin_list />} />
            {/* ThuChi */}
            <Route path="/thuchi/list" element={<ThuChi_List />} />
            {/* Student */}
            <Route path="/student/list" element={<Student_List />} />
            {/* Giaovien */}

            <Route path="/giaovien/list" element={<Giaovien_List />} />

            <Route path="/session/list" element={<Session_List />} />
            {/* CoHuu */}
            <Route path="/cohuu/list" element={<Cohuu_List />} />
            <Route path="/cohuu/error" element={<CheckError />} />
            <Route path="/" element={<Home />} />
            {/* user */}
            <Route path="/login" element={<Login />} />
          </Routes>{" "}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </header>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
