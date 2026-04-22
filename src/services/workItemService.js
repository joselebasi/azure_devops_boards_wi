export async function create(org, project, pat, workItemType) {
    try {
        // Codificar el PAT en base64 para autenticación
        const auth = Buffer.from(`:${pat}`).toString('base64');
        const url = `https://dev.azure.com/${org}/${project}/_apis/wit/workitems/$${workItemType}?api-version=7.1`;
        console.log(`\n📡 Creando Work Item... ${url}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify([
                {
                    "op": "add",
                    "path": "/fields/System.Title",
                    "value": "Nuevo Work Item"
                },
                {
                    "op": "add",
                    "path": "/fields/System.IterationId",
                    "value": "2853"
                },
                {
                    "op": "add",
                    "path": "/fields/System.AreaId",
                    "value": "4045"
                },
                {
                    "op": "add",
                    "path": "/fields/System.State",
                    "value": "New"  
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.SCM_IngBO_Solicitante",
                    "value": "Jose Isabel Toledano Morales"
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.SCM_IngBO_Gerencia",
                    "value": "DNO - META"
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.SCM_IngBO_Tipodesolicitud",
                    "value": "Accesos a herramientas"
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.19e77107-40da-42cc-beda-93a844858757",
                    "value": "Detalles específicos de la solicitud. Ejemplo :1. Folio del proyecto:  2. Nombre del proyecto:  3. Etapa del proyecto:  4. Tipo de proyecto DEvSecOps (A, B, C, D):  5. Plataformas que se ven involucradas:  6. CHG: Matriz de involucrados"
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.f77e290c-77dd-4f6c-9157-e123fb786173",
                    "value": "EBS"
                }
            ])
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`✅ Work Item creado exitosamente. ID: ${data.id}`);
    } catch (error) {
        console.error('❌ Error al crear Work Item:', error.message);
        process.exit(1);
    }
}

export async function get(org, project, pat, workItemTypeName) {
    try {
        const auth = Buffer.from(`:${pat}`).toString('base64');

        const url = `https://dev.azure.com/${org}/${encodeURIComponent(project)}/_apis/wit/workitemtypes?api-version=7.1`;

        console.log(`📡 Consultando tipos de Work Item...`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // 🔍 Buscar el tipo exacto
        const workItemType = data.value.find(
            w => w.name === workItemTypeName
        );

        data.value.forEach((workItemType) => {
            console.log(`  - ${workItemType.name} (${workItemType.referenceName})`);
        });

        if (!workItemType) {
            console.log(`❌ No existe el Work Item Type: ${workItemTypeName}`);
            return null;
        }

        console.log(`✅ Encontrado:`);
        console.log(workItemType);

        return workItemType;

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

export async function create2(org, project, pat) {
    try {
        const auth = Buffer.from(`:${pat}`).toString('base64');

        const workItemType = "SCM Ing Back Office";

        const url = `https://dev.azure.com/${org}/${encodeURIComponent(project)}/_apis/wit/workitems/$${encodeURIComponent(workItemType)}?api-version=7.1`;

        console.log(`📡 Creando Work Item: ${url}`);

        const body = [
                {
                    "op": "add",
                    "path": "/fields/System.Title",
                    "value": "Nuevo Work Item"
                },
                {
                    "op": "add",
                    "path": "/fields/System.IterationId",
                    "value": "2853"
                },
                {
                    "op": "add",
                    "path": "/fields/System.AreaId",
                    "value": "4045"
                },
                {
                    "op": "add",
                    "path": "/fields/System.State",
                    "value": "New"  
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.SCM_IngBO_Solicitante",
                    "value": "jose.toledano@axity.com"
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.SCM_IngBO_Gerencia",
                    "value": "DNO - META"
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.SCM_IngBO_Tipodesolicitud",
                    "value": "Accesos a herramientas"
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.19e77107-40da-42cc-beda-93a844858757",
                    "value": "Detalles específicos de la solicitud. Ejemplo :1. Folio del proyecto:  2. Nombre del proyecto:  3. Etapa del proyecto:  4. Tipo de proyecto DEvSecOps (A, B, C, D):  5. Plataformas que se ven involucradas:  6. CHG: Matriz de involucrados"
                },
                {
                    "op": "add",
                    "path": "/fields/Custom.f77e290c-77dd-4f6c-9157-e123fb786173",
                    "value": "EBS"
                }
            ];

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${auth}`,
                "Content-Type": "application/json-patch+json"
            },
            body: JSON.stringify(body)
        });

        const text = await response.text();
        console.log("📥 Response:", text);

        if (!response.ok) {
            throw new Error(`❌ ${response.status} ${response.statusText}`);
        }

        const data = JSON.parse(text);

        console.log(`✅ Work Item creado con ID: ${data.id}`);

        return data;

    } catch (error) {
        console.error("❌ Error:", error.message);
        throw error;
    }
}