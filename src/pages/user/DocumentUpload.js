import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { useSelector } from "react-redux";
import { Form, Input, Select, Button, Upload, message } from "antd";
const { Option } = Select;

const DocumentUpload = () => {
  const user = useSelector((state) => state.auth.user);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  

  // Fetch user's departments and all categories
  useEffect(() => {
    if (!user) return;
    api.get("/departments").then(res => {
      // Assume backend returns all departments, filter here if user has limited access
      // If your backend supports "my departments" endpoint, use that
      setDepartments(res.data.filter(dep =>
        !user.departments || user.departments.includes(dep.id) || user.roles?.includes("ROLE_ADMIN")
      ));
    });
    api.get("/categories").then(res => setCategories(res.data));
  }, [user]);

  const handleFileChange = (info) => {
  const fileObj = info.fileList && info.fileList.length > 0
    ? info.fileList[0].originFileObj
    : null;
  setFile(fileObj);
};


  const onFinish = async (values) => {
    if (!file) {
      message.error("Please select a file!");
      return;
    }
    setLoading(true);

    const metadata = {
      title: values.title,
      departmentId: values.departmentId,
      categoryId: values.categoryId,
      userEmail: user.email, 
    };

    const formData = new FormData();
formData.append("title", values.title);
formData.append("departmentId", values.departmentId);
formData.append("categoryId", values.categoryId);
formData.append("userEmail", user.email);
formData.append("file", file);


    try {
      await api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Document uploaded!");
    } catch {
      message.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Department" name="departmentId" rules={[{ required: true }]}>
        <Select placeholder="Select department">
          {departments.map(dep => (
            <Option key={dep.id} value={dep.id}>{dep.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
        <Select placeholder="Select category">
          {categories.map(cat => (
            <Option key={cat.id} value={cat.id}>{cat.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="File" rules={[{ required: true }]}>
        <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1}>
          <Button>Select File</Button>
        </Upload>
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Upload
      </Button>
    </Form>
  );
};

export default DocumentUpload;
