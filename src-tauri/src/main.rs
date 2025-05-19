// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::PathBuf;
use std::io::{self, BufRead, Write};
use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
struct RegistryEntry {
    url: String,
    color: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct RegistryConfig {
    registries: HashMap<String, RegistryEntry>,
}

impl Default for RegistryConfig {
    fn default() -> Self {
        let mut registries = HashMap::new();
        // Add global registry with default color
        registries.insert("Global".to_string(), RegistryEntry {
            url: "https://registry.npmjs.org/".to_string(),
            color: Some("#1890ff".to_string()),
        });
        
        RegistryConfig { registries }
    }
}

fn get_config_path() -> Result<PathBuf, String> {
    let home_dir = dirs::home_dir().ok_or("Failed to get home directory")?;
    let config_dir = home_dir.join(".npmrc-manager");
    
    // Create config directory if it doesn't exist
    if !config_dir.exists() {
        fs::create_dir_all(&config_dir).map_err(|e| format!("Failed to create config directory: {}", e))?;
    }
    
    Ok(config_dir.join("registries.json"))
}

fn load_registry_config() -> RegistryConfig {
    let config_path = match get_config_path() {
        Ok(path) => path,
        Err(_) => return RegistryConfig::default(),
    };

    if !config_path.exists() {
        // Create default config
        let config = RegistryConfig::default();
        if let Ok(json) = serde_json::to_string_pretty(&config) {
            let _ = fs::write(&config_path, json);
        }
        return config;
    }

    match fs::read_to_string(&config_path) {
        Ok(content) => {
            match serde_json::from_str::<RegistryConfig>(&content) {
                Ok(config) => config,
                Err(_) => RegistryConfig::default(),
            }
        },
        Err(_) => RegistryConfig::default(),
    }
}

fn save_registry_config(config: &RegistryConfig) -> Result<(), String> {
    let config_path = get_config_path()?;
    
    let json = serde_json::to_string_pretty(config)
        .map_err(|e| format!("Failed to serialize config: {}", e))?;
        
    fs::write(&config_path, json)
        .map_err(|e| format!("Failed to write config file: {}", e))?;
        
    Ok(())
}

#[tauri::command]
fn list_registries() -> Vec<(String, String, Option<String>)> {
    let config = load_registry_config();
    
    // Convert HashMap to Vec of tuples for frontend use
    config.registries
        .iter()
        .map(|(name, entry)| (name.clone(), entry.url.clone(), entry.color.clone()))
        .collect()
}

#[tauri::command]
fn is_global_registry() -> bool {
    // Check if the current registry is the global one
    match get_current_registry() {
        Ok(registry) => registry == "https://registry.npmjs.org/",
        Err(_) => false,
    }
}

#[tauri::command]
fn add_registry(name: String, url: String, color: Option<String>) -> Result<(), String> {
    let mut config = load_registry_config();
    
    // Add or update the registry
    config.registries.insert(name, RegistryEntry { url, color });
    
    // Save the updated config
    save_registry_config(&config)
}

#[tauri::command]
fn remove_registry(name: String) -> Result<(), String> {
    let mut config = load_registry_config();
    
    // Remove the registry if it exists
    if !config.registries.contains_key(&name) {
        return Err(format!("Registry '{}' not found", name));
    }
    
    config.registries.remove(&name);
    
    // Save the updated config
    save_registry_config(&config)
}

#[tauri::command]
fn get_current_registry() -> Result<String, String> {
    let home_dir = dirs::home_dir().ok_or("Failed to get home directory")?;
    let npmrc_path: PathBuf = [home_dir.to_str().unwrap(), ".npmrc"].iter().collect();
    
    // Check if .npmrc exists
    if !npmrc_path.exists() {
        return Ok("No .npmrc file found".to_string());
    }
    
    // Read the file and find registry line
    let file = fs::File::open(&npmrc_path).map_err(|e| e.to_string())?;
    let reader = io::BufReader::new(file);
    
    for line in reader.lines() {
        let line = line.map_err(|e| e.to_string())?;
        if line.starts_with("registry=") {
            return Ok(line[9..].to_string());
        }
    }
    
    Ok("No registry found in .npmrc".to_string())
}

#[tauri::command]
fn set_registry(registry: String) -> Result<(), String> {
    let home_dir = dirs::home_dir().ok_or("Failed to get home directory")?;
    let npmrc_path: PathBuf = [home_dir.to_str().unwrap(), ".npmrc"].iter().collect();
    
    // Write a simple npmrc content with the selected registry
    fs::write(&npmrc_path, format!("registry={}", registry))
        .map_err(|err| err.to_string())?;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_registries,
            set_registry,
            get_current_registry,
            is_global_registry,
            add_registry,
            remove_registry
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
