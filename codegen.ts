// /codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const CMS_GRAPHQL_URL = process.env.CMS_GRAPHQL_URL!;
const CMS_TOKEN = process.env.CMS_TOKEN ?? '';

const config: CodegenConfig = {
  schema: [
    {
      [CMS_GRAPHQL_URL]: {
        headers: CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {},
      },
    },
  ],
  documents: 'src/services/cms/queries/**/*.graphql',
  generates: {
    'src/services/cms/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: { enumsAsTypes: true },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
