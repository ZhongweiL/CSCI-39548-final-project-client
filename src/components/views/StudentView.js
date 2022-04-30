/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */

import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      {/* Display the image based on the image url */}
      <img src={student.imageUrl} width="300px" alt="student" />
      <p>email: {student.email}</p>
      <p>gpa: {student.gpa ? student.gpa: "N/A"}</p>
      {/* Display a message when the campus has no student */}
      {student.campus === null 
        ? <p> This student has no campus.</p>
        : <Link to={`/campus/${student.campus.id}`}>
            <h3>{student.campus.name}</h3>
          </Link>
      }
    </div>
  );

};

export default StudentView;