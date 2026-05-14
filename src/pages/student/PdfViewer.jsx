import "./PdfView.css";
import { FaDownload } from "react-icons/fa6";


const PdfViewer = ({ pdfUrl, pdfName }) => {
    const handleDownload = () => {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = pdfName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <div className="pdf-viewer-container" style={{
        border: '1px solid #e0e0e0',
        borderRadius: '20px',
        padding: '10px 15px',
        marginBottom: '16px',
        backgroundColor: '#fff'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap:"12px" }}>
            <img 
              src="/images/pdf.png" 
              alt="PDF Icon" 
              style={{ width: '50px', height: '50px', margin: 'auto' }}
            />
            <span style={{ fontWeight: '500' }}>{pdfName}</span>
          </div>
          {/* <button 
            onClick={handleDownload}
            style={{
              backgroundColor: '#4126A8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <img src="/images/pdfdwn.png" alt="Download" style={{ width: '16px', height: '16px' }} />
          </button> */}
          <FaDownload   style={{ width: '30px', height: '30px', cursor: 'pointer' }}
  onClick={handleDownload}/>

          {/* <img 
  src="/images/pdfdwn.png" 
  alt="Download" 
  style={{ width: '30px', height: '30px', cursor: 'pointer' }}
  onClick={handleDownload}
/> */}
        </div>
        {/* <div style={{
          height: '500px',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <iframe 
            src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="PDF Viewer"
          ></iframe>
        </div> */}
      </div>
    );
  };
  export default PdfViewer



















// import React, { useState } from 'react';
// import "./PdfView.css";

// const PdfViewer = ({ pdfUrl, pdfName }) => {
// //   const [fileSize, setFileSize] = useState('');
  
//   // Extract clean filename without extension
//   const cleanFileName = pdfName.replace('.pdf', '') || 'Document';

//   // Format file size
// //   const formatFileSize = (bytes) => {
// //     if (!bytes) return '0 KB';
// //     const k = 1024;
// //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
// //   };

//   // Get file size when component mounts
// //   React.useEffect(() => {
// //     const fetchFileSize = async () => {
// //       try {
// //         const response = await fetch(pdfUrl, { method: 'HEAD' });
// //         const size = response.headers.get('content-length');
// //         if (size) {
// //           setFileSize(formatFileSize(parseInt(size)));
// //         }
// //       } catch (error) {
// //         console.error('Error fetching file size:', error);
// //         setFileSize('Size unknown');
// //       }
// //     };

// //     fetchFileSize();
// //   }, [pdfUrl]);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = pdfName.endsWith('.pdf') ? pdfName : `${pdfName}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="pdf-viewer-container">
//       <div className="pdf-header">
//         <div className="pdf-icon-container">
//           <img 
//             src="/images/pdf-icon.svg" 
//             alt="PDF Icon" 
//             className="pdf-icon"
//           />
//         </div>
//         <div className="pdf-info">
//           <div className="pdf-name">{cleanFileName}</div>
//           {/* <div className="pdf-meta">PDF • {fileSize}</div> */}
//         </div>
//         <button 
//           onClick={handleDownload}
//           className="download-button"
//         >
//           <img 
//             src="/images/download-icon.svg" 
//             alt="Download" 
//             className="download-icon" 
//           />
//           Download
//         </button>
//       </div>
      
//       {/* No PDF preview shown - only download option */}
//     </div>
//   );
// };

// export default PdfViewer;