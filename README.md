# Sistema Farmacia - Web

Sistema de gestión farmacéutica migrado de Windows Forms (VB.NET) a una aplicación web moderna.

## Funcionalidades

### Dashboard
- Estadísticas en tiempo real (clientes, empleados, medicamentos, pedidos)
- Accesos rápidos a las operaciones más comunes
- Vista de pedidos recientes

### Gestión de Clientes
- Alta, baja, modificación y consulta
- Búsqueda por código, nombre o DNI
- Campos: nombre, sexo, tipo/número de documento, distrito, teléfono, dirección, RUC, fecha de nacimiento

### Gestión de Empleados
- CRUD completo con los mismos campos que clientes (sin RUC)
- Búsqueda y filtrado en tiempo real

### Gestión de Medicamentos
- CRUD con 6 relaciones: proveedor, línea farmacéutica, presentación, dosis, clasificación y tipo
- Control de precios unitario y por grupo
- Seguimiento de stock y vencimiento

### Sistema de Pedidos
- Búsqueda de cliente/empleado/producto por nombre (autocomplete)
- Detalle de pedido con cálculo automático de importes
- Cálculo de IGV (18%)
- Estados: Emitido, Cancelado, Anulado
- Visualización detallada de pedidos

### Reportes
- Exportación a impresión de los 4 módulos
- Formato profesional con encabezado y pie de página

## Datos Precargados

- **10 clientes** de Lima/Callao
- **10 empleados**
- **11 medicamentos** con diferentes presentaciones
- **43 distritos** de Lima y Callao
- Catálogos completos: proveedores, líneas farma, dosis, clasificaciones

## Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsive con variables CSS
- **JavaScript** - Lógica de aplicación vanilla
- **localStorage** - Persistencia de datos en el navegador

## Diseño

- Estética clínica farmacéutica (color primario: teal #0D9488)
- Tipografía: Space Grotesk (títulos) + DM Sans (cuerpo)
- Componentes modales para formularios
- Tablas con búsqueda y filtros
- Responsive (desktop, tablet, móvil)

## Ejecución

```bash
cd web
open index.html
```

No requiere servidor ni dependencias externas.

## Estructura

```
web/
├── index.html    → Estructura HTML principal
├── styles.css    → Estilos CSS con diseño farmacéutico
├── data.js       → Datos semilla y capa de persistencia
└── app.js        → Lógica de la aplicación (CRUD, pedidos, reportes)
```

## Migrado desde

Aplicación Windows Forms original en VB.NET con SQL Server y Crystal Reports.
