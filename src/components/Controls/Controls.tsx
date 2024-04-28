import s from './Controls.module.scss';

const Controls = () => {
  return (
    <div className={s.controlsBlock}>
      <div className={s.controlsContent}>
        <div className={s.controlsList}>
          <div className={s.controlsItem}>1</div>
          <div className={s.controlsItem}>2</div>
          <div className={s.controlsItem}>3</div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
