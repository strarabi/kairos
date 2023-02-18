import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState} from 'react';
import { useMutation} from '../convex/_generated/react'
import DatePicker from 'react-datepicker'
import { GenericId } from 'convex/values';
import { FormEvent } from 'react';


export default function PopupEditComponent(props: {assignment_id: GenericId<"assignment">, currentClassName: string, currentAssignmentName: string, currentDueDate: bigint, currentSourceURL:string}) {
  const [newClassNameText, setNewClassNameText] = useState(props.currentClassName)
  const [newAssignmentNameText, setNewAssignmentNameText] = useState(props.currentAssignmentName)
  const [newDueDate, setNewDueDate] = useState<Date | null>(new Date(Number(props.currentDueDate)));
  const [newSourceUrlText, setNewSourceUrlText] = useState(props.currentSourceURL)

  const replaceAssignment = useMutation('replaceAssignment')
  // 80% of screen width and height

  // // const contentStyle = { background: '#000',   // const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  // // const arrowStyle = { color: '#000' }; // style for an svg element

  async function handleEditAssignment(event: FormEvent) {
    event.preventDefault()
    if (!newDueDate) return
    await replaceAssignment(props.assignment_id, newClassNameText, newAssignmentNameText, BigInt(newDueDate?.getTime()), newSourceUrlText)
  }

  return (
  <Popup trigger={<button> ✏️</button>}
  // // {...{ modal, closeOnDocumentClick, contentStyle, overlayStyle, arrowStyle }}
  >
    <div className="popup-content"><form onSubmit={handleEditAssignment}>
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

      </form></div>
  </Popup>)
}
