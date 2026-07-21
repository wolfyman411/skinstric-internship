import { Demographics } from "../demographics"

export const createDemographicsSlice = (set:any) => ({
  demographics: {} as Demographics,
  race: ["",0] as [string,number],
  age: ["",0] as [string,number],
  sex: ["",0] as [string,number],
  setDemographics: (newDemo:Demographics) => set({ demographics: newDemo }),
  setRace: (newRace:[string,number]) => set({race:newRace}),
  setAge: (newAge:[string,number]) => set({age:newAge}),
  setSex: (newSex:[string,number]) => set({sex:newSex})
})