'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface OfferDisplayProps {
  candidateName: string;
  roleTitle: string;
  baseSalary: string;
  equityValue: string;
  benefitsValue: string;
  startDate: string;
  customMessage: string;
  companyLogo?: string;
}

interface AcceptanceFormData {
  country: string;
  address: string;
  phone: string;
  confirmedStartDate: string;
  alternateStartDate?: string;
}

export default function OfferDisplay({
  candidateName,
  roleTitle,
  baseSalary,
  equityValue,
  benefitsValue,
  startDate,
  customMessage,
  companyLogo,
}: OfferDisplayProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [showAcceptanceForm, setShowAcceptanceForm] = useState(false);
  const [acceptanceData, setAcceptanceData] = useState<AcceptanceFormData>({
    country: '',
    address: '',
    phone: '',
    confirmedStartDate: startDate,
    alternateStartDate: '',
  });
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // Initial confetti burst when the offer page loads
    const duration = 3000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = duration - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const totalCompensation = 
    Number(baseSalary) + 
    Number(equityValue) + 
    Number(benefitsValue);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleAcceptanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAccepted(true);
    
    // Celebration confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // In a real app, you would send this data to your backend
    console.log('Offer accepted with data:', acceptanceData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAcceptanceData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Share Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="text-gray-700 font-medium">
            {showCopied ? 'Copied!' : 'Share Offer'}
          </span>
        </button>
      </div>

      <div className="animate-fade-in max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
        {/* Hero Section */}
        <div className="relative h-48 -mx-6 -mt-6 mb-8">
          <Image
            src="https://images.unsplash.com/photo-1492138786289-d35ea832da43?auto=format&fit=crop&w=2000"
            alt="Celebration"
            fill
            className="object-cover rounded-t-lg"
          />
          {companyLogo && (
            <div className="absolute -bottom-8 left-6 w-24 h-24 bg-white rounded-lg shadow-lg p-2">
              <Image
                src={companyLogo}
                alt="Company Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-8 pt-8">
          <div className="text-center animate-slide-up">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome, {candidateName}!
            </h1>
            <p className="text-xl text-gray-800">
              We're excited to offer you the position of
            </p>
            <p className="text-2xl font-semibold text-blue-600 mt-2">
              {roleTitle}
            </p>
          </div>

          {/* Compensation Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-gray-50 p-6 rounded-lg text-center transform transition-all hover:scale-105">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Base Salary</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(Number(baseSalary))}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center transform transition-all hover:scale-105">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Equity</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(Number(equityValue))}</p>
              <p className="text-sm text-gray-700 mt-1">Valued at grant</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center transform transition-all hover:scale-105">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Benefits Value</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(Number(benefitsValue))}</p>
            </div>
          </div>

          {/* Total Compensation */}
          <div className="bg-blue-50 p-6 rounded-lg text-center animate-slide-up transform transition-all hover:scale-105" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Total Compensation</h3>
            <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalCompensation)}</p>
          </div>

          {/* Start Date */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '600ms' }}>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Proposed Start Date</h3>
            <p className="text-xl text-gray-800">{formatDate(startDate)}</p>
          </div>

          {/* Custom Message */}
          <div className="bg-gray-50 p-6 rounded-lg animate-slide-up" style={{ animationDelay: '800ms' }}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">A Message from the Team</h3>
            <p className="text-gray-800 whitespace-pre-line">{customMessage}</p>
          </div>

          {/* Accept Offer Button */}
          {!showAcceptanceForm && !isAccepted && (
            <div className="flex justify-center animate-slide-up" style={{ animationDelay: '1000ms' }}>
              <button
                onClick={() => setShowAcceptanceForm(true)}
                className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all"
              >
                Accept Offer
              </button>
            </div>
          )}

          {/* Acceptance Form */}
          {showAcceptanceForm && !isAccepted && (
            <form onSubmit={handleAcceptanceSubmit} className="space-y-6 animate-slide-up bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Your Acceptance</h3>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-800 mb-2">
                  Country of Residence
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={acceptanceData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-800 mb-2">
                  Residential Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={acceptanceData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={acceptanceData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Start Date Confirmation
                </label>
                <div className="space-y-2">
                  <div>
                    <input
                      type="radio"
                      id="confirmDate"
                      name="dateConfirmation"
                      className="mr-2"
                      checked={!acceptanceData.alternateStartDate}
                      onChange={() => setAcceptanceData(prev => ({ ...prev, alternateStartDate: '' }))}
                    />
                    <label htmlFor="confirmDate" className="text-gray-800">
                      I confirm the proposed start date of {formatDate(startDate)}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="alternateDate"
                      name="dateConfirmation"
                      className="mr-2"
                      checked={!!acceptanceData.alternateStartDate}
                      onChange={() => setAcceptanceData(prev => ({ ...prev, alternateStartDate: prev.confirmedStartDate }))}
                    />
                    <label htmlFor="alternateDate" className="text-gray-800">
                      I would like to propose an alternate start date
                    </label>
                  </div>
                  {acceptanceData.alternateStartDate && (
                    <input
                      type="date"
                      name="alternateStartDate"
                      value={acceptanceData.alternateStartDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mt-2"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all"
                >
                  Confirm Acceptance
                </button>
              </div>
            </form>
          )}

          {/* Acceptance Confirmation */}
          {isAccepted && (
            <div className="text-center bg-green-50 p-6 rounded-lg animate-slide-up">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Offer Accepted!</h3>
              <p className="text-green-700">
                Congratulations! We're excited to have you join the team.
                {acceptanceData.alternateStartDate 
                  ? ` We'll be in touch regarding your proposed start date of ${formatDate(acceptanceData.alternateStartDate)}.`
                  : ` We'll see you on ${formatDate(startDate)}!`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 