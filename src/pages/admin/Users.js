import React, { useState, useEffect } from 'react';
import axios from "../../api/axios";
import {
  Layout, Button, Input, Table, Modal, Form, Typography, message, Select,
} from 'antd';
import {
  PlusOutlined, SearchOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Users = () => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const userApi = 'http://localhost:8080/users';
  const deptApi = 'http://localhost:8080/departments';

  const fetchUsers = async () => {
    try {
      const response = await axios.get(userApi);
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to load users');
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(deptApi);
      setDepartments(response.data);
    } catch (error) {
      message.error('Failed to load departments');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.fullname.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, users]);

  const openCreateModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingUser) {
        await axios.put(`${userApi}/${editingUser.id}`, values);
        message.success('User updated');
      } else {
        await axios.post(userApi, values);
        message.success('User created');
      }

      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error('Failed to save user');
    }
  };

  const handleModalCancel = () => setIsModalVisible(false);

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      ...record,
      departmentId: record.department?.id,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${userApi}/${id}`);
      message.success('User deleted');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenum',
      key: 'phonenum',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Department',
      key: 'department',
      render: (_, record) => record.department?.name || '—',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">
            Edit
          </Button>
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
          User Management
        </Title>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            style={{ width: 200, marginRight: 8 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button icon={<PlusOutlined />} onClick={openCreateModal}>
            Add User
          </Button>
        </div>
      </Header>

      <Content style={{ margin: '16px' }}>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey={(record) => record.id}
          bordered
        />
      </Content>

      <Modal
        title={editingUser ? 'Edit User' : 'Create User'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: 'Full name is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phonenum"
            rules={[{ required: true, message: 'Phone number is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Role is required' }]}
          >
            <Select>
              <Option value="ROLE_ADMIN">Admin</Option>
              <Option value="ROLE_USER">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Department"
            name="departmentId"
            rules={[{ required: true, message: 'Department is required' }]}
          >
            <Select placeholder="Select a department">
              {departments.map((dept) => (
                <Option key={dept.id} value={dept.id}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Users;
