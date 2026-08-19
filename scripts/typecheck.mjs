import ts from 'typescript';
const configPath = ts.findConfigFile('.', ts.sys.fileExists, 'tsconfig.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, '.');
const program = ts.createProgram(parsed.fileNames, parsed.options);
const diagnostics = ts.getPreEmitDiagnostics(program);
for (const d of diagnostics) console.error(ts.formatDiagnostic(d, { getCurrentDirectory: ts.sys.getCurrentDirectory, getCanonicalFileName: x => x, getNewLine: () => '\n' }));
if (diagnostics.length) process.exit(1);
