import {
  ApolloQueryResult,
  OperationVariables
} from '@apollo/client/core/types';
import * as ge from '../enum/global';

export type IntelDateTimeFormat = Intl.DateTimeFormatOptions;

export type Action = {
  tokenId: number;
  token: string;
  action: ge.Process;
  average_price: number;
  current_price: number;
  prices: number[];
  percent: number;
  status: ge.ProcessStatus;
};

export type DashboardProps = {
  data: { isUpdated: boolean; actions: Action[] };
  refetchActions: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
};

export type TokenListProps = Pick<DashboardProps, 'data'>;
