import { PDFDownloadLink } from "@react-pdf/renderer";
import type { SessionDetails } from "../../types/pago.d";
import PdfFactura from "../../utils/PDFFactura";

export const DownloadFacturaButton: React.FC<{ sessionDetails: SessionDetails | null }> = ({ sessionDetails }) => {
    if (!sessionDetails) return null;

    return (
        <PDFDownloadLink
            document={<PdfFactura sessionDetails={sessionDetails} />}
            fileName={`Factura_${sessionDetails.id}.pdf`}
            style={{
                backgroundColor: "#16a34a",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "8px",
                fontWeight: "bold",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                textDecoration: "none",
            }}
        >
            {({ loading }) => (loading ? "Generando PDF..." : "Descargar Factura")}
        </PDFDownloadLink>
    );
};




export default DownloadFacturaButton; 