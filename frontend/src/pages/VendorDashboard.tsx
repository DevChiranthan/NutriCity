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
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Leaf, MessageSquare, Tag, LogOut, Send,
  Image as ImageIcon, Plus, Minus, Flower, Calendar, Gift, Store, Users, Edit, Trash2, ShoppingCart,
  LineChart, BarChart2, MessageCircle, Apple, ShoppingBag, Utensils, RefreshCw, Share2, Download,
  Scale, Target, Activity, TrendingDown, UserCheck, Share, ChefHat, DollarSign, TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BottomNav from '../components/BottomNav';

// Dummy data for insights
const studentGrowthData = [
  { month: 'Jan', students: 65 },
  { month: 'Feb', students: 78 },
  { month: 'Mar', students: 92 },
  { month: 'Apr', students: 105 },
  { month: 'May', students: 120 },
  { month: 'Jun', students: 135 },
];

const categoryData = [
  { name: 'Breakfast', value: 35 },
  { name: 'Lunch', value: 45 },
  { name: 'Dinner', value: 20 },
];

const COLORS = ['#FF8042', '#00C49F', '#FFBB28'];

// Message categories and data
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
    { id: 1, sender: 'You', message: 'Special Ugadi thali available today!', timestamp: '10:00 AM' },
    { id: 2, sender: 'Student1', message: 'Is the offer still available?', timestamp: '10:30 AM' }
  ],
  'group-buy': [
    { id: 1, sender: 'You', message: 'Bulk order discount on Ugadi ingredients!', timestamp: '11:00 AM' },
    { id: 2, sender: 'Student2', message: 'Interested in the bulk order', timestamp: '11:15 AM' }
  ],
  'cooking-class': [
    { id: 1, sender: 'You', message: 'Hosting a special Ugadi cooking class this Sunday!', timestamp: '2:00 PM' },
    { id: 2, sender: 'Student3', message: 'Count me in!', timestamp: '2:15 PM' }
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

// Stats Card Component
const StatsCard = ({ title, value, trend, icon: Icon, color }: { 
  title: string, 
  value: string, 
  trend: string, 
  icon: any,
  color: string 
}) => (
  <div className={`bg-white rounded-xl p-4 sm:p-6 shadow-sm border`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className={`text-2xl sm:text-3xl font-semibold mt-1 ${color}`}>{value}</h3>
        <p className="text-sm text-gray-500 mt-1">{trend}</p>
      </div>
      <Icon className={`h-8 w-8 ${color} opacity-50`} />
    </div>
  </div>
);

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  status: 'active' | 'expired';
}

export default function VendorDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('insights');
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory>('food-offers');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<MessagesState>(dummyMessages);
  const [activeOffers, setActiveOffers] = useState<Offer[]>([
    {
      id: '1',
      title: 'Ugadi Special',
      description: '20% off on all festive meals',
      discount: 20,
      validUntil: '2025-04-15',
      status: 'active'
    },
    {
      id: '2',
      title: 'Student Discount',
      description: '15% off for students',
      discount: 15,
      validUntil: '2025-04-30',
      status: 'active'
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages[selectedCategory].length + 1,
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], newMsg]
    }));
    setNewMessage('');
  };

  const handleAddOffer = () => {
    const newOffer: Offer = {
      id: Date.now().toString(),
      title: 'New Offer',
      description: 'Description here',
      discount: 10,
      validUntil: '2025-04-30',
      status: 'active'
    };
    setActiveOffers([...activeOffers, newOffer]);
  };

  const handleDeleteOffer = (id: string) => {
    setActiveOffers(activeOffers.filter(offer => offer.id !== id));
  };

  const renderInsightsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Student Growth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg border-2 border-ugadi-saffron/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-6 w-6 text-ugadi-green" />
          <h2 className="text-xl font-semibold text-ugadi-green">Student Growth</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={studentGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <RechartsXAxis dataKey="month" stroke="#666" />
              <RechartsYAxis stroke="#666" />
              <RechartsTooltip contentStyle={{ background: 'white', border: '1px solid #ddd' }} />
              <Bar dataKey="students" fill="#FF8042" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Category Distribution Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl shadow-lg border-2 border-ugadi-saffron/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-6 w-6 text-ugadi-green" />
          <h2 className="text-xl font-semibold text-ugadi-green">Category Distribution</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
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
                msg.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'You'
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

  const renderOffersTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg border-2 border-ugadi-saffron/20"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6 text-ugadi-green" />
          <h2 className="text-xl font-semibold text-ugadi-green">Active Offers</h2>
        </div>
        <button
          onClick={handleAddOffer}
          className="px-4 py-2 bg-ugadi-saffron text-white rounded-lg hover:bg-ugadi-saffron/90 transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add New Offer</span>
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {activeOffers.map((offer) => (
          <div key={offer.id} className="p-4 bg-ugadi-light rounded-lg border border-ugadi-saffron/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-ugadi-green text-lg">{offer.title}</p>
                <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Valid until: {offer.validUntil}
                </div>
                <div className="mt-2 inline-block px-3 py-1 bg-ugadi-saffron/10 text-ugadi-saffron rounded-full text-sm">
                  {offer.discount}% OFF
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-ugadi-green hover:text-ugadi-green/80 hover:bg-ugadi-light rounded-full">
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteOffer(offer.id)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-ugadi-light bg-festive-pattern bg-opacity-10 pb-20 md:pb-12">
      {/* Ugadi Festival Banner */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-ugadi-primary via-ugadi-accent to-ugadi-secondary text-white py-2 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2"
        >
          <Flower className="h-5 w-5 animate-spin" />
          <span className="font-semibold">Happy Ugadi 2025! Special festival discounts on traditional ingredients.</span>
          <Flower className="h-5 w-5 animate-spin" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-md p-4 rounded-lg mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Store className="h-8 w-8 text-ugadi-saffron" />
              </motion.div>
              <h1 className="text-2xl font-bold text-ugadi-green">Vendor Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-ugadi-green">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-ugadi-saffron text-white rounded-md hover:bg-ugadi-saffron/90 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Hide on mobile */}
        <div className="hidden md:flex gap-4 mb-6 overflow-x-auto pb-2">
          <Tab
            icon={BarChart2}
            label="Insights"
            isActive={activeTab === 'insights'}
            onClick={() => setActiveTab('insights')}
          />
          <Tab
            icon={Gift}
            label="Offers"
            isActive={activeTab === 'offers'}
            onClick={() => setActiveTab('offers')}
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
          {activeTab === 'insights' && renderInsightsTab()}
          {activeTab === 'offers' && renderOffersTab()}
          {activeTab === 'messages' && renderMessagesTab()}
        </div>

        {/* Bottom Navigation for Mobile */}
        <BottomNav
          items={[
            {
              icon: BarChart2,
              label: 'Insights',
              isActive: activeTab === 'insights',
              onClick: () => setActiveTab('insights')
            },
            {
              icon: Gift,
              label: 'Offers',
              isActive: activeTab === 'offers',
              onClick: () => setActiveTab('offers')
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