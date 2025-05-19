import React, { useState } from 'react';

interface AddRegistryFormProps {
  onAddRegistry: (name: string, url: string, color?: string) => Promise<void>;
}

const AddRegistryForm: React.FC<AddRegistryFormProps> = ({ onAddRegistry }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [color, setColor] = useState('#4b5563');
  const [isExpanded, setIsExpanded] = useState(false);

  const predefinedColors = [
    '#1890ff', // blue (default for global)
    '#52c41a', // green
    '#fa8c16', // orange
    '#f5222d', // red
    '#722ed1', // purple
    '#eb2f96', // pink
    '#4b5563', // gray
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;

    try {
      await onAddRegistry(name, url, color);
      setName('');
      setUrl('');
      setColor('#4b5563');
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to add registry:', error);
    }
  };

  if (!isExpanded) {
    return (
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setIsExpanded(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: '#4b5563',
            fontWeight: '500',
          }}
        >
          <span>➕</span> Add Custom Registry
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '16px', color: '#374151' }}>Add Custom Registry</h3>
        <button
          onClick={() => setIsExpanded(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#9ca3af',
          }}
        >
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label
            htmlFor="registry-name"
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#4b5563',
            }}
          >
            Registry Name:
          </label>
          <input
            id="registry-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Work, Custom, etc."
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '15px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="registry-url"
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#4b5563',
            }}
          >
            Registry URL:
          </label>
          <input
            id="registry-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://registry.example.com/"
            required
            type="url"
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '15px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#4b5563',
            }}
          >
            Registry Color:
          </label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: '36px',
                height: '36px',
                padding: 0,
                border: 'none',
                borderRadius: '4px',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {predefinedColors.map((presetColor) => (
                <div
                  key={presetColor}
                  onClick={() => setColor(presetColor)}
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: presetColor,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: color === presetColor ? '2px solid #000' : '1px solid #e5e7eb',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#fff',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#4b5563',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Add Registry
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRegistryForm;
