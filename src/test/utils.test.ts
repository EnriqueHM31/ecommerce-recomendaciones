import { describe, it, expect } from 'vitest';
import {
    formatearPrecio,
    formatearPrecio2,
    formatearFecha,
    tranformarStatus,
    colorStatus,
    shuffleArray
} from '..@/utils/formateo';
import { mapProductos } from '../adapters/productos';
import type { ProductoRaw } from '../types/productos';

describe('Utility Functions', () => {
    describe('formatearPrecio', () => {
        it('should format price in USD by default', () => {
            expect(formatearPrecio(1000)).toMatch(/USD\s+1,000\.00/);
            expect(formatearPrecio(999.99)).toMatch(/USD\s+999\.99/);
            expect(formatearPrecio(0)).toMatch(/USD\s+0\.00/);
        });

        it('should format price in specified currency', () => {
            expect(formatearPrecio(1000, 'USD')).toMatch(/USD\s+1,000\.00/);
            expect(formatearPrecio(1000, 'EUR')).toMatch(/EUR\s+1,000\.00/);
            expect(formatearPrecio(1000, 'MXN')).toMatch(/\$1,000\.00/);
        });

        it('should handle decimal places correctly', () => {
            expect(formatearPrecio(1234.567)).toMatch(/USD\s+1,234\.57/);
            expect(formatearPrecio(0.1)).toMatch(/USD\s+0\.10/);
        });
    });

    describe('formatearPrecio2', () => {
        it('should format price in MXN with no decimal places', () => {
            expect(formatearPrecio2(100000)).toBe('$1,000'); // 100000 / 100 = 1000
            expect(formatearPrecio2(99999)).toBe('$1,000'); // 99999 / 100 = 999.99 -> 1000
            expect(formatearPrecio2(0)).toBe('$0');
        });

        it('should handle different currencies', () => {
            expect(formatearPrecio2(100000, 'USD')).toMatch(/USD\s+1,000/);
            expect(formatearPrecio2(100000, 'EUR')).toMatch(/EUR\s+1,000/);
        });
    });

    describe('formatearFecha', () => {
        it('should format timestamp to Mexican date format', () => {
            const timestamp = 1640995200; // January 1, 2022 00:00:00 UTC
            const result = formatearFecha(timestamp);

            // Should contain year, month, day, hour, and minute
            expect(result).toMatch(/\d{4}/); // year
            expect(result).toMatch(/\d{1,2}:\d{2}/); // time format
        });

        it('should handle different timestamps', () => {
            const timestamp1 = 1609459200; // January 1, 2021
            const timestamp2 = 1672531200; // January 1, 2023

            const result1 = formatearFecha(timestamp1);
            const result2 = formatearFecha(timestamp2);

            expect(result1).not.toBe(result2);
            expect(result1).toMatch(/enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/);
        });
    });

    describe('tranformarStatus', () => {
        it('should transform payment status to Spanish', () => {
            expect(tranformarStatus('paid')).toBe('Pagado');
            expect(tranformarStatus('canceled')).toBe('Cancelado');
            expect(tranformarStatus('failed')).toBe('Fallido');
            expect(tranformarStatus('unknown')).toBe('Enviado');
        });

        it('should handle case sensitivity', () => {
            expect(tranformarStatus('PAID')).toBe('Enviado');
            expect(tranformarStatus('Paid')).toBe('Enviado');
        });
    });

    describe('colorStatus', () => {
        it('should return correct CSS classes for each status', () => {
            expect(colorStatus('paid')).toBe('text-green-700 border-green-200');
            expect(colorStatus('canceled')).toBe('text-red-700 border-red-200');
            expect(colorStatus('failed')).toBe('text-yellow-700 border-yellow-200');
            expect(colorStatus('unknown')).toBe('text-blue-700 border-blue-200');
        });

        it('should handle case sensitivity', () => {
            expect(colorStatus('PAID')).toBe('text-blue-700 border-blue-200');
            expect(colorStatus('Paid')).toBe('text-blue-700 border-blue-200');
        });
    });

    describe('shuffleArray', () => {
        it('should return array with same length', () => {
            const original = [1, 2, 3, 4, 5];
            const shuffled = shuffleArray(original);

            expect(shuffled).toHaveLength(original.length);
        });

        it('should contain same elements', () => {
            const original = [1, 2, 3, 4, 5];
            const shuffled = shuffleArray(original);

            original.forEach(item => {
                expect(shuffled).toContain(item);
            });
        });

        it('should not modify original array', () => {
            const original = [1, 2, 3, 4, 5];
            const originalCopy = [...original];
            shuffleArray(original);

            expect(original).toEqual(originalCopy);
        });

        it('should handle empty array', () => {
            const shuffled = shuffleArray([]);
            expect(shuffled).toEqual([]);
        });

        it('should handle single element array', () => {
            const original = [42];
            const shuffled = shuffleArray(original);
            expect(shuffled).toEqual([42]);
        });

        it('should work with different data types', () => {
            const strings = ['a', 'b', 'c'];
            const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];

            const shuffledStrings = shuffleArray(strings);
            const shuffledObjects = shuffleArray(objects);

            expect(shuffledStrings).toHaveLength(3);
            expect(shuffledObjects).toHaveLength(3);
        });
    });
});

describe('Product Adapters', () => {
    describe('mapProductos', () => {
        const mockRawProduct: ProductoRaw = {
            id: 1,
            sku: 'TEST-001',
            precio: '999.99',
            stock: 10,
            imagen_url: 'https://example.com/test.jpg',
            productos_base: {
                id: 1,
                nombre: 'Test Product',
                descripcion: 'Test Description',
                marca: 'Test Brand',
                categorias: { nombre: 'Test Category' }
            },
            variantes: {
                id: 1,
                nombre_variante: 'Test Variant',
                procesador: 'Test Processor',
                display: 'Test Display',
                camara: 'Test Camera',
                bateria: 'Test Battery',
                conectividad: 'Test Connectivity',
                sistema_operativo: 'Test OS',
            },
            colores: { nombre: 'Test Color' },
            almacenamientos: { capacidad: '128GB' },
            especificaciones_ram: { tipo: 'DDR5', capacidad: '8GB' }
        };

        it('debería mapear el producto en bruto a Producto correctamente', () => {
            const result = mapProductos([mockRawProduct]);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: 1,
                producto_id: 1,
                producto: 'Test Variant',
                categoria: 'Test Category',
                precio_base: 999.99,
                imagen_url: 'https://example.com/test.jpg',
                descripcion: 'Test Description',
                marca: 'Test Brand',
                sku: 'TEST-001',
                stock: 10,
                procesador: 'Test Processor',
                ram_especificacion: 'DDR5',
                ram_variante: '8GB',
                display: 'Test Display',
                camara: 'Test Camera',
                sistema_operativo: 'Test OS',
                conectividad: 'Test Connectivity',
                bateria: 'Test Battery',
                almacenamiento: '128GB',
                color: 'Test Color',
                total_vendido: 0,
            });
        });

        it('should handle missing optional fields', () => {
            const incompleteRawProduct: ProductoRaw = {
                ...mockRawProduct,
                variantes: {
                    ...mockRawProduct.variantes,
                    conectividad: null,
                },
                especificaciones_ram: { tipo: 'N/A', capacidad: 'N/A' }
            };

            const result = mapProductos([incompleteRawProduct]);

            expect(result[0].conectividad).toBe('N/A');
            expect(result[0].ram_variante).toBe('N/A');
        });

        it('should handle multiple products', () => {
            const rawProducts = [mockRawProduct, { ...mockRawProduct, id: 2, sku: 'TEST-002' }];
            const result = mapProductos(rawProducts);

            expect(result).toHaveLength(2);
            expect(result[0].id).toBe(1);
            expect(result[1].id).toBe(2);
        });

        it('should handle empty array', () => {
            const result = mapProductos([]);
            expect(result).toEqual([]);
        });
    });
});
