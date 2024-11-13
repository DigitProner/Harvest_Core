import React from 'react';
import { Shield, FileText, Scale } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Terms and Policies</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold">Terms of Service</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Our terms of service and usage guidelines.
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Read More →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold">Privacy Policy</h2>
          </div>
          <p className="text-gray-600 mb-4">
            How we handle and protect your data.
          </p>
          <button className="text-green-600 hover:text-green-700 font-medium">
            Read More →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Scale className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold">Legal Information</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Legal disclaimers and compliance.
          </p>
          <button className="text-purple-600 hover:text-purple-700 font-medium">
            Read More →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Terms of Service</h2>
        </div>
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-3">1. Acceptance of Terms</h3>
            <p className="text-gray-600">
              By accessing and using FarmManager, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-3">2. Use License</h3>
            <p className="text-gray-600">
              Permission is granted to temporarily download one copy of FarmManager for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-3">3. Disclaimer</h3>
            <p className="text-gray-600">
              The materials on FarmManager are provided on an 'as is' basis. FarmManager makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-3">4. Limitations</h3>
            <p className="text-gray-600">
              In no event shall FarmManager or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use FarmManager.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;