import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./SelectBox.css";
const SelectBox = React.forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [defaultSelected, setDefaultSelected] = useState([]);
  useEffect(() => {
    if (
      props.defaultValue &&
      props.defaultValue !== "" &&
      props.defaultValue !== 0 &&
      props.defaultValue !== "0"
    ) {
      if (props.options && props.options.length > 0 && isLoading) {
        props.setValue && props.setValue(props.name, props.defaultSelected);
        setDefaultSelected(props.defaultSelected);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [props, isLoading]);

  if (isLoading)
    return (
      <div className="input-group mb-3">
        <input
          disabled
          type="loader"
          className="form-control"
          placeholder="Loading..."
        />
        <span className="input-group-text loading-icon" id="basic-addon1">
          <i className="myloader"></i>
        </span>
      </div>
    );
  return (
    <Typeahead
      {...props}
      clearButton
      defaultSelected={defaultSelected}
      defaultValue={props.defaultValue}
      multiple={props.multiple}
      onSearch={(query) => true}
      isLoading={isLoading}
      id="type_of_business"
      onChange={props.OnChange}
      options={props.options}
      labelKey={props.labelKey}
      ref={ref}
      placeholder="Please Choose"
      positionFixed={true}
      filterBy={(option, props) => {
        if (props.selected.length) {
          // Display all the options if there's a selection.
          return true;
        }
        // Otherwise filter on some criteria.
        if(option && option.name)
        return option.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1;
        else return true;
        }
      }
    />
  );
});
export default SelectBox;
