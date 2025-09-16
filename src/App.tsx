import { Route, Routes } from "react-router-dom";

import {Home} from "./pages/Home";

import Login from "./pages/Login";
import Layout from "./components/Layout";
import { SnippetForm } from "./components/snippet/SnippetForm";
import AuthLayout from "./components/AuthLayout";
import PageNotFound from "./components/pageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./ui/Modal";

function App() {
  return (
    <>
      <Modal>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            element={
              <Layout>
                <AuthLayout />
              </Layout>
            }
          >
            <Route index element={<Home />} />
            <Route path="/createSnippet" element={<SnippetForm />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default App;
