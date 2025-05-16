import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import {
  Layout, Button, Input, Table, Modal, Form, Typography, message,
} from 'antd';
import { PlusOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

const Departments = () => {
  const [searchText, setSearchText] = useState('');
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => { fetchDepartments(); }, []);
  useEffect(() => {
    setFilteredDepartments(
      departments.filter((dep) =>
        dep.name?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, departments]);

  const fetchDepartments = async () => {
    try {
      const { data } = await api.get('/departments');
      setDepartments(data);
    } catch (err) {
      message.error('Failed to load departments');
    }
  };

  const openCreateModal = () => {
    setEditingDepartment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingDepartment) {
        message.info('Editing not implemented yet.');
      } else {
        const { data } = await api.post('/departments', { name: values.name });
        setDepartments([...departments, data]);
        message.success('Department created');
      }
      setIsModalVisible(false);
    } catch (err) {
      message.error('Failed to save department');
    }
  };

  const handleModalCancel = () => setIsModalVisible(false);

  // ——— Confirmation before deletion
  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this department?',
      icon: <ExclamationCircleOutlined />,
      content: 'Deleting a department is permanent. All related documents, users, or references may be affected!',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteDepartment(id);
      },
      onCancel() { /* do nothing */ },
    });
  };

  // Real deletion logic
  const deleteDepartment = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      setDepartments(departments.filter((dep) => dep.id !== id));
      message.success('Department deleted');
    } catch (err) {
      // You can add more detailed error messages depending on err.response
      message.error('Failed to delete department. Make sure it is not linked to documents.');
    }
  };

  const columns = [
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button danger type="link" onClick={() => showDeleteConfirm(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="site-layout-background"
        style={{
          padding: '0 16px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Department Management
        </Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search departments..."
            prefix={<SearchOutlined />}
            style={{ width: 200, marginRight: 8 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button icon={<PlusOutlined />} onClick={openCreateModal}>
            Add Department
          </Button>
        </div>
      </Header>

      <Content style={{ margin: '16px' }}>
        <Table
          columns={columns}
          dataSource={filteredDepartments}
          rowKey="id"
          bordered
        />
      </Content>

      <Modal
        title={editingDepartment ? 'Edit Department' : 'Create Department'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingDepartment ? 'Save' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Department Name"
            name="name"
            rules={[{ required: true, message: 'Department name is required' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Departments;
