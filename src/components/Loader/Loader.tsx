import Spinner from '../../assets/animated/Spinner';
import s from './Loader.module.scss';

const Loader = () => (
  <div className={s.loaderBlock}>
    <Spinner />
  </div>
);

export default Loader;
