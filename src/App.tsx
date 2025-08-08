import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Layout from "./components/Layout";
import { SnippetForm } from "./components/snippet/SnippetForm";
import AuthLayout from "./components/AuthLayout";
import PageNotFound from "./components/pageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./components/Modal";

function App() {
  return (
    <Layout>
      <Modal>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            {/* <Route path='/snippetTemplate' */}
            <Route path="/createSnippet" element={<SnippetForm />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
          </Modal>
      <ToastContainer />
    </Layout>
  );
}

export default App;
