import React, { useState } from "react";
import { DollarSign, FileText, CheckCircle, Calendar } from "lucide-react";

const BalanceSection = () => {
  const [signatureMethod, setSignatureMethod] = useState("type");

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Current Balance */}
        <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white mb-6">
          <div className="flex items-center mb-1">
            <DollarSign className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-medium">Current Balance</h2>
            <div className="ml-auto text-sm">Next payment: March 31, 2025</div>
          </div>
          <div className="text-4xl font-bold">$0.00</div>
        </div>

        {/* Payment Threshold */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-start">
            <Calendar className="w-5 h-5 mr-3 mt-1 text-gray-400" />
            <div>
              <div className="font-medium text-white">
                Minimum payment threshold: $100.00
              </div>
              <div className="text-sm text-gray-400">
                $100.00 more needed for next payment
              </div>
            </div>
          </div>
        </div>

        {/* Contract Agreement */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-start mb-4">
            <FileText className="w-5 h-5 mr-3 mt-1 text-gray-400" />
            <div>
              <div className="font-medium text-white">Contract Agreement</div>
              <div className="text-sm text-gray-400">
                Please review and sign the terms of service agreement
              </div>
            </div>
          </div>

          <form className="space-y-4 text-white">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Legal Name
              </label>
              <input
                type="text"
                placeholder="Enter your legal full name"
                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Street Address
              </label>
              <input
                type="text"
                placeholder="Enter your street address"
                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  State/Province
                </label>
                <input
                  type="text"
                  placeholder="State/Province"
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  placeholder="ZIP/Postal Code"
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Electronic Signature
              </label>
              <div className="flex space-x-2 mb-2">
                <button
                  type="button"
                  onClick={() => setSignatureMethod("type")}
                  className={`px-4 py-2 rounded-md ${
                    signatureMethod === "type"
                      ? "bg-gray-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  Type Signature
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMethod("draw")}
                  className={`px-4 py-2 rounded-md ${
                    signatureMethod === "draw"
                      ? "bg-indigo-600"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                >
                  Draw Signature
                </button>
              </div>
              <div className="w-full h-32 bg-white rounded-md mb-2"></div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500"
                >
                  Save Signature
                </button>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Draw your signature using your mouse or touch screen
              </div>
            </div>
          </form>
        </div>

        {/* Available Payment Methods */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4 text-white">
            Available Payment Methods
          </h3>
          <ul className="space-y-3 text-white">
            {[
              "ACH (US)",
              "Local Bank Transfer",
              "International ACH (eCheck)",
              "Paper Check",
              "US Wire Transfer (Domestic)",
              "International Wire in Local Currency",
              "International Wire in USD",
              "PayPal",
            ].map((method, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                <span>{method}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BalanceSection;
