import React, { useState, Fragment } from "react";
import Select from "react-select";
import CustomGroup from "./CustomGroup";
import Disabling from "./Disabling";
import CustomClearIndicator from "./MultiSelect";
import PageTitle from "../../../layouts/PageTitle";

const options = [
   { value: "chocolate", label: "Chocolate" },
   { value: "strawberry", label: "Strawberry" },
   { value: "vanilla", label: "Vanilla" },
];

const Select2 = () => {
   const [selectedOption, setSelectedOption] = useState(null);

   return (
      <Fragment>
         <PageTitle activeMenu="Select2" motherMenu="Plugins" />

         <div className="row">
            
            <div className="col-xl-12">
               <div className="card">
                  <div className="card-body">
                     <div className="mb-4">
                        <h4 className="card-title">Multi-select boxes</h4>
                        <p>
                           Select2 also supports multi-value select boxes. The
                           select below is declared with the multiple
                           <mark className="text-primary">attribute</mark>.
                        </p>
                     </div>

                     <CustomClearIndicator></CustomClearIndicator>
                  </div>
               </div>
            </div>
            
         </div>
      </Fragment>
   );
};

export default Select2;
