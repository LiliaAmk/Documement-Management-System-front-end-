import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';


import {
  Layout, Button, Input, Table, Modal, Form, Typography, message, Select,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function Users() {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(u => {
        // guard against missing fullname
        const name = u.fullname ?? '';
        return name.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText, users]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/users');
      setUsers(data);
    } catch {
      message.error('Failed to load users');
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get('/departments');
      setDepartments(data);
    } catch {
      message.error('Failed to load departments');
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    form.resetFields();
    setOpenModal(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        fullname: values.fullname,
        email: values.email,
        phonenum: values.phonenum,
        role: values.role,
        departments: values.departments.map(id => ({ id })),
        password: values.password,
      };

      if (editingUser) {
        await axios.put(`/users/${editingUser.id}`, payload);
        message.success('User updated');
      } else {
        await axios.post('/users', payload);
        message.success('User created');
      }

      setOpenModal(false);
      fetchUsers();
    } catch {
      message.error('Failed to save user');
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      ...record,
      departments: record.departments?.map(dep => dep.id) || [],
    });
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      message.success('User deleted');
      fetchUsers();
    } catch {
      message.error('Failed to delete user');
    }
  };

  const columns = [
    { title: 'Full Name', dataIndex: 'fullname', key: 'fullname' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phonenum', key: 'phonenum' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
  title: 'Departments',
  key: 'departments',
  render: (_, r) =>
    r.departments && r.departments.length
      ? r.departments.map(dep => dep.name).join(', ')
      : '—',
},

    {
      title: 'Actions',
      key: 'actions',
      render: (_, r) => (
        <>
          <Button type="link" onClick={() => handleEdit(r)}>Edit</Button>
          <Button danger type="link" onClick={() => handleDelete(r.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
        <Title level={4} style={{ margin: 0 }}>User Management</Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search users…"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200, marginRight: 8 }}
          />
          <Button icon={<PlusOutlined />} onClick={openCreateModal}>Add User</Button>
        </div>
      </Header>

      <Content style={{ margin: '16px' }}>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          bordered
        />
      </Content>

      <Modal
        title={editingUser ? 'Edit User' : 'Create User'}
        open={openModal}
        onOk={handleModalOk}
        onCancel={() => setOpenModal(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="fullname" label="Full Name" rules={[{ required: true }]}>  
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>  
            <Input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="phonenum" label="Phone Number" rules={[{ required: true }]}>  
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>  
            <Select>
              <Option value="ROLE_ADMIN">Admin</Option>
              <Option value="ROLE_USER">User</Option>
            </Select>
          </Form.Item>
         <Form.Item
  name="departments"
  label="Departments"
  rules={[{ required: true, message: 'Select at least one department' }]}
>
  <Select
    mode="multiple"
    placeholder="Select departments"
  >
    {departments.map(dept => (
      <Option key={dept.id} value={dept.id}>{dept.name}</Option>
    ))}
  </Select>
</Form.Item>

        </Form>
      </Modal>
    </Layout>
  );
}

