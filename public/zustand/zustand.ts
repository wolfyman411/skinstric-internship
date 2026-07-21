import { create } from 'zustand'
import { createDemographicsSlice } from './demographicsSlice'

export const useBoundStore = create((a) => ({
  ...createDemographicsSlice(a),
}))