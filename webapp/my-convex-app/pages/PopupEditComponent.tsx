import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState} from 'react';
import { useMutation} from '../convex/_generated/react'
import DatePicker from 'react-datepicker'
import { GenericId } from 'convex/values';
import { FormEvent } from 'react';


export default function PopupEditComponent(props: {assignment_id?: GenericId<"assignment">, currentClassName?: string, currentAssignmentName?: string, currentDueDate?: bigint, currentSourceURL?:string}) {
  // console.log("here")
  // console.log(props.assignment_id)
  const [newClassNameText, setNewClassNameText] = useState('hi') //useState(props.currentClassName ?? '')
  const [newAssignmentNameText, setNewAssignmentNameText] = useState('hi') // useState(props.currentAssignmentName ?? '')
  let initialDate;
  if (!props.currentDueDate || props.currentDueDate === undefined) {
    initialDate = new Date()
  } else {
    initialDate = new Date(Number(props.currentDueDate))
  }
  const [newDueDate, setNewDueDate] = useState(new Date())// useState<Date | null>(new Date());
  const [newSourceUrlText, setNewSourceUrlText] = useState("hi") //useState(props.currentSourceURL ?? '')

  let isEdit = true
  if (!props.assignment_id || props.assignment_id === undefined) {
    isEdit = false
  } 

  const replaceAssignment = useMutation('replaceAssignment')
  const addAssignment = useMutation('addAssignment')
  // 80% of screen width and height

  // contentStyle = { background: 'rgba(0,255,1,0.5)' };
  // overlayStyle = { background: 'rgba(0,0,0,0.5)' };

  const contentStyle = { background: 'rgba(240,240,240,1)'};
  const overlayStyle = { background: 'rgba(0,0, 0, 0.5)'};
  const arrowStyle = { color: '#000' }; // style for an svg element  const arrowStyle = { color: '#000' }; // style for an svg element

  async function handleEditAssignment(event: FormEvent) {
    event.preventDefault()
    if (!newDueDate || !props.assignment_id) return
    await replaceAssignment(props.assignment_id, newClassNameText, newAssignmentNameText, BigInt(newDueDate?.getTime()), newSourceUrlText)
  }

  async function handleAddAssignment(event: FormEvent) {
    event.preventDefault()
    if (!newDueDate) return
    await addAssignment(newClassNameText, newAssignmentNameText, BigInt(newDueDate?.getTime()), newSourceUrlText)
    setNewAssignmentNameText('')
    setNewClassNameText('')
    setNewDueDate(new Date())
    setNewSourceUrlText('')
  }

  return (
    <Popup trigger={<button className={isEdit?"edit-delete-button":"add-new-item"}> {isEdit?"✏️":"Add New"}</button>}
    modal
    nested
  {...{contentStyle, overlayStyle, arrowStyle }}  {...{ contentStyle, overlayStyle, arrowStyle }}
>
    {(close: () => void)=> (
    <div className="modal">
        <div className="modal-header">{isEdit? "Edit":"Add"} assignment</div>
        <div className="content">
        <form onSubmit={handleEditAssignment} className="popup-content">
        <div className="input-section">
        <label htmlFor="class-name-input">Class Name</label><br/>
        <input
          id = "class-name-input"
          value={newClassNameText}
          onChange={(event) => setNewClassNameText(event.target.value)}
          placeholder="Enter the class name"
        />
        </div>
        <div className="input-section">
        <label htmlFor="assignment-name-input" className = "required">Assignment Name</label><br/>
        <input
          id="assignment-name-input"
          value={newAssignmentNameText}
          onChange={(event) => setNewAssignmentNameText(event.target.value)}
          placeholder="Enter the assignment name"
          required
        />
        </div>
        <div className="input-section">
        <label htmlFor="due-date-input" className = "required">Due Date</label><br/>
        <DatePicker
          id = "due-date-input"
          selected={newDueDate}
          onChange={(d) => setNewDueDate(d)}
          required
        />
        </div>
        <div className="input-section">
        <label htmlFor="source-url-input">Source URL</label><br/>
        <input
          id = "source-url-input"
          value={newSourceUrlText}
          onChange={(event) => setNewSourceUrlText(event.target.value)}
          placeholder="Enter the source url"
        />
        </div>
        <button value={isEdit?"Update":"Add"} disabled={!newAssignmentNameText || !newDueDate} onClick={(event) => {
          if (isEdit) {
            handleEditAssignment(event); 
          } else {
            handleAddAssignment(event); 
          }
          console.log("modal closed"); 
          close();
          }}>{isEdit?"Update":"addAssignment"}</button>
      </form></div>
      </div>)}
  </Popup>)
}