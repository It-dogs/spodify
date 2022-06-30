import React, { useState, useEffect, useRef } from "react";
import '../../style/sidebarStyle.css';
import ListTable from "./listTable";

export default function Sidebar(props) {
  const { updateWidthOfSidebar } = props;
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(268);

  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing && mouseMoveEvent.clientX -
        sidebarRef.current.getBoundingClientRect().left>=180) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );


  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);
  

  useEffect(() => {
    sidebarRef.current && ( setSidebarWidth(sidebarRef.current.clientWidth) && updateWidthOfSidebar(sidebarRef.current.clientWidth));
  }, []);


  useEffect(() => {
    updateWidthOfSidebar(sidebarWidth);
  }, [sidebarWidth]);


  return (
    <>
      <div
        ref={sidebarRef}
        className="sidebar"
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()} 
      >
       <div className="sidebarContent"> 
        <ListTable />
       </div>
       <div className="sidebarResizer" onMouseDown={startResizing} />
      </div>
    </>
  );
}

