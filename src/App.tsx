import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

// Image Tools
import CompressImage from "./pages/tools/image/CompressImage";
import ResizeImage from "./pages/tools/image/ResizeImage";
import RotateImage from "./pages/tools/image/RotateImage";
import FlipImage from "./pages/tools/image/FlipImage";
import CropImage from "./pages/tools/image/CropImage";
import PngToJpg from "./pages/tools/image/PngToJpg";
import JpgToPng from "./pages/tools/image/JpgToPng";
import ImageToWebp from "./pages/tools/image/ImageToWebp";
import ColorPicker from "./pages/tools/image/ColorPicker";
import ImageToBase64 from "./pages/tools/image/ImageToBase64";

// Calculator Tools
import BMICalculator from "./pages/tools/calculators/BMICalculator";
import AgeCalculator from "./pages/tools/calculators/AgeCalculator";
import PercentageCalculator from "./pages/tools/calculators/PercentageCalculator";
import LoanCalculator from "./pages/tools/calculators/LoanCalculator";
import TimeDifference from "./pages/tools/calculators/TimeDifference";
import UnitConverter from "./pages/tools/calculators/UnitConverter";
import TipCalculator from "./pages/tools/calculators/TipCalculator";
import DiscountCalculator from "./pages/tools/calculators/DiscountCalculator";
import FuelCalculator from "./pages/tools/calculators/FuelCalculator";
import SalaryCalculator from "./pages/tools/calculators/SalaryCalculator";
import CalorieCalculator from "./pages/tools/calculators/CalorieCalculator";
import GPACalculator from "./pages/tools/calculators/GPACalculator";
import MortgageCalculator from "./pages/tools/calculators/MortgageCalculator";
import InvestmentCalculator from "./pages/tools/calculators/InvestmentCalculator";
import CurrencyConverter from "./pages/tools/calculators/CurrencyConverter";
import TaxCalculator from "./pages/tools/calculators/TaxCalculator";
import ROICalculator from "./pages/tools/calculators/ROICalculator";
import ProfitMarginCalculator from "./pages/tools/calculators/ProfitMarginCalculator";
import BreakEvenCalculator from "./pages/tools/calculators/BreakEvenCalculator";
import BodyFatCalculator from "./pages/tools/calculators/BodyFatCalculator";
import IdealWeightCalculator from "./pages/tools/calculators/IdealWeightCalculator";
import WaterIntakeCalculator from "./pages/tools/calculators/WaterIntakeCalculator";
import MacroCalculator from "./pages/tools/calculators/MacroCalculator";
import RetirementCalculator from "./pages/tools/calculators/RetirementCalculator";

// Generator Tools
import PasswordGenerator from "./pages/tools/generators/PasswordGenerator";
import UUIDGenerator from "./pages/tools/generators/UUIDGenerator";
import RandomNumber from "./pages/tools/generators/RandomNumber";
import LoremIpsum from "./pages/tools/generators/LoremIpsum";
import QRGenerator from "./pages/tools/generators/QRGenerator";
import FakeName from "./pages/tools/generators/FakeName";
import UsernameGenerator from "./pages/tools/generators/UsernameGenerator";
import HashtagGenerator from "./pages/tools/generators/HashtagGenerator";
import SloganGenerator from "./pages/tools/generators/SloganGenerator";
import BioGenerator from "./pages/tools/generators/BioGenerator";

// Text Tools
import WordCounter from "./pages/tools/text/WordCounter";
import CharacterCounter from "./pages/tools/text/CharacterCounter";
import RemoveSpaces from "./pages/tools/text/RemoveSpaces";
import TextCase from "./pages/tools/text/TextCase";
import ReverseText from "./pages/tools/text/ReverseText";
import ReadingTime from "./pages/tools/text/ReadingTime";
import TextDiff from "./pages/tools/text/TextDiff";
import KeywordDensity from "./pages/tools/text/KeywordDensity";
import TextSorter from "./pages/tools/text/TextSorter";
import RemoveDuplicates from "./pages/tools/text/RemoveDuplicates";
import LineNumbering from "./pages/tools/text/LineNumbering";
import EmailExtractor from "./pages/tools/text/EmailExtractor";
import FindReplace from "./pages/tools/text/FindReplace";

// Developer Tools
import JSONFormatter from "./pages/tools/developer/JSONFormatter";
import Base64Encoder from "./pages/tools/developer/Base64Encoder";
import URLEncoder from "./pages/tools/developer/URLEncoder";
import XMLFormatter from "./pages/tools/developer/XMLFormatter";
import SQLFormatter from "./pages/tools/developer/SQLFormatter";
import CSSMinifier from "./pages/tools/developer/CSSMinifier";
import JSMinifier from "./pages/tools/developer/JSMinifier";
import HTMLMinifier from "./pages/tools/developer/HTMLMinifier";
import HashGenerator from "./pages/tools/developer/HashGenerator";
import JWTDecoder from "./pages/tools/developer/JWTDecoder";
import CSVToJSON from "./pages/tools/developer/CSVToJSON";
import JSONToCSV from "./pages/tools/developer/JSONToCSV";

// PDF Tools
import MergePDF from "./pages/tools/pdf/MergePDF";
import SplitPDF from "./pages/tools/pdf/SplitPDF";
import CompressPDF from "./pages/tools/pdf/CompressPDF";
import RotatePDF from "./pages/tools/pdf/RotatePDF";
import JPGToPDF from "./pages/tools/pdf/JPGToPDF";
import ProtectPDF from "./pages/tools/pdf/ProtectPDF";
import AddPageNumbers from "./pages/tools/pdf/AddPageNumbers";

// Legal & Help
import AboutUs from "./pages/legal/AboutUs";
import Contact from "./pages/legal/Contact";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";

import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Image Tools */}
            <Route path="/tool/compress-image" element={<CompressImage />} />
            <Route path="/tool/resize-image" element={<ResizeImage />} />
            <Route path="/tool/rotate-image" element={<RotateImage />} />
            <Route path="/tool/flip-image" element={<FlipImage />} />
            <Route path="/tool/crop-image" element={<CropImage />} />
            <Route path="/tool/png-to-jpg" element={<PngToJpg />} />
            <Route path="/tool/jpg-to-png" element={<JpgToPng />} />
            <Route path="/tool/image-to-webp" element={<ImageToWebp />} />
            <Route path="/tool/color-picker" element={<ColorPicker />} />
            <Route path="/tool/image-to-base64" element={<ImageToBase64 />} />

            {/* Calculator Tools */}
            <Route path="/tool/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tool/age-calculator" element={<AgeCalculator />} />
            <Route
              path="/tool/percentage-calculator"
              element={<PercentageCalculator />}
            />
            <Route path="/tool/loan-calculator" element={<LoanCalculator />} />
            <Route path="/tool/time-difference" element={<TimeDifference />} />
            <Route path="/tool/unit-converter" element={<UnitConverter />} />
            <Route path="/tool/tip-calculator" element={<TipCalculator />} />
            <Route
              path="/tool/discount-calculator"
              element={<DiscountCalculator />}
            />
            <Route path="/tool/fuel-calculator" element={<FuelCalculator />} />
            <Route
              path="/tool/salary-calculator"
              element={<SalaryCalculator />}
            />
            <Route
              path="/tool/calorie-calculator"
              element={<CalorieCalculator />}
            />
            <Route path="/tool/gpa-calculator" element={<GPACalculator />} />
            <Route
              path="/tool/mortgage-calculator"
              element={<MortgageCalculator />}
            />
            <Route
              path="/tool/investment-calculator"
              element={<InvestmentCalculator />}
            />
            <Route
              path="/tool/currency-converter"
              element={<CurrencyConverter />}
            />
            <Route path="/tool/tax-calculator" element={<TaxCalculator />} />
            <Route path="/tool/roi-calculator" element={<ROICalculator />} />
            <Route
              path="/tool/profit-margin-calculator"
              element={<ProfitMarginCalculator />}
            />
            <Route
              path="/tool/break-even-calculator"
              element={<BreakEvenCalculator />}
            />
            <Route
              path="/tool/body-fat-calculator"
              element={<BodyFatCalculator />}
            />
            <Route
              path="/tool/ideal-weight-calculator"
              element={<IdealWeightCalculator />}
            />
            <Route
              path="/tool/water-intake-calculator"
              element={<WaterIntakeCalculator />}
            />
            <Route
              path="/tool/macro-calculator"
              element={<MacroCalculator />}
            />
            <Route
              path="/tool/retirement-calculator"
              element={<RetirementCalculator />}
            />

            {/* Generator Tools */}
            <Route
              path="/tool/password-generator"
              element={<PasswordGenerator />}
            />
            <Route path="/tool/uuid-generator" element={<UUIDGenerator />} />
            <Route path="/tool/random-number" element={<RandomNumber />} />
            <Route path="/tool/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/tool/qr-generator" element={<QRGenerator />} />
            <Route path="/tool/fake-name" element={<FakeName />} />
            <Route
              path="/tool/username-generator"
              element={<UsernameGenerator />}
            />
            <Route
              path="/tool/hashtag-generator"
              element={<HashtagGenerator />}
            />
            <Route
              path="/tool/slogan-generator"
              element={<SloganGenerator />}
            />
            <Route path="/tool/bio-generator" element={<BioGenerator />} />

            {/* Text Tools */}
            <Route path="/tool/word-counter" element={<WordCounter />} />
            <Route
              path="/tool/character-counter"
              element={<CharacterCounter />}
            />
            <Route path="/tool/remove-spaces" element={<RemoveSpaces />} />
            <Route path="/tool/text-case" element={<TextCase />} />
            <Route path="/tool/reverse-text" element={<ReverseText />} />
            <Route path="/tool/reading-time" element={<ReadingTime />} />
            <Route path="/tool/text-diff" element={<TextDiff />} />
            <Route path="/tool/keyword-density" element={<KeywordDensity />} />
            <Route path="/tool/text-sorter" element={<TextSorter />} />
            <Route
              path="/tool/remove-duplicates"
              element={<RemoveDuplicates />}
            />
            <Route path="/tool/line-numbering" element={<LineNumbering />} />
            <Route path="/tool/email-extractor" element={<EmailExtractor />} />
            <Route path="/tool/find-replace" element={<FindReplace />} />

            {/* Developer Tools */}
            <Route path="/tool/json-formatter" element={<JSONFormatter />} />
            <Route path="/tool/base64-encode" element={<Base64Encoder />} />
            <Route path="/tool/url-encoder" element={<URLEncoder />} />
            <Route path="/tool/xml-formatter" element={<XMLFormatter />} />
            <Route path="/tool/sql-formatter" element={<SQLFormatter />} />
            <Route path="/tool/css-minifier" element={<CSSMinifier />} />
            <Route path="/tool/js-minifier" element={<JSMinifier />} />
            <Route path="/tool/html-minifier" element={<HTMLMinifier />} />
            <Route path="/tool/hash-generator" element={<HashGenerator />} />
            <Route path="/tool/jwt-decoder" element={<JWTDecoder />} />
            <Route path="/tool/csv-to-json" element={<CSVToJSON />} />
            <Route path="/tool/json-to-csv" element={<JSONToCSV />} />

            {/* PDF Tools */}
            <Route path="/tool/merge-pdf" element={<MergePDF />} />
            <Route path="/tool/split-pdf" element={<SplitPDF />} />
            <Route path="/tool/compress-pdf" element={<CompressPDF />} />
            <Route path="/tool/rotate-pdf" element={<RotatePDF />} />
            <Route path="/tool/jpg-to-pdf" element={<JPGToPDF />} />
            <Route path="/tool/protect-pdf" element={<ProtectPDF />} />
            <Route path="/tool/add-page-numbers" element={<AddPageNumbers />} />

            {/* Legal & Help */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
