import { useState } from 'react';
import { jsPDF } from 'jspdf';
import './Resumebuilder.css';

const Resumebuilder = () => {
    const [formData, setFormData] = useState({
        name: 'John Doe',
        jobTitle: 'Software Engineer',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: 'New York, NY, USA',
        linkedIn: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        certifications: 'Certified Java Developer | Oracle | 2021',
        languages: 'English | Fluent',
        about: 'Experienced software engineer with expertise...',
        skills: ['JavaScript'],
        education: 'B.Sc. Computer Science | XYZ University | 2016-2020',
        workExperience: 'Software Engineer | TechCorp | 2020-Present | Developed web apps'
    });

    const [profileImage, setProfileImage] = useState(null); // State to hold the profile image

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Update image state with the uploaded image
            };
            reader.readAsDataURL(file);
        }
    };

    const addField = (field) => {
        setFormData({
            ...formData,
            [field]: [...formData[field], '']
        });
    };

    const downloadResume = () => {
        const doc = new jsPDF();

        // Add user details to PDF
        doc.text(formData.name, 10, 10);
        doc.text(formData.jobTitle, 10, 20);
        doc.text(formData.email, 10, 30);
        doc.text(formData.phone, 10, 40);
        doc.text(formData.address, 10, 50);
        // Optionally include image when downloading
        // doc.addImage(profileImage, 'PNG', 15, 15, 40, 40); 
        doc.save('resume.pdf');
    };

    return (
        <div className="container">
            <div className="form-section">
                <h2>According To your information change it</h2>
                <form>
                    <label>Profile Picture</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />

                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

                    <label>Job Title</label>
                    <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />

                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />

                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} />

                    <label>LinkedIn</label>
                    <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleInputChange} />

                    <label>GitHub</label>
                    <input type="url" name="github" value={formData.github} onChange={handleInputChange} />

                    <label>Certifications</label>
                    <textarea name="certifications" rows="2" value={formData.certifications} onChange={handleInputChange}></textarea>

                    <label>Languages</label>
                    <textarea name="languages" rows="2" value={formData.languages} onChange={handleInputChange}></textarea>

                    <label>About Me</label>
                    <textarea name="about" rows="3" value={formData.about} onChange={handleInputChange}></textarea>

                    <label>Skills</label>
                    {formData.skills.map((skill, index) => (
                        <input key={index} type="text" value={skill} onChange={(e) => {
                            const updatedSkills = [...formData.skills];
                            updatedSkills[index] = e.target.value;
                            setFormData({ ...formData, skills: updatedSkills });
                        }} />
                    ))}
                    <button type="button" onClick={() => addField('skills')}>Add Skill</button>

                    <label>Education</label>
                    <textarea name="education" rows="2" value={formData.education} onChange={handleInputChange}></textarea>

                    <label>Work Experience</label>
                    <textarea name="workExperience" rows="3" value={formData.workExperience} onChange={handleInputChange}></textarea>

                    <button type="button" onClick={downloadResume}>Download Resume</button>
                </form>
            </div>

            <div className="resume">
                <div className="left-panel">
                    <div className="photo" style={{ backgroundImage: `url(${profileImage})` }}></div>
                    <div className="contact">
                        <h3>Contact</h3>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                        <p>{formData.address}</p>
                        <p>LinkedIn: <a href={formData.linkedIn}>{formData.linkedIn}</a></p>
                        <p>GitHub: <a href={formData.github}>{formData.github}</a></p>
                    </div>
                    <div className="skills">
                        <h3>Skills</h3>
                        <ul>
                            {formData.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="right-panel">
                    <h1>{formData.name}</h1>
                    <h2>{formData.jobTitle}</h2>
                    <div className="about">
                        <h3>About Me</h3>
                        <p>{formData.about}</p>
                    </div>
                    <div className="certifications">
                        <h3>Certifications</h3>
                        <ul>
                            <li>{formData.certifications}</li>
                        </ul>
                    </div>
                    <div className="languages">
                        <h3>Languages</h3>
                        <ul>
                            <li>{formData.languages}</li>
                        </ul>
                    </div>

                    <div className="education">
                        <h3>Education</h3>
                        <ul>
                            <li>{formData.education}</li>
                        </ul>
                    </div>
                    <div className="work-experience">
                        <h3>Work Experience</h3>
                        <div className="job">
                            <p>{formData.workExperience}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resumebuilder;
