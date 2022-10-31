import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import multipageContext from './contexts/mulitpageContext';

const EditMulti = () => {

    const multi = useLocation().state.prevmulti
    //getting context multipage context
    const context = useContext(multipageContext);
    const { updateMultipage} = context;
  
    //setting multipage title and pages
    const [title, setTitle] = useState(multi.title);
    const [pages, setPages] = useState(multi.pages);
  
    //checking if pages input is empty
    const isempty = (list) => {
      let flag = false;
      for (let k = 0; k < list.length; k++) {
        if (list[k].subtitle.length < 10 || list[k].desc.length < 70) {
          flag = true;
        }
      }
      return flag;
    };
  
    //adding page
    const addpage = () => {
      const newpages = [...pages, { subtitle: "", desc: "" }];
      setPages(newpages);
    };
  
    //onchnage
    const onchange = (e, j) => {
      pages[j] = { ...pages[j], [e.target.name]: e.target.value };
    };
  
    //add multipage
    const save = () => {
      if (title.length <= 20) {
        alert("Title Should be atleast 20 characters long");
      } else if (isempty(pages)) {
        alert(
          "Sub-title should be minimum 10 and description should be minimum 100 characters"
        );
      } else {
        let multipage = { title: title, pages: pages };
        updateMultipage(multi._id,multipage)
      }
    };
  
    return (
      <div className="multipage-cont">
        {/* header */}
        <div className="multi-header">
          <ul>
            <li>
              <button onClick={addpage}>Add Page</button>
            </li>
  
            <li>
              <button onClick={save}>Save</button>
            </li>
          </ul>
        </div>
  
        <div>
          <input
            className="multi_page_title"
            placeholder="Title"
            name="title"
            id="title"
            autoComplete="off"
            defaultValue={title}
            maxLength={50}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
  
        <div className="page_slider">
          <div className="page_cont" id="page_cont">
            {pages.map((page) => {
              let i = pages.indexOf(page);
              return (
                <div key={i} className="page" id={i.toString()}>
                  <input
                    className="multi_subtitle"
                    placeholder="Sub-Title"
                    name="subtitle"
                    id="subtitle"
                    autoComplete="off"
                    maxLength={70}
                    defaultValue={pages[i].subtitle}
                    onChange={(e) => onchange(e, i)}
                  ></input>
                  <textarea
                    cols={65}
                    rows={14}
                    className="multi_desc"
                    placeholder="Description"
                    maxLength={970}
                    name="desc"
                    id="desc"
                    autoComplete="off"
                    defaultValue={pages[i].desc}
                    onChange={(e) => onchange(e, i)}
                  ></textarea>
                  <p>
                    {i + 1} / {pages.length}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    );
  };

export default EditMulti
