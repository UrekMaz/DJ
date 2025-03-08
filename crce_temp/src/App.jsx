// App.js
import React from 'react';
import StreamlitEmbed from './streamlit';
import RazorpayPayment from './component/Fund';
import Layout from './Layout';
import IndexPage from './IndexPage';
import SignUp from './SignUp';
import Login from './Login';
import {Route, Routes} from "react-router-dom";
import TableauDashboard from './TableauDashboard';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
           <Route path="/login" element={<Login/>} />
           <Route path="/signup" element={<SignUp/>} />
          <Route path="/tableau" element={<TableauDashboard />} />
          <Route path="/streamlit" element={<StreamlitEmbed />} />
          <Route path="/pay" element={<RazorpayPayment />} />
        </Route>
    </Routes>





  );
}

export default App;
