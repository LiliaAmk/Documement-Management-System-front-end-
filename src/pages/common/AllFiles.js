import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Table, Button, Tag, message, Typography, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { confirm } = Modal;

const AllFiles = () => {
  const [documents, setDocuments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all departments & categories for names
  useEffect(() => {
    api.get("/departments").then(res => setDepartments(res.data));
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  // Fetch ALL documents (admin view)
  useEffect(() => {
    setLoading(true);
    api.get("/documents/all")
      .then(res => setDocuments(res.data))
      .catch(() => message.error("Failed to fetch all documents"))
      .finally(() => setLoading(false));
  }, []);

  const getDepartmentName = (id) => {
    const dept = departments.find(d => d.id === id);
    return dept ? dept.name : id;
  };

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : id;
  };

  // --- Delete with confirmation
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this file?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/documents/${id}`);
      setDocuments((docs) => docs.filter((doc) => doc.id !== id));
      message.success("File deleted");
    } catch (err) {
      message.error("Failed to delete file");
    }
  };

  // Optionally, for "Edit", redirect to edit page/modal
  const handleEdit = (record) => {
    navigate(`/edit-file/${record.id}`);
  };

  // --- Filtering for search (optional, can enhance further)
  const filteredDocs = documents.filter(
    (doc) =>
      doc.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.translatedTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.userEmail?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Translated Title", dataIndex: "translatedTitle", key: "translatedTitle" },
      {
    title: "Uploader",
    dataIndex: "userEmail",
    key: "userEmail",
    render: (email) => email || "—",
  },
    {
      title: "Department",
      dataIndex: "departmentId",
      key: "departmentId",
      render: (id) => <Tag color="green">{getDepartmentName(id)}</Tag>,
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (id) => <Tag color="purple">{getCategoryName(id)}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => window.open(record.downloadUrl, "_blank")}
          >
            Download
          </Button>
          
          <Button
            danger
            type="link"
            onClick={() => showDeleteConfirm(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",marginBottom: 24
      }}>
        <Title level={3} style={{ margin: 0 }}>All Documents (Admin)</Title>
        <div style={{ display: "flex", gap: 12 }}></div>
        <Button
        type="primary"
        style={{ marginRight: 12 }}
        onClick={() => navigate("/upload")}
      >
        Add File
      </Button>
        <Input
          placeholder="Search by title, translation, or email..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        dataSource={filteredDocs}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default AllFiles;
