import React from "react";
import TableList from "../../components/CRUD/TableList";
import FormAdd from "../../components/CRUD/FormAdd";

export default function Dashboard() {
  return (
    <>
      <div className="container py-3 mt-20">
        <h2 className="text-2xl font-semibold text-primary mb-10">List User</h2>
        <TableList></TableList>

        <FormAdd></FormAdd>
      </div>
    </>
  );
}
