import React from 'react';
import { HelpCircle, Book, MessageCircle, Phone } from 'lucide-react';

const HelpPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Help Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold">Documentation</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Comprehensive guides and documentation to help you manage your farm effectively.
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View Documentation →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold">Live Chat Support</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Get instant help from our support team through live chat.
          </p>
          <button className="text-green-600 hover:text-green-700 font-medium">
            Start Chat →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-6">
            <h3 className="text-base font-medium text-gray-900 mb-2">
              How do I add new livestock to the system?
            </h3>
            <p className="text-gray-600">
              Navigate to the Livestock page and click the "Add Livestock" button. Fill in the required information and save.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-base font-medium text-gray-900 mb-2">
              How can I track animal health records?
            </h3>
            <p className="text-gray-600">
              Each animal has a dedicated health section where you can log checkups, vaccinations, and treatments.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-base font-medium text-gray-900 mb-2">
              Can I export my farm data?
            </h3>
            <p className="text-gray-600">
              Yes, you can export data in various formats from the Reports section.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Phone className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Still need help?</h2>
            <p className="text-gray-600">Contact our support team at support@farmmanager.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;