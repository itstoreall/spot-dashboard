import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import * as t from './types';
// import * as ge from '../../enum/global';
import s from './UpdateActionBlock.module.scss';
// import AddIcon from '../../assets/icons/AddIcon';

// export type Process = { title: ge.Process; value: ge.Process };
// export type Status = { title: ge.ProcessStatus; value: ge.ProcessStatus };

// type FormOptions = {
//   actions: Process[];
//   status: Status[];
// };

// const formOptions: FormOptions = {
//   actions: [
//     { value: ge.Process.INIT, title: ge.Process.INIT },
//     { value: ge.Process.BUY, title: ge.Process.BUY },
//     { value: ge.Process.SELL, title: ge.Process.SELL }
//   ],
//   status: [
//     { value: ge.ProcessStatus.INIT, title: ge.ProcessStatus.INIT },
//     { value: ge.ProcessStatus.INVESTED, title: ge.ProcessStatus.INVESTED },
//     { value: ge.ProcessStatus.WITHDRAWN, title: ge.ProcessStatus.WITHDRAWN }
//   ]
// };

const UpdateActionForm = (props: t.UpdateActionFormProps) => {
  const [isActionSelect, setIsActionSelect] = useState<boolean>(false);
  const [isStatusSelect, setIsStatusSelect] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState('');
  // const [actionOpt, setActionOpt] = useState<Process>(formOptions.actions[0]);

  const {
    selectOptions,
    actionOpt,
    setActionOpt,
    actionPrices,
    handlePrices,
    statusOpt,
    setStatusOpt,
    handleSubmit
  } = props;

  const actionsRef = useRef<HTMLDivElement>(null);

  const handleActionSelect = (is: boolean) => setIsActionSelect(is);
  const handleStatusSelect = (is: boolean) => setIsStatusSelect(is);

  // ------

  const changeActionOpt = (option: t.Process) => {
    handleActionSelect(false);
    setActionOpt(option);
  };

  const changeStatusOpt = (option: t.Status) => {
    handleStatusSelect(false);
    setStatusOpt(option);
  };

  const handleActionMenu = () => {
    handleActionSelect(!isActionSelect);
  };

  const handleStatusMenu = () => {
    handleStatusSelect(!isStatusSelect);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, decimal point, and control keys
    if (
      !/[0-9.]/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Delete' &&
      e.key !== 'Tab'
    ) {
      e.preventDefault();
    }

    if (e.key === '.' && newPrice.includes('.')) {
      e.preventDefault();
    }

    if (e.key.toLowerCase() === 'e') {
      e.preventDefault();
    }
  };

  const handleNewPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPrice(e.target.value);
  };

  const addPrice = () => {
    handlePrices('add', Number(newPrice));
    setNewPrice('');
  };

  const deletePrice = (price: number) => {
    handlePrices('del', price);
    setNewPrice('');
  };

  const selectStyle = isActionSelect ? s.open : null;
  const selectButtonStyle = `${s.selectButton} ${selectStyle}`;

  // console.log('actionPrices', actionPrices);

  return (
    <div className={s.controlsBlock}>
      <div className={s.selectBlock}>
        <div className={s.select} ref={actionsRef}>
          {isActionSelect && (
            <ul className={s.selectMenu}>
              {selectOptions.actions.map((action: t.Process) => (
                <li key={action.value} onClick={() => changeActionOpt(action)}>
                  <span>{action.title}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={selectButtonStyle} onClick={handleActionMenu}>
            <span className={s.title}>{actionOpt.title}</span>
          </div>
        </div>

        <div className={s.select} ref={actionsRef}>
          {isStatusSelect && (
            <ul className={s.selectMenu}>
              {selectOptions.status.map((status: t.Status) => (
                <li key={status.value} onClick={() => changeStatusOpt(status)}>
                  <span>{status.title}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={selectButtonStyle} onClick={handleStatusMenu}>
            <span className={s.title}>{statusOpt.title}</span>
          </div>
        </div>
      </div>

      <div className={s.pricesBlock}>
        <ul className={s.pricesList}>
          {actionPrices.map((price: number, idx: number) => (
            <li key={idx}>
              <span>{price}</span>
              <button
                className={s.deletePriceButton}
                onClick={() => deletePrice(price)}
              />
            </li>
          ))}
        </ul>

        <div className={s.inputBlock}>
          <input
            type='number'
            placeholder='0.00'
            value={newPrice}
            onChange={handleNewPrice}
            onKeyDown={handleKeyDown}
          />

          <button className={s.addPriceButton} onClick={addPrice} />
        </div>
      </div>

      <button className={s.submitButton} onClick={handleSubmit}>
        submit
      </button>
    </div>
  );

  /*
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='action'
        placeholder='Action'
        value={input.action}
        onChange={handleChange}
      />
      <input
        type='text'
        name='prices'
        placeholder='Prices (comma-separated)'
        value={input.prices.join(',')}
        onChange={handleChange}
      />
      <input
        type='text'
        name='status'
        placeholder='Status'
        value={input.status}
        onChange={handleChange}
      />
      <button type='submit'>Update Action</button>
    </form>
  );
  */
};

export default UpdateActionForm;
