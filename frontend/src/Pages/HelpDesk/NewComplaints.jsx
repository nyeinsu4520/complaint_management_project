import { useEffect, useState } from "react";
import { getNewComplaints, escalateComplaint } from "../../api/complaintApi";
import SimpleTable from "../../components/SimpleTable";

export default function NewComplaints(){
  const [list,setList] = useState([]);
  useEffect(()=> getNewComplaints().then(r=>setList(r.data)).catch(()=>{}),[]);

  const handleEscalate = (id) => {
    escalateComplaint(id, { reason: "Escalated by helpdesk" })
      .then(()=> setList(l=>l.filter(it=>it.complaintId !== id)))
      .catch(()=> alert("Escalation failed"));
  };

  const cols = [
    { key:'complaintId', title:'ID' },
    { key:'details', title:'Details' },
    { key:'severity', title:'Severity' },
  ];

  return (
    <div>
      <h2 className="text-xl mb-4">New Complaints</h2>
      <SimpleTable 
        columns={cols} 
        data={list} 
        actions={(row) => (
          <div className="flex gap-2">
            <button className="px-2 py-1 bg-[#37B7C3] text-white rounded" onClick={()=>handleEscalate(row.complaintId)}>Escalate</button>
          </div>
        )}
      />
    </div>
  );
}
