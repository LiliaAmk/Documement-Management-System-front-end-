import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useSelector } from "react-redux";
import { Table, Button, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";

const DocumentsList = () => {
  const user = useSelector((state) => state.auth.user);
  const [documents, setDocuments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch departments and categories
  useEffect(() => {
    api.get("/departments").then(res => setDepartments(res.data));
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  // Fetch documents for the current user
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api.get("/documents")
      .then((res) => setDocuments(res.data))
      .catch(() => message.error("Failed to fetch documents"))
      .finally(() => setLoading(false));
  }, [user]);

  // Helper to get names
  const getDepartmentName = (id) => {
    const dept = departments.find(d => d.id === id);
    return dept ? dept.name : id;
  };
  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : id;
  };
  const handleDelete = (id) => {
  // Show confirmation dialog before delete
  if (window.confirm("Are you sure you want to delete this document?")) {
    api.delete(`/documents/${id}`)
      .then(() => {
        message.success("Document deleted successfully!");
        setDocuments((docs) => docs.filter((doc) => doc.id !== id));
      })
      .catch(() => message.error("Failed to delete document"));
  }
};


  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Translated Title", dataIndex: "translatedTitle", key: "translatedTitle" },
    {
      title: "Department", dataIndex: "departmentId", key: "departmentId",
      render: (id) => <Tag>{getDepartmentName(id)}</Tag>,
    },
    {
      title: "Category", dataIndex: "categoryId", key: "categoryId",
      render: (id) => <Tag>{getCategoryName(id)}</Tag>,
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
      {record.userEmail === user.email && (
        <>
          <Button
            danger
            type="link"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      )}
    </>
  ),
}


  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>My Documents</h2>
        <Button type="primary" onClick={() => navigate("/upload")}>
          Add File
        </Button>
      </div>
      <Table
        dataSource={documents}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default DocumentsList;
