// src/pages/admin/Categories.js
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import {
  Layout,
  Button,
  Input,
  Table,
  Modal,
  Form,
  Typography,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Categories() {
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  // 1. Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
    } catch {
      message.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Filter by search text
  useEffect(() => {
    setFilteredCategories(
      categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, categories]);

  // 3. Open modal (create or edit)
  const openCreateModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 4. Handle create or update
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        // Update
        await axios.put(`/categories/${editingCategory.id}`, values);
        message.success("Category updated");
      } else {
        // Create
        await axios.post("/categories", values);
        message.success("Category created");
      }
      setIsModalVisible(false);
      fetchCategories();
    } catch {
      message.error("Failed to save category");
    }
  };

  const handleModalCancel = () => setIsModalVisible(false);

  // 5. Populate form for editing
  const handleEdit = (record) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // 6. Delete with confirmation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/categories/${id}`);
      message.success("Category deleted");
      fetchCategories();
    } catch {
      message.error("Failed to delete category");
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: "0 16px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Category Management
        </Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            placeholder="Search categories..."
            prefix={<SearchOutlined />}
            style={{ width: 200, marginRight: 8 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button icon={<PlusOutlined />} onClick={openCreateModal}>
            Add Category
          </Button>
        </div>
      </Header>

      <Content style={{ margin: "16px" }}>
        <Table
          columns={columns}
          dataSource={filteredCategories}
          rowKey="id"
          bordered
        />
      </Content>

      <Modal
        title={editingCategory ? "Edit Category" : "Create Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: "Category name is required" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
