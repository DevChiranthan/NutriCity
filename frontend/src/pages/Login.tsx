import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Users, Store, Flower, Sun, Star } from 'lucide-react';

// Dynamic API base URL configuration
const BASE_URL = 
  import.meta.env.PROD 
    ? 'https://nutricity.onrender.com' 
    : 'http://localhost:5000';

export default function Login() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'student' | 'vendor' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!selectedRole) {
        setError('Please select your role first');
        return;
      }

      setIsLoading(true);
      setError(null);

      // Use the dynamic BASE_URL for API calls
      const response = await fetch(`${BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.message.includes('already registered')) {
          // If user is already registered with a different role, allow them to switch
          const confirmSwitch = window.confirm(
            'This email is already registered with a different role. Would you like to switch roles?'
          );
          
          if (confirmSwitch) {
            // Retry login with the new role and force role switch
            const retryResponse = await fetch(`${BASE_URL}/api/auth/google`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: credentialResponse.credential,
                role: selectedRole,
                forceRoleSwitch: true,
              }),
            });
            
            const retryData = await retryResponse.json();
            
            if (retryResponse.ok) {
              login(retryData.token, retryData.user);
              return;
            }
          }
        }
        
        throw new Error(data.message || 'Login failed');
      }

      login(data.token, data.user);
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ugadi-light bg-festive-pattern bg-opacity-10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-2 border-ugadi-saffron/20"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mb-4"
          >
            <Sun className="h-12 w-12 text-ugadi-saffron" />
          </motion.div>
          <h1 className="text-3xl font-bold text-ugadi-maroon font-festive mb-2">Welcome to Ugadi Feast</h1>
          <p className="text-ugadi-maroon/70">Select your role to continue</p>
        </div>

        <div className="space-y-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedRole('student');
              setError(null);
            }}
            className={`w-full p-4 rounded-xl flex items-center justify-center gap-3 transition-all ${
              selectedRole === 'student'
                ? 'bg-ugadi-green text-white shadow-lg'
                : 'bg-ugadi-light text-ugadi-maroon border-2 border-ugadi-green/20 hover:border-ugadi-green'
            }`}
          >
            <Users className="h-6 w-6" />
            <span className="font-medium">Continue as Student</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedRole('vendor');
              setError(null);
            }}
            className={`w-full p-4 rounded-xl flex items-center justify-center gap-3 transition-all ${
              selectedRole === 'vendor'
                ? 'bg-ugadi-saffron text-white shadow-lg'
                : 'bg-ugadi-light text-ugadi-maroon border-2 border-ugadi-saffron/20 hover:border-ugadi-saffron'
            }`}
          >
            <Store className="h-6 w-6" />
            <span className="font-medium">Continue as Vendor</span>
          </motion.button>
        </div>

        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setError('Google login failed');
                setIsLoading(false);
              }}
              useOneTap={false}
              theme="filled_blue"
              shape="pill"
              size="large"
              context="signin"
              ux_mode="popup"
              cancel_on_tap_outside={true}
              auto_select={false}
              locale="en"
              width="300"
            />
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-blue-50 text-blue-600 rounded-lg text-sm"
          >
            Logging in...
          </motion.div>
        )}

        <div className="mt-8 flex justify-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Flower className="h-5 w-5 text-ugadi-yellow" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
          >
            <Star className="h-5 w-5 text-ugadi-saffron" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
          >
            <Leaf className="h-5 w-5 text-ugadi-green" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}