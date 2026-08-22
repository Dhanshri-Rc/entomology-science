import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import AimScope from "./pages/AimScope";
import CallForPapers from "./pages/CallForPapers";
import Submission from "./pages/Submission";
import Publication from "./pages/Publication";
import Contact from "./pages/Contact";
import SubmitPaper from "./pages/SubmitPaper";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aims-and-scope" element={<AimScope />} />
        <Route path="/call-for-papers" element={<CallForPapers />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/publication" element={<Publication />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/submit-paper" element={<SubmitPaper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
