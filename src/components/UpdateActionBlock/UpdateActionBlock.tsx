/* eslint-disable react-hooks/exhaustive-deps */
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import UPDATE_ACTION from '../../gql/updateAction';
import * as ge from '../../enum/global';
import * as gt from '../../types/global';
// import * as t from './types';
import * as t from './types';
import UpdateActionForm from './UpdateActionForm';
import s from './UpdateActionBlock.module.scss';

// const initInputState = {
//   tokenId: 0,
//   token: '',
//   action: '',
//   average_price: 0,
//   current_price: 0,
//   prices: [],
//   percent: 0,
//   status: ''
// };

export type Process = { title: ge.Process; value: ge.Process };
export type Status = { title: ge.ProcessStatus; value: ge.ProcessStatus };

type SelectOptions = {
  actions: Process[];
  status: Status[];
};

const selectOptions: SelectOptions = {
  actions: [
    { value: ge.Process.INIT, title: ge.Process.INIT },
    { value: ge.Process.BUY, title: ge.Process.BUY },
    { value: ge.Process.SELL, title: ge.Process.SELL }
  ],
  status: [
    { value: ge.ProcessStatus.INIT, title: ge.ProcessStatus.INIT },
    { value: ge.ProcessStatus.INVESTED, title: ge.ProcessStatus.INVESTED },
    { value: ge.ProcessStatus.WITHDRAWN, title: ge.ProcessStatus.WITHDRAWN }
  ]
};

const UpdateActionBlock = (props: t.UpdateActionBlockProps) => {
  const { setIsSettings, settingsAction } = props;

  // ------ Initial States:

  const { action, status } = settingsAction;
  const initActionState = { title: action, value: action };
  const initStatusState = { title: status, value: status };

  // ------ States:

  const [spotAction, setSpotAction] = useState<gt.Action>(settingsAction);
  const [actionOpt, setActionOpt] = useState<Process>(initActionState);
  const [newPrice, setNewPrice] = useState('');
  const [statusOpt, setStatusOpt] = useState<Status>(initStatusState);

  const [updateAction, { data, loading, error }] = useMutation(UPDATE_ACTION);

  useEffect(() => {
    setSpotAction({ ...spotAction, action: actionOpt.title });
  }, [actionOpt]);

  useEffect(() => {
    setSpotAction({ ...spotAction, status: statusOpt.title });
  }, [statusOpt]);

  console.log('updateAction data:', data);

  const handlePrices = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e', e.target.value);

    const { value } = e.target;
    setNewPrice(value);

    // setNewPrice(e.target.value);
    // const { name, value } = e.target;
    // setInput({
    //   ...input,
    //   [name]: name === 'prices' ? value.split(',').map(Number) : value
    // });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAction({ variables: { id: '664e46a406c1609470f05670', spotAction } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={s.updateActionBlock}>
      <div className={s.content}>
        <button className={s.closeButton} onClick={() => setIsSettings(false)}>
          <span />
        </button>

        <ul className={s.previewActionList}>
          <li>
            <span className={s.title}>ID:</span>
            <span className={s.value}>{spotAction?.tokenId}</span>
          </li>
          <li>
            <span className={s.title}>Token:</span>
            <span className={s.value}>{spotAction?.token}</span>
          </li>
          <li>
            <span className={s.title}>Action:</span>
            <span className={s.value}>{spotAction?.action}</span>
          </li>
          <li>
            <span className={s.title}>Price:</span>
            <span className={s.value}>{spotAction?.current_price}</span>
          </li>
          <li>
            <span className={s.title}>Target:</span>
            <span className={s.value}>{spotAction?.average_price}</span>
          </li>
          <li>
            <span className={s.title}>Percent:</span>
            <span className={s.value}>{spotAction?.percent}</span>
          </li>
          <li>
            <span className={s.title}>Status:</span>
            <span className={s.value}>{spotAction?.status}</span>
          </li>
        </ul>

        {spotAction && (
          <UpdateActionForm
            {...{
              spotAction,
              selectOptions,
              actionOpt,
              setActionOpt,
              newPrice,
              handlePrices,
              statusOpt,
              setStatusOpt,
              handleSubmit
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateActionBlock;
