import { useQuery, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import Seller from "../../components/auth/Seller";
import Layout from "../../components/Layout";
import { ChangeRoomAvailablity, ViewRoom } from "../../graphql/hotel";
import RoomsComponent from "../../components/Rooms";

import { getCookie, userSessionExpired } from "../../actions/auth";

import { withRouter } from "react-router-dom";
import SellerSignout from "../../actions/signout";
import Notify from "../../components/Notify";

const Room = ({ history }) => {
  const [Types, setTypes] = useState([]);
  const [RoomTypes, setRoomTypes] = useState([]);
  const RoomId = useRef("all");
  const { NotifyMessage, notify, setNotify } = Notify();
  const { refetch, loading } = useQuery(ViewRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },

    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => setTypes(data.viewRoom),
    onError: (error) => userSessionExpired(error, history, sellerLogout),
  });
  const { sellerLogout } = SellerSignout();
  const [changeRoomAvailablity] = useMutation(ChangeRoomAvailablity, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.changeRoomAvailablity.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
  });
  const filter = () => {
    if (RoomId.current == "all") {
      setRoomTypes(Types);
      return;
    }
    const filteredData = Types.filter((item) => {
      return item.roomType.Id == RoomId.current;
    });
    setRoomTypes(filteredData);
  };

  return (
    <Layout>
      <Seller>
        <RoomsComponent
          notify={notify}
          setNotify={setNotify}
          Types={Types}
          changeRoomAvailablity={changeRoomAvailablity}
          refetch={refetch}
          RoomTypes={RoomTypes}
          setRoomTypes={setRoomTypes}
          filter={filter}
          RoomId={RoomId}
          loading={loading}
        />
      </Seller>
    </Layout>
  );
};

export default withRouter(Room);
