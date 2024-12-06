
import { useSelector } from "react-redux";
import "./App.css";
import PrivateRouting from "./Routes/PrivateRouting/PrivateRouting";
import PublicRouting from "./Routes/PublicRouting/PublicRouting";

function App() {
  const logDetails = useSelector((detail) => detail.authentication.loggedIn);

  return (
    // <>
    //   {isDataKeys.token ?
    //     <PrivateLayout /> :
    //     <Routes>
    //       {(PublicRouting.map((route, index) => {
    //         let Component = route.component;
    //         return (
    //           <Route
    //             key={`route-${index}`}
    //             path={route.path}
    //             element={
    //               <Suspense
    //                 fallback={
    //                   <Row
    //                     justify="center"
    //                     style={{ lineHeight: "697px" }}
    //                   >
    //                     <Col>
    //                       <Spin size="large" />
    //                     </Col>
    //                   </Row>
    //                 }
    //               >
    //                 <Component />
    //               </Suspense>
    //             }
    //           />
    //         );
    //       }))}
    //     </Routes>
    //   }
    // </>

    <>
      {logDetails ? <PrivateRouting /> : <PublicRouting />}

      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Logout />} />
      </Routes> */}
    </>
  );
}

export default App;
