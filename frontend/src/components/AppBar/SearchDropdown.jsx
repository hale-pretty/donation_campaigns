import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Divider, Input } from "antd";
import { categories, popularSearches, quickFilter } from "../dummy";

const SearchDropdown = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (props.isHovered) {
      setIsHovered(props.isHovered);
    }
  }, [props.isHovered]);

  return (
    <div className="SearchDropdown w-50">
      <div className="position-relative w-100">
        <Input
          className="Input-Search-Dropdown"
          bordered={false}
          addonBefore={<SearchOutlined className="p-0" />}
          placeholder="Search crowdfunding..."
          onClick={() => setIsHovered(true)}
          onChange={() => setIsHovered(true)}
        />
      </div>
      {isHovered && (
        <div className="hover_search"
        onMouseLeave={() => setIsHovered(false)}
        >
          <Divider className="m-0" />
          <div className="d-flex flex-wrap gap-2 mb-4 mt-4">
            {categories.map((category, index) => (
              <Button key={index} className="button-category btn">
                <span>{category.icon}</span>
                <span>{category.text}</span>
              </Button>
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
  );
};

export default SearchDropdown;
