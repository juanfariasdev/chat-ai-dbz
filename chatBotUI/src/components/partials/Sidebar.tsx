import { useState } from 'react';
import { HelpCircle, Settings, Menu, X } from 'lucide-react';
import DBLogo from '../../assets/Dragon_Ball_Z_logo.svg';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`bg-secondary min-h-screen p-4 flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className='flex items-center h-20 max-w-full'>
        <div className="flex-shrink-0 max-w-full">
          <img src={DBLogo} alt="Assistente Dragon Ball Z" className={`h-12 ${isOpen ? 'block' : 'hidden'}`} />
        </div>
        <div className="ml-auto">
          {isOpen ? (
            <X className="w-8 h-8 cursor-pointer text-white" onClick={toggleSidebar} />
          ) : (
            <Menu className="w-8 h-8 cursor-pointer text-white" onClick={toggleSidebar} />
          )}
        </div>
      </div>
      <div className="space-y-4">
        <SidebarItem icon={<HelpCircle className="w-6 h-6" />} label="Ajuda" isOpen={isOpen} />
        <SidebarItem icon={<Settings className="w-6 h-6" />} label="Configurações" isOpen={isOpen} />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, isOpen }: { icon: React.ReactNode; label: string; isOpen: boolean }) {
  return (
    <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-500 p-2 rounded-lg transition-colors text-white">
      <div className="flex-shrink-0">{icon}</div>
      {isOpen && <p className="block">{label}</p>}
    </div>
  );
}
