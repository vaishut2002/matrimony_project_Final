import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import { useLocation } from 'react-router-dom';
import { Form } from 'react-router-dom';

// Mock API endpoint
 // Replace with your API endpoint

const ProfilePage = () => {

    const location = useLocation();
    const { userId, isMyProfile } = location.state;
  const [userData, setUserData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            // Retrieve userId from session storage
            const id = userId;
            // Ensure userId exists
            if (!id) {
              console.error('No user ID found in session storage.');
              return;
            }
    
            // Construct the API endpoint URL with userId
            
            // Fetch user data
            const response = await axios.get(`http://localhost:8080/user/${id}`);
            setUserData(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
    };

    fetchUserData();
  }, []);

  const handleEdit = (section) => {
    setCurrentSection(section);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const handleSaveChanges = (event) => {
    event.preventDefault();
    // Update userData with the new values (e.g., from form inputs)
    // You can add form validation and other logic here
    const updatedData = {
        ...userData,
        fullName: event.target.fullName.value,
        email: event.target.email.value,
        // Add other updated fields here
    };
    setUserData(updatedData);
    setShowEditModal(false);
};

  return (
    <Container fluid>
      {/* Profile Header */}
      <Row className="text-center my-4">
        <Col>
          <Card style={{ width: '20rem', margin: '0 auto', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Profile" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
            <Card.Body>
              <Card.Title>{userData.fullName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{userData.email}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Basic Details Section */}
      <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-primary text-white">Basic Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Full Name:</strong> {userData.fullName}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> {userData.email}</ListGroup.Item>
              <ListGroup.Item><strong>Date of Birth:</strong> {userData.dob}</ListGroup.Item>
              <ListGroup.Item><strong>Gender:</strong> {userData.gender ? 'Male' : 'Female'}</ListGroup.Item>
              <ListGroup.Item><strong>Age:</strong> {userData.age}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                           
                                <Button variant="primary" onClick={() => handleEdit('basicDetails')}>
                                    Edit
                                </Button>
                         
                        )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Personal Details Section */}
      <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-secondary text-white">Personal Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Height:</strong> {userData.height} cm</ListGroup.Item>
              <ListGroup.Item><strong>Weight:</strong> {userData.weight} kg</ListGroup.Item>
              <ListGroup.Item><strong>Nationality:</strong> {userData.nationality.nationality}</ListGroup.Item>
              <ListGroup.Item><strong>Marital Status:</strong> {userData.maritalStatus.maritalstatus}</ListGroup.Item>
              <ListGroup.Item><strong>Mother Tongue:</strong> {userData.motherTongue.motherTongue}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                                <Button variant="primary" onClick={() => handleEdit('personalDetails')}>
                                    Edit
                                </Button>
                        )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lifestyle Information Section */}
      <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-success text-white">Lifestyle Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Vegetarian:</strong> {userData.vegeterain ? 'Yes' : 'No'}</ListGroup.Item>
              <ListGroup.Item><strong>Drinker:</strong> {userData.drinker ? 'Yes' : 'No'}</ListGroup.Item>
              <ListGroup.Item><strong>Smoker:</strong> {userData.smoker ? 'Yes' : 'No'}</ListGroup.Item>
              <ListGroup.Item><strong>Disabled:</strong> {userData.disabled ? 'Yes' : 'No'}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                           
                           <Button variant="primary" onClick={() => handleEdit('lifestyleInformation')}>
                               Edit
                           </Button>
                    
                   )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Religion Info Section */}
      <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-danger text-white">Religion Info</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Religion:</strong> {userData.religion.religion}</ListGroup.Item>
              <ListGroup.Item><strong>Caste:</strong> {userData.caste.caste}</ListGroup.Item>
              <ListGroup.Item><strong>Zodiac Sign:</strong> {userData.zodiacSign.zoidac_sign}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                           
                           <Button variant="primary" onClick={() => handleEdit('religionInformation')}>
                               Edit
                           </Button>
                    
                   )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Family Info Section */}
      <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-info text-white">Family Info</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Father's Name:</strong> {userData.fatherName}</ListGroup.Item>
              <ListGroup.Item><strong>Mother's Name:</strong> {userData.motherrName}</ListGroup.Item>
              <ListGroup.Item><strong>Total Siblings:</strong> {userData.totalSiblings}</ListGroup.Item>
              <ListGroup.Item><strong>Family Income:</strong> {userData.familyIncome}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                           
                           <Button variant="primary" onClick={() => handleEdit('familyInformation')}>
                               Edit
                           </Button>
                    
                   )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Professional Info Section */}
      <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-warning text-dark">Professional Info</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Education:</strong> {userData.education.degree}</ListGroup.Item>
              <ListGroup.Item><strong>University Name:</strong> {userData.universityName}</ListGroup.Item>
              <ListGroup.Item><strong>Company Name:</strong> {userData.companyName}</ListGroup.Item>
              <ListGroup.Item><strong>Annual Income:</strong> {userData.annualIncome}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                           
                           <Button variant="primary" onClick={() => handleEdit('professionalInformation')}>
                               Edit
                           </Button>
                    
                   )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

            {/* Astrological Info Section */}
            <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-dark text-white">Astrological Info</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Time of Birth:</strong> {userData.time}</ListGroup.Item>
              <ListGroup.Item><strong>Place of Birth:</strong> {userData.placeOfBirth}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                           
                           <Button variant="primary" onClick={() => handleEdit('astrologicalInformation')}>
                               Edit
                           </Button>
                    
                   )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Partner Preference Section */}
      <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-pink text-white">Partner Preference</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Preferred Marital Status:</strong> {userData.pref_maritalStatus.maritalstatus}</ListGroup.Item>
              <ListGroup.Item><strong>Preferred Age Range:</strong> {userData.minAge} - {userData.maxAge}</ListGroup.Item>
              <ListGroup.Item><strong>Preferred Education Degree:</strong> {userData.preferredEducation.degree}</ListGroup.Item>
              <ListGroup.Item><strong>Preferred City:</strong> {userData.preferredCity.city}</ListGroup.Item>
              <ListGroup.Item><strong>Preferred Religion:</strong> {userData.preferredReligion.religion}</ListGroup.Item>
              <ListGroup.Item><strong>Preferred Income:</strong> {userData.preferredIncome}</ListGroup.Item>
              <ListGroup.Item><strong>Vegetarian Preferred:</strong> {userData.vegeterainPreffered ? 'Yes' : 'No'}</ListGroup.Item>
              <ListGroup.Item><strong>Smoker Preferred:</strong> {userData.smokingPreffered ? 'Yes' : 'No'}</ListGroup.Item>
              <ListGroup.Item><strong>Drinking Preferred:</strong> {userData.drinkingPreffered ? 'Yes' : 'No'}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                           
                           <Button variant="primary" onClick={() => handleEdit('partnerPreference')}>
                               Edit
                           </Button>
                    
                   )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Residential Details Section */}
      <Row className="my-4">
        <Col>
          <Card style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="bg-info text-white">Residential Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>City:</strong> {userData.city.city}</ListGroup.Item>
              <ListGroup.Item><strong>Pincode:</strong> {userData.pincode}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {isMyProfile && (
                           
                           <Button variant="primary" onClick={() => handleEdit('residentialDeatils')}>
                               Edit
                           </Button>
                    
                   )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={closeEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {currentSection}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentSection === 'basicDetails' && (
                        <Form onSubmit={handleSaveChanges}>
                            <Form.Group controlId="formFullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    defaultValue={userData.fullName}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    defaultValue={userData.email}
                                />
                            </Form.Group>
                            {/* Add other form fields as needed */}
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    )}
                    {/* Add similar conditional rendering for other sections */}
                </Modal.Body>
            </Modal>
    </Container>
  );
};

export default ProfilePage;
