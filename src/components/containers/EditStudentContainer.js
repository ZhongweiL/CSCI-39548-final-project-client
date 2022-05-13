/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchAllStudentsThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      id: null,
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null,
      redirect: false, 
      redirectId: null
    };
  }

  // Get all student data from back-end database
  componentDidMount() {
    console.log(this.props);
    // Load student data if not already done so
    if (this.props.allStudents.length === 0)this.props.fetchAllStudents();
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        id: this.state.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa,
        campusId: this.state.campusId
    };

    // Edit student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the edited student
    this.setState({
      id: null,
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null,
      redirect: true, 
      redirectId: student.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
          allStudents={this.props.allStudents}
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    })
}

// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "allStudents".
// The following 2 input arguments are passed to the "connect" function used by "AllStudentContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    allStudents: state.allStudents,  // Get the State object from Reducer "allStudents"
  };
};  

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);