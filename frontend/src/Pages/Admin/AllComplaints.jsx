import { useEffect, useState } from "react";
import { getAllComplaints } from "../../api/complaintApi";
import SimpleTable from "../../components/SimpleTable";

export default function AllComplaints(){
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllComplaints();
        setList(res.data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    }

    fetchData();
  }, []);
  
  const cols = [
    { key:'id', title:'ID' },
    { key:'details', title:'Details' },
    { key:'status', title:'Status' },
    { key:'severity', title:'Severity' },
  ];

  return (
    <div>
      <h2 className="text-xl mb-4">All Complaints</h2>
      <SimpleTable columns={cols} data={list}/>
    </div>
  );
}
