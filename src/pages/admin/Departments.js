// src/pages/admin/Departments.js

import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // Make sure the import path is correct!
import {
  Layout, Button, Input, Table, Modal, Form, Typography, message,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const Departments = () => {
  const [searchText, setSearchText] = useState('');
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [form] = Form.useForm();

  // Fetch all departments on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Filter departments by search text
  useEffect(() => {
    setFilteredDepartments(
      departments.filter((dep) =>
        dep.name?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, departments]);

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const { data } = await api.get('/departments');
      setDepartments(data);
    } catch (err) {
      message.error('Failed to load departments');
      console.error('Fetch error:', err);
    }
  };

  // Open modal to create a department
  const openCreateModal = () => {
    setEditingDepartment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Create (POST) or edit department
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingDepartment) {
        // For now, skip editing (implement if needed)
        message.info('Editing not implemented yet.');
      } else {
        // Create department via backend
        const { data } = await api.post('/departments', { name: values.name });
        setDepartments([...departments, data]);
        message.success('Department created');
      }
      setIsModalVisible(false);
    } catch (err) {
      message.error('Failed to save department');
      console.error('Save error:', err);
    }
  };

  // Close modal
  const handleModalCancel = () => setIsModalVisible(false);

  // Prepare editing mode (not yet implemented)
  const handleEdit = (record) => {
    setEditingDepartment(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // Delete department via backend
  const handleDelete = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      setDepartments(departments.filter((dep) => dep.id !== id));
      message.success('Department deleted');
    } catch (err) {
      message.error('Failed to delete department');
      console.error('Delete error:', err);
    }
  };

  // Table columns
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
        <>
          {/* <Button onClick={() => handleEdit(record)} type="link">
            Edit
          </Button> */}
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
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
