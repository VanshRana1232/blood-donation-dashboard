const BASE_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

async function request(action, payload = {}) {
  if (!BASE_URL) {
    throw new Error('Missing VITE_APPS_SCRIPT_URL environment variable. Please check your .env file.');
  }

  const url = new URL(BASE_URL);
  url.searchParams.set('action', action);
  
  // Send all data as URL parameters to avoid CORS
  if (payload && Object.keys(payload).length > 0) {
    url.searchParams.set('data', JSON.stringify(payload));
  }

  console.log('API Request:', action, payload);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);

    if (data.success === false) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const api = {
  // Get dashboard stats and recent donors
  getDashboardData: () => request('getDashboardData'),
  
  // Register a new donor
  registerDonor: (donor) => request('registerDonor', { donor }),
  
  // Mark a donor as donated (for updating donation count)
  markDonation: (donorId) => request('markDonation', { donorId })
};