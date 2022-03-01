import { Image, Skeleton } from 'antd';
import styles from './index.module.scss';

type ImageCoverProps = {
  url: string;
  loading: boolean;
  props?: any;
};

export const ImageCover = ({ url, loading, props }: ImageCoverProps) => {
  if (!loading) {
    return <Image placeholder src={url} className={styles.imageCover} style={props} />;
  }
  return <Skeleton active round></Skeleton>;
};
