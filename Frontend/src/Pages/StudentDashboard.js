import React, { useEffect, useState } from 'react';
import { FiBookmark, FiCheckCircle } from 'react-icons/fi';

const CompanyList = ({ studentId, onSuccess, filter }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(`http://localhost:8000/api/companies?filter=${filter}&studentId=${studentId}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch companies: ${res.status}`);
        }

        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error('Fail in fetching companies', err);
        setError('Failed to fetch companies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [filter, studentId]);

  const handleApply = async (companyId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/applications/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, companyId }),
      });

      if (!res.ok) throw new Error('Failed to apply');

      onSuccess(); 
    } catch (err) {
      console.error('Application failed:', err);
      alert('Application failed. Please try again.');
    }
  };

  if (loading) return <p>Loading opportunities...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="company-list">
      {companies.length === 0 ? (
        <p>No opportunities available.</p>
      ) : (
        companies.map((company) => (
          <div className="company-card" key={company._id}>
            <h3>{company.name}</h3>
            <p>{company.role}</p>
            <p><strong>Industry:</strong> {company.industry}</p>
            <p><strong>Deadline:</strong> {new Date(company.deadline).toLocaleDateString()}</p>
            
            <div className="actions">
              <button onClick={() => handleApply(company._id)}>
                <FiCheckCircle /> Apply
              </button>
              <button>
                <FiBookmark /> Save
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CompanyList;
