import { host } from './index'

export const getDevices = async (brandId, typeOrder, orderBy, page, limit, maxPrice, lowerRange, upperRange) => {
  const data = await host.get('/api/device', {
    params: {
      brandId, typeOrder, orderBy, limit, page, maxPrice, lowerRange, upperRange
    }
  })
  return data
}

export const getTypes = async (typeId, typeOrder) => {
  const data = await host.get('/api/type', { params: { typeId, typeOrder } })
  return data
}

export const getAllTypes = async () => {
  const data = await host.get('/api/type')
  return data
}

export const updateRatign = async (eyeId, rating) => {
  const data = await host.put(`/api/device?eyeId=${eyeId}&rating=${rating}`)
  return data
}
export const updateRatignType = async (typeId, rating) => {
  const data = await host.put(`/api/type?typeId=${typeId}&rating=${rating}`)
  return data
}

export const changeInfoCategoty = async (form) => {
  const data = await host.put('/api/type', form)
  return data
}
export const changeInfoSubCategoty = async (form) => {
  const data = await host.put('/api/brand', form)
  return data
}
export const changeDeviceInfo = async (form) => {
  const data = await host.put('/api/device', form)
  return data
}

export const getDeviceWithSearch = async (name) => {
  const data = await host.get(`/api/search`, { params: { name } })
  return data
}

export const getAllBrand = async (typeId) => {
  const data = await host.get('/api/brand', { params: { typeId } })
  return data
}


export const createType = async (form) => {
  const data = await host.post('/api/type', form)
  return data
}

export const createBrand = async (form) => {
  const data = await host.post('/api/brand', form)
  return data
}

export const createDevice = async (form) => {
  const data = await host.post('/api/device', form)
  return data
}

export const getOneDevice = async (id) => {
  const data = await host.get('api/device/' + id)
  return data
}

export const getAllDevice = async () => {
  const data = await host.get('/api/device')
  return data
}

export const deleteType = async (typeId) => {
  const data = await host.delete('/api/type', { params: { typeId } })
  return data
}
export const deleteBrand = async (brandId) => {
  const data = await host.delete('/api/brand', { params: { brandId } })
  return data
}
export const deleteDevice = async (brandId, deviceName, allDevice) => {
  const data = await host.delete('/api/device', { params: { brandId, deviceName, allDevice } })
  return data
}
