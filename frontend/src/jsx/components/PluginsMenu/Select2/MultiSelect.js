import React, { useState, useEffect } from "react";
import Select from "react-select";
import { colourOptions } from "./data";

const CustomClearText = () => "clear all";
const ClearIndicator = (props) => {
   const {
      children = <CustomClearText/>,
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


export default function CustomClearIndicator({ options, subjects, index, onSave }) {
   const [selectedOptions, setSelectedOptions] = useState([]);
   const formattedOptions = options.map(option => ({
      value: option,
      label: option,
      color: "#00B8D9",
   }));

   const formattedSubjects = subjects.map(subject => ({
      value: subject.subjectname,
      label: subject.subjectname,
      color: "#00B8D9",
   }));
   console.log(formattedSubjects);

   const handleChange = (selectedValues) => {
      console.log(options);
      setSelectedOptions(selectedValues);
      const selectedValuesArray = selectedValues.map(option => option.value);
      onSave(index, selectedValuesArray);
   };

   useEffect(() => {
      setSelectedOptions(formattedOptions);
   }, [options]);

   return (
      <div>
         <Select
            closeMenuOnSelect={false}
            components={{ ClearIndicator }}
            styles={{ clearIndicator: ClearIndicatorStyles }}
            value={selectedOptions}
            onChange={handleChange}
            isMulti
            options={formattedSubjects}
         />
      </div>
   );
}
