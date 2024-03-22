import React, { Fragment, useState } from "react";
import axios from 'axios';
import swal from "sweetalert";
//import Multistep from "react-multistep";
import { Stepper, Step } from 'react-form-stepper';

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";


const Wizard = () => {
	const [goSteps, setGoSteps] = useState(0);

	const handleStepOneSubmit = async (data) => {
		try {
		  const response = await axios.post('http://127.0.0.1:8000/api/classes/', data);
		  console.log(response);
			
		  swal("Success!", "Data Saved Successfully!", "success");


		} catch (error) {
		  console.error("Error:", error);
		  swal("Error!", "Something Went Wrong", "error");

		}
	  };

	const handleStepTwoSubmit = async (data) => {
		
		try {
		  const response = await axios.post('http://127.0.0.1:8000/api/subjects/', data);

		  console.log(response);
			
		  swal("Success!", "Data Saved Successfully!", "success");


		} catch (error) {
		  console.error("Error:", error);

		  swal("Error!", "Something Went Wrong", "error");

		}
	  };
	  const handleStepThreeSubmit = async (data) => {
		
		try {
		  const response = await axios.post('http://127.0.0.1:8000/api/teachers/', data);
		  console.log(response);
			
		  swal("Success!", "Data Saved Successfully!", "success");


		} catch (error) {
		  console.error("Error:", error);
		  swal("Error!", "Something Went Wrong", "error");

		}
	  };

	  const handleStepFourSubmit = async (data) => {
		try {
		  const response = await axios.post('http://127.0.0.1:8000/api/divisions/', data);
		  console.log(response);
			
		  swal("Success!", "Data Saved Successfully!", "success");


		} catch (error) {
		  console.error("Error:", error);
		  swal("Error!", "Something Went Wrong", "error");

		}
	  };

	  const handleStepFiveSubmit = async (data) => {

		try {
		  const response = await axios.post('http://127.0.0.1:8000/api/schedule/', data);
		  console.log(response);
			
		  swal("Success!", "Data Saved Successfully!", "success");


		} catch (error) {
		  console.error("Error:", error);
		  swal("Error!", "Something Went Wrong", "error");

		}
	  };


	return (
		<Fragment>

			<div className="row">
				<div className="col-xl-12 col-xxl-12">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Fill This Details to Generate Time Table</h4>
						</div>
						<div className="card-body">

							<div className="form-wizard ">
								<Stepper className="nav-wizard" activeStep={goSteps} label={false}>
									<Step className="nav-link" onClick={() => setGoSteps(0)} />
									<Step className="nav-link" onClick={() => setGoSteps(1)} />
									<Step className="nav-link" onClick={() => setGoSteps(2)} />
									<Step className="nav-link" onClick={() => setGoSteps(3)} />
									<Step className="nav-link" onClick={() => setGoSteps(4)} />
								</Stepper>
								{goSteps === 0 && (
									<>
										<StepOne onNextClick={handleStepOneSubmit} />
										<div className="text-end toolbar toolbar-bottom p-2">
											<button className="btn btn-primary sw-btn-next" onClick={() => setGoSteps(1)}>Next</button>
										</div>
									</>
								)}
								{goSteps === 1 && (
									<>
										<StepTwo onNextClick={handleStepTwoSubmit}  />
										<div className="text-end toolbar toolbar-bottom p-2">
											<button className="btn btn-secondary sw-btn-prev me-1" onClick={() => setGoSteps(0)}>Prev</button>
											<button className="btn btn-primary sw-btn-next ms-1" onClick={() => setGoSteps(2)}>Next</button>
										</div>
									</>
								)}
								{goSteps === 2 && (
									<>
										<StepThree onNextClick={handleStepThreeSubmit} />
										<div className="text-end toolbar toolbar-bottom p-2">
											<button className="btn btn-secondary sw-btn-prev me-1" onClick={() => setGoSteps(1)}>Prev</button>
											<button className="btn btn-primary sw-btn-next ms-1" onClick={() => setGoSteps(3)}>Next</button>
										</div>
									</>
								)}
								{goSteps === 3 && (
									<>
										<StepFour onNextClick={handleStepFourSubmit} />
										<div className="text-end toolbar toolbar-bottom p-2">
											<button className="btn btn-secondary sw-btn-prev me-1" onClick={() => setGoSteps(2)}>Prev</button>
											<button className="btn btn-primary sw-btn-next ms-1" onClick={() => setGoSteps(4)}>Next</button>
										</div>
									</>
								)}
								{goSteps === 4 && (
									<>
										<StepFive onNextClick={handleStepFiveSubmit} />
										<div className="text-end toolbar toolbar-bottom p-2">
											<button className="btn btn-secondary sw-btn-prev me-1" onClick={() => setGoSteps(2)}>Prev</button>
											<button className="btn btn-primary sw-btn-next ms-1" onClick={() => setGoSteps(4)}>Submit</button>
										</div>
									</>
								)}

							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Wizard;
