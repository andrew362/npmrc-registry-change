import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegistrySelector from '../RegistrySelector';

describe('RegistrySelector', () => {
  const mockRegistries = [
    { name: 'npm', url: 'https://registry.npmjs.org/' },
    { name: 'GitHub', url: 'https://npm.pkg.github.com' },
  ];

  const defaultProps = {
    registries: mockRegistries,
    selectedRegistry: '',
    onRegistryChange: vi.fn(),
    onUpdateClick: vi.fn(),
    onRemoveRegistry: vi.fn(),
  };

  it('renders correctly with registries', () => {
    render(<RegistrySelector {...defaultProps} />);

    expect(screen.getByLabelText(/Select registry:/i)).toBeInTheDocument();
    expect(screen.getByText('npm')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Manage Registries')).toBeInTheDocument();
  });

  it('hides "Manage Registries" section when registries array is empty', () => {
    render(<RegistrySelector {...defaultProps} registries={[]} />);

    expect(screen.queryByText('Manage Registries')).not.toBeInTheDocument();
  });

  it('disables update button when no registry is selected', () => {
    render(<RegistrySelector {...defaultProps} selectedRegistry="" />);

    const updateButton = screen.getByRole('button', { name: /update/i });
    expect(updateButton).toBeDisabled();
  });

  it('enables update button when a registry is selected', () => {
    render(<RegistrySelector {...defaultProps} selectedRegistry="https://registry.npmjs.org/" />);

    const updateButton = screen.getByRole('button', { name: /update/i });
    expect(updateButton).not.toBeDisabled();
  });

  it('calls onRegistryChange when a different registry is selected', () => {
    render(<RegistrySelector {...defaultProps} />);

    const select = screen.getByLabelText(/Select registry:/i);
    fireEvent.change(select, { target: { value: 'https://npm.pkg.github.com' } });

    expect(defaultProps.onRegistryChange).toHaveBeenCalledWith('https://npm.pkg.github.com');
  });

  it('calls onUpdateClick when update button is clicked', () => {
    render(<RegistrySelector {...defaultProps} selectedRegistry="https://registry.npmjs.org/" />);

    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);

    expect(defaultProps.onUpdateClick).toHaveBeenCalled();
  });

  it('calls onRemoveRegistry when remove button is clicked', () => {
    render(<RegistrySelector {...defaultProps} />);

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(defaultProps.onRemoveRegistry).toHaveBeenCalledWith('npm');
  });

  it('does not show remove button for "Global" registry', () => {
    const registriesWithGlobal = [
      ...mockRegistries,
      { name: 'Global', url: 'https://registry.npmjs.org/' }
    ];
    render(<RegistrySelector {...defaultProps} registries={registriesWithGlobal} />);

    const githubRegistryContainer = screen.getByText('GitHub').closest('div')?.parentElement;
    const globalRegistryContainer = screen.getByText('Global').closest('div')?.parentElement;

    expect(githubRegistryContainer).toContainElement(screen.getAllByText('Remove')[1]);
    expect(globalRegistryContainer?.querySelector('button')).not.toBeInTheDocument();
  });
});
