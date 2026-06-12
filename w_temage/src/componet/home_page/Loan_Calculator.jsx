import React, { useState, useContext } from "react";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";
import { DollarSign, Calendar } from "lucide-react";

const Loan_Calculator = () => {
  const { language } = useContext(LanguageContext);
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Format number for display (e.g., 1000000 -> 1,000,000 or 1.000.000)
  const formatNumber = (number) => {
    if (!number || isNaN(number)) return "";
    const [integer, decimal = "00"] = Number(number).toFixed(0).split(".");
    const separator = language === "lao" ? "." : ",";
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return formattedInteger;
  };

  // Parse formatted input to raw number (e.g., 1,000,000 -> 1000000)
  const parseNumber = (value) => {
    if (!value) return "";
    const separator = language === "lao" ? "\\." : ",";
    const cleanValue = value.replace(new RegExp(`[${separator},.]`, "g"), "");
    return cleanValue;
  };

  // Handle loan amount input change
  const handleLoanAmountChange = (e) => {
    const rawValue = parseNumber(e.target.value);
    if (rawValue === "" || !isNaN(rawValue)) {
      setLoanAmount(rawValue);
    }
  };

  // Calculate loan
  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const term = parseFloat(loanTerm);

    if (isNaN(principal) || isNaN(rate) || isNaN(term) || principal <= 0 || term <= 0) {
      setError(translations[language].error_message);
      setResult(null);
      return;
    }

    // ดอกเบี้ยรวมทั้งหมด
    const totalInterest = principal * rate * (term / 12); // rate เป็นต่อปี
    const totalPayment = principal + totalInterest;
    const monthlyPayment = totalPayment / term;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
    setError("");
  };


  return (
    <section
      className="py-16 sm:py-10 bg-gray-50/50"
      role="region"
      aria-label={translations[language].loan_calculator_title}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14 text-blue-900 flex items-center justify-center">

          {translations[language].loan_calculator_title}
          <span className="text-orange-600 text-2xl sm:text-3xl font-bold ml-3">
            LAK.
          </span>
        </h2>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          <div className="grid grid-cols-1 gap-8">
            {/* Loan Amount */}
            <div>
              <label
                htmlFor="loanAmount"
                className="block text-base font-semibold text-gray-800 mb-2"
              >
                {translations[language].loan_amount}
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-3 flex items-center text-orange-600 pointer-events-none text-lg "
                >
                  LAK :
                </span>
                <input
                  id="loanAmount"
                  type="text"
                  value={formatNumber(loanAmount)}
                  onChange={handleLoanAmountChange}
                  className="w-full pl-16 pr-5 py-3 border border-gray-300 rounded-xl 
               focus:ring-4 focus:ring-orange-200 focus:border-orange-500  
               transition duration-200 text-lg"
                  placeholder={language === "lao" ? "1.000.000" : "1,000,000"}
                  aria-describedby="loanAmountHelp"
                />
              </div>
              <p id="loanAmountHelp" className="text-sm text-gray-500 mt-1">
                {translations[language].loan_amount} ({translations[language].currency})
              </p>
            </div>

            {/* Interest Rate */}
            <div>
              <label
                htmlFor="interestRate"
                className="block text-base font-semibold text-gray-800 mb-2"
              >
                {translations[language].interest_rate}
              </label>
              <div className="relative">
                <input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition duration-200 text-lg"
                  placeholder="5"
                  min="0"
                  step="0.1"
                  aria-describedby="interestRateHelp"
                />
              </div>
              <p id="interestRateHelp" className="text-sm text-gray-500 mt-1">
                {translations[language].interest_rate} (% per year)
              </p>
            </div>

            {/* Loan Term */}
            <div>
              <label
                htmlFor="loanTerm"
                className="block text-base font-semibold text-gray-800 mb-2"
              >
                {translations[language].loan_term}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full pl-10 pr-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition duration-200 text-lg"
                  placeholder="60"
                  min="0"
                  step="1"
                  aria-describedby="loanTermHelp"
                />
              </div>
              <p id="loanTermHelp" className="text-sm text-gray-500 mt-1">
                {translations[language].loan_term}
              </p>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateLoan}
              className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-8 py-3 rounded-xl shadow-lg hover:from-orange-700 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 font-semibold text-lg mt-4"
              aria-label={translations[language].calculate}
            >
              {translations[language].calculate}
            </button>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center font-medium" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className="mt-10 p-8 bg-blue-50 rounded-2xl border-l-4 border-orange-500 shadow-inner">
              <h3 className="text-xl font-bold text-blue-900 mb-6 border-b pb-3 border-orange-100">
                {translations[language].loan_calculator_title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Monthly Payment */}
                <div className="flex flex-col items-center sm:items-start p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">
                    {translations[language].monthly_payment}
                  </p>
                  <p className="text-2xl font-extrabold text-blue-800">
                    {formatNumber(result.monthlyPayment)}
                  </p>
                  <span className="text-xs text-orange-500 font-bold mt-1">
                    {translations[language].currency} / {translations[language].month}
                  </span>
                </div>

                {/* Total Payment */}
                <div className="flex flex-col items-center sm:items-start p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">
                    {translations[language].total_payment}
                  </p>
                  <p className="text-2xl font-extrabold text-blue-800">
                    {formatNumber(result.totalPayment)}
                  </p>
                  <span className="text-xs text-orange-500 font-bold mt-1">
                    {translations[language].currency}
                  </span>
                </div>

                {/* Total Interest */}
                <div className="flex flex-col items-center sm:items-start p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">
                    {translations[language].total_interest}
                  </p>
                  <p className="text-2xl font-extrabold text-blue-800">
                    {formatNumber(result.totalInterest)}
                  </p>
                  <span className="text-xs text-orange-500 font-bold mt-1">
                    {translations[language].currency}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Loan_Calculator;