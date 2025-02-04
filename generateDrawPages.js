const fs = require("fs");
const path = require("path");

// Base directory for the "application" pages
const BASE_DIR = path.resolve(
  __dirname,
  "app",
  "dashboard",
  "loan",
  "[id]",
  "application"
);

// Draw links
const drawLinks = Array.from({ length: 9 }, (_, index) => {
  const drawNumber = index + 1;
  const drawString = `Draw ${drawNumber}`;
  return {
    key: drawString,
    route: `draw-${drawNumber}`,
    children: [
      { key: "Request Your Draw Form", route: `draw-${drawNumber}-request-your-draw-form`, component: "DrawForm" },
      { key: "Submit Your Draw Form", route: `draw-${drawNumber}-submit-your-draw-form`, component: "SubmitDrawForm" },
      { key: "Upload Invoices", route: `draw-${drawNumber}-upload-invoice`, component: "UploadInvoice" },
      { key: "Upload Additional Evidence (Optional)", route: `draw-${drawNumber}-upload-additional-evidence`, component: "UploadAdditionalEvidence" },
      { key: "Upload Lien Waiver", route: `draw-${drawNumber}-upload-lein-waiver`, component: "UploadLienWaiver" },
    ],
  };
});

// Ensure a directory exists
function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Write a page.tsx file with component content
function createPageFile(dir, component, drawNumber) {
  const filePath = path.join(dir, "page.tsx");
  const componentContent = `
import ${component} from "@/components/dashboard/loan/application/draw/${component.toLowerCase()}";

export default function Page() {
  return <div><${component} drawNumber="${drawNumber}" /></div>;
}`;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, componentContent, "utf-8");
  }
}

// Generate directories and page.tsx files
drawLinks.forEach((draw) => {
  const drawNumber = draw.key.split(" ")[1]; // Extract the draw number
  const drawDir = path.join(BASE_DIR, draw.route);
  ensureDirSync(drawDir);

  // Iterate over children to create directories and files
  draw.children.forEach((child) => {
    const childDir = path.join(drawDir, child.route);
    ensureDirSync(childDir);
    createPageFile(childDir, child.component, drawNumber);
  });
});

console.log("Draw directories and pages have been generated.");
