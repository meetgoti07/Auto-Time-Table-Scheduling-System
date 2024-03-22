import React, { useState } from "react";
import Select from "react-select";
import { colourOptions } from "./data";

const CustomClearText = () => "clear all";
const ClearIndicator = (props) => {
   const {
      children = <CustomClearText />,
      getStyles,
      innerProps: { ref, ...restInnerProps },
   } = props;
   return (
      <div
         {...restInnerProps}
         ref={ref}
         style={getStyles("clearIndicator", props)}
      >
         <div style={{ padding: "0px 5px" }}>{children}</div>
      </div>
   );
};

const ClearIndicatorStyles = (base, state) => ({
   ...base,
   cursor: "pointer",
   color: state.isFocused ? "blue" : "black",
});

export default function CustomClearIndicator({ index, onSave }) {
   const [selectedOptions, setSelectedOptions] = useState([]);

   const handleChange = (selectedValues) => {
      setSelectedOptions(selectedValues);
      const selectedValuesArray = selectedValues.map(option => option.value);
      onSave(index, selectedValuesArray);
   };


   return (
      <div>
         <Select
            closeMenuOnSelect={false}
            components={{ ClearIndicator }}
            styles={{ clearIndicator: ClearIndicatorStyles }}
            value={selectedOptions}
            onChange={handleChange}
            isMulti
            options={colourOptions}
         />
      </div>
   );
}
