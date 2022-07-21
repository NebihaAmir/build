
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NewSellerLogout } from "../graphql/newSaller";
import { getCookie } from "./auth";
export default function NewSellerSignout() {
  const history = useHistory();
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(getCookie("token"));
  }, []);
  const [newSellerLogout] = useLazyQuery(NewSellerLogout, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      history.push("/dashboard/newSellers/signin");
    },
    onError: (error) => console.log(error),
  });
  return { newSellerLogout };
}
