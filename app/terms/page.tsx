export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-sm sm:prose-base">
      <h1 className="font-display text-3xl font-bold mb-2">Terms &amp; Conditions</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Orders</h2>
      <p>By placing an order, you confirm that the information you provide is accurate and that you are authorized to make the purchase.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Pricing</h2>
      <p>All prices are listed in BDT (৳) and are subject to change without prior notice. We reserve the right to correct pricing errors.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Payment</h2>
      <p>We currently accept cash on delivery. Additional payment methods may be added in the future.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Shipping &amp; Delivery</h2>
      <p>Delivery times and costs vary by location within Bangladesh and are shown at checkout.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Returns</h2>
      <p>Please contact us within a reasonable time of receiving your order if there is an issue with your purchase.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Limitation of Liability</h2>
      <p>We are not liable for indirect, incidental, or consequential damages arising from the use of our website or products.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Changes to These Terms</h2>
      <p>We may update these terms from time to time. Continued use of the site constitutes acceptance of the revised terms.</p>
    </div>
  );
}
