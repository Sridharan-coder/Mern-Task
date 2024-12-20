import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Form,
  Modal,
  Pagination,
  Row,
  Stack,
  Table,
} from "react-bootstrap";

const FileList = ({ file }) => {
  const [files, setFiles] = useState([]);
  const [valueCount, setValueCount] = useState(0);
  const [isNextData, setIsNextData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChecker,setisModalChecker]=useState("");

  const fetchUsers = () => {
    axios
      .get(
        `http://localhost:3320/readAll/${valueCount}`)
      .then((response) => {
        const responseData = [...response.data.files];
        if (responseData.length < 11) {
          setIsNextData(true)
          setFiles(responseData);
        }
        else {
          setIsNextData(false)
          responseData.pop()
          setFiles(responseData);
        }
      })
      .catch((error) => console.error("Error fetching files:", error));
  };

  const handleDownload = (file) => {
    const path = file.filesPath.split("\\");
    const fileName = path[path.length - 1];
    console.log(path[path.length - 1]);
    try {
      axios
        .get(`http://localhost:3320/download/${fileName}`, {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    } catch (error) {
      console.log("Errorss ====>", error);
    }
  };

  const handleSendEmail = (event, file) => {
    setIsModalOpen(false)
    event.preventDefault();
    const form = event.target.closest("form");
    // console.log("--->", form[4].value);


    const data = new FormData(form);
    const formValues = Object.fromEntries(data.entries());

    // console.log(file);




    const path = file.filesPath.split("\\");
    const fileName = path[path.length - 1];

    axios
      .post("http://localhost:3320/sendEmail", { fileName, ...formValues })
      .then((response) => {
        console.log("---> Email sent successfully:", response);
        alert("Email sent successfully")
      })
      .catch((error) => {
        console.error(" ---> Error sending email:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [valueCount]);

  useEffect(() => {
    setValueCount(0);
    setFiles([]);
  }, [file]);

  console.log(files.length < 10);
  return (
    <>
      <Row className="bg-secondary bg-gradient mt-1" style={{height:"82vh"}}>
        <Col xs={2}> </Col>
        <Col xs={8}>
          {files.length ? (
            <>
              <Table hover  className="bg-dark bg-gradient">
                <thead className="bg-dark bg-gradient">
                  <tr >
                    <th className=" bg-dark bg-gradient text-white">Id</th>
                    <th className=" bg-dark bg-gradient text-white">File Name</th>
                    <th className=" bg-dark bg-gradient text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-dark bg-gradient">
                  {files.map((file, index) => (
                    <tr key={index} >
                      <td className=" bg-secondary bg-gradient text-white">{(valueCount * 10) + (index + 1)}</td>
                      <td className=" bg-secondary bg-gradient text-white">{file.fileName}</td>
                      <td className=" bg-secondary bg-gradient text-white">
                        <Button
                          onClick={() => handleDownload(file)}
                          variant="primary"
                        >
                          Download
                        </Button>

                        <Button
                          onClick={() => {setIsModalOpen(true); setisModalChecker(file.uid)}}
                          variant="primary"
                          className="ms-4"
                        >
                          Share
                        </Button>
                      </td>




                      <Modal show={isModalOpen && file.uid===isModalChecker} onHide={() => setIsModalOpen(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Form>
                          <Modal.Body>
                            <Form.Group className="mb-1" >
                              <Form.Label> To : </Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                autoFocus
                              />
                            </Form.Group>
                            <Form.Group className="mb-1" >
                              <Form.Label>Subject</Form.Label>
                              <Form.Control
                                type="text"
                                name="subject"
                                placeholder="Subject for the mail"
                                autoFocus
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-2"
                            >
                              <Form.Label>Content</Form.Label>
                              <Form.Control as="textarea" rows={3} name="emailContent" />
                            </Form.Group>

                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="primary" type="submit" onClick={(e) => handleSendEmail(e, file)}>
                              Send Mail
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>



                    </tr>
                  ))}
                </tbody>
              </Table>
              <Stack direction="horizontal" gap={3}>
                <Button
                  onClick={() => setValueCount(valueCount - 1)}
                  disabled={valueCount <= 0}
                  variant="success"
                >
                  Previous
                </Button>
                <Pagination className="ms-auto paginationCount primary text-white">
                  {valueCount + 1}
                </Pagination>
                <Button
                  onClick={() => setValueCount(valueCount + 1)}
                  disabled={isNextData}
                  className="ms-auto"
                  variant="warning"
                >
                  Next
                </Button>
              </Stack>
            </>
          ) : (
            ""
          )}
        </Col>
        <Col xs={2}> </Col>
      </Row >






    </>
  );
};

export default FileList;
