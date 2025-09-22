import { BlobProvider } from "@react-pdf/renderer";
import type { CheckoutSession } from "../../types/session";
import PdfFactura from "./PDFFactura";

export const DownloadFacturaButton: React.FC<{ sessionDetails: CheckoutSession | null }> = ({ sessionDetails }) => {
    if (!sessionDetails) return null;

    return (
        <BlobProvider document={<PdfFactura sessionDetails={sessionDetails} />}>
            {({ url, loading }) =>
                loading ? (
                    <button
                        style={{
                            backgroundColor: "#16a34a",
                            color: "#fff",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        Generando PDF...
                    </button>
                ) : (
                    <a
                        href={url!}
                        download={`Factura_${sessionDetails.id}.pdf`}
                        style={{
                            backgroundColor: "#16a34a",
                            color: "#fff",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            textDecoration: "none",
                        }}
                    >
                        Descargar Factura
                    </a>
                )
            }
        </BlobProvider>
    );
};

export default DownloadFacturaButton;