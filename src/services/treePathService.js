export async function getValues(classification, org, project, pat) {
    try {
        console.log(`\n🔍 Obteniendo valores para: ${classification}...`);
        // Codificar el PAT en base64 para autenticación
        const auth = Buffer.from(`:${pat}`).toString('base64');
        const url = `https://dev.azure.com/${org}/${project}/_apis/wit/classificationnodes/${classification}?$depth=100&api-version=7.1`;

        console.log(`\n📡 Consultando Azure DevOps...`);
        console.log(`  URL: ${url}`);

        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        } 
        });
        console.log(`✅ Consulta exitosa. Status: ${response.status} ${response.statusText}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('❌ Error al consultar Azure DevOps:', error.message);
        process.exit(1);
    }
}