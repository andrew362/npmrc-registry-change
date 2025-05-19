import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

// Components
import Layout from './components/Layout';
import Header from './components/Header';
import CurrentRegistry from './components/CurrentRegistry';
import RegistrySelector from './components/RegistrySelector';
import Footer from './components/Footer';
import Toast from './components/Toast';
import AddRegistryForm from './components/AddRegistryForm';

// Hooks
import { useNotification } from './hooks/useNotification';

type Registry = {
  name: string;
  url: string;
  color?: string;
};

export default function App() {
  const [registries, setRegistries] = useState<Registry[]>(
    []
  );
  const [selectedRegistry, setSelectedRegistry] =
    useState('');
  const [currentRegistry, setCurrentRegistry] =
    useState<string>('');
  const [currentRegistryName, setCurrentRegistryName] =
    useState<string>('');
  const [currentRegistryColor, setCurrentRegistryColor] =
    useState<string | undefined>();
  const [isGlobalRegistry, setIsGlobalRegistry] =
    useState<boolean>(false);

  const {
    notification,
    showNotification,
    hideNotification,
  } = useNotification();

  const fetchRegistries = async () => {
    try {
      // Get available registries
      const options = await invoke<
        [string, string, string | null][]
      >('list_registries');
      const registryList = options.map(
        ([name, url, color]) => ({
          name,
          url,
          color: color || undefined,
        })
      );
      setRegistries(registryList);
    } catch (err) {
      console.error('Failed to fetch registries:', err);
      showNotification(
        'Failed to load registries',
        'error'
      );
    }
  };

  const updateRegistryStatus = async () => {
    try {
      // Get current registry from .npmrc
      const current = await invoke<string>(
        'get_current_registry'
      );
      setCurrentRegistry(current);

      // Check if current registry is the global one
      const isGlobal = await invoke<boolean>(
        'is_global_registry'
      );
      setIsGlobalRegistry(isGlobal);

      // Find the matching registry to get name and color
      const matchingRegistry = registries.find(
        (reg) => reg.url === current
      );
      if (matchingRegistry) {
        setCurrentRegistryName(matchingRegistry.name);
        setCurrentRegistryColor(matchingRegistry.color);
      } else {
        setCurrentRegistryName('');
        setCurrentRegistryColor(undefined);
      }
    } catch (err) {
      console.error(
        'Failed to update registry status:',
        err
      );
    }
  };

  useEffect(() => {
    fetchRegistries();
    updateRegistryStatus();
  }, []);

  const handleChange = async () => {
    if (!selectedRegistry) return;

    try {
      await invoke('set_registry', {
        registry: selectedRegistry,
      });

      await updateRegistryStatus();
      showNotification(
        'Registry updated successfully!',
        'success'
      );
    } catch (err) {
      console.error(err);
      showNotification(
        'Failed to update registry',
        'error'
      );
    }
  };

  const handleAddRegistry = async (
    name: string,
    url: string,
    color?: string
  ) => {
    try {
      await invoke('add_registry', { name, url, color });
      showNotification(
        `Added registry "${name}"`,
        'success'
      );
      await fetchRegistries();
    } catch (err) {
      console.error('Failed to add registry:', err);
      showNotification('Failed to add registry', 'error');
    }
  };

  const handleRemoveRegistry = async (name: string) => {
    try {
      await invoke('remove_registry', { name });
      showNotification(
        `Removed registry "${name}"`,
        'success'
      );
      await fetchRegistries();

      // If the user removed the currently selected registry, clear the selection
      const removed = registries.find(
        (r) => r.name === name
      );
      if (removed && removed.url === selectedRegistry) {
        setSelectedRegistry('');
      }
    } catch (err) {
      console.error('Failed to remove registry:', err);
      showNotification(
        'Failed to remove registry',
        'error'
      );
    }
  };

  return (
    <Layout>
      <Toast
        notification={notification}
        onClose={hideNotification}
      />

      <Header />

      <CurrentRegistry
        currentRegistry={currentRegistry}
        isGlobalRegistry={isGlobalRegistry}
        registryName={currentRegistryName}
        registryColor={currentRegistryColor}
      />

      <AddRegistryForm onAddRegistry={handleAddRegistry} />

      <RegistrySelector
        registries={registries}
        selectedRegistry={selectedRegistry}
        onRegistryChange={setSelectedRegistry}
        onUpdateClick={handleChange}
        onRemoveRegistry={handleRemoveRegistry}
      />

      <Footer />
    </Layout>
  );
}
