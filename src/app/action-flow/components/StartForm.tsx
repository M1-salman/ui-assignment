import CustomSelect from '@/cuteui/components/custom-select';
import { SelectChangeEvent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import FormWrapper from './FormWrapper';

interface FormData {
  name: string;
  description: string;
  tag: string;
  notificationType: string;
}

interface FormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const tagOptions = ['User Onboarding', 'Payment Processing', 'Email Automation'];
const notificationOptions = ['Email', 'SMS', 'Push Notification'];

const StartForm = ({ formData, setFormData, setIsStart, setIsSubmit }: FormProps) => {
  const toStringVal = (e: SelectChangeEvent<string | string[]>) => {
    const v = e.target.value;
    return Array.isArray(v) ? (v[0] ?? '') : v;
  };

  // Check if all form fields are filled
  const isFormValid =
    formData.name.trim() !== '' &&
    formData.description.trim() !== '' &&
    formData.tag !== '' &&
    formData.notificationType !== '';

  const handleClick = () => {
    if (isFormValid) {
      setIsStart(false);
      setIsSubmit(true);
    }
  };

  return (
    <FormWrapper>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-x-3">
          <button onClick={() => setIsStart(false)}>
            <ArrowBackIcon />
          </button>
          <span className="font-semibold">Choose receipt type</span>
          <InfoIcon />
        </div>
        <form className="flex flex-col gap-y-3 mt-3 flex-grow">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border rounded-md border-[#BBBBBB] p-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="border rounded-md border-[#BBBBBB] p-2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <label className="flex flex-col">
            <span className="text-sm">Tag</span>
            <CustomSelect
              value={formData.tag}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tag: toStringVal(e),
                })
              }
              options={tagOptions}
              placeholder="Select"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm">Notification type</span>
            <CustomSelect
              value={formData.notificationType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notificationType: toStringVal(e),
                })
              }
              options={notificationOptions}
              placeholder="Select"
            />
          </label>
        </form>

        <div className="flex justify-end mt-4">
          <button
            className={`w-20 h-10 rounded-md text-sm font-medium transition-colors ${
              isFormValid
                ? 'text-[#FFFFFF] bg-[#389F7F] hover:bg-[#2d7a61] cursor-pointer'
                : 'text-gray-400 bg-gray-300 cursor-not-allowed'
            }`}
            onClick={handleClick}
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </div>
    </FormWrapper>
  );
};

export default StartForm;
