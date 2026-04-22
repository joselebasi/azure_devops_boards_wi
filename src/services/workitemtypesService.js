export async function getFields() {
  try {
    // Codificar el PAT en base64 para autenticación
    const auth = Buffer.from(`:${AZURE_DEVOPS_PAT}`).toString('base64');

    const url = `https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_apis/wit/workitemtypes/${AZURE_DEVOPS_WORK_ITEM_TYPE}/fields?api-version=7.1`;

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

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    console.log(`✅ Consulta exitosa. Total de items obtenidos: ${data.count}`);
    
    // Iterar sobre el array de valores y mostrar solo el referenceName que comienza con "Custom."
    data.value.forEach((field) => {
      if (field.alwaysRequired === true) {
        console.log(`  - ${field.referenceName}`);
        console.log(`  ${field.defaultValue}`);
        console.log(`  ${field.helpText}`);
        console.log(`  ${field.alwaysRequired}`);
      }
    });

  } catch (error) {
    console.error('❌ Error al consultar Azure DevOps:', error.message);
    process.exit(1);
  }
}