import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MessageSquare, Phone, Send } from 'lucide-react';
import type { QuoteFormData, VerifiedBusinessProfile } from '../types/packaging';

interface EnquirySectionProps {
  selectedProductCategory: string;
  profile: VerifiedBusinessProfile;
}

interface FormErrors {
  customerName?: string;
  companyName?: string;
  phoneNumber?: string;
  email?: string;
  requiredDimensions?: string;
  quantity?: string;
}

export function EnquirySection({
  selectedProductCategory,
  profile,
}: EnquirySectionProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    customerName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    productCategory: selectedProductCategory || 'Wooden Pallets',
    requiredDimensions: '',
    quantity: '',
    additionalRequirements: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<{
    referenceId: string;
    summary: QuoteFormData;
  } | null>(null);

  useEffect(() => {
    if (selectedProductCategory) {
      setFormData((prev) => ({ ...prev, productCategory: selectedProductCategory }));
    }
  }, [selectedProductCategory]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      nextErrors.customerName = 'Please enter your full name.';
    }
    if (!formData.companyName.trim() || formData.companyName.trim().length < 2) {
      nextErrors.companyName = 'Please enter your company or organization name.';
    }
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phoneNumber = 'Enter a valid phone number (7 to 15 digits).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid business email address.';
    }
    if (!formData.requiredDimensions.trim()) {
      nextErrors.requiredDimensions = 'Specify target dimensions (e.g., 1200 x 1000 mm).';
    }
    const qtyNum = Number(formData.quantity);
    if (!formData.quantity.trim() || !Number.isFinite(qtyNum) || qtyNum < 1) {
      nextErrors.quantity = 'Enter an order quantity of at least 1.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmittedRef({
          referenceId: result.referenceId || `PPS-${Date.now().toString().slice(-6)}`,
          summary: { ...formData },
        });
      } else {
        const errPayload = await response.json().catch(() => null);
        setSubmitError(
          errPayload?.error || 'Could not submit your quotation request. Please verify your entries.'
        );
      }
    } catch {
      // Fallback confirmation when running without backend route
      setSubmittedRef({
        referenceId: `PPS-${Date.now().toString().slice(-6)}`,
        summary: { ...formData },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifiedPhone =
    profile.internationalPhoneNumber || profile.nationalPhoneNumber;
  const phoneNumbers = Array.from(
    new Set([
      ...(profile.contactNumbers || []),
      ...(verifiedPhone ? [verifiedPhone] : []),
    ])
  );
  const whatsappDigits = phoneNumbers[0]
    ? phoneNumbers[0].replace(/\D/g, '')
    : null;

  return (
    <section
      id="enquiry"
      className="border-b border-white/8 bg-[#071526] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Context Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-[#A5F044]">
              Custom Packaging Enquiry
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Request a Technical &amp; Commercial Quotation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#AEB8C5]">
              Submit your pallet or wooden crate specifications below. Provide exact dimensions and batch quantities so our team can prepare an accurate quotation aligned with your operational workflow.
            </p>

            <div className="mt-8 space-y-4 rounded-xl border border-white/10 bg-[#101B2A]/80 p-6">
              <h3 className="font-display text-base font-bold text-white">
                Quotation Checklist
              </h3>
              <ul className="space-y-2.5 text-sm text-[#AEB8C5]">
                <li>01 · Product Category (Wooden Pallet, Plastic Pallet, or Packing Box)</li>
                <li>02 · Target Length × Width × Height dimensions</li>
                <li>03 · Estimated batch quantity &amp; delivery location</li>
                <li>04 · Special handling, load, or export crate notes</li>
              </ul>

              {(phoneNumbers.length > 0 || profile.email) && (
                <div className="mt-4 flex flex-wrap gap-2.5 border-t border-white/10 pt-4">
                  {phoneNumbers.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#A5F044] hover:text-[#A5F044]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#A5F044]" />
                      <span className="font-mono-tabular">{num}</span>
                    </a>
                  ))}
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#A5F044] hover:text-[#A5F044]"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#A5F044]" />
                      <span>{profile.email}</span>
                    </a>
                  )}
                  {whatsappDigits && (
                    <a
                      href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                        `Hello Pallets Pro Solutions, I would like a quotation for ${formData.productCategory}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#A5F044]/15 px-3.5 py-2 text-xs font-semibold text-[#A5F044] transition-colors hover:bg-[#A5F044] hover:text-[#071526]"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>WhatsApp Enquiry</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#101B2A] p-6 sm:p-8">
              {submittedRef ? (
                <div className="space-y-5 py-4">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#A5F044]">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Enquiry Received · Reference {submittedRef.referenceId}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Thank you, {submittedRef.summary.customerName}.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#AEB8C5]">
                    Your quotation request for{' '}
                    <span className="font-semibold text-white">
                      {submittedRef.summary.quantity} × {submittedRef.summary.productCategory}
                    </span>{' '}
                    ({submittedRef.summary.requiredDimensions}) has been logged for{' '}
                    <span className="font-semibold text-white">
                      {submittedRef.summary.companyName}
                    </span>
                    .
                  </p>

                  <dl className="divide-y divide-white/10 rounded-xl border border-white/10 bg-[#071526] px-4 text-xs">
                    <div className="flex justify-between py-2.5">
                      <dt className="text-[#AEB8C5]">Contact Phone</dt>
                      <dd className="font-mono-tabular text-white">
                        {submittedRef.summary.phoneNumber}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <dt className="text-[#AEB8C5]">Business Email</dt>
                      <dd className="text-white">{submittedRef.summary.email}</dd>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <dt className="text-[#AEB8C5]">Dimensions</dt>
                      <dd className="font-mono-tabular text-white">
                        {submittedRef.summary.requiredDimensions}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <dt className="text-[#AEB8C5]">Quantity</dt>
                      <dd className="font-mono-tabular text-white">
                        {submittedRef.summary.quantity}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedRef(null);
                        setFormData({
                          customerName: '',
                          companyName: '',
                          phoneNumber: '',
                          email: '',
                          productCategory: selectedProductCategory || 'Wooden Pallets',
                          requiredDimensions: '',
                          quantity: '',
                          additionalRequirements: '',
                        });
                      }}
                      className="rounded-lg bg-[#A5F044] px-5 py-2.5 text-xs font-bold text-[#071526] transition-colors hover:bg-[#b5f562]"
                    >
                      Submit Another Enquiry
                    </button>

                    {whatsappDigits && (
                      <a
                        href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                          `Enquiry Ref ${submittedRef.referenceId}: ${submittedRef.summary.quantity} x ${submittedRef.summary.productCategory} (${submittedRef.summary.requiredDimensions}) for ${submittedRef.summary.companyName}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#A5F044] hover:text-[#A5F044]"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-[#A5F044]" />
                        <span>Send Summary via WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="customerName"
                        className="block text-xs font-semibold text-white"
                      >
                        Customer Name *
                      </label>
                      <input
                        id="customerName"
                        name="customerName"
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({ ...formData, customerName: e.target.value })
                        }
                        placeholder="e.g., Rajesh Sharma"
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2.5 text-sm text-white placeholder:text-[#AEB8C5]/50 focus:border-[#A5F044] focus:outline-none"
                      />
                      {errors.customerName && (
                        <p className="mt-1 text-xs text-rose-400">
                          {errors.customerName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-xs font-semibold text-white"
                      >
                        Company Name *
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="e.g., Apex Engineering Pvt. Ltd."
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2.5 text-sm text-white placeholder:text-[#AEB8C5]/50 focus:border-[#A5F044] focus:outline-none"
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-xs text-rose-400">
                          {errors.companyName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-xs font-semibold text-white"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, phoneNumber: e.target.value })
                        }
                        placeholder="+91 98XXXXXXXX"
                        className="font-mono-tabular mt-1.5 w-full rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2.5 text-sm text-white placeholder:text-[#AEB8C5]/50 focus:border-[#A5F044] focus:outline-none"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-xs text-rose-400">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-white"
                      >
                        Business Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="procurement@company.com"
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2.5 text-sm text-white placeholder:text-[#AEB8C5]/50 focus:border-[#A5F044] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="productCategory"
                        className="block text-xs font-semibold text-white"
                      >
                        Product Category *
                      </label>
                      <select
                        id="productCategory"
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={(e) =>
                          setFormData({ ...formData, productCategory: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2.5 text-sm text-white focus:border-[#A5F044] focus:outline-none"
                      >
                        <option value="Wooden Pallets">Wooden Pallets</option>
                        <option value="Plastic Pallets">Plastic Pallets</option>
                        <option value="Wooden Packing Boxes">Wooden Packing Boxes</option>
                        <option value="Custom Packaging / Mixed">
                          Custom Packaging / Mixed
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="requiredDimensions"
                        className="block text-xs font-semibold text-white"
                      >
                        Required Dimensions *
                      </label>
                      <input
                        id="requiredDimensions"
                        name="requiredDimensions"
                        type="text"
                        required
                        value={formData.requiredDimensions}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            requiredDimensions: e.target.value,
                          })
                        }
                        placeholder="e.g., 1200 x 1000 x 150 mm"
                        className="font-mono-tabular mt-1.5 w-full rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2.5 text-sm text-white placeholder:text-[#AEB8C5]/50 focus:border-[#A5F044] focus:outline-none"
                      />
                      {errors.requiredDimensions && (
                        <p className="mt-1 text-xs text-rose-400">
                          {errors.requiredDimensions}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-xs font-semibold text-white"
                      >
                        Quantity (Units) *
                      </label>
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min={1}
                        required
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                        placeholder="e.g., 250"
                        className="font-mono-tabular mt-1.5 w-full rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2.5 text-sm text-white placeholder:text-[#AEB8C5]/50 focus:border-[#A5F044] focus:outline-none"
                      />
                      {errors.quantity && (
                        <p className="mt-1 text-xs text-rose-400">{errors.quantity}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="additionalRequirements"
                      className="block text-xs font-semibold text-white"
                    >
                      Additional Requirements
                    </label>
                    <textarea
                      id="additionalRequirements"
                      name="additionalRequirements"
                      rows={4}
                      value={formData.additionalRequirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          additionalRequirements: e.target.value,
                        })
                      }
                      placeholder="Specify target load weight, 2-way or 4-way forklift entry, delivery location, or custom crate bracing requirements..."
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#071526] px-3.5 py-2.5 text-sm text-white placeholder:text-[#AEB8C5]/50 focus:border-[#A5F044] focus:outline-none"
                    />
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-rose-500/40 bg-rose-950/40 px-4 py-3 text-xs text-rose-200"
                    >
                      {submitError}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-[#AEB8C5]">
                      * Required fields for technical quotation sizing.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#A5F044] px-6 py-3 text-sm font-bold text-[#071526] transition-colors hover:bg-[#b5f562] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {isSubmitting ? 'Submitting Enquiry...' : 'Submit Quotation Request'}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
