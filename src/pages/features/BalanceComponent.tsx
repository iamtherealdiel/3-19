import React, { useState, useRef } from "react";
import { DollarSign, FileText, CheckCircle, Calendar } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

const BalanceSection = () => {
  const [signatureMethod, setSignatureMethod] = useState("type");
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const signaturePadRef = useRef<any>(null);
  const [checked, setChecked] = useState(false);
  const { user } = useAuth();
  const clearSignature = () => {
    setSignatureImage("");
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const [formData, setFormData] = useState({
    legalName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const saveSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.toDataURL();
      setSignatureImage(dataUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let data = { ...formData, user_id: user?.id };
    await supabase.from("contract").insert(data);
    console.log("Form Data:", {
      ...formData,
      // signature: signatureImage,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Current Balance */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-yellow-500 text-sm">
              Payouts will be processed after accepting the terms and conditions
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white mb-6">
          <div className="flex items-center mb-1">
            <DollarSign className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-medium">Current Balance</h2>
            <div className="ml-auto text-sm">Next payment: March 31, 2025</div>
          </div>
          <div className="text-4xl font-bold">$0.00</div>
        </div>

        {/* Payment Threshold */}
        <div className="bg-gray-800 rounded-lg p-6 my-6">
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
        <div className="bg-gray-800 rounded-lg p-6 mt-3">
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
        {/* Terms and Conditions */}
        <div className="bg-gray-800 rounded-lg p-6 mt-6">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onClick={() => setChecked((prev) => !prev)}
                  checked={checked}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  I agree to the Terms and Conditions
                </span>
              </div>
            </div>
          </div>

          {/* Terms Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
                <h2 className="text-xl font-bold text-white mb-4">
                  Terms and Conditions
                </h2>
                <div className="max-h-96 overflow-y-auto text-gray-300 text-sm mb-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">1. Introduction</h3>
                    <p>
                      Thank you for your interest in MediaTiger! We empower
                      creators to maximize revenue and enhance content creation
                      through innovative tools and partnerships. These Terms of
                      Service ("Terms") govern your registration, participation,
                      and use of MediaTiger's services. By submitting your
                      information through our platform, you agree to comply with
                      these Terms.
                    </p>

                    <h3 className="font-semibold">2. Registration Process</h3>
                    <h4 className="font-medium mt-2">2.1 Eligibility</h4>
                    <p>
                      You must have an active YouTube channel with monetization
                      enabled (if applicable). You represent that you have the
                      legal authority to enter into agreements and that the
                      information provided is accurate.
                    </p>
                    <h4 className="font-medium mt-2">2.2 Selection Process</h4>
                    <p>
                      Completing the registration form does not guarantee
                      acceptance into the program. Applications will be reviewed
                      based on eligibility, channel metrics, content quality,
                      and compliance with platform policies. If selected, you
                      will receive a separate agreement detailing your
                      participation terms. Acceptance into the program is
                      contingent upon signing this agreement.
                    </p>
                    <h4 className="font-medium mt-2">2.3 Reapplication</h4>
                    <p>
                      If your application is not selected, you may reapply after
                      six months, subject to compliance with our policies and
                      eligibility criteria.
                    </p>

                    <h3 className="font-semibold">3. Activation of Contract</h3>
                    <h4 className="font-medium mt-2">
                      3.1 Agreement Activation
                    </h4>
                    <p>
                      The contract will become legally binding and active upon
                      the following conditions: You have submitted the required
                      information, including accurate and complete details as
                      outlined in the registration process. You have reviewed,
                      agreed to, and digitally signed the partnership contract
                      provided by MediaTiger. By completing these steps, you
                      acknowledge and accept the Terms and agree to participate
                      in the program under its outlined policies.
                    </p>
                    <h4 className="font-medium mt-2">3.2 Validity</h4>
                    <p>
                      If you fail to provide accurate information or do not
                      complete the signing process, the agreement will not be
                      considered active, and program access may not be granted.
                    </p>

                    <h3 className="font-semibold">4. Program Participation</h3>
                    <h4 className="font-medium mt-2">4.1 Content Access</h4>
                    <p>
                      Upon acceptance, you will gain access to MediaTiger's
                      exclusive tools and licensed materials, such as music,
                      templates, or other digital assets. Access to assets is
                      subject to change and governed by relevant third-party
                      terms, including YouTube's Terms of Service.
                    </p>
                    <h4 className="font-medium mt-2">
                      4.2 Support and Resources
                    </h4>
                    <p>
                      You will have access to personalized onboarding, training
                      materials, and a dedicated support team to assist you in
                      optimizing program benefits. Technical support is
                      available for implementation and troubleshooting.
                    </p>
                    <h4 className="font-medium mt-2">
                      4.3 Creator Responsibility
                    </h4>
                    <p>
                      You are expected to actively engage with program resources
                      and maintain communication with our team. Failure to
                      comply with participation requirements may result in
                      removal from the program.
                    </p>

                    <h3 className="font-semibold">5. Content Usage Rights</h3>
                    <h4 className="font-medium mt-2">5.1 Licensed Materials</h4>
                    <p>
                      Licensed content is provided exclusively for approved
                      platforms (e.g., YouTube, TikTok, etc.) and must not be
                      redistributed or used outside of the agreed-upon
                      platforms. Access may be revoked if program terms are
                      violated or if the agreement is terminated.
                    </p>
                    <h4 className="font-medium mt-2">
                      5.2 Intellectual Property
                    </h4>
                    <p>
                      All rights, title, and interest in MediaTiger's music
                      library remain with MediaTiger and its licensors. No
                      ownership rights are transferred through program
                      participation. You may not claim ownership or registration
                      rights over any music provided through the program. You
                      must respect all copyright notices and attributions as
                      specified.
                    </p>

                    <h3 className="font-semibold">
                      6. Revenue Sharing and Payments
                    </h3>
                    <h4 className="font-medium mt-2">6.1 Revenue Sharing</h4>
                    <p>
                      Revenue-sharing terms will be outlined in the partnership
                      agreement. Payments depend on platform monetization
                      policies and are subject to deductions for applicable
                      taxes and fees.
                    </p>
                    <h4 className="font-medium mt-2">6.2 Payment Processing</h4>
                    <p>
                      Payments are processed via [Payment Provider] and will be
                      subject to their terms and conditions. It is your
                      responsibility to provide accurate payment details. Delays
                      or errors due to incorrect information will not be the
                      liability of MediaTiger.
                    </p>

                    <h3 className="font-semibold">7. Prohibited Conduct</h3>
                    <p>
                      Misrepresentation of information during registration is
                      strictly prohibited. You may not manipulate metrics such
                      as views, engagement, or other performance indicators.
                      Using program materials in violation of platform policies
                      or outside of agreed platforms will result in termination.
                    </p>

                    <h3 className="font-semibold">
                      8. Termination and Enforcement Rights
                    </h3>
                    <h4 className="font-medium mt-2">8.1 Termination</h4>
                    <p>
                      We may terminate or suspend program participation for
                      violations of these Terms or the partnership contract.
                      YouTube may independently terminate monetization rights
                      according to their policies. Upon termination: Access to
                      the music library will be revoked. You will still receive
                      any revenue that is subject to be paid within the standard
                      net 90-day payment period. No new revenue will be
                      generated for any continued use of our music after
                      termination. These Terms will remain in effect even after
                      your access to the Services is terminated.
                    </p>
                    <h4 className="font-medium mt-2">8.2 Enforcement Rights</h4>
                    <p>
                      We may take any of the following actions: Take appropriate
                      action regarding any content that we believe violates
                      these Terms. Disclose your identity to any third party who
                      claims that material posted by you violates their rights.
                      Take legal action for any unauthorized use of the
                      Services. Cooperate with law enforcement authorities or
                      court orders requesting disclosure of your identity or
                      information. You waive and hold harmless MediaTiger from
                      any claims resulting from actions taken during or as a
                      consequence of investigations by either MediaTiger or law
                      enforcement authorities.
                    </p>

                    <h3 className="font-semibold">9. Liability Limits</h3>
                    <p>
                      To the fullest extent permitted by law, neither MediaTiger
                      nor our employees, directors, or affiliates shall be
                      liable for: Any lost profits or revenues; Any
                      consequential, incidental, indirect, special, or punitive
                      damages; Changes in revenue or monetization status;
                      Platform policy changes or decisions made by YouTube or
                      other service providers; Our aggregate liability for any
                      damages shall not exceed the greater of one hundred ($100)
                      US dollars or the amount paid in the past twelve months.
                      Some jurisdictions do not allow limitations on implied
                      warranties or incidental damages, so the above limitations
                      may not apply to you.
                    </p>

                    <h3 className="font-semibold">10. Changes to Terms</h3>
                    <p>
                      We may update these Terms at any time. Significant changes
                      will be communicated via email. Continued participation
                      after changes constitutes acceptance of the revised Terms.
                    </p>

                    <h3 className="font-semibold">
                      11. Data Collection and Privacy
                    </h3>
                    <p>
                      By participating in the program, you consent to the
                      collection and processing of personal data, such as
                      contact details and analytics, for program purposes.
                    </p>

                    <h3 className="font-semibold">12. Representations</h3>
                    <p>
                      You represent and warrant that: Your YouTube channel does
                      not infringe on third-party rights. You have not been
                      previously terminated from the program. You have not been
                      suspended from YouTube's Partner Program. All information
                      provided in your application is true and accurate.
                    </p>

                    <h3 className="font-semibold">13. Force Majeure</h3>
                    <p>
                      Neither party shall be liable for delays or failures due
                      to circumstances beyond reasonable control. This includes
                      but is not limited to changes in YouTube policies,
                      platform modifications, or technical issues. By using our
                      website, submitting an interest form, or participating in
                      the MediaTiger Partner Program, you agree to these Terms
                      of Service.
                    </p>

                    <h3 className="font-semibold">14. General Provisions</h3>
                    <h4 className="font-medium mt-2">14.1 Governing Law</h4>
                    <p>
                      These Terms are governed by the laws of the United States.
                      All disputes will be subject to the exclusive jurisdiction
                      of courts in the United States.
                    </p>
                    <h4 className="font-medium mt-2">
                      14.2 Contact Information
                    </h4>
                    <p>
                      For questions about these Terms, please contact us at
                      support@mediatiger.co.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Contract Agreement */}

        {checked && (
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
            <form className="space-y-4 text-white" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Legal Name
                </label>
                <input
                  value={formData.legalName}
                  name="legalName"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter your legal full name"
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Street Address
                </label>
                <input
                  value={formData.address}
                  name="address"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter your street address"
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleInputChange}
                    value={formData.city}
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
                    name="state"
                    onChange={handleInputChange}
                    value={formData.state}
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
                    name="zip"
                    onChange={handleInputChange}
                    value={formData.zip}
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
                    name="country"
                    onChange={handleInputChange}
                    placeholder="Country"
                    value={formData.country}
                    className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
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
                      onClick={() => {
                        setSignatureMethod("draw");
                        clearSignature();
                      }}
                      className={`px-4 py-2 rounded-md ${
                        signatureMethod === "draw"
                          ? "bg-indigo-600"
                          : "bg-indigo-500 hover:bg-indigo-600"
                      }`}
                    >
                      Draw Signature
                    </button>
                  </div>

                  {signatureMethod === "type" ? (
                    <input
                      type="text"
                      placeholder="Type your signature"
                      className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white mb-2"
                      onChange={(e) => setSignatureImage(e.target.value)}
                    />
                  ) : (
                    <div className="w-full bg-white rounded-md mb-2 overflow-hidden">
                      {signatureImage ? (
                        <img
                          src={signatureImage}
                          alt="Signature"
                          className="w-full h-32 object-contain"
                        />
                      ) : (
                        <SignatureCanvas
                          ref={signaturePadRef}
                          canvasProps={{
                            className: "w-full h-32",
                          }}
                          backgroundColor="white"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                      onClick={clearSignature}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500"
                      onClick={saveSignature}
                    >
                      Save Signature
                    </button>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    {signatureMethod === "draw"
                      ? "Draw your signature using your mouse or touch screen"
                      : "Type your signature using your keyboard"}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    disabled={!signatureImage}
                  >
                    Submit Agreement
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceSection;
