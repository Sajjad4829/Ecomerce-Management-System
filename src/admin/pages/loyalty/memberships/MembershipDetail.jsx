import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLoyalty } from '../../../context/loyalty/LoyaltyContext';
import { ArrowLeft, Star, Clock } from 'lucide-react';

export default function MembershipDetail() {
  const { membershipId } = useParams();
  const { memberships } = useLoyalty();
  const member = memberships.find(m => m.id === membershipId);

  if (!member) return <div className="p-8">Membership not found.</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/loyalty/memberships" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">{member.customerName}</h1>
            <p className="text-sm text-neutral-500 mt-1">Membership ID: {member.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6 md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">Loyalty Balance</h3>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-sm text-neutral-500">Available Points</div>
                <div className="text-3xl font-serif text-neutral-900 mt-1">{member.points}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Pending</div>
                <div className="text-xl font-serif text-neutral-600 mt-1">0</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Expiring Soon</div>
                <div className="text-xl font-serif text-red-600 mt-1">0</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
             <h3 className="text-sm font-medium text-neutral-900 mb-4">Activity Placeholder</h3>
             <div className="text-center text-neutral-500 py-8">
                <Clock className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                <p className="text-sm">Recent points activity will appear here.</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">Member Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-neutral-500">Tier</div>
                <div className="font-medium flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  {member.tier}
                </div>
              </div>
              <div>
                <div className="text-neutral-500">Status</div>
                <div className="font-medium mt-1">{member.status}</div>
              </div>
              <div>
                <div className="text-neutral-500">Joined</div>
                <div className="font-medium mt-1">{new Date(member.joinedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
