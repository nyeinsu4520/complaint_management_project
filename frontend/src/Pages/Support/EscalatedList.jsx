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

// import { Link } from "react-router-dom";

// export default function SupportEscalated() {
//   const escalatedComplaints = [
//     {
//       id: 201,
//       title: "VPN Connection Issue",
//       severity: "HIGH",
//       status: "ESCALATED",
//       createdAt: "2025-01-14",
//     },
//     {
//       id: 202,
//       title: "Email Server Down",
//       severity: "MEDIUM",
//       status: "ESCALATED",
//       createdAt: "2025-01-15",
//     },
//   ];

//   return (
//     <div className="space-y-6">

//       {/* Page Title */}
//       <div>
//         <h2 className="text-2xl font-bold text-[#071952]">
//           Escalated Complaints
//         </h2>
//         <p className="text-gray-600">
//           Complaints escalated from Help Desk for further investigation
//         </p>
//       </div>

//       {/* List */}
//       <div className="bg-white rounded-lg shadow divide-y">
//         {escalatedComplaints.map((c) => (
//           <div
//             key={c.id}
//             className="p-4 flex justify-between items-center"
//           >
//             <div>
//               <h3 className="font-semibold text-lg">
//                 Complaint #{c.id}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {c.title}
//               </p>

//               <div className="flex gap-3 mt-2">
//                 <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
//                   {c.severity}
//                 </span>

//                 <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
//                   {c.status}
//                 </span>
//               </div>
//             </div>

//             <Link
//               to={`/support/complaint/${c.id}`}
//               className="text-[#37B7C3] font-semibold hover:underline"
//             >
//               View
//             </Link>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

