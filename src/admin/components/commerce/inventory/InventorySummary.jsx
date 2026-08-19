import { FiMapPin, FiPackage, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_LOCATIONS = [
  { id: '1', name: 'Main Hub - LA', onHand: 45, reserved: 5, incoming: 20 },
  { id: '2', name: 'East Coast Center', onHand: 12, reserved: 10, incoming: 50 }
];

export default function InventorySummary() {
  const totalOnHand = MOCK_LOCATIONS.reduce((sum, loc) => sum + loc.onHand, 0);
  const totalReserved = MOCK_LOCATIONS.reduce((sum, loc) => sum + loc.reserved, 0);
  const totalAvailable = totalOnHand - totalReserved;

  return (
    <div className="pt-6 border-t border-stone-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-text-primary">Inventory Allocation</h3>
        <Link 
          to="/admin/catalog/inventory"
          className="text-xs font-semibold text-text-secondary hover:text-text-primary flex items-center gap-1"
        >
          Manage Inventory <FiArrowRight size={14} />
        </Link>
      </div>
      
      <div className="bg-background rounded-xl border border-border overflow-hidden mb-6">
        <div className="grid grid-cols-3 divide-x divide-stone-200 border-b border-border bg-surface p-4">
          <div className="text-center">
            <p className="text-[10px] font-mono font-bold text-text-muted uppercase">Available</p>
            <p className="text-2xl font-bold text-success mt-1">{totalAvailable}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-mono font-bold text-text-muted uppercase">Reserved</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{totalReserved}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-mono font-bold text-text-muted uppercase">On Hand</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{totalOnHand}</p>
          </div>
        </div>

        <div className="p-4">
          <h4 className="text-xs font-mono font-bold text-text-muted uppercase mb-3">Stock By Location</h4>
          <div className="space-y-3">
            {MOCK_LOCATIONS.map(loc => (
              <div key={loc.id} className="flex items-center justify-between bg-surface p-3 rounded-lg border border-stone-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-text-muted" size={16} />
                  <span className="text-sm font-bold text-text-primary">{loc.name}</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-text-secondary">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono uppercase text-text-muted">Available</span>
                    <span className="font-bold text-text-primary">{loc.onHand - loc.reserved}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono uppercase text-text-muted">Incoming</span>
                    <span className="font-medium text-primary">+{loc.incoming}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
