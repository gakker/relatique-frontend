import { useState } from "react";
import { useRouter } from "next/router";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState<"patient" | "doctor" | null>(null);
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();

  const steps = [
    "1- Select User Type",
    "2- Fill User Info",
    "3- Review & Submit",
  ];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as "patient" | "doctor");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderFormFields = () => {
    if (userType === "patient") {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-purple-500">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-300 bg-transparent text-purple-500"
              placeholder="Enter your age"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-purple-500">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-300 bg-transparent text-purple-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-purple-500">
              Weight
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-300 bg-transparent text-purple-500"
              placeholder="Enter your weight (kg)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-purple-500">
              Blood Group
            </label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-300 bg-transparent text-purple-500"
              placeholder="Enter your blood group"
            />
          </div>
        </>
      );
    }

    if (userType === "doctor") {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-purple-500">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-300 bg-transparent text-purple-500"
              placeholder="Enter your specialization"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-purple-500">
              Experience (in years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-300 bg-transparent text-purple-500"
              placeholder="Enter your years of experience"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-purple-500">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-300 bg-transparent text-purple-500"
              placeholder="Enter your contact number"
            />
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-transparent rounded-lg h-screen justify-center items-center dark:shadow-lg">
      <h2 className="text-3xl font-bold text-center text-purple-500 mb-6">
        User Registration
      </h2>

      <div className="flex mb-6 gap-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-1 text-center py-2 cursor-pointer ${
              activeStep === index
                ? "bg-purple-500 text-white rounded-md"
                : "bg-white/10 text-purple-500 rounded-md"
            }`}
            onClick={() => setActiveStep(index)}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="mb-6">
        {activeStep === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-purple-500">
              Please select your user type
            </h3>
            <div className="flex justify-center">
              <div className="flex space-x-4">
                <label className="text-purple-500">
                  <input
                    type="radio"
                    name="userType"
                    value="patient"
                    checked={userType === "patient"}
                    onChange={handleUserTypeChange}
                    className="mr-2"
                  />
                  Patient
                </label>
                <label className="text-purple-500">
                  <input
                    type="radio"
                    name="userType"
                    value="doctor"
                    checked={userType === "doctor"}
                    onChange={handleUserTypeChange}
                    className="mr-2"
                  />
                  Doctor
                </label>
              </div>
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-purple-500">
              Fill your details
            </h3>
            {renderFormFields()}
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-purple-500">
              Review your information
            </h3>
            <pre className="text-purple-500">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="px-4 py-2 bg-gray-300 text-purple-500 rounded-md"
        >
          Back
        </button>
        {activeStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-purple-500 text-white rounded-md"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => router.push("/confirmation")}
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
