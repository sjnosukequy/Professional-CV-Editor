const maxCharacters = 260; // limit the number of characters
const padding = 5
const inputEle = document.querySelector('#input')

function limitCharacters(input) {
  if (input.value.length > maxCharacters) {
    input.value = input.value.slice(0, maxCharacters);
  }
}


function updatePreview() {
  const preview = document.getElementById('cv-preview');
  preview.innerHTML = `
      <!-- Personal Info -->
      <div class="text-center">
          <h1 class="text-3xl font-bold">${document.getElementById('name').value}</h1>
          <div class="flex flex-wrap justify-center gap-2 mt-2 text-gray-600">
              ${PersonalInfo()}
          </div>
      </div>
  
      <!-- Summary -->
      ${document.getElementById('summary').value ? `
      <div>
          <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Summary</h2>
          <p class="text-gray-700 break-words">${document.getElementById('summary').value}</p>
      </div>` : ''}
  
      <!-- Experience -->
      <div>
          <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Experience</h2>
          ${Array.from(document.querySelectorAll('.experience-entry')).map(entry => {
    const fields = entry.querySelectorAll('input, textarea');
    return `
              <div>
                  <div class="flex justify-between">
                      <h3 class="font-semibold">${fields[0].value}</h3>
                      <span class="text-gray-600">${fields[3].value}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                      <span>${fields[1].value}</span>
                      <span>${fields[2].value}</span>
                  </div>
                  <ul class="list-disc ml-6 mt-2">
                      ${fields[4].value.split('\n').map(point => `<li class="text-gray-700">${point}</li>`).join('')}
                  </ul>
              </div>
            `;
  }).join('')}
      </div>
  
      <!-- Projects -->
      <div>
          <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Projects</h2>
          ${Array.from(document.querySelectorAll('.project-entry')).map(entry => {
    const fields = entry.querySelectorAll('input, textarea');
    return `
              <div>
                  <div class="flex justify-between">
                      <h3 class="font-semibold">${fields[0].value}</h3>
                      <span class="text-gray-600">${fields[1].value}</span>
                  </div>
                  <ul class="list-disc ml-6 mt-2">
                      ${fields[2].value.split('\n').map(point => `<li class="text-gray-700">${point}</li>`).join('')}
                  </ul>
              </div>
            `;
  }).join('')}
      </div>
  
      <!-- Education -->
      <div>
          <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Education</h2>
          ${Array.from(document.querySelectorAll('.education-entry')).map(entry => {
    const fields = entry.querySelectorAll('input');
    return `
              <div class="flex justify-between">
                  <div>
                      <h3 class="font-semibold">${fields[0].value}</h3>
                      <p class="text-gray-600">${fields[1].value}</p>
                  </div>
                  <div class="text-right">
                      <p class="text-gray-600">${fields[3].value}</p>
                      ${fields[2].value ? `<p class="text-gray-600">GPA: ${fields[2].value}</p>` : ''}
                  </div>
              </div>
            `;
  }).join('')}
      </div>
  
      <!-- Skills -->
      <div>
          <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Skills</h2>
          ${Array.from(document.querySelectorAll('.skills-entry')).map(entry => {
    const fields = entry.querySelectorAll('input');
    return `
              <div class="flex flex-row">
                  <p class="font-semibold">${fields[0].value}</p>
                  <p class="text-gray-600">: ${fields[1].value}</p>
              </div>
            `;
  }).join('')}
      </div>
    `;
}

function PersonalInfo() {
  const data = [];
  if (document.getElementById('location').value)
    data.push(document.getElementById('location').value);
  if (document.getElementById('email').value)
    data.push(document.getElementById('email').value);
  if (document.getElementById('linkedin').value)
    data.push(document.getElementById('linkedin').value);
  return data.join(' • ');
}

function PersonalInfo2() {
  const data = [];
  if (document.getElementById('github').value)
    data.push(document.getElementById('github').value);
  if (document.getElementById('website').value)
    data.push(document.getElementById('website').value);
  return data.join(' • ');
}

function deleteBlock(btn, containerId) {
  const container = document.getElementById(containerId);
  // Count only the block entries (child elements)
  if (container.children.length > 1) {
    btn.parentElement.remove();
    updatePreview();
  } else {
    alert("At least one block must remain in this section.");
  }
}

function addExperience() {
  const newEntry = document.createElement('div');
  newEntry.className = 'experience-entry';
  newEntry.innerHTML = `
      <input type="text" placeholder="Position" class="w-full p-2 border rounded">
      <input type="text" placeholder="Company" class="w-full p-2 border rounded mt-2">
      <input type="text" placeholder="Location" class="w-full p-2 border rounded mt-2">
      <input type="text" placeholder="Dates" class="w-full p-2 border rounded mt-2">
      <textarea placeholder="Bullet points (one per line)" class="w-full p-2 border rounded mt-2 h-24"></textarea>
      <button onclick="deleteBlock(this, 'experience-fields')" class="btn btn-error text-white px-2 py-1 rounded mt-2">
        Delete
      </button>
    `;
  document.getElementById('experience-fields').appendChild(newEntry);
  AutoUpdate();
}

function addEducation() {
  const newEntry = document.createElement('div');
  newEntry.className = 'education-entry space-y-4 mt-6';
  newEntry.innerHTML = `
      <input type="text" placeholder="University" class="w-full p-2 border rounded">
      <input type="text" placeholder="Degree" class="w-full p-2 border rounded">
      <input type="text" placeholder="GPA (optional)" class="w-full p-2 border rounded">
      <input type="text" placeholder="Graduation Date" class="w-full p-2 border rounded">
      <button onclick="deleteBlock(this, 'education-fields')" class="btn btn-error text-white px-2 py-1 rounded mt-2">
        Delete
      </button>
    `;
  document.getElementById('education-fields').appendChild(newEntry);
  AutoUpdate();
}

function addProject() {
  const newEntry = document.createElement('div');
  newEntry.className = 'project-entry';
  newEntry.innerHTML = `
      <input type="text" placeholder="Project Name" class="w-full p-2 border rounded">
      <input type="text" placeholder="Link" class="w-full p-2 border rounded mt-2">
      <textarea placeholder="Bullet points (one per line)" class="w-full p-2 border rounded mt-2 h-24"></textarea>
      <button onclick="deleteBlock(this, 'project-fields')" class="btn btn-error text-white px-2 py-1 rounded mt-2">
        Delete
      </button>
    `;
  document.getElementById('project-fields').appendChild(newEntry);
  AutoUpdate();
}

function addSkill() {
  const newEntry = document.createElement('div');
  newEntry.className = 'skills-entry space-y-4 mt-6';
  newEntry.innerHTML = `
      <input type="text" placeholder="Skill Name" class="w-full p-2 border rounded">
      <input type="text" placeholder="Description" class="w-full p-2 border rounded">
      <button onclick="deleteBlock(this, 'skills-fields')" class="btn btn-error text-white px-2 py-1 rounded mt-2">
        Delete
      </button>
    `;
  document.getElementById('skills-fields').appendChild(newEntry);
  AutoUpdate();
}

function AutoUpdate() {
  // Update preview on any input
  const obj = getObject()
  generatePDF(obj)
}
AutoUpdate();

let obj = {
  name: '',
  email: '',
  location: '',
  linkedin: '',
  github: '',
  website: '',
  summary: '',
  experiences: [{
    position: '',
    company: '',
    location: '',
    dates: '',
    bullets: ''
  }],
  educations: [{
    university: '',
    degree: '',
    gpa: '',
    graduationDate: ''
  }],
  projects: [{
    projectName: '',
    projectLink: '',
    bullets: ''
  }],
  skills: [{
    skill: '',
    description: ''
  }]
}

function getObject() {
  const name = document.getElementById('name')?.value;
  const email = document.getElementById('email')?.value;
  const location = document.getElementById('location')?.value;
  const linkedin = document.getElementById('linkedin')?.value;
  const github = document.getElementById('github')?.value;
  const website = document.getElementById('website')?.value;
  const summary = document.getElementById('summary')?.value;
  const experiences = Array.from(document.querySelectorAll('.experience-entry')).map((entry, index) => {
    const fields = entry.querySelectorAll('input, textarea');
    const position = fields[0].value;
    const company = fields[1].value;
    const location = fields[2].value;
    const dates = fields[3].value;
    const bullets = fields[4].value;
    console.log(index, fields);
    return { position, company, location, dates, bullets };
  });
  const projects = Array.from(document.querySelectorAll('.project-entry')).map(entry => {
    const fields = entry.querySelectorAll('input, textarea');
    const projectName = fields[0].value;
    const projectLink = fields[1].value;
    const bullets = fields[2].value;
    return { projectName, projectLink, bullets };
  });
  const skills = Array.from(document.querySelectorAll('.skills-entry')).map(entry => {
    const fields = entry.querySelectorAll('input');
    const skill = fields[0].value;
    const description = fields[1].value;
    return { skill, description };
  });
  const educations = Array.from(document.querySelectorAll('.education-entry')).map(entry => {
    const fields = entry.querySelectorAll('input');
    const university = fields[0].value;
    const degree = fields[1].value;
    const gpa = fields[2].value;
    const graduationDate = fields[3].value;
    return { university, degree, gpa, graduationDate };
  });
  const obj = { name, email, location, linkedin, github, website, summary, experiences, projects, skills, educations }
  console.log('get object', obj)
  return obj
}

function downloadJson() {
  const obj = getObject()
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" })
  const url = window.URL.createObjectURL(blob);
  const saveName = prompt("Enter a name for your save file");
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  // the filename you want
  a.download = `${saveName ? saveName : 'resume'}.json`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a)
}

// Generate a selectable PDF using jsPDF text functions
function generatePDF(obj, save = false) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
    putOnlyUsedFonts: true
  });
  let marginLeft = 40;
  let y = 40;
  const lineHeight = 16;
  var midPage = doc.internal.pageSize.getWidth() / 2
  let marginRight = doc.internal.pageSize.getWidth() - 40;
  let marginBottom = doc.internal.pageSize.getHeight() - 40;
  let marginTop = 40
  // const obj = getObject()

  const language = document.getElementById('language').value;
  if (language == 'Japanese') {
    doc.addFileToVFS('NotoSans-normal.ttf', RegJap);
    doc.addFileToVFS('NotoSans-bold.ttf', Boldjap);
  }
  else if (language == 'Korean') {
    doc.addFileToVFS('NotoSans-normal.ttf', KrRegular);
    doc.addFileToVFS('NotoSans-bold.ttf', KrBold);
  }
  else {
    doc.addFileToVFS('NotoSans-normal.ttf', font);
    doc.addFileToVFS('NotoSans-bold.ttf', fontBold);
  }
  doc.addFont("NotoSans-normal.ttf", "NotoSans", "normal");
  doc.addFont("NotoSans-bold.ttf", "NotoSans", "bold");

  const fonts = doc.getFontList();
  console.log(fonts);

  // Utility function to add wrapped text
  function addWrappedText(text, x, y, maxWidth) {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length;
  }

  function checkAndAddPage() {
    if (y > marginBottom) {
      console.log('adding page')
      doc.addPage('a4', 'p');
      y = marginTop
    }
  }

  // Personal Information
  doc.setFont('NotoSans', 'bold');
  doc.setFontSize(16);
  // const name = document.getElementById('name').value;
  const name = obj.name
  doc.text(name || "Your Name", midPage, y, { align: 'center' });
  y += lineHeight + padding;

  doc.setFont('NotoSans', 'normal');
  doc.setFontSize(10);
  const personalInfo = PersonalInfo();
  const personalInfo2 = PersonalInfo2();
  if (personalInfo) {
    const fullLength = doc.getStringUnitWidth(personalInfo) * 10;
    // let location = document.getElementById('location').value
    // let email = document.getElementById('email').value
    // let linkedin = document.getElementById('linkedin').value
    // let github = document.getElementById('github').value
    // let website = document.getElementById('website').value

    let location = obj.location
    let email = obj.email
    let linkedin = obj.linkedin
    let github = obj.github
    let website = obj.website

    // location
    let content = location ? `${location}` : '';
    let temp = location ? `${location}` : '';
    let tempLength = doc.getStringUnitWidth(temp) * 10;
    doc.text(content, midPage - (fullLength / 2 - tempLength), y, { align: 'right' });

    // email
    content = temp && email ? ` • ${email}` : email ? `${email}` : '';
    temp += temp && email ? ` • ${email}` : email ? `${email}` : '';
    tempLength = doc.getStringUnitWidth(temp) * 10;
    doc.text(content, midPage - (fullLength / 2 - tempLength), y, { align: 'right' });

    // linkedin
    content = temp && linkedin ? ` • ${linkedin}` : linkedin ? `${linkedin}` : '';
    temp += temp && linkedin ? ` • ${linkedin}` : linkedin ? `${linkedin}` : '';
    tempLength = doc.getStringUnitWidth(temp) * 10;
    if (content.includes('https://') || content.includes('www.')) {
      doc.setTextColor('#115bca')
      doc.setDrawColor('#115bca')
      doc.textWithLink(content, midPage - (fullLength / 2 - tempLength), y, { align: 'right' });
      const textWidth = doc.getStringUnitWidth(linkedin) * 10;
      doc.line(midPage - (fullLength / 2 - tempLength) - textWidth, y, midPage - (fullLength / 2 - tempLength), y);
      doc.setTextColor('#000000')
      doc.setDrawColor('#000000')
    }
    else
      doc.text(content, midPage - (fullLength / 2 - tempLength), y, { align: 'right' });

    console.log(fullLength - tempLength, fullLength, tempLength)

    y += lineHeight + padding;
  }

  if (personalInfo2) {
    const fullLength = doc.getStringUnitWidth(personalInfo2) * 10;

    let github = obj.github
    let website = obj.website

    // github
    let content = github ? `${github}` : '';
    let temp = github ? `${github}` : '';
    let tempLength = doc.getStringUnitWidth(temp) * 10;
    if (content.includes('https://') || content.includes('www.')) {
      doc.setTextColor('#115bca')
      doc.setDrawColor('#115bca')
      doc.textWithLink(content, midPage - (fullLength / 2 - tempLength), y, { align: 'right' });
      const textWidth = doc.getStringUnitWidth(github) * 10;
      doc.line(midPage - (fullLength / 2 - tempLength) - textWidth, y, midPage - (fullLength / 2 - tempLength), y);
      doc.setTextColor('#000000')
      doc.setDrawColor('#000000')
    }
    else
      doc.text(content, midPage - (fullLength / 2 - tempLength), y, { align: 'right' });

    // website
    content = temp && website ? ` • ${website}` : website ? `${website}` : '';
    temp += temp && website ? ` • ${website}` : website ? `${website}` : '';
    tempLength = doc.getStringUnitWidth(temp) * 10;
    if (content.includes('https://') || content.includes('www.')) {
      doc.setTextColor('#115bca')
      doc.setDrawColor('#115bca')
      doc.textWithLink(content, midPage - (fullLength / 2 - tempLength), y, { align: 'right' });
      const textWidth = doc.getStringUnitWidth(website) * 10;
      doc.line(midPage - (fullLength / 2 - tempLength) - textWidth, y, midPage - (fullLength / 2 - tempLength), y);
      doc.setTextColor('#000000')
      doc.setDrawColor('#000000')
    }
    else
      doc.text(content, midPage - (fullLength / 2 - tempLength), y, { align: 'right' });

    y += lineHeight + padding;
  }

  // Summary
  // const summary = document.getElementById('summary').value;
  const summary = obj.summary;
  if (summary.trim()) {
    doc.setFont('NotoSans', 'bold');
    doc.setFontSize(14);
    doc.text("Summary", marginLeft, y);
    doc.line(marginLeft, y + 5, marginRight, y + 5);
    y += lineHeight + padding;
    checkAndAddPage()

    doc.setFont('NotoSans', 'normal');
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(summary, 500);
    for (line in summaryLines) {
      doc.text(summaryLines[line], marginLeft, y);
      y += lineHeight;
      if (line == summaryLines.length - 1)
        y += 5
      checkAndAddPage()
    }
    // console.log(summaryLines)
  }

  // Skills Section
  const skillsEntries = obj.skills;
  if (skillsEntries.length) {
    const check = obj.skills
    if (check[0].skill || check[0].description) {
      doc.setFont('NotoSans', 'bold');
      doc.setFontSize(14);
      doc.text("Skills", marginLeft, y);
      doc.line(marginLeft, y + 5, marginRight, y + 5);
      y += lineHeight + padding;
      checkAndAddPage()

      skillsEntries.forEach((entry, index) => {
        // const fields = entry.querySelectorAll('input');
        // const skill = fields[0].value;
        // const description = fields[1].value;
        const skill = entry.skill;
        const description = entry.description;
        doc.setFontSize(10);
        let temp = skill ? `**${skill.trim()}**` : ''
        temp += temp && description ? `, ${description.trim()}` : description ? `${description.trim()}` : '';
        let startX = marginLeft;
        temp.split('**').forEach((line, index) => {
          doc.setFont('NotoSans', 'bold');
          if (index % 2 === 0) {
            doc.setFont('NotoSans', 'normal');
          }
          const tempLines = doc.splitTextToSize(line.trim(), 500 - doc.getStringUnitWidth(skill.trim()) * 10);
          // console.log(tempLines)
          for (let bline in tempLines) {
            doc.text(tempLines[bline], startX, y);
            if (bline == 0 && tempLines.length == 1)
              startX = startX + doc.getStringUnitWidth(tempLines[bline]) * 10;
            else if (tempLines.length > 1 && bline != tempLines.length - 1) {
              console.log('drop')
              startX = marginLeft;
              y += lineHeight
              checkAndAddPage()
            }
          }
          // doc.text(line, startX, y);
          // startX = startX + doc.getStringUnitWidth(line) * 10;
        })

        // doc.setFont('NotoSans', 'bold');
        // doc.text(skill, marginLeft, y);
        // doc.setFont('NotoSans', 'normal');
        // doc.text(skill ? " : " + description : description, doc.getTextWidth(skill) + marginLeft, y);

        if (index != skillsEntries.length - 1)
          y += lineHeight
        else
          y += lineHeight + padding
        checkAndAddPage()
      });
    }
  }

  // Experience Section
  const experienceEntries = obj.experiences;
  if (experienceEntries.length) {
    const check = obj.experiences
    if (check[0].position || check[0].company || check[0].location || check[0].dates || check[0].bullets) {
      doc.setFont('NotoSans', 'bold');
      doc.setFontSize(14);
      // y += lineHeight;
      doc.text("Experience", marginLeft, y);
      doc.line(marginLeft, y + 5, marginRight, y + 5);
      y += lineHeight + padding;
      checkAndAddPage()

      experienceEntries.forEach((entry, index) => {
        const position = entry.position;
        const company = entry.company;
        const location = entry.location;
        const dates = entry.dates;
        const bullets = entry.bullets.split('\n');

        doc.setFontSize(10);
        let temp = position ? `**${position.trim()}**` : ''
        temp += temp && company ? `, ${company.trim()}` : company ? `${company.trim()}` : '';
        temp += temp && location ? ` - **${location.trim()}**` : location ? `**${location.trim()}**` : '';
        let startX = marginLeft;
        temp.split('**').forEach((line, index) => {
          doc.setFont('NotoSans', 'bold');
          if (index % 2 === 0) {
            doc.setFont('NotoSans', 'normal');
          }
          doc.text(line, startX, y);
          startX = startX + doc.getStringUnitWidth(line) * 10;
        })
        doc.text(dates, doc.internal.pageSize.getWidth() - 40, y, { align: 'right' });
        y += lineHeight;
        checkAndAddPage()

        doc.setFont('NotoSans', 'normal');
        bullets.forEach((bullet, index) => {
          if (bullet.trim()) {
            const bulletLines = doc.splitTextToSize(bullet.trim(), 500);
            for (line in bulletLines) {
              if (line == 0)
                doc.text("•      " + bulletLines[line], marginLeft, y);
              else
                doc.text("        " + bulletLines[line], marginLeft, y);
              if (index != bullets.length - 1) {
                y += lineHeight;
                checkAndAddPage()
              }
            }
          }
        });
        if (index != experienceEntries.length - 1)
          y += lineHeight
        else
          y += padding
        checkAndAddPage()
      })
    }
  }

  // Projects Section
  const projectEntries = obj.projects;
  if (projectEntries.length) {
    const check = obj.projects
    if (check[0].projectName || check[0].projectLink || check[0].bullets) {
      doc.setFont('NotoSans', 'bold');
      doc.setFontSize(14);
      y += lineHeight;
      doc.text("Projects", marginLeft, y);
      doc.line(marginLeft, y + 5, marginRight, y + 5);
      y += lineHeight + padding;
      checkAndAddPage()


      projectEntries.forEach((entry, index) => {
        // const fields = entry.querySelectorAll('input, textarea');
        // const projectName = fields[0].value;
        // const projectLink = fields[1].value;
        // const bullets = fields[2].value.split('\n');
        const projectName = entry.projectName;
        const projectLink = entry.projectLink;
        const bullets = entry.bullets.split('\n');
        doc.setFont('NotoSans', 'bold');
        doc.setFontSize(10);
        doc.text(projectName, marginLeft, y);
        doc.setFont('NotoSans', 'normal');
        if (projectLink.includes('https://') || projectLink.includes('www.')) {
          doc.setTextColor('#115bca')
          doc.setDrawColor('#115bca')
          doc.textWithLink(projectLink, marginRight, y, { align: 'right' });
          const textWidth = doc.getStringUnitWidth(projectLink) * 10;
          doc.line(marginRight - textWidth, y, marginRight, y);
          doc.setTextColor('#000000')
          doc.setDrawColor('#000000')
        }
        else
          doc.text(projectLink, marginRight, y, { align: 'right' });
        y += lineHeight;
        checkAndAddPage()


        bullets.forEach((bullet, index) => {
          if (bullet.trim()) {
            const bulletLines = doc.splitTextToSize(bullet.trim(), 500);
            for (line in bulletLines) {
              if (line == 0)
                doc.text("•      " + bulletLines[line], marginLeft, y);
              else
                doc.text("        " + bulletLines[line], marginLeft, y);
              if (index != bullets.length - 1) {
                y += lineHeight;
                checkAndAddPage()
              }
            }
          }
        });

        if (index != projectEntries.length - 1)
          y += lineHeight
        else
          y += padding
        checkAndAddPage()
      });
    }
  }

  // Education Section
  const educationEntries = obj.educations
  if (educationEntries.length) {
    if (obj.educations[0].university || obj.educations[0].degree || obj.educations[0].gpa || obj.educations[0].graduationDate) {
      doc.setFont('NotoSans', 'bold');
      doc.setFontSize(14);
      y += lineHeight;
      doc.text("Education", marginLeft, y);
      doc.line(marginLeft, y + 5, marginRight, y + 5);
      y += lineHeight + padding;
      checkAndAddPage()

      educationEntries.forEach((entry, index) => {
        // const fields = entry.querySelectorAll('input');
        // const university = fields[0].value;
        // const degree = fields[1].value;
        // const gpa = fields[2].value;
        // const graduationDate = fields[3].value;

        const university = entry.university;
        const degree = entry.degree;
        const gpa = entry.gpa;
        const graduationDate = entry.graduationDate;

        doc.setFontSize(10);
        let temp = university ? `**${university.trim()}**` : ''
        temp += temp && degree ? `| ${degree.trim()}` : degree ? `${degree.trim()}` : '';
        temp += temp && gpa ? ` - GPA: ${gpa.trim()}` : gpa ? `GPA: ${gpa.trim()}` : '';
        let startX = marginLeft;
        temp.split('**').forEach((line, index) => {
          doc.setFont('NotoSans', 'bold');
          if (index % 2 === 0) {
            doc.setFont('NotoSans', 'normal');
          }
          doc.text(line, startX, y);
          startX = startX + doc.getStringUnitWidth(line) * 10;
        })

        doc.setFont('NotoSans', 'normal');
        doc.text(graduationDate, marginRight, y, { align: 'right' });

        if (index != educationEntries.length - 1)
          y += lineHeight
        else
          y += lineHeight + padding
        checkAndAddPage()
      });
    }
  }

  document.querySelector('#pdf-embed').setAttribute('data', doc.output('bloburl'));
  if (save) {
    const saveName = prompt("Enter a name for your save file");
    doc.save(`${saveName ? saveName : 'resume'}.pdf`)
  }

  // Open the PDF in a new window (selectable text)
  // window.open(doc.output('bloburl'), '_blank');
}

function downloadPDF() {
  const obj = getObject()
  generatePDF(obj, true)
}

function loadHtml(obj) {
  // const obj = getObject()
  document.getElementById('name').value = obj.name;
  document.getElementById('email').value = obj.email;
  document.getElementById('location').value = obj.location;
  document.getElementById('linkedin').value = obj.linkedin;
  document.getElementById('github').value = obj.github;
  document.getElementById('website').value = obj.website;
  document.getElementById('summary').value = obj.summary;

  // Delete all existing skill entries
  const skillEntries = document.querySelectorAll('.skills-entry');
  skillEntries.forEach((entry, index) => {
    if (index != 0)
      entry.remove();
  });

  const skills = obj.skills
  skills.map((skill, index) => {
    if (index == 0) {
      const inputs = document.querySelector('.skills-entry').querySelectorAll('input')
      inputs[0].value = skill.skill
      inputs[1].value = skill.description
    }
    else {
      const newEntry = document.createElement('div');
      newEntry.className = 'skills-entry space-y-4 mt-6';
      newEntry.innerHTML = `
          <input type="text" placeholder="Skill Name" class="w-full p-2 border rounded" value="${skill.skill}">
          <input type="text" placeholder="Description" class="w-full p-2 border rounded" value="${skill.description}">
          <button onclick="deleteBlock(this, 'skills-fields')" class="btn btn-error text-white px-2 py-1 rounded mt-2">
            Delete
          </button>
        `;
      document.getElementById('skills-fields').appendChild(newEntry);
    }
  })

  // Delete all existing experience entries
  const experienceEntries = document.querySelectorAll('.experience-entry');
  experienceEntries.forEach((entry, index) => {
    if (index != 0)
      entry.remove();
  });

  const exps = obj.experiences
  exps.map((exp, index) => {
    if (index == 0) {
      const inputs = document.querySelector('.experience-entry').querySelectorAll('input, textarea')
      inputs[0].value = exp.position
      inputs[1].value = exp.company
      inputs[2].value = exp.location
      inputs[3].value = exp.dates
      inputs[4].value = exp.bullets
    }
    else {
      const newEntry = document.createElement('div');
      newEntry.className = 'experience-entry';
      newEntry.innerHTML = `
          <input type="text" placeholder="Position" class="w-full p-2 border rounded" value="${exp.position}">
          <input type="text" placeholder="Company" class="w-full p-2 border rounded mt-2" value="${exp.company}">
          <input type="text" placeholder="Location" class="w-full p-2 border rounded mt-2" value="${exp.location}">
          <input type="text" placeholder="Dates" class="w-full p-2 border rounded mt-2" value="${exp.dates}">
          <textarea placeholder="Bullet points (one per line)" class="w-full p-2 border rounded mt-2 h-24" value="${exp.bullets}">${exp.bullets}</textarea>
          <button onclick="deleteBlock(this, 'experience-fields')" class="btn btn-error text-white px-2 py-1 rounded mt-2">
            Delete
          </button>
        `;
      document.getElementById('experience-fields').appendChild(newEntry);
    }
  })

  // Delete all existing project entries
  const projectEntries = document.querySelectorAll('.project-entry');
  projectEntries.forEach((entry, index) => {
    if (index != 0)
      entry.remove();
  });

  const projs = obj.projects
  projs.map((proj, index) => {
    if (index == 0) {
      const inputs = document.querySelector('.project-entry').querySelectorAll('input, textarea')
      inputs[0].value = proj.projectName
      inputs[1].value = proj.projectLink
      inputs[2].value = proj.bullets
    }
    else {
      const newEntry = document.createElement('div');
      newEntry.className = 'project-entry';
      newEntry.innerHTML = `
      <input type="text" placeholder="Project Name" class="w-full p-2 border rounded" value="${proj.projectName}">
      <input type="text" placeholder="Link" class="w-full p-2 border rounded mt-2" value="${proj.projectLink}">
      <textarea placeholder="Bullet points (one per line)" class="w-full p-2 border rounded mt-2 h-24" value="${proj.bullets}">${proj.bullets}</textarea>
      <button onclick="deleteBlock(this, 'project-fields')" class="btn btn-error text-white px-2 py-1 rounded mt-2">
        Delete
      </button>
    `;
      document.getElementById('project-fields').appendChild(newEntry);
    }
  })

  // Delete all existing education entries
  const educationEntries = document.querySelectorAll('.education-entry');
  educationEntries.forEach((entry, index) => {
    if (index != 0)
      entry.remove();
  });

  const edus = obj.educations
  edus.map((edu, index) => {
    if (index == 0) {
      const inputs = document.querySelector('.education-entry').querySelectorAll('input, textarea')
      inputs[0].value = edu.university
      inputs[1].value = edu.degree
      inputs[2].value = edu.gpa
      inputs[3].value = edu.graduationDate
    }
    else {
      const newEntry = document.createElement('div');
      newEntry.className = 'education-entry space-y-4 mt-6';
      newEntry.innerHTML = `
      <input type="text" placeholder="University" class="w-full p-2 border rounded" value="${edu.university}">
      <input type="text" placeholder="Degree" class="w-full p-2 border rounded" value="${edu.degree}">
      <input type="text" placeholder="GPA (optional)" class="w-full p-2 border rounded" value="${edu.gpa}">
      <input type="text" placeholder="Graduation Date" class="w-full p-2 border rounded" value="${edu.graduationDate}">
      <button onclick="deleteBlock(this, 'education-fields')" class="btn btn-error text-white px-2 py-1 rounded mt-2">
        Delete
      </button>
    `;
      document.getElementById('education-fields').appendChild(newEntry);
    }
  })
}

inputEle.onchange = async function () {
  document.querySelector('.err').innerText = ''
  if (inputEle.files.length == 0)
    return
  const file = inputEle.files[0]
  console.log(file)
  if (file.type != "application/json") {
    document.querySelector('.err').innerText = 'not a json file'
    return
  }
  const obj = JSON.parse(await inputEle.files[0].text())
  generatePDF(obj)
  loadHtml(obj)
  console.log(obj)
}

const radios = document.querySelectorAll('input[name="my_tabs"]')

radios[0].addEventListener('change', () => {
  document.querySelector('#cv-editor').classList.remove('hidden')
  document.querySelector('#ai-editor').classList.add('hidden')
})

radios[1].addEventListener('change', () => {
  document.querySelector('#ai-editor').classList.remove('hidden')
  document.querySelector('#cv-editor').classList.add('hidden')
})

const INSprompt = `Instruction Prompt:

You are tasked to generate a CV in JSON format based on the following input:

Input:
{
"Job-description": "job description",
"user-information": "user information if user doesn't include any relevant information feel free to make it up to make the CV more attractive",
"language": "CV preferred language"
}

Your output must be a JSON following the schema below:

{
"name": "",
"email": "",
"location": "",
"linkedin": "",
"github": "",
"website": "",
"summary": "",
"experiences": [{
"position": "",
"company": "",
"location": "",
"dates": "",
"bullets": ""
}],
"educations": [{
"university": "",
"degree": "",
"gpa": "",
"graduationDate": ""
}],
"projects": [{
"projectName": "",
"projectLink": "",
"bullets": ""
}],
"skills": [{
"skill": "",
"description": ""
}]
}

Context and Guidelines:

For the following fields, if the user does not provide data, leave them as empty strings:
name
email
location
linkedin
github
website
Summary Section:
Only include this section if you have relevant information that directly relates to the job description.
Do not use generic or boilerplate language (e.g., “passionate”).
Instead, provide a concise summary that highlights your skills or background in direct relation to the job.
Example 1: "Software Engineer with X years of full stack web development experience specializing in Ruby on Rails and PostgreSQL. Domain expert in e-commerce and payments field as a result of working at multiple e-commerce companies."
Example 2: "Senior Software Engineer @ Google with 5 years of experience leading teams."
Ensure that keywords or technologies mentioned in the job description are integrated appropriately.
Experiences Section:
Each experience should clearly show the position, company, location, dates of employment, and bullet points that summarize key achievements.
Use past-tense action verbs to start each bullet point.
Present the timeline and technologies clearly.
Projects:
Include projects that are relevant to the job.
Only list projects that are real and significant. Avoid trivial or tutorial-based ones.
If applicable, provide links to live demos or GitHub repositories.
Skills:
Select and highlight skills that are primarily relevant to the job.
Do not include an exhaustive list of every technology you have ever worked with.
Make sure that the skills are formatted in an organized manner, possibly grouping similar skills.
Or simply just list a list of the relevant skills.
Educations:
Clearly list the relevant educational background.
Omit GPA if it is not strong or if the user does not provide it.
Optionally include any notable academic achievements if they relate to the job.
Language:
Generate the CV in the language provided in the "language" field.
If the language is not specified, default to English.
Based on the above, generate the CV in JSON format, making sure to integrate relevant information from the job description and user information. If any user information is missing, you are free to create or enhance details to produce an attractive, tailored CV—but be careful not to add unnecessary or irrelevant content. Each section should be as concise and relevant as possible in relation to the prospective job.

─────────────────────────────

Example Output JSON (with placeholders):
{
"name": "",
"email": "",
"location": "",
"linkedin": "",
"github": "",
"website": "",
"summary": "",
"experiences": [{
"position": "",
"company": "",
"location": "",
"dates": "",
"bullets": ""
}],
"educations": [{
"university": "",
"degree": "",
"gpa": "",
"graduationDate": ""
}],
"projects": [{
"projectName": "",
"projectLink": "",
"bullets": ""
}],
"skills": [{
"skill": "",
"description": ""
}]
}

─────────────────────────────`

async function generateAI() {
  const JD = document.getElementById('JD').value;
  const yourself = document.getElementById('yourself').value;
  const language = document.getElementById('language').value;
  const error = document.querySelector('#AI-error');
  const aiLoader = document.querySelector('#AiLoader');
  error.innerText = '';
  if (!JD) {
    error.innerText = 'Job Description is required';
    return
  }
  try {
    aiLoader.classList.replace('hidden', 'flex');
    const res = await fetch('https://text.pollinations.ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "model": "openai-large",
        "response_format": {
          "type": "json_object"
        },
        "private": true,
        "reasoning_effort": "medium",
        "messages": [
          {
            "role": "developer",
            "content": INSprompt
          },
          {
            "role": "user",
            "content": JSON.stringify({
              "Job-description": JD,
              "user-information": yourself,
              "language": language
            })
          }
        ],
      })
    })
    const json = await res.json()
    json.experiences.map((value, index) => {
      json.experiences[index]['bullets'] = json.experiences[index]['bullets'].join('\n')
    })
    json.projects.map((value, index) => {
      json.projects[index]['bullets'] = json.projects[index]['bullets'].join('\n')
    })
    console.log(json)
    loadHtml(json)
    generatePDF(json)
  }
  catch (err) { console.log(err), error.innerText = err }
  finally { aiLoader.classList.replace('flex', 'hidden'); }
}