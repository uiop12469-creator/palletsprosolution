export type ProductCategoryId = 'wooden-pallets' | 'plastic-pallets' | 'wooden-packing-boxes';

export type CameraAnglePreset = 'isometric' | 'top' | 'fork-entry' | 'low-profile';

export interface ProductSpecRow {
  label: string;
  value: string;
}

export interface ProductDetail {
  id: ProductCategoryId;
  indexLabel: string;
  name: string;
  shortTitle: string;
  tagline: string;
  description: string;
  structuralHighlights: string[];
  verifiedSpecs: ProductSpecRow[];
  interactionHint: string;
}

export interface IndustryItem {
  id: string;
  index: string;
  name: string;
  summary: string;
  recommendedSolutions: string;
}

export interface GalleryItem {
  id: string;
  category: ProductCategoryId | 'facility';
  categoryLabel: string;
  title: string;
  caption: string;
  presetAngle?: CameraAnglePreset;
  imageUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface VerifiedBusinessProfile {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsUrl: string;
  shareProfileUrl: string;
  regionLabel: string;
  formattedAddress?: string;
  contactNumbers?: string[];
  email?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  openingHours?: string[];
  isOpenNow?: boolean;
  rating?: number;
  userRatingCount?: number;
  googleMapsPlaceUri?: string;
  photos?: string[];
  loadedFromPlacesApi: boolean;
}

export interface QuoteFormData {
  customerName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  productCategory: string;
  requiredDimensions: string;
  quantity: string;
  additionalRequirements: string;
}
