const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..');
const componentName = process.argv[2];

function fail(message) {
  console.error(`UI component contract failed: ${message}`);
  process.exitCode = 1;
}

if (!componentName || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(componentName)) {
  console.error('Usage: yarn check:component <lowercase-kebab-name>');
  process.exit(1);
}

const pascalName = componentName
  .split('-')
  .map(part => part[0].toUpperCase() + part.slice(1))
  .join('');

const requiredFiles = [
  `components/${componentName}/index.tsx`,
  `components/${componentName}/interface.ts`,
  `components/${componentName}/style/index.ts`,
  `src/containers/${pascalName}/index.tsx`,
  `../../docs/ui/${componentName}.zh-CN.md`,
  `../../docs/ui/${componentName}.en-US.md`,
];

for (const relativePath of requiredFiles) {
  const absolutePath = path.resolve(packageRoot, relativePath);
  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    fail(`missing required file: ${relativePath}`);
  }
}

const testCandidates = [
  `__tests__/${componentName}.test.js`,
  `__tests__/${componentName}.test.ts`,
  `__tests__/${componentName}.test.tsx`,
];
if (!testCandidates.some(relativePath => fs.existsSync(path.resolve(packageRoot, relativePath)))) {
  fail(`missing focused test: one of ${testCandidates.join(', ')}`);
} else {
  const testPath = testCandidates.find(relativePath => fs.existsSync(path.resolve(packageRoot, relativePath)));
  const testSource = fs.readFileSync(path.resolve(packageRoot, testPath), 'utf8');
  if (!/\b(?:it|test)\s*\(/.test(testSource)) {
    fail(`focused test must declare at least one test case: ${testPath}`);
  }
}

const interfacePath = path.join(packageRoot, `components/${componentName}/interface.ts`);
if (fs.existsSync(interfacePath)) {
  const interfaceSource = fs.readFileSync(interfacePath, 'utf8');
  if (!new RegExp(`export\\s+(?:interface|type)\\s+${pascalName}Props\\b`).test(interfaceSource)) {
    fail(`${componentName}/interface.ts must export ${pascalName}Props`);
  }
}

const entryPath = path.join(packageRoot, 'components/index.ts');
if (fs.existsSync(entryPath)) {
  const entry = fs.readFileSync(entryPath, 'utf8');
  const componentExport = new RegExp(`export\\s*\\{\\s*default\\s+as\\s+${pascalName}\\s*\\}\\s*from\\s*['"]\\./${componentName}['"]`);
  const propsExport = new RegExp(`export\\s+type\\s*\\{[^}]*\\b${pascalName}Props\\b[^}]*\\}\\s*from\\s*['"]\\./${componentName}/interface['"]`);

  if (!componentExport.test(entry)) {
    fail(`components/index.ts must export ${pascalName} from './${componentName}'`);
  }
  if (!propsExport.test(entry)) {
    fail(`components/index.ts must export ${pascalName}Props from './${componentName}/interface'`);
  }
} else {
  fail('missing components/index.ts');
}

if (!process.exitCode) {
  console.log(`UI component contract passed: ${pascalName}`);
}
