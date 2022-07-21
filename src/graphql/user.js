import { gql } from "@apollo/client";

export const ViewUsers = gql`
  query viewUsers {
    viewUsers {
      Id
      firstName
      middleName
      lastName
      phone_no
      email
      nationality
    
      fullName
      createdAt
      logs {
        Id
        createdAt
        updatedAt
        activity
      }
    }
  }
`;
export const TotalUsers = gql`
  query totalUsers {
    totalUsers {
      total
    }
  }
`;
export const DeleteUser = gql`
  mutation($deleteUserUserId: ID) {
    deleteUser(userId: $deleteUserUserId) {
      message
    }
  }
`;