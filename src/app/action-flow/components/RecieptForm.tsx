import CustomSelect from '@/cuteui/components/custom-select';
import FormWrapper from './FormWrapper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import { RadioButton } from '@/cuteui/components/radio';
import { SelectChangeEvent } from '@mui/material';

interface ReceiptFormData {
  customerPool: string;
  audienceType: 'cohort' | 'target audience' | 'payload based' | '';
}

interface RecieptFormProps {
  receiptFormData: ReceiptFormData;
  setReceiptFormData: React.Dispatch<React.SetStateAction<ReceiptFormData>>;
  onSave: () => void; // new
  setShowReceiptForm:React.Dispatch<React.SetStateAction<boolean>>;
}

const poolOptions = ['Instagram', 'Facebook', 'Twitter'];

const audienceOptions = [
  { value: 'cohort', label: 'Cohort' },
  { value: 'target audience', label: 'Target Audience' },
  { value: 'payload based', label: 'Payload Based' },
];

const RecieptForm: React.FC<RecieptFormProps> = ({
  receiptFormData,
  setReceiptFormData,
  onSave,
  setShowReceiptForm
}) => {
  const toStringVal = (e: SelectChangeEvent<string | string[]>) => {
    const v = e.target.value;
    return Array.isArray(v) ? (v[0] ?? '') : v;
  };

  const isFormValid =
    receiptFormData.customerPool.trim() !== '' && receiptFormData.audienceType.trim() !== '';

  return (
    <FormWrapper className="top-20 z-20">
      <div className="flex items-center gap-x-3">
        <button onClick={()=>setShowReceiptForm(false)}><ArrowBackIcon/></button>
        <span className="font-semibold">Choose receipt type</span>
        <InfoIcon />
      </div>
      <form className="flex flex-col gap-y-4 mt-3">
        <label className="flex flex-col">
          <span className="text-sm mb-2">Customer Pool</span>
          <CustomSelect
            value={receiptFormData.customerPool}
            onChange={(e) =>
              setReceiptFormData((prev) => ({
                ...prev,
                customerPool: toStringVal(e),
              }))
            }
            options={poolOptions}
            placeholder="Select"
          />
        </label>

        <RadioButton
          name="audienceType"
          options={audienceOptions}
          value={receiptFormData.audienceType}
          onChange={(_, value) =>
            setReceiptFormData((prev) => ({
              ...prev,
              audienceType: value as ReceiptFormData['audienceType'],
            }))
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
    }
  `}
        >
          Save
        </button>
      </div>
    </FormWrapper>
  );
};

export default RecieptForm;
