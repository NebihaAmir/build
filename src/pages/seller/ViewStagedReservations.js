import { useQuery } from "@apollo/client";
import { useState } from "react";
import Layout from "../../components/Layout";
import StagedReservationsComponent from "../../components/StagedReservationsComponent";
import { ViewStagedReservation } from "../../graphql/reservationAndBooking";
import Seller from "../../components/auth/Seller";
import { getCookie } from "../../actions/auth";
const SellerViewStagedReservation = () => {
  const [StagedReservations, setStagedReservations] = useState([]);
  const { loading } = useQuery(ViewStagedReservation, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) =>
      setStagedReservations(data.sellerViewStagedReservations),
    onError: (error) => console.log(error),
  });
  return (
    <Layout>
      <Seller>
        <StagedReservationsComponent
          StagedReservations={StagedReservations}
          loading={loading}
        />
      </Seller>
    </Layout>
  );
};

export default SellerViewStagedReservation;
