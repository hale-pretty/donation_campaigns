import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($request: UserRegisterRequest!) {
    register(request: $request) {
      id
      username
      email
      firstName
      lastName
      avatarUrl
      bio
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
