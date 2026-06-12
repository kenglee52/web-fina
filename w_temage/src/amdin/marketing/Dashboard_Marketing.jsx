import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "@/componet/unity/Part";
import { BarChart2, HelpCircle, Megaphone, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard_Marketing = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({ faqs: 0, promotions: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch metrics (FAQs and Promotions)
  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch FAQs
      let faqCount = 0;
      try {
        const faqRes = await axios.get(`${url.base_url}/api/faqs`);
        console.log("FAQ Response:", faqRes.data); // Debug log
        faqCount = faqRes.data.data?.length || 0;
      } catch (faqErr) {
        console.error("FAQ fetch error:", faqErr.response?.data || faqErr.message);
        toast.error(`Failed to fetch FAQs: ${faqErr.response?.data?.error || faqErr.message}`, {
          style: { background: "#fee2e2", color: "#b91c1c" },
        });
      }

      // Fetch promoCount
      let promoCount = 0;
      try {
        const promoRes = await axios.get(`${url.base_url}/api/promotion`);
        console.log("Promotions Response:", promoRes.data); // Debug log
        promoCount = promoRes.data.data?.length || 0;
      } catch (promoErr) {
        console.error("Promotions fetch error:", promoErr.response?.data || promoErr.message);
        toast.error(`Failed to fetch Promotions: ${promoErr.response?.data?.error || promoErr.message}`, {
          style: { background: "#fee2e2", color: "#b91c1c" },
        });
      }
          let Countnews = 0;
      try {
        const newsRes = await axios.get(`${url.base_url}/api/news`);
       
        Countnews = newsRes.data.data?.length || 0;
      } catch (faqErr) {
        console.error("FAQ fetch error:", faqErr.response?.data || faqErr.message);
        toast.error(`Failed to fetch FAQs: ${faqErr.response?.data?.error || faqErr.message}`, {
          style: { background: "#fee2e2", color: "#b91c1c" },
        });
      }


      // Fetch promoCount
      let slidersCount = 0;
      try {
        const sliderRes = await axios.get(`${url.base_url}/api/sliders`);
       
        slidersCount = sliderRes.data.data?.length || 0;
      } catch (promoErr) {
        console.error("Promotions fetch error:", promoErr.response?.data || promoErr.message);
        toast.error(`Failed to fetch Promotions: ${promoErr.response?.data?.error || promoErr.message}`, {
          style: { background: "#fee2e2", color: "#b91c1c" },
        });
      }
      

      setMetrics({ faqs: faqCount, promotions: promoCount , news: Countnews,sliders: slidersCount });

      // Mock chart data (replace with real data if available)
      setChartData([
        { name: "Jan", faqs: 5, promotions: 3 },
        { name: "Feb", faqs: 7, promotions: 4 },
        { name: "Mar", faqs: 10, promotions: 6 },
        { name: "Apr", faqs: 8, promotions: 5 },
        { name: "May", faqs: 12, promotions: 7 },
      ]);
    } catch (err) {
      const message = err.response?.data?.error || "Failed to fetch dashboard metrics.";
      console.error("General fetch error:", err);
      setError(message);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-center mb-10">
        <BarChart2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mr-3" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
          Admin FINA Website Dashboard
        </h1>
      </div>

      {/* Loading/Error States */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p className="text-lg">Loading dashboard...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-red-500">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p className="text-lg">{error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-center">
                <HelpCircle className="h-6 w-6 text-blue-600 mr-2" />
                <CardTitle className="text-xl font-semibold text-gray-800">Total FAQs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{metrics.faqs}</p>
               
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-center">
                <Megaphone className="h-6 w-6 text-blue-600 mr-2" />
                <CardTitle className="text-xl font-semibold text-gray-800">Total Promotions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{metrics.promotions}</p>
               
              </CardContent>
            </Card>


             <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-center">
                <Megaphone className="h-6 w-6 text-blue-600 mr-2" />
                <CardTitle className="text-xl font-semibold text-gray-800">Total news & Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{metrics.news}</p>
               
              </CardContent>
            </Card>


            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-center">
                <Megaphone className="h-6 w-6 text-blue-600 mr-2" />
                <CardTitle className="text-xl font-semibold text-gray-800">Total sliders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{metrics.sliders}</p>
               
              </CardContent>
            </Card>
          </div>

        
        
        </div>
      )}
    </div>
    
  );
};

export default Dashboard_Marketing;