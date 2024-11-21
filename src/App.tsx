import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Orders from "./containers/Orders/Orders.tsx";
import Admin from "./containers/Admin/Admin.tsx";
import NewPizzaDish from "./containers/NewPizzaDish/NewPizzaDish.tsx";
import EditPizzaDish from "./containers/EditPizzaDish/EditPizzaDish.tsx";


const App = () => {
  return (
      <>
        <Layout>
          <Routes>
              <Route path="/admin" element={<Admin/>} />
              <Route path="/admin/dishes" element={<Admin/>} />
              <Route path="/admin/addNewDish" element={<NewPizzaDish />} />
              <Route path="/admin/:id/edit" element={<EditPizzaDish />} />
            <Route path="/admin/orders" element={<Orders/>} />
          </Routes>
        </Layout>
      </>
  );
};

export default App;
