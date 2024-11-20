import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import AddNewDish from "./components/AddNewDish/AddNewDish.tsx";
import Dishes from "./containers/Dishes/Dishes.tsx";


const App = () => {
  return (
      <>
        <Layout>
          <Routes>
              <Route path="/dishes" element={<Dishes/>} />
            <Route path="/addNewDish" element={<AddNewDish/>} />
          </Routes>
        </Layout>
      </>
  );
};

export default App;
