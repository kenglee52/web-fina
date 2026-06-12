import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { url } from "@/componet/unity/Part";
import Image_support from "@/componet/Support/Image_support";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2, HelpCircle, AlertCircle, Inbox } from "lucide-react";
import toast from "react-hot-toast";


import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";  

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const { language } = useContext(LanguageContext);
  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url.base_url}/api/faqs`);
      setFaqs(res.data.data || []);
      setError(null);
    } catch (err) {
      const message = err.response?.data?.error || "Failed to fetch FAQs.";
      console.error("Fetch error:", err);
      setError(message);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <>
      <Image_support />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-10">
          <HelpCircle className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mr-3" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
           {translations[language].faq}
          </h1>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p className="text-lg">Loading FAQs...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-red-500">
            <AlertCircle className="h-8 w-8 mb-2" />
            <p className="text-lg">{error}</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
            <Inbox className="h-8 w-8 mb-2" />
            <p className="text-lg">No FAQs available</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`faq-${faq.id}`}
                  className="border-b border-gray-200 bg-white rounded-lg shadow-sm"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-blue-600 px-4 py-3">
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base leading-relaxed px-4 py-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </>
  );
};

export default Faq;