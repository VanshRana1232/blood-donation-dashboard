import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { api } from './api';
import './index.css';

function PublicDashboard() {
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshStats = async () => {
    try {
      const data = await api.getDashboardData();
      setTotalDonations(data.data.stats.totalRegistrations); // Registrations = Donations
      setLoading(false);
    } catch (error) {
      console.error('Stats refresh error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshStats();
    const timer = setInterval(refreshStats, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white rounded-3xl shadow-2xl px-8 py-4 mb-6">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              WELCOME TO THE
            </h1>
            <h2 className="text-6xl font-black mt-2">
              <span className="text-red-600">BLOOD DONATION</span>
            </h2>
            <h3 className="text-5xl font-extrabold text-blue-900 mt-2">MELA JMIETI</h3>
          </div>
          
          <p className="text-gray-600 text-sm">Mukand College Blood Donation Initiative</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image and Quote */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=600&h=400&fit=crop" 
                alt="Blood Donation Camp"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-3xl p-8 shadow-xl">
              <p className="text-2xl font-bold leading-relaxed">
                Every drop of blood you donate can save a life.
              </p>
              <p className="text-3xl font-extrabold mt-4">
                Be a lifesaver.
              </p>
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="space-y-6">
            {/* Total Donations Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-red-600">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-red-700 font-bold text-3xl mb-2">Total Donations</p>
                  {loading ? (
                    <p className="text-6xl font-black text-gray-400">...</p>
                  ) : (
                    <p className="text-7xl font-black text-red-600">{totalDonations}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-3">People who donated blood today</p>
                </div>
                <div className="bg-red-600 rounded-2xl p-6">
                  <span className="text-7xl">🩸</span>
                </div>
              </div>
            </div>

            {/* Lives Saved Message */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-xl">
              <p className="text-center text-3xl font-bold">
                🎉 {totalDonations} lives potentially saved!
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl p-6 shadow-xl">
              <p className="text-center text-xl font-bold">
                Thank you for making a difference! ❤️
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 text-center">
          <h3 className="text-3xl font-extrabold text-red-600 mb-4">
            UPCOMING BLOOD DONATION CAMP! 🚑 ❤️
          </h3>
          <p className="text-gray-600 text-lg">
            Join us in saving lives. Every donation counts!
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <div className="bg-red-100 rounded-2xl px-6 py-3">
              <p className="text-red-600 font-bold">Open to All</p>
            </div>
            <div className="bg-blue-100 rounded-2xl px-6 py-3">
              <p className="text-blue-900 font-bold">Safe & Secure</p>
            </div>
            <div className="bg-green-100 rounded-2xl px-6 py-3">
              <p className="text-green-600 font-bold">Professional Medical Team</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Crafted with ❤️ by LifeLink Team | Mukand JMIETI
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Real-time updates • Auto-refresh every 3 seconds
          </p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PublicDashboard />
  </React.StrictMode>
);