import {gql} from '@apollo/client'
export const AdminLogin = gql`
  query adminLogin($adminLoginUsername: String, $adminLoginPassword: String) {
    adminLogin(username: $adminLoginUsername, password: $adminLoginPassword) {
      Id
      firstName
      lastName
      middleName
      token
      phone_no
      username
      updatedAt
      role
      createdAt
    }
  }
`;
export const SellerLogin = gql`
  query sellerLogin(
    $sellerLoginUsername: String
    $sellerLoginPassword: String
  ) {
    sellerLogin(
      username: $sellerLoginUsername
      password: $sellerLoginPassword
    ) {
      Id
      firstName
      lastName
      middleName
      token
      phone_no
      username
      role
    }
  }
`;
export const NeweSellerLogin = gql`
  query newSellerLogin(
    $sellerLoginUsername: String
    $sellerLoginPassword: String
  ) {
    newSellerLogin(
      username: $sellerLoginUsername
      password: $sellerLoginPassword
    ) {
      Id
      firstName
      lastName
      middleName
      token
      phone_no
      username
      role
    }
  }
`;