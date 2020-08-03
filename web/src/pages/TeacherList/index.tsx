import React, { FunctionComponent } from "react";

import "./styles.css";
import PageHeader from "../../components/PageHeader";

export interface TeacherListProps {}

const TeacherList: FunctionComponent<TeacherListProps> = () => {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis." />
    </div>
  );
};

export default TeacherList;
