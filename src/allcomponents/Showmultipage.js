import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import multipageContext from "./contexts/mulitpageContext";
import "./css/showmultipage.css";
import edit from "./Images/edit.png";
import deleteimg from "./Images/delete.png";

const ShowMultipage = () => {

  const nevigate = useNavigate()
  const context = useContext(multipageContext);
  const { getMultipage, multipage, deleteMultipage } = context;


  const id = useLocation().state.multipage;

  useEffect(() => {
    getMultipage(id);
  }, [id]);

  return (
    <>
      {multipage !== null && multipage !== undefined ? (
        <div className="show_multi_page_main">
          <div className="headshownote">
            <div className="showimages">
              <>
                <img
                  src={deleteimg}
                  alt="logo"
                  onClick={() => {
                    deleteMultipage(id);
                    getMultipage(id);
                  }}
                ></img>
                <img
                  src={edit}
                  alt="logo"
                  onClick={() => {
                    nevigate("/EditMultipage",{state:{prevmulti:multipage}})
                  }}
                ></img>
              </>
            </div>
          </div>
          <div className="show_multipage_cont">
             <p className="show_multi_date">
                 {multipage.date.split("T")[0]}
              </p>
            <div className="multi_title">❖{" " + multipage.title}</div>
            <div className="show_page_cont">
              {multipage.pages.map((page) => {
                return (
                  <div key={page._id} className="show_page">
                    <p className="multi_show_subtitle">➢ {page.subtitle}</p>
                    <p className="multi_show_desc">{page.desc}</p>        
            
                    <p className="show_page_index">{multipage.pages.indexOf(page)+1} / {multipage.pages.length}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShowMultipage;
