import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import FileList from "../FileList/FileList";

const Dashboard = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3320/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      });
  };

  return (
    <>
      <Container className="bg-secondary bg-gradient pb-3 pt-0">
        <Row className="d-flex justify-content-center ">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Row className="mt-5 pe-0 ">
                <Col xs={11} className="pe-0">
                  <Form.Group controlId="fileUpload">
                    <Row>
                      <Col xs={2} className="pe-0 pt-1">
                        <Form.Label>Upload File</Form.Label>
                      </Col>
                      <Col xs={10} className="ps-0">
                        <Form.Control type="file" onChange={handleFileChange} required />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col xs={1} className="mt-0 ms-0">
                  <Button type="submit">Upload</Button>
                </Col>

              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      <FileList file={file} />
    </>
  );
};

export default Dashboard;
