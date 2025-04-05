import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Enquiries.css'; // You'll need to create this CSS file

const Enquiries = () => {
    const [pendingQueries, setPendingQueries] = useState([]);
    const [resolvedQueries, setResolvedQueries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { adminCity } = useParams();

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8000/api/queries/${adminCity}`)
            .then(response => response.json())
            .then(data => {
                setPendingQueries(data.pendingQueries);
                setResolvedQueries(data.resolvedQueries);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching queries:", error);
                setIsLoading(false);
            });
    }, [adminCity]);

    const resolveIssue = async (id) => {
        const resolutionMessage = prompt("Enter resolution message:");

        if (resolutionMessage) {
            try {
                await fetch(`http://localhost:8000/api/resolve-enquiry/${id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resolutionMessage }),
                });

                // Move resolved query from pending to resolved
                const resolvedQuery = pendingQueries.find(q => q._id === id);
                
                setPendingQueries(prev => prev.filter(query => query._id !== id));
                setResolvedQueries(prev => [...prev, {
                    ...resolvedQuery,
                    updatedAt: new Date().toISOString(),
                    resolutionMessage
                }]);
                
                alert("Issue resolved and client notified!");
            } catch (error) {
                console.error("Error resolving query:", error);
                alert("Failed to resolve the issue. Please try again.");
            }
        }
    };

    if (isLoading) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className="body"style={{backgroundColor:"white"}}>
        <div className="enquiries-container">
            <h1 className="dashboard-title">Admin Dashboard - {adminCity}</h1>

            <div className="tables-container">
                {/* Pending Enquiries Section */}
                <div className="query-section pending-section">
                    <div className="section-header pending-header">
                        <h2>Pending Enquiries</h2>
                        <p>{pendingQueries.length} issues awaiting resolution</p>
                    </div>
                    
                    <div className="table-container">
                        {pendingQueries.length > 0 ? (
                            <table className="queries-table">
                                <thead>
                                    <tr>
                                        <th>Client Name</th>
                                        <th>Issue</th>
                                        <th>Submitted On</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingQueries.map(query => (
                                        <tr key={query._id}>
                                            <td>{query.name}</td>
                                            <td className="message-cell">{query.message}</td>
                                            <td>{new Date(query.createdAt).toLocaleString()}</td>
                                            <td>
                                                <button 
                                                    onClick={() => resolveIssue(query._id)}
                                                    className="resolve-btn"
                                                >
                                                    Resolve
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-message">
                                No pending enquiries at this time
                            </div>
                        )}
                    </div>
                </div>

                {/* Resolved Enquiries Section */}
                <div className="query-section resolved-section">
                    <div className="section-header resolved-header">
                        <h2>Resolved Enquiries</h2>
                        <p>{resolvedQueries.length} issues successfully resolved</p>
                    </div>
                    
                    <div className="table-container">
                        {resolvedQueries.length > 0 ? (
                            <table className="queries-table">
                                <thead>
                                    <tr>
                                        <th>Client Name</th>
                                        <th>Issue</th>
                                        <th>Resolved On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resolvedQueries.map(query => (
                                        <tr key={query._id}>
                                            <td>{query.name}</td>
                                            <td className="message-cell">
                                                {query.message}
                                                {query.resolutionMessage && (
                                                    <div className="resolution-message">
                                                        Resolution: {query.resolutionMessage}
                                                    </div>
                                                )}
                                            </td>
                                            <td>{new Date(query.updatedAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-message">
                                No resolved enquiries yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Enquiries;