import { BlobProvider } from "@react-pdf/renderer";
import PdfFactura from "../../utils/PDFFactura";
import type { SessionDetails } from "../../types/pago.d";

export const DownloadFacturaButton: React.FC<{ sessionDetails: SessionDetails | null }> = ({ sessionDetails }) => {
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