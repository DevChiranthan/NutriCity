import { motion } from 'framer-motion';

interface NavItem {
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface BottomNavProps {
  items: NavItem[];
}

export default function BottomNav({ items }: BottomNavProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50"
    >
      <div className="flex justify-around items-center p-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center gap-1 p-2 flex-1"
            >
              <Icon 
                className={`h-6 w-6 ${
                  item.isActive ? 'text-ugadi-saffron' : 'text-gray-500'
                }`}
              />
              <span 
                className={`text-xs ${
                  item.isActive ? 'text-ugadi-saffron font-medium' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
} 