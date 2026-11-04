const { spawnSync } = require('child_process');
const path = require('path');

const comparison = process.argv[2];
if (!comparison || !comparison.includes('...')) {
  console.error('Usage: node scripts/check-changed-components.js <base>...<head>');
  process.exit(1);
}

const [base] = comparison.split('...');
const changed = spawnSync('git', ['diff', '--diff-filter=A', '--name-only', comparison], {
  cwd: path.resolve(__dirname, '../../..'),
  encoding: 'utf8',
});

if (changed.status !== 0) {
  console.error(changed.stderr || 'Unable to inspect added files.');
  process.exit(changed.status || 1);
}

const candidates = new Set();
for (const file of changed.stdout.split(/\r?\n/)) {
  const match = file.match(/^packages\/ui\/components\/([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\/index\.tsx$/);
  if (!match) continue;

  const baselineComponent = `${base}:packages/ui/components/${match[1]}/index.tsx`;
  const baseline = spawnSync('git', ['cat-file', '-e', baselineComponent], {
    cwd: path.resolve(__dirname, '../../..'),
    stdio: 'ignore',
  });
  if (baseline.status !== 0) candidates.add(match[1]);
}

if (candidates.size === 0) {
  console.log('No new UI component directories to check.');
  process.exit(0);
}

let failed = false;
for (const componentName of candidates) {
  const result = spawnSync(process.execPath, [path.join(__dirname, 'check-component.js'), componentName], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
  });
  if (result.status !== 0) failed = true;
}

process.exit(failed ? 1 : 0);
