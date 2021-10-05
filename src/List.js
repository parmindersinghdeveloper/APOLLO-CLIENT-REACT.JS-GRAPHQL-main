import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";

const GET_CATEGORIES = gql`
  {
    users(limit: 5, order_by: { timestamp: desc }) {
      id
      name
      timestamp
    }
  }
`;
const DELETE_USER = gql`
  mutation Delete_usersMutation($id: uuid!) {
    delete_users(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
function List() {
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const handleOnDelete = (product) => {
    if (window.confirm("Are you sure ?")) {
      deleteUser({ variables: { id: product.id } }).then((resp) => {
        refetch();
        alert("User deleted successfully");
      });
    }
  };
  return (
    <div className="List">
      {data?.users.map((product) => (
        <p key={product.id}>
          {product.name}{" "}
          <button
            onClick={() => {
              handleOnDelete(product);
            }}
          >
            Delete
          </button>
        </p>
      ))}
    </div>
  );
}

export default List;
