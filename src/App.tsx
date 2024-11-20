import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import AddNewDish from "./components/AddNewDish/AddNewDish.tsx";


const App = () => {
  return (
      <>
        <Layout>
          <Routes>
            <Route path="/addNewDish" element={<AddNewDish/>} />
          </Routes>
        </Layout>
      </>
  );
};

export default App;
