import state from '../../state';
import s from './Header.module.scss';

const { update } = state.system;

const Header = ({ isUpdated }: { isUpdated: boolean }) => {
  // console.log('isUpdated', isUpdated);
  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div className={s.leftBlock}>
          <span>
            <>{update}</>
          </span>
        </div>
        <div className={s.rightBlock}></div>
      </div>
    </header>
  );
};

export default Header;
