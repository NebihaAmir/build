import { gql } from "@apollo/client";

export const viewNewSellers = gql`
  query {
    viewNewSellers {
      Id
      firstName
      middleName
      lastName
      fullName
      phone_no
      username
      updatedAt
      createdAt
      status
      role
      logs {
        Id
        createdAt
        updatedAt
        activity
      }
    }
  }
`;
//sellerNewInfo
export const AddSeller = gql`
  mutation addNewSeller($sellerNewInfo: sellerNewInfo) {
    addNewSeller(sellerNewInfo: $sellerNewInfo) {
      message
    }
  }
`;
export const updateNewSellerInfo = gql`
  mutation updateNewSellerInfo(
    $updateSellerInfoSellerId: ID
    $updateSellerInfoSellerInfo: sellerInfo
    $updateSellerInfoPassword: String
    $updateSellerInfoUsername: String
  ) {
    updateNewSellerInfo(
      sellerId: $updateSellerInfoSellerId
      sellerInfo: $updateSellerInfoSellerInfo
      password: $updateSellerInfoPassword
      username: $updateSellerInfoUsername
    ) {
      message
    }
  }
`;
export const DeleteSeller = gql`
  mutation deleteNewSeller($deleteSellerSellerId: ID) {
    deleteNewSeller(sellerId: $deleteSellerSellerId) {
      message
    }
  }
`;

export const NewSellerLogout = gql`
  query newSellerLogout {
    newSellerLogout {
      message
    }
  }
`;
