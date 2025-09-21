interface MenuItem {
  id: number;
  icon: React.ComponentType;
  text: string;
}

interface MenuListProps {
  menuItems: MenuItem[];
  selectedId?: number | null;
  onItemClick?: (id: number) => void;
}

export default function MenuList({ menuItems, selectedId, onItemClick }: MenuListProps) {
  return (
    <div>
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        const isSelected = selectedId === item.id;

        return (
          <div
            key={item.id}
            className={`flex items-center h-12 cursor-pointer ${
              isSelected ? 'bg-[#E2F3EF] border-l-2 border-l-[#389F7F] text-[#389F7F]' : ''
            }`}
            onClick={() => onItemClick?.(item.id)}
          >
            <div className="mx-5">
              <IconComponent />
            </div>
            <span className="text-[0.875rem] font-medium">{item.text}</span>
          </div>
        );
      })}
    </div>
  );
}
