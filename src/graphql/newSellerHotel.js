import { gql } from "@apollo/client";
//neSellerViewHotels
export const ViewHotels = gql`
  query neSellerViewHotels {
    neSellerViewHotels {
      Id
      description
      star
      name
      email
      phone_no
      address {
        lat
        long
      }
      services {
        Id
        name
        description
        updatedAt
        createdAt
        hotelId
        images {
          Id
          imageURI
          createdAt
          updatedAt
        }
      }
      rate {
        Id
        rateTotal
        rateCount
        rateAvarage
      }
      updatedAt
      createdAt
      photos {
        Id
        imageURI
        createdAt
        updatedAt
      }
      roomTypes {
        Id
        description
        name
        createdAt
        updatedAt
        hotelId
        rooms {
          Id
          floor_no
          room_no
          updatedAt
          createdAt
          available
        }
        images {
          Id
          imageURI
          createdAt
          updatedAt
        }
        roomService {
          Id
          name
          description
          price
          createdAt
          updatedAt
          icon
        }
        capacity
        price
        rate {
          Id
          rateTotal
          rateCount
          rateAvarage
        }
      }
      comments {
        Id
        body
        user {
          Id
          firstName
          lastName
          middleName
          email
          phone_no
        }
      }
      location {
        Id
        city
        wereda
        state
      }
    }
  }
`;


export const TotalHotels = gql`
  query totalHotels {
    totalHotels {
      total
    }
  }
`;
export const AddHotel = gql`
  mutation sellerAddHotel(
    $name: String
    $description: String
    $star: Int
    $location: Locations
    $address: coordinates
    $phone_no: String
    $email: String
    $image: Upload
  ) {
    sellerAddHotel(
      name: $name
      description: $description
      star: $star
      location: $location
      address: $address
      phone_no: $phone_no
      email: $email
      image: $image
    ) {
      message
    }
  }
`;
export const DeleteHotel = gql`
  mutation newSellerDeleteHotel($hotelId: ID) {
    newSellerDeleteHotel(hotelId: $hotelId) {
      message
    }
  }
`;
export const AddService = gql`
  mutation addService($addServiceServiceInfo: serviceInfo) {
    addService(serviceInfo: $addServiceServiceInfo) {
      message
    }
  }
`;
export const DeleteService = gql`
  mutation deleteService($serviceId: ID) {
    deleteService(serviceId: $serviceId) {
      message
    }
  }
`;
export const UpdateHotel = gql`
  mutation newSellerUpdateHotelInformation(
    $updateHotelInformationHotelId: ID
    $updateHotelInformationHotelInfo: hotelInfo
  ) {
    newSellerUpdateHotelInformation(
      hotelId: $updateHotelInformationHotelId
      hotelInfo: $updateHotelInformationHotelInfo
    ) {
      message
    }
  }
`;
export const GetAllRoomService = gql`
  query {
    viewRoomServices {
      Id
      name
      description
      price
      createdAt
      updatedAt
      icon
    }
  }
`;
export const HotelImageUpload = gql`
  mutation hotelImageUpload(
    $hotelImageUploadHotelId: ID
    $hotelImageUploadFile: Upload
  ) {
    hotelImageUpload(
      hotelId: $hotelImageUploadHotelId
      file: $hotelImageUploadFile
    ) {
      message
    }
  }
`;
export const DeleteHotelImage = gql`
  mutation deleteHotelImages($deleteHotelImagesId: ID) {
    deleteHotelImages(Id: $deleteHotelImagesId) {
      message
    }
  }
`;
export const DeleteRoomType = gql`
  mutation deleteRoomType($deleteRoomTypeRoomTypeId: ID) {
    deleteRoomType(roomTypeId: $deleteRoomTypeRoomTypeId) {
      message
    }
  }
`;

export const DeleteRoomTypeImage = gql`
  mutation deleteRoomImages($deleteRoomImagesId: ID) {
    deleteRoomImages(Id: $deleteRoomImagesId) {
      message
    }
  }
`;
export const UploadRoomTypeImage = gql`
  mutation roomTypeImageUpload(
    $roomTypeImageUploadFile: Upload
    $roomTypeImageUploadRoomTypeId: ID
  ) {
    roomTypeImageUpload(
      file: $roomTypeImageUploadFile
      roomTypeId: $roomTypeImageUploadRoomTypeId
    ) {
      message
    }
  }
`;
export const DeleteRoom = gql`
  mutation deleteRoom($deleteRoomRoomId: ID) {
    deleteRoom(roomId: $deleteRoomRoomId) {
      message
    }
  }
`;
export const AddRoom = gql`
  mutation addRoom($addRoomRoomInfo: roomInfo) {
    addRoom(roomInfo: $addRoomRoomInfo) {
      message
    }
  }
`;
export const UpdateRoomInfo = gql`
  mutation updateRoom(
    $updateRoomFloorNo: Int
    $updateRoomRoomNo: String
    $updateRoomRoomId: ID
    $updateRoomHotelId: ID
  ) {
    updateRoom(
      floor_no: $updateRoomFloorNo
      room_no: $updateRoomRoomNo
      roomId: $updateRoomRoomId
      hotelId: $updateRoomHotelId
    ) {
      message
    }
  }
`;
export const AddServiceToRoom = gql`
  mutation addRoomServiceToRoom(
    $addRoomServiceToRoomRoomServiceId: String
    $addRoomServiceToRoomRoomTypeId: ID
  ) {
    addRoomServiceToRoom(
      roomServiceId: $addRoomServiceToRoomRoomServiceId
      roomTypeId: $addRoomServiceToRoomRoomTypeId
    ) {
      message
    }
  }
`;
export const UpdateHotelService = gql`
  mutation updateHotelService(
    $updateHotelServiceServiceId: ID
    $updateHotelServiceName: String
    $updateHotelServiceDescription: String
  ) {
    updateHotelService(
      serviceId: $updateHotelServiceServiceId
      name: $updateHotelServiceName
      description: $updateHotelServiceDescription
    ) {
      message
    }
  }
`;
export const AddRoomCatagory = gql`
  mutation addRoomType($addRoomTypeRoomTypeInfo: roomTypeInfo) {
    addRoomType(roomTypeInfo: $addRoomTypeRoomTypeInfo) {
      message
    }
  }
`;
export const UpdateRoomCatagory = gql`
  mutation updateRoomCatagory(
    $updateRoomCatagoryName: String
    $updateRoomCatagoryCapacity: Int
    $updateRoomCatagoryPrice: Float
    $updateRoomCatagoryCatagoryId: ID
    $updateRoomCatagoryDescription: String
  ) {
    updateRoomCatagory(
      name: $updateRoomCatagoryName
      capacity: $updateRoomCatagoryCapacity
      catagoryId: $updateRoomCatagoryCatagoryId
      description: $updateRoomCatagoryDescription
      price: $updateRoomCatagoryPrice
    ) {
      message
    }
  }
`;
export const DeleteCatagoryService = gql`
  mutation ($deleteCatagoryServiceServiceId: ID) {
    deleteCatagoryService(serviceId: $deleteCatagoryServiceServiceId) {
      message
    }
  }
`;
export const UpdateCatagoryService = gql`
  mutation (
    $updateCatagoryServiceRoomServiceInfo: roomServiceInfo
    $updateCatagoryServiceServiceId: ID
  ) {
    updateCatagoryService(
      roomServiceInfo: $updateCatagoryServiceRoomServiceInfo
      serviceId: $updateCatagoryServiceServiceId
    ) {
      message
    }
  }
`;
export const AddCatagoryService = gql`
  mutation ($addRoomServiceRoomServiceInfo: roomServiceInfo) {
    addRoomService(roomServiceInfo: $addRoomServiceRoomServiceInfo) {
      message
    }
  }
`;
export const DeleteHotelServiceImage = gql`
  mutation ($deleteHotelServiceimageId: ID) {
    deleteHotelServiceimage(Id: $deleteHotelServiceimageId) {
      message
    }
  }
`;
export const UploadHotelServiceImage = gql`
  mutation (
    $hotelServiceImageUploadFile: Upload
    $hotelServiceImageUploadServiceId: ID
  ) {
    hotelServiceImageUpload(
      file: $hotelServiceImageUploadFile
      serviceId: $hotelServiceImageUploadServiceId
    ) {
      message
    }
  }
`;
export const ViewRoom = gql`
  query {
    viewRoom {
      Id
      available
      floor_no
      room_no
      createdAt
      hotel {
        name
        Id
      }
      roomType {
        Id
        name
        description
        capacity
        price
        createdAt
      }
    }
  }
`;
export const AdminViewRoom = gql`
  query {
    adminViewRoom {
      Id
      available
      floor_no
      room_no
      createdAt
      hotel {
        name
        Id
      }
      roomType {
        Id
        name
        description
        capacity
        price
        createdAt
      }
    }
  }
`;
export const ChangeRoomAvailablity = gql`
  mutation ($roomId: ID) {
    changeRoomAvailablity(roomId: $roomId) {
      message
    }
  }
`;
export const AdminChangeRoomAvailablity = gql`
  mutation ($roomId: ID) {
    adminChangeRoomAvailablity(roomId: $roomId) {
      message
    }
  }
`;
