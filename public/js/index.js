async function generateCertificate() {
  const name = document.getElementById("downloadBtn").value;
  const { degrees, PDFDocument, StandardFonts, rgb } = PDFLib;
  const url = "./res/cert.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText(name, {
    x: width / 2,
    y: 555,
    size: 23,
    font: helveticaFont,
    color: rgb(0.2, 0.84, 0.67),
    rotate: degrees(270),
  });

  const uri = await pdfDoc.saveAsBase64({ dataUri: true });
  const pdfBytes = await pdfDoc.save();

  download(pdfBytes, "Mindspark_Certificate.pdf", "application/pdf");
}
document.getElementById("downloadBtn").addEventListener("click", function () {
  generateCertificate();
});
