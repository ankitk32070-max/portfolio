const fs = require('fs');
const mammoth = require('mammoth');

async function extract() {
  try {
    const result = await mammoth.extractRawText({ path: 'resume.docx' });
    const text = result.value;
    fs.writeFileSync('resume.txt', text, 'utf8');
    console.log('Extracted resume text to resume.txt');
  } catch (err) {
    console.error('Failed to extract resume:', err);
    process.exitCode = 1;
  }
}

extract();
