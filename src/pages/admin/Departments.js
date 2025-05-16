import React, { useState, useEffect } from 'react';
import {
  Layout, Button, Input, Table, Modal, Form, Typography,
} from 'antd';
import {
  PlusOutlined, SearchOutlined,
} from '@ant-design/icons';


const { Header, Content } = Layout;
const { Title } = Typography;

const Departments = () => {
  const [searchText, setSearchText] = useState('');
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [form] = Form.useForm();

  const openCreateModal = () => {
    setEditingDepartment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingDepartment) {
        const updated = departments.map((dep) =>
          dep.id === editingDepartment.id ? { ...dep, ...values } : dep
        );
        setDepartments(updated);
      } else {
        const newDepartment = { id: Date.now(), ...values };
        setDepartments([...departments, newDepartment]);
      }
      setIsModalVisible(false);
    });
  };

  const handleModalCancel = () => setIsModalVisible(false);

  const handleEdit = (record) => {
    setEditingDepartment(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter((dep) => dep.id !== id));
  };

  useEffect(() => {
    setFilteredDepartments(
      departments.filter((dep) =>
        dep.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, departments]);

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
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
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
