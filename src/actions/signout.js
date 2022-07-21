import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SellerLogout } from "../graphql/seller";
import { getCookie } from "./auth";

export default function SellerSignout() {
  const history = useHistory();
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(getCookie("token"));
  }, []);
  const [sellerLogout] = useLazyQuery(SellerLogout, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      history.push("/dashboard/signin");
    },
    onError: (error) => console.log(error),
  });
  return { sellerLogout };
}
