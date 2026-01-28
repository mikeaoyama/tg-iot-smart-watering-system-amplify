const API = {
  async request(endpoint, options = {}) {
    const url = `${API_CONFIG.baseURL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async getDevices() {
    const data = await this.request('/devices')
    return data.devices
  },

  async getDevice(deviceId) {
    return await this.request(`/devices/${deviceId}`)
  },

  async createDevice(payload) {
    return await this.request('/devices', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async updateDevice(deviceId, payload) {
    return await this.request(`/devices/${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  },

  async deleteDevice(deviceId) {
    return await this.request(`/devices/${deviceId}`, {
      method: 'DELETE'
    })
  },

  async getStatus(deviceId) {
    return await this.request(`/devices/${deviceId}/status`)
  },

  async getHistory(deviceId, params = {}) {
    const query = new URLSearchParams(params).toString()
    const endpoint = `/devices/${deviceId}/history${query ? '?' + query : ''}`
    return await this.request(endpoint)
  },

  async controlDevice(deviceId, payload) {
    return await this.request(`/devices/${deviceId}/control`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }
}
