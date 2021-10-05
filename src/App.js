import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Pagination from "./Pagination";
import List from "./List";
import SingleRecord from "./SingleRecord";
import Create from "./Create";
import Update from "./Update";

function App() {
  return (
    <div>
      <b>Records using filter component</b>
      <Pagination></Pagination>
      <hr />
      <b>List of records component</b>
      <List></List>
      <hr />

      <b>Single Record Detail component</b>
      <SingleRecord id="bea25eb8-9136-47b6-92a4-7ac2ec0dd45b"></SingleRecord>
      <hr />

      <b>Create New Record component</b>
      <Create></Create>
      <hr />
      <b>Update Record component</b>
      <Update id="bea25eb8-9136-47b6-92a4-7ac2ec0dd45b"></Update>
    </div>
  );
}

export default App;
