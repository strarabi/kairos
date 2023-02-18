import { FormEvent, useEffect, useState } from 'react'
import { useMutation, useQuery } from '../convex/_generated/react'



export default function App() {
  const assignments = useQuery('listAssignments') || []

  const [newClassNameText, setNewClassNameText] = useState('')
  const [newAssignmentNameText, setNewAssignmentNameText] = useState('')
  // const [newDueDateText, setNewDueDateText] = useState(0)
  const newDueDateInt = 1708282715; // random 2024 date
  const [newSourceUrlText, setNewSourceUrlText] = useState('')

  const addAssignment = useMutation('addAssignment')

  const [name, setName] = useState('user')

  useEffect(() => {
    setName('User ' + Math.floor(Math.random() * 10000))
  }, [])

  async function handleAddAssignment(event: FormEvent) {
    event.preventDefault()
    setNewAssignmentNameText('')
    setNewClassNameText('')
    // setNewDueDateText(0)
    setNewSourceUrlText('')
    await addAssignment(newClassNameText, newAssignmentNameText, BigInt(newDueDateInt), newSourceUrlText)
  }
  return (
    <main>
      <h1>Assignment List</h1>
      <p className="badge">
        <span>{name}</span>
      </p>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id.toString()}>
            <span>{assignment.class_name}:</span>
            <span>{assignment.assignment_name}</span>
            <span>{new Date(Number(assignment.due_date)).toLocaleDateString()}</span>
            <span>{assignment.source_url}</span>
            <span>{new Date(assignment._creationTime).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddAssignment}>
        <input
          value={newClassNameText}
          onChange={(event) => setNewClassNameText(event.target.value)}
          placeholder="Enter the class name"
        />
        <input
          value={newAssignmentNameText}
          onChange={(event) => setNewAssignmentNameText(event.target.value)}
          placeholder="Enter the assignment name"
        />
        {/* Todo insert some calendar component */}
        {/* <input
          value={newDueDateText}
          onChange={(event) => setNewDueDateText(event.target.value)}
          placeholder="Enter the due date"
        /> */}
        <input
          value={newSourceUrlText}
          onChange={(event) => setNewSourceUrlText(event.target.value)}
          placeholder="Enter the source url"
        />
        {/* || !newDueDateText */}
        <input type="submit" value="Send" disabled={!newAssignmentNameText || !newClassNameText  || !newSourceUrlText} />
      </form>
    </main>
  )
}
