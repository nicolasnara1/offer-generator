'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// Animation keyframes
const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-scale-in {
  opacity: 0;
  animation: scaleIn 0.5s ease-out forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }
.delay-5 { animation-delay: 1s; }
.delay-6 { animation-delay: 1.2s; }
`;

interface TeamMessage {
  name: string;
  title: string;
  message: string;
}

type OfferDisplayProps = {
  candidateName: string;
  roleTitle: string;
  baseSalary: string;
  equityValue: string;
  benefitsValue: string;
  startDate: string;
  customMessage: string;
  companyLogo?: string;
  teamMessages: string;
};

function TeamMessagesSection({ teamMessagesJson }: { teamMessagesJson: string }) {
  const [messages, setMessages] = useState<TeamMessage[]>([]);

  useEffect(() => {
    try {
      const parsedMessages = JSON.parse(teamMessagesJson);
      setMessages(parsedMessages);
    } catch (error) {
      console.error('Failed to parse team messages', error);
      setMessages([]);
    }
  }, [teamMessagesJson]);

  if (messages.length === 0) return null;

  return (
    <div className="animate-fade-in-up delay-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Messages from the Team 💬</h3>
      <div className="space-y-6">
        {messages.map((message, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 italic mb-4">"{message.message}"</p>
            <div className="flex items-center">
              <div>
                <p className="font-semibold text-gray-900">{message.name}</p>
                <p className="text-gray-600">{message.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineSection() {
  const weeks = [
    { week: 1, title: "Onboarding & Setup", description: "Complete paperwork, set up your workspace, and meet the team" },
    { week: 2, title: "Training & Orientation", description: "Learn company processes and tools" },
    { week: 3, title: "First Project Kickoff", description: "Begin working on your first project with the team" },
    { week: 4, title: "First Month Review", description: "30-day check-in with your manager" }
  ];

  return (
    <div className="animate-fade-in-up delay-5">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Your First 30 Days 📅</h3>
      <div className="space-y-4">
        {weeks.map((item) => (
          <div key={item.week} className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
              {item.week}
            </div>
            <div className="ml-4 bg-white rounded-xl p-4 shadow-sm flex-grow">
              <h4 className="font-semibold text-gray-900">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "When will I receive my first paycheck?",
      answer: "Your first paycheck will be issued on the 15th of the month following your start date."
    },
    {
      question: "What benefits are included?",
      answer: "We offer comprehensive health insurance, 401(k) matching, paid time off, and professional development opportunities."
    },
    {
      question: "Is remote work an option?",
      answer: "Yes, we offer flexible work arrangements including remote, hybrid, and office-based options."
    },
    {
      question: "How do I accept this offer?",
      answer: "Click the 'Accept Offer' button below to confirm your acceptance. You'll receive a confirmation email shortly after."
    }
  ];

  return (
    <div className="animate-fade-in-up delay-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions ❓</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
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
  teamMessages,
}: OfferDisplayProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  // Initial confetti animation
  useEffect(() => {
    const end = Date.now() + 2000;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    (function frame() {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const totalCompensation = Number(baseSalary) + Number(equityValue) + Number(benefitsValue);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const celebrateAcceptance = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
    };

    function shoot() {
      confetti({ ...defaults, particleCount: 50, scalar: 1.2, shapes: ['star'] });
      confetti({ ...defaults, particleCount: 20, scalar: 2, shapes: ['circle'] });
    }

    [0, 100, 200, 300, 400].forEach(t => setTimeout(shoot, t));
  };

  const downloadPDF = () => {
    // This is a placeholder for the actual PDF download functionality
    // In a real implementation, you would generate a PDF and trigger the download
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <style jsx global>{styles}</style>
      <header className="bg-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          {companyLogo && (
            <Image src={companyLogo} alt="Company Logo" width={160} height={40} className="object-contain" />
          )}
          <button
            onClick={downloadPDF}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Welcome Message - Updated to be more appropriate for an offer letter */}
          <div className="animate-fade-in-up delay-1 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Congratulations, {candidateName}! 🎉</h1>
            <h2 className="text-2xl text-gray-700 mb-8">Your offer for <span className="font-bold">{roleTitle}</span> 💼</h2>
          </div>

          {/* Custom Message */}
          <div className="animate-fade-in-up delay-2 text-center">
            <p className="text-lg text-gray-600 mb-8">{customMessage}</p>
          </div>

          {/* Total Compensation - Moved above the breakdown */}
          <div className="animate-fade-in-up delay-3 mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Total Compensation 💰</h3>
              <p className="text-4xl font-bold text-white">{formatCurrency(totalCompensation)}</p>
            </div>
          </div>

          {/* Compensation Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up delay-4">
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Base Salary 💵</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(Number(baseSalary))}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Equity 📈</h3>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(Number(equityValue))}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits 🏥</h3>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(Number(benefitsValue))}</p>
            </div>
          </div>

          {/* Proposed Start Date - Updated label */}
          <div className="animate-fade-in-up delay-5 mb-12">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Proposed Start Date 📅</h3>
              <p className="text-lg text-gray-700">{formatDate(startDate)}</p>
            </div>
          </div>

          {/* Team Messages - Now with gradient background */}
          <div className="my-12 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 shadow-md">
            <TeamMessagesSection teamMessagesJson={teamMessages} />
          </div>

          {/* Timeline Section - Now with gradient background */}
          <div className="my-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md">
            <TimelineSection />
          </div>

          {/* FAQ Section - Now with gradient background */}
          <div className="my-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 shadow-md">
            <FAQSection />
          </div>

          {/* Accept Offer Button */}
          {!isAccepted && (
            <div className="mt-12 text-center animate-fade-in-up delay-6">
              <button
                onClick={() => {
                  setIsAccepted(true);
                  celebrateAcceptance();
                }}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all transform hover:scale-105"
              >
                Accept Offer ✨
              </button>
            </div>
          )}

          {/* Acceptance Confirmation */}
          {isAccepted && (
            <div className="mt-12 text-center animate-scale-in">
              <div className="inline-block bg-green-100 text-green-800 px-6 py-3 rounded-lg">
                🎉 Congratulations! You've accepted the offer! 🎊
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            <div className="mt-2">
              This offer is confidential and subject to the terms outlined in your offer letter.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
