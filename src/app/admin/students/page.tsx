'use client';
import { useState, useEffect } from 'react';
// ... other imports

export default function StudentRoster() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // NEW Paging State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudents = async (page: number) => {
    setLoading(true);
    try {
      // Append the page number to the API request
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students?page=${page}&limit=20`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('bootcamp_token')}` }
      });
      const data = await res.json();
      
      setStudents(data.students);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents(1); // Load page 1 on initial render
  }, []);

  // ... rest of your UI code ...

  return (
    // ... inside your UI, beneath your student table, add the pagination controls:
    <div>
        {/* Your existing Table goes here */}

        <div className="flex justify-between items-center mt-6 border-t border-gray-800 pt-4">
            <button 
                onClick={() => fetchStudents(currentPage - 1)} 
                disabled={currentPage === 1}
                className="px-4 py-2 bg-darkBg border border-gray-700 rounded text-sm disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages}
            </span>
            <button 
                onClick={() => fetchStudents(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-darkBg border border-gray-700 rounded text-sm disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </div>
  );
}