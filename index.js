const fs = require('fs');
const { program } = require('commander');

program
  .requiredOption('-i, --input <path>', 'Path to input JSON file')
  .option('-o, --output <path>', 'Path to output file')
  .option('-d, --display', 'Display results in console');

program.parse(process.argv);
const options = program.opts();

try {
  const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

  const results = data
    .filter(item => item.txt === "Доходи, усього" || item.txt === 
"Витрати, усього")
    .map(item => `${item.txt}: ${item.value}`)
    .join("\n");

  if (options.display) console.log(results);

  if (options.output) fs.writeFileSync(options.output, results, 'utf8');

} catch (error) {
  console.error("Error:", error.message);
}

