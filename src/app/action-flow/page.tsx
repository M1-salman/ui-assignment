'use client';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TelegramIcon from '@mui/icons-material/Telegram';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import StartForm from './components/StartForm';
import Action from './components/Action';
import SideMenu from './components/SideMenu';
import RecieptForm from './components/RecieptForm';
import ConditionForm from './components/ConditionForm';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  description: string;
  tag: string;
  notificationType: string;
}
interface ReceiptFormData {
  customerPool: string;
  audienceType: 'cohort' | 'target audience' | 'payload based' | '';
}

interface ConditionFormData {
  conditionName: string;
  dataProperty: string;
  operator: string;
  value: string;
}

function ActionFlow() {
  const [isStart, setIsStart] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isReceiptSubmitted, setIsReceiptSubmitted] = useState(false);
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [showConditionForm, setShowConditionForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    tag: '',
    notificationType: '',
  });
  const [receiptForms, setReceiptForms] = useState<ReceiptFormData[]>([]);
  const [receiptFormData, setReceiptFormData] = useState<ReceiptFormData>({
    customerPool: '',
    audienceType: '',
  });
  const [conditionForms, setConditionForms] = useState<ConditionFormData[]>([]);
  const [conditionFormData, setConditionFormData] = useState<ConditionFormData>({
    conditionName: '',
    dataProperty: '',
    operator: '',
    value: '',
  });

  const router = useRouter();

  return (
    <div className="relative flex  flex-col w-screen h-screen">
      <div className="flex justify-between items-center h-[4.5rem] border-b border-[#DEDEDE] px-9">
        <div className="flex items-center text-[#389F7F] gap-x-1">
          <div
            className="flex justify-center items-center w-8 h-8 rounded-md bg-[#E2F3EF] cursor-pointer"
            onClick={() => router.push('/side-navigation')}
          >
            <AccountTreeIcon />
          </div>
          <KeyboardArrowRightIcon />
          <span className="text-lg text-[#1F1F1F] font-semibold">
            {formData.name || 'Untitled'}
          </span>
        </div>
        <div className="flex gap-x-4">
          <button className="flex justify-between items-center w-24 h-10 border rounded-md border-[#389F7F] text-sm text-[#389F7F] font-medium px-4">
            <SaveIcon fontSize="small" /> Save
          </button>
          <button className="flex justify-between items-center w-24 h-10 border rounded-md text-sm text-[#FFFFFF] font-medium bg-[#389F7F] px-2">
            <TelegramIcon fontSize="small" /> Publish
          </button>
        </div>
      </div>

      {!isStart && isSubmit ? (
        <Action formData={formData} receiptForms={receiptForms} conditionForms={conditionForms} />
      ) : (
        <div className="relative flex justify-center items-center w-full h-full bg-[#DEDEDE]">
          <button
            className="flex justify-between items-center  w-40 h-12 border-2 border-gray-500 rounded-md text-[#FFFFFF] font-medium bg-[#1F1F1F] px-5"
            onClick={() => setIsStart(true)}
          >
            <ElectricBoltIcon />
            Click to start
          </button>
          {isStart && (
            <StartForm
              formData={formData}
              setFormData={setFormData}
              setIsStart={setIsStart}
              setIsSubmit={setIsSubmit}
            />
          )}
        </div>
      )}

      {showReceiptForm ? (
        <RecieptForm
          receiptFormData={receiptFormData}
          setReceiptFormData={setReceiptFormData}
          onSave={() => {
            setReceiptForms((prev) => [...prev, receiptFormData]);
            setReceiptFormData({ customerPool: '', audienceType: '' });
            setShowReceiptForm(false);
          }}
          setShowReceiptForm={setShowReceiptForm}
        />
      ) : showConditionForm ? (
        <ConditionForm
          conditionFormData={conditionFormData}
          setConditionFormData={setConditionFormData}
          onSave={() => {
            setConditionForms((prev) => [...prev, conditionFormData]);
            setConditionFormData({ conditionName: '', dataProperty: '', operator: '', value: '' });
            setShowConditionForm(false);
          }}
          setShowConditionForm={setShowConditionForm}
        />
      ) : isSubmit ? (
        // Render SideMenu only when no form is open
        <SideMenu
          onNoteClick={() => setShowReceiptForm(true)}
          onTreeClick={() => setShowConditionForm(true)}
        />
      ) : null}
    </div>
  );
}

export default ActionFlow;
