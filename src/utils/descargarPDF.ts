import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const handleDownloadInvoice = async ({ id }: { id: string }) => {
    const element = document.getElementById("invoice"); // el contenedor que quieres exportar
    console.log({ element });
    if (!element) return;

    // Convertir HTML a canvas
    const canvas = await html2canvas(element, {
        scale: 2, // mejora resolución
        useCORS: true // si hay imágenes externas
    });

    const imgData = canvas.toDataURL("image/png");

    // Crear PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    console.log({ pdf });


    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`factura_${id}.pdf`);
};
