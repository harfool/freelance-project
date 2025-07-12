import React from "react";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Privacy Policy
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Learn how SBC collects, uses, and protects your personal
                information.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl px-4 md:px-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              1. Information We Collect
            </h2>
            <ul className="mb-6 list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                Personal details (name, email, phone, address) provided during
                registration.
              </li>
              <li>Course preferences and academic interests.</li>
              <li>
                Usage data such as pages visited, time spent, and actions taken
                on the platform.
              </li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="mb-6 list-disc pl-6 text-muted-foreground space-y-2">
              <li>To provide and improve our educational services.</li>
              <li>
                To communicate important updates, notifications, and offers.
              </li>
              <li>To personalize your learning experience.</li>
              <li>To ensure platform security and prevent misuse.</li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">
              3. Data Sharing & Disclosure
            </h2>
            <p className="mb-6 text-muted-foreground">
              We do not sell or rent your personal information. Data may be
              shared with trusted partners for educational purposes or as
              required by law.
            </p>
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="mb-6 text-muted-foreground">
              We implement industry-standard security measures to protect your
              data from unauthorized access, alteration, or disclosure.
            </p>
            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <ul className="mb-6 list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                Access, update, or delete your personal information at any time.
              </li>
              <li>Opt out of marketing communications.</li>
              <li>
                Request a copy of your data or raise privacy concerns by{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  contacting us
                </Link>
                .
              </li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">
              6. Changes to This Policy
            </h2>
            <p className="mb-6 text-muted-foreground">
              We may update this Privacy Policy from time to time. Please review
              this page regularly for any changes.
            </p>
            <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
            <p className="mb-6 text-muted-foreground">
              If you have questions or concerns about our privacy practices,
              please{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
