import React from 'react';

function PrivacyPolicy() {
  return (
    <section className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Privacy Policy</h1>
      <p className="mb-4">
        At <b>GreenCart</b>, accessible from <a href="https://greencartnow.store" className="text-green-600 underline">greencartnow.store</a>,
        we prioritize your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data.
      </p>
      <p className="mb-4">
        We collect personal details such as name, email, address, and payment information only to process your orders and improve user experience.
      </p>
      <p className="mb-4">
        Your information is never shared with third parties except when required by law or for payment and delivery purposes.
      </p>
      <p className="mb-4">
        By using our website, you consent to our Privacy Policy. For any queries, contact us at 
        <a href="mailto:support@greencartnow.store" className="text-green-600 ml-1 underline">support@greencartnow.store</a>.
      </p>
    </section>
  );
}

export default PrivacyPolicy;
