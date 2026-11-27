export const companyInfo = {
  name: "Davidson Well Drilling, Inc.",
  shortName: "DAVIDSON",
  subtitle: "WELL DRILLING",
  established: "1973",
  phoneDisplay: "(706) 754-6033",
  phoneHref: "tel:+17067546033",
  serviceRegions: ["Northeast Georgia", "Upstate South Carolina"],
  serviceRegionSummary: "Northeast Georgia & Upstate South Carolina",
  coreServicesList: [
    "Fresh Water Well Drilling",
    "Water Pumps",
    "Pump Service",
    "Hydrofracturing",
    "Geothermal Ground Loop Installation",
    "Vertical Ground Loop Drilling",
    "Downhole Installation",
  ],
};

export const primaryNavLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "About Us", to: "/about-us" },
  { label: "Our Work", to: "/our-work" },
  { label: "FAQs", to: "/faqs" },
];

export const serviceDropdownItems = [
  {
    number: "01",
    label: "Water Well Drilling",
    to: "/services#water-well-drilling",
    slug: "water-well-drilling",
  },
  {
    number: "02",
    label: "Hydrofracturing",
    to: "/services#hydrofracturing",
    slug: "hydrofracturing",
  },
  {
    number: "03",
    label: "Geothermal Ground Loop System",
    to: "/services#geothermal-ground-loop-system",
    slug: "geothermal-ground-loop-system",
  },
  {
    number: "04",
    label: "Vertical Ground Loop Drilling",
    to: "/services#vertical-ground-loop-drilling",
    slug: "vertical-ground-loop-drilling",
  },
  {
    number: "05",
    label: "Downhole Installation",
    to: "/services#downhole-installation",
    slug: "downhole-installation",
  },
];
