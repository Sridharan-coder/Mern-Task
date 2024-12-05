import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const Generator = () => {

  const districts = [
    { city: "", coordinate: { lat: 10.909433, lng: 78.366535 } },
    { city: "Ariyalur", coordinate: { lat: 11.153056, lng: 79.25858 } },
    { city: "Chengalpattu", coordinate: { lat: 12.6840886, lng: 79.9836371 } },
    { city: "Chennai", coordinate: { lat: 13.0836939, lng: 80.270186 } },  // 	13.073226-	80.260918
    { city: "Coimbatore", coordinate: { lat: 11.0018115, lng: 76.9628425 } },
    { city: "Cuddalore", coordinate: { lat: 11.520207, lng: 79.3396356 } },
    { city: "Dharmapuri", coordinate: { lat: 12.145613, lng: 78.1132217 } },
    { city: "Dindigul", coordinate: { lat: 10.4256896, lng: 77.815664 } },
    { city: "Erode", coordinate: { lat: 11.4905281, lng: 77.3505274 } },
    { city: "Kallakurichi", coordinate: { lat: 11.7946847, lng: 79.0388211 } },
    { city: "Kanchipuram", coordinate: { lat: 12.9647163, lng: 79.9839686 } },
    { city: "Kanyakumari", coordinate: { lat: 8.079252, lng: 77.5499338 } },
    { city: "Karur", coordinate: { lat: 10.8217671, lng: 78.3828654 } },
    { city: "Krishnagiri", coordinate: { lat: 12.5152075, lng: 78.0093769 } },
    { city: "Madurai", coordinate: { lat: 9.9261153, lng: 78.1140983 } },
    { city: "Nagapattinam", coordinate: { lat: 10.6026202, lng: 79.7619348 } },
    { city: "Namakkal", coordinate: { lat: 11.3033889, lng: 78.118604 } },
    { city: "Nilgiris", coordinate: { lat: 11.4449997, lng: 76.69752 } }, //11.416667 -	76.683334
    { city: "Perambalur", coordinate: { lat: 11.2902641, lng: 78.9300404 } },
    { city: "Pudukkottai", coordinate: { lat: 10.2903072, lng: 78.8173617 } },
    { city: "Ramanathapuram", coordinate: { lat: 9.5205576, lng: 78.5184635 } },
    { city: "Ranipet", coordinate: { lat: 12.9186243, lng: 79.4081921 } },
    { city: "Salem", coordinate: { lat: 11.6469616, lng: 78.2106958 } },
    { city: "Sivagangai", coordinate: { lat: 9.9650599, lng: 78.7204283 } },
    { city: "Tenkasi", coordinate: { lat: 9.0933908, lng: 77.4758373 } },
    { city: "Thanjavur", coordinate: { lat: 10.659037, lng: 79.2014278 } },
    { city: "Theni", coordinate: { lat: 9.8692558, lng: 77.4222974 } },
    { city: "Thoothukudi", coordinate: { lat: 8.8457035, lng: 77.9938178 } },
    { city: "Tiruchirappalli", coordinate: { lat: 10.804973, lng: 78.6870296 } },
    { city: "Tirunelveli", coordinate: { lat: 8.5495014, lng: 77.5805178 } },
    { city: "Tirupathur", coordinate: { lat: 12.4529622, lng: 78.5531439 } },
    { city: "Tiruppur", coordinate: { lat: 10.7915267, lng: 77.5325466 } },
    { city: "Tiruvallur", coordinate: { lat: 13.1394221, lng: 79.9070839 } },
    { city: "Tiruvannamalai", coordinate: { lat: 12.4289282, lng: 78.99915 } },
    { city: "Tiruvarur", coordinate: { lat: 10.7189985, lng: 79.5304887 } },
    { city: "Vellore", coordinate: { lat: 12.9021849, lng: 79.061104 } },
    { city: "Viluppuram", coordinate: { lat: 12.1166966, lng: 79.5989236 } },
    { city: "Virudhunagar", coordinate: { lat: 9.4926289, lng: 77.8631831 } },
  ];

  const handleGeneratePDF = async (event) => {
    event.preventDefault();
    const form = event.target.closest("form");
    console.log("--->", form[4].value);
    

    const data = new FormData(form);
    const formValues = Object.fromEntries(data.entries());
    
    
    const doc = new jsPDF();
    Object.entries(formValues).forEach(([key, value], index) => {
      doc.text(20, 20 + index * 10, `${key}: ${value}`);
    });

    console.log(formValues.location.split(","));

    const pdfBlob = doc.output("blob");
    const file = new File([pdfBlob], "form-data.pdf", { type: "application/pdf" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3320/generate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const support=await axios.post()
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Error uploading PDF");
    }
  };



  const handleGenerateExcel = async (event) => {
    event.preventDefault();


    const form = event.target.closest("form");


    const data = new FormData(form);
    const formValues = Object.fromEntries(data.entries());
 


    const ws = XLSX.utils.json_to_sheet([formValues]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FormData");
    const excelBlob = new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const file = new File([excelBlob], "form-data.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });


    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3320/generate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading Excel:", error);
      alert("Error uploading Excel");
    }
  };



  const handleSubmit = () => {

  }



  return (
    <Form style={{ marginTop: 50 }} className="w-50 mx-auto" >
      <Form.Group controlId="eventName">
        <FloatingLabel className="mb-3" label="Event Name">
          <Form.Control name="eventName" type="text" required />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="name">
        <FloatingLabel className="mb-3" label="Name">
          <Form.Control name="name" type="text" required />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <FloatingLabel className="mb-3" label="Phone Number">
          <Form.Control name="phoneNumber" type="number" required min={6000000000} max={9999999999} />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="email">
        <FloatingLabel className="mb-3" label="Email">
          <Form.Control name="email" type="email" required />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="location">
        <FloatingLabel className="mb-3" label="Location">
          <Form.Select name="location" required>
            {districts.map((dis, index) => (
              <option key={dis + index} value={`${dis.coordinate.lat},${dis.coordinate.lng}`}>
                {dis.city}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
      {/* <Form.Group controlId="eventDate">
        <FloatingLabel className="mb-3" label="Event Date">
          <Form.Control name="date" type="date" min={new Date().toISOString().split("T")[0]} defaultValue={new Date().toISOString().split("T")[0]} required onChange={(e) => setFlagDate(e.target.value)} />
        </FloatingLabel>
      </Form.Group> */}
      <Form.Group controlId="eventDateAndTime">
        <FloatingLabel className="mb-3" label="Event Date & Time">
          <Form.Control name="time" type="datetime-local" min={new Date().toISOString().substring(0, 16)} defaultValue={new Date().toISOString().substring(0, 16)} required />
        </FloatingLabel>
      </Form.Group>
      <Row className="px-2">
        <Col xs={6}>
          <Button variant="dark" type="submit" onClick={handleGeneratePDF}>
            Generate PDF
          </Button>
        </Col>
        <Col xs={6}>
          <Button variant="dark" type="submit" onClick={handleGenerateExcel}>
            Generate Excel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Generator;
