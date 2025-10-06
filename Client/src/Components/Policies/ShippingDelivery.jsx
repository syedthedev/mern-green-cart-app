import React from 'react';

function ShippingDelivery() {
  return (
    <section className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Shipping & Delivery Policy</h1>
      <p className="mb-4">
        We currently deliver products only within Tamil Nadu. Delivery time typically ranges between 2–7 business days depending on your location.
      </p>
      <p className="mb-4">
        Once your order is shipped, you will receive an email or SMS with tracking details.
      </p>
      <p>
        If you face any issues with delivery, please contact 
        <a href="mailto:support@greencartnow.store" className="text-green-600 ml-1 underline"> support@greencartnow.store</a>.
      </p>
    </section>
  );
}

export default ShippingDelivery;
