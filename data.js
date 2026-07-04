// Seed Data & Database Layer
const DB = {
    distritos: [
        { id: 'D001', nombre: 'Lima' },
        { id: 'D002', nombre: 'Ancon' },
        { id: 'D003', nombre: 'Ate' },
        { id: 'D004', nombre: 'Barranco' },
        { id: 'D005', nombre: 'Breña' },
        { id: 'D006', nombre: 'Carabayllo' },
        { id: 'D007', nombre: 'Chaclacayo' },
        { id: 'D008', nombre: 'Chorrillos' },
        { id: 'D009', nombre: 'Cieneguilla' },
        { id: 'D010', nombre: 'Comas' },
        { id: 'D011', nombre: 'El Agustino' },
        { id: 'D012', nombre: 'Independencia' },
        { id: 'D013', nombre: 'Jesus Maria' },
        { id: 'D014', nombre: 'La Molina' },
        { id: 'D015', nombre: 'La Victoria' },
        { id: 'D016', nombre: 'Lince' },
        { id: 'D017', nombre: 'Los Olivos' },
        { id: 'D018', nombre: 'Lurigancho' },
        { id: 'D019', nombre: 'Lurin' },
        { id: 'D020', nombre: 'Magdalena del Mar' },
        { id: 'D021', nombre: 'Miraflores' },
        { id: 'D022', nombre: 'Pachacamac' },
        { id: 'D023', nombre: 'Pueblo Libre' },
        { id: 'D024', nombre: 'Puente Piedra' },
        { id: 'D025', nombre: 'Punta Hermosa' },
        { id: 'D026', nombre: 'Punta Negra' },
        { id: 'D027', nombre: 'Rimac' },
        { id: 'D028', nombre: 'San Bartolo' },
        { id: 'D029', nombre: 'San Borja' },
        { id: 'D030', nombre: 'San Isidro' },
        { id: 'D031', nombre: 'San Martin de Porres' },
        { id: 'D032', nombre: 'San Miguel' },
        { id: 'D033', nombre: 'Santa Maria del Mar' },
        { id: 'D034', nombre: 'Santa Rosa' },
        { id: 'D035', nombre: 'Santiago de Surco' },
        { id: 'D036', nombre: 'Surquillo' },
        { id: 'D037', nombre: 'Villa El Salvador' },
        { id: 'D038', nombre: 'Villa Maria del Triunfo' },
        { id: 'D039', nombre: 'Callao' },
        { id: 'D040', nombre: 'Bellavista' },
        { id: 'D041', nombre: 'Carmen de la Legua' },
        { id: 'D042', nombre: 'La Perla' },
        { id: 'D043', nombre: 'La Punta' }
    ],

    identidades: [
        { id: 'I001', nombre: 'DNI' },
        { id: 'I002', nombre: 'Carnet de Extranjeria' },
        { id: 'I003', nombre: 'Pasaporte' },
        { id: 'I004', nombre: 'Partida de Nacimiento' }
    ],

    proveedores: [
        { id: 'P001', nombre: 'Quimica Suiza', direccion: 'Av. Industrial 123', telefono: '01-5551234', representante: 'Carlos Lopez' },
        { id: 'P002', nombre: 'Laboratorios Roche', direccion: 'Av. Javier Prado 456', telefono: '01-5555678', representante: 'Maria Garcia' },
        { id: 'P003', nombre: 'Bayer Peru', direccion: 'Av. La Marina 789', telefono: '01-5559012', representante: 'Juan Martinez' },
        { id: 'P004', nombre: 'Quimica Sherne', direccion: 'Av. Argentina 321', telefono: '01-5553456', representante: 'Ana Rodriguez' },
        { id: 'P005', nombre: 'Laboratorios Franklin', direccion: 'Av. Canada 654', telefono: '01-5557890', representante: 'Pedro Sanchez' },
        { id: 'P006', nombre: 'Industrias farmaceuticas Biotech', direccion: 'Av. Industrial 987', telefono: '01-5552345', representante: 'Laura Fernandez' },
        { id: 'P007', nombre: 'Droga Peruana', direccion: 'Av. Grau 147', telefono: '01-5556789', representante: 'Roberto Diaz' },
        { id: 'P008', nombre: 'Laboratorios AC Farma', direccion: 'Av. Aviacion 258', telefono: '01-5550123', representante: 'Sofia Torres' }
    ],

    lineasFarma: [
        { id: 'L001', nombre: 'Quimica Suiza' },
        { id: 'L002', nombre: 'Roche' },
        { id: 'L003', nombre: 'Bayer' },
        { id: 'L004', nombre: 'Sherne' }
    ],

    representaciones: [
        { id: 'R001', nombre: 'Tabletas' },
        { id: 'R002', nombre: 'Capsulas' },
        { id: 'R003', nombre: 'Jarabe' },
        { id: 'R004', nombre: 'Emulsion' },
        { id: 'R005', nombre: 'Crema' },
        { id: 'R006', nombre: 'Ampolla' }
    ],

    dosis: [
        { id: 'DS01', nombre: 'Gramos' },
        { id: 'DS02', nombre: 'Mililitros' },
        { id: 'DS03', nombre: 'Miligramos' },
        { id: 'DS04', nombre: 'Cms Cubicos' }
    ],

    clasificaciones: [
        { id: 'C001', nombre: 'Antibioticos' },
        { id: 'C002', nombre: 'Antigripales' },
        { id: 'C003', nombre: 'Jarabes' },
        { id: 'C004', nombre: 'Galenos' }
    ],

    tipos: [
        { id: 'T001', nombre: 'Farmaceuticos' },
        { id: 'T002', nombre: 'Tocador' },
        { id: 'T003', nombre: 'Bijouteria' }
    ]
};

// Default seed data for entities
const SEED_CLIENTES = [
    { cod: 'C0001', nombre: 'Juan Perez Garcia', sexo: 'Masculino', idTipo: 'I001', idNumero: '45123456', distrito: 'D021', telefono: '998877665', direccion: 'Av. Larco 123', ruc: '10451234567', fechaNac: '15/03/1985', fechaReg: '01/01/2024', estado: 1 },
    { cod: 'C0002', nombre: 'Maria Lopez Ramirez', sexo: 'Femenino', idTipo: 'I001', idNumero: '46234567', distrito: 'D035', telefono: '987654321', direccion: 'Calle Los Olivos 456', ruc: '10462345678', fechaNac: '22/07/1990', fechaReg: '01/01/2024', estado: 1 },
    { cod: 'C0003', nombre: 'Carlos Sanchez Torres', sexo: 'Masculino', idTipo: 'I001', idNumero: '47345678', distrito: 'D015', telefono: '976543210', direccion: 'Jr. Union 789', ruc: '10473456789', fechaNac: '10/11/1988', fechaReg: '15/01/2024', estado: 1 },
    { cod: 'C0004', nombre: 'Ana Rodriguez Diaz', sexo: 'Femenino', idTipo: 'I001', idNumero: '48456789', distrito: 'D013', telefono: '965432109', direccion: 'Av. Javier Prado 321', ruc: '10484567890', fechaNac: '05/06/1992', fechaReg: '15/01/2024', estado: 1 },
    { cod: 'C0005', nombre: 'Pedro Martinez Flores', sexo: 'Masculino', idTipo: 'I001', idNumero: '49567890', distrito: 'D030', telefono: '954321098', direccion: 'Calle San Isidro 654', ruc: '10495678901', fechaNac: '18/09/1987', fechaReg: '01/02/2024', estado: 1 },
    { cod: 'C0006', nombre: 'Laura Fernandez Vargas', sexo: 'Femenino', idTipo: 'I001', idNumero: '40678901', distrito: 'D029', telefono: '943210987', direccion: 'Av. San Borja 987', ruc: '10406789012', fechaNac: '25/12/1991', fechaReg: '01/02/2024', estado: 1 },
    { cod: 'C0007', nombre: 'Roberto Diaz Mendoza', sexo: 'Masculino', idTipo: 'I001', idNumero: '41789012', distrito: 'D027', telefono: '932109876',direccion: 'Calle Rimac 147', ruc: '10417890123', fechaNac: '30/04/1986', fechaReg: '15/02/2024', estado: 1 },
    { cod: 'C0008', nombre: 'Sofia Torres Castillo', sexo: 'Femenino', idTipo: 'I001', idNumero: '42890123', distrito: 'D032', telefono: '921098765', direccion: 'Av. San Miguel 258', ruc: '10428901234', fechaNac: '14/08/1993', fechaReg: '01/03/2024', estado: 1 },
    { cod: 'C0009', nombre: 'Miguel Angel Rivera', sexo: 'Masculino', idTipo: 'I001', idNumero: '43901234', distrito: 'D036', telefono: '910987654', direccion: 'Calle Surquillo 369', ruc: '10439012345', fechaNac: '02/02/1989', fechaReg: '01/03/2024', estado: 1 },
    { cod: 'C0010', nombre: 'Carmen Rosa Gutarra', sexo: 'Femenino', idTipo: 'I001', idNumero: '44012345', distrito: 'D037', telefono: '909876543', direccion: 'Av. Villa El Salvador 741', ruc: '10440123456', fechaNac: '19/10/1994', fechaReg: '15/03/2024', estado: 1 }
];

const SEED_EMPLEADOS = [
    { cod: 'E0001', nombre: 'Luis Alberto Hernandez', sexo: 'Masculino', idTipo: 'I001', idNumero: '30123456', distrito: 'D016', telefono: '991122334', direccion: 'Av. Gregorio Escobedo 100', fechaNac: '12/05/1980', fechaReg: '01/01/2024', estado: 1 },
    { cod: 'E0002', nombre: 'Rosa Maria Quispe', sexo: 'Femenino', idTipo: 'I001', idNumero: '31234567', distrito: 'D021', telefono: '982233445', direccion: 'Calle Belen 200', fechaNac: '28/11/1985', fechaReg: '01/01/2024', estado: 1 },
    { cod: 'E0003', nombre: 'Francisco Javier Ramos', sexo: 'Masculino', idTipo: 'I001', idNumero: '32345678', distrito: 'D015', telefono: '973344556', direccion: 'Jr. Carabaya 300', fechaNac: '08/03/1982', fechaReg: '15/01/2024', estado: 1 },
    { cod: 'E0004', nombre: 'Gloria Estela Montes', sexo: 'Femenino', idTipo: 'I001', idNumero: '33456789', distrito: 'D013', telefono: '964455667', direccion: 'Av. Salaverry 400', fechaNac: '17/07/1988', fechaReg: '15/01/2024', estado: 1 },
    { cod: 'E0005', nombre: 'Jorge Luis Aguilar', sexo: 'Masculino', idTipo: 'I001', idNumero: '34567890', distrito: 'D035', telefono: '955566778', direccion: 'Calle Santiago 500', fechaNac: '25/09/1983', fechaReg: '01/02/2024', estado: 1 },
    { cod: 'E0006', nombre: 'Patricia Lourdes Caceres', sexo: 'Femenino', idTipo: 'I001', idNumero: '35678901', distrito: 'D030', telefono: '946677889', direccion: 'Av. Republica de Panama 600', fechaNac: '03/01/1987', fechaReg: '01/02/2024', estado: 1 },
    { cod: 'E0007', nombre: 'Miguel Angel Vargas', sexo: 'Masculino', idTipo: 'I001', idNumero: '36789012', distrito: 'D029', telefono: '937788990', direccion: 'Calle Los Pajaritos 700', fechaNac: '21/06/1981', fechaReg: '15/02/2024', estado: 1 },
    { cod: 'E0008', nombre: 'Elena Teresa Bravo', sexo: 'Femenino', idTipo: 'I001', idNumero: '37890123', distrito: 'D027', telefono: '928899001', direccion: 'Av. Tumbes 800', fechaNac: '14/04/1986', fechaReg: '01/03/2024', estado: 1 },
    { cod: 'E0009', nombre: 'Ricardo Palma Solis', sexo: 'Masculino', idTipo: 'I001', idNumero: '38901234', distrito: 'D032', telefono: '919900112', direccion: 'Jr. Azangaro 900', fechaNac: '07/12/1984', fechaReg: '01/03/2024', estado: 1 },
    { cod: 'E0010', nombre: 'Victoria Ruesta Dolorier', sexo: 'Femenino', idTipo: 'I001', idNumero: '39012345', distrito: 'D036', telefono: '900011223', direccion: 'Calle Enos 1000', fechaNac: '29/08/1989', fechaReg: '15/03/2024', estado: 1 }
];

const SEED_MEDICAMENTOS = [
    { cod: 'M0001', prov: 'P001', linea: 'L001', rep: 'R001', dos: 'DS03', cla: 'C001', tip: 'T001', desc: 'Amoxicilina 500mg', cantGrup: '100', preGru: '85.00', preUni: '0.85', fecVenc: '15/06/2025', estado: 1 },
    { cod: 'M0002', prov: 'P002', linea: 'L002', rep: 'R002', dos: 'DS03', cla: 'C002', tip: 'T001', desc: 'Paracetamol 500mg', cantGrup: '200', preGru: '45.00', preUni: '0.23', fecVenc: '01/12/2025', estado: 1 },
    { cod: 'M0003', prov: 'P003', linea: 'L003', rep: 'R001', dos: 'DS03', cla: 'C001', tip: 'T001', desc: 'Ibuprofeno 400mg', cantGrup: '150', preGru: '120.00', preUni: '0.80', fecVenc: '20/09/2025', estado: 1 },
    { cod: 'M0004', prov: 'P004', linea: 'L004', rep: 'R003', dos: 'DS02', cla: 'C003', tip: 'T001', desc: 'Jarabe para la tos', cantGrup: '50', preGru: '200.00', preUni: '4.00', fecVenc: '10/03/2025', estado: 1 },
    { cod: 'M0005', prov: 'P005', linea: 'L001', rep: 'R005', dos: 'DS01', cla: 'C004', tip: 'T001', desc: 'Crema Dermatologica', cantGrup: '80', preGru: '150.00', preUni: '1.88', fecVenc: '25/08/2025', estado: 1 },
    { cod: 'M0006', prov: 'P006', linea: 'L002', rep: 'R006', dos: 'DS04', cla: 'C001', tip: 'T001', desc: 'Dexametasona Inyectable', cantGrup: '60', preGru: '180.00', preUni: '3.00', fecVenc: '30/11/2025', estado: 1 },
    { cod: 'M0007', prov: 'P007', linea: 'L003', rep: 'R001', dos: 'DS03', cla: 'C002', tip: 'T001', desc: 'Naproxeno 250mg', cantGrup: '120', preGru: '95.00', preUni: '0.79', fecVenc: '05/07/2025', estado: 1 },
    { cod: 'M0008', prov: 'P008', linea: 'L004', rep: 'R002', dos: 'DS03', cla: 'C001', tip: 'T001', desc: 'Ciprofloxacino 500mg', cantGrup: '90', preGru: '110.00', preUni: '1.22', fecVenc: '18/10/2025', estado: 1 },
    { cod: 'M0009', prov: 'P001', linea: 'L001', rep: 'R003', dos: 'DS02', cla: 'C003', tip: 'T001', desc: 'Antigripal en Jarabe', cantGrup: '70', preGru: '75.00', preUni: '1.07', fecVenc: '22/04/2025', estado: 1 },
    { cod: 'M0010', prov: 'P002', linea: 'L002', rep: 'R001', dos: 'DS03', cla: 'C001', tip: 'T001', desc: 'Azitromicina 500mg', cantGrup: '110', preGru: '165.00', preUni: '1.50', fecVenc: '12/01/2026', estado: 1 },
    { cod: 'M0011', prov: 'P003', linea: 'L003', rep: 'R004', dos: 'DS02', cla: 'C004', tip: 'T001', desc: 'Emulsion de Scott', cantGrup: '40', preGru: '60.00', preUni: '1.50', fecVenc: '08/05/2025', estado: 1 }
];

// Storage Manager
const Storage = {
    get(key) {
        const data = localStorage.getItem(`farmacia_${key}`);
        return data ? JSON.parse(data) : null;
    },
    set(key, value) {
        localStorage.setItem(`farmacia_${key}`, JSON.stringify(value));
    },
    init() {
        if (!this.get('initialized')) {
            this.set('clientes', SEED_CLIENTES);
            this.set('empleados', SEED_EMPLEADOS);
            this.set('medicamentos', SEED_MEDICAMENTOS);
            this.set('pedidos', []);
            this.set('generadores', {
                CLIENTE: 10,
                EMPLEADO: 10,
                MEDICAMENTOS: 11,
                NOTAPEDIDO: 0,
                BOLETA: 0,
                FACTURA: 0
            });
            this.set('initialized', true);
        }
    },
    generateId(entity) {
        const gen = this.get('generadores');
        gen[entity]++;
        this.set('generadores', gen);
        const prefixes = {
            CLIENTE: 'C',
            EMPLEADO: 'E',
            MEDICAMENTOS: 'M',
            NOTAPEDIDO: 'N',
            BOLETA: 'B',
            FACTURA: 'F'
        };
        const prefix = prefixes[entity] || '';
        return `${prefix}${String(gen[entity]).padStart(4, '0')}`;
    },
    getClientes() { return this.get('clientes') || []; },
    setClientes(data) { this.set('clientes', data); },
    getEmpleados() { return this.get('empleados') || []; },
    setEmpleados(data) { this.set('empleados', data); },
    getMedicamentos() { return this.get('medicamentos') || []; },
    setMedicamentos(data) { this.set('medicamentos', data); },
    getPedidos() { return this.get('pedidos') || []; },
    setPedidos(data) { this.set('pedidos', data); },
    getDistritos() { return DB.distritos; },
    getIdentidades() { return DB.identidades; },
    getProveedores() { return DB.proveedores; },
    getLineasFarma() { return DB.lineasFarma; },
    getRepresentaciones() { return DB.representaciones; },
    getDosis() { return DB.dosis; },
    getClasificaciones() { return DB.clasificaciones; },
    getTipos() { return DB.tipos; }
};

Storage.init();
