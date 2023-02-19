import { FormEvent, useEffect, useState } from 'react'
import { useMutation, useQuery } from '../convex/_generated/react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { GenericId } from 'convex/values';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupEditComponent from './PopupEditComponent';
import ICalendarLink from "react-icalendar-link";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import { Id } from '../convex/_generated/dataModel';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
// import { Button } from 'react-bootstrap';

export default function App() {

  /*! ics.js Wed Sept 14 2017 */
  // var ics=function(e,t){"use strict";{if(!(navigator.userAgent.indexOf("MSIE")>-1&&-1==navigator.userAgent.indexOf("MSIE 10"))){void 0===e&&(e="default"),void 0===t&&(t="Calendar");var r=-1!==navigator.appVersion.indexOf("Win")?"\r\n":"\n",n=[],i=["BEGIN:VCALENDAR","PRODID:"+t,"VERSION:2.0"].join(r),o=r+"END:VCALENDAR",a=["SU","MO","TU","WE","TH","FR","SA"];return{events:function(){return n},calendar:function(){return i+r+n.join(r)+o},addEvent:function(t,i,o,l,u,s){if(void 0===t||void 0===i||void 0===o||void 0===l||void 0===u)return!1;if(s&&!s.rrule){if("YEARLY"!==s.freq&&"MONTHLY"!==s.freq&&"WEEKLY"!==s.freq&&"DAILY"!==s.freq)throw"Recurrence rrule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'";if(s.until&&isNaN(Date.parse(s.until)))throw"Recurrence rrule 'until' must be a valid date string";if(s.interval&&isNaN(parseInt(s.interval)))throw"Recurrence rrule 'interval' must be an integer";if(s.count&&isNaN(parseInt(s.count)))throw"Recurrence rrule 'count' must be an integer";if(void 0!==s.byday){if("[object Array]"!==Object.prototype.toString.call(s.byday))throw"Recurrence rrule 'byday' must be an array";if(s.byday.length>7)throw"Recurrence rrule 'byday' array must not be longer than the 7 days in a week";s.byday=s.byday.filter(function(e,t){return s.byday.indexOf(e)==t});for(var c in s.byday)if(a.indexOf(s.byday[c])<0)throw"Recurrence rrule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'"}}var g=new Date(l),d=new Date(u),f=new Date,S=("0000"+g.getFullYear().toString()).slice(-4),E=("00"+(g.getMonth()+1).toString()).slice(-2),v=("00"+g.getDate().toString()).slice(-2),y=("00"+g.getHours().toString()).slice(-2),A=("00"+g.getMinutes().toString()).slice(-2),T=("00"+g.getSeconds().toString()).slice(-2),b=("0000"+d.getFullYear().toString()).slice(-4),D=("00"+(d.getMonth()+1).toString()).slice(-2),N=("00"+d.getDate().toString()).slice(-2),h=("00"+d.getHours().toString()).slice(-2),I=("00"+d.getMinutes().toString()).slice(-2),R=("00"+d.getMinutes().toString()).slice(-2),M=("0000"+f.getFullYear().toString()).slice(-4),w=("00"+(f.getMonth()+1).toString()).slice(-2),L=("00"+f.getDate().toString()).slice(-2),O=("00"+f.getHours().toString()).slice(-2),p=("00"+f.getMinutes().toString()).slice(-2),Y=("00"+f.getMinutes().toString()).slice(-2),U="",V="";y+A+T+h+I+R!=0&&(U="T"+y+A+T,V="T"+h+I+R);var B,C=S+E+v+U,j=b+D+N+V,m=M+w+L+("T"+O+p+Y);if(s)if(s.rrule)B=s.rrule;else{if(B="rrule:FREQ="+s.freq,s.until){var x=new Date(Date.parse(s.until)).toISOString();B+=";UNTIL="+x.substring(0,x.length-13).replace(/[-]/g,"")+"000000Z"}s.interval&&(B+=";INTERVAL="+s.interval),s.count&&(B+=";COUNT="+s.count),s.byday&&s.byday.length>0&&(B+=";BYDAY="+s.byday.join(","))}(new Date).toISOString();var H=["BEGIN:VEVENT","UID:"+n.length+"@"+e,"CLASS:PUBLIC","DESCRIPTION:"+i,"DTSTAMP;VALUE=DATE-TIME:"+m,"DTSTART;VALUE=DATE-TIME:"+C,"DTEND;VALUE=DATE-TIME:"+j,"LOCATION:"+o,"SUMMARY;LANGUAGE=en-us:"+t,"TRANSP:TRANSPARENT","END:VEVENT"];return B&&H.splice(4,0,B),H=H.join(r),n.push(H),H},download:function(e,t){if(n.length<1)return!1;t=void 0!==t?t:".ics",e=void 0!==e?e:"calendar";var a,l=i+r+n.join(r)+o;if(-1===navigator.userAgent.indexOf("MSIE 10"))a=new Blob([l]);else{var u=new BlobBuilder;u.append(l),a=u.getBlob("text/x-vCalendar;charset="+document.characterSet)}return saveAs(a,e+t),l},build:function(){return!(n.length<1)&&i+r+n.join(r)+o}}}console.log("Unsupported Browser")}};

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

function getEvent(assignment: {
  _id: Id<"assignment">;
  _creationTime: number;
  class_name: string;
  assignment_name: string;
  due_date: bigint;
  source_url: string;
}) {
    return {
      title: assignment.assignment_name,
      description: "Class: " + assignment.class_name + ", Source url: " + assignment.source_url,
      start: new Date(Number(assignment.due_date)).toLocaleDateString(),
      allDay: true
      };
  }

  async function exportSingleCalendar(assignment: {
    _id: Id<"assignment">;
    _creationTime: number;
    class_name: string;
    assignment_name: string;
    due_date: bigint;
    source_url: string;
}) {
    const link = google(getEvent(assignment));
    const win = window.open(link, '_blank');
    if (win != null) {
      win.focus();
    }
}

  async function exportAllCalendar() {
    const events = assignments.map((assignment) => {
      const link = google(getEvent(assignment));
      const win = window.open(link, '_blank');
      if (win != null) {
        win.focus();
      }
    }
    );

  }

  return (
    <main>
      {/* <Stack gap={3}> */}
      <h1>Assignment List</h1>

      <div className="table-wrapper">
      <table id="assignment-list">
        <tbody>
        <tr>
          <th>Class</th>
          <th>Assignment</th>
          <th>Due Date</th>
          <th>Source</th>
          <th>Date Created</th>
          <th className="last-col"><button className = "export-button" onClick={() => exportAllCalendar()}> Export all 🗓️ </button> </th>
        </tr>
        {assignments.map((assignment) => (
          <tr key={assignment._id.toString()} className="assignment-tr">
            <td>{assignment.class_name}</td>
            <td>{assignment.assignment_name}</td>
            <td>{new Date(Number(assignment.due_date)).toLocaleDateString()}</td>
            <td><a href={assignment.source_url} target="_blank">{assignment.source_url}</a></td>
            <td>{new Date(assignment._creationTime).toLocaleDateString()}</td>
            <td className="last-col">
              <PopupEditComponent assignment_id={assignment._id} currentClassName={assignment.class_name} currentAssignmentName={assignment.assignment_name} currentDueDate={assignment.due_date} currentSourceURL={assignment.source_url}/>
              <button className = "edit-delete-button" onClick={() => handleDeleteAssignment(assignment._id)}> ❌ </button>
              <button className = "export-single-button" onClick={() => exportSingleCalendar(assignment)}> 🗓️ </button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
      </div>
      <PopupEditComponent />
      {/* <br/> */}

      {/* <form onSubmit={handleAddAssignment} id="outer-form">
        <div className="input-section">
        <label htmlFor="class-name-input">Class</label>
        <input
          id = "class-name-input"
          value={newClassNameText}
          onChange={(event) => setNewClassNameText(event.target.value)}
          placeholder="Enter the class"
        />
        </div>
        <div className="input-section">
        <label htmlFor="assignment-name-input" className = "required">Assignment</label>
        <input
          id="assignment-name-input"
          value={newAssignmentNameText}
          onChange={(event) => setNewAssignmentNameText(event.target.value)}
          placeholder="Enter the assignment"
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
        <input type="submit" value="Add" disabled={!newAssignmentNameText || !newDueDate} />

      </form> */}
      {/* </Stack> */}
    </main>
  )
}
