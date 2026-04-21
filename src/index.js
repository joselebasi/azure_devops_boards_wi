import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

const {
  AZURE_DEVOPS_ORG,
  AZURE_DEVOPS_PROJECT,
  AZURE_DEVOPS_PAT,
  AZURE_DEVOPS_WORK_ITEM_TYPE
} = process.env;

// Validar que las variables de entorno estén configuradas
if (!AZURE_DEVOPS_PAT) {
  console.error('❌ Error: AZURE_DEVOPS_PAT no está configurado en el archivo .env');
  process.exit(1);
}

console.log('✅ Variables de entorno cargadas correctamente');

/**
 * Obtener los valores del campo personalizado "Gerencia"
 */
async function getFieldValues() {
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
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('❌ Error al consultar Azure DevOps:', error.message);
    process.exit(1);
  }
}

async function obtenerValoresGerencia() {
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

    //GET https://dev.azure.com/{org}/_apis/wit/fields/Custom.SCM_IngBO_Gerencia?api-version=7.1
    } catch (error) {
    console.error('❌ Error al consultar Azure DevOps:', error.message);
    process.exit(1);
    }
}   
// Ejecutar la función
obtenerValoresGerencia();