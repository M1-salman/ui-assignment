import CustomSelect from '@/cuteui/components/custom-select';
import FormWrapper from './FormWrapper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import { SelectChangeEvent } from '@mui/material';

interface ConditionFormData {
  conditionName: string;
  dataProperty: string;
  operator: string;
  value: string;
}

interface ConditionFormProps {
  conditionFormData: ConditionFormData;
  setConditionFormData: React.Dispatch<React.SetStateAction<ConditionFormData>>;
  onSave: () => void;
  setShowConditionForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const conditionOptions = ['Instagram', 'Facebook', 'Twitter'];
const dataOptions = ['Usertype'];
const operatorOptions = ['Is equal to', 'Not equal to'];

const ConditionForm: React.FC<ConditionFormProps> = ({
  conditionFormData,
  setConditionFormData,
  onSave,
  setShowConditionForm
}) => {
  const toStringVal = (e: SelectChangeEvent<string | string[]>) => {
    const v = e.target.value;
    return Array.isArray(v) ? (v[0] ?? '') : v;
  };

  const isFormValid =
    conditionFormData.conditionName.trim() !== '' &&
    conditionFormData.dataProperty.trim() !== '' &&
    conditionFormData.operator.trim() !== '' &&
    conditionFormData.value.trim() !== '';

  return (
    <FormWrapper className="top-20 z-20">
      <div className="flex items-center gap-x-3">
        <button onClick={() => setShowConditionForm(false)}><ArrowBackIcon /></button>
        <span className="font-semibold">Add condition details</span>
        <InfoIcon />
      </div>
      <form className="flex flex-col gap-y-4 mt-3">
        <label className="flex flex-col">
          <span className="text-sm mb-2">Condition name</span>
          <CustomSelect
            value={conditionFormData.conditionName}
            onChange={(e) =>
              setConditionFormData((prev) => ({
                ...prev,
                conditionName: toStringVal(e),
              }))
            }
            options={conditionOptions}
            placeholder="Select"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm mb-2">Data property</span>
          <CustomSelect
            value={conditionFormData.dataProperty}
            onChange={(e) =>
              setConditionFormData((prev) => ({
                ...prev,
                dataProperty: toStringVal(e),
              }))
            }
            options={dataOptions}
            placeholder="Select"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm mb-2">Operator</span>
          <CustomSelect
            value={conditionFormData.operator}
            onChange={(e) =>
              setConditionFormData((prev) => ({
                ...prev,
                operator: toStringVal(e),
              }))
            }
            options={operatorOptions}
            placeholder="Select"
          />
        </label>
        <label htmlFor="value" className="text-sm">
          Value
        </label>
        <input
          type="text"
          id="value"
          className="border rounded-md border-[#BBBBBB] p-2"
          value={conditionFormData.value}
          onChange={(e) =>
            setConditionFormData((prev) => ({ ...prev, value: e.target.value }))
          }
        />
      </form>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          disabled={!isFormValid}
          onClick={onSave}
          className={`w-20 h-10 rounded-md text-sm font-medium transition-colors 
    ${
      isFormValid
        ? 'bg-[#389F7F] text-white hover:bg-[#2d7a61] cursor-pointer'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
        >
          Save
        </button>
      </div>
    </FormWrapper>
  );
};

export default ConditionForm;
