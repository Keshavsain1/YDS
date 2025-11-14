import React, { useState } from "react";
import { Send } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  // honeypot
  company?: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  company: "",
};

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatusMsg(null);
  };

  const validate = (data: FormState) => {
    const err: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) err.name = "Please enter your name.";
    if (!data.email.trim() || !emailRegex.test(data.email.trim()))
      err.email = "Please enter a valid email.";
    // phone optional but if provided, check digits (very simple)
    if (data.phone && !/^[+\d][\d\s\-()]{6,}$/.test(data.phone.trim()))
      err.phone = "Please enter a valid phone number.";
    if (!data.message.trim() || data.message.trim().length < 10)
      err.message = "Please describe the project (min 10 characters).";
    return err;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // honeypot check: if filled, drop silently
    if (form.company && form.company.trim().length > 0) {
      setStatusMsg("Thanks — we'll get back to you if this isn't spam.");
      return;
    }

    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatusMsg("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    setStatusMsg(null);

    // Compose mailto
    const subject = `New Inquiry from ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : "",
      form.service ? `Service: ${form.service}` : "",
      "",
      "Message:",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoLink = `mailto:studioyounick@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // open mail client in a new window/tab to avoid navigation on some browsers
    window.location.href = mailtoLink;

    // optimistic UI — because mailto leaves the page or opens the client
    setTimeout(() => {
      setSubmitting(false);
      setStatusMsg(
        "Mail composer opened. If nothing happened, please check your mail client or copy the message manually."
      );
      setForm(initialState);
      setErrors({});
    }, 600);
  };

  return (
    <form onSubmit={submit} className="space-y-6" aria-live="polite">
      {/* Honeypot - visually hidden but present for bots */}
      <div style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" value={form.company} onChange={change} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={change}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B566] transition-colors ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <div id="error-name" className="text-sm text-red-500 mt-1">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={change}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B566] transition-colors ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && <div id="error-email" className="text-sm text-red-500 mt-1">{errors.email}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={change}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B566] transition-colors ${
              errors.phone ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <div id="error-phone" className="text-sm text-red-500 mt-1">{errors.phone}</div>}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Service of Interest
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={change}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B566] transition-colors"
          >
            <option value="">Select a service</option>
            <option value="interior-design">Interior Design</option>
            <option value="construction">Construction</option>
            <option value="renovation">Renovation</option>
            <option value="consultation">Consultation</option>
            <option value="3d-visualization">3D Visualization</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={change}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B566] transition-colors resize-none ${
            errors.message ? "border-red-400" : "border-gray-300"
          }`}
          placeholder="Tell us about your project requirements..."
        />
        {errors.message && <div id="error-message" className="text-sm text-red-500 mt-1">{errors.message}</div>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full ${submitting ? "bg-gray-400 cursor-wait" : "bg-[#E6B566] hover:bg-[#f0c97e]"} text-black px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
        aria-disabled={submitting}
      >
        <span>{submitting ? "Opening mail..." : "Send Message"}</span>
        <Send size={18} />
      </button>

      {/* Status message area (aria-live) */}
      {statusMsg && (
        <div role="status" className="text-sm text-gray-700 mt-2">
          {statusMsg}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
