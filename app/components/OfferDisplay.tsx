'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// Add animation keyframes to the top of the file
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
    teamMessages?: {
      name: string;
      title: string;
      message: string;
    }[];
  };
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
    const searchParams = useSearchParams();

  useEffect(() => {
    // Parse team messages from URL
    const teamMessagesParam = searchParams.get('teamMessages');
    if (teamMessagesParam) {
      try {
        const parsedMessages = JSON.parse(teamMessagesParam);
        setTeamMessages(parsedMessages);
      } catch (error) {
        console.error('Failed to parse team messages', error);
        setTeamMessages([]);
      }
    }

    // Initial welcome confetti
    const end = Date.now() + 2000;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, [searchParams]);

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
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 1.2,
        shapes: ['star']
      });

      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 2,
        shapes: ['circle']
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    setTimeout(shoot, 300);
    setTimeout(shoot, 400);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <style jsx global>{styles}</style>
      
      {/* Header */}
      <header className="bg-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          {companyLogo && (
            <Image
              src={companyLogo}
              alt="Company Logo"
              width={160}
              height={40}
              className="object-contain"
            />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to the Team, {candidateName}! 🎉
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            We&apos;re thrilled to offer you the position of <span className="font-semibold text-blue-600">{roleTitle}</span>
          </p>
          {customMessage && (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
              <p className="text-lg text-gray-800 whitespace-pre-line italic">
                &quot;{customMessage}&quot;
              </p>
            </div>
          )}
        </section>

        {/* Compensation Section */}
        <section className="mb-16 animate-fade-in-up delay-1">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              💰 Your Compensation Package
            </h2>
            <div className="text-4xl font-bold text-blue-600 text-center mb-6">
              {formatCurrency(totalCompensation)}
              <div className="text-base font-normal text-gray-600 mt-2">Annual Total Compensation</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Base Salary</h3>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(Number(baseSalary))}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Equity</h3>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(Number(equityValue))}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits</h3>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(Number(benefitsValue))}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Messages Section */}
        {teamMessages.length > 0 && (
          <section className="mb-16 animate-fade-in-up delay-2">
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                👋 Meet Your Future Team
              </h2>
              <div className="space-y-8">
                {teamMessages.map((message, index) => (
                  <div key={index} className="flex items-start space-x-4 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                    <Image
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(message.name)}`}
                      alt={message.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-grow">
                      <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-md relative border border-gray-100">
                        <div className="absolute left-[-8px] top-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                        <p className="text-gray-800 whitespace-pre-line mb-4 text-lg">
                          💬 {message.message}
                        </p>
                        <div className="text-gray-700">
                          <p className="font-semibold">{message.name}</p>
                          <p className="text-sm">{message.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Onboarding Timeline */}
        <section className="mb-16 animate-fade-in-up delay-3">
          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🚀 Your First 30 Days
            </h2>
            <div className="max-w-2xl mx-auto">
              <ol className="space-y-6">
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-lg">Week 1: Welcome & Setup</h3>
                    <p className="text-gray-600">Meet your team, set up your workstation, and get familiar with our tools</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-lg">Week 2: Deep Dive</h3>
                    <p className="text-gray-600">1:1s with key team members and introduction to our systems</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-lg">Week 3-4: First Project</h3>
                    <p className="text-gray-600">Get started on your first project with full team support</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 animate-fade-in-up delay-4">
          <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ❓ Frequently Asked Questions
            </h2>
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">💻 What equipment will I receive?</h3>
                <p className="text-gray-600">You'll get a MacBook Pro and any peripherals you need to work effectively.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">🏥 When do my benefits start?</h3>
                <p className="text-gray-600">Your health insurance and other benefits begin on your first day.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">📅 What's my start date?</h3>
                <p className="text-gray-600">Your proposed start date is {formatDate(startDate)}. We can discuss adjustments if needed.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">📞 Who can I contact with questions?</h3>
                <p className="text-gray-600">Your HR contact will reach out shortly with next steps and contact information.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">📝 When will I receive my official offer letter?</h3>
                <p className="text-gray-600">You'll receive your offer letter right after accepting this offer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAccepted && (
          <section className="text-center animate-fade-in-up delay-5">
            <button
              onClick={() => {
                setIsAccepted(true);
                celebrateAcceptance();
              }}
              className="px-8 py-4 bg-green-600 text-white text-lg rounded-xl font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all transform hover:scale-105"
            >
              Accept Offer & Join the Team 🎉
            </button>
            <p className="mt-4 text-gray-600">
              Questions? Schedule a call with our HR team
            </p>
          </section>
        )}

        {/* Acceptance Message */}
        {isAccepted && (
          <section className="text-center bg-green-50 p-8 rounded-2xl animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Welcome to the Team!</h3>
            <p className="text-lg text-gray-800 mb-4">
              We're thrilled to have you join us. You'll receive an email shortly with next steps.
            </p>
            <p className="text-gray-600">
              Your journey begins on {formatDate(startDate)}
            </p>
          </section>
        )}
      </main>

      {/* Footer */}
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