import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { TFunction } from 'react-i18next';

type TableSearchProps = {
  dataIndex: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchInput: React.MutableRefObject<Input | null>;
  setSearchedColumn: React.Dispatch<React.SetStateAction<string>>;
  t: TFunction<'translation', undefined>;
};

export const TableSearch = ({ dataIndex, setSearchText, setSearchedColumn, searchInput, t }: TableSearchProps) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch({ selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn })}
        style={{ width: '100%', marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={() => handleSearch({ selectedKeys, confirm, dataIndex, setSearchedColumn, setSearchText })}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        {t('c00bu018')}
      </Button>
      <Button onClick={() => handleReset({ clearFilters, setSearchText })} size="small" style={{ width: 90 }}>
        {t('c00bu017')}
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          confirm({ closeDropdown: false });
          setSearchText(selectedKeys[0]);
          setSearchedColumn(dataIndex);
        }}
      >
        {t('c00ic019')}
      </Button>
    </div>
  ),
  filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value: string, record: any) =>
    record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  onFilterDropdownVisibleChange: (visible: boolean) => {
    if (visible) {
      setTimeout(() => searchInput && searchInput.current && searchInput.current.select(), 100);
    }
  },
  render: (text: string) => text,
});

const handleSearch = ({ selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn }: any) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = ({ clearFilters, setSearchText }: any) => {
  clearFilters();
  setSearchText('');
};
