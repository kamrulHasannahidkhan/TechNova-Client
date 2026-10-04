export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-sm sm:prose-base">
      <h1 className="font-display text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Information We Collect</h2>
      <p>When you create an account, place an order, or contact us, we collect information such as your name, email address, phone number, and delivery address.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">How We Use Your Information</h2>
      <p>We use your information to process orders, deliver products, communicate with you about your purchases, and improve our services. We do not sell your personal information to third parties.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Payment Information</h2>
      <p>Orders placed through our site are fulfilled via cash on delivery. We do not store payment card details.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Cookies</h2>
      <p>We use cookies and similar technologies to keep you signed in, remember your cart, and understand how our site is used.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Data Security</h2>
      <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Your Rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data by contacting us.</p>

      <h2 className="font-semibold text-lg mt-8 mb-2">Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please reach out through our contact page.</p>
    </div>
  );
}
