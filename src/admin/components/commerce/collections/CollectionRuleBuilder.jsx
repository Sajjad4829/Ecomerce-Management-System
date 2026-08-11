import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CollectionRuleBuilder({ rules, onChangeRules, matchMode, onChangeMatchMode }) {
  const addRule = () => {
    onChangeRules([...rules, { id: Date.now(), field: 'price', operator: 'greaterThan', value: '' }]);
  };

  const removeRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    onChangeRules(newRules);
  };

  const updateRule = (index, field, value) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    onChangeRules(newRules);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-lg border border-stone-200">
        <span className="text-sm font-semibold text-stone-900">Products must match:</span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            checked={matchMode === 'all'} 
            onChange={() => onChangeMatchMode('all')}
            className="text-stone-900 focus:ring-stone-900"
          />
          <span className="text-sm text-stone-700">All conditions (AND)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            checked={matchMode === 'any'} 
            onChange={() => onChangeMatchMode('any')}
            className="text-stone-900 focus:ring-stone-900"
          />
          <span className="text-sm text-stone-700">Any condition (OR)</span>
        </label>
      </div>

      <div className="space-y-3">
        {rules.map((rule, index) => (
          <div key={rule.id || index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-4 bg-white border border-stone-200 rounded-lg shadow-sm">
            <select 
              className="w-full sm:w-auto px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-stone-900"
              value={rule.field}
              onChange={(e) => updateRule(index, 'field', e.target.value)}
            >
              <option value="name">Product Name</option>
              <option value="category">Category</option>
              <option value="brand">Brand</option>
              <option value="price">Price</option>
              <option value="stock">Inventory Stock</option>
            </select>

            <select 
              className="w-full sm:w-auto px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-stone-900"
              value={rule.operator}
              onChange={(e) => updateRule(index, 'operator', e.target.value)}
            >
              <option value="equals">is equal to</option>
              <option value="notEquals">is not equal to</option>
              <option value="contains">contains</option>
              <option value="greaterThan">is greater than</option>
              <option value="lessThan">is less than</option>
            </select>

            <input 
              type="text" 
              placeholder="Value..."
              value={rule.value}
              onChange={(e) => updateRule(index, 'value', e.target.value)}
              className="w-full flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-stone-900"
            />

            <button 
              onClick={() => removeRule(index)}
              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={addRule}
        className="px-4 py-2 border border-stone-200 text-stone-600 text-sm font-semibold rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-2"
      >
        <FiPlus size={16} /> Add Condition
      </button>
    </div>
  );
}
