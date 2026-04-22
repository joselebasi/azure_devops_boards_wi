import dotenv from 'dotenv';
import { getValues } from './services/treePathService.js';
import { create,get,create2 } from './services/workItemService.js';

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

//getValues('iterations', AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT);
//getValues('areas', AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT);
//create();
//create(AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT, AZURE_DEVOPS_WORK_ITEM_TYPE);
//get(AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT, 'SCM Ing Back Office');
create2(AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT);