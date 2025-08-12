import React, { useState } from 'react';
import { 
  IconButton, 
  Menu, 
  MenuHandler, 
  MenuList, 
  MenuItem, 
  Typography 
} from '@material-tailwind/react';
import { 
  PlusIcon, 
  UserPlusIcon, 
  BuildingOfficeIcon, 
  DocumentPlusIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Add Student',
      icon: UserPlusIcon,
      action: () => navigate('/dashboard/students'),
      color: 'text-blue-600',
      emoji: '👤'
    },
    {
      label: 'Create Section',
      icon: BuildingOfficeIcon,
      action: () => navigate('/dashboard/section'),
      color: 'text-orange-600',
      emoji: '🏫'
    },
    {
      label: 'New Quiz',
      icon: DocumentPlusIcon,
      action: () => navigate('/dashboard/quiz'),
      color: 'text-purple-600',
      emoji: '📝'
    },
    {
      label: 'Add Module',
      icon: BookOpenIcon,
      action: () => navigate('/dashboard/modules'),
      color: 'text-green-600',
      emoji: '📚'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Menu open={isOpen} handler={setIsOpen} placement="top-end">
        <MenuHandler>
          <IconButton
            size="lg"
            className={`
              rounded-full shadow-2xl transition-all duration-300 transform
              ${isOpen ? 'rotate-45 scale-110' : 'hover:scale-110'}
              bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
              border-4 border-white
            `}
          >
            <PlusIcon className="h-6 w-6 text-white" />
          </IconButton>
        </MenuHandler>
        
        <MenuList className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm p-2">
          {quickActions.map((action, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                action.action();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">{action.emoji}</span>
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    {action.label}
                  </Typography>
                  <Typography variant="small" className={`${action.color} text-xs`}>
                    Quick action
                  </Typography>
                </div>
              </div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default FloatingActionButton;
