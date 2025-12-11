import { useEffect, useState } from "react";
import { getAssignedTo } from "../../api/complaintApi";
import SimpleTable from "../../components/SimpleTable";

export default function AssignedToMe(){
  const [list,setList] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    getAssignedTo(user.id).then(r=>setList(r.data)).catch(()=>{});
  },[]);

  return (
    <div>
      <h2 className="text-xl mb-4">Assigned to me</h2>
      <SimpleTable columns={[{key:'complaintId',title:'ID'},{key:'details',title:'Details'},{key:'status',title:'Status'}]} data={list}/>
    </div>
  );
}
