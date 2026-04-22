export async function getInfo(referenceName) {
    try {

        // Codificar el PAT en base64 para autenticación
        const auth = Buffer.from(`:${AZURE_DEVOPS_PAT}`).toString('base64');

        const url = `https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/fields/${referenceName}?api-version=7.1`;

        console.log(`\n📡 Consultando Azure DevOps...`);
        console.log(`  URL: ${url}`);
        console.log(`   Proyecto: ${AZURE_DEVOPS_PROJECT}`);

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
