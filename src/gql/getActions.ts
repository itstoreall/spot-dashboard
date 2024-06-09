import { gql } from '@apollo/client';

const GET_ACTIONS = gql`
  query GetActions {
    getActions {
      isUpdated
      actions {
        id
        tokenId
        token
        action
        average_price
        current_price
        prices
        percent
        status
      }
    }
  }
`;

export default GET_ACTIONS;
