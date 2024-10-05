// import React from 'react';

// function OwnerReview() {
//   // Retrieve and parse the submitted requests from sessionStorage
//   const storedData = sessionStorage.getItem("request-data");
//   const submittedRequests = storedData ? JSON.parse(storedData) : [];

//   const handleApprove = (index) => {
//     console.log('Approved:', submittedRequests[index]);
//     // Add logic to update the status
//   };

//   const handleReject = (index) => {
//     console.log('Rejected:', submittedRequests[index]);
//     // Add logic to update the status
//   };

//   return (
//     <div className="owner-review">
//       <h2>Submitted Details</h2>
//       {submittedRequests.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Mobile</th>
//               <th>Email</th>
//               <th>No. of Children</th>
//               <th>No. of Adults</th>
//               <th>Current Address</th>
//               <th>Children Details</th>
//               <th>Adults Details</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submittedRequests.map((data, index) => (
//               <tr key={index}>
//                 <td>{data.name}</td>
//                 <td>{data.mobile}</td>
//                 <td>{data.email}</td>
//                 <td>{data.no_of_children}</td>
//                 <td>{data.no_of_adults}</td>
//                 <td>{data.current_address}</td>
//                 <td>
//                   {data.childrenDetails.map((child, i) => (
//                     <div key={i}>{child.name} (Age: {child.age})</div>
//                   ))}
//                 </td>
//                 <td>
//                   {data.adultsDetails.map((adult, i) => (
//                     <div key={i}>{adult.name} (Age: {adult.age})</div>
//                   ))}
//                 </td>
//                 <td>
//                   <button onClick={() => handleApprove(index)}>Approve</button>
//                   <button onClick={() => handleReject(index)}>Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No submitted details to review.</p>
//       )}
//     </div>
//   );
// }

// export default OwnerReview;
import React from 'react';

function OwnerReview() {
  return (
    <div className="owner-review">
      <h2>Submitted Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>No. of Children</th>
            <th>No. of Adults</th>
            <th>Current Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Suganthi S</td>
            <td>8825668922</td>
            <td>123@Gmail.com</td>
            <td>0</td>
            <td>1</td>
            <td>St.Tomas, Chennai, TamilNadu</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OwnerReview;
