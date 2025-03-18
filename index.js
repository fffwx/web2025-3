const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .requiredOption('-i, --input <path>', 'Input file path')
  .option('-o, --output <path>', 'Output file path')
  .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

const results = data
  .filter(item => item.indicator === "Доходи, усього" || item.indicator 
=== "Витрати, усього")
  .map(item => `${item.indicator}: ${item.value}`)
  .join("\n");

if (options.display) console.log(results);
if (options.output) fs.writeFileSync(options.output, results);



