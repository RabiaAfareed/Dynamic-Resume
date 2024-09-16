let resumeOutputElement: any = document.getElementById('resumeoutput');


document.getElementById("resumeForm")?.addEventListener('submit', function (event) {
    event.preventDefault();

    let nameElement = document.getElementById('name') as HTMLInputElement;
    let emailElement = document.getElementById('email') as HTMLInputElement;
    let phoneElement = document.getElementById('phone') as HTMLInputElement;
    let educationElement = document.getElementById('Education') as HTMLInputElement;
    let experienceElement = document.getElementById('Experience') as HTMLInputElement;
    let skillsElement = document.getElementById('Skills') as HTMLInputElement;
    let profilePicElement = document.getElementById('profile-pic') as HTMLInputElement;

    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && profilePicElement) {
        let name = nameElement.value;
        let email = emailElement.value;
        let phone = phoneElement.value;
        let education = educationElement.value;
        let experience = experienceElement.value;
        let skills = skillsElement.value;

        // Use FileReader to handle the image upload
        let file = profilePicElement.files?.[0];
        let resumeOutput: any = "<h1>Resume</h1>";

        if (resumeOutputElement) {
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    // Append image to resume output
                    resumeOutput += `<img id="picture" src= ${e.target?.result} alt="Profile Picture" style="width:150px; height:150px;border-radius:50%;">`

                    resumeOutput += `
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <h3>Education</h3>
                    <p>${education}</p>
                    <h3>Experience</h3>
                    <p>${experience}</p>
                    <h3>Skills</h3>
                    <p>${skills}</p>
                    `;

                    resumeOutputElement.innerHTML = resumeOutput;
                };
                reader.readAsDataURL(file);

            } else {
                resumeOutputElement.innerHTML = resumeOutput;

                resumeOutput += `
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <h3>Education</h3>
                    <p>${education}</p>
                    <h3>Experience</h3>
                    <p>${experience}</p>
                    <h3>Skills</h3>
                    <p>${skills}</p>
                    `;
            }
        } else {
            console.error('The resume output element is missing');
        }

        // Generate the unique URL using the user's name
        const baseUrl = window.location.origin; // Get the base URL of the site
        const username = name ? name.toLowerCase().replace(/\s+/g, '-') : 'resume'; // Create a URL-friendly username
        const uniqueUrl = `${baseUrl}/index.html?user=${username}`;


        // Update the shareable link with the generated URL
        const resumeLink = document.getElementById('resumeLink') as HTMLButtonElement;
        resumeLink.addEventListener('click', () => {
            window.open(uniqueUrl); // Open the unique URL in a new tab
        });

       


        const copyLinkBtn = document.getElementById('copyLinkBtn') as HTMLButtonElement;

if (copyLinkBtn) {
  copyLinkBtn.addEventListener('click', () => {
    // Check if the clipboard API is supported by the browser
    if (navigator.clipboard && window.isSecureContext) {
      // Write the text to the clipboard
      navigator.clipboard.writeText(uniqueUrl)
        .then(() => {
          alert('Link copied to clipboard: ' + uniqueUrl); // Notify the user
        })
        .catch(err => {
          console.error('Failed to copy link: ', err);
        });
    } else {
      // Fallback for browsers that do not support the clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = uniqueUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Link copied to clipboard: ' + uniqueUrl);
      } catch (err) {
        console.error('Fallback: Failed to copy link', err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  });
}



    }
});

document.getElementById("printBtn")?.addEventListener('click', function () {
    window.print();
});



