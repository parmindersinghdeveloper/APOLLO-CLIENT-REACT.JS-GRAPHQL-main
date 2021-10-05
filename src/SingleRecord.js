import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
const GET_CATEGORY = gql`
  query UserByPK($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
    }
  }
`;

const SingleRecord = ({ id }) => {
  const { data } = useQuery(GET_CATEGORY, { variables: { id } });
  if (data && data.users_by_pk) {
    const { id, name, slug } = data.users_by_pk;
    return (
      <div>
        <h2>Details</h2>
        <p>Id: {id} </p>
        <p>name: {name} </p>
      </div>
    );
  }

  return null;
};

export default SingleRecord;
