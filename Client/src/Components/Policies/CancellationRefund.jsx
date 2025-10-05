import React from 'react';

function CancellationRefund() {
  return (
    <section className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Cancellation & Refund Policy</h1>
      <p className="mb-4">
        At <b>GreenCart</b>, customer satisfaction is our top priority. You can cancel your order within 1 hour of placing it.
      </p>
      <p className="mb-4">
        If payment has already been made, refunds will be initiated within 5–7 business days to your original payment method.
      </p>
      <p>
        For any cancellation or refund-related queries, contact 
        <a href="mailto:support@greencartnow.store" className="text-green-600 ml-1 underline"> support@greencartnow.store</a>.
      </p>
    </section>
  );
}

export default CancellationRefund;
