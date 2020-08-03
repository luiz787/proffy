import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";

export interface RoutesProps {}

const Routes: React.SFC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
};

export default Routes;
