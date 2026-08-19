import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiUser } from 'react-icons/fi';
import { auditService } from '../../services/audit/AuditService';
import AuditTimeline from '../../components/audit/AuditTimeline';

export default function ActorActivityDetail() {
  const { staffId } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const decodedId = decodeURIComponent(staffId);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await auditService.getActorActivity(decodedId);
      setEvents(data);
      setLoading(false);
    }
    load();
  }, [decodedId]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Link to="/admin/audit/actors" className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-stone-100 transition-colors">
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Actor Activity Log</h1>
          <p className="text-sm text-text-muted mt-1 font-mono">{decodedId}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-text-muted">
            <FiUser size={24} />
          </div>
          <div>
            <h2 className="text-xl font-medium text-text-primary">{decodedId}</h2>
            <div className="flex items-center gap-4 mt-1 text-sm text-text-muted">
              <span>{events.length} Events Recorded</span>
              <span className="text-stone-300">•</span>
              <Link to={`/admin/settings/staff/${decodedId}`} className="text-text-primary hover:underline">View Staff Profile</Link>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg text-text-primary mb-6">Recent Activity</h3>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-20 bg-stone-100 rounded-lg"></div>
              <div className="h-20 bg-stone-100 rounded-lg"></div>
            </div>
          ) : (
            <AuditTimeline events={events} />
          )}
        </div>
      </div>
    </div>
  );
}
