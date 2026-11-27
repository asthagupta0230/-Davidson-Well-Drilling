import { useState } from "react";
import { CheckCircle2, Info, Paperclip } from "lucide-react";
import Button from "../common/Button.jsx";
import { companyInfo } from "../../data/navigation.js";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  serviceRequired: "",
  projectLocation: "",
  projectType: "Residential",
  projectDescription: "",
  preferredContact: "Phone",
  attachmentName: "",
};

export default function EstimateForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const nextErrors = {};
    if (!values.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.phone.trim()) {
      nextErrors.phone = "Please enter a phone number.";
    } else if (values.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!values.serviceRequired) {
      nextErrors.serviceRequired = "Please select a service.";
    }
    if (!values.projectLocation.trim()) {
      nextErrors.projectLocation =
        "Please enter your city, county, or state (NE Georgia / Upstate SC).";
    }
    if (!values.projectDescription.trim()) {
      nextErrors.projectDescription =
        "Please share a brief description of your project.";
    }
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setValues((prev) => ({
      ...prev,
      attachmentName: file ? file.name : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    // Structured payload ready for backend/API integration
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedData({ ...values });
    }, 500);
  };

  if (submittedData) {
    return (
      <div className="rounded-[14px] border border-[#03AFF7]/40 bg-[#F2F8FC] p-8 sm:p-10">
        <div className="flex items-center gap-3 text-[#008FCB]">
          <CheckCircle2 size={26} />
          <span className="text-xs font-extrabold tracking-[0.14em] uppercase">
            ESTIMATE INQUIRY PREPARED
          </span>
        </div>

        <h3 className="mt-4 font-heading text-2xl font-extrabold text-[#102A40]">
          Thank you, {submittedData.fullName}.
        </h3>

        <p className="mt-3 text-sm leading-[1.8] text-[#142B3D]/85">
          Your inquiry details for{" "}
          <strong className="text-[#102A40]">
            {submittedData.serviceRequired}
          </strong>{" "}
          in{" "}
          <strong className="text-[#102A40]">
            {submittedData.projectLocation}
          </strong>{" "}
          have been validated and recorded locally in this preview.
        </p>

        <div className="mt-5 flex items-start gap-2.5 rounded-[8px] border border-[#008FCB]/25 bg-white p-4 text-xs leading-relaxed text-[#142B3D]/85">
          <Info size={16} className="mt-0.5 shrink-0 text-[#008FCB]" />
          <span>
            <strong>Integration Notice:</strong> No live email or server
            endpoint is connected to this frontend build yet. To speak with
            Davidson Well Drilling, Inc. immediately, please call{" "}
            <a
              href={companyInfo.phoneHref}
              className="font-bold text-[#008FCB] underline"
            >
              {companyInfo.phoneDisplay}
            </a>
            .
          </span>
        </div>

        <div className="mt-7">
          <Button
            type="button"
            variant="outline"
            showArrow={false}
            onClick={() => {
              setSubmittedData(null);
              setValues(initialValues);
            }}
          >
            Edit or Start Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-[8px] border border-[#102A40]/15 bg-[#F2F8FC]/60 px-4 py-3 text-sm text-[#102A40] placeholder:text-[#102A40]/40 focus:border-[#03AFF7] focus:bg-white focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 border-t-2 border-[#03AFF7] pt-8"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase"
          >
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={values.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs font-semibold text-[#008FCB]">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase"
          >
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={values.phone}
            onChange={handleChange}
            placeholder="(706) 555-0100"
            className={inputClass}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-semibold text-[#008FCB]">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase"
          >
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-semibold text-[#008FCB]">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="serviceRequired"
            className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase"
          >
            Service Required *
          </label>
          <select
            id="serviceRequired"
            name="serviceRequired"
            required
            value={values.serviceRequired}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a service...</option>
            {companyInfo.coreServicesList.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
          {errors.serviceRequired && (
            <p className="mt-1.5 text-xs font-semibold text-[#008FCB]">
              {errors.serviceRequired}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="projectLocation"
            className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase"
          >
            Project Location *
          </label>
          <input
            id="projectLocation"
            name="projectLocation"
            type="text"
            required
            value={values.projectLocation}
            onChange={handleChange}
            placeholder="City / County (NE Georgia or Upstate SC)"
            className={inputClass}
          />
          {errors.projectLocation && (
            <p className="mt-1.5 text-xs font-semibold text-[#008FCB]">
              {errors.projectLocation}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="projectType"
            className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase"
          >
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Residential">Residential Property</option>
            <option value="Commercial / Agricultural">
              Commercial / Agricultural
            </option>
            <option value="New Construction">New Construction</option>
            <option value="Existing Well / Pump Service">
              Existing Well / Pump Service
            </option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="projectDescription"
          className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase"
        >
          Project Description *
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows={4}
          required
          value={values.projectDescription}
          onChange={handleChange}
          placeholder="Tell us about your site, well, pump, or geothermal ground loop needs..."
          className={inputClass}
        />
        {errors.projectDescription && (
          <p className="mt-1.5 text-xs font-semibold text-[#008FCB]">
            {errors.projectDescription}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <span className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase">
            Preferred Contact Method
          </span>
          <div className="mt-2.5 flex items-center gap-4">
            {["Phone", "Email"].map((method) => (
              <label
                key={method}
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#102A40]"
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={method}
                  checked={values.preferredContact === method}
                  onChange={handleChange}
                  className="accent-[#03AFF7]"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="siteFile"
            className="block text-xs font-extrabold tracking-[0.06em] text-[#102A40] uppercase"
          >
            Optional Site Plan / Photo
          </label>
          <label
            htmlFor="siteFile"
            className="mt-2 flex cursor-pointer items-center gap-2 rounded-[8px] border border-dashed border-[#03AFF7]/60 bg-[#F2F8FC]/60 px-4 py-2.5 text-xs font-semibold text-[#008FCB] hover:bg-[#F2F8FC]"
          >
            <Paperclip size={14} />
            <span className="truncate">
              {values.attachmentName || "Attach site image or PDF (optional)"}
            </span>
          </label>
          <input
            id="siteFile"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? "Preparing Request..." : "Submit Estimate Request"}
        </Button>
      </div>
    </form>
  );
}
