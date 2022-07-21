import { gql } from "@apollo/client";

export const ViewSellerHotels = gql`
  query viewSellerHotels($sellerId: ID) {
    viewSellerHotels(sellerId: $sellerId) {
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
export const HotelManagerViewHotels = gql`
  query hotelManagerViewHotels {
    hotelManagerViewHotels {
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
export const ViewHotels = gql`
  query viewHotels {
    viewHotels {
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
  mutation addHotel(
    $name: String
    $description: String
    $star: Int
    $location: Locations
    $address: coordinates
    $phone_no: String
    $email: String
    $image: Upload
  ) {
    addHotel(
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
  mutation deleteHotel($hotelId: ID) {
    deleteHotel(hotelId: $hotelId) {
      message
    }
  }
`;
//sellerAddService
export const AddService = gql`
  mutation addService($addServiceServiceInfo: serviceInfo) {
    addService(serviceInfo: $addServiceServiceInfo) {
      message
    }
  }
`;
//hotelManagerAddService
export const HotelMangerAddService = gql`
  mutation hotelManagerAddService($addServiceServiceInfo: serviceInfo) {
    hotelManagerAddService(serviceInfo: $addServiceServiceInfo) {
      message
    }
  }
`;
export const SellerAddService = gql`
  mutation sellerAddService($addServiceServiceInfo: serviceInfo) {
    sellerAddService(serviceInfo: $addServiceServiceInfo) {
      message
    }
  }
`;
//hotelManagerDeleteService
export const HotelManagerDeleteService = gql`
  mutation hotelManagerDeleteService($serviceId: ID) {
    hotelManagerDeleteService(serviceId: $serviceId) {
      message
    }
  }
`;
//sellerDeleteService
export const SellerDeleteService = gql`
  mutation sellerDeleteService($serviceId: ID) {
    sellerDeleteService(serviceId: $serviceId) {
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
/*

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
*/
export const SellerUpdateHotel = gql`
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
export const HotelManagerUpdateHotel = gql`
  mutation hotelManagerUpdateHotelInformation(
    $updateHotelInformationHotelId: ID
    $updateHotelInformationHotelInfo: hotelInfo
  ) {
    hotelManagerUpdateHotelInformation(
      hotelId: $updateHotelInformationHotelId
      hotelInfo: $updateHotelInformationHotelInfo
    ) {
      message
    }
  }
`;
export const UpdateHotel = gql`
  mutation updateHotelInformation(
    $updateHotelInformationHotelId: ID
    $updateHotelInformationHotelInfo: hotelInfo
  ) {
    updateHotelInformation(
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
//hotelManagerHotelImageUpload
export const HotelManagerHotelImageUpload = gql`
  mutation hotelManagerHotelImageUpload(
    $hotelImageUploadHotelId: ID
    $hotelImageUploadFile: Upload
  ) {
    hotelManagerHotelImageUpload(
      hotelId: $hotelImageUploadHotelId
      file: $hotelImageUploadFile
    ) {
      message
    }
  }
`;
//sellerHotelImageUpload
export const SellerHotelImageUpload = gql`
  mutation sellerHotelImageUpload(
    $hotelImageUploadHotelId: ID
    $hotelImageUploadFile: Upload
  ) {
    sellerHotelImageUpload(
      hotelId: $hotelImageUploadHotelId
      file: $hotelImageUploadFile
    ) {
      message
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
//hotelMangerDeleteHotelImages
export const HotelMangerDeleteHotelImage = gql`
  mutation hotelMangerDeleteHotelImages($deleteHotelImagesId: ID) {
    hotelMangerDeleteHotelImages(Id: $deleteHotelImagesId) {
      message
    }
  }
`;
//hotelManagerDeleteHotelImages
export const HotelManagerDeleteHotelImage = gql`
  mutation hotelManagerDeleteHotelImages($deleteHotelImagesId: ID) {
    hotelManagerDeleteHotelImages(Id: $deleteHotelImagesId) {
      message
    }
  }
`;
//sellerDeleteHotelImages
export const SellerDeleteHotelImage = gql`
  mutation sellerDeleteHotelImages($deleteHotelImagesId: ID) {
    sellerDeleteHotelImages(Id: $deleteHotelImagesId) {
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
//hotelManagerDeleteRoomType
export const HotelManagerDeleteRoomType = gql`
  mutation hotelManagerDeleteRoomType($deleteRoomTypeRoomTypeId: ID) {
    hotelManagerDeleteRoomType(roomTypeId: $deleteRoomTypeRoomTypeId) {
      message
    }
  }
`;
//sellerDeleteRoomType
export const SellerDeleteRoomType = gql`
  mutation sellerDeleteRoomType($deleteRoomTypeRoomTypeId: ID) {
    sellerDeleteRoomType(roomTypeId: $deleteRoomTypeRoomTypeId) {
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
//sellerDeleteRoomImages//
//hotelManagerDeleteRoomImages
export const HotelManagerDeleteRoomTypeImage = gql`
  mutation hotelManagerDeleteRoomImages($deleteRoomImagesId: ID) {
    hotelManagerDeleteRoomImages(Id: $deleteRoomImagesId) {
      message
    }
  }
`;
export const SellerDeleteRoomTypeImage = gql`
  mutation sellerDeleteRoomImages($deleteRoomImagesId: ID) {
    sellerDeleteRoomImages(Id: $deleteRoomImagesId) {
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
//hotelManagerRoomTypeImageUpload

//sellerRoomTypeImageUpload
export const HotelManagerUploadRoomTypeImage = gql`
  mutation hotelManagerRoomTypeImageUpload(
    $roomTypeImageUploadFile: Upload
    $roomTypeImageUploadRoomTypeId: ID
  ) {
    hotelManagerRoomTypeImageUpload(
      file: $roomTypeImageUploadFile
      roomTypeId: $roomTypeImageUploadRoomTypeId
    ) {
      message
    }
  }
`;
export const SellerUploadRoomTypeImage = gql`
  mutation sellerRoomTypeImageUpload(
    $roomTypeImageUploadFile: Upload
    $roomTypeImageUploadRoomTypeId: ID
  ) {
    sellerRoomTypeImageUpload(
      file: $roomTypeImageUploadFile
      roomTypeId: $roomTypeImageUploadRoomTypeId
    ) {
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
//hotelManagerDeleteRoom
export const HotelManagerDeleteRoom = gql`
  mutation hotelManagerDeleteRoom($deleteRoomRoomId: ID) {
    hotelManagerDeleteRoom(roomId: $deleteRoomRoomId) {
      message
    }
  }
`;
//sellerDeleteRoom
export const SellerDeleteRoom = gql`
  mutation sellerDeleteRoom($deleteRoomRoomId: ID) {
    sellerDeleteRoom(roomId: $deleteRoomRoomId) {
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
//hotelManagerAddRoom
export const HotleManagerAddRoom = gql`
  mutation hotelManagerAddRoom($addRoomRoomInfo: roomInfo) {
    hotelManagerAddRoom(roomInfo: $addRoomRoomInfo) {
      message
    }
  }
`;
//sellerAddRoom
export const SellerAddRoom = gql`
  mutation sellerAddRoom($addRoomRoomInfo: roomInfo) {
    sellerAddRoom(roomInfo: $addRoomRoomInfo) {
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
//hotelManagerUpdateRoom
export const HotelManagerUpdateRoomInfo = gql`
  mutation hotelManagerUpdateRoom(
    $updateRoomFloorNo: Int
    $updateRoomRoomNo: String
    $updateRoomRoomId: ID
    $updateRoomHotelId: ID
  ) {
    hotelManagerUpdateRoom(
      floor_no: $updateRoomFloorNo
      room_no: $updateRoomRoomNo
      roomId: $updateRoomRoomId
      hotelId: $updateRoomHotelId
    ) {
      message
    }
  }
`;
//sellerUpdateRoom
export const SellerUpdateRoomInfo = gql`
  mutation sellerUpdateRoom(
    $updateRoomFloorNo: Int
    $updateRoomRoomNo: String
    $updateRoomRoomId: ID
    $updateRoomHotelId: ID
  ) {
    sellerUpdateRoom(
      floor_no: $updateRoomFloorNo
      room_no: $updateRoomRoomNo
      roomId: $updateRoomRoomId
      hotelId: $updateRoomHotelId
    ) {
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
//hotelManagerAddRoomServiceToRoom
export const HotelManagerAddServiceToRoom = gql`
  mutation hotelManagerAddRoomServiceToRoom(
    $addRoomServiceToRoomRoomServiceId: String
    $addRoomServiceToRoomRoomTypeId: ID
  ) {
    hotelManagerAddRoomServiceToRoom(
      roomServiceId: $addRoomServiceToRoomRoomServiceId
      roomTypeId: $addRoomServiceToRoomRoomTypeId
    ) {
      message
    }
  }
`;
//sellerAddRoomServiceToRoom
export const SellerAddServiceToRoom = gql`
  mutation sellerAddRoomServiceToRoom(
    $addRoomServiceToRoomRoomServiceId: String
    $addRoomServiceToRoomRoomTypeId: ID
  ) {
    sellerAddRoomServiceToRoom(
      roomServiceId: $addRoomServiceToRoomRoomServiceId
      roomTypeId: $addRoomServiceToRoomRoomTypeId
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
//sellerUpdateHotelService
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
//hotelMangerUpdateHotelService
export const HotelMangerUpdateHotelService = gql`
  mutation hotelMangerUpdateHotelService(
    $updateHotelServiceServiceId: ID
    $updateHotelServiceName: String
    $updateHotelServiceDescription: String
  ) {
    hotelMangerUpdateHotelService(
      serviceId: $updateHotelServiceServiceId
      name: $updateHotelServiceName
      description: $updateHotelServiceDescription
    ) {
      message
    }
  }
`;
export const SellerUpdateHotelService = gql`
  mutation sellerUpdateHotelService(
    $updateHotelServiceServiceId: ID
    $updateHotelServiceName: String
    $updateHotelServiceDescription: String
  ) {
    sellerUpdateHotelService(
      serviceId: $updateHotelServiceServiceId
      name: $updateHotelServiceName
      description: $updateHotelServiceDescription
    ) {
      message
    }
  }
`;
//hotelManagerAddRoomType
export const HotelManagerAddRoomCatagory = gql`
  mutation hotelManagerAddRoomType($addRoomTypeRoomTypeInfo: roomTypeInfo) {
    hotelManagerAddRoomType(roomTypeInfo: $addRoomTypeRoomTypeInfo) {
      message
    }
  }
`;
//sellerAddRoomType
export const SellerAddRoomCatagory = gql`
  mutation sellerAddRoomType($addRoomTypeRoomTypeInfo: roomTypeInfo) {
    sellerAddRoomType(roomTypeInfo: $addRoomTypeRoomTypeInfo) {
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
//hotelManagerUpdateRoomCatagory
export const HotelManagerUpdateRoomCatagory = gql`
  mutation hotelManagerUpdateRoomCatagory(
    $updateRoomCatagoryName: String
    $updateRoomCatagoryCapacity: Int
    $updateRoomCatagoryPrice: Float
    $updateRoomCatagoryCatagoryId: ID
    $updateRoomCatagoryDescription: String
  ) {
    hotelManagerUpdateRoomCatagory(
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
//sellerUpdateRoomCatagory
export const SellerUpdateRoomCatagory = gql`
  mutation sellerUpdateRoomCatagory(
    $updateRoomCatagoryName: String
    $updateRoomCatagoryCapacity: Int
    $updateRoomCatagoryPrice: Float
    $updateRoomCatagoryCatagoryId: ID
    $updateRoomCatagoryDescription: String
  ) {
    sellerUpdateRoomCatagory(
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
//sellerDeleteHotelServiceimage
export const DeleteHotelServiceImage = gql`
  mutation ($deleteHotelServiceimageId: ID) {
    deleteHotelServiceimage(Id: $deleteHotelServiceimageId) {
      message
    }
  }
`;
//hotelManagerDeleteHotelServiceimage
export const HoteleManagerDeleteHotelServiceImage = gql`
  mutation ($deleteHotelServiceimageId: ID) {
    hotelManagerDeleteHotelServiceimage(Id: $deleteHotelServiceimageId) {
      message
    }
  }
`;
export const SellerDeleteHotelServiceImage = gql`
  mutation ($deleteHotelServiceimageId: ID) {
    sellerDeleteHotelServiceimage(Id: $deleteHotelServiceimageId) {
      message
    }
  }
`;
//hotelServiceImageUpload
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
//hotelManagerHotelServiceImageUpload
export const HotelMangerUploadHotelServiceImage = gql`
  mutation (
    $hotelServiceImageUploadFile: Upload
    $hotelServiceImageUploadServiceId: ID
  ) {
    hotelManagerHotelServiceImageUpload(
      file: $hotelServiceImageUploadFile
      serviceId: $hotelServiceImageUploadServiceId
    ) {
      message
    }
  }
`;
export const SellerUploadHotelServiceImage = gql`
  mutation (
    $hotelServiceImageUploadFile: Upload
    $hotelServiceImageUploadServiceId: ID
  ) {
    sellerHotelServiceImageUpload(
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
