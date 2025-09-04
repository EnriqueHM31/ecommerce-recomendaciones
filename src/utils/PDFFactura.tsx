// utils/pdfGenerator.tsx
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import type { SessionDetails } from "../types/pago";
import { toast } from "sonner";

const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12, fontFamily: "Helvetica" },

    // Header
    headerBox: {
        backgroundColor: "#dcfce7", // verde claro
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#16a34a", // verde fuerte
        marginTop: 5,
    },
    subtitle: { fontSize: 12, marginTop: 4, color: "#374151" },

    // Secciones
    section: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 6,
    },
    sectionHeader: {
        backgroundColor: "#032b53",
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        padding: 6,
    },
    sectionBody: { padding: 8 },
    row: { flexDirection: "row", marginBottom: 4 },
    label: { fontWeight: "bold", width: 150 },
    value: { flex: 1 },

    // Tabla
    table: { display: "flex", width: "auto" },
    tableRow: { flexDirection: "row" },
    tableColHeader: {
        flex: 1,
        backgroundColor: "#032b53",
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        padding: 5,
    },
    tableCol: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#032b53",
        textAlign: "center",
        padding: 5,
    },
});

interface PdfFacturaProps {
    sessionDetails: SessionDetails | null;
}

export const PdfFactura: React.FC<PdfFacturaProps> = ({ sessionDetails }) => {

    if (!sessionDetails) {
        toast.error("No se encontró la factura");
        return
    }

    return (
        <Document>
            <Page style={styles.page}>
                {/* Header */}
                <View style={styles.headerBox}>
                    {/* Aquí podrías meter un SVG o un ícono ✅ si quieres */}
                    <Text style={styles.headerText}>¡Pago Exitoso!</Text>
                    <Text style={styles.subtitle}>
                        Tu transacción se ha procesado correctamente
                    </Text>
                </View>

                {/* Datos de transacción */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Detalles de la transacción</Text>
                    <View style={styles.sectionBody}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Nombre:</Text>
                            <Text style={styles.value}>{sessionDetails.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{sessionDetails.email}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Monto:</Text>
                            <Text style={styles.value}>
                                ${sessionDetails.amount} {sessionDetails.currency}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Fecha:</Text>
                            <Text style={styles.value}>{sessionDetails.date}</Text>
                        </View>
                    </View>
                </View>

                {/* Dirección */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Detalles de la dirección</Text>
                    <View style={styles.sectionBody}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Direccion 1:</Text>
                            <Text style={styles.value}>{sessionDetails.address.line1}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Direccion 2:</Text>
                            <Text style={styles.value}>{sessionDetails.address.line2}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Ciudad:</Text>
                            <Text style={styles.value}>{sessionDetails.address.city}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Estado:</Text>
                            <Text style={styles.value}>{sessionDetails.address.state}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Código Postal:</Text>
                            <Text style={styles.value}>{sessionDetails.address.postal_code}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>País:</Text>
                            <Text style={styles.value}>{sessionDetails.address.country}</Text>
                        </View>
                    </View>
                </View>

                {/* Tabla de productos */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Detalles de la transacción</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Producto</Text>
                            <Text style={styles.tableColHeader}>Cantidad</Text>
                            <Text style={styles.tableColHeader}>Precio Unitario</Text>
                            <Text style={styles.tableColHeader}>Total</Text>
                        </View>

                        {sessionDetails.lineItems.map((item) => (
                            <View style={styles.tableRow} key={item.id}>
                                <Text style={styles.tableCol}>{item.description}</Text>
                                <Text style={styles.tableCol}>{item.quantity}</Text>
                                <Text style={styles.tableCol}>
                                    ${(item.amount_total / item.quantity / 100).toFixed(2)}{" "}
                                    {item.currency}
                                </Text>
                                <Text style={styles.tableCol}>
                                    ${(item.amount_total / 100).toFixed(2)} {item.currency}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PdfFactura;
