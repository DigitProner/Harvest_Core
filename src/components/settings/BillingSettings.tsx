import React from 'react';
import { Check, CreditCard, Zap, Shield, Star } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: 29,
    description: 'Perfect for small farms',
    features: [
      'Up to 100 livestock records',
      'Basic inventory management',
      'Up to 5 staff members',
      'Basic reporting',
      'Email support'
    ],
    icon: Star,
    color: 'blue'
  },
  {
    name: 'Professional',
    price: 79,
    description: 'Ideal for growing farms',
    features: [
      'Up to 500 livestock records',
      'Advanced inventory management',
      'Up to 15 staff members',
      'Advanced reporting & analytics',
      'Priority email & phone support',
      'Custom tags & categories',
      'Batch operations'
    ],
    icon: Zap,
    color: 'purple',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 199,
    description: 'For large-scale operations',
    features: [
      'Unlimited livestock records',
      'Enterprise inventory management',
      'Unlimited staff members',
      'Custom reporting',
      '24/7 priority support',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'On-premise deployment option'
    ],
    icon: Shield,
    color: 'green'
  }
];

const BillingSettings = () => {
  const [currentPlan] = React.useState('Basic');

  const handleUpgrade = (planName: string) => {
    // Placeholder for upgrade functionality
    console.log('Upgrading to plan:', planName);
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your subscription and billing</p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{currentPlan} Plan</h3>
              <p className="text-sm text-gray-500 mt-1">Your next billing date is July 1, 2024</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Manage Billing
            </button>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Contact sales for payment options</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Plans</h2>
          <p className="text-sm text-gray-500 mt-1">Choose the best plan for your needs</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border ${
                  plan.popular ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
                } p-6`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`p-3 rounded-lg bg-${plan.color}-100 w-fit`}>
                  <plan.icon className={`h-6 w-6 text-${plan.color}-600`} />
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.name)}
                  className={`mt-8 w-full py-2 px-4 rounded-lg font-medium ${
                    currentPlan === plan.name
                      ? 'bg-gray-100 text-gray-500 cursor-default'
                      : plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={currentPlan === plan.name}
                >
                  {currentPlan === plan.name ? 'Current Plan' : 'Contact Sales'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;