import { useState } from 'react';
import Button from '../../components/Button';
import FormDescription from '../../components/FormDescription';
import Input from '../../components/Input';
import Stepper from '../../components/Stepper';
import { useForm } from '../../context/FormContext';
import { ErrorMessages, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../components/ErrorText';

const ProjectDetails = () => {
  const { updateFormData, goToNextStep, currentStep, formData } = useForm();

  const [validationError, setValidationError] = useState(false);

  const handleUpdateName = (e: any) => {
    setValidationError(false);
    updateFormData({
      projectDetails: {
        ...formData.projectDetails,
        projectName: e.target.value
      }
    });
  };

  const handleUpdateDescription = (e: any) => {
    setValidationError(false);
    updateFormData({
      projectDetails: {
        ...formData.projectDetails,
        projectDescription: e.target.value
      }
    });
  };

  const handleNextStepChange = () => {
    if (
      !formData.projectDetails?.projectDescription ||
      !formData.projectDetails.projectName || 
      formData.projectDetails.projectName.trim() === '' ||
      formData.projectDetails.projectDescription.trim() === '' 
    ) {
      setValidationError(true);
      return;
    }

    goToNextStep();
  };

  return (
    <>
    <div>
    <Stepper
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />
      <FormDescription
        title="Share some project details"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
    </div>
      <Input
        type="text"
        label="Project Name"
        placeholder="MoneyMingle"
        value={formData.projectDetails?.projectName}
        onChange={handleUpdateName}
        required
      />
      <Input
        type="textarea"
        label="Project Description"
        placeholder="Two lines about your project"
        value={formData.projectDetails?.projectDescription}
        onChange={handleUpdateDescription}
        required
      />
      {validationError && <ErrorText message={ErrorMessages.inputFieldError} />}
      <div>
        <Button onClick={handleNextStepChange}>Next</Button>
      </div>
    </>
  );
};

export default ProjectDetails;
