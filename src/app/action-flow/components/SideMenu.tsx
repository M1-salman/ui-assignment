// SideMenu.tsx
import NoteIcon from '@mui/icons-material/Note';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface SideMenuProps {
  onNoteClick: () => void;
  onTreeClick: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onNoteClick, onTreeClick }) => {
  return (
    <div className="absolute top-60 left-3 flex flex-col justify-evenly items-center w-14 h-24 rounded-md z-10 bg-[#FFFFFF]">
      <div onClick={onNoteClick} className="cursor-pointer">
        <NoteIcon fontSize="large" />
      </div>
      <div onClick={onTreeClick} className="cursor-pointer">
        <AccountTreeIcon fontSize="large" />
      </div>
    </div>
  );
};

export default SideMenu;
