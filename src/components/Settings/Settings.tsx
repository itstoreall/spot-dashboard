/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import UPDATE_ACTION from '../../gql/updateAction';
import * as ge from '../../enum/global';
import * as gt from '../../types/global';
import * as t from './types';
import UpdateActionForm from './UpdateActionForm';
import s from './Settings.module.scss';

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

const Settings = (props: t.UpdateActionBlockProps) => {
  const { settingsAction, handleIsSettings } = props;

  // ------ Initial States:

  const { action, status, prices } = settingsAction;
  const initActionState = { title: action, value: action };
  const initStatusState = { title: status, value: status };

  // ------ States:

  const [spotAction, setSpotAction] = useState<gt.Action>(settingsAction);
  const [actionOpt, setActionOpt] = useState<Process>(initActionState);
  const [actionPrices, setActionPrices] = useState(prices);
  const [statusOpt, setStatusOpt] = useState<Status>(initStatusState);

  const [updateAction] = useMutation(UPDATE_ACTION);

  useEffect(() => {
    const prices =
      spotAction.prices.length === 1 && spotAction.prices[0] === 0
        ? []
        : spotAction.prices;
    setActionPrices(prices);
    setSpotAction({ ...spotAction, action: actionOpt.title, prices });
  }, []);

  useEffect(() => {
    setSpotAction({ ...spotAction, action: actionOpt.title });
  }, [actionOpt]);

  useEffect(() => {
    setSpotAction({ ...spotAction, status: statusOpt.title });
  }, [statusOpt]);

  useEffect(() => {
    const priceSum: number = actionPrices.length
      ? actionPrices.reduce((acc, val) => acc + val, 0)
      : 0;

    const averagePrice = priceSum ? priceSum / actionPrices.length : 0;
    const percent = calculatePercentage(averagePrice, spotAction.current_price);
    const priceParts = spotAction.current_price.toString().split('.');

    const fixedValue =
      priceParts[0].length > 1 ? 2 : Number(priceParts[0]) === 0 ? 8 : 3;

    setSpotAction({
      ...spotAction,
      prices: actionPrices,
      average_price: Number(averagePrice.toFixed(fixedValue)),
      percent
    });
  }, [actionPrices]);

  // ------

  const calculatePercentage = (averagePrice: number, price: number) => {
    let rawPercent = 0;
    rawPercent = averagePrice
      ? ((price - averagePrice) / averagePrice) * 100
      : 0;

    const fixedValue = rawPercent.toFixed();
    const numberValue = Number(fixedValue);
    return typeof numberValue === 'number' ? numberValue : 0;
  };

  const handlePrices = (label: 'add' | 'del', newPrice: number) => {
    if (label === 'add') {
      setActionPrices([...actionPrices, Number(newPrice)]);
    }

    if (label === 'del') {
      const index = actionPrices.indexOf(newPrice);
      let filteredPrices;
      index !== -1
        ? (filteredPrices = [
            ...actionPrices.slice(0, index),
            ...actionPrices.slice(index + 1)
          ])
        : (filteredPrices = [...actionPrices]);
      setActionPrices(filteredPrices);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      tokenId: spotAction.tokenId,
      token: spotAction.token,
      action: spotAction.action as ge.Process,
      average_price: spotAction.average_price,
      current_price: spotAction.current_price,
      prices: spotAction.prices,
      percent: spotAction.percent,
      status: spotAction.status as ge.ProcessStatus
    };

    const variables = { id: settingsAction.id, input: payload };
    const { data } = await updateAction({ variables });

    data?.updateAction.isUpdated && handleIsSettings(false);
  };

  return (
    <div className={s.settings}>
      <div className={s.content}>
        <button
          className={s.closeButton}
          onClick={() => handleIsSettings(false)}
        >
          <span />
        </button>

        <ul className={s.previewActionList}>
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
              actionPrices,
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

export default Settings;
