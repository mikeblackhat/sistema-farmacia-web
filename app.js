// Main Application
const App = {
    currentView: 'dashboard',
    editingId: null,
    editingType: null,

    init() {
        this.setupNavigation();
        this.setupModal();
        this.setupSearch();
        this.updateDate();
        this.loadDashboard();
        this.loadClientes();
        this.loadEmpleados();
        this.loadMedicamentos();
        this.loadPedidos();
        this.setupQuickActions();
    },

    // Navigation
    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                this.switchView(view);
            });
        });

        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });

        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', () => {
                this.switchView(card.dataset.view);
            });
        });
    },

    setupQuickActions() {
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.switchView(view);
                setTimeout(() => {
                    if (view === 'clientes') document.getElementById('btnNuevoCliente').click();
                    else if (view === 'medicamentos') document.getElementById('btnNuevoMedicamento').click();
                    else if (view === 'pedidos') document.getElementById('btnNuevoPedido').click();
                }, 100);
            });
        });
    },

    switchView(view) {
        this.currentView = view;
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelector(`.nav-item[data-view="${view}"]`).classList.add('active');
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${view}`).classList.add('active');
        document.getElementById('pageTitle').textContent = this.getViewTitle(view);
        document.getElementById('sidebar').classList.remove('active');
    },

    getViewTitle(view) {
        const titles = {
            dashboard: 'Dashboard',
            clientes: 'Gestión de Clientes',
            empleados: 'Gestión de Empleados',
            medicamentos: 'Gestión de Medicamentos',
            pedidos: 'Gestión de Pedidos',
            reportes: 'Reportes'
        };
        return titles[view] || 'Dashboard';
    },

    updateDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('es-PE', options);
    },

    // Dashboard
    loadDashboard() {
        document.getElementById('statClientes').textContent = Storage.getClientes().filter(c => c.estado === 1).length;
        document.getElementById('statEmpleados').textContent = Storage.getEmpleados().filter(e => e.estado === 1).length;
        document.getElementById('statMedicamentos').textContent = Storage.getMedicamentos().filter(m => m.estado === 1).length;
        document.getElementById('statPedidos').textContent = Storage.getPedidos().length;

        const pedidos = Storage.getPedidos();
        const tbody = document.getElementById('recentOrdersBody');
        if (pedidos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state"><p>No hay pedidos recientes</p></td></tr>';
            return;
        }
        const recent = pedidos.slice(-5).reverse();
        tbody.innerHTML = recent.map(p => {
            const cliente = Storage.getClientes().find(c => c.cod === p.cliente);
            const emp = Storage.getEmpleados().find(e => e.cod === p.empleado);
            return `<tr>
                <td><strong>${p.numNota}</strong></td>
                <td>${cliente ? cliente.nombre : p.cliente}</td>
                <td>${emp ? emp.nombre : p.empleado}</td>
                <td>${p.fecha}</td>
                <td>S/ ${parseFloat(p.total).toFixed(2)}</td>
                <td><span class="badge badge-${p.estado === 'Emitido' ? 'success' : p.estado === 'Cancelado' ? 'warning' : 'danger'}">${p.estado}</span></td>
            </tr>`;
        }).join('');
    },

    // Modal
    setupModal() {
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        document.getElementById('btnCancelar').addEventListener('click', () => this.closeModal());
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modalOverlay')) this.closeModal();
        });
    },

    openModal(title) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalOverlay').classList.add('active');
    },

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
        document.getElementById('modalBody').innerHTML = '';
        this.editingId = null;
        this.editingType = null;
    },

    // Toast
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        document.getElementById('toastMessage').textContent = message;
        toast.className = `toast ${type} active`;
        setTimeout(() => toast.classList.remove('active'), 3000);
    },

    // Setup Search
    setupSearch() {
        document.getElementById('searchCliente').addEventListener('input', (e) => this.filterTable('clientes', e.target.value));
        document.getElementById('searchEmpleado').addEventListener('input', (e) => this.filterTable('empleados', e.target.value));
        document.getElementById('searchMedicamento').addEventListener('input', (e) => this.filterTable('medicamentos', e.target.value));
        document.getElementById('searchPedido').addEventListener('input', (e) => this.filterTable('pedidos', e.target.value));
    },

    filterTable(type, query) {
        query = query.toLowerCase();
        if (type === 'clientes') {
            const filtered = Storage.getClientes().filter(c =>
                c.cod.toLowerCase().includes(query) ||
                c.nombre.toLowerCase().includes(query) ||
                c.idNumero.includes(query)
            );
            this.renderClientesTable(filtered);
        } else if (type === 'empleados') {
            const filtered = Storage.getEmpleados().filter(e =>
                e.cod.toLowerCase().includes(query) ||
                e.nombre.toLowerCase().includes(query) ||
                e.idNumero.includes(query)
            );
            this.renderEmpleadosTable(filtered);
        } else if (type === 'medicamentos') {
            const filtered = Storage.getMedicamentos().filter(m =>
                m.cod.toLowerCase().includes(query) ||
                m.desc.toLowerCase().includes(query)
            );
            this.renderMedicamentosTable(filtered);
        } else if (type === 'pedidos') {
            const filtered = Storage.getPedidos().filter(p =>
                p.numNota.toLowerCase().includes(query) ||
                p.cliente.toLowerCase().includes(query)
            );
            this.renderPedidosTable(filtered);
        }
    },

    // Clientes
    loadClientes() {
        this.renderClientesTable(Storage.getClientes());
        document.getElementById('btnNuevoCliente').addEventListener('click', () => this.showClienteForm());
    },

    renderClientesTable(data) {
        const tbody = document.getElementById('clientesTableBody');
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="empty-state"><p>No se encontraron clientes</p></td></tr>';
            return;
        }
        tbody.innerHTML = data.map(c => {
            const distrito = DB.distritos.find(d => d.id === c.distrito);
            return `<tr>
                <td><strong>${c.cod}</strong></td>
                <td>${c.nombre}</td>
                <td>${c.sexo}</td>
                <td>${c.idNumero}</td>
                <td>${distrito ? distrito.nombre : c.distrito}</td>
                <td>${c.telefono}</td>
                <td><span class="badge ${c.estado === 1 ? 'badge-success' : 'badge-danger'}">${c.estado === 1 ? 'Habilitado' : 'Inhabilitado'}</span></td>
                <td class="actions">
                    <button class="btn-icon" onclick="App.showClienteForm('${c.cod}')" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="btn-icon danger" onclick="App.deleteCliente('${c.cod}')" title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>`;
        }).join('');
    },

    showClienteForm(id = null) {
        this.editingId = id;
        this.editingType = 'cliente';
        const cliente = id ? Storage.getClientes().find(c => c.cod === id) : null;
        const distritos = DB.distritos.map(d => `<option value="${d.id}" ${cliente && cliente.distrito === d.id ? 'selected' : ''}>${d.nombre}</option>`).join('');
        const identidades = DB.identidades.map(i => `<option value="${i.id}" ${cliente && cliente.idTipo === i.id ? 'selected' : ''}>${i.nombre}</option>`).join('');

        document.getElementById('modalBody').innerHTML = `
            <form id="clienteForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Código</label>
                        <input type="text" id="fCodigo" value="${cliente ? cliente.cod : ''}" readonly style="background:#f3f4f6">
                    </div>
                    <div class="form-group">
                        <label>Nombre Completo *</label>
                        <input type="text" id="fNombre" value="${cliente ? cliente.nombre : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Sexo *</label>
                        <select id="fSexo">
                            <option value="">Seleccione...</option>
                            <option value="Masculino" ${cliente && cliente.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
                            <option value="Femenino" ${cliente && cliente.sexo === 'Femenino' ? 'selected' : ''}>Femenino</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Tipo Documento *</label>
                        <select id="fIdTipo">${identidades}</select>
                    </div>
                    <div class="form-group">
                        <label>N° Documento *</label>
                        <input type="text" id="fIdNumero" value="${cliente ? cliente.idNumero : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Distrito</label>
                        <select id="fDistrito"><option value="">Seleccione...</option>${distritos}</select>
                    </div>
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input type="text" id="fTelefono" value="${cliente ? cliente.telefono : ''}">
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" id="fDireccion" value="${cliente ? cliente.direccion : ''}">
                    </div>
                    <div class="form-group">
                        <label>RUC</label>
                        <input type="text" id="fRuc" value="${cliente ? cliente.ruc : ''}">
                    </div>
                    <div class="form-group">
                        <label>Fecha Nacimiento</label>
                        <input type="text" id="fFechaNac" value="${cliente ? cliente.fechaNac : ''}" placeholder="DD/MM/AAAA">
                    </div>
                    <div class="form-group">
                        <label>Estado</label>
                        <select id="fEstado">
                            <option value="1" ${cliente && cliente.estado === 1 ? 'selected' : ''}>Habilitado</option>
                            <option value="0" ${cliente && cliente.estado === 0 ? 'selected' : ''}>Inhabilitado</option>
                        </select>
                    </div>
                </div>
            </form>
        `;

        document.getElementById('btnGuardar').onclick = () => this.saveCliente();
        this.openModal(cliente ? 'Editar Cliente' : 'Nuevo Cliente');
    },

    saveCliente() {
        const nombre = document.getElementById('fNombre').value.trim();
        const sexo = document.getElementById('fSexo').value;
        const idNumero = document.getElementById('fIdNumero').value.trim();

        if (!nombre || !sexo || !idNumero) {
            this.showToast('Complete los campos obligatorios', 'error');
            return;
        }

        const clientes = Storage.getClientes();
        const data = {
            cod: this.editingId || Storage.generateId('CLIENTE'),
            nombre,
            sexo,
            idTipo: document.getElementById('fIdTipo').value,
            idNumero,
            distrito: document.getElementById('fDistrito').value,
            telefono: document.getElementById('fTelefono').value.trim(),
            direccion: document.getElementById('fDireccion').value.trim(),
            ruc: document.getElementById('fRuc').value.trim(),
            fechaNac: document.getElementById('fFechaNac').value.trim(),
            fechaReg: this.editingId ? clientes.find(c => c.cod === this.editingId).fechaReg : new Date().toLocaleDateString('es-PE'),
            estado: parseInt(document.getElementById('fEstado').value)
        };

        if (this.editingId) {
            const idx = clientes.findIndex(c => c.cod === this.editingId);
            clientes[idx] = data;
        } else {
            clientes.push(data);
        }

        Storage.setClientes(clientes);
        this.renderClientesTable(clientes);
        this.loadDashboard();
        this.closeModal();
        this.showToast(this.editingId ? 'Cliente actualizado' : 'Cliente registrado');
    },

    deleteCliente(cod) {
        if (!confirm('¿Está seguro de eliminar este cliente?')) return;
        const clientes = Storage.getClientes();
        const idx = clientes.findIndex(c => c.cod === cod);
        clientes[idx].estado = 0;
        Storage.setClientes(clientes);
        this.renderClientesTable(clientes);
        this.loadDashboard();
        this.showToast('Cliente eliminado');
    },

    // Empleados
    loadEmpleados() {
        this.renderEmpleadosTable(Storage.getEmpleados());
        document.getElementById('btnNuevoEmpleado').addEventListener('click', () => this.showEmpleadoForm());
    },

    renderEmpleadosTable(data) {
        const tbody = document.getElementById('empleadosTableBody');
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="empty-state"><p>No se encontraron empleados</p></td></tr>';
            return;
        }
        tbody.innerHTML = data.map(e => {
            const distrito = DB.distritos.find(d => d.id === e.distrito);
            return `<tr>
                <td><strong>${e.cod}</strong></td>
                <td>${e.nombre}</td>
                <td>${e.sexo}</td>
                <td>${e.idNumero}</td>
                <td>${distrito ? distrito.nombre : e.distrito}</td>
                <td>${e.telefono}</td>
                <td><span class="badge ${e.estado === 1 ? 'badge-success' : 'badge-danger'}">${e.estado === 1 ? 'Habilitado' : 'Inhabilitado'}</span></td>
                <td class="actions">
                    <button class="btn-icon" onclick="App.showEmpleadoForm('${e.cod}')" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="btn-icon danger" onclick="App.deleteEmpleado('${e.cod}')" title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>`;
        }).join('');
    },

    showEmpleadoForm(id = null) {
        this.editingId = id;
        this.editingType = 'empleado';
        const emp = id ? Storage.getEmpleados().find(e => e.cod === id) : null;
        const distritos = DB.distritos.map(d => `<option value="${d.id}" ${emp && emp.distrito === d.id ? 'selected' : ''}>${d.nombre}</option>`).join('');
        const identidades = DB.identidades.map(i => `<option value="${i.id}" ${emp && emp.idTipo === i.id ? 'selected' : ''}>${i.nombre}</option>`).join('');

        document.getElementById('modalBody').innerHTML = `
            <form id="empleadoForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Código</label>
                        <input type="text" id="fCodigo" value="${emp ? emp.cod : ''}" readonly style="background:#f3f4f6">
                    </div>
                    <div class="form-group">
                        <label>Nombre Completo *</label>
                        <input type="text" id="fNombre" value="${emp ? emp.nombre : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Sexo *</label>
                        <select id="fSexo">
                            <option value="">Seleccione...</option>
                            <option value="Masculino" ${emp && emp.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
                            <option value="Femenino" ${emp && emp.sexo === 'Femenino' ? 'selected' : ''}>Femenino</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Tipo Documento *</label>
                        <select id="fIdTipo">${identidades}</select>
                    </div>
                    <div class="form-group">
                        <label>N° Documento *</label>
                        <input type="text" id="fIdNumero" value="${emp ? emp.idNumero : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Distrito</label>
                        <select id="fDistrito"><option value="">Seleccione...</option>${distritos}</select>
                    </div>
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input type="text" id="fTelefono" value="${emp ? emp.telefono : ''}">
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" id="fDireccion" value="${emp ? emp.direccion : ''}">
                    </div>
                    <div class="form-group">
                        <label>Fecha Nacimiento</label>
                        <input type="text" id="fFechaNac" value="${emp ? emp.fechaNac : ''}" placeholder="DD/MM/AAAA">
                    </div>
                    <div class="form-group">
                        <label>Estado</label>
                        <select id="fEstado">
                            <option value="1" ${emp && emp.estado === 1 ? 'selected' : ''}>Habilitado</option>
                            <option value="0" ${emp && emp.estado === 0 ? 'selected' : ''}>Inhabilitado</option>
                        </select>
                    </div>
                </div>
            </form>
        `;

        document.getElementById('btnGuardar').onclick = () => this.saveEmpleado();
        this.openModal(emp ? 'Editar Empleado' : 'Nuevo Empleado');
    },

    saveEmpleado() {
        const nombre = document.getElementById('fNombre').value.trim();
        const sexo = document.getElementById('fSexo').value;
        const idNumero = document.getElementById('fIdNumero').value.trim();

        if (!nombre || !sexo || !idNumero) {
            this.showToast('Complete los campos obligatorios', 'error');
            return;
        }

        const empleados = Storage.getEmpleados();
        const data = {
            cod: this.editingId || Storage.generateId('EMPLEADO'),
            nombre,
            sexo,
            idTipo: document.getElementById('fIdTipo').value,
            idNumero,
            distrito: document.getElementById('fDistrito').value,
            telefono: document.getElementById('fTelefono').value.trim(),
            direccion: document.getElementById('fDireccion').value.trim(),
            fechaNac: document.getElementById('fFechaNac').value.trim(),
            fechaReg: this.editingId ? empleados.find(e => e.cod === this.editingId).fechaReg : new Date().toLocaleDateString('es-PE'),
            estado: parseInt(document.getElementById('fEstado').value)
        };

        if (this.editingId) {
            const idx = empleados.findIndex(e => e.cod === this.editingId);
            empleados[idx] = data;
        } else {
            empleados.push(data);
        }

        Storage.setEmpleados(empleados);
        this.renderEmpleadosTable(empleados);
        this.loadDashboard();
        this.closeModal();
        this.showToast(this.editingId ? 'Empleado actualizado' : 'Empleado registrado');
    },

    deleteEmpleado(cod) {
        if (!confirm('¿Está seguro de eliminar este empleado?')) return;
        const empleados = Storage.getEmpleados();
        const idx = empleados.findIndex(e => e.cod === cod);
        empleados[idx].estado = 0;
        Storage.setEmpleados(empleados);
        this.renderEmpleadosTable(empleados);
        this.loadDashboard();
        this.showToast('Empleado eliminado');
    },

    // Medicamentos
    loadMedicamentos() {
        this.renderMedicamentosTable(Storage.getMedicamentos());
        document.getElementById('btnNuevoMedicamento').addEventListener('click', () => this.showMedicamentoForm());
    },

    renderMedicamentosTable(data) {
        const tbody = document.getElementById('medicamentosTableBody');
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="empty-state"><p>No se encontraron medicamentos</p></td></tr>';
            return;
        }
        tbody.innerHTML = data.map(m => {
            const prov = DB.proveedores.find(p => p.id === m.prov);
            const linea = DB.lineasFarma.find(l => l.id === m.linea);
            const rep = DB.representaciones.find(r => r.id === m.rep);
            return `<tr>
                <td><strong>${m.cod}</strong></td>
                <td>${m.desc}</td>
                <td>${prov ? prov.nombre : m.prov}</td>
                <td>${linea ? linea.nombre : m.linea}</td>
                <td>${rep ? rep.nombre : m.rep}</td>
                <td>S/ ${parseFloat(m.preUni).toFixed(2)}</td>
                <td>${m.cantGrup}</td>
                <td><span class="badge ${m.estado === 1 ? 'badge-success' : 'badge-danger'}">${m.estado === 1 ? 'Habilitado' : 'Inhabilitado'}</span></td>
                <td class="actions">
                    <button class="btn-icon" onclick="App.showMedicamentoForm('${m.cod}')" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="btn-icon danger" onclick="App.deleteMedicamento('${m.cod}')" title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>`;
        }).join('');
    },

    showMedicamentoForm(id = null) {
        this.editingId = id;
        this.editingType = 'medicamento';
        const med = id ? Storage.getMedicamentos().find(m => m.cod === id) : null;

        const provOpts = DB.proveedores.map(p => `<option value="${p.id}" ${med && med.prov === p.id ? 'selected' : ''}>${p.nombre}</option>`).join('');
        const lineaOpts = DB.lineasFarma.map(l => `<option value="${l.id}" ${med && med.linea === l.id ? 'selected' : ''}>${l.nombre}</option>`).join('');
        const repOpts = DB.representaciones.map(r => `<option value="${r.id}" ${med && med.rep === r.id ? 'selected' : ''}>${r.nombre}</option>`).join('');
        const dosOpts = DB.dosis.map(d => `<option value="${d.id}" ${med && med.dos === d.id ? 'selected' : ''}>${d.nombre}</option>`).join('');
        const claOpts = DB.clasificaciones.map(c => `<option value="${c.id}" ${med && med.cla === c.id ? 'selected' : ''}>${c.nombre}</option>`).join('');
        const tipOpts = DB.tipos.map(t => `<option value="${t.id}" ${med && med.tip === t.id ? 'selected' : ''}>${t.nombre}</option>`).join('');

        document.getElementById('modalBody').innerHTML = `
            <form id="medicamentoForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Código</label>
                        <input type="text" id="fCodigo" value="${med ? med.cod : ''}" readonly style="background:#f3f4f6">
                    </div>
                    <div class="form-group">
                        <label>Descripción *</label>
                        <input type="text" id="fDesc" value="${med ? med.desc : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Proveedor *</label>
                        <select id="fProv"><option value="">Seleccione...</option>${provOpts}</select>
                    </div>
                    <div class="form-group">
                        <label>Línea Farmacéutica</label>
                        <select id="fLinea"><option value="">Seleccione...</option>${lineaOpts}</select>
                    </div>
                    <div class="form-group">
                        <label>Presentación</label>
                        <select id="fRep"><option value="">Seleccione...</option>${repOpts}</select>
                    </div>
                    <div class="form-group">
                        <label>Dosis</label>
                        <select id="fDos"><option value="">Seleccione...</option>${dosOpts}</select>
                    </div>
                    <div class="form-group">
                        <label>Clasificación</label>
                        <select id="fCla"><option value="">Seleccione...</option>${claOpts}</select>
                    </div>
                    <div class="form-group">
                        <label>Tipo</label>
                        <select id="fTip"><option value="">Seleccione...</option>${tipOpts}</select>
                    </div>
                    <div class="form-group">
                        <label>Cantidad Grupo</label>
                        <input type="number" id="fCantGrup" value="${med ? med.cantGrup : ''}">
                    </div>
                    <div class="form-group">
                        <label>Precio Grupo (S/)</label>
                        <input type="number" step="0.01" id="fPreGru" value="${med ? med.preGru : ''}">
                    </div>
                    <div class="form-group">
                        <label>Precio Unitario (S/) *</label>
                        <input type="number" step="0.01" id="fPreUni" value="${med ? med.preUni : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Vencimiento</label>
                        <input type="text" id="fFecVenc" value="${med ? med.fecVenc : ''}" placeholder="DD/MM/AAAA">
                    </div>
                    <div class="form-group">
                        <label>Estado</label>
                        <select id="fEstado">
                            <option value="1" ${med && med.estado === 1 ? 'selected' : ''}>Habilitado</option>
                            <option value="0" ${med && med.estado === 0 ? 'selected' : ''}>Inhabilitado</option>
                        </select>
                    </div>
                </div>
            </form>
        `;

        document.getElementById('btnGuardar').onclick = () => this.saveMedicamento();
        this.openModal(med ? 'Editar Medicamento' : 'Nuevo Medicamento');
    },

    saveMedicamento() {
        const desc = document.getElementById('fDesc').value.trim();
        const prov = document.getElementById('fProv').value;
        const preUni = document.getElementById('fPreUni').value;

        if (!desc || !prov || !preUni) {
            this.showToast('Complete los campos obligatorios', 'error');
            return;
        }

        const meds = Storage.getMedicamentos();
        const data = {
            cod: this.editingId || Storage.generateId('MEDICAMENTOS'),
            desc,
            prov,
            linea: document.getElementById('fLinea').value,
            rep: document.getElementById('fRep').value,
            dos: document.getElementById('fDos').value,
            cla: document.getElementById('fCla').value,
            tip: document.getElementById('fTip').value,
            cantGrup: document.getElementById('fCantGrup').value,
            preGru: document.getElementById('fPreGru').value,
            preUni,
            fecVenc: document.getElementById('fFecVenc').value.trim(),
            estado: parseInt(document.getElementById('fEstado').value)
        };

        if (this.editingId) {
            const idx = meds.findIndex(m => m.cod === this.editingId);
            meds[idx] = data;
        } else {
            meds.push(data);
        }

        Storage.setMedicamentos(meds);
        this.renderMedicamentosTable(meds);
        this.loadDashboard();
        this.closeModal();
        this.showToast(this.editingId ? 'Medicamento actualizado' : 'Medicamento registrado');
    },

    deleteMedicamento(cod) {
        if (!confirm('¿Está seguro de eliminar este medicamento?')) return;
        const meds = Storage.getMedicamentos();
        const idx = meds.findIndex(m => m.cod === cod);
        meds[idx].estado = 0;
        Storage.setMedicamentos(meds);
        this.renderMedicamentosTable(meds);
        this.loadDashboard();
        this.showToast('Medicamento eliminado');
    },

    // Pedidos
    loadPedidos() {
        this.renderPedidosTable(Storage.getPedidos());
        document.getElementById('btnNuevoPedido').addEventListener('click', () => this.showPedidoForm());
    },

    renderPedidosTable(data) {
        const tbody = document.getElementById('pedidosTableBody');
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="empty-state"><p>No se encontraron pedidos</p></td></tr>';
            return;
        }
        tbody.innerHTML = data.map(p => {
            const cliente = Storage.getClientes().find(c => c.cod === p.cliente);
            const emp = Storage.getEmpleados().find(e => e.cod === p.empleado);
            return `<tr>
                <td><strong>${p.numNota}</strong></td>
                <td>${cliente ? cliente.nombre : p.cliente}</td>
                <td>${emp ? emp.nombre : p.empleado}</td>
                <td>${p.fecha}</td>
                <td>S/ ${parseFloat(p.subtotal).toFixed(2)}</td>
                <td>S/ ${parseFloat(p.igv).toFixed(2)}</td>
                <td><strong>S/ ${parseFloat(p.total).toFixed(2)}</strong></td>
                <td><span class="badge ${p.estado === 'Emitido' ? 'badge-success' : p.estado === 'Cancelado' ? 'badge-warning' : 'badge-danger'}">${p.estado}</span></td>
                <td class="actions">
                    <button class="btn-icon" onclick="App.viewPedido('${p.numNota}')" title="Ver">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button class="btn-icon danger" onclick="App.deletePedido('${p.numNota}')" title="Anular">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    </button>
                </td>
            </tr>`;
        }).join('');
    },

    showPedidoForm() {
        const numNota = Storage.generateId('NOTAPEDIDO');
        const fecha = new Date().toLocaleDateString('es-PE');
        const clientes = Storage.getClientes().filter(c => c.estado === 1);
        const empleados = Storage.getEmpleados().filter(e => e.estado === 1);
        const meds = Storage.getMedicamentos().filter(m => m.estado === 1);

        document.getElementById('modalBody').innerHTML = `
            <form id="pedidoForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label>N° Nota</label>
                        <input type="text" id="fNumNota" value="${numNota}" readonly style="background:#f3f4f6">
                    </div>
                    <div class="form-group">
                        <label>Fecha</label>
                        <input type="text" id="fFecha" value="${fecha}" readonly style="background:#f3f4f6">
                    </div>
                    <div class="form-group">
                        <label>Cliente *</label>
                        <select id="fCliente"><option value="">Seleccione...</option>${clientes.map(c => `<option value="${c.cod}">${c.nombre}</option>`).join('')}</select>
                    </div>
                    <div class="form-group">
                        <label>Empleado *</label>
                        <select id="fEmpleado"><option value="">Seleccione...</option>${empleados.map(e => `<option value="${e.cod}">${e.nombre}</option>`).join('')}</select>
                    </div>
                </div>
                <div style="margin-top:20px">
                    <h4 style="margin-bottom:12px;color:#374151">Detalle del Pedido</h4>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Medicamento *</label>
                            <select id="fMedicamento"><option value="">Seleccione...</option>${meds.map(m => `<option value="${m.cod}" data-precio="${m.preUni}">${m.desc} - S/ ${parseFloat(m.preUni).toFixed(2)}</option>`).join('')}</select>
                        </div>
                        <div class="form-group">
                            <label>Cantidad *</label>
                            <input type="number" id="fCantidad" min="1" value="1">
                        </div>
                    </div>
                    <button type="button" class="btn btn-secondary" id="btnAddItem" style="margin-top:12px">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Agregar
                    </button>
                    <div class="table-container" style="margin-top:16px">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Importe</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="pedidoDetalle">
                            </tbody>
                        </table>
                    </div>
                    <div style="display:flex;justify-content:flex-end;margin-top:16px">
                        <div style="text-align:right">
                            <p style="margin:4px 0;color:#6b7280">Subtotal: <strong id="fSubtotal">S/ 0.00</strong></p>
                            <p style="margin:4px 0;color:#6b7280">IGV (18%): <strong id="fIgv">S/ 0.00</strong></p>
                            <p style="margin:8px 0;font-size:18px;color:#111827">Total: <strong id="fTotal">S/ 0.00</strong></p>
                        </div>
                    </div>
                </div>
            </form>
        `;

        this.pedidoItems = [];
        document.getElementById('btnAddItem').addEventListener('click', () => this.addPedidoItem());
        document.getElementById('btnGuardar').onclick = () => this.savePedido();
        this.openModal('Nuevo Pedido');
    },

    pedidoItems: [],

    addPedidoItem() {
        const medSelect = document.getElementById('fMedicamento');
        const cantidad = parseInt(document.getElementById('fCantidad').value);
        if (!medSelect.value || !cantidad) {
            this.showToast('Seleccione medicamento y cantidad', 'error');
            return;
        }

        const option = medSelect.options[medSelect.selectedIndex];
        const precio = parseFloat(option.dataset.precio);
        const desc = option.text.split(' - ')[0];
        const importe = precio * cantidad;

        this.pedidoItems.push({
            cod: medSelect.value,
            desc,
            precio,
            cantidad,
            importe
        });

        this.renderPedidoDetalle();

        medSelect.value = '';
        document.getElementById('fCantidad').value = 1;
    },

    removePedidoItem(index) {
        this.pedidoItems.splice(index, 1);
        this.renderPedidoDetalle();
    },

    renderPedidoDetalle() {
        const tbody = document.getElementById('pedidoDetalle');
        if (this.pedidoItems.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state"><p>Agregue productos al pedido</p></td></tr>';
            document.getElementById('fSubtotal').textContent = 'S/ 0.00';
            document.getElementById('fIgv').textContent = 'S/ 0.00';
            document.getElementById('fTotal').textContent = 'S/ 0.00';
            return;
        }

        tbody.innerHTML = this.pedidoItems.map((item, i) => `
            <tr>
                <td>${item.cod}</td>
                <td>${item.desc}</td>
                <td>S/ ${item.precio.toFixed(2)}</td>
                <td>${item.cantidad}</td>
                <td>S/ ${item.importe.toFixed(2)}</td>
                <td>
                    <button class="btn-icon danger" onclick="App.removePedidoItem(${i})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');

        const subtotal = this.pedidoItems.reduce((sum, item) => sum + item.importe, 0);
        const igv = subtotal * 0.18;
        const total = subtotal + igv;

        document.getElementById('fSubtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
        document.getElementById('fIgv').textContent = `S/ ${igv.toFixed(2)}`;
        document.getElementById('fTotal').textContent = `S/ ${total.toFixed(2)}`;
    },

    savePedido() {
        const cliente = document.getElementById('fCliente').value;
        const empleado = document.getElementById('fEmpleado').value;

        if (!cliente || !empleado) {
            this.showToast('Seleccione cliente y empleado', 'error');
            return;
        }

        if (this.pedidoItems.length === 0) {
            this.showToast('Agregue al menos un producto', 'error');
            return;
        }

        const subtotal = this.pedidoItems.reduce((sum, item) => sum + item.importe, 0);
        const igv = subtotal * 0.18;
        const total = subtotal + igv;

        const pedidos = Storage.getPedidos();
        pedidos.push({
            numNota: document.getElementById('fNumNota').value,
            fecha: document.getElementById('fFecha').value,
            cliente,
            empleado,
            items: this.pedidoItems,
            subtotal,
            igv,
            total,
            estado: 'Emitido'
        });

        Storage.setPedidos(pedidos);
        this.renderPedidosTable(pedidos);
        this.loadDashboard();
        this.closeModal();
        this.showToast('Pedido registrado');
    },

    viewPedido(numNota) {
        const pedido = Storage.getPedidos().find(p => p.numNota === numNota);
        if (!pedido) return;

        const cliente = Storage.getClientes().find(c => c.cod === pedido.cliente);
        const emp = Storage.getEmpleados().find(e => e.cod === pedido.empleado);

        document.getElementById('modalBody').innerHTML = `
            <div style="margin-bottom:20px">
                <div class="form-grid">
                    <div class="form-group">
                        <label>N° Nota</label>
                        <input type="text" value="${pedido.numNota}" readonly style="background:#f3f4f6">
                    </div>
                    <div class="form-group">
                        <label>Fecha</label>
                        <input type="text" value="${pedido.fecha}" readonly style="background:#f3f4f6">
                    </div>
                    <div class="form-group">
                        <label>Cliente</label>
                        <input type="text" value="${cliente ? cliente.nombre : pedido.cliente}" readonly style="background:#f3f4f6">
                    </div>
                    <div class="form-group">
                        <label>Empleado</label>
                        <input type="text" value="${emp ? emp.nombre : pedido.empleado}" readonly style="background:#f3f4f6">
                    </div>
                </div>
            </div>
            <h4 style="margin-bottom:12px;color:#374151">Detalle</h4>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pedido.items.map(item => `
                            <tr>
                                <td>${item.cod}</td>
                                <td>${item.desc}</td>
                                <td>S/ ${item.precio.toFixed(2)}</td>
                                <td>${item.cantidad}</td>
                                <td>S/ ${item.importe.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:16px">
                <div style="text-align:right">
                    <p style="margin:4px 0;color:#6b7280">Subtotal: <strong>S/ ${pedido.subtotal.toFixed(2)}</strong></p>
                    <p style="margin:4px 0;color:#6b7280">IGV (18%): <strong>S/ ${pedido.igv.toFixed(2)}</strong></p>
                    <p style="margin:8px 0;font-size:18px;color:#111827">Total: <strong>S/ ${pedido.total.toFixed(2)}</strong></p>
                </div>
            </div>
        `;

        document.getElementById('btnGuardar').style.display = 'none';
        this.openModal(`Pedido ${numNota}`);
        document.getElementById('btnGuardar').style.display = '';
    },

    deletePedido(numNota) {
        if (!confirm('¿Está seguro de anular este pedido?')) return;
        const pedidos = Storage.getPedidos();
        const idx = pedidos.findIndex(p => p.numNota === numNota);
        pedidos[idx].estado = 'Anulado';
        Storage.setPedidos(pedidos);
        this.renderPedidosTable(pedidos);
        this.loadDashboard();
        this.showToast('Pedido anulado');
    }
};

// Report generation (print)
function generateReport(type) {
    let data, headers, title;

    if (type === 'clientes') {
        data = Storage.getClientes().filter(c => c.estado === 1);
        headers = ['Código', 'Nombre', 'Sexo', 'DNI', 'Distrito', 'Teléfono'];
        title = 'Listado de Clientes';
    } else if (type === 'empleados') {
        data = Storage.getEmpleados().filter(e => e.estado === 1);
        headers = ['Código', 'Nombre', 'Sexo', 'DNI', 'Distrito', 'Teléfono'];
        title = 'Listado de Empleados';
    } else if (type === 'medicamentos') {
        data = Storage.getMedicamentos().filter(m => m.estado === 1);
        headers = ['Código', 'Descripción', 'Proveedor', 'Precio', 'Stock'];
        title = 'Inventario de Medicamentos';
    } else if (type === 'pedidos') {
        data = Storage.getPedidos();
        headers = ['N° Nota', 'Cliente', 'Fecha', 'Total', 'Estado'];
        title = 'Historial de Pedidos';
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                h1 { text-align: center; color: #0D9488; margin-bottom: 8px; }
                .subtitle { text-align: center; color: #6b7280; margin-bottom: 30px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #e5e7eb; padding: 10px 12px; text-align: left; font-size: 13px; }
                th { background: #0D9488; color: white; }
                tr:nth-child(even) { background: #f9fafb; }
                .footer { margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px; }
                @media print { body { padding: 20px; } }
            </style>
        </head>
        <body>
            <h1>℞ Farmacia</h1>
            <p class="subtitle">${title} - ${new Date().toLocaleDateString('es-PE')}</p>
            <table>
                <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                <tbody>
                    ${data.map(row => {
                        if (type === 'clientes') return `<tr><td>${row.cod}</td><td>${row.nombre}</td><td>${row.sexo}</td><td>${row.idNumero}</td><td>${row.distrito}</td><td>${row.telefono}</td></tr>`;
                        if (type === 'empleados') return `<tr><td>${row.cod}</td><td>${row.nombre}</td><td>${row.sexo}</td><td>${row.idNumero}</td><td>${row.distrito}</td><td>${row.telefono}</td></tr>`;
                        if (type === 'medicamentos') return `<tr><td>${row.cod}</td><td>${row.desc}</td><td>${row.prov}</td><td>S/ ${parseFloat(row.preUni).toFixed(2)}</td><td>${row.cantGrup}</td></tr>`;
                        if (type === 'pedidos') return `<tr><td>${row.numNota}</td><td>${row.cliente}</td><td>${row.fecha}</td><td>S/ ${row.total.toFixed(2)}</td><td>${row.estado}</td></tr>`;
                    }).join('')}
                </tbody>
            </table>
            <p class="footer">Sistema Farmacia - Generado el ${new Date().toLocaleString('es-PE')}</p>
            <script>window.onload=function(){window.print();}<\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => App.init());
