import type {
  FaqItem,
  GalleryItem,
  IndustryItem,
  ProductDetail,
  VerifiedBusinessProfile,
} from '../types/packaging';

export const BUSINESS_BASE_PROFILE: VerifiedBusinessProfile = {
  name: 'Pallets Pro Solutions',
  coordinates: {
    lat: 28.4081717,
    lng: 77.5686575,
  },
  mapsUrl: 'https://maps.app.goo.gl/9qj59rHe35pQERJg9',
  shareProfileUrl: 'https://share.google/V94tv14KwvWu7h7BZ',
  regionLabel: 'Greater Noida, Uttar Pradesh, India',
  contactNumbers: ['+91 99539 42264', '+91 95803 13188'],
  email: 'palletsprosolutions2026@gmail.com',
  loadedFromPlacesApi: false,
};

export const HERO_CATEGORY_CARDS: {
  id: ProductDetail['id'];
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'wooden-pallets',
    title: 'Wooden Pallets',
    subtitle: '4-Way & 2-Way Timber Structures',
  },
  {
    id: 'plastic-pallets',
    title: 'Plastic Pallets',
    subtitle: 'Molded Industrial Handling Decks',
  },
  {
    id: 'wooden-packing-boxes',
    title: 'Wooden Packing Boxes',
    subtitle: 'Heavy-Duty Crates & Braced Enclosures',
  },
];

export const PRODUCTS_DATA: ProductDetail[] = [
  {
    id: 'wooden-pallets',
    indexLabel: '01',
    name: 'Wooden Pallets',
    shortTitle: 'Wooden Pallets',
    tagline: 'Engineered timber load platforms built for warehouse racking and freight transit.',
    description:
      'Constructed with spaced deck boards, reinforced stringer or block supports, and bottom runner boards to accommodate standard forklift and pallet-jack handling across manufacturing floors and dispatch bays.',
    structuralHighlights: [
      'Multi-board top deck with chamfered lead-in edges for smooth fork entry',
      'Heavy-duty block and runner undercarriage supporting stable stacking',
      'Custom deck dimensions and plank spacing configured to unit load geometry',
    ],
    verifiedSpecs: [
      { label: 'Primary Material', value: 'Industrial Timber' },
      { label: 'Handling Access', value: '2-Way & 4-Way Configurations (Custom)' },
      { label: 'Dimensional Sizing', value: 'Standard & Custom Built to Order' },
      { label: 'Treatment & Finish', value: 'Confirmed on Technical Enquiry' },
    ],
    interactionHint: 'Hover or move across the stage to inspect 3D perspective, or switch viewing angles below.',
  },
  {
    id: 'plastic-pallets',
    indexLabel: '02',
    name: 'Plastic Pallets',
    shortTitle: 'Plastic Pallets',
    tagline: 'Injection-molded industrial polymer decks designed for clean, repeatable logistics.',
    description:
      'Molded grid-deck architecture resists moisture absorption and splintering, providing consistent dimensional stability for closed-loop warehouse circulation, hygienic storage zones, and automated conveyors.',
    structuralHighlights: [
      'Perforated top grid deck for ventilation, drainage, and reduced tare weight',
      'Perimeter edge lip and textured surface geometry to reduce cargo shift',
      'Tapered structural legs and bottom runners for stable fork engagement',
    ],
    verifiedSpecs: [
      { label: 'Primary Material', value: 'Industrial Molded Polymer' },
      { label: 'Surface Geometry', value: 'Ventilated Grid Deck' },
      { label: 'Moisture Resistance', value: 'Non-Absorbent Washable Surface' },
      { label: 'Sizing & Load Class', value: 'Confirmed on Technical Enquiry' },
    ],
    interactionHint: 'Hover over the pallet to tilt in 3D perspective, or zoom in to inspect the molded grid.',
  },
  {
    id: 'wooden-packing-boxes',
    indexLabel: '03',
    name: 'Wooden Packing Boxes',
    shortTitle: 'Wooden Packing Boxes',
    tagline: 'Structural timber-and-panel crating built to protect machinery and industrial cargo.',
    description:
      'Assembled on an integrated palletized skid base with framed side panels, diagonal shear bracing, top closure lid, and metallic corner reinforcement brackets for rigid protection during road, sea, or air transit.',
    structuralHighlights: [
      'Integrated forklift skid foundation for safe crane or forklift lifting',
      'Framed side panels with diagonal bracing to resist lateral racking loads',
      'Corner brackets and secure top lid closure for heavy industrial equipment',
    ],
    verifiedSpecs: [
      { label: 'Construction', value: 'Timber Frame & Structural Panels' },
      { label: 'Base Architecture', value: 'Integrated Forklift Skid Platform' },
      { label: 'Reinforcement', value: 'Diagonal Bracing & Corner Hardware' },
      { label: 'Compliance & Sizing', value: 'Built to Cargo & Transit Enquiry' },
    ],
    interactionHint: 'Toggle Structural Breakdown or adjust viewing angles to inspect brackets and skid base.',
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'manufacturing',
    index: '01',
    name: 'Industrial Manufacturing',
    summary:
      'Palletized raw material staging, work-in-progress handling, and heavy component dispatch across factory lines.',
    recommendedSolutions: 'Wooden Pallets · Wooden Packing Boxes',
  },
  {
    id: 'warehousing',
    index: '02',
    name: 'Warehousing & Logistics',
    summary:
      'Consistent deck footprints for selective pallet racking, dock-to-dock freight consolidation, and forklift operations.',
    recommendedSolutions: 'Wooden Pallets · Plastic Pallets',
  },
  {
    id: 'automotive',
    index: '03',
    name: 'Automotive & Engineering',
    summary:
      'Rigid containment for machined assemblies, spare parts, dies, and sub-assemblies requiring edge and shock protection.',
    recommendedSolutions: 'Wooden Packing Boxes · Heavy Timber Pallets',
  },
  {
    id: 'electrical',
    index: '04',
    name: 'Cables & Electrical Equipment',
    summary:
      'Heavy-duty wooden packaging, cable drums, and braced crates engineered for industrial switchgear, transformers, and reels.',
    recommendedSolutions: 'Wooden Packing Boxes · Custom Timber Packaging',
  },
  {
    id: 'fmcg-pharma',
    index: '05',
    name: 'FMCG, Food & Pharma Storage',
    summary:
      'Washable, splinter-free plastic pallet decks suited for cleanroom staging, cold rooms, and high-turnover distribution.',
    recommendedSolutions: 'Plastic Pallets',
  },
  {
    id: 'export-cargo',
    index: '06',
    name: 'Export & Project Freight',
    summary:
      'Custom-dimensioned wooden crates and pallet bases tailored around consignment dimensions and container stowage.',
    recommendedSolutions: 'Wooden Packing Boxes · Custom Pallets',
  },
];

export const WHY_CHOOSE_US_PILLARS = [
  {
    index: '01',
    title: 'Dimension-First Fabrication',
    description:
      'Every pallet footprint, deck board spacing, and crate panel layout can be tailored directly to your cargo dimensions and handling equipment.',
  },
  {
    index: '02',
    title: 'Timber & Polymer Versatility',
    description:
      'Source heavy-duty wooden pallets, structural wooden packing boxes, and molded plastic pallets through a single B2B supply partner.',
  },
  {
    index: '03',
    title: 'Greater Noida Industrial Hub Access',
    description:
      'Positioned in Greater Noida, Uttar Pradesh, supporting manufacturing plants, warehouses, and logistics corridors across NCR and beyond.',
  },
  {
    index: '04',
    title: 'Transparent Quotation Workflow',
    description:
      'Share your required dimensions, quantity, and cargo profile to receive direct sizing confirmation and commercial pricing without guesswork.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-warehouse-hero',
    category: 'facility',
    categoryLabel: 'Product Lineup',
    title: 'Complete Industrial Packaging Range',
    caption: 'Wooden pallets, blue industrial plastic pallets, and reinforced wooden packing boxes.',
    imageUrl: '/assets/products/hero-lineup.png',
  },
  {
    id: 'gal-wood-iso',
    category: 'wooden-pallets',
    categoryLabel: 'Wooden Pallets',
    title: '4-Way Block Timber Pallet',
    caption: 'Photorealistic studio angle showing spaced timber deck boards and block base.',
    presetAngle: 'isometric',
  },
  {
    id: 'gal-plastic-iso',
    category: 'plastic-pallets',
    categoryLabel: 'Plastic Pallets',
    title: 'Industrial Blue Polymer Pallet',
    caption: 'Three-quarter studio render highlighting reinforced structural runners.',
    presetAngle: 'isometric',
  },
  {
    id: 'gal-crate-assembled',
    category: 'wooden-packing-boxes',
    categoryLabel: 'Wooden Packing Boxes',
    title: 'Braced Export Packing Crate',
    caption: 'Timber batten framing, galvanized steel corner brackets, and palletized skid base.',
    presetAngle: 'isometric',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-custom-sizes',
    question: 'Can Pallets Pro Solutions manufacture custom pallet and crate dimensions?',
    answer:
      'Yes. Use the quotation form below to specify your exact length, width, height, and cargo weight requirements. Our team confirms structural layout and pricing based on your consignment specifications.',
  },
  {
    id: 'faq-moq',
    question: 'Do you handle both bulk commercial orders and project-specific crating?',
    answer:
      'Yes. We support recurring B2B pallet procurement as well as project-specific wooden packing boxes for machinery, industrial equipment, and freight shipments.',
  },
  {
    id: 'faq-wood-vs-plastic',
    question: 'How should I choose between wooden pallets and plastic pallets?',
    answer:
      'Wooden pallets offer strong load adaptability and customizable footprints for general manufacturing and outbound freight. Plastic pallets are ideal for moisture-sensitive environments, hygienic storage, and closed-loop warehouse circulation.',
  },
  {
    id: 'faq-quote-info',
    question: 'What details help you prepare an accurate quotation fastest?',
    answer:
      'Include the product category, target external or internal dimensions, estimated order quantity, expected load weight, and your delivery location in the Additional Requirements field.',
  },
  {
    id: 'faq-location',
    question: 'Where is Pallets Pro Solutions located?',
    answer:
      'Pallets Pro Solutions operates in Greater Noida, Uttar Pradesh, India (28.4081717, 77.5686575). You can view our verified Google Business Profile and map location directly in the Contact Us section below.',
  },
];
