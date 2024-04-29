import { Employee } from "./Employee"

export interface Device {
    validationID: number
    imei: number
    state: string
    supplier: string
    score: number
    loadingDate: string
    employee: Employee
    validatorID: number
    valid: boolean
  }