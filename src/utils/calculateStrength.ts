export const calculateStrength = (value: string): number => {
  let strength = 0;

  if (value.length >= 8) {
    strength++;
  }
  if (/[A-Z]/.test(value)) {
    strength++;
  }
  if (/[a-z]/.test(value)) {
    strength++;
  }
  if (/\d/.test(value)) {
    strength++;
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    strength++;
  }

  return Math.min(strength, 4);
};
