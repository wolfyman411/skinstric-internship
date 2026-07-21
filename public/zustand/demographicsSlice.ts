import { Demographics } from "../demographics"

export const createDemographicsSlice = (set:any) => ({
  demographics: {} as Demographics,
  setDemographics: (newDemo:Demographics) => set({ demographics: newDemo }),
})