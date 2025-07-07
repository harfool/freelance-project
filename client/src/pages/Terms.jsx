import React from "react";
import Footer from "../components/Footer.jsx";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Terms &amp; Conditions
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Please read these terms and conditions carefully before using
                our services.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl px-4 md:px-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-6 text-muted-foreground">
              By accessing or using EduInstitute's website and services, you
              agree to be bound by these terms and conditions. If you do not
              agree, please do not use our services.
            </p>
            <h2 className="text-xl font-semibold mb-4">
              2. User Responsibilities
            </h2>
            <ul className="mb-6 list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                Provide accurate and complete information during registration.
              </li>
              <li>Keep your login credentials confidential and secure.</li>
              <li>
                Use the platform for lawful and educational purposes only.
              </li>
              <li>
                Do not share, copy, or distribute course materials without
                permission.
              </li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">3. Privacy Policy</h2>
            <p className="mb-6 text-muted-foreground">
              Your privacy is important to us. Please review our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>{" "}
              to understand how we collect, use, and protect your information.
            </p>
            <h2 className="text-xl font-semibold mb-4">
              4. Intellectual Property
            </h2>
            <p className="mb-6 text-muted-foreground">
              All content, logos, and materials on this site are the property of
              EduInstitute or its licensors. Unauthorized use is strictly
              prohibited.
            </p>
            <h2 className="text-xl font-semibold mb-4">
              5. Limitation of Liability
            </h2>
            <p className="mb-6 text-muted-foreground">
              EduInstitute is not liable for any direct, indirect, or
              consequential damages arising from the use of our services.
            </p>
            <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="mb-6 text-muted-foreground">
              We reserve the right to update these terms at any time. Continued
              use of the platform constitutes acceptance of the revised terms.
            </p>
            <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
            <p className="mb-6 text-muted-foreground">
              If you have any questions about these terms, please{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact us
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
