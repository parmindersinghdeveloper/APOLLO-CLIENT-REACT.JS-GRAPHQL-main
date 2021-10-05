import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_CATEGORY = gql`
  query UserByPK($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
    }
  }
`;
const UPDATE_USER = gql`
  mutation Update_usersMutation($id: uuid!, $name: String!) {
    update_users(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

const Update = ({ id }) => {
  const { data, refetch } = useQuery(GET_CATEGORY, { variables: { id } });
  const [user, setUser] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);

  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    updateUser({
      variables: { id: data.users_by_pk.id, name: user.name },
    }).then((resp_data) => {
      refetch();
      alert("User Updated Successfully");
    });
    event.preventDefault();
  };
  useEffect(() => {}, [user]);
  if (data && data.users_by_pk) {
    const { id, name, slug } = data.users_by_pk;

    return (
      <div>
        <h2>Details</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name: ({name})
            <input onChange={handleOnChange} type="text" name="name" />
          </label>

          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }

  return null;
};

export default Update;
