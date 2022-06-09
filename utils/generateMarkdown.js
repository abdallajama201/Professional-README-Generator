// function that returns a license badge based on which license is passed in
// Function will not be called if no license chosen
function renderLicenseBadge(license) {
    let licenseOption = ["Apache","BSD","Creative Commons","GNU","MIT","Zlib",];
    let badges = [
      "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
      "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
      "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)",
      "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
      "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
      "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)",      
    ]
    for(let i = 0; i < licenseOption.length; i++) {
      if(license === licenseOption[i]) {
        return badges[i];
      }
    }
}

// TODO: Create a function that returns the license link
// function will not be called if no license chosen
function renderLicenseLink(license) {
	let licenseOption = ["Apache","BSD","Creative Commons","GNU","MIT","Zlib",];
	let links = [
		"(https://opensource.org/licenses/Apache-2.0)",
		"(https://opensource.org/licenses/BSD-3-Clause)",
		"(http://creativecommons.org/publicdomain/zero/1.0/)",
		"(https://www.gnu.org/licenses/gpl-3.0)",
		"(https://opensource.org/licenses/MIT)",
		"(https://opensource.org/licenses/Zlib)", 
	]
	for(let i = 0; i < licenseOption.length; i++) {
		if(license === licenseOption[i]) {
		return `[${licenseOption[i]}]${links[i]}`;
		}
	}
} 

// generates markdown for README
function generateMarkdown(data) {
	const {title,description,installation,usage,contribution,testing,license,github,email} = data;
	const sections = [title,description,installation,usage,contribution,testing,license,github,email];
	const headings = ["title","Description","Installation","Usage","Contributing","Tests","License","Questions"];
	
	let markDown = "";
	let tableOfContents = "## Table of Contents\n";
	
	// Populates Title
	if(sections[0]) {
		markDown += `# ${sections[0]}\n`;
	}
	// Populates badge or just leaves space
	if(sections[6] !== "none") {
		markDown += `${renderLicenseBadge(license)}\n\n`;
	}else {
		markDown += `\n\n`;
	}
    // Populates middle section
    for (let i = 1; i < headings.length - 2; i++) {
		if(sections[i]) {
			markDown += `## ${headings[i]}\n\n${sections[i]}\n\n`;
			tableOfContents += `- [${headings[i]}](#${headings[i].toLowerCase()})\n`
		}
		// Leaves marker for table of contents
		if(i === 1) {
				markDown += `|\n`;
		}   
    }
    // Populates license section
    if(sections[6] !== "none") {
        markDown += `## ${headings[6]}\n\nThis project is under the ${license} license at ${renderLicenseLink(license)}\n\n`;
        tableOfContents += `- [${headings[6]}](#${headings[6].toLowerCase()})\n`
    }
    // Populates License section
    if(sections[7] || sections[8]) {
        markDown += `## ${headings[7]}\n\nIf you have additional questions please feel free to reach out.\n\n`;
        tableOfContents += `- [${headings[7]}](#${headings[7].toLowerCase()})\n`
        if(sections[7]) {
            markDown += `Github: https://www.github.com/${sections[7]}\n\n`;
        }
        if(sections[8]) {
            markDown += `Email: ${sections[8]}`
        }
    }
    // Inserts table of contents into middle
	if(tableOfContents !== "## Table of Contents\n") {
		let portions = markDown.split("|");
		markDown = `${portions[0]}${tableOfContents}\n\n${portions[1]}`;
	}else {
		return markDown;
	}
  	return markDown;
}

module.exports = generateMarkdown;