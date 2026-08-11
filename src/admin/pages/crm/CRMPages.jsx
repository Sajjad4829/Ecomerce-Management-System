import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCRM } from '../../context/crm/CRMContext';
import { 
  BarChart2, Users, Target, Activity, Clock, CheckSquare, 
  ArrowLeft, Inbox, PieChart
} from 'lucide-react';

export const CRMDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">CRM Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Total Leads</div>
          <div className="text-3xl font-bold text-neutral-900">2,451</div>
          <div className="text-sm text-success mt-2">+12% vs last month</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Opportunities</div>
          <div className="text-3xl font-bold text-neutral-900">142</div>
          <div className="text-sm text-success mt-2">+5% vs last month</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Conversion Rate</div>
          <div className="text-3xl font-bold text-neutral-900">8.4%</div>
          <div className="text-sm text-neutral-500 mt-2">Backend calculation required</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Pipeline Value</div>
          <div className="text-3xl font-bold text-neutral-900">$1.2M</div>
          <div className="text-sm text-neutral-500 mt-2">Expected this quarter</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm min-h-[300px] flex flex-col">
          <h3 className="font-medium text-neutral-900 mb-4">Pipeline Distribution</h3>
          <div className="flex-1 border-2 border-dashed border-neutral-100 flex items-center justify-center bg-neutral-50">
            <span className="text-neutral-400">Chart Visualization Placeholder</span>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm min-h-[300px] flex flex-col">
          <h3 className="font-medium text-neutral-900 mb-4">Lead Trend</h3>
          <div className="flex-1 border-2 border-dashed border-neutral-100 flex items-center justify-center bg-neutral-50">
            <span className="text-neutral-400">Chart Visualization Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeadCenter = () => {
  const { leads } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Leads</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Lead</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Company</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Assigned To</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {leads.map(l => (
              <tr key={l.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{l.name}</td>
                <td className="px-6 py-4 text-neutral-600">{l.company}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${l.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-neutral-100 text-neutral-800'}`}>
                    {l.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-600">{l.priority}</td>
                <td className="px-6 py-4 text-neutral-600">{l.assignedTo}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/crm/leads/${l.id}`} className="text-primary hover:text-indigo-900 font-medium">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const LeadDetail = () => {
  const { leadId } = useParams();
  const { getLead } = useCRM();
  const lead = getLead(leadId) || useCRM().leads[0];
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/crm/leads" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">{lead.name}</h1>
            <p className="text-sm text-neutral-500 mt-1">{lead.company} | {lead.email}</p>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 border border-neutral-200 text-neutral-600 rounded hover:bg-neutral-50">Convert to Customer</button>
            <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Edit Lead</button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-medium text-neutral-900 mb-4">Lead Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-neutral-500">Phone</div><div className="font-medium mt-1">{lead.phone}</div></div>
              <div><div className="text-neutral-500">Source</div><div className="font-medium mt-1">{lead.source}</div></div>
              <div><div className="text-neutral-500">Status</div><div className="font-medium mt-1">{lead.status}</div></div>
              <div><div className="text-neutral-500">Priority</div><div className="font-medium mt-1">{lead.priority}</div></div>
              <div><div className="text-neutral-500">Estimated Value</div><div className="font-medium mt-1">{lead.estimatedValue}</div></div>
              <div><div className="text-neutral-500">Interested Product</div><div className="font-medium mt-1">{lead.interestedProduct}</div></div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-medium text-neutral-900 mb-4">Assignment</h3>
            <div className="text-sm">
              <div className="text-neutral-500">Assigned To</div>
              <div className="font-medium mt-1">{lead.assignedTo}</div>
              <button className="mt-4 text-primary hover:text-indigo-800 font-medium text-sm">Reassign</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeadSources = () => {
  const { leadSources } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Lead Sources</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Source</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Source Name</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {leadSources.map(s => (
              <tr key={s.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{s.name}</td>
                <td className="px-6 py-4 text-neutral-600">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SalesPipeline = () => {
  const { pipelineStages, opportunities } = useCRM();
  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden flex flex-col h-full">
      <div className="flex justify-between items-center shrink-0">
        <h1 className="text-2xl font-serif text-neutral-900">Sales Pipeline</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">New Opportunity</button>
      </div>
      <div className="flex-1 overflow-x-auto bg-neutral-100 p-4 rounded-lg flex gap-4 min-h-[500px]">
        {pipelineStages.map(stage => (
          <div key={stage.id} className="w-80 shrink-0 flex flex-col gap-3">
            <div className="font-medium text-neutral-700 flex justify-between items-center bg-surface p-3 rounded shadow-sm border border-neutral-200">
              <span>{stage.name}</span>
              <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded-full">
                {opportunities.filter(o => o.stage === stage.name).length}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {opportunities.filter(o => o.stage === stage.name).map(opp => (
                <div key={opp.id} className="bg-surface p-4 rounded-lg border border-neutral-200 shadow-sm hover:border-indigo-200 transition-colors cursor-pointer">
                  <div className="font-medium text-neutral-900">{opp.name}</div>
                  <div className="text-xs text-neutral-500 mt-1">{opp.customer}</div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-medium text-neutral-700">{opp.estimatedValue}</span>
                    <span className="text-xs text-neutral-500">{opp.assignedTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PipelineStages = () => {
  const { pipelineStages } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Pipeline Stages</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Stage</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Stage Name</th>
              <th className="px-6 py-4 font-medium">Probability</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {pipelineStages.map(s => (
              <tr key={s.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{s.order}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">{s.name}</td>
                <td className="px-6 py-4 text-neutral-600">{s.probability}</td>
                <td className="px-6 py-4 text-neutral-600">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const OpportunityCenter = () => {
  const { opportunities } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Opportunities</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">New Opportunity</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Customer/Lead</th>
              <th className="px-6 py-4 font-medium">Stage</th>
              <th className="px-6 py-4 font-medium">Value</th>
              <th className="px-6 py-4 font-medium">Expected Close</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {opportunities.map(o => (
              <tr key={o.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{o.name}</td>
                <td className="px-6 py-4 text-neutral-600">{o.customer}</td>
                <td className="px-6 py-4 text-neutral-600">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-soft text-indigo-700">{o.stage}</span>
                </td>
                <td className="px-6 py-4 font-medium text-neutral-900">{o.estimatedValue}</td>
                <td className="px-6 py-4 text-neutral-600">{o.expectedClose}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/crm/opportunities/${o.id}`} className="text-primary hover:text-indigo-900 font-medium">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const OpportunityDetail = () => {
  const { opportunityId } = useParams();
  const { getOpportunity } = useCRM();
  const opp = getOpportunity(opportunityId) || useCRM().opportunities[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/crm/opportunities" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">{opp.name}</h1>
            <p className="text-sm text-neutral-500 mt-1">{opp.customer}</p>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 border border-neutral-200 text-neutral-600 rounded hover:bg-neutral-50">Edit</button>
            <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Change Stage</button>
          </div>
        </div>
      </div>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div><div className="text-neutral-500">Stage</div><div className="font-medium mt-1">{opp.stage}</div></div>
          <div><div className="text-neutral-500">Value</div><div className="font-medium mt-1">{opp.estimatedValue}</div></div>
          <div><div className="text-neutral-500">Expected Close</div><div className="font-medium mt-1">{opp.expectedClose}</div></div>
          <div><div className="text-neutral-500">Assigned To</div><div className="font-medium mt-1">{opp.assignedTo}</div></div>
        </div>
      </div>
    </div>
  );
};

export const SalesActivities = () => {
  const { activities } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Sales Activities</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Activity</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Subject</th>
              <th className="px-6 py-4 font-medium">Related To</th>
              <th className="px-6 py-4 font-medium">Assigned To</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {activities.map(a => (
              <tr key={a.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{a.type}</td>
                <td className="px-6 py-4 text-neutral-600">{a.subject}</td>
                <td className="px-6 py-4 text-neutral-600">{a.relatedTo}</td>
                <td className="px-6 py-4 text-neutral-600">{a.assignedTo}</td>
                <td className="px-6 py-4 text-neutral-600">{a.dueDate}</td>
                <td className="px-6 py-4 text-neutral-600">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const FollowUps = () => {
  const { followUps } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Follow-ups</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Schedule Follow-up</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Related To</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Assigned To</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {followUps.map(f => (
              <tr key={f.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{f.relatedTo}</td>
                <td className="px-6 py-4 text-neutral-600">{f.type}</td>
                <td className="px-6 py-4 text-neutral-600">{f.assignedTo}</td>
                <td className="px-6 py-4 text-neutral-600">{f.dueDate}</td>
                <td className="px-6 py-4 text-neutral-600">{f.priority}</td>
                <td className="px-6 py-4 text-neutral-600">{f.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Tasks = () => {
  const { tasks } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Tasks</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Task</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Related To</th>
              <th className="px-6 py-4 font-medium">Assigned To</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {tasks.map(t => (
              <tr key={t.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{t.title}</td>
                <td className="px-6 py-4 text-neutral-600">{t.relatedTo}</td>
                <td className="px-6 py-4 text-neutral-600">{t.assignedTo}</td>
                <td className="px-6 py-4 text-neutral-600">{t.dueDate}</td>
                <td className="px-6 py-4 text-neutral-600">{t.priority}</td>
                <td className="px-6 py-4 text-neutral-600">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Segments = () => {
  const { segments } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Customer Segments</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Segment</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Segment Name</th>
              <th className="px-6 py-4 font-medium">Criteria</th>
              <th className="px-6 py-4 font-medium">Customer Count</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {segments.map(s => (
              <tr key={s.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{s.name}</td>
                <td className="px-6 py-4 text-neutral-600">{s.criteria}</td>
                <td className="px-6 py-4 text-neutral-600">{s.customerCount}</td>
                <td className="px-6 py-4 text-neutral-600">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const CustomerGroups = () => {
  const { customerGroups } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Customer Groups</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Group</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Group Name</th>
              <th className="px-6 py-4 font-medium">Purpose</th>
              <th className="px-6 py-4 font-medium">Members</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {customerGroups.map(c => (
              <tr key={c.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{c.name}</td>
                <td className="px-6 py-4 text-neutral-600">{c.purpose}</td>
                <td className="px-6 py-4 text-neutral-600">{c.members}</td>
                <td className="px-6 py-4 text-neutral-600">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Tags = () => {
  const { tags } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Customer Tags</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Tag</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Tag Name</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {tags.map(t => (
              <tr key={t.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{t.name}</td>
                <td className="px-6 py-4 text-neutral-600">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SalesTeams = () => {
  const { salesTeams } = useCRM();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Sales Teams</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Team</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Team Name</th>
              <th className="px-6 py-4 font-medium">Manager</th>
              <th className="px-6 py-4 font-medium">Members</th>
              <th className="px-6 py-4 font-medium">Lead Count</th>
              <th className="px-6 py-4 font-medium">Opportunity Count</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {salesTeams.map(t => (
              <tr key={t.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{t.name}</td>
                <td className="px-6 py-4 text-neutral-600">{t.manager}</td>
                <td className="px-6 py-4 text-neutral-600">{t.members}</td>
                <td className="px-6 py-4 text-neutral-600">{t.leadCount}</td>
                <td className="px-6 py-4 text-neutral-600">{t.opportunityCount}</td>
                <td className="px-6 py-4 text-neutral-600">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SalesForecast = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Sales Forecast</h1>
      </div>
      
      <div className="bg-warning-soft border border-amber-200 text-amber-800 p-4 rounded-lg text-sm">
        <strong>Backend sales forecasting required.</strong> This view currently displays placeholders.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Pipeline Value</div>
          <div className="text-3xl font-bold text-neutral-900">$2.4M</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Weighted Pipeline</div>
          <div className="text-3xl font-bold text-neutral-900">$1.1M</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Expected Revenue</div>
          <div className="text-3xl font-bold text-neutral-900">$850K</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Won Value (QTD)</div>
          <div className="text-3xl font-bold text-neutral-900">$320K</div>
        </div>
      </div>
    </div>
  );
};

export const CRMAnalytics = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">CRM Analytics & Conversions</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm min-h-[350px] flex flex-col">
          <h3 className="font-medium text-neutral-900 mb-4">Conversion Funnel</h3>
          <div className="flex-1 border-2 border-dashed border-neutral-100 flex items-center justify-center bg-neutral-50 flex-col gap-2">
            <span className="text-neutral-400">Lead → Contacted (45%)</span>
            <span className="text-neutral-400">Contacted → Qualified (30%)</span>
            <span className="text-neutral-400">Qualified → Opportunity (60%)</span>
            <span className="text-neutral-400">Opportunity → Won (25%)</span>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm min-h-[350px] flex flex-col">
          <h3 className="font-medium text-neutral-900 mb-4">Lead Source Distribution</h3>
          <div className="flex-1 border-2 border-dashed border-neutral-100 flex items-center justify-center bg-neutral-50">
            <PieChart className="w-12 h-12 text-neutral-300" />
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm min-h-[350px] flex flex-col">
          <h3 className="font-medium text-neutral-900 mb-4">Sales Activity by Type</h3>
          <div className="flex-1 border-2 border-dashed border-neutral-100 flex items-center justify-center bg-neutral-50">
            <span className="text-neutral-400">Chart Visualization Placeholder</span>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm min-h-[350px] flex flex-col">
          <h3 className="font-medium text-neutral-900 mb-4">Segment Distribution</h3>
          <div className="flex-1 border-2 border-dashed border-neutral-100 flex items-center justify-center bg-neutral-50">
            <span className="text-neutral-400">Chart Visualization Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};
