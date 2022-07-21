import { useQuery, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import Layout from "../../components/Layout";
import { AdminChangeRoomAvailablity, AdminViewRoom } from "../../graphql/hotel";
import { getCookie } from "../../actions/auth";
import RoomsComponent from "../../components/Rooms";
import Admin from "../../components/auth/Admin";
import Notify from "../../components/Notify";

const ManageRoom = () => {
  const [Types, setTypes] = useState([]);
  const [RoomTypes, setRoomTypes] = useState([]);
  const HotelId = useRef("all");
  const RoomId = useRef("all");

  const { refetch, loading } = useQuery(AdminViewRoom, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => setTypes(data.adminViewRoom),
    onError: (error) => console.log(error),
  });
  let Hotels = [
    ...new Map(
      Types.map((type) => {
        return { name: type.hotel.name, Id: type.hotel.Id };
      }).map((item) => [item.name, item])
    ).values(),
  ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  const { NotifyMessage, setNotify, notify } = Notify();
  const [changeRoomAvailablity] = useMutation(AdminChangeRoomAvailablity, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.adminChangeRoomAvailablity.message,
        type: "success",
      }),
    onError: (error) =>
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
  });
  const filter = () => {
    if (HotelId.current == "all" && RoomId.current == "all") {
      setRoomTypes(Types);
      return;
    }
    if (HotelId.current != "all" && RoomId.current == "all") {
      const filteredData = Types.filter((item) => {
        return item.hotel.Id == HotelId.current;
      });
      setRoomTypes(filteredData);
      return;
    }
    if (HotelId.current == "all" && RoomId.current != "all") {
      const filteredData = Types.filter((item) => {
        return item.roomType.Id == RoomId.current;
      });
      setRoomTypes(filteredData);
      return;
    } else {
      const filteredData = Types.filter((item) => {
        return item.roomType.Id == RoomId.current;
      });
      setRoomTypes(filteredData);
    }
  };
  return (
    <Layout>
      <Admin>
        <RoomsComponent
          notify={notify}
          setNotify={setNotify}
          Types={Types}
          changeRoomAvailablity={changeRoomAvailablity}
          refetch={refetch}
          location="admin"
          Hotels={Hotels}
          filter={filter}
          HotelId={HotelId}
          RoomId={RoomId}
          RoomTypes={RoomTypes}
          setRoomTypes={setRoomTypes}
          loading={loading}
        />
      </Admin>
    </Layout>
  );
};

export default ManageRoom;
