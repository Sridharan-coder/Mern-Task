import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import privateRoute from "../Rotings/PrivateRoutes/PrivateRoutes";
import vr46 from "../../Assets/vr46.jpg";
import {
  Tab,
  Tabs,
  Col,
  Row,
} from "react-bootstrap";
import Logout from "../../Pages/Logout/Logout";
// import  from 'react-bootstrap/Button';

const PrivateRouting = () => {
  const [navigatePage, setNavigatepage] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(navigatePage);

    // eslint-disable-next-line
  }, [navigatePage]);
  return (
    <>
      <Row className="navBar mt-2">
        <Col xs={10} className="text-white ms-0 pe-0">
          <Tabs
            defaultActiveKey="/dashboard"
            id="uncontrolled-tab-example"
            className=" bg-dark bg-gradient"
            onSelect={(k) => setNavigatepage(k)}
            fill
          >
            <Tab eventKey="/dashboard" title="Dashboard" ></Tab>
            <Tab eventKey="/generator" title="Generator"></Tab>
            <Tab eventKey="/corasalImage" title="Image"></Tab>
            <Tab eventKey="/visualize" title="Visualize" ></Tab>
          </Tabs>
        </Col>
        <Col  xs={2} className=" bg-dark bg-gradient text-white d-flex justify-content-center logoutbtn">
          <Logout />
        </Col>
      </Row>
      <Row className="UIContent d-flex justify-content-center bg-secondary bg-gradient mb-2 text-white" style={{height:"93vh"}} >

        <Routes>
          {privateRoute.map((route, index) => {
            let Component = route.component;
            return (
              <Route
                key={`route-${index}`}
                path={route.path}
                element={
                  <Suspense
                    fallback={
                      <>
                        <img
                          src={vr46}
                          alt="vr46"
                          width={"100%"}
                          height={"100%"}
                        />
                      </>
                    }
                  >
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Routes>

      </Row>
    </>
  );
};

export default PrivateRouting;
