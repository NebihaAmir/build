import { gql } from "@apollo/client";
export const ViewResievtionForSeller = gql`
  query viewSellerResevition($sellerId: ID) {
    viewSellerResevition(sellerId: $sellerId) {
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
export const ViewSellersForSeller = gql`
  query viewSellersForSeller($sellerId: ID) {
    viewSellersForSeller(sellerId: $sellerId) {
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


export const ViewSellers = gql`
  query {
    viewSellers {
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
  mutation addSeller($addSellerSellerInfo: sellerInfo, $addSellerHotelId: ID) {
    addSeller(sellerInfo: $addSellerSellerInfo, hotelId: $addSellerHotelId) {
      message
    }
  }
`;
export const UpdateSellerInfo = gql`
  mutation updateSellerInfo(
    $updateSellerInfoSellerId: ID
    $updateSellerInfoHotelId: ID
    $updateSellerInfoSellerInfo: sellerInfo
    $updateSellerInfoPassword: String
    $updateSellerInfoUsername: String
  ) {
    updateSellerInfo(
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
