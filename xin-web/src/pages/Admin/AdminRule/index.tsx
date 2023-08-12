import XinTable from '@/components/XinTable'
import {ProFormColumnsAndProColumns} from '@/components/XinTable/typings';
import XinDict from "@/components/XinDict";
import {useModel} from "@umijs/max";
import {getRulePid} from "@/services/admin";
import {useEffect, useState} from "react";

const api = {
  list: '/adminRule/list',
  add: '/adminRule/add',
  edit: '/adminRule/add',
  delete: '/adminRule/delete'
}

interface ResponseAdminList {
  id?: number
  title?: string
  pid?: string
  type?: string
  key?: string
  remark?: string
  create_time?: string
  update_time?: string
}

const Table: React.FC = () => {
  const {getDictionaryData} = useModel('global')
  const [parentNode,setParentNode] = useState<{value:any,label:string}[]>([])

  // 获取父节点ID
  useEffect(() => {
    getRulePid().then(res=>{
      if(res.success){
        setParentNode(res.data.data)
      }
    })
  },[])


  // 父ID选择框
  const formPid = ({ type }: any): any[] => {
    return type !== '0'
      ? [{
        title: '父节点',
        dataIndex: 'pid',
        valueType: 'select',
        initialValue: '0',
        fieldProps: {
          options: parentNode
        },
        formItemProps: {
          rules: [
            {required: true, message: '此项为必填项'},
          ],
        },
      }] : []
  }

  const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'radio',
      request: async () => getDictionaryData('ruleType'),
      hideInTable: true,
      initialValue: '0',
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项'},
        ],
      },
    },
    {
      title: '规则名字',
      dataIndex: 'title',
      valueType: 'text',
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项'},
        ],
      },
    },
    {
      title: 'KEY',
      dataIndex: 'key',
      valueType: 'text',
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项'},
        ],
      },
    },
    {
      valueType: 'dependency',
      name: ['type'],
      hideInTable: true,
      columns: formPid
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'radioButton',
      request: async () => getDictionaryData('ruleType'),
      render: (_, date) => <XinDict value={date.type} dict={'ruleType'} />,
      hideInForm: true
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'text'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInForm: true
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      valueType: 'date',
      hideInForm: true
    },
  ];

  return (
      <XinTable<ResponseAdminList>
        tableApi={api}
        columns={columns}
        tableConfig={{
          search: false
        }}
      />
  )

}

export default Table