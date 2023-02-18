import { FormEvent, useEffect, useState } from 'react'
import { useMutation, useQuery } from '../convex/_generated/react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { GenericId } from 'convex/values';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupEditComponent from './popupEditComponent';

export default function App() {
  const assignments = useQuery('listAssignments') || []

  const [newClassNameText, setNewClassNameText] = useState('')
  const [newAssignmentNameText, setNewAssignmentNameText] = useState('')
  const [newDueDate, setNewDueDate] = useState<Date | null>(new Date());
  const [newSourceUrlText, setNewSourceUrlText] = useState('')

  const addAssignment = useMutation('addAssignment')
  const deleteAssignment = useMutation('deleteAssignment')

  async function handleAddAssignment(event: FormEvent) {
    event.preventDefault()
    if (!newDueDate) return
    await addAssignment(newClassNameText, newAssignmentNameText, BigInt(newDueDate?.getTime()), newSourceUrlText)
    setNewAssignmentNameText('')
    setNewClassNameText('')
    setNewDueDate(new Date())
    setNewSourceUrlText('')
  }

  async function handleDeleteAssignment(id: GenericId<"assignment">) {
    await deleteAssignment(id)
  }

  return (
    <main>
      <h1>Assignment List</h1>

      <table id="assignment-list">
        <tr>
          <td>Class Name</td>
          <td>Assignment Name</td>
          <td>Due Date</td>
          <td>Source URL</td>
          <td>Date Added</td>
          <td> </td>
        </tr>
        {assignments.map((assignment) => (
          <tr key={assignment._id.toString()}>
            <td>{assignment.class_name}</td>
            <td>{assignment.assignment_name}</td>
            <td>{new Date(Number(assignment.due_date)).toLocaleDateString()}</td>
            <td><a href={assignment.source_url} target="_blank">{assignment.source_url}</a></td>
            <td>{new Date(assignment._creationTime).toLocaleDateString()}</td>
            <td className="last-col">
              <PopupEditComponent assignment_id={assignment._id} currentClassName={assignment.class_name} currentAssignmentName={assignment.assignment_name} currentDueDate={assignment.due_date} currentSourceURL={assignment.source_url}/>
              <button onClick={() => handleDeleteAssignment(assignment._id)}> ❌ </button>
              </td>
            </tr>
        ))}
      </table>
      <br/>
      <form onSubmit={handleAddAssignment}>
        <div className="input-section">
        <label htmlFor="class-name-input">Class Name</label>
        <input
          id = "class-name-input"
          value={newClassNameText}
          onChange={(event) => setNewClassNameText(event.target.value)}
          placeholder="Enter the class name"
        />
        </div>
        <div className="input-section">
        <label htmlFor="assignment-name-input" className = "required">Assignment Name</label>
        <input
          id="assignment-name-input"
          value={newAssignmentNameText}
          onChange={(event) => setNewAssignmentNameText(event.target.value)}
          placeholder="Enter the assignment name"
          required
        />
        </div>
        <div className="input-section">
        <label htmlFor="due-date-input" className = "required">Due Date</label>
        <DatePicker
          id = "due-date-input"
          selected={newDueDate}
          onChange={(d) => setNewDueDate(d)}
          required
        />
        </div>
        <div className="input-section">
        <label htmlFor="source-url-input">Source URL</label>
        <input
          id = "source-url-input"
          value={newSourceUrlText}
          onChange={(event) => setNewSourceUrlText(event.target.value)}
          placeholder="Enter the source url"
        />
        </div>
        <input type="submit" value="Send" disabled={!newAssignmentNameText || !newDueDate} />

      </form>
    </main>
  )
}
