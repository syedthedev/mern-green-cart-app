import React from 'react';

function TermsAndConditions() {
  return (
    <section className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to <b>GreenCart</b>. By accessing or using our website, you agree to comply with these Terms and Conditions.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>All prices are inclusive of applicable taxes unless stated otherwise.</li>
        <li>Users must provide accurate personal and delivery details when placing an order.</li>
        <li>We reserve the right to modify, suspend, or discontinue any service without prior notice.</li>
      </ul>
      <p>
        For questions about these terms, email us at 
        <a href="mailto:support@greencartnow.store" className="text-green-600 ml-1 underline">support@greencartnow.store</a>.
      </p>
    </section>
  );
}

export default TermsAndConditions;
