import React from 'react';
import { useHR } from '../../context/hr/HRContext';
import { Link, useParams } from 'react-router-dom';
import { Users, BarChart2, Briefcase, User, Calendar, Clock, Umbrella, CheckSquare, Star, ArrowLeft } from 'lucide-react';

export const HRDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">HR Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="text-sm text-neutral-500 font-medium mb-1">Total Employees</div>
          <div className="text-2xl font-bold text-neutral-900">120</div>
        </div>
        <div className="bg-surface p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="text-sm text-neutral-500 font-medium mb-1">On Leave</div>
          <div className="text-2xl font-bold text-neutral-900">5</div>
        </div>
        <div className="bg-surface p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="text-sm text-neutral-500 font-medium mb-1">Pending Leave Requests</div>
          <div className="text-2xl font-bold text-neutral-900">3</div>
        </div>
        <div className="bg-surface p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="text-sm text-neutral-500 font-medium mb-1">Open Positions</div>
          <div className="text-2xl font-bold text-neutral-900">8</div>
        </div>
      </div>
      <div className="bg-surface p-6 rounded-lg shadow-sm border border-neutral-200 text-center">
        <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Workforce Analytics Placeholder</h3>
        <p className="text-sm text-neutral-500 mt-1">Backend integrations required for real-time attendance tracking.</p>
      </div>
    </div>
  );
};

export const EmployeeDirectory = () => {
  const { employees } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Employee Directory</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Employee</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Position</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {employees.map(e => (
              <tr key={e.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-900">{e.name}</div>
                  <div className="text-neutral-500 text-xs">{e.employeeId}</div>
                </td>
                <td className="px-6 py-4 text-neutral-600">{e.department}</td>
                <td className="px-6 py-4 text-neutral-600">{e.position}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${e.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'}`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/hr/employees/${e.id}`} className="text-primary hover:text-indigo-900 font-medium">View Profile</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const EmployeeProfile = () => {
  const { employeeId } = useParams();
  const { getEmployee } = useHR();
  const emp = getEmployee(employeeId) || useHR().employees[0];
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/hr/employees" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">{emp.name}</h1>
          <p className="text-sm text-neutral-500 mt-1">{emp.position} | {emp.department}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg border border-neutral-200 p-6 shadow-sm">
          <h3 className="font-medium text-neutral-900 mb-4">Personal Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">Employee ID</span><span className="font-medium">{emp.employeeId}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Email</span><span className="font-medium">{emp.email}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Phone</span><span className="font-medium">{emp.phone}</span></div>
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-neutral-200 p-6 shadow-sm">
          <h3 className="font-medium text-neutral-900 mb-4">Employment</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">Employment Type</span><span className="font-medium">{emp.employmentType}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Joining Date</span><span className="font-medium">{emp.joiningDate}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Manager</span><span className="font-medium">{emp.manager}</span></div>
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-lg border border-neutral-200 p-6 shadow-sm text-center">
        <h3 className="font-medium text-neutral-900 mb-4 text-left">Employee Documents</h3>
        <p className="text-sm text-neutral-500 mb-4">Employment contracts and ID documents will appear here.</p>
        <button className="px-4 py-2 border border-neutral-200 rounded text-sm hover:bg-neutral-50">Upload Document</button>
      </div>
    </div>
  );
};

export const DepartmentCenter = () => {
  const { departments } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Departments</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Department</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Head</th>
              <th className="px-6 py-4 font-medium">Employee Count</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {departments.map(d => (
              <tr key={d.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{d.name}</td>
                <td className="px-6 py-4 text-neutral-600">{d.head}</td>
                <td className="px-6 py-4 text-neutral-600">{d.employeeCount}</td>
                <td className="px-6 py-4 text-neutral-600">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TeamCenter = () => {
  const { teams } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Teams</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Team</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Team Name</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Team Lead</th>
              <th className="px-6 py-4 font-medium">Employees</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {teams.map(t => (
              <tr key={t.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{t.name}</td>
                <td className="px-6 py-4 text-neutral-600">{t.department}</td>
                <td className="px-6 py-4 text-neutral-600">{t.teamLead}</td>
                <td className="px-6 py-4 text-neutral-600">{t.employeeCount}</td>
                <td className="px-6 py-4 text-neutral-600">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PositionCenter = () => {
  const { positions } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Positions</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Position</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Position Title</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Level</th>
              <th className="px-6 py-4 font-medium">Employees</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {positions.map(p => (
              <tr key={p.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{p.name}</td>
                <td className="px-6 py-4 text-neutral-600">{p.department}</td>
                <td className="px-6 py-4 text-neutral-600">{p.level}</td>
                <td className="px-6 py-4 text-neutral-600">{p.employeeCount}</td>
                <td className="px-6 py-4 text-neutral-600">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AttendanceCenter = () => {
  const { attendance } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Daily Attendance</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50">Export</button>
          <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Mark Attendance</button>
        </div>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Check In</th>
              <th className="px-6 py-4 font-medium">Check Out</th>
              <th className="px-6 py-4 font-medium">Hours</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {attendance.map(a => (
              <tr key={a.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{a.employee}</td>
                <td className="px-6 py-4 text-neutral-600">{a.date}</td>
                <td className="px-6 py-4 text-neutral-600">{a.checkIn}</td>
                <td className="px-6 py-4 text-neutral-600">{a.checkOut}</td>
                <td className="px-6 py-4 text-neutral-600">{a.workingHours}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${a.status === 'Present' ? 'bg-success-soft text-green-800' : 'bg-warning-soft text-amber-800'}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AttendanceCalendar = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Attendance Calendar</h1>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <Calendar className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Monthly Attendance View</h3>
        <p className="text-sm text-neutral-500 mt-1">Mock view only. Select dates to see attendance details.</p>
      </div>
    </div>
  );
};

export const ShiftCenter = () => {
  const { shifts } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Shift Management</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Shift</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Shift Name</th>
              <th className="px-6 py-4 font-medium">Start Time</th>
              <th className="px-6 py-4 font-medium">End Time</th>
              <th className="px-6 py-4 font-medium">Break</th>
              <th className="px-6 py-4 font-medium">Employees</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {shifts.map(s => (
              <tr key={s.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{s.name}</td>
                <td className="px-6 py-4 text-neutral-600">{s.startTime}</td>
                <td className="px-6 py-4 text-neutral-600">{s.endTime}</td>
                <td className="px-6 py-4 text-neutral-600">{s.breakTime}</td>
                <td className="px-6 py-4 text-neutral-600">{s.employees}</td>
                <td className="px-6 py-4 text-neutral-600">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const WorkScheduleCenter = () => {
  const { schedules } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Work Schedules</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Assign Schedule</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Schedule</th>
              <th className="px-6 py-4 font-medium">Working Days</th>
              <th className="px-6 py-4 font-medium">Shift</th>
              <th className="px-6 py-4 font-medium">Effective Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {schedules.map(s => (
              <tr key={s.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{s.employee}</td>
                <td className="px-6 py-4 text-neutral-600">{s.schedule}</td>
                <td className="px-6 py-4 text-neutral-600">{s.workingDays}</td>
                <td className="px-6 py-4 text-neutral-600">{s.shift}</td>
                <td className="px-6 py-4 text-neutral-600">{s.effectiveDate}</td>
                <td className="px-6 py-4 text-neutral-600">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const LeaveCenter = () => {
  const { leaves } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Leave Requests</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Submit Leave</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Leave ID</th>
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Duration</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {leaves.map(l => (
              <tr key={l.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{l.id}</td>
                <td className="px-6 py-4 text-neutral-600">{l.employee}</td>
                <td className="px-6 py-4 text-neutral-600">{l.type}</td>
                <td className="px-6 py-4 text-neutral-600">{l.duration}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${l.status === 'Approved' ? 'bg-success-soft text-green-800' : 'bg-warning-soft text-amber-800'}`}>
                    {l.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/hr/leaves/${l.id}`} className="text-primary hover:text-indigo-900 font-medium">Review</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const LeaveDetail = () => {
  const { leaveId } = useParams();
  const { getLeave } = useHR();
  const leave = getLeave(leaveId) || useHR().leaves[0];
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/hr/leaves" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">Leave {leave.id}</h1>
            <p className="text-sm text-neutral-500 mt-1">Employee: {leave.employee} | Type: {leave.type}</p>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 border border-neutral-200 text-danger rounded hover:bg-danger-soft">Reject</button>
            <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Approve</button>
          </div>
        </div>
      </div>
      
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
        <h3 className="font-medium text-neutral-900 mb-4">Leave Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><div className="text-neutral-500">Duration</div><div className="font-medium mt-1">{leave.duration}</div></div>
          <div><div className="text-neutral-500">Dates</div><div className="font-medium mt-1">{leave.startDate} to {leave.endDate}</div></div>
          <div><div className="text-neutral-500">Status</div><div className="font-medium mt-1">{leave.status}</div></div>
          <div><div className="text-neutral-500">Submitted Date</div><div className="font-medium mt-1">{leave.submittedDate}</div></div>
        </div>
      </div>
    </div>
  );
};

export const LeaveTypeCenter = () => {
  const { leaveTypes } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Leave Types</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Leave Type</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {leaveTypes.map(lt => (
              <tr key={lt.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{lt.name}</td>
                <td className="px-6 py-4 text-neutral-600">{lt.description}</td>
                <td className="px-6 py-4 text-neutral-600">{lt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const HolidayCalendar = () => {
  const { holidays } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Holiday Calendar</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Holiday</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Holiday</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {holidays.map(h => (
              <tr key={h.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{h.name}</td>
                <td className="px-6 py-4 text-neutral-600">{h.date}</td>
                <td className="px-6 py-4 text-neutral-600">{h.type}</td>
                <td className="px-6 py-4 text-neutral-600">{h.description}</td>
                <td className="px-6 py-4 text-neutral-600">{h.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PerformanceCenter = () => {
  const { performanceReviews } = useHR();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Performance Reviews</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">New Review</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Period</th>
              <th className="px-6 py-4 font-medium">Reviewer</th>
              <th className="px-6 py-4 font-medium">Rating</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {performanceReviews.map(pr => (
              <tr key={pr.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{pr.employee}</td>
                <td className="px-6 py-4 text-neutral-600">{pr.reviewPeriod}</td>
                <td className="px-6 py-4 text-neutral-600">{pr.reviewer}</td>
                <td className="px-6 py-4 text-neutral-600">{pr.rating}/5</td>
                <td className="px-6 py-4 text-neutral-600">{pr.status}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/hr/performance/${pr.id}`} className="text-primary hover:text-indigo-900 font-medium">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PerformanceDetail = () => {
  const { reviewId } = useParams();
  const { getPerformanceReview } = useHR();
  const review = getPerformanceReview(reviewId) || useHR().performanceReviews[0];
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/hr/performance" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Performance Review</h1>
          <p className="text-sm text-neutral-500 mt-1">Employee: {review.employee} | Period: {review.reviewPeriod}</p>
        </div>
      </div>
      
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
        <h3 className="font-medium text-neutral-900 mb-4">Review Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><div className="text-neutral-500">Reviewer</div><div className="font-medium mt-1">{review.reviewer}</div></div>
          <div><div className="text-neutral-500">Rating</div><div className="font-medium mt-1">{review.rating} / 5</div></div>
          <div><div className="text-neutral-500">Status</div><div className="font-medium mt-1">{review.status}</div></div>
          <div><div className="text-neutral-500">Date</div><div className="font-medium mt-1">{review.reviewDate}</div></div>
        </div>
      </div>
    </div>
  );
};

export const WorkforceAnalytics = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Workforce Analytics</h1>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Analytics Dashboard</h3>
        <p className="text-sm text-neutral-500 mt-1">Employee turnover, attendance trends, and performance distribution.</p>
      </div>
    </div>
  );
};
