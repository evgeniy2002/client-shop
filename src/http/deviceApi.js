import { host } from './index'

export const getDevices = async (brandId, typeOrder, orderBy, page, limit, maxPrice, getBestseller, getNewDevice) => {
  const data = await host.get('/device', {
    params: {
      brandId, typeOrder, orderBy, limit, page, maxPrice, getBestseller, getNewDevice
    }
  })
  return data
}

export const getTypes = async (typeId, typeOrder) => {
  const data = await host.get('/type', { params: { typeId, typeOrder } })
  return data
}

export const getAllTypes = async () => {
  const data = await host.get('/type')
  return data
}

export const updateRatign = async (eyeId, rating) => {
  const data = await host.put(`/device?eyeId=${eyeId}&rating=${rating}`)
  return data
}
export const updateRatignLink = async (linkId, click_to_link) => {
  const data = await host.put(`/device?linkId=${linkId}&click_to_link=${click_to_link}`)
  return data
}
export const updateRatignType = async (typeId, rating) => {
  const data = await host.put(`/type?typeId=${typeId}&rating=${rating}`)
  return data
}
export const updateRatignBrand = async (brandId, rating) => {
  const data = await host.put(`/brand?eyeId=${brandId}&rating=${rating}`)
  return data
}

export const changeInfoCategoty = async (form) => {
  const data = await host.put('/type', form)
  return data
}
export const changeInfoSubCategoty = async (form) => {
  const data = await host.put('/brand', form)
  return data
}
export const changeDeviceInfo = async (form) => {
  const data = await host.put('/device', form)
  return data
}

export const getDeviceWithSearch = async (name) => {
  const data = await host.get(`/search`, { params: { name } })
  return data
}

export const getAllBrand = async (brandId, brandOrder) => {
  const data = await host.get('/brand', { params: { brandId, brandOrder } })
  return data
}


export const createType = async (form) => {
  const data = await host.post('/type', form)
  return data
}

export const createBrand = async (form) => {
  const data = await host.post('/brand', form)
  return data
}

export const createDevice = async (form) => {
  const data = await host.post('/device', form)
  return data
}

export const getOneDevice = async (id) => {
  const data = await host.get('/device/' + id)
  return data
}

export const getAllDevice = async () => {
  const data = await host.get('/device')
  return data
}

export const deleteType = async (typeId) => {
  const data = await host.delete('/type', { params: { typeId } })
  return data
}
export const deleteBrand = async (brandId) => {
  const data = await host.delete('/brand', { params: { brandId } })
  return data
}
export const deleteDevice = async (brandId, deviceName, allDevice) => {
  const data = await host.delete('/device', { params: { brandId, deviceName, allDevice } })
  return data
}
