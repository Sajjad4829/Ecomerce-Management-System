import React, { createContext, useContext, useState, useMemo } from 'react';

const HRContext = createContext(null);

export const HRProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    { id: 'EMP-001', name: 'Alice Smith', employeeId: 'ID-001', email: 'alice@company.example', phone: '123-456-7890', department: 'Sales', team: 'North America', position: 'Sales Manager', manager: 'CEO', employmentType: 'Full Time', joiningDate: '2022-01-15', status: 'Active' },
    { id: 'EMP-002', name: 'Bob Johnson', employeeId: 'ID-002', email: 'bob@company.example', phone: '098-765-4321', department: 'IT', team: 'Backend', position: 'Developer', manager: 'CTO', employmentType: 'Full Time', joiningDate: '2023-03-01', status: 'Active' },
  ]);

  const [departments, setDepartments] = useState([
    { id: 'DEP-001', name: 'Sales', head: 'Alice Smith', employeeCount: 15, status: 'Active' },
    { id: 'DEP-002', name: 'IT', head: 'CTO', employeeCount: 20, status: 'Active' },
  ]);

  const [teams, setTeams] = useState([
    { id: 'TM-001', name: 'North America', department: 'Sales', teamLead: 'Alice Smith', employeeCount: 10, status: 'Active' },
  ]);

  const [positions, setPositions] = useState([
    { id: 'POS-001', name: 'Sales Manager', department: 'Sales', level: 'Manager', employeeCount: 2, status: 'Active' },
    { id: 'POS-002', name: 'Developer', department: 'IT', level: 'Mid', employeeCount: 15, status: 'Active' },
  ]);

  const [attendance, setAttendance] = useState([
    { id: 'ATT-001', employee: 'Alice Smith', date: '2024-06-05', checkIn: '09:00 AM', checkOut: '05:00 PM', workingHours: 8, status: 'Present' },
  ]);

  const [shifts, setShifts] = useState([
    { id: 'SH-001', name: 'Morning', startTime: '09:00 AM', endTime: '05:00 PM', breakTime: '1 Hour', employees: 50, status: 'Active' },
  ]);

  const [schedules, setSchedules] = useState([
    { id: 'SCH-001', employee: 'Alice Smith', schedule: 'Standard', workingDays: 'Mon-Fri', shift: 'Morning', effectiveDate: '2024-01-01', status: 'Active' },
  ]);

  const [leaves, setLeaves] = useState([
    { id: 'LV-001', employee: 'Bob Johnson', type: 'Annual Leave', startDate: '2024-06-10', endDate: '2024-06-15', duration: '5 days', status: 'Pending', submittedDate: '2024-06-01' },
  ]);

  const [leaveTypes, setLeaveTypes] = useState([
    { id: 'LT-001', name: 'Annual Leave', description: 'Paid time off', status: 'Active' },
    { id: 'LT-002', name: 'Sick Leave', description: 'Medical time off', status: 'Active' },
  ]);

  const [holidays, setHolidays] = useState([
    { id: 'HOL-001', name: 'New Year', date: '2024-01-01', type: 'Public Holiday', description: 'New Year Day', status: 'Active' },
  ]);

  const [performanceReviews, setPerformanceReviews] = useState([
    { id: 'PR-001', employee: 'Alice Smith', reviewPeriod: '2023', reviewer: 'CEO', rating: 4.5, status: 'Completed', reviewDate: '2024-01-15' },
  ]);

  const getEmployee = (id) => employees.find(e => e.id === id);
  const getLeave = (id) => leaves.find(l => l.id === id);
  const getPerformanceReview = (id) => performanceReviews.find(pr => pr.id === id);

  const contextValue = useMemo(() => ({
    employees,
    departments,
    teams,
    positions,
    attendance,
    shifts,
    schedules,
    leaves,
    leaveTypes,
    holidays,
    performanceReviews,
    getEmployee,
    getLeave,
    getPerformanceReview
  }), [employees, departments, teams, positions, attendance, shifts, schedules, leaves, leaveTypes, holidays, performanceReviews]);

  return (
    <HRContext.Provider value={contextValue}>
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => useContext(HRContext);
