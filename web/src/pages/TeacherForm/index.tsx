import React, { FunctionComponent } from "react";
import PageHeader from "../../components/PageHeader";

export interface TeacherFormProps {}

const TeacherForm: FunctionComponent<TeacherFormProps> = () => {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="Que bom que você quer dar aulas!" />
    </div>
  );
};

export default TeacherForm;
