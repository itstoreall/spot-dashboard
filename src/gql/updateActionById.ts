import { gql } from '@apollo/client';

const UPDATE_ACTION_BY_ID = gql`
  mutation updateActionById($id: ID!, $input: ActionInput!) {
    updateActionById(id: $id, input: $input) {
      isUpdated
      time
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
        updatedAt
      }
    }
  }
`;

export default UPDATE_ACTION_BY_ID;
