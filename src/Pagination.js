import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

function Pagination() {
  const GET_CATEGORIES = gql`
    query Users($limit: Int) {
      users(limit: $limit) {
        id
        name
      }
    }
  `;
  const [getCategories, { loading, error, data }] =
    useLazyQuery(GET_CATEGORIES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  function onChangeLimit(e) {
    getCategories({ variables: { limit: Number(e.target.value) } });
  }

  return (
    <div className="App">
      {data?.users.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
      <select name="product" onChange={onChangeLimit}>
        <option key="1" value="1">
          1
        </option>
        <option key="2" value="2">
          2
        </option>
        <option key="3" value="3">
          3
        </option>
        <option key="4" value="4">
          4
        </option>
        <option key="5" value="5">
          5
        </option>
      </select>
    </div>
  );
}

export default Pagination;
