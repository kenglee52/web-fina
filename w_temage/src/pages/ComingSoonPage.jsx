import React, { useState, useEffect } from 'react'; 
import { Rocket, Mail, CheckCircle, Loader2, Infinity } from 'lucide-react'; // Infinity icon kept

// This is a standalone component for the Coming Soon page.
// The main component name must be App for default export.
const ComingSoonPage = () => {
  // Set the launch date to approximately 30 days from now as a placeholder
  // Placeholder Date: November 20, 2025
  const launchDate = new Date('2025-11-20T10:00:00'); 
  
  const [timeRemaining, setTimeRemaining] = useState({});
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Function to calculate time remaining (Restored)
  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = launchDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Setup interval for countdown
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call for subscription
    setTimeout(() => {
      setIsSubmitting(false);
      if (email === 'error@example.com') { // Placeholder for a simulated error
        setFormError('Subscription failed. Please try again.');
      } else {
        setIsSubscribed(true);
        // Clear email after successful subscription
        setEmail('');
      }
    }, 1500);
  };

  // CountdownSegment component (Modified to display Infinity icon instead of value)
  const CountdownSegment = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-white/20 min-w-[70px] sm:min-w-[90px] transition-all duration-300 hover:bg-white/20">
      <span className="text-4xl sm:text-5xl font-extrabold text-white">
        {/* Replaced {value.toString().padStart(2, '0')} with Infinity icon */}
        <Infinity className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
      </span>
      <span className="text-sm sm:text-lg font-medium text-indigo-100 mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden relative font-sans">
      
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          // Placeholder image URL for a futuristic/dark background theme
          backgroundImage: "url('/production/p003.jpeg')",
          // Fixed attachment ensures it looks good on scroll/resize
          backgroundAttachment: 'fixed' 
        }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      
      {/* Main Content Card */}
      <div className="relative z-10 max-w-4xl w-full text-center p-6 sm:p-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl transition-all duration-500">
        
        {/* Header Icon & Message */}
        <div className="mb-8">
          <Rocket className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-yellow-400 animate-bounce-slow" />
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 leading-tight">
            Launch Date: Flexible!
          </h1>
          <p className="text-lg sm:text-xl text-indigo-200 mt-3 font-light flex items-center justify-center space-x-2">
            We are launching soon. Follow our progress 
            <span className="font-bold text-yellow-300 ml-2">
                <Infinity className="w-6 h-6 inline-block" /> 
            </span>
            
          </p>
        </div>

        {/* Countdown Timer (Visual segments show Infinity, but logic runs) */}
        {Object.values(timeRemaining).some(val => val > 0) ? (
          <div className="flex justify-center space-x-3 sm:space-x-6 mb-10">
            <CountdownSegment value={timeRemaining.days} label="Days" />
            <CountdownSegment value={timeRemaining.hours} label="Hours" />
            <CountdownSegment value={timeRemaining.minutes} label="Mins" />
            <CountdownSegment value={timeRemaining.seconds} label="Secs" />
          </div>
        ) : (
             <div className="mb-10 text-white text-3xl font-bold bg-green-600/70 p-4 rounded-xl shadow-lg animate-pulse">
                We are LIVE! Check your email!
             </div>
        )}

        {/* Subscription Form */}
        <div className="max-w-md mx-auto">
          <h3 className="text-xl text-white font-semibold mb-4 flex items-center justify-center space-x-2">
            <Mail className="w-5 h-5 text-yellow-400" />
            <span>Contact US</span>
          </h3>
          
          {isSubscribed ? (
            <div className="p-4 bg-green-500 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 transform scale-100">
              <CheckCircle className="w-6 h-6 mr-2 text-white" />
              <span className="text-white font-bold">Successfully Subscribed!</span>
            </div>
          ) : (
            <p  className="mb-10 text-white text-3xl font-bold bg-orange-500/70 p-4 rounded-xl shadow-lg animate-pulse">
fina@finafintech.com</p>
          )}

          {formError && (
            <p className="mt-3 text-sm font-medium text-red-400 bg-red-900/50 p-2 rounded-lg border border-red-400">
              {formError}
            </p>
          )}
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx="true">{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-5%);
          }
          50% {
            transform: translateY(5%);
          }
        }
        .animate-bounce-slow {
            animation: bounce-slow 4s infinite ease-in-out;
        }
        /* Removed blob animation as it's no longer suitable for a fixed background image */
      `}</style>
    </div>
  );
};

export default ComingSoonPage;
