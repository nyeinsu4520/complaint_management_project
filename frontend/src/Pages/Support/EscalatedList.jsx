import { useEffect, useState } from "react";
import { getAllComplaints, resolveComplaint } from "../../api/complaintApi";
import SimpleTable from "../../components/SimpleTable";

export default function EscalatedList(){
  const [list,setList] = useState([]);
  useEffect(()=> getAllComplaints().then(r=>setList(r.data.filter(c=>c.status === 'ESCALATED'))).catch(()=>{}),[]);

  const resolve = (id) => {
    resolveComplaint(id,{ notes: "Resolved by support" }).then(()=> setList(l=>l.filter(it=>it.complaintId !== id))).catch(()=>alert("Failed"));
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Escalated Complaints</h2>
      <SimpleTable columns={[{key:'complaintId',title:'ID'},{key:'details',title:'Details'}]} data={list} actions={row => <button onClick={()=>resolve(row.complaintId)} className="px-2 py-1 bg-green-600 text-white rounded">Resolve</button>} />
    </div>
  );
}
