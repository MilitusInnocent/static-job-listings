const jobBoard = document.getElementById('job-board')

// --- JSON request -- //

const requestURL = 'data.json'
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.send();

request.onload = function() {
  const jobDataContent = request.response;
  const jobData = JSON.parse(jobDataContent)
  appendJobs(jobData);
} 

// --- Append Job function -- //

function appendJobs(jsonObj) {
  for (let i in jsonObj) {

    // --- Job section container --- //

    const section = document.createElement('section');
    section.className = 'board';

    // --- Company image --- //

    const imageContainer = document.createElement('div');
    imageContainer.className = 'board__company-logo';

    const logo = document.createElement('img');
    logo.src = jsonObj[i].logo;
    imageContainer.appendChild(logo);

    // --- Company information --- //

    const companyContainer = document.createElement('div');
    companyContainer.className = 'board__company-name';

    const companyName = document.createElement('p');
    companyName.innerText = jsonObj[i].company;
    companyContainer.appendChild(companyName);

    const newOfferTag = document.createElement('span');
    jsonObj[i].new ? newOfferTag.innerText = 'NEW!' : null;
    companyContainer.appendChild(newOfferTag);

    const featuredTag = document.createElement('span');
    jsonObj[i].featured ? featuredTag.innerText = 'FEATURED' : null;
    companyContainer.appendChild(featuredTag);

    // --- Job position information --- // 

    const jobPositionContainer = document.createElement('div');
    jobPositionContainer.className = 'board__job-position';

    const jobPosition = document.createElement('h1');
    jobPosition.innerText = jsonObj[i].position;
    jobPositionContainer.appendChild(jobPosition);

    // --- Job details information --- //

    const jobDetailContainer = document.createElement('div');
    jobDetailContainer.className = 'board__job-detail';

    const jobDetail = document.createElement('ul');
    jobDetailContainer.appendChild(jobDetail);

    const postedAt = document.createElement('li');
    postedAt.innerText = jsonObj[i].postedAt;
    jobDetail.appendChild(postedAt);

    const contract = document.createElement('li');
    contract.innerText = jsonObj[i].contract;
    jobDetail.appendChild(contract);

    const location = document.createElement('li');
    location.innerText = jsonObj[i].location;
    jobDetail.appendChild(location);

    // --- Tag section --- //

    const tagContainer = document.createElement('div');
    tagContainer.className = 'board__tag';

    const role = document.createElement('span');
    role.innerText = jsonObj[i].role;
    role.className = 'tag';
    role.setAttribute('data-role', jsonObj[i].role.toLowerCase());
    tagContainer.appendChild(role);

    const level = document.createElement('span');
    level.innerText = jsonObj[i].level;
    level.className = 'tag';
    level.setAttribute('data-level', jsonObj[i].level.toLowerCase());
    tagContainer.appendChild(level);

    for (let language in jsonObj[i].languages) {
      const languages = document.createElement('span');
      languages.innerText = jsonObj[i].languages[language];
      languages.className = 'tag';
      languages.setAttribute('data-languages', jsonObj[i].languages[language].toLowerCase());
      tagContainer.appendChild(languages);
    }

    for (let tool in jsonObj[i].tools) {
      const tools = document.createElement('span');
      tools.innerText = jsonObj[i].tools[tool];
      tools.className = 'tag';
      tools.setAttribute('data-tools', jsonObj[i].tools[tool].toLowerCase());
      tagContainer.appendChild(tools);
    }

    // --- Append elements to section container --- //

    section.appendChild(imageContainer);
    section.appendChild(companyContainer);
    section.appendChild(jobPositionContainer);
    section.appendChild(jobDetailContainer);
    section.appendChild(tagContainer);

    // --- Append sections to body --- //

    jobBoard.appendChild(section);    
  }
}