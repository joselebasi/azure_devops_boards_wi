export async function getPicklistValues() {
    try {
        // Codificar el PAT en base64 para autenticación
        const auth = Buffer.from(`:${AZURE_DEVOPS_PAT}`).toString('base64');
        const url = `https://dev.azure.com/${AZURE_DEVOPS_ORG}/_apis/work/processdefinitions/lists/46b84446-10c3-46ae-94ae-beae6a27f6f8?api-version=7.1`;

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