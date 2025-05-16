import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Layout, Button, Input, Table, Modal, Form, Typography, message,
} from 'antd';
import {
  PlusOutlined, SearchOutlined, FileOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const AllFiles = () => {
  const [searchText, setSearchText] = useState('');
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [form] = Form.useForm();

  const apiBaseUrl = 'http://localhost:8080/files';

  const fetchFiles = async () => {
    try {
      const response = await axios.get(apiBaseUrl);
      setFiles(response.data);
    } catch (error) {
      message.error('Failed to load files');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    setFilteredFiles(
      files.filter((file) =>
        file.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, files]);

  const openCreateModal = () => {
    setEditingFile(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingFile) {
        await axios.put(`${apiBaseUrl}/${editingFile.id}`, values);
        message.success('File updated');
      } else {
        await axios.post(apiBaseUrl, values);
        message.success('File added');
      }
      setIsModalVisible(false);
      fetchFiles();
    } catch (error) {
      message.error('Failed to save file');
    }
  };

  const handleModalCancel = () => setIsModalVisible(false);

  const handleEdit = (record) => {
    setEditingFile(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      message.success('File deleted');
      fetchFiles();
    } catch (error) {
      message.error('Failed to delete file');
    }
  };

  const openFile = (url) => {
    window.open(url, '_blank');
  };

  const columns = [
    {
      title: '',
      key: 'open',
      render: (_, record) => (
        <Button
          type="link"
          icon={<FileOutlined />}
          onClick={() => openFile(record.url)}
        />
      ),
    },
    {
      title: 'File Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Added By',
      dataIndex: 'addedBy',
      key: 'addedBy',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
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
          All Files
        </Title>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search files..."
            prefix={<SearchOutlined />}
            style={{ width: 200, marginRight: 8 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button icon={<PlusOutlined />} onClick={openCreateModal}>
            Add File
          </Button>
        </div>
      </Header>

      <Content style={{ margin: '16px' }}>
        <Table
          columns={columns}
          dataSource={filteredFiles}
          rowKey={(record) => record.id}
          bordered
        />
      </Content>

      <Modal
        title={editingFile ? 'Edit File' : 'Add File'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="File Name"
            name="name"
            rules={[{ required: true, message: 'File name is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: 'File URL is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Added By"
            name="addedBy"
            rules={[{ required: true, message: 'User is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Department is required' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AllFiles;
