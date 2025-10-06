import React from 'react';

function ContactUs() {
  return (
    <section className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Contact Us</h1>
      <p className="mb-4">
        We’d love to hear from you! For any queries, support, or business-related concerns, please reach out using the details below.
      </p>
      <div className="space-y-2">
        <p><b>Business Name:</b> GreenCart</p>
        <p><b>Email:</b> <a href="mailto:support@greencartnow.store" className="text-green-600 underline">support@greencartnow.store</a></p>
        <p><b>Phone:</b> +91-8438167384</p>
        <p><b>Address:</b>122/B,TVK Nagar,Trichy</p>
      </div>
    </section>
  );
}

export default ContactUs;
