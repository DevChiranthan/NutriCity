import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  Area
} from 'recharts';
import { 
  Leaf, MessageSquare, Tag, LogOut, Send,
  Image as ImageIcon, Plus, Minus, Flower, Calendar, Gift, Store, Users, Edit, Trash2, ShoppingCart,
  LineChart, BarChart2, MessageCircle, Apple, ShoppingBag, Utensils, RefreshCw, Share2, Download,
  Scale, Target, Activity, TrendingDown, UserCheck, Share, ChefHat, DollarSign, TrendingUp,
  Droplets, Moon, Timer, Flame, User2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BottomNav from '../components/BottomNav';

// Calorie tracking data
const calorieData = [
  { day: 'Mon', calories: 2100 },
  { day: 'Tue', calories: 1950 },
  { day: 'Wed', calories: 2200 },
  { day: 'Thu', calories: 2000 },
  { day: 'Fri', calories: 2300 },
  { day: 'Sat', calories: 1800 },
  { day: 'Sun', calories: 2100 },
];

// Grocery list data
const defaultGroceryList = [
  { id: 1, item: 'Basmati Rice', quantity: '2 kg', checked: false },
  { id: 2, item: 'Jaggery', quantity: '500g', checked: false },
  { id: 3, item: 'Neem Flowers', quantity: '100g', checked: false },
  { id: 4, item: 'Raw Mango', quantity: '1 kg', checked: false },
  { id: 5, item: 'Tamarind', quantity: '250g', checked: false },
  { id: 6, item: 'Urad Dal', quantity: '500g', checked: false },
  { id: 7, item: 'Chana Dal', quantity: '500g', checked: false },
  { id: 8, item: 'Wheat Flour', quantity: '1 kg', checked: false },
  { id: 9, item: 'Ghee', quantity: '500g', checked: false },
  { id: 10, item: 'Cardamom', quantity: '50g', checked: false },
  { id: 11, item: 'Curry Leaves', quantity: '100g', checked: false },
  { id: 12, item: 'Green Chilies', quantity: '200g', checked: false },
  { id: 13, item: 'Ginger', quantity: '100g', checked: false },
  { id: 14, item: 'Vermicelli', quantity: '500g', checked: false },
  { id: 15, item: 'Mixed Nuts', quantity: '250g', checked: false },
  { id: 16, item: 'Coconut', quantity: '2 pcs', checked: false },
  { id: 17, item: 'Mustard Seeds', quantity: '100g', checked: false },
  { id: 18, item: 'Turmeric Powder', quantity: '100g', checked: false },
  { id: 19, item: 'Red Chili Powder', quantity: '100g', checked: false },
  { id: 20, item: 'Coriander Leaves', quantity: '200g', checked: false }
];

// Meal suggestions data
const allMealSuggestions = {
  breakfast: [
    {
      name: 'Bobbatlu (Sweet Flatbread)',
      recipe: [
        'Mix jaggery and chana dal paste',
        'Make wheat flour dough',
        'Stuff the mixture and roll',
        'Cook on medium heat with ghee'
      ]
    },
    {
      name: 'Medu Vada',
      recipe: [
        'Soak urad dal for 4 hours',
        'Grind to smooth paste with green chilies and ginger',
        'Add curry leaves and shape into donuts',
        'Deep fry until golden brown'
      ]
    },
    {
      name: 'Upma',
      recipe: [
        'Roast semolina until light brown',
        'Temper mustard seeds and add vegetables',
        'Add water and cook until soft',
        'Garnish with coconut and coriander'
      ]
    },
    {
      name: 'Idli',
      recipe: [
        'Ferment rice and urad dal batter',
        'Add salt to taste',
        'Steam in idli molds',
        'Serve with coconut chutney'
      ]
    },
    {
      name: 'Pesarattu',
      recipe: [
        'Soak green gram overnight',
        'Grind with ginger and chilies',
        'Make thin dosas',
        'Serve with ginger chutney'
      ]
    }
  ],
  lunch: [
    {
      name: 'Pulihora (Tamarind Rice)',
      recipe: [
        'Cook rice and let it cool',
        'Prepare tamarind paste with spices',
        'Mix with rice and temper',
        'Garnish with peanuts and curry leaves'
      ]
    },
    {
      name: 'Bisi Bele Bath',
      recipe: [
        'Cook dal and rice together',
        'Add vegetables and spice paste',
        'Temper with ghee and spices',
        'Garnish with cashews'
      ]
    },
    {
      name: 'Curd Rice',
      recipe: [
        'Cook rice and mash with curd',
        'Add milk for creaminess',
        'Temper with mustard and curry leaves',
        'Garnish with pomegranate'
      ]
    },
    {
      name: 'Lemon Rice',
      recipe: [
        'Cook rice and let it cool',
        'Mix with lemon juice and turmeric',
        'Temper with peanuts and spices',
        'Garnish with coriander'
      ]
    },
    {
      name: 'Coconut Rice',
      recipe: [
        'Grate fresh coconut',
        'Cook rice separately',
        'Mix with coconut and spices',
        'Temper with cashews'
      ]
    }
  ],
  dinner: [
    {
      name: 'Ugadi Pachadi',
      recipe: [
        'Combine neem flowers and jaggery',
        'Add raw mango pieces',
        'Mix in tamarind paste',
        'Season with salt to taste'
      ]
    },
    {
      name: 'Semiya Payasam',
      recipe: [
        'Roast vermicelli in ghee',
        'Add milk and cook until soft',
        'Add sugar and cardamom',
        'Garnish with nuts'
      ]
    },
    {
      name: 'Dal Tadka',
      recipe: [
        'Cook yellow dal until soft',
        'Add tomatoes and spices',
        'Make ghee tadka with spices',
        'Garnish with coriander'
      ]
    },
    {
      name: 'Mixed Vegetable Curry',
      recipe: [
        'Cook mixed vegetables',
        'Prepare coconut-based gravy',
        'Mix and simmer together',
        'Temper with curry leaves'
      ]
    },
    {
      name: 'Rasam',
      recipe: [
        'Cook tamarind and tomatoes',
        'Add rasam powder and dal water',
        'Temper with spices',
        'Serve hot with rice'
      ]
    }
  ]
};

// Message categories and data (reusing from VendorDashboard)
type MessageCategory = 'food-offers' | 'group-buy' | 'cooking-class';

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
}

interface MessagesState {
  'food-offers': Message[];
  'group-buy': Message[];
  'cooking-class': Message[];
}

const messageCategories = [
  { id: 'food-offers', name: 'Food Offers', icon: Gift },
  { id: 'group-buy', name: 'Group Buy Alerts!', icon: ShoppingCart },
  { id: 'cooking-class', name: 'Sunday Cooking Class', icon: Flower }
];

const dummyMessages = {
  'food-offers': [
    { id: 1, sender: 'Vendor1', message: 'Special Ugadi thali available today!', timestamp: '10:00 AM' },
    { id: 2, sender: 'Vendor2', message: '20% off on all traditional sweets', timestamp: '9:30 AM' }
  ],
  'group-buy': [
    { id: 1, sender: 'Student1', message: 'Anyone interested in bulk purchase of Ugadi ingredients?', timestamp: '11:00 AM' },
    { id: 2, sender: 'Student2', message: 'I can share the cost of bulk order', timestamp: '10:45 AM' }
  ],
  'cooking-class': [
    { id: 1, sender: 'Chef', message: 'Next Sunday: Learn to make perfect Bobbatlu!', timestamp: '2:00 PM' },
    { id: 2, sender: 'Chef', message: 'Limited spots available, register now', timestamp: '1:30 PM' }
  ]
};

interface TabProps {
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ icon: Icon, label, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
      isActive 
        ? 'bg-ugadi-saffron text-white shadow-lg scale-105' 
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    <Icon className="h-5 w-5" />
    <span className="font-medium">{label}</span>
  </button>
);

// Weight tracking data
const weightData = [
  { day: 1, weight: 60 },
  { day: 2, weight: 59.5 },
  { day: 3, weight: 58.7 },
  { day: 4, weight: 57.8 },
  { day: 5, weight: 56.9 },
  { day: 6, weight: 55.5 },
  { day: 7, weight: 55 }
];

// Add tracking data
const trackingData = {
  water: { current: 1.8, target: 2.5, icon: Droplets, label: 'Water (L)' },
  sleep: { current: 6.5, target: 8, icon: Moon, label: 'Sleep (hrs)' },
  activity: { current: 45, target: 60, icon: Activity, label: 'Activity (min)' },
  calories: { current: 1800, target: 2200, icon: Flame, label: 'Calories' }
};

// Add CircleProgress component
const CircleProgress = ({ value, max, icon: Icon, label }: { value: number, max: number, icon: any, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <svg className="w-20 h-20 transform -rotate-90">
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="#E0E0E0"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="#4CAF50"
          strokeWidth="5"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 35}`}
          strokeDashoffset={`${2 * Math.PI * 35 * (1 - value / max)}`}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="w-8 h-8 text-ugadi-green" />
      </div>
    </div>
    <div className="mt-2 text-center">
      <div className="text-xl font-semibold text-ugadi-green">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </div>
);

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('progress');
  const [groceryList, setGroceryList] = useState(defaultGroceryList);
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory>('food-offers');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<MessagesState>(dummyMessages);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [currentMeals, setCurrentMeals] = useState({
    breakfast: allMealSuggestions.breakfast[0],
    lunch: allMealSuggestions.lunch[0],
    dinner: allMealSuggestions.dinner[0]
  });
  const [currentWeight, setCurrentWeight] = useState(55);
  const [idealWeight, setIdealWeight] = useState(61);
  const [bmi, setBmi] = useState(19.5);
  const [activeProgressTab, setActiveProgressTab] = useState('overview');

  const handleToggleGroceryItem = (id: number) => {
    setGroceryList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRefreshMeals = () => {
    setCurrentMeals({
      breakfast: allMealSuggestions.breakfast[Math.floor(Math.random() * 5)],
      lunch: allMealSuggestions.lunch[Math.floor(Math.random() * 5)],
      dinner: allMealSuggestions.dinner[Math.floor(Math.random() * 5)]
    });
    setExpandedRecipe(null);
  };

  const exportToPDF = async () => {
    try {
      const element = document.getElementById('grocery-list');
      if (!element) return;

      const canvas = await html2canvas(element, {
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('ugadi-grocery-list.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const shareGroceryList = async () => {
    try {
      const text = groceryList
        .map(item => `${item.item} - ${item.quantity}`)
        .join('\n');
      
      if (navigator.share) {
        await navigator.share({
          title: 'Ugadi Grocery List',
          text: text
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert('Grocery list copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages[selectedCategory].length + 1,
      sender: user?.name || 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], newMsg]
    }));
    setNewMessage('');
  };

  // Calculate BMI category and position
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Healthy Weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obese';
  };

  const renderProgressTrackingTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
    >
      {/* Progress Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-ugadi-green" />
          <h2 className="text-xl font-semibold text-ugadi-green">Progress Overview</h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveProgressTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeProgressTab === 'overview'
                ? 'bg-ugadi-green text-white'
                : 'text-gray-600 hover:bg-ugadi-light'
            }`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveProgressTab('log')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeProgressTab === 'log'
                ? 'bg-ugadi-green text-white'
                : 'text-gray-600 hover:bg-ugadi-light'
            }`}
          >
            PROGRESS LOG
          </button>
        </div>
      </div>

      {/* Mobile Tracking Circles - Only visible on mobile */}
      <div className="grid grid-cols-4 gap-4 mb-6 md:hidden">
        {Object.entries(trackingData).map(([key, data]) => (
          <CircleProgress
            key={key}
            value={data.current}
            max={data.target}
            icon={data.icon}
            label={data.label}
          />
        ))}
      </div>

      {/* Weight Progress Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6">
        <h3 className="text-gray-700 font-medium mb-6">Weight Progress</h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={weightData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <RechartsXAxis dataKey="day" tick={{ fontSize: 12 }} />
              <RechartsYAxis domain={[50, 65]} tick={{ fontSize: 12 }} />
              <RechartsTooltip />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#4CAF50"
                fillOpacity={1}
                fill="url(#weightGradient)"
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ fill: "#4CAF50", r: 4 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weight Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="bg-[#E8F5E9] rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-ugadi-green">{currentWeight} Kgs</div>
              <div className="text-sm sm:text-base text-gray-600 mt-1">Current Weight</div>
            </div>
            <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-ugadi-green opacity-50" />
          </div>
        </div>
        <div className="bg-[#FFF3E0] rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-[#FF9800]">{idealWeight} Kgs</div>
              <div className="text-sm sm:text-base text-gray-600 mt-1">Ideal Weight</div>
            </div>
            <Target className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF9800] opacity-50" />
          </div>
        </div>
      </div>

      {/* BMI Tracker Card */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <UserCheck className="h-6 w-6 text-ugadi-green" />
          <h3 className="text-gray-700 font-medium">BMI Tracker</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Human Silhouette */}
          <div className="flex flex-col items-center justify-center order-2 sm:order-1">
            <User2 
              className="h-24 w-24 sm:h-32 sm:w-32 text-ugadi-green opacity-30 stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <div className="text-center mt-4">
              <div className="text-lg font-medium text-ugadi-green">
                Your current BMI is {bmi}
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Category: {getBMICategory(bmi)}
              </div>
            </div>
          </div>

          {/* BMI Gauge */}
          <div className="relative order-1 sm:order-2">
            <svg viewBox="0 0 120 120" className="w-full max-w-[200px] mx-auto">
              {/* BMI Scale Background */}
              <path
                d="M10,60 A50,50 0 1,1 110,60"
                fill="none"
                stroke="#E0E0E0"
                strokeWidth="12"
              />
              {/* Colored Sections */}
              <path
                d="M10,60 A50,50 0 0,1 35,15"
                fill="none"
                stroke="#2196F3"
                strokeWidth="12"
              />
              <path
                d="M35,15 A50,50 0 0,1 85,15"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="12"
              />
              <path
                d="M85,15 A50,50 0 0,1 110,60"
                fill="none"
                stroke="#FFC107"
                strokeWidth="12"
              />
              {/* BMI Categories */}
              <text x="15" y="90" className="text-[10px]" fill="#2196F3">Underweight</text>
              <text x="45" y="15" className="text-[10px]" fill="#4CAF50">Normal</text>
              <text x="80" y="90" className="text-[10px]" fill="#FFC107">Overweight</text>
              {/* BMI Needle */}
              <g transform={`rotate(${(bmi - 15) * 6} 60 60)`}>
                <line
                  x1="60"
                  y1="60"
                  x2="60"
                  y2="20"
                  stroke="#333"
                  strokeWidth="2"
                />
                <circle cx="60" cy="60" r="3" fill="#333" />
              </g>
            </svg>
          </div>
        </div>

        {/* Share Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Progress Stats',
                  text: `Current Weight: ${currentWeight}kg\nIdeal Weight: ${idealWeight}kg\nBMI: ${bmi}`
                });
              } else {
                navigator.clipboard.writeText(
                  `Current Weight: ${currentWeight}kg\nIdeal Weight: ${idealWeight}kg\nBMI: ${bmi}`
                );
                alert('Progress details copied to clipboard!');
              }
            }}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 text-ugadi-green border border-ugadi-green/30 rounded-lg hover:bg-ugadi-light w-full sm:w-auto justify-center"
          >
            <Share className="h-4 w-4" />
            <span>Share Progress</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderGroceryTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg border-2 border-ugadi-saffron/20"
    >
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-6 w-6 text-ugadi-green" />
        <h2 className="text-xl font-semibold text-ugadi-green">Grocery List</h2>
      </div>
      <div id="grocery-list" className="space-y-4">
        {groceryList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-ugadi-light rounded-lg"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggleGroceryItem(item.id)}
                className="h-5 w-5 rounded border-gray-300 text-ugadi-saffron focus:ring-ugadi-saffron"
              />
              <div className={item.checked ? 'line-through text-gray-500' : ''}>
                <p className="font-medium">{item.item}</p>
                <p className="text-sm text-gray-500">{item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={exportToPDF}
          className="flex-1 px-4 py-2 bg-ugadi-saffron text-white rounded-lg hover:bg-ugadi-saffron/90 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" />
          <span>Export to PDF</span>
        </button>
        <button
          onClick={shareGroceryList}
          className="flex-1 px-4 py-2 bg-ugadi-green text-white rounded-lg hover:bg-ugadi-green/90 transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="h-5 w-5" />
          <span>Share List</span>
        </button>
      </div>
    </motion.div>
  );

  const renderMealSuggestionsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg border-2 border-ugadi-saffron/20"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-ugadi-green" />
          <h2 className="text-xl font-semibold text-ugadi-green">Meal Suggestions</h2>
        </div>
        <button
          onClick={handleRefreshMeals}
          className="flex items-center gap-2 px-4 py-2 text-ugadi-saffron hover:bg-ugadi-light rounded-lg transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Don't like it?</span>
        </button>
      </div>

      {/* Breakfast Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-ugadi-green mb-4">Breakfast</h3>
        <div className="space-y-4">
          <div className="bg-ugadi-light rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-ugadi-green">{currentMeals.breakfast.name}</h4>
              <button
                onClick={() => setExpandedRecipe(expandedRecipe === currentMeals.breakfast.name ? null : currentMeals.breakfast.name)}
                className="text-ugadi-saffron hover:text-ugadi-saffron/80"
              >
                {expandedRecipe === currentMeals.breakfast.name ? (
                  <Minus className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </button>
            </div>
            {expandedRecipe === currentMeals.breakfast.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 space-y-2"
              >
                {currentMeals.breakfast.recipe.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-ugadi-saffron font-medium">{index + 1}.</span>
                    <p className="text-gray-600">{step}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Lunch Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-ugadi-green mb-4">Lunch</h3>
        <div className="space-y-4">
          <div className="bg-ugadi-light rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-ugadi-green">{currentMeals.lunch.name}</h4>
              <button
                onClick={() => setExpandedRecipe(expandedRecipe === currentMeals.lunch.name ? null : currentMeals.lunch.name)}
                className="text-ugadi-saffron hover:text-ugadi-saffron/80"
              >
                {expandedRecipe === currentMeals.lunch.name ? (
                  <Minus className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </button>
            </div>
            {expandedRecipe === currentMeals.lunch.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 space-y-2"
              >
                {currentMeals.lunch.recipe.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-ugadi-saffron font-medium">{index + 1}.</span>
                    <p className="text-gray-600">{step}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Dinner Section */}
      <div>
        <h3 className="text-lg font-medium text-ugadi-green mb-4">Dinner</h3>
        <div className="space-y-4">
          <div className="bg-ugadi-light rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-ugadi-green">{currentMeals.dinner.name}</h4>
              <button
                onClick={() => setExpandedRecipe(expandedRecipe === currentMeals.dinner.name ? null : currentMeals.dinner.name)}
                className="text-ugadi-saffron hover:text-ugadi-saffron/80"
              >
                {expandedRecipe === currentMeals.dinner.name ? (
                  <Minus className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </button>
            </div>
            {expandedRecipe === currentMeals.dinner.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 space-y-2"
              >
                {currentMeals.dinner.recipe.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-ugadi-saffron font-medium">{index + 1}.</span>
                    <p className="text-gray-600">{step}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderMessagesTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg border-2 border-ugadi-saffron/20"
    >
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-ugadi-green" />
        <h2 className="text-xl font-semibold text-ugadi-green">Community Messages</h2>
      </div>
      
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {messageCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as MessageCategory)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-ugadi-saffron text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <category.icon className="h-5 w-5" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages[selectedCategory].map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === user?.name ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === user?.name
                    ? 'bg-ugadi-saffron text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="text-sm font-medium mb-1">{msg.sender}</div>
                <div className="text-sm">{msg.message}</div>
                <div className="text-xs mt-1 opacity-70">{msg.timestamp}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ugadi-saffron"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-2 bg-ugadi-saffron text-white rounded-lg hover:bg-ugadi-saffron/90 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-ugadi-light bg-festive-pattern bg-opacity-10 pb-20 md:pb-12">
      {/* Ugadi Festival Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-ugadi-primary via-ugadi-accent to-ugadi-secondary text-white py-2 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 px-4"
        >
          <Flower className="h-4 w-4 sm:h-5 sm:w-5 animate-spin hidden sm:block" />
          <span className="text-sm sm:text-base font-semibold">Happy Ugadi 2025! Special festival discounts.</span>
          <Flower className="h-4 w-4 sm:h-5 sm:w-5 animate-spin hidden sm:block" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-md p-4 rounded-lg mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Apple className="h-6 w-6 sm:h-8 sm:w-8 text-ugadi-saffron" />
              </motion.div>
              <h1 className="text-xl sm:text-2xl font-bold text-ugadi-green">Student Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-ugadi-green text-sm sm:text-base">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-ugadi-saffron text-white rounded-md hover:bg-ugadi-saffron/90 transition-colors text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Hide on mobile */}
        <div className="hidden md:flex gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2">
          <Tab
            icon={Activity}
            label="Progress"
            isActive={activeTab === 'progress'}
            onClick={() => setActiveTab('progress')}
          />
          <Tab
            icon={ShoppingBag}
            label="Grocery"
            isActive={activeTab === 'grocery'}
            onClick={() => setActiveTab('grocery')}
          />
          <Tab
            icon={Utensils}
            label="Meals"
            isActive={activeTab === 'meals'}
            onClick={() => setActiveTab('meals')}
          />
          <Tab
            icon={MessageCircle}
            label="Messages"
            isActive={activeTab === 'messages'}
            onClick={() => setActiveTab('messages')}
          />
        </div>

        {/* Tab Content */}
        <div className="pb-12">
          {activeTab === 'progress' && renderProgressTrackingTab()}
          {activeTab === 'grocery' && renderGroceryTab()}
          {activeTab === 'meals' && renderMealSuggestionsTab()}
          {activeTab === 'messages' && renderMessagesTab()}
        </div>

        {/* Bottom Navigation for Mobile */}
        <BottomNav
          items={[
            {
              icon: Activity,
              label: 'Progress',
              isActive: activeTab === 'progress',
              onClick: () => setActiveTab('progress')
            },
            {
              icon: ShoppingBag,
              label: 'Grocery',
              isActive: activeTab === 'grocery',
              onClick: () => setActiveTab('grocery')
            },
            {
              icon: Utensils,
              label: 'Meals',
              isActive: activeTab === 'meals',
              onClick: () => setActiveTab('meals')
            },
            {
              icon: MessageCircle,
              label: 'Messages',
              isActive: activeTab === 'messages',
              onClick: () => setActiveTab('messages')
            }
          ]}
        />
      </div>
    </div>
  );
} 