import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Divider, Input } from "antd";
import { categories, popularSearches, quickFilter } from "../dummy";

const SearchDropdown = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  // useEffect(() => {
  //   if(props.isHovered){
  //     setIsHovered(props.isHovered);
  //   }
  // }, [props.isHovered])

  console.log(props, isHovered, props.isHovered)

  return (
    <div className="SearchDropdown">
      <div className="position-relative w-100">
        <Input className="Input-Search-Dropdown" bordered={false} style={{ borderRadius: 10 ,border: 'none', background: '#f1f1f1', width: '100%', padding: '8px 16px'}} addonBefore={<SearchOutlined className="p-0"/>} placeholder="Search crowdfunding..." />

        {isHovered && (
          <div className="hover_search" onMouseLeave={() => setIsHovered(true)}>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {categories.map((category, index) => (
                <button key={index} className="button-category btn">
                  <span>{category.icon}</span>
                  <span>{category.text}</span>
                </button>
              ))}
            </div>

            <Divider />

            <div className="d-flex justify-content-between">
              <div>
                <h6 className="text-muted mb-3">QUICK FILTERS</h6>
                <ul className="list-unstyled">
                  {quickFilter.map((q) => {
                    return (
                      <div key={q.label} className="border_filters">
                        {q.label}
                      </div>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h6 className="text-muted mb-3">POPULAR SEARCH TERMS</h6>
                <ul className="list-unstyled">
                  {popularSearches.map((term, index) => (
                    <div key={index} className="border_filters">
                      {term}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
