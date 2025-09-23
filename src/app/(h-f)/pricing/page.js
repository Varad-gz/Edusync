import React from 'react'
import WorkUnderProgress from '@/components/WorkUnderProgress'

const PricingPage = () => {
    const plans = [
        {
            title: 'Basic Plan',
            price: 'Rs.1599/month',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            buttonLabel: 'Get Started',
        },
        {
            title: 'Pro Plan',
            price: 'Rs.3999/month',
            features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
            buttonLabel: 'Get Started',
        },
        {
            title: 'Enterprise Plan',
            price: 'Custom Pricing',
            features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
            buttonLabel: 'Contact Us',
        },
    ];

    return (
        <>
            <div className='bg-blue-950 text-white p-[20px]'>This page is under construction and is currently being showcased for demonstration purposes only.</div>
            <div className="bg-gray-900 text-white py-16 px-8">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Title */}
                    <h2 className="text-4xl font-bold mb-4">Flexible Pricing for Everyone</h2>
                    {/* Subtitle */}
                    <p className="text-gray-400 mb-12">
                        Choose the perfect plan that fits your needs. Start with the basics or unlock advanced features.
                    </p>
                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
                                <p className="text-gray-400 mb-6">{plan.price}</p>
                                <ul className="mb-6 space-y-2 text-gray-300">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                                <button className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600">
                                    {plan.buttonLabel}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PricingPage
