import XinTable from '@/components/XinTable'
import { ProFormColumnsAndProColumns } from '@/components/XinTable/typings';
import XinDict from "@/components/XinDict";
import {useModel} from "@@/exports";
import {Avatar} from "antd";
import UploadImgItem from "@/components/XinForm/UploadImgItem";

const api = {
  list: '/admin/list',
  add : '/admin/add',
  edit: '/admin/edit',
  delete: '/admin/delete'
}

interface ResponseAdminList {
  id?: number
  name?: string
  nickname?: string
  avatar?: string
  email?: string
  mobile?: string
  motto?: string
  sex?: number
  create_time?: string
  update_time?: string
}


const Table : React.FC = () => {

  const {getDictionaryData} = useModel('dictModel')

  const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: '昵称',
      dataIndex: 'name',
      valueType: 'text',
      params: {
        select: 'like'
      }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'radio',
      request: async () => getDictionaryData('sex'),
      render: (_, date) => <XinDict value={date.sex} dict={'sex'} />
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      valueType: 'text',
      renderFormItem: (schema,config, form) => <UploadImgItem config={config} schema={schema} form={form} ></UploadImgItem>,
      render: (_,date) => <Avatar src={<img src={date.avatar} alt="avatar" />} />
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'text',
    }
  ];


  return (
      <XinTable<ResponseAdminList>
        tableApi = {api}
        columns= {columns}
        tableConfig = {{
          headerTitle: '表格属性'
        }}
        accessName={'admin:list'}
      />
  )

}

export default Table