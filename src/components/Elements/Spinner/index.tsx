import { Spin } from 'antd';
import styles from './index.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.container}>
      <Spin size="default" />
    </div>
  );
};
