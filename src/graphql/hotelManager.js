import { gql } from "@apollo/client";

export const AddHotelManager = gql`
  mutation addHotelManager(
    $addSellerSellerInfo: sellerInfo
    $addSellerHotelId: ID
  ) {
    addHotelManager(
      sellerInfo: $addSellerSellerInfo
      hotelId: $addSellerHotelId
    ) {
      message
    }
  }
`;
export const HotelManagerAddSeller = gql`
  mutation hotelManagerAddSeller($addSellerSellerInfo: sellerInfo) {
    hotelManagerAddSeller(sellerInfo: $addSellerSellerInfo) {
      message
    }
  }
`;
export const DeleteHotelManager = gql`
  mutation deleteHotelManager($deleteSellerSellerId: ID) {
    deleteHotelManager(hMId: $deleteSellerSellerId) {
      message
    }
  }
`;
export const HotelManagerDeleteSeller = gql`
  mutation hotelManagerDeleteSeller($deleteSellerSellerId: ID) {
    hotelManagerDeleteSeller(sellerId: $deleteSellerSellerId) {
      message
    }
  }
`;
export const ViewHotelManagers = gql`
  query {
    viewHotelManagers {
      Id
      firstName
      middleName
      lastName
      fullName
      phone_no
      username
      hotelId
      updatedAt
      createdAt
      status
      role
      hotel {
        name
      }
      logs {
        Id
        createdAt
        updatedAt
        activity
      }
    }
  }
`;
export const HotelManagerViewSellers = gql`
  query {
    hotelManagerViewSellers {
      Id
      firstName
      middleName
      lastName
      fullName
      phone_no
      username
      hotelId
      updatedAt
      createdAt
      status
      role
      hotel {
        name
      }
      logs {
        Id
        createdAt
        updatedAt
        activity
      }
    }
  }
`;
export const UpdateHotelManagerInfo = gql`
  mutation updateHotelManagerInfo(
    $updateSellerInfoSellerId: ID
    $updateSellerInfoHotelId: ID
    $updateSellerInfoSellerInfo: sellerInfo
    $updateSellerInfoPassword: String
    $updateSellerInfoUsername: String
  ) {
    updateHotelManagerInfo(
      sellerId: $updateSellerInfoSellerId
      hotelId: $updateSellerInfoHotelId
      sellerInfo: $updateSellerInfoSellerInfo
      password: $updateSellerInfoPassword
      username: $updateSellerInfoUsername
    ) {
      message
    }
  }
`;
export const HotelManagerUpdateSellerInfo = gql`
  mutation hotelManagerUpdateSellerInfo(
    $updateSellerInfoSellerId: ID
    $updateSellerInfoSellerInfo: sellerInfo
    $updateSellerInfoPassword: String
    $updateSellerInfoUsername: String
  ) {
    hotelManagerUpdateSellerInfo(
      sellerId: $updateSellerInfoSellerId
      sellerInfo: $updateSellerInfoSellerInfo
      password: $updateSellerInfoPassword
      username: $updateSellerInfoUsername
    ) {
      message
    }
  }
`;
