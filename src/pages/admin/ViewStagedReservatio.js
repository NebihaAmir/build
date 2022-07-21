import { useQuery } from "@apollo/client";
import { useState } from "react";
import Admin from "../../components/auth/Admin";
import Layout from "../../components/Layout";
import StagedReservationsComponent from "../../components/StagedReservationsComponent";
import { StagedReservation } from "../../graphql/reservationAndBooking";
const ViewStagedReservatio = () => {
  const [StagedReservations, setStagedReservations] = useState([]);

  const { loading } = useQuery(StagedReservation, {
    
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => setStagedReservations(data.viewStagedReservations),
    onError: (error) => console.log(error),
  });

  return (
    <Layout>
      <Admin>
        <StagedReservationsComponent
          StagedReservations={StagedReservations}
          loading={loading}
        />
      </Admin>
    </Layout>
  );
};

export default ViewStagedReservatio;
