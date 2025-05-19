import React from 'react';

interface Registry {
  name: string;
  url: string;
}

interface RegistrySelectorProps {
  registries: Registry[];
  selectedRegistry: string;
  onRegistryChange: (registry: string) => void;
  onUpdateClick: () => void;
  onRemoveRegistry?: (name: string) => void;
}

const RegistrySelector: React.FC<RegistrySelectorProps> = ({
  registries,
  selectedRegistry,
  onRegistryChange,
  onUpdateClick,
  onRemoveRegistry,
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor="registry-select"
        style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#4b5563',
        }}
      >
        Select registry:
      </label>
      <div style={{ display: 'flex', gap: '12px' }}>
        <select
          id="registry-select"
          onChange={(e) => onRegistryChange(e.target.value)}
          value={selectedRegistry}
          style={{
            flexGrow: 1,
            padding: '10px 12px',
            fontSize: '15px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            backgroundColor: '#fff',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            appearance: 'none',
            backgroundImage:
              'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px top 50%',
            backgroundSize: '10px auto',
          }}
        >
          <option value="">-- Choose a registry --</option>
          {registries.map((reg) => (
            <option key={reg.name} value={reg.url}>
              {reg.name}
            </option>
          ))}
        </select>
        <button
          onClick={onUpdateClick}
          disabled={!selectedRegistry}
          style={{
            padding: '10px 16px',
            backgroundColor: selectedRegistry
              ? '#1890ff'
              : '#e5e7eb',
            color: selectedRegistry ? 'white' : '#9ca3af',
            border: 'none',
            borderRadius: '6px',
            cursor: selectedRegistry
              ? 'pointer'
              : 'not-allowed',
            fontWeight: '500',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
        >
          <span>Update</span>
          <span style={{ fontSize: '18px' }}>↗️</span>
        </button>
      </div>

      {registries.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3
            style={{
              fontSize: '16px',
              color: '#374151',
              marginBottom: '10px',
            }}
          >
            Manage Registries
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {registries.map((reg) => (
              <div
                key={reg.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {reg.name}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#6b7280',
                    }}
                  >
                    {reg.url}
                  </div>
                </div>
                {onRemoveRegistry &&
                  reg.name !== 'Global' && (
                    <button
                      onClick={() =>
                        onRemoveRegistry(reg.name)
                      }
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '4px 8px',
                      }}
                    >
                      Remove
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrySelector;
