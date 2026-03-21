import { PDFDocument, rgb, degrees } from 'pdf-lib';

// Merge multiple PDFs into one
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

// Split PDF into individual pages
export async function splitPDF(file: File): Promise<Uint8Array[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pageCount = pdf.getPageCount();
  const splitPdfs: Uint8Array[] = [];

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save();
    splitPdfs.push(pdfBytes);
  }

  return splitPdfs;
}

// Compress PDF (reduce quality)
export async function compressPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Save with compression options
  return await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });
}

// Rotate PDF pages
export async function rotatePDF(file: File, rotation: 90 | 180 | 270): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page) => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + rotation));
  });

  return await pdf.save();
}

// Convert images to PDF
export async function imagesToPDF(files: File[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;

    if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else {
      continue;
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return await pdfDoc.save();
}

// Extract pages from PDF
export async function extractPDFPages(file: File, pageNumbers: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(pdf, pageNumbers);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
}

// Delete pages from PDF
export async function deletePDFPages(file: File, pageNumbers: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Sort in descending order to avoid index shifting
  const sortedPages = [...pageNumbers].sort((a, b) => b - a);
  
  sortedPages.forEach((pageNum) => {
    pdf.removePage(pageNum);
  });

  return await pdf.save();
}

// Add page numbers to PDF
export async function addPageNumbers(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page, index) => {
    page.drawText(`${index + 1}`, {
      x: page.getWidth() / 2 - 10,
      y: 20,
      size: 12,
      color: rgb(0, 0, 0),
    });
  });

  return await pdf.save();
}

// Protect PDF with password (Note: pdf-lib has limited password support)
export async function protectPDF(file: File, _password: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  // Note: pdf-lib doesn't support password protection in the browser
  // This is a placeholder - real password protection requires server-side processing
  return await pdf.save();
}

// Get PDF info
export async function getPDFInfo(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  return {
    pageCount: pdf.getPageCount(),
    title: pdf.getTitle() || 'Untitled',
    author: pdf.getAuthor() || 'Unknown',
    creator: pdf.getCreator() || 'Unknown',
    producer: pdf.getProducer() || 'Unknown',
  };
}
