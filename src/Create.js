import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

function Create() {
  const [user, setUser] = useState({});
  const [newUser, setNewUser] = useState(false);
  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const CREATE_USER = gql`
    mutation CreateUser($name: String!) {
      insert_users(objects: { name: $name }) {
        returning {
          id
          name
        }
      }
    }
  `;
  const [createUser, { data }] = useMutation(CREATE_USER);
  const handleSubmit = (event) => {
    setNewUser(false);
    createUser({ variables: { ...user } }).then((resp_data) => {
      setNewUser(resp_data.data.insert_users.returning[0]);
      alert("User Inserted Successfully");
    });
    event.preventDefault();
  };

  return (
    <div>
      {newUser ? (
        <b>
          New User {newUser.name} Added Successfully, Please refresh the screen
          to view
        </b>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input onChange={handleOnChange} type="text" name="name" />
        </label>

        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default Create;
