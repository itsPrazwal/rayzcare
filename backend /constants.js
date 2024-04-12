// Document ids which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_IDS = [
  "settingsSeo",
  "settingsFooter",
  "teamPage",
  "locationPage",
  "home",
];

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_TYPES = ["media.tag"];

// References to include in 'internal' links
export const PAGE_REFERENCES = [
  { type: "page" },
  { type: "service" },
  { type: "team" },
  { type: "teamPage" },
  { type: "locationPage" }
];

// Prevent duplicates in the root pane
export const DOCUMENT_TYPES_IN_STRUCTURE = [
  "media.tag",
  "home",
  "expertise",
  "page",
  "service",
  "team",
  "teamPage",
  "location",
  "locationPage",
  "settings",
  "settingsSeo",
];

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = "2021-08-31";
