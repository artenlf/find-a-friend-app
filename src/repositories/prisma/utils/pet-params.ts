export interface PetParams {
  type?: 'cat' | 'dog' | 'other'
  age?: 'newborn' | 'young' | 'adult' | 'senior'
  size?: 'small' | 'medium' | 'large'
  energy_level?: 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh'
  independency_level?: 'low' | 'medium' | 'high'
  environment?: 'small' | 'medium' | 'large'
}
