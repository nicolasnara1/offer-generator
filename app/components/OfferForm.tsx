'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';

interface TeamMessage {
  name: string;
  title: string;
  message: string;
}

interface FormData {
  candidateName: string;
  roleTitle: string;
  baseSalary: string;
  equityValue: string;
  benefitsValue: string;
  startDate: string;
  customMessage: string;
  companyLogo: string;
  teamMessages: TeamMessage[];
}

export default function OfferForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    candidateName: '',
    roleTitle: '',
    baseSalary: '',
    equityValue: '',
    benefitsValue: '',
    startDate: '',
    customMessage: '',
    companyLogo: '',
    teamMessages: [{ name: '', title: '', message: '' }]
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setFormData(prev => ({ ...prev, companyLogo: objectUrl }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'companyLogo') {
      setPreviewUrl('');
    }
  };

  const handleTeamMessageChange = (index: number, field: keyof TeamMessage, value: string) => {
    setFormData(prev => {
      const newTeamMessages = [...prev.teamMessages];
      newTeamMessages[index] = { ...newTeamMessages[index], [field]: value };
      return { ...prev, teamMessages: newTeamMessages };
    });
  };

  const addTeamMessage = () => {
    setFormData(prev => ({
      ...prev,
      teamMessages: [...prev.teamMessages, { name: '', title: '', message: '' }]
    }));
  };

  const removeTeamMessage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMessages: prev.teamMessages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty team messages
    const validTeamMessages = formData.teamMessages.filter(
      msg => msg.name.trim() && msg.title.trim() && msg.message.trim()
    );

    // Create the query parameters with the filtered team messages
    const queryParams = {
      ...formData,
      teamMessages: JSON.stringify(validTeamMessages)
    };

    // Build the URL with the query parameters
    const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
    router.push(`/offer/preview?${queryString}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8">
          <div className="animate-fade-in-up delay-1 mb-12">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-white text-center mb-4">Create Job Offer</h1>
              <p className="text-lg text-white/90 text-center">Fill in the details below to generate a beautiful offer letter</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">
                  Candidate Name
                </label>
                <input
                  type="text"
                  id="candidateName"
                  name="candidateName"
                  required
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter candidate name"
                />
              </div>

              <div>
                <label htmlFor="roleTitle" className="block text-sm font-medium text-gray-700">
                  Role Title
                </label>
                <input
                  type="text"
                  id="roleTitle"
                  name="roleTitle"
                  required
                  value={formData.roleTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter role title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-700">
                    Base Salary (USD)
                  </label>
                  <input
                    type="number"
                    id="baseSalary"
                    name="baseSalary"
                    required
                    value={formData.baseSalary}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter base salary"
                  />
                </div>

                <div>
                  <label htmlFor="equityValue" className="block text-sm font-medium text-gray-700">
                    Equity Value (USD)
                  </label>
                  <input
                    type="number"
                    id="equityValue"
                    name="equityValue"
                    required
                    value={formData.equityValue}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter equity value"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="benefitsValue" className="block text-sm font-medium text-gray-700">
                    Benefits Value (USD)
                  </label>
                  <input
                    type="number"
                    id="benefitsValue"
                    name="benefitsValue"
                    required
                    value={formData.benefitsValue}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter benefits value"
                  />
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Proposed Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700">
                  Welcome Message
                </label>
                <textarea
                  id="customMessage"
                  name="customMessage"
                  required
                  value={formData.customMessage}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter a welcome message for the candidate"
                />
              </div>

              {/* Team Messages Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Messages from the Team</h3>
                  <button
                    type="button"
                    onClick={addTeamMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Team Message
                  </button>
                </div>

                {formData.teamMessages.map((message, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-900">Team Member {index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeTeamMessage(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={message.name}
                          onChange={(e) => handleTeamMessageChange(index, 'name', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter team member's name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          value={message.title}
                          onChange={(e) => handleTeamMessageChange(index, 'title', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter team member's title"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        value={message.message}
                        onChange={(e) => handleTeamMessageChange(index, 'message', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter team member's message"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Company Logo (Optional)
                </label>
                <div
                  {...getRootProps()}
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="space-y-2 text-center">
                    <div className="space-y-1">
                      <input {...getInputProps()} />
                      {previewUrl ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-32 object-contain mb-4"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewUrl('');
                              setFormData(prev => ({ ...prev, companyLogo: '' }));
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                              <span>Upload a file</span>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
              >
                Generate Offer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 