import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addBenefit, addClubBenefit, addTravelBenefit, fetchBenefits, fetchClubBenefits } from "../redux/appSlice";

const TravelForm = ({searchId , handleCancel , travelStatus}) => {

  const dispatch = useDispatch();

  const initialValues = {
    travelling: "",
    pickUpDrop: "",
    accommodation: "",
    food: "",
    sightseeing: "",
    medicalFacilities: "",
    games: "",
    gym: "",
    movie: "",
    anniversaryDinner: "",
    events: [],
    memberId : searchId
  };

  const validationSchema = Yup.object().shape({
    // gym: Yup.string().required("Gym membership is required"),
    // events: Yup.array().min(1, "At least one event must be selected"),
  });

  const handleSubmit = async (values) => {

    let result ;
    if(travelStatus === "travel") {

    result =  dispatch(addTravelBenefit(values));

    dispatch(fetchBenefits(searchId));

    }else {

       result =  dispatch(addClubBenefit(values));

       dispatch(fetchClubBenefits(searchId));
    }
    

    handleCancel();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="p-4 bg-gray-100 rounded-md">
        {  (travelStatus === "travel"  ) &&  
        
        <div> 
          
          <h2 className="text-xl font-semibold mb-4">Travel Form</h2>

          <div className="mb-3">
            <label>Travelling:</label>
            <Field name="travelling" className="border p-2 w-full"   />
          </div>

          <div className="mb-3">
            <label>Pick-up & Drop:</label>
            <Field name="pickUpDrop" className="border p-2 w-full"   />
          </div>

          <div className="mb-3">
            <label>Accommodation:</label>
            <Field name="accommodation" className="border p-2 w-full"   />
          </div>

          <div className="mb-3">
            <label>Food:</label>
            <Field name="food" className="border p-2 w-full"   />
          </div>

          <div className="mb-3">
            <label>Sightseeing:</label>
            <Field name="sightseeing" className="border p-2 w-full"   />
          </div>
</div> }

{ travelStatus === "club" &&
<div> 
          <div className="mb-3">
            <label>Medical Facilities:</label>
            <Field name="medicalFacilities" className="border p-2 w-full"   />
          </div>

          <div className="mb-3">
            <label>Games:</label>
            <Field name="games" className="border p-2 w-full"   />
          </div>

          <div className="mb-3">
            <label>Gym Membership:</label>
            <Field as="select" name="gym" className="border p-2 w-full">
              <option value="">Select Gym Plan</option>
              <option value="1 year for 1 person">1 year for 1 person</option>
              <option value="6 months for 2 person">6 months for 2 person</option>
            </Field>
            <ErrorMessage name="gym" component="div" className="text-red-500" />
          </div>

          <div className="mb-3">
            <label>Movie Benefits:</label>
            <Field name="movie" className="border p-2 w-full"   />
          </div>

          <div className="mb-3">
            <label>Anniversary Dinner:</label>
            <Field name="anniversaryDinner" className="border p-2 w-full"   />
          </div>

          <div className="mb-3">
            <label>Events:</label>
            <div role="group" className="flex flex-col">
              {["Holi", "Diwali", "31st Night"].map((event) => (
                <label key={event} className="flex items-center">
                  <Field type="checkbox" name="events" value={event} className="mr-2" />
                  {event}
                </label>
              ))}
            </div>
            <ErrorMessage name="events" component="div" className="text-red-500" />
          </div>
              </div> }
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TravelForm;
