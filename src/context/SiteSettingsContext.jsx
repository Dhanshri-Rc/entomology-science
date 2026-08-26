import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";
import { siteInfo as fallbackSiteInfo } from "../data/siteData";

// Fallback values so the website still renders correctly if the API
// is temporarily unavailable. These mirror the values in siteData.js.
const FALLBACK_SETTINGS = {
  organizationName: fallbackSiteInfo?.name || "Entomology Science Association",
  email: fallbackSiteInfo?.email || "contact@entomologyscience.org",
  phone: fallbackSiteInfo?.phone || "+91 81098 09909",
  website: fallbackSiteInfo?.website || "www.entomologyscience.org",
  addressShort: fallbackSiteInfo?.addressShort || "New Delhi, Delhi, 110015",
  addressFull:
    fallbackSiteInfo?.address || fallbackSiteInfo?.addressShort || "New Delhi, Delhi, 110015",
  facebook: "https://www.facebook.com/EntomologyScienceAssoc/",
  instagram: "https://www.instagram.com/entomology_science_association/",
  x: "https://x.com/EntoSciAssoc",
};

const SiteSettingsContext = createContext({
  settings: FALLBACK_SETTINGS,
  siteInfo: {
    name: FALLBACK_SETTINGS.organizationName,
    email: FALLBACK_SETTINGS.email,
    phone: FALLBACK_SETTINGS.phone,
    website: FALLBACK_SETTINGS.website,
    addressShort: FALLBACK_SETTINGS.addressShort,
    address: FALLBACK_SETTINGS.addressFull,
  },
  socialLinks: {
    facebook: FALLBACK_SETTINGS.facebook,
    instagram: FALLBACK_SETTINGS.instagram,
    x: FALLBACK_SETTINGS.x,
  },
  loading: true,
  refresh: () => {},
});

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(FALLBACK_SETTINGS);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/settings");
      if (res?.data) {
        setSettings({ ...FALLBACK_SETTINGS, ...res.data });
      }
    } catch (error) {
      // Silently keep fallback values - the public site must never break
      // because the settings API is briefly unavailable.
      console.warn("Unable to load site settings, using fallback values.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const value = useMemo(() => {
    const siteInfoShape = {
      name: settings.organizationName,
      email: settings.email,
      phone: settings.phone,
      website: settings.website,
      addressShort: settings.addressShort,
      address: settings.addressFull,
    };

    const socialLinksShape = {
      facebook: settings.facebook,
      instagram: settings.instagram,
      x: settings.x,
    };

    return {
      settings,
      siteInfo: siteInfoShape,
      socialLinks: socialLinksShape,
      loading,
      refresh: load,
    };
  }, [settings, loading]);

  return (
    <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export default SiteSettingsContext;
