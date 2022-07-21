import { gql } from "@apollo/client";

export const ViewSellers = gql`
  query {
    newSellerViewSellers {
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

export const AddSeller = gql`
  mutation newSellerAddSeller(
    $addSellerSellerInfo: sellerInfo
    $addSellerHotelId: ID
  ) {
    newSellerAddSeller(
      sellerInfo: $addSellerSellerInfo
      hotelId: $addSellerHotelId
    ) {
      message
    }
  }
`;
export const UpdateSellerInfo = gql`
  mutation newSellerupdateSellerInfo(
    $updateSellerInfoSellerId: ID
    $updateSellerInfoHotelId: ID
    $updateSellerInfoSellerInfo: sellerInfo
    $updateSellerInfoPassword: String
    $updateSellerInfoUsername: String
  ) {
    newSellerupdateSellerInfo(
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
export const DeleteSeller = gql`
  mutation deleteSeller($deleteSellerSellerId: ID) {
    deleteSeller(sellerId: $deleteSellerSellerId) {
      message
    }
  }
`;
export const ViewHotels = gql`
  query viewHotels {
    viewHotels {
      Id
      name
    }
  }
`;

export const SellerLogout = gql`
  query sellerLogout {
    sellerLogout {
      message
    }
  }
`;
