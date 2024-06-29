import { gql } from '@apollo/client';

const UPDATE_ACTION = gql`
  mutation updateAction($id: ID!, $input: ActionInput!) {
    updateAction(id: $id, input: $input) {
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

export default UPDATE_ACTION;
