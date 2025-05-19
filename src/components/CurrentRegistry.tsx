import React from 'react';

interface CurrentRegistryProps {
  currentRegistry: string;
  isGlobalRegistry: boolean;
  registryName?: string;
  registryColor?: string;
}

const CurrentRegistry: React.FC<CurrentRegistryProps> = ({
  currentRegistry,
  isGlobalRegistry,
  registryName,
  registryColor,
}) => {
  if (!currentRegistry) return null;

  const displayColor =
    registryColor ||
    (isGlobalRegistry ? '#1890ff' : '#e2e8f0');

  return (
    <div
      style={{
        margin: '0 0 2rem',
        padding: '16px',
        backgroundColor: isGlobalRegistry
          ? '#f0f7ff'
          : registryColor
          ? `${registryColor}10` // Very light version of the color
          : '#f9fafb',
        borderRadius: '8px',
        border: `1px solid ${displayColor}`,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '14px',
              color: '#64748b',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            CURRENT REGISTRY
            {registryName && (
              <span
                style={{
                  marginLeft: '8px',
                  backgroundColor: displayColor,
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              >
                {registryName}
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: '16px',
              fontFamily: 'monospace',
              padding: '6px 10px',
              backgroundColor: 'rgba(0,0,0,0.04)',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          >
            {currentRegistry}
          </div>
        </div>
        <div>
          {isGlobalRegistry && (
            <div
              style={{
                backgroundColor: '#1890ff',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '18px' }}>🌎</span>
              GLOBAL
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentRegistry;
