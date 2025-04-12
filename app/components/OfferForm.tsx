'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OfferForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    candidateName: '',
    roleTitle: '',
    baseSalary: '',
    equityValue: '',
    benefitsValue: '',
    startDate: '',
    customMessage: '',
    companyLogo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd store this in a database
    // For now, we'll use query parameters
    const queryParams = new URLSearchParams(formData);
    router.push(`/offer/preview?${queryParams.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Create Job Offer
        </h1>
        <p className="text-lg text-gray-800">
          Generate beautiful, personalized job offers for your candidates
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-2xl p-8 shadow-lg">
        <div className="space-y-6">
          <div>
            <label htmlFor="candidateName" className="block text-sm font-semibold text-gray-900 mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              id="candidateName"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter candidate's name"
            />
          </div>

          <div>
            <label htmlFor="roleTitle" className="block text-sm font-semibold text-gray-900 mb-2">
              Role Title
            </label>
            <input
              type="text"
              id="roleTitle"
              name="roleTitle"
              value={formData.roleTitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter role title"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="baseSalary" className="block text-sm font-semibold text-gray-900 mb-2">
                Base Salary
              </label>
              <input
                type="number"
                id="baseSalary"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Enter base salary"
              />
            </div>

            <div>
              <label htmlFor="equityValue" className="block text-sm font-semibold text-gray-900 mb-2">
                Equity Value
              </label>
              <input
                type="number"
                id="equityValue"
                name="equityValue"
                value={formData.equityValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Enter equity value"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="benefitsValue" className="block text-sm font-semibold text-gray-900 mb-2">
                Benefits Value
              </label>
              <input
                type="number"
                id="benefitsValue"
                name="benefitsValue"
                value={formData.benefitsValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Enter benefits value"
              />
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-semibold text-gray-900 mb-2">
                Proposed Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="companyLogo" className="block text-sm font-semibold text-gray-900 mb-2">
              Company Logo URL <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="url"
              id="companyLogo"
              name="companyLogo"
              value={formData.companyLogo}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter company logo URL"
            />
          </div>

          <div>
            <label htmlFor="customMessage" className="block text-sm font-semibold text-gray-900 mb-2">
              Custom Message
            </label>
            <textarea
              id="customMessage"
              name="customMessage"
              value={formData.customMessage}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              placeholder="Enter a personal message for the candidate"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
          >
            Generate Offer
          </button>
        </div>
      </form>
    </div>
  );
} 