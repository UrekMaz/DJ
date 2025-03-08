import React, { useEffect, useRef } from 'react';

const TableauEmbed = () => {
  const vizRef = useRef(null);
  const vizUrl =
    "https://public.tableau.com/views/CRMSalesDashboard_17405967603400/SalesDashboard?:language=en-GB&:display_count=n&:origin=viz_share_link";

  useEffect(() => {
    const initViz = () => {
      if (window.tableau) {
        const options = {
          hideTabs: true,
          hideToolbar: true,
          width: '100%',
          height: '100%'
        };

        const vizDiv = vizRef.current;
        new window.tableau.Viz(vizDiv, vizUrl, options);
      }
    };

    const loadTableauAPI = () => {
      const scriptId = 'tableau-api';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.src = 'https://public.tableau.com/javascripts/api/tableau-2.min.js'; // ✅ Use v2 for Viz support
        script.onload = initViz;
        document.head.appendChild(script);
      } else {
        initViz();
      }
    };

    loadTableauAPI();

    return () => {
      if (vizRef.current) {
        vizRef.current.innerHTML = '';
      }
    };
  }, [vizUrl]);

  return (
    <div
      ref={vizRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    ></div>
  );
};

export default TableauEmbed;
