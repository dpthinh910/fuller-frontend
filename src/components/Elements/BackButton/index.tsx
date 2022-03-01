import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { Link } from 'react-router-dom';

type BackButtonProps = {
  url: string;
  buttonType: ButtonType;
};
export const BackButton = ({ url, buttonType }: BackButtonProps) => {
  return (
    <Link to={url}>
      <Button type={buttonType} icon={<ArrowLeftOutlined />}></Button>
    </Link>
  );
};
