/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HouseState {
  salonLights: boolean;
  cuisineLights: boolean;
  chambreLights: boolean;
  exterieurLights: boolean;
  voletsOpenPercent: number; // 0 to 100
  chauffageTemp: number; // in Celsius
  activeScenario: 'idle' | 'soir' | 'depart' | 'nuit' | 'cinema';
  alarmActive: boolean;
}

export interface ActivityNotification {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface CheckoutDetails {
  planName: string;
  price: number;
  isOpen: boolean;
}
