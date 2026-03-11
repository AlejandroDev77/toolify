import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Image Tools
import CompressImage from './pages/tools/CompressImage';
import ResizeImage from './pages/tools/ResizeImage';
import RotateImage from './pages/tools/RotateImage';
import FlipImage from './pages/tools/FlipImage';
import CropImage from './pages/tools/CropImage';
import PngToJpg from './pages/tools/PngToJpg';
import JpgToPng from './pages/tools/JpgToPng';
import ImageToWebp from './pages/tools/ImageToWebp';
import ColorPicker from './pages/tools/ColorPicker';
import ImageToBase64 from './pages/tools/ImageToBase64';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
